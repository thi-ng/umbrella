<!-- This file is generated - DO NOT EDIT! -->

# ![axidraw](https://media.thi.ng/umbrella/banners-20220914/thing-axidraw.svg?25c834ce)

[![npm version](https://img.shields.io/npm/v/@thi.ng/axidraw.svg)](https://www.npmjs.com/package/@thi.ng/axidraw)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/axidraw.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Out of scope](#out-of-scope)
    - [SVG](#svg)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Minimal AxiDraw plotter/drawing machine controller for Node.js.

This package provides a super-lightweight alternative to control an [AxiDraw
plotter](https://axidraw.com/) directly from Node.js, using a small custom set
of medium/high-level drawing commands. Structurally, these custom commands are
[thi.ng/hiccup-like](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup/)
S-expressions, which can be easily serialized to/from JSON and are translated to
[EBB commands](https://evil-mad.github.io/EggBot/ebb.html) for the plotter.

A different philosophy than used by most other AxiDraw support libraries
available, but also very much following the pattern of other packages in the
[thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo, this approach
allows (geometry) data to be inspected, augmented, converted/transformed,
serialized up until the very last moment before being sent to the machine for
physical output...

### Out of scope

#### SVG

This package does **not** provide conversion from SVG or any other geometry
transformations. Whilst not containing a full SVG parser (only single paths),
the family of
[thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
packages provides numerous other shape types & operations which can be directly
utilized to output generated geometry together with this package...

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

Package sizes (brotli'd, pre-treeshake): ESM: 902 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)
- [serialport](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

## API

[Generated API docs](https://docs.thi.ng/umbrella/axidraw/)

```ts tangle:export/readme.js
import { AxiDraw } from "@thi.ng/axidraw";
import { circle, vertices } from "@thi.ng/geom";

(async () => {

// instantiate w/ default options (see docs for info)
const axi = new AxiDraw();

// connect to 1st port matching given regexp
await axi.connect(/^\/dev\/tty\.usbmodem/);
// true

// compute 60 points on a circle at (100,50) w/ radius 30
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
