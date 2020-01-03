<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/geom-accel

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

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/master/packages/arrays)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/master/packages/geom-api)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/master/packages/geom-isec)
- [@thi.ng/heaps](https://github.com/thi-ng/umbrella/tree/master/packages/heaps)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### geom-knn <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/geom-knn.jpg)

[Live demo](https://demo.thi.ng/umbrella/geom-knn/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/geom-knn)

### geom-voronoi-mst <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/geom-voronoi-mst.jpg)

Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization

[Live demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/geom-voronoi-mst)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-accel/)

TODO

## Authors

Karsten Schmidt

## License

&copy; 2013 - 2020 Karsten Schmidt // Apache Software License 2.0
