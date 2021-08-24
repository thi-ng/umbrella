<!-- This file is generated - DO NOT EDIT! -->

# ![hiccup-svg](https://media.thi.ng/umbrella/banners/thing-hiccup-svg.svg?121a04ab)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-svg.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-svg)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-svg.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Important](#important)
  - [SVG conversion of @thi.ng/geom & @thi.ng/hdom-canvas shape trees](#svg-conversion-of-thinggeom--thinghdom-canvas-shape-trees)
  - [Automatic attribute conversions](#automatic-attribute-conversions)
    - [Colors](#colors)
    - [Transforms](#transforms)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom).

### Important

The functions provided here do produce valid hiccup elements, but
since none of them make use of (or support) the global hiccup / hdom
context object, they can ONLY be invoked directly, i.e. they MUST be
called like:

```ts
// correct (direct invocation)
svg.svg({}, svg.circle([0, 0], 100, { fill: "red" }));

// incorrect / unsupported (lazy evaluation)
[svg.svg, {}, [svg.circle, [0, 0], 100, { fill: "red" }]]
```

### SVG conversion of @thi.ng/geom & @thi.ng/hdom-canvas shape trees

Since v2.0.0 this package provides a conversion utility to translate the
more compact syntax used by
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
and
[@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-canvas)
shape trees (designed for more performant realtime / canvas drawing) into
a SVG serializable hiccup format.

The `convertTree()` function takes a pre-normalized hiccup tree of
hdom-canvas shape definitions and recursively converts it into an hiccup
flavor which is ready for SVG serialization (i.e. using stringified
geometry attribs). This conversion also involves translation &
re-organization of various attributes, as described below. This function
returns a new tree. The original remains untouched, as will any
unrecognized tree / shape nodes (those will be transferred as-is to the
result tree). See example below.

Since v3.7.0 tree conversion can be implicitly triggered by providing a
`convert: true` attribute to the root `svg()` element.

```ts
// create SVG root element and convert body
svg(
    { width: 100, height: 100, convert: true},
    ["rect", { fill: [1, 0, 0] }, [0,0], 100, 100]
)
// [
//   'svg',
//   {
//     version: '1.1',
//     xmlns: 'http://www.w3.org/2000/svg',
//     'xmlns:xlink': 'http://www.w3.org/1999/xlink',
//     width: 100,
//     height: 100
//   },
//   [ 'rect', { fill: '#ff0000', x: 0, y: 0, width: 100, height: 100 } ]
// ]
```

### Automatic attribute conversions

#### Colors

Since v3.1.0:

Color conversions are only applied to `fill` and `stroke` attributes and
color stops provided to `linearGradient()`, `radialGradient()`

##### String

String color attribs prefixed with `$` are replaced with `url(#...)`
refs (e.g. to refer to  gradients), else used as is (untransformed)

##### Number

Interpreted as ARGB hex value:

`{ fill: 0xffaabbcc }` => `{ fill: "#aabbcc" }`

##### Array

Interpreted as float RGB(A):

`{ fill: [1, 0.8, 0.6, 0.4] }` => `{ fill: "rgba(255,204,153,0.40)" }`

##### [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color) values

Converted to CSS color strings:

`{ fill: hcya(0.1666, 1, 0.8859) }` => `{ fill: "#ffff00" }`

#### Transforms

(i.e. `transform`, `rotate`, `scale`, `translate`)

If an element has a `transform` attrib, conversion of the other
transformation attribs will be skipped, else the values are assumed to
be either strings or:

- `transform`: 6-element numeric array ([2x3 matrix in column major
  order](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform#Matrix))
- `translate`: 2-element array
- `rotate`: number (angle in radians)
- `scale`: number (uniform scale) or 2-elem array

If no `transform`, but others are given, the resulting transformation
order will always be TRS. Any string values will be used as-is and
therefore need to be complete, e.g. `{ rotate: "rotate(60)" }`

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhiccup-svg%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/hiccup-svg
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/hiccup-svg?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/hiccup-svg/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 2.56 KB / CJS: 2.68 KB / UMD: 2.60 KB

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color)
- [@thi.ng/prefixes](https://github.com/thi-ng/umbrella/tree/develop/packages/prefixes)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                           | Description                                                                 | Live demo                                                | Source                                                                                |
|:-------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/color-themes.png" width="240"/>                  | Probabilistic color theme generator                                         | [Demo](https://demo.thi.ng/umbrella/color-themes/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/color-themes)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/commit-heatmap.png" width="240"/>                | Heatmap visualization of this mono-repo's commits                           |                                                          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/commit-heatmap)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/crypto-chart.png" width="240"/>                  | Basic crypto-currency candle chart with multiple moving averages plots      | [Demo](https://demo.thi.ng/umbrella/crypto-chart/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/crypto-chart)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/>               | Color palette generation via dominant color extraction from uploaded images | [Demo](https://demo.thi.ng/umbrella/dominant-colors/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export        | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-shapes) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/package-stats.png" width="240"/>                 | CLI util to visualize umbrella pkg stats                                    |                                                          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/package-stats)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pointfree-svg.png" width="240"/>                 | Generate SVG using pointfree DSL                                            |                                                          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pointfree-svg)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-spline.png" width="240"/>                   | Polygon to cubic curve conversion & visualization                           | [Demo](https://demo.thi.ng/umbrella/poly-spline/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-spline)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-grid.jpg" width="240"/>                  | Interactive grid generator, SVG generation & export, undo/redo support      | [Demo](https://demo.thi.ng/umbrella/rstream-grid/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-grid)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-waveform.jpg" width="240"/>                  | Additive waveform synthesis & SVG visualization with undo/redo              | [Demo](https://demo.thi.ng/umbrella/svg-waveform/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-waveform)       |

## API

[Generated API docs](https://docs.thi.ng/umbrella/hiccup-svg/)

```ts
import * as svg from "@thi.ng/hiccup-svg";
import { serialize } from "@thi.ng/hiccup";
import * as fs from "fs";

fs.writeFileSync(
    "hello.svg",
    serialize(
        svg.svg(
            {width: 100, height: 100},
            svg.defs(svg.linearGradient("grad", [0, 0], [0, 1], [[0, "red"], [1, "blue"]])),
            svg.circle([50, 50], 50, { fill: "url(#grad)" }),
            svg.text([50, 55], "Hello", { fill: "white", "text-anchor": "middle" })
        )
    ));
```

Minimal example showing SVG conversion of a hdom-canvas scene:

```ts
// scene tree defined for hdom-canvas
const scene = [
    ["defs", {},
        ["radialGradient",
            { id: "bg", from: [150, 280], to: [150, 300], r1: 300, r2: 100 },
            [[0, "#07f"], [0.5, "#0ef"], [0.8, "#efe"], [1, "#af0"]]],
        ["radialGradient",
            { id: "sun", from: [110, 120], to: [110, 120], r1: 5, r2: 50 },
            [[0, "#fff"], [1, "rgba(255,255,192,0)"]]]
    ],
    ["circle", { fill: "$bg" }, [150, 150], 130],
    ["circle", { fill: "$sun" }, [110, 120], 50],
];

fs.writeFileSync(
    "radialgradient.svg",
    serialize(
        svg.svg({ width: 300, height: 300 }, svg.convertTree(scene))
    )
);
```

Result:

```xml
<svg version="1.1"
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
    <defs>
        <radialGradient id="bg" fx="150.00" fy="280.00" cx="150.00" cy="300.00" fr="300.00" r="100.00" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#07f"/>
            <stop offset="0.5" stop-color="#0ef"/>
            <stop offset="0.8" stop-color="#efe"/>
            <stop offset="1" stop-color="#af0"/>
        </radialGradient>
        <radialGradient id="sun" fx="110.00" fy="120.00" cx="110.00" cy="120.00" fr="5.00" r="50.00" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff"/>
            <stop offset="1" stop-color="rgb(255,255,192)" stop-opacity="0"/>
        </radialGradient>
    </defs>
    <circle cx="150.00" cy="150.00" r="130.00" fill="url(#bg)"/>
    <circle cx="110.00" cy="120.00" r="50.00" fill="url(#sun)"/>
</svg>
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hiccup-svg,
  title = "@thi.ng/hiccup-svg",
  author = "Karsten Schmidt",
  note = "https://thi.ng/hiccup-svg",
  year = 2016
}
```

## License

&copy; 2016 - 2021 Karsten Schmidt // Apache Software License 2.0
