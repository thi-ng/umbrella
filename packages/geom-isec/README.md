<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/geom-isec](https://media.thi.ng/umbrella/banners/thing-geom-isec.svg?1584814486)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-isec.svg)](https://www.npmjs.com/package/@thi.ng/geom-isec)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-isec.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [3D tests](#3d-tests)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

2D/3D shape intersection checks.

| Type   | Circle | Line | Poly | Ray | Rect | Tri |
|--------|:------:|:----:|:----:|:---:|:----:|:---:|
| Circle |   ✓    |      |      |     |      |     |
| Line   |        |  ✓   |      |     |      |     |
| Point  |   ✓    |  ✓   |  ✓   |     |  ✓   |  ✓  |
| Ray    |   ✓    |  ✓   |  ✓   |     |  ✓   |     |
| Rect   |   ✓    |      |      |     |  ✓   |     |

### 3D tests

| Type   | AABB | Plane | Point | Ray | Sphere |
|--------|:----:|:-----:|:-----:|:---:|:------:|
| AABB   |  ✓   |       |       |     |   ✓    |
| Plane  |      |   ✓   |       |     |        |
| Point  |  ✓   |       |       |     |   ✓    |
| Ray    |  ✓   |   ✓   |       |     |   ✓    |
| Sphere |      |       |       |     |   ✓    |

Current implementations partially based on
[toxiclibs](http://toxiclibs.org) (Java) and Clojure version of
[thi.ng/geom](http://thi.ng/geom).

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/geom-isec
```

Package sizes (gzipped): ESM: 2.3KB / CJS: 2.4KB / UMD: 2.4KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/geom-closest-point](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-closest-point)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)
- [tslib](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-isec/)

```ts
import * as isec from "@thi.ng/geom-isec";

const res = isec.intersectLineLine([0, 0], [100, 50], [50, 100], [50, -100]);
// { type: 4, isec: [ 50, 25 ], alpha: 0.5, beta: 0.375, det: -20000 }

res.type === isec.IntersectionType.INTERSECT
// true
```

## Authors

Karsten Schmidt

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
