<!-- This file is generated - DO NOT EDIT! -->

# ![viz](https://media.thi.ng/umbrella/banners/thing-viz.svg?e4890169)

[![npm version](https://img.shields.io/npm/v/@thi.ng/viz.svg)](https://www.npmjs.com/package/@thi.ng/viz)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/viz.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Declarative, functional & multi-format data visualization toolkit based around [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup).

This package largely started as a port of the visualization module of the
Clojure version of [thi.ng/geom](https://github.com/thi-ng/geom/) and is still
undergoing major redesigns.

For reference & what to expect (links to the Clojure version):

- [Examples](https://github.com/thi-ng/geom/blob/feature/no-org/org/examples/viz/demos.org)
- [Source](https://github.com/thi-ng/geom/blob/feature/no-org/org/src/viz/core.org)

| Example outputs                                               |                                                         |
|---------------------------------------------------------------|---------------------------------------------------------|
| ![](https://media.thi.ng/geom/viz/scatter-linear-3.svg)        | ![](https://media.thi.ng/geom/viz/scatter-log-3.svg)     |
| Logarithmic X-axis, linear Y                                  | Log X, Log Y                                            |
| ![](https://media.thi.ng/geom/viz/lineplot-3.svg)              | ![](https://media.thi.ng/geom/viz/areaplot-3.svg)        |
| Line plot (cartesian)                                         | Area plot (cartesian)                                   |
| ![](https://media.thi.ng/geom/viz/lineplot-polar-3.svg)        | ![](https://media.thi.ng/geom/viz/areaplot-polar-3.svg)  |
| Line plot (polar)                                             | Area plot (polar)                                       |
| ![](https://media.thi.ng/geom/viz/bars-3.svg)                  | ![](https://media.thi.ng/geom/viz/bars-interleave-3.svg) |
| Single value per domain position                              | 3 interleaved values (datasets) per domain position     |
| ![](https://media.thi.ng/geom/viz/radarplot-3.svg)             | ![](https://media.thi.ng/geom/viz/radarplot-minmax.svg)  |
| 6 categories, 3 data sets, single values                      | 6 categories, 3 data sets, min-max intervals            |
| ![](https://media.thi.ng/geom/viz/hm-rainbow2.svg)             | ![](https://media.thi.ng/geom/viz/hm-orange-blue.svg)    |
| Heatmap w/ rainbow gradient presets                           |                                                         |
| ![](https://media.thi.ng/geom/viz/hmp-yellow-magenta-cyan.svg) | ![](https://media.thi.ng/geom/viz/hmp-green-magenta.svg) |
| Heatmap polar projection                                      |                                                         |
| ![](https://media.thi.ng/geom/viz/hms-rainbow2.svg)            | ![](https://media.thi.ng/geom/viz/hmsp-rainbow2.svg)     |
| w/ custom shape fn                                            | polar projection, custom shape fn                       |
| ![](https://media.thi.ng/geom/viz/contours-4.svg)              | ![](https://media.thi.ng/geom/viz/terrain-6.svg)         |
| Contour plot                                                  |                                                         |

![](https://media.thi.ng/geom/viz/timeline-3.svg)

### Status

**ALPHA** - bleeding edge / work-in-progress

## Installation

```bash
yarn add @thi.ng/viz
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/viz?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/viz/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 2.23 KB / CJS: 2.38 KB / UMD: 2.28 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/viz/)

TODO

## Authors

Karsten Schmidt

## License

&copy; 2014 - 2020 Karsten Schmidt // Apache Software License 2.0
