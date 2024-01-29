<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/rdom-canvas](https://media.thi.ng/umbrella/banners-20230807/thing-rdom-canvas.svg?d17bbfc7)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rdom-canvas.svg)](https://www.npmjs.com/package/@thi.ng/rdom-canvas)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rdom-canvas.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This is a standalone project, maintained as part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and
anti-framework.

> [!NOTE]
> 🚀 Help me to work full-time on these projects by [sponsoring me on GitHub](https://github.com/sponsors/postspectacular) ❤️

- [About](#about)
  - [General usage](#general-usage)
  - [Control attributes](#control-attributes)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

[@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) component wrapper for [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) and declarative canvas drawing. Please consult these packages' READMEs for further
background information...

### General usage

As with most thi.ng/rdom components, the state (aka geometry/scenegraph) for the
canvas component is being sourced from a
[thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
subscription. The canvas redraws every time that subscription delivers a new
value. The size of the canvas can be given as a subscription too and if so will
also automatically trigger resizing of the canvas.

The geometry to rendered to the canvas is expressed as
[thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup),
specifically the flavor used by
[thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas),
which (not just coincidentally) is the same as also used by
[thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
shapes.

```ts tangle:export/readme1.ts
import { circle, group } from "@thi.ng/geom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromRAF } from "@thi.ng/rstream";
import { repeatedly } from "@thi.ng/transducers";

// create geometry stream/subscription
const geo = fromRAF().map((t) =>
  // shape group w/ attribs (also see section in readme)
  group({ __background: "#0ff" }, [
    // create 10 circles
    ...repeatedly(
      (i) =>
        circle(
          [
            Math.sin(t * 0.01 + i * 0.5) * 150 + 300,
            Math.sin(t * 0.03 + i * 0.5) * 150 + 300
          ],
          50,
          // colors can be given as RGBA vectors or CSS
          { fill: [i * 0.1, 0, i * 0.05] }
        ),
      10
    )
  ])
);

// create & mount canvas component (w/ fixed size)
$canvas(geo, [600, 600]).mount(document.body);
```

### Control attributes

The root shape/group support the following special attributes:

- `__background`: background color. If given, fills the canvas will given color
  before drawing
- `__clear`: clear background flag. If true clears the canvas before drawing

Also see relevant section in the [thi.ng/hiccup-canvas
README](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup-canvas/README.md#special-attributes)...

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brdom-canvas%5D+in%3Atitle)

## Related packages

- [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) - Hiccup shape tree renderer for vanilla Canvas 2D contexts
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & related tooling
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) - Functional, polymorphic API for 2D geometry types & SVG generation
- [@thi.ng/scenegraph](https://github.com/thi-ng/umbrella/tree/develop/packages/scenegraph) - Extensible 2D/3D scene graph with [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) support

## Installation

```bash
yarn add @thi.ng/rdom-canvas
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/rdom-canvas"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const rdomCanvas = await import("@thi.ng/rdom-canvas");
```

Package sizes (brotli'd, pre-treeshake): ESM: 694 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/canvas)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas)
- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                | Description                                                                    | Live demo                                                | Source                                                                                |
|:--------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/boid-basics.png" width="240"/>        | Basic 2D boid simulation and spatial indexing neighbor lookups                 | [Demo](https://demo.thi.ng/umbrella/boid-basics/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/boid-basics)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ellipse-proximity.png" width="240"/>  | Interactive visualization of closest points on ellipses                        | [Demo](https://demo.thi.ng/umbrella/ellipse-proximity/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ellipse-proximity)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-terrain-viz.jpg" width="240"/>   | 2.5D hidden line visualization of digital elevation files (DEM)                | [Demo](https://demo.thi.ng/umbrella/geom-terrain-viz/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-terrain-viz)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pointfree-geom.jpg" width="240"/>     | Live coding playground for 2D geometry generation using @thi.ng/pointfree-lang | [Demo](https://demo.thi.ng/umbrella/pointfree-geom/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pointfree-geom)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/quasi-lattice.png" width="240"/>      | Quasi-random lattice generator                                                 | [Demo](https://demo.thi.ng/umbrella/quasi-lattice/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/quasi-lattice)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-canvas-basics.jpg" width="240"/> | Minimal rdom-canvas animation                                                  | [Demo](https://demo.thi.ng/umbrella/rdom-canvas-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-canvas-basics) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-lissajous.png" width="240"/>     | rdom & hiccup-canvas interop test                                              | [Demo](https://demo.thi.ng/umbrella/rdom-lissajous/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-lissajous)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/simd-plot.png" width="240"/>          | Fitting, transforming & plotting 10k data points per frame using SIMD          | [Demo](https://demo.thi.ng/umbrella/simd-plot/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/simd-plot)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>       | Multi-layer vectorization & dithering of bitmap images                         | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)       |

## API

[Generated API docs](https://docs.thi.ng/umbrella/rdom-canvas/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-rdom-canvas,
  title = "@thi.ng/rdom-canvas",
  author = "Karsten Schmidt",
  note = "https://thi.ng/rdom-canvas",
  year = 2020
}
```

## License

&copy; 2020 - 2024 Karsten Schmidt // Apache License 2.0
