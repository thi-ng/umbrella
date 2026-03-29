<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-accel](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-geom-accel.svg?b7310bf5)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-accel.svg)](https://www.npmjs.com/package/@thi.ng/geom-accel)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-accel.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

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
[thi.ng/geom](http://thi.ng/geom-clj).

Currently available:

- [HashGrid2/3](src/hash-grid.ts)
- [KdTreeMap](src/kd-tree-map.ts)
- [KdTreeSet](src/kd-tree-set.ts)
- [NdQuadtreeMap](src/nd-quadtree-map.ts)
- [NdQuadtreeSet](src/nd-quadtree-set.ts)
- [SpatialGrid2](src/spatial-grid2.ts)
- [SpatialGrid3](src/spatial-grid3.ts)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bgeom-accel%5D)

## Installation

```bash
yarn add @thi.ng/geom-accel
```

ESM import:

```ts
import * as accel from "@thi.ng/geom-accel";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-accel"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const accel = await import("@thi.ng/geom-accel");
```

Package sizes (brotli'd, pre-treeshake): ESM: 4.71 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/arrays](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/arrays)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/distance](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/distance)
- [@thi.ng/equiv](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/equiv)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/geom-isec](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-isec)
- [@thi.ng/heaps](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/heaps)
- [@thi.ng/math](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/math)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Seven projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                      | Description                                                                      | Live demo                                              | Source                                                                                      |
|:--------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:-------------------------------------------------------|:--------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/boid-basics.png" width="240"/>      | Basic 2D boid simulation and spatial indexing neighbor lookups                   | [Demo](https://demo.thi.ng/umbrella/boid-basics/)      | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/boid-basics)      |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/geom-knn.jpg" width="240"/>         | Doodle w/ K-nearest neighbor search result visualization                         | [Demo](https://demo.thi.ng/umbrella/geom-knn/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-knn)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/geom-knn-hash.jpg" width="240"/>    | K-nearest neighbor search in an hash grid                                        | [Demo](https://demo.thi.ng/umbrella/geom-knn-hash/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-knn-hash)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/> | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-voronoi-mst) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/poisson/poisson.jpg" width="240"/>           | 2D Poisson-disc sampler with procedural gradient map                             | [Demo](https://demo.thi.ng/umbrella/poisson-circles/)  | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/poisson-circles)  |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/poisson-image.avif" width="240"/>   | Image-based Poisson-disk sampling                                                | [Demo](https://demo.thi.ng/umbrella/poisson-image/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/poisson-image)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/poisson/stratified-grid.png" width="240"/>   | 2D Stratified grid sampling example                                              | [Demo](https://demo.thi.ng/umbrella/stratified-grid/)  | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/stratified-grid)  |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-accel/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2013 - 2026 Karsten Schmidt // Apache License 2.0
