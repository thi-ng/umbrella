<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/hdom-canvas](https://media.thi.ng/umbrella/banners-20230807/thing-hdom-canvas.svg?dc7ee1b9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hdom-canvas.svg)](https://www.npmjs.com/package/@thi.ng/hdom-canvas)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hdom-canvas.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
- [Status](#status)
  - [BREAKING CHANGES 3.0.0](#breaking-changes-300)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [How it works](#how-it-works)
  - [Restrictions & behavior controls](#restrictions--behavior-controls)
  - [HDPI support](#hdpi-support)
- [SVG conversion](#svg-conversion)
- [Supported shape types](#supported-shape-types)
- [Authors](#authors)
- [License](#license)

## About

[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) component wrapper for declarative canvas scenegraphs.

This package provides a [re-usable canvas
component](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-canvas/src/index.ts#L66),
which accepts child nodes defining a scene tree of different shape types
in standard
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
syntax/format (i.e. nested arrays) and then translates these into canvas
API draw calls during the hdom update process / cycle.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhdom-canvas%5D+in%3Atitle)

### BREAKING CHANGES 3.0.0

The actual tree traversal & drawing has been extracted to the new
[@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas)
package for better re-usability, also outside without hdom.

## Related packages

- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) - Functional, polymorphic API for 2D geometry types & SVG generation
- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) - Hiccup shape tree renderer for vanilla Canvas 2D contexts
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & related tooling
- [@thi.ng/rdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-canvas) - [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) component wrapper for [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) and declarative canvas drawing

## Installation

```bash
yarn add @thi.ng/hdom-canvas
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/hdom-canvas"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const hdomCanvas = await import("@thi.ng/hdom-canvas");
```

Package sizes (brotli'd, pre-treeshake): ESM: 824 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/diff](https://github.com/thi-ng/umbrella/tree/develop/packages/diff)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
- [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                           | Description                                                                      | Live demo                                                   | Source                                                                                   |
|:-------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:------------------------------------------------------------|:-----------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fft-synth.png" width="240"/>                     | Interactive inverse FFT toy synth                                                | [Demo](https://demo.thi.ng/umbrella/fft-synth/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fft-synth)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-convex-hull.png" width="240"/>              | Convex hull & shape clipping of 2D polygons                                      | [Demo](https://demo.thi.ng/umbrella/geom-convex-hull/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-convex-hull)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn.jpg" width="240"/>                      | Doodle w/ K-nearest neighbor search result visualization                         | [Demo](https://demo.thi.ng/umbrella/geom-knn/)              | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-knn)              |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn-hash.jpg" width="240"/>                 | K-nearest neighbor search in an hash grid                                        | [Demo](https://demo.thi.ng/umbrella/geom-knn-hash/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-knn-hash)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/>              | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-clock.png" width="240"/>             | Realtime analog clock demo                                                       | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-clock/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-clock)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-draw.jpg" width="240"/>              | Interactive pattern drawing demo using transducers                               | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-draw/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-draw)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-particles.jpg" width="240"/>         | 2D Bezier curve-guided particle system                                           | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-particles/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-particles) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export             | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-shapes)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png" width="240"/>                        | Canvas based Immediate Mode GUI components                                       | [Demo](https://demo.thi.ng/umbrella/imgui/)                 | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)                 |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/imgui-basics.png" width="240"/>                  | Minimal IMGUI usage example                                                      | [Demo](https://demo.thi.ng/umbrella/imgui-basics/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui-basics)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-isoline.png" width="240"/>                      | Animated sine plasma effect visualized using contour lines                       | [Demo](https://demo.thi.ng/umbrella/iso-plasma/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/iso-plasma)            |
|                                                                                                                                      | Basic rstream-gestures multi-touch demo                                          | [Demo](https://demo.thi.ng/umbrella/multitouch/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/multitouch)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ramp-synth.png" width="240"/>                    | Unison wavetable synth with waveform editor                                      | [Demo](https://demo.thi.ng/umbrella/ramp-synth/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ramp-synth)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg" width="240"/>              | Animated Voronoi diagram, cubic splines & SVG download                           | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph.png" width="240"/>                    | 2D scenegraph & shape picking                                                    | [Demo](https://demo.thi.ng/umbrella/scenegraph/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph-image.png" width="240"/>              | 2D scenegraph & image map based geometry manipulation                            | [Demo](https://demo.thi.ng/umbrella/scenegraph-image/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph-image)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-workers.jpg" width="240"/>            | Fork-join worker-based raymarch renderer (JS/CPU only)                           | [Demo](https://demo.thi.ng/umbrella/shader-ast-workers/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-workers)    |

## API

[Generated API docs](https://docs.thi.ng/umbrella/hdom-canvas/)

```ts
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";

start(() => {
    const t = Date.now() * 0.001;
    return [canvas, { width: 100, height: 100 },
        ["circle", { fill: "red", stroke: "black" }, [50, 50], 25 + 25 * Math.sin(t)]
    ];
});
```

Usage with
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
shape primitives:

```ts
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import * as g from "@thi.ng/geom";

start(() => {
    const t = Date.now() * 0.001;
    return [canvas, { width: 100, height: 100 },
        g.group(
            { translate: [50, 50], fill: "none" },
            [
                g.withAttribs(
                    g.asPolygon(g.circle(50), 6),
                    { rotate: t % Math.PI, stroke: "red" }
                ),
                g.star(25 + 25 * Math.sin(t), 6, [0.5, 1], { stroke: "blue" }),
            ]
        )
    ];
});
```

## How it works

The package provides a `canvas` component which uses the branch-local
behavior implementation feature of
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
v5.0.0 to support virtual SVG-like shape elements / components. These
are defined as part of the main UI component tree just like any other
component, but are then translated into canvas API draw commands during
the hdom update process. Any embedded shape component functions receive
the user context object as first arg, just like normal hdom components.

Shape components are expressed in standard hiccup syntax (or as objects
implementing the `IToHiccup()` interface, like the shape types provided
by
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)),
and with the following...

### Restrictions & behavior controls

- Shape component objects with life cycle methods are only partially
  supported, i.e. only the `render` & `release` methods are used.
- For performance reasons `release` methods are disabled by default. If
  your shape tree contains stateful components which use the `release`
  life cycle method, you'll need to explicitly enable the canvas
  component's `__release` control attribute by setting it to `true`.
- Currently no event listeners can be assigned to shapes (ignored),
  though this is planned for a future version. The canvas element itself
  can of course have event handlers as usual.

For best performance it's recommended to ensure all resulting shapes
elements are provided in already normalized hiccup format, i.e.

```ts
[tag, {attribs}, ...] // or
[tag, null, ...]
```

That way the `__normalize: false` control attribute can be added either
to the canvas component itself (or to individual shapes / groups), and
if present, will skip normalization of that element's children.

Likewise, for animated scenes, the `__diff` control attribute should be
set to `false` to skip unnecessary diffing and force redraws.

To disable the automatic background clearing of the canvas, set the `__clear` attribute to `false`.

```ts
[canvas, { width: 100, height: 100, __clear: false }, ...]
```

### HDPI support

The canvas component automatically adjusts its size for HDPI displays by
adding CSS `width` & `height` properties and pre-scaling the drawing
context accordingly before any shapes are processed. For fullscreen
canvases simply set the `width` & `height` attribs to:

```ts
[canvas,
    {
        width: window.innerWidth,
        height: window.innerHeight
    },
    // shapes
    ...
]
```

## SVG conversion

Even though the element names & syntax are *very similar* to SVG
elements, for performance reasons all geometry data given to each shape
remains un-stringified (only styling attributes are). However, the
[@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg)
package provides a `convertTree()` function which takes the arguably
more "raw" shape format used by hdom-canvas and converts an entire shape
tree into SVG compatible & serializable format. Note: the tree MUST
first be normalized (if not already) using hdom-canvas'
`normalizeTree()`.

```ts
import { serialize } from "@thi.ng/hiccup";
import { convertTree, svg } from "@thi.ng/hiccup-svg";
import { normalizeTree } from "@thi.ng/hdom-canvas";

serialize(
    svg({ width: 100, height: 100},
        convertTree(
            normalizeTree(
                {}, // default normalization options
                ["g",
                    {
                        fill: "red",
                        stroke: "none",
                        translate: [50, 50]
                    },
                    ["circle", {}, [0, 0], 25],
                    ["polygon", { fill: "white" },
                        [[-10,10],[10,10],[0,-10]]
                    ]
                ]
            )
        )
    )
);
```

```xml
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">
    <g transform="translate(50.00 50.00)" fill="red" stroke="none">
        <circle cx="0.00" cy="0.00" r="25.00"/>
        <polygon points="-10.00,10.00 10.00,10.00 0.00,-10.00" fill="white"/>
    </g>
</svg>
```

## Supported shape types

Please see the [@thi.ng/hiccup-canvas
README](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas/README.md#supported-shape-types)
for the full list of supported shapes, gradients, attributes, colors and
transformations.

## Authors

- [Karsten Schmidt](https://thi.ng) (Main author)
- [Arthur Carabott](https://github.com/acarabott)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hdom-canvas,
  title = "@thi.ng/hdom-canvas",
  author = "Karsten Schmidt and others",
  note = "https://thi.ng/hdom-canvas",
  year = 2018
}
```

## License

&copy; 2018 - 2023 Karsten Schmidt // Apache License 2.0
