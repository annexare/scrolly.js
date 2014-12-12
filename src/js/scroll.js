/**
 * Scroll.js
 *
 * A bit of math & links inside each scroll data.
 * DOM elements:
 * - wrap
 *  - area <- this element is
 *  - bar
 *   - thumb
 */

;(function () {
    'use strict';

    var title = 'Scroll.js',
        prefix = function (param) {
            return 'scroll' + param;
        },
        message = function (text) {
            return title + ': ' + text;
        },

        axes = {
            X: 'Width',
            Y: 'Height'
        },
        axesPos = {
            X: 'Left',
            Y: 'Top'
        },
        calcThumbPos = function (data) {
            var offset = data.wrap['scroll' + axesPos[data.axis]] || 0;
            return Math.floor(
                (offset + data.wrapSize / 2) * data.wrapRatio
            );
        },
        // classList is not supported by IE9
        classAdd = function (className, node) {
            var list = node.className.split(/\s+/);
            if (list.indexOf(className) === -1) {
                list.push.apply(list, [className]);
            }

            return (node.className = list.join(' '));
        },
        classRemove = function (className, node) {
            var list = node.className.split(/\s+/),
                id = list.indexOf(className);
            if (id !== -1) {
                list.splice(id, 1);
            }

            return (node.className = list.join(' '));
        },
        div = function (className) {
            var node = document.createElement('div');
            node.className = className || '';

            return node;
        },
        wrap = function (node, className) {
            var wrapper = div(className);

            node.parentNode
                .insertBefore(wrapper, node);
            wrapper.appendChild(node);

            return wrapper;
        },

        hasTouch = ('ontouchstart' in document.documentElement),
        wheelEventName = ('onwheel' in document || document.documentMode >= 9)
            ? 'wheel'
            : (typeof document.onmousewheel === 'undefined'
                ? 'DOMMouseScroll'
                : 'mousewheel'),

        scrollBars = [],
        scrolll = {
            // Common defaults for scope
            axis: 'Y',
            noUserSelectClass: 'no-user-select',
            thumbMinSize: 24,

            bar: function (query, params) {
                if (!query) {
                    console.log(message('No Query specified.'));
                    return false;
                }

                var $query = $(query),
                    ids = [];
                if (!$query.length) {
                    console.log(message('Couldn\'t query:'), query, params);
                    return false;
                }

                $query.forEach(function (node) {
                    if (typeof dataset(node, prefix('id')) !== 'undefined') {
                        this.dispose(dataset(node, prefix('id')));
                    }

                    var opts = params || {},
                        data = {
                            params: opts,
                            scrolled: 0,
                            visible: false
                        };

                    // Params
                    data.axis = opts.axis || this.axis;
                    data.thumbMinSize = opts.thumbMinSize || this.thumbMinSize;

                    // Area
                    classAdd('area', node);
                    data.wrap = wrap(node, 'scroll');
                    data.area = node;

                    // Bar
                    var bar = div('bar');
                    data.thumb = bar.appendChild(div('thumb'));
                    data.bar = data.wrap.parentNode
                        .insertBefore(bar, data.wrap.nextSibling);

                    // Store Data
                    var id = dataset(node, prefix('id'), scrollBars.push(data) - 1);
                    ids.push(id);
                    this.update(id, true);
                }, this);

                return ids;
            },
            /**
             * Dispose Scroll from node. Remove all extra elements, unwrap.
             * @param id
             * @returns {boolean}
             */
            dispose: function (id) {
                var no = (typeof id === 'number') ? id : false;

                if (no === false) {
                    return false;
                }

                var data = scrollBars[no];
                if (!data || (typeof data === 'undefined')) {
                    return true;
                }
                // Unwatch
                data.observer.disconnect();
                // Cleanup
                classRemove('area', data.area);
                data.area.removeAttribute('data-' + prefix('id'));
                data.wrap.parentNode.insertBefore(data.area, data.wrap);
                data.wrap.parentNode.removeChild(data.wrap);
                data.bar.parentNode.removeChild(data.bar);
                // Well, we won't change all IDs to remove it
                scrollBars[no] = false;

                return true;
            },
            getID: function (data) {
                return dataset(data.area, prefix('id'));
            },
            onDrag: function (data, e) {
                //
            },
            onDone: function (data) {
                //
            },
            onMove: function (data, e) {
                //
                console.log(' > onMove', e);
            },
            onWheel: function (data) {
                //
            },
            setEventData: function (e, data) {
                var param = ['page' + data.axis];
                data[param] = e[param];

                return data;
            },
            setEvents: function (data) {
                var self = this;

                // Wheel || Touch events
                if (hasTouch) {
                    data.wrap.ontouchstart = function (e) {
                        if (e.touches.length !== 1) {
                            return;
                        }
                        e.preventDefault();
                        e.stopPropagation();

                        var event = e.touches[0];
                        self.setEventData(event, data);
                        self.onMove.call(self, data, event);
                    };
                } else {
                    // Wheel
                    data.wrap.addEventListener(wheelEventName, function (e) {
                        if (data.wrapRatio === 1) {
                            return;
                        }

                        var param = 'scroll' + axesPos[data.axis],
                            offset = (data.wrap[param] += e['delta' + data.axis]);

                        if ((offset > 0) && (offset + data.wrapSize < data.areaSize)) {
                            e.preventDefault();
                            e.stopPropagation();
                        }

                        data.wrap[param] += e['delta' + data.axis];
                        self.setThumbPos(data);

                        //var delta = e['delta' + data.axis],
                        //    top = window.getComputedStyle(data.area)
                        //        .getPropertyValue('top')
                        //        .replace('px', '');
                        //data.area.style.top = (top + delta) + 'px';
                    });
                }

                // Bar, common
                data.thumb.addEventListener('click', function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
                data.bar.addEventListener('click', function(e) {
                    var dot = e['layer' + data.axis];
                    self.setThumbPos.call(self, data, dot, true);
                    console.log('click', dot);
                });

                // Observe changes in future
                data.observer = new MutationObserver(function (mutations) {
                    console.log(' > mutations for ' + data.area.className, mutations.length);
                    self.update(self.getID(data));
                });
                data.observer.observe(data.area, {
                    attributes: true,
                    childList: true
                });
            },
            /**
             * Recalculate sizes.
             * Called only on init or changes (MutationObserver).
             * @param data
             */
            setSize: function (data) {
                var axis = axes[data.axis],
                    wrapSize = data.wrapSize = data.wrap['offset' + axis],
                    areaSize = data.areaSize = data.area['scroll' + axis];

                // Lesser area - no bar
                data.visible = (areaSize > wrapSize);
                if (!data.visible) {
                    data.bar.style.visibility = 'hidden';
                    return;
                }

                var wrapRatio = data.wrapRatio = wrapSize / areaSize,
                    thumbSize = data.thumbSize =
                        Math.min(
                            wrapSize,
                            Math.max(data.thumbMinSize, wrapSize * wrapRatio)
                        );

                data.thumb.style.height = thumbSize + 'px';
                data.thumbSize = data.thumb['offset' + axis];
                this.setThumbPos(data);

                data.bar.style.height = wrapSize + 'px';
                data.bar.style.visibility = 'visible';
            },
            setThumbPos: function (data, value, doScroll) {
                var dot = typeof value === 'number'
                        ? value
                        : calcThumbPos(data),
                    gap = data.thumbSize / 2,
                    thumbPosMax = data.wrapSize - data.thumbSize,
                    thumbPos = (dot < gap
                        ? 0
                        : dot - gap);

                thumbPos = thumbPos > thumbPosMax ? thumbPosMax : thumbPos;
                data.thumb.style[axesPos[data.axis].toLowerCase()] = thumbPos + 'px';
                if (doScroll) {
                    this.setWrapScroll(data, thumbPos);
                }
            },
            setWrapScroll: function (data, dot) {
                data.wrap['scroll' + axesPos[data.axis]] = Math.floor(dot / data.wrapSize * data.areaSize);
            },
            update: function (id, withEvents) {
                var data = scrollBars[id];
                if (typeof data === 'undefined') {
                    return;
                }

                this.setSize(data);

                if (withEvents) {
                    this.setEvents(data);
                }
            }
        };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = scrolll;
    } else if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return scrolll;
        });
    } else {
        this.scrolll = scrolll;
        this.scrollBars = scrollBars;
    }

}.call(this));
