<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/viz](https://media.thi.ng/umbrella/banners-20230807/thing-viz.svg?a413e6e2)

[![npm version](https://img.shields.io/npm/v/@thi.ng/viz.svg)](https://www.npmjs.com/package/@thi.ng/viz)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/viz.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This is a standalone project, maintained as part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and
anti-framework.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
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

| Example outputs                                                |                                                          |
|----------------------------------------------------------------|----------------------------------------------------------|
| ![](https://media.thi.ng/geom/viz/scatter-linear-3.svg)        | ![](https://media.thi.ng/geom/viz/scatter-log-3.svg)     |
| Logarithmic X-axis, linear Y                                   | Log X, Log Y                                             |
| ![](https://media.thi.ng/geom/viz/lineplot-3.svg)              | ![](https://media.thi.ng/geom/viz/areaplot-3.svg)        |
| Line plot (cartesian)                                          | Area plot (cartesian)                                    |
| ![](https://media.thi.ng/geom/viz/lineplot-polar-3.svg)        | ![](https://media.thi.ng/geom/viz/areaplot-polar-3.svg)  |
| Line plot (polar)                                              | Area plot (polar)                                        |
| ![](https://media.thi.ng/geom/viz/bars-3.svg)                  | ![](https://media.thi.ng/geom/viz/bars-interleave-3.svg) |
| Single value per domain position                               | 3 interleaved values (datasets) per domain position      |
| ![](https://media.thi.ng/geom/viz/radarplot-3.svg)             | ![](https://media.thi.ng/geom/viz/radarplot-minmax.svg)  |
| 6 categories, 3 data sets, single values                       | 6 categories, 3 data sets, min-max intervals             |
| ![](https://media.thi.ng/geom/viz/hm-rainbow2.svg)             | ![](https://media.thi.ng/geom/viz/hm-orange-blue.svg)    |
| Heatmap w/ rainbow gradient presets                            |                                                          |
| ![](https://media.thi.ng/geom/viz/hmp-yellow-magenta-cyan.svg) | ![](https://media.thi.ng/geom/viz/hmp-green-magenta.svg) |
| Heatmap polar projection                                       |                                                          |
| ![](https://media.thi.ng/geom/viz/hms-rainbow2.svg)            | ![](https://media.thi.ng/geom/viz/hmsp-rainbow2.svg)     |
| w/ custom shape fn                                             | polar projection, custom shape fn                        |
| ![](https://media.thi.ng/geom/viz/contours-4.svg)              | ![](https://media.thi.ng/geom/viz/terrain-6.svg)         |
| Contour plot                                                   |                                                          |
| ![](https://media.thi.ng/geom/viz/timeline-3.svg)              |                                                          |

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

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/viz"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const viz = await import("@thi.ng/viz");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.62 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

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

&copy; 2014 - 2024 Karsten Schmidt // Apache License 2.0
