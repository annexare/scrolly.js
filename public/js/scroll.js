/*  scroll.js v0.3.0, 2014.12.12  */
var dataset = function initDataSet() {
    if (document.documentElement.dataset) {
        return function native(el, prop, value) {
            if (typeof value !== 'undefined') {
                return el.dataset[prop] = value;
            } else {
                return el.dataset[prop];
            }
        }
    } else {
        return function poly(el, prop, value) {
            if (typeof value !== 'undefined') {
                return el.setAttribute('data-' + prop, value);
            }
            else {
                return el.getAttribute('data-' + prop);
            }
        }
    }
}();
;

/**
 * Scroll.js
 *
 * @todo Prepare for React.js
 * @todo Add more options: keep thumb pos on update, etc
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

        // Node helpers
        // classList is not supported by IE9
        addClass = function (className, node) {
            var list = (node.className || '').split(/\s+/);
            if (list.indexOf(className) === -1) {
                list.push.apply(list, [className]);
            }

            return (node.className = list.join(' '));
        },
        hasClass = function (className, node) {
            var list = (node.className || '').split(/\s+/);

            return (list.indexOf(className) !== -1);
        },
        removeClass = function (className, node) {
            var list = (node.className || '').split(/\s+/),
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
            var parent = node.parentNode;
            if (hasClass(className, parent)) {
                return parent;
            }
            var wrapper = div(className);

            parent.insertBefore(wrapper, node);
            wrapper.appendChild(node);

            return wrapper;
        },

        // Position & size helpers
        axes = { X: 'Width', Y: 'Height'},
        axesPos = { X: 'Left', Y: 'Top'},
        getEventPos = function (axis, e) {
            return e['page' + axis] || e['client' + axis];
        },
        getNodePos = function (node, axis, prefix) {
            return node[(prefix || 'scroll') + axesPos[axis]];
        },
        getNodeSize = function (node, axis, prefix) {
            return node[(prefix || 'scroll') + axes[axis]];
        },

        calcThumbPos = function (data) {
            var offset = getNodePos(data.wrap, data.axis) || 0;
            return Math.floor(
                (offset + data.wrapSize / 2) * data.wrapRatio
            );
        },
        px = function (value) {
            return value + 'px';
        },

        hasTouch = ('ontouchstart' in document.documentElement),
        wheelEventName = ('onwheel' in document || document.documentMode >= 9)
            ? 'wheel'
            : (typeof document.onmousewheel === 'undefined'
                ? 'DOMMouseScroll'
                : 'mousewheel'),

        // Events
        onDone = function (data) {
            document.body.onmousemove = document.body.onmouseup = null;
            document.ontouchmove = document.ontouchend = null;

            removeClass(this.noUserSelectClass, document.body);
            removeClass(this.onDragClass, data.bar);
        },
        onBegin = function (data, e) {
            var self = this,
                start = getEventPos(data.axis, e),
                delta = 0,
                top = data.thumb.style.top.replace('px', '') * 1,
                handler = function (e) {
                    delta = getEventPos(data.axis, e) - start + (data.thumbSize / 2);
                    if (hasTouch) {
                        // Change direction for touch devices
                        // TODO Check why it's so fast on iOS, check on other devices
                        delta = delta * -0.5;
                    }
                    self.setThumbPos.call(self, data, top + delta, true);
                },
                done = function () {
                    onDone.call(self, data);
                };

            addClass(this.noUserSelectClass, document.body);
            addClass(this.onDragClass, data.bar);

            if (hasTouch) {
                document.ontouchmove = function (e) {
                    e.preventDefault();
                    handler(e.touches[0]);
                };
                document.ontouchend = done;
            } else {
                document.body.onmousemove = handler;
                document.body.onmouseup = done;
            }
        },
        onWheel = function (data, e) {
            if (data.wrapRatio === 1) {
                return;
            }

            var offset = (getNodePos(data.wrap, data.axis) + e['delta' + data.axis]);

            data.wrapRatio = data.wrapSize / getNodeSize(data.area, data.axis);
            if ((offset > 0) && (offset + data.wrapSize < getNodeSize(data.area, data.axis))) {
                e.preventDefault();
                e.stopPropagation();
            }

            data.wrap['scroll' + axesPos[data.axis]] += e['delta' + data.axis];
            this.setThumbPos(data);

            //var delta = e['delta' + data.axis],
            //    top = window.getComputedStyle(data.area)
            //        .getPropertyValue('top')
            //        .replace('px', '');
            //data.area.style.top = (top + delta) + 'px';
        },

        scrollBars = [],
        scrolll = {
            // Common defaults for scope, can be changed for all next Bars
            axis: 'Y',
            onDragClass: 'on-drag',
            onResize: false,
            noUserSelectClass: 'no-user-select',
            thumbMinSize: 24,

            // Public methods
            bar: function (query, params) {
                if (!query) {
                    console.log(message('No Query specified.'));
                    return false;
                }

                var $query = typeof query === 'string'
                        ? document.querySelectorAll(query)
                        : query;
                if (!$query.length) {
                    if ($query instanceof HTMLElement) {
                        return [this.barNode($query, params)];
                    }
                    console.log(message('Couldn\'t query:'), typeof query, query, params);
                    return false;
                }

                var ids = [];
                for (var i = 0; i < $query.length; i++) {
                    ids.push(this.barNode($query[i], params));
                }

                return ids;
            },
            barNode: function (node, params) {
                if (typeof dataset(node, prefix('id')) !== 'undefined') {
                    this.dispose(dataset(node, prefix('id')));
                }
                // Window Resize
                if (!this.onResize) {
                    window.addEventListener(
                        'resize',
                        this.updateAll.bind(this),
                        true);
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
                addClass('area', node);
                data.wrap = wrap(node, 'scroll');
                data.area = node;

                // Bar
                // TODO Check for existing Bar
                var bar = div('bar');
                data.thumb = bar.appendChild(div('thumb'));
                data.bar = data.wrap.parentNode
                    .insertBefore(bar, data.wrap.nextSibling);

                // Store Data
                var id = dataset(node, prefix('id'), scrollBars.push(data) - 1);
                this.update(id, true);

                return id;
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
                removeClass('area', data.area);
                data.area.removeAttribute('data-' + prefix('id'));
                data.wrap.parentNode.insertBefore(data.area, data.wrap);
                data.wrap.parentNode.removeChild(data.wrap);
                data.bar.parentNode.removeChild(data.bar);
                // Well, we won't change all IDs to remove it
                scrollBars[no] = false;

                return true;
            },
            /**
             * Get scroll ID by current data object.
             * @param data
             * @returns {*}
             */
            getID: function (data) {
                return dataset(data.area, prefix('id'));
            },
            /**
             * Update data for certain scroll.
             * @param id
             * @param withEvents
             */
            update: function (id, withEvents) {
                var data = scrollBars[id];
                if (!data) {
                    return;
                }

                this.setSize(data);

                if (withEvents) {
                    this.setEvents(data);
                }
            },
            updateAll: function () {
                for (var i = 0; i < scrollBars.length; i++) {
                    this.update(i);
                }
            },

            // Setters
            // TODO Check when data.area size is changed, because wrapRatio recalculated every time now
            setEvents: function (data) {
                var self = this;

                // Observe changes in future
                data.observer = new MutationObserver(function (mutations) {
                    console.log(' > mutations for ' + data.area.className, mutations.length);
                    self.update(self.getID(data));
                });
                data.observer.observe(data.area, {
                    attributes: true,
                    childList: true
                });

                // Wheel || Touch events
                var handler = function (e) {
                    onBegin.call(self, data, e);
                };
                if (hasTouch) {
                    data.wrap.ontouchstart = function (e) {
                        if (e.touches.length !== 1) {
                            return;
                        }
                        e.preventDefault();
                        e.stopPropagation();

                        handler(e.touches[0]);
                    };
                } else {
                    // Wheel
                    data.wrap.addEventListener(wheelEventName, function (e) {
                        onWheel.call(self, data, e);
                    });
                    // Bar: Drag
                    data.bar.addEventListener('mousedown', handler);
                }

                // Bar, common
                data.thumb.addEventListener('click', function (e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
                data.bar.addEventListener('click', function (e) {
                    var dot = e['layer' + data.axis];
                    self.setThumbPos.call(self, data, dot, true);
                });
            },
            /**
             * Recalculate sizes.
             * Called only on init or changes (MutationObserver).
             * @param data
             */
            setSize: function (data) {
                var wrapSize = data.wrapSize = getNodeSize(data.wrap, data.axis, 'offset'),
                    // Not caching, in some case there's a shift
                    areaSize = getNodeSize(data.area, data.axis);

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

                data.thumb.style.height = px(thumbSize);
                data.thumbSize = getNodeSize(data.thumb, data.axis, 'offset');
                this.setThumbPos(data);

                data.bar.style.height = px(wrapSize);
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
                data.thumb.style[axesPos[data.axis].toLowerCase()] = px(thumbPos);
                if (doScroll) {
                    thumbPos = (thumbPos === thumbPosMax ? data.wrapSize : thumbPos);
                    data.wrap['scroll' + axesPos[data.axis]] =
                        Math.floor(thumbPos / data.wrapSize * getNodeSize(data.area, data.axis));
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
