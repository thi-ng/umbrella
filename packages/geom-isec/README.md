<!-- This file is generated - DO NOT EDIT! -->

# ![geom-isec](https://media.thi.ng/umbrella/banners/thing-geom-isec.svg?78ca30b4)

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

2D/3D shape intersection checks. This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

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

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-isec%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/geom-isec
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-isec"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const geomIsec = await import("@thi.ng/geom-isec");
```

Package sizes (gzipped, pre-treeshake): ESM: 2.71 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/geom-closest-point](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-closest-point)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

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

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-isec,
  title = "@thi.ng/geom-isec",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-isec",
  year = 2013
}
```

## License

&copy; 2013 - 2021 Karsten Schmidt // Apache Software License 2.0
