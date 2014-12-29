var dataSet = function initDataSet() {
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
