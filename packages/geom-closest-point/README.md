<!-- This file is generated - DO NOT EDIT! -->

# ![geom-closest-point](https://media.thi.ng/umbrella/banners/thing-geom-closest-point.svg?cd50c3a4)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-closest-point.svg)](https://www.npmjs.com/package/@thi.ng/geom-closest-point)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-closest-point.svg)
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

2D / 3D closest point / proximity helpers.

Current implementations partially based on
[toxiclibs](http://toxiclibs.org) (Java) and Clojure version of
[thi.ng/geom](http://thi.ng/geom).

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/geom-closest-point
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/geom-closest-point?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/geom-closest-point/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 1.00 KB / CJS: 1.10 KB / UMD: 1.14 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-closest-point/)

- `closestPointAABB`
- `closestPointArray`
- `closestPointCircle`
- `closestPointLine`
- `closestPointPlane`
- `closestPointPolyline`
- `closestPointRect`
- `closestPointSphere`
- `closestPointSegment`
- `closestT`
- `distToLine`
- `distToSegment`

## Authors

Karsten Schmidt

## License

&copy; 2018 - 2020 Karsten Schmidt // Apache Software License 2.0
