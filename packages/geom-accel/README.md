<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/geom-accel](https://media.thi.ng/umbrella/banners/thing-geom-accel.svg?1585427431)

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

n-D spatial indexing data structures.

Some implementations were ported from the Clojure version of
[thi.ng/geom](http://thi.ng/geom).

Currently available:

- [k-D Tree](src/kdtree.ts)

**TODO: reimport / publish**

- [Grid](src/grid.ts)
- [Quadtree](src/quadtree.ts)
- [Octree](src/octree.ts)
- [Morton / Z-order](src/morton.ts)

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/geom-accel
```

Package sizes (gzipped): ESM: 2.85 KB / CJS: 2.93 KB / UMD: 2.92 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec)
- [@thi.ng/heaps](https://github.com/thi-ng/umbrella/tree/develop/packages/heaps)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)
- [tslib](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                                                      | Live demo                                              | Source                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn.jpg" width="240"/>         | Doodle w/ K-nearest neighbor search result visualization                         | [Demo](https://demo.thi.ng/umbrella/geom-knn/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-knn)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/> | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-accel/)

TODO

## Authors

Karsten Schmidt

## License

&copy; 2013 - 2020 Karsten Schmidt // Apache Software License 2.0
