<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-isec](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-geom-isec.svg?3aa44d2b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-isec.svg)](https://www.npmjs.com/package/@thi.ng/geom-isec)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-isec.svg)
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
  - [3D tests](#3d-tests)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

2D/3D shape intersection checks. This is a support package for [@thi.ng/geom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom).

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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bgeom-isec%5D)

## Installation

```bash
yarn add @thi.ng/geom-isec
```

ESM import:

```ts
import * as isec from "@thi.ng/geom-isec";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-isec"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const isec = await import("@thi.ng/geom-isec");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.27 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/geom-closest-point](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-closest-point)
- [@thi.ng/math](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/math)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

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

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2013 - 2026 Karsten Schmidt // Apache License 2.0
