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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
