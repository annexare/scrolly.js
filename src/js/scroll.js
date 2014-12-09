/*
 * Scroll.js
 */

;(function () {
    'use strict';

    var scrollBars = {},
        scrolll = {
            bar: function (query, params) {
                var el = (typeof query === 'string' ? false : query),
                    opts = params || {};

                return true;
            }
        };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = scrolll;
    } else if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return scrolll;
        });
    } else {
        this.scrolll = function () {
            return scrolll.call();
        };
    }

}.call(this));
