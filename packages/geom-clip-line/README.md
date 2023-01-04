<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/geom-clip-line](https://media.thi.ng/umbrella/banners-20220914/thing-geom-clip-line.svg?8ca4f323)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-clip-line.svg)](https://www.npmjs.com/package/@thi.ng/geom-clip-line)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-clip-line.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

2D line clipping (Liang-Barsky). This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

Current implementation is partially based on [toxiclibs](http://toxiclibs.org)
(Java) and Clojure version [thi.ng/geom-clj](http://thi.ng/geom-clj). Also see
[@thi.ng/geom-clip-poly](https://github.com/thi-ng/umbrella/blob/develop/packages/geom-clip-poly)
sister package.

The following main functions are provided:

- [`clipLinePoly()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/clipLinePoly.html)
- [`clipLineSegmentPoly()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/clipLineSegmentPoly.html)
- [`clipPolylinePoly()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/clipPolylinePoly.html)
- [`liangBarsky2()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/liangBarsky2.html)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-clip-line%5D+in%3Atitle)

## Related packages

- [@thi.ng/geom-clip-poly](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-poly) - 2D polygon clipping / offsetting (Sutherland-Hodgeman, Grainer-Hormann)

## Installation

```bash
yarn add @thi.ng/geom-clip-line
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-clip-line"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const geomClipLine = await import("@thi.ng/geom-clip-line");
```

Package sizes (brotli'd, pre-treeshake): ESM: 661 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

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

&copy; 2013 - 2023 Karsten Schmidt // Apache License 2.0
