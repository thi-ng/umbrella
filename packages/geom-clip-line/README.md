<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-clip-line](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-geom-clip-line.svg?bda30e3e)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-clip-line.svg)](https://www.npmjs.com/package/@thi.ng/geom-clip-line)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-clip-line.svg)
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
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

2D line clipping (Liang-Barsky). This is a support package for [@thi.ng/geom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom).

Current implementation is partially based on [toxiclibs](http://toxiclibs.org)
(Java) and Clojure version [thi.ng/geom-clj](http://thi.ng/geom-clj). Also see
[@thi.ng/geom-clip-poly](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-clip-poly)
sister package.

The following main functions are provided:

- [`clipLinePoly()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/clipLinePoly.html)
- [`clipLineSegmentPoly()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/clipLineSegmentPoly.html)
- [`clipPolylinePoly()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/clipPolylinePoly.html)
- [`liangBarsky2()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/liangBarsky2.html)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bgeom-clip-line%5D)

## Related packages

- [@thi.ng/geom-clip-poly](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-clip-poly) - 2D polygon clipping / offsetting (Sutherland-Hodgeman, Grainer-Hormann)

## Installation

```bash
yarn add @thi.ng/geom-clip-line
```

ESM import:

```ts
import * as gcl from "@thi.ng/geom-clip-line";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-clip-line"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const gcl = await import("@thi.ng/geom-clip-line");
```

Package sizes (brotli'd, pre-treeshake): ESM: 762 bytes

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/geom-isec](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-isec)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-clip-line/)

```ts
import { clipPolylinePoly, liangBarsky2 } from "@thi.ng/geom-clip-line";

clipPolylinePoly(
    // polyline vertices
    [[10, -50], [30, 30], [-50, 50], [150, 50], [70, 70], [90, 150]],
    // boundary polygon vertices
    [[0, 0], [100, 0], [100, 100], [0, 100]]
);
// result is 3 polylines:
// (since the original is temporarily leaving the poly)
// [
//   [ [ 22.5, 0 ], [ 30, 30 ], [ 0, 37.5 ] ],
//   [ [ 0, 50 ], [ 100, 50 ] ],
//   [ [ 100, 62.5 ], [ 70, 70 ], [ 77.5, 100 ] ]
// ]

// Liang-Barsky is optimized for rectangular clipping regions
liangBarsky2(
    // line end points
    [-10, -20], [30, 400],
    // min/max clip rect
    [0, 0], [100, 200]
)
// [ [ 0, 85 ], [ 10.952380952380953, 200 ], 0.25, 0.5238095238095238 ]

// returns undefined if line is completely outside the clip rect
liangBarsky2(
    // line end points
    [-10, -20], [-30, 400],
    // min/max bbox
    [0, 0], [100, 200]
)
// undefined
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-clip-line,
  title = "@thi.ng/geom-clip-line",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-clip-line",
  year = 2013
}
```

## License

&copy; 2013 - 2026 Karsten Schmidt // Apache License 2.0
