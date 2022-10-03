<!-- This file is generated - DO NOT EDIT! -->

# ![geom-accel](https://media.thi.ng/umbrella/banners-20220914/thing-geom-accel.svg?34deae23)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-accel.svg)](https://www.npmjs.com/package/@thi.ng/geom-accel)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-accel.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

n-D spatial indexing data structures with a shared ES6 Map/Set-like API.

Some implementations were ported from the Clojure version of
[thi.ng/geom](http://thi.ng/geom).

Currently available:

- [KdTreeMap](src/kd-tree-map.ts)
- [KdTreeSet](src/kd-tree-set.ts)
- [NdQuadtreeMap](src/nd-quadtree-map.ts)
- [NdQuadtreeSet](src/nd-quadtree-set.ts)
- [SpatialGrid2](src/spatial-grid2.ts)
- [SpatialGrid3](src/spatial-grid3.ts)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-accel%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/geom-accel
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-accel"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const geomAccel = await import("@thi.ng/geom-accel");
```

Package sizes (gzipped, pre-treeshake): ESM: 4.06 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec)
- [@thi.ng/heaps](https://github.com/thi-ng/umbrella/tree/develop/packages/heaps)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                                                      | Live demo                                              | Source                                                                              |
|:------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn.jpg" width="240"/>         | Doodle w/ K-nearest neighbor search result visualization                         | [Demo](https://demo.thi.ng/umbrella/geom-knn/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-knn)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/> | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/poisson/poisson.jpg" width="240"/>           | 2D Poisson-disc sampler with procedural gradient map                             | [Demo](https://demo.thi.ng/umbrella/poisson-circles/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poisson-circles)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/poisson/stratified-grid.png" width="240"/>   | 2D Stratified grid sampling example                                              | [Demo](https://demo.thi.ng/umbrella/stratified-grid/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/stratified-grid)  |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-accel/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-accel,
  title = "@thi.ng/geom-accel",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-accel",
  year = 2013
}
```

## License

&copy; 2013 - 2022 Karsten Schmidt // Apache Software License 2.0
