# @thi.ng/geom-isec

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/geom-isec.svg)](https://www.npmjs.com/package/@thi.ng/geom-isec)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-isec.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [2D tests](#2d-tests)
    - [3D tests](#3d-tests)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

2D / 3D shape intersection tests:

### 2D tests

| Type   | Circle | Line | Poly | Rect | Tri |
|--------|:------:|:----:|:----:|:----:|:---:|
| Circle |   ✓    |      |      |      |     |
| Line   |        |  ✓   |      |      |     |
| Point  |   ✓    |  ✓   |  ✓   |  ✓   |  ✓  |
| Ray    |   ✓    |  ✓   |  ✓   |  ✓   |     |
| Rect   |   ✓    |      |      |  ✓   |     |

### 3D tests

| Type   | AABB | Sphere |
|--------|:----:|:------:|
| AABB   |  ✓   |   ✓    |
| Point  |  ✓   |   ✓    |
| Ray    |  ✓   |   ✓    |
| Sphere |      |   ✓    |

## Installation

```bash
yarn add @thi.ng/geom-isec
```

## Dependencies

- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/master/packages/geom-api)
- [@thi.ng/geom-closest-point](https://github.com/thi-ng/umbrella/tree/master/packages/geom-closest-point)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

```ts
import * as isec from "@thi.ng/geom-isec";

const res = isec.intersectLineLine([0,0], [100,50], [50,100], [50,-100]);
// { type: 4, isec: [ 50, 25 ], alpha: 0.5, beta: 0.375, det: -20000 }

res.type === isec.IntersectionType.INTERSECT
// true
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
