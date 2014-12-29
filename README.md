# Scrolly: fast vanilla JS scrollbar plugin

Aim is a fast + good looking scrollbar with zero dependencies, small size &amp; major browsers support.
At the moment `MutationObserver` requires IE11, but works in all major desktop &amp; mobile browsers.

## Install, via Bower or NPM

* `bower install scrolly`
* `npm install scrolly`

## Usage

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

### jQuery/Zepto/jBone Plugin flavour

```js
// jQuery Plugin
$('.selector').scrolly();
// ...and it's chained as well

// Update
$('.selector').scrolly({ update: true });

// Dispose
$('.selector').scrolly({ dispose: true });
```

## Details

### Data: DOM elements
```
data:       LESS:
  wrap      .scrolly
  area        .area
  bar         .area + .bar
  thumb         .thumb
```

### Data: numbers

* `data.wrapRatio`: float `0..1`. Calculated as `wrapSize / areaSize`. When ` === 1` no scrollbar is shown.

### Planned

* Infinite Scroll callback
* React.js Component

### Setup

1. Clone this repo.
2. Install [Node.js](http://nodejs.org/). Then [Gulp](http://gulpjs.com/): `npm install -g gulp`.
3. Terminal, from project directory:
    * Dev dependencies: `npm install`.
    * `gulp -T` to see all available stuff.
    * `gulp watch` to run a local dev server, open in on [localhost:3001](http://localhost:3001/).
    * `gulp build-all` to clean &amp; build everything.
