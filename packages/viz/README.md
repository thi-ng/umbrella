<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/viz](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-viz.svg?aa791127)

[![npm version](https://img.shields.io/npm/v/@thi.ng/viz.svg)](https://www.npmjs.com/package/@thi.ng/viz)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/viz.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Declarative, functional & multi-format data visualization toolkit based around [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup).

This package largely started as a port of the visualization module of the
Clojure version [thi.ng/geom-clj](https://github.com/thi-ng/geom/) and is still
undergoing major redesigns.

For reference & what to expect (links to the Clojure version):

- [Examples](https://github.com/thi-ng/geom/blob/feature/no-org/org/examples/viz/demos.org)
- [Source](https://github.com/thi-ng/geom/blob/feature/no-org/org/src/viz/core.org)

| Example outputs                                                                                       |                                                                                                 |
|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/scatter-linear-3.svg)        | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/scatter-log-3.svg)     |
| Logarithmic X-axis, linear Y                                                                          | Log X, Log Y                                                                                    |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/lineplot-3.svg)              | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/areaplot-3.svg)        |
| Line plot (cartesian)                                                                                 | Area plot (cartesian)                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/lineplot-polar-3.svg)        | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/areaplot-polar-3.svg)  |
| Line plot (polar)                                                                                     | Area plot (polar)                                                                               |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/bars-3.svg)                  | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/bars-interleave-3.svg) |
| Single value per domain position                                                                      | 3 interleaved values (datasets) per domain position                                             |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/radarplot-3.svg)             | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/radarplot-minmax.svg)  |
| 6 categories, 3 data sets, single values                                                              | 6 categories, 3 data sets, min-max intervals                                                    |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/hm-rainbow2.svg)             | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/hm-orange-blue.svg)    |
| Heatmap w/ rainbow gradient presets                                                                   |                                                                                                 |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/hmp-yellow-magenta-cyan.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/hmp-green-magenta.svg) |
| Heatmap polar projection                                                                              |                                                                                                 |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/hms-rainbow2.svg)            | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/hmsp-rainbow2.svg)     |
| w/ custom shape fn                                                                                    | polar projection, custom shape fn                                                               |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/contours-4.svg)              | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/terrain-6.svg)         |
| Contour plot                                                                                          |                                                                                                 |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/viz/timeline-3.svg)              |                                                                                                 |

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bviz%5D+in%3Atitle)

## Related packages

- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) - HTML/SVG/XML serialization of nested data structures, iterables & closures
- [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) - Hiccup shape tree renderer for vanilla Canvas 2D contexts
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & related tooling

## Installation

```bash
yarn add @thi.ng/viz
```

ESM import:

```ts
import * as viz from "@thi.ng/viz";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/viz"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const viz = await import("@thi.ng/viz");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.99 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/object-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/object-utils)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Two projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                               | Description                                                | Live demo                                              | Source                                                                              |
|:-------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/viz-ridge-lines.avif" width="240"/>  | Interactive ridge-line plot                                | [Demo](https://demo.thi.ng/umbrella/viz-ridge-lines/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/viz-ridge-lines)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/viz-scatter-plot.avif" width="240"/> | Interactive scatter & line plot of low-discrepancy samples | [Demo](https://demo.thi.ng/umbrella/viz-scatter-plot/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/viz-scatter-plot) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/viz/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-viz,
  title = "@thi.ng/viz",
  author = "Karsten Schmidt",
  note = "https://thi.ng/viz",
  year = 2014
}
```

## License

&copy; 2014 - 2025 Karsten Schmidt // Apache License 2.0
