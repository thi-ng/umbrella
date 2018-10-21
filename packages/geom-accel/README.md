# @thi.ng/geom-accel

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/geom-accel.svg)](https://www.npmjs.com/package/@thi.ng/geom-accel)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-accel.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

A selection of spatial indexing data structures...

- [k-D Tree](src/kdtree.ts)

**TODO: reimport**

- [Grid](src/grid.ts)
- [Quadtree](src/quadtree.ts)
- [Octree](src/octree.ts)
- [Morton / Z-order](src/morton.ts)

## Installation

```bash
yarn add @thi.ng/geom-accel
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/heaps](https://github.com/thi-ng/umbrella/tree/master/packages/heaps)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Please see the
[geom-knn](https://github.com/thi-ng/umbrella/tree/master/examples/geom-knn)
example for concrete usage & comments...

[Live demo](https://demo.thi.ng/umbrella/geom-knn) |
[Source](https://github.com/thi-ng/umbrella/tree/master/examples/geom-knn)

```ts
import { KdTree } from "@thi.ng/geom-accel";
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
