# Scrolly: fast vanilla JS scrollbar plugin

Aim is a fast + good looking scrollbar with zero dependencies, small size &amp; major browsers support.
So, the **Browser Support** is same as for [`MutationObserver`](https://developer.mozilla.org/en/docs/Web/API/MutationObserver#Browser_compatibility), works in all modern browsers for Desktop and Mobile.

## Install, via Bower or NPM

* `bower install scrolly`
* `npm install scrolly`

## Features &amp; Usage

* Small (~**6KB** minified), fast, vanilla JS (zero dependencies)
* Nested scrollbars
* Touch support
* jQuery/Zepto/jBone plugin
* React.js Component
* Infinite scroll (top/bottom edge reach) callbacks

```js
// Initialize
var ids = scrolly.bar(query|node|string, params);
// or
var id = scrolly.barNode(node, params);

// Update
scrolly.update(id);
// or update everything
scrolly.updateAll();

// Dispose
scrolly.dispose(id);
// or cleanup everything
scrolly.disposeAll();
```

### React Component

See example usage: `gulp watch` and open [/react](http://localhost:3001/react/). Or just look at `public/react/index.html` in this repo.

```jsx
<Scrolly params={ params }>
    <h1>Some test contents here</h1>
    <p>Contents to be scrolled...</p>
</Scrolly>
```

### jQuery/Zepto/jBone Plugin flavour

```js
// jQuery Plugin
$('.selector').scrolly();
// ...and it's chained as well

// Update
$('.selector').scrolly('update');

// Dispose
$('.selector').scrolly('dispose');
```

### Demo

Just open `public/index.html`, or check the [Live demo](https://annexare.com/js/scrolly/). For React Component demo check `public/react/index.html` or [scrolly/react](https://annexare.com/js/scrolly/react/).

## Details

### Data: DOM elements
```
data        LESS:
{
  wrap      .scrolly
  area        .area
  bar       .scrolly + .bar
  thumb       .thumb
}
```

### Data: numbers

* `data.wrapRatio`: float `0..1`. Calculated as `wrapSize / areaSize`. When ` === 1` no scrollbar is shown.

### Setup

1. Clone this repo.
2. Install [Node.js](http://nodejs.org/). Then [Gulp](http://gulpjs.com/): `npm install -g gulp`.
3. Terminal, from project directory:
    * Dev dependencies: `npm install`.
    * `gulp -T` to see all available stuff.
    * `gulp watch` to run a local dev server, open in on [localhost:3001](http://localhost:3001/).
    * `gulp build-all` to clean &amp; build everything.
