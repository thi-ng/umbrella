# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

This package provides a super-lightweight alternative to control an [AxiDraw
plotter](https://axidraw.com/) directly from Node.js, using a small custom set
of medium/high-level drawing commands. Structurally, these custom commands are
[thi.ng/hiccup-like](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup/)
S-expressions, which can be easily serialized to/from JSON and are translated to
[EBB commands](https://evil-mad.github.io/EggBot/ebb.html) for the plotter.

### Declarative vs. imperative

Due to AxiDraw's lack of G-Code support, most other available AxiDraw support
libraries are providing only a purely imperative API to control the machine. In
contrast, this package utilizes a more declarative approach, also very much
following the pattern of other packages in the
[thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo, which allows
(geometry) data to be inspected, augmented, converted/transformed, serialized up
until the very last moment before being sent to the machine for physical
output...

### No SVG support

This package does **not** provide conversion from SVG or any other geometry
format conversions. Whilst not containing a full SVG parser (only single paths),
the family of
[thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
packages provides numerous other shape types & operations which can be directly
utilized to output generated geometry together with this package...

The only built-in conversion provided is the [`AxiDraw.polyline()`]() method to
convert an array of points (representing a polyline) into an array of drawing
commands. All other conversions are out of scope for this package (& for now).

### Serial port support

We're using the [serialport](https://serialport.io/) NPM package to submit data
directly to the drawing machine. That pacakge includes native bindings for
Linux, MacOS and Windows.

The `AxiDraw.connect()` function (see example below) attempts to find the
drawing machine by matching a given regexp with available port names. The
default regexp might only work on Mac, but YMMV!

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

```ts tangle:export/readme.js
import { AxiDraw } from "@thi.ng/axidraw";
import { circle, vertices } from "@thi.ng/geom";

(async () => {

// instantiate w/ default options (see docs for info)
// default paper size is DIN A4
const axi = new AxiDraw();

// connect to 1st serial port matching given regexp
await axi.connect(/^\/dev\/tty\.usbmodem/);
// true

// compute 60 points on a circle at (100,50) w/ radius 30
// (all units in mm)
const verts = vertices(circle([100, 50], 30), { num: 60, last: true });
// [
//   [ 130, 50 ],
//   [ 129.8356568610482, 53.1358538980296 ],
//   [ 129.34442802201417, 56.23735072453278 ],
//   ...
// ]

// convert to drawing commands (w/ default opts)
const path = axi.polyline(verts)
// [
//   [ 'u' ],
//   [ 'm', [ 130, 50 ], 1 ],
//   [ 'd' ],
//   [ 'm', [ 129.8356568610482, 53.1358538980296 ], 1 ],
//   [ 'm', [ 129.34442802201417, 56.23735072453278 ], 1 ],
//   ...
// ]

// draw/send seq of commands (incl. start/end sequence, configurable)
await axi.draw([["start"], ...path, ["stop"]]);

})();
```


## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
