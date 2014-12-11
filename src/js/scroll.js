/*
 * Scroll.js
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

        //hasTouch = ('ontouchstart' in document.documentElement),
        //eventName = ('onwheel' in document || document.documentMode >= 9)
        //    ? 'wheel'
        //    : (typeof document.onmousewheel === 'undefined'
        //        ? 'DOMMouseScroll'
        //        : 'mousewheel'),

        scrollBars = [],
        scrolll = {
            bar: function (query, params) {
                if (!query) {
                    console.log(message('No Query specified.'));
                    return false;
                }

                var $query = typeof query === 'string' ? $(query) : $(query),
                    ids = [];
                if (!$query.length) {
                    console.log(message('Couldn\'t query:'), query, params);
                    return false;
                }

                $query.forEach(function (node) {
                    if (typeof dataset(node, prefix('id')) !== 'undefined') {
                        this.dispose(dataset(node, prefix('id')));
                    }

                    var data = {
                            params: params || {}
                        },
                        classes = node.className.split(' ');

                    // Area; classList is not supported by IE9
                    classes.push.apply(classes, [/*'scroll', */'area']);
                    node.className = classes.join(' ');
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
            dispose: function (id) {
                var no = (typeof id === 'number') ? id : false;

                if ((no === false) || (!scrollBars[no])) {
                    return false;
                }

                var data = scrollBars[no];
                if (typeof data === 'undefined') {
                    return true;
                }
                data.observer.disconnect();

                return true;
            },
            getID: function (data) {
                return dataset(data.area, prefix('id'));
            },

            _percentage: function(total, part) {
                return part / total * 100;
            },
            moveThumb: function (data) {
                data.thumb.style.top = this._percentage(data.wrap.scrollHeight, data.wrap.scrollTop) + '%';
            },
            relativeScroll: function(data, e) {
                var percentage = this._percentage(data.wrap.offsetHeight, e.offsetY);
                data.thumb.style.top = percentage + '%';
                data.wrap.scrollTop = data.wrap.scrollHeight * percentage / 100;
            },
            setEvents: function (data) {
                var self = this;

                // Wheel & Touch events
                data.wrap.addEventListener('scroll', function onScroll() {
                    self.moveThumb(data);
                });

                data.bar.addEventListener('click', function(e) {
                    if (e.target !== data.bar) {
                        return;
                    }

                    self.relativeScroll(data, e);
                });

                // Observe changes in future
                data.observer = new MutationObserver(function (mutations) {
                    console.log(' > mutations', mutations.length);
                    self.update(self.getID(data));
                });
                data.observer.observe(data.area, {
                    attributes: true,
                    childList: true
                });
            },
            setSize: function (data) {
                var wrapSize = data.wrap.offsetHeight,
                    areaSize = data.area.scrollHeight;

                if (areaSize <= wrapSize) {
                    data.bar.style.display = 'none';
                    return;
                }

                data.bar.style.display = 'block';
                data.bar.style.height = wrapSize + 'px';
                data.thumb.style.height = (wrapSize * (wrapSize / areaSize)) + 'px';
            },
            update: function (id, withEvents) {
                var data = scrollBars[id];
                if (typeof data === 'undefined') {
                    return;
                }

                this.setSize(data);
                this.moveThumb(data);

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
