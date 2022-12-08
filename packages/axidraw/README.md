<!-- This file is generated - DO NOT EDIT! -->

# ![axidraw](https://media.thi.ng/umbrella/banners-20220914/thing-axidraw.svg?25c834ce)

[![npm version](https://img.shields.io/npm/v/@thi.ng/axidraw.svg)](https://www.npmjs.com/package/@thi.ng/axidraw)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/axidraw.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Declarative vs. imperative](#declarative-vs-imperative)
  - [thi.ng/geom support](#thinggeom-support)
  - [No SVG support](#no-svg-support)
  - [Serial port support](#serial-port-support)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Example usage](#example-usage)
- [Authors](#authors)
- [License](#license)

## About

Minimal AxiDraw plotter/drawing machine controller for Node.js.

This package provides a super-lightweight alternative to control an [AxiDraw
plotter](https://axidraw.com/) directly from Node.js, using a small custom set
of medium/high-level drawing commands. Structurally, these custom commands are
[thi.ng/hiccup](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup/)-like
S-expressions, which can be easily serialized to/from JSON and are translated to
the native [EBB commands](https://evil-mad.github.io/EggBot/ebb.html) for the
plotter.

### Declarative vs. imperative

Due to AxiDraw's lack of G-Code support, most other available AxiDraw support
libraries are providing only a purely imperative API to control the machine. In
contrast, this package utilizes a more declarative approach, also very much
following the pattern of other packages in the
[thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo, which allows
(geometry) data to be inspected, augmented, converted/transformed, serialized up
until the very last moment before being sent to the machine for physical
output...

### thi.ng/geom support

The [thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
package provides numerous shape types & operations to generate & transform
geometry. Additionally,
[thi.ng/geom-axidraw](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-axidraw)
can act as bridge API and provides the polymorphic
[`asAxiDraw()`](https://docs.thi.ng/umbrella/geom-axidraw/functions/asAxiDraw())
function to convert single shapes or entire shape groups/hierarchies directly
into the draw commands used by this (axidraw) package. See package readme for
more details and examples.

### No SVG support

This package does **not** provide any direct conversions from SVG or any other
geometry format. But again, whilst not containing a full SVG parser (at current
only single paths can be parsed), the family of
[thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
packages provides numerous other shape types & operations which can be directly
utilized to output generated geometry together with this package...

The only built-in conversion provided is the
[`polyline()`](https://docs.thi.ng/umbrella/axidraw/functions/polyline.html)
utility function to convert an array of points (representing a polyline) to an
array of drawing commands. All other conversions are out of scope for this
package (& for now).

### Serial port support

We're using the [serialport](https://serialport.io/) NPM package to submit data
directly to the drawing machine. That package includes native bindings for
Linux, MacOS and Windows.

The
[`AxiDraw.connect()`](https://docs.thi.ng/umbrella/axidraw/classes/AxiDraw.html#connect)
function (see example below) attempts to find the drawing machine by matching a
given regexp with available port names. The default regexp might only work on
Mac, but YMMV!

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Baxidraw%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/axidraw
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/axidraw"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const axidraw = await import("@thi.ng/axidraw");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.59 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)
- [serialport](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

## API

[Generated API docs](https://docs.thi.ng/umbrella/axidraw/)

### Example usage

List of toots/tweets:

- https://mastodon.thi.ng/@toxi/109469016803633396
- more to come...

Basic example:

```ts tangle:export/readme.js
import { AxiDraw, polyline } from "@thi.ng/axidraw";
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
const path = polyline(verts)
// [
//   [ 'u' ],
//   [ 'm', [ 130, 50 ], 1 ],
//   [ 'd' ],
//   [ 'm', [ 129.8356568610482, 53.1358538980296 ], 1 ],
//   [ 'm', [ 129.34442802201417, 56.23735072453278 ], 1 ],
//   ...
// ]

// draw/send seq of commands (incl. start/end sequence, configurable)
// i.e. in this case the path representing the (approximated) circle defined above
await axi.draw([["start"], ...path, ["stop"]]);

})();
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-axidraw,
  title = "@thi.ng/axidraw",
  author = "Karsten Schmidt",
  note = "https://thi.ng/axidraw",
  year = 2022
}
```

## License

&copy; 2022 Karsten Schmidt // Apache Software License 2.0
