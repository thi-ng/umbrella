<!-- This file is generated - DO NOT EDIT! -->

# ![geom-clip-line](https://media.thi.ng/umbrella/banners/thing-geom-clip-line.svg?006770bd)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-clip-line.svg)](https://www.npmjs.com/package/@thi.ng/geom-clip-line)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-clip-line.svg)
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

2D line clipping (Liang-Barsky).

Current implementation is based on [toxiclibs](http://toxiclibs.org)
(Java) and Clojure version [thi.ng/geom-clj](http://thi.ng/geom-clj).

This package has been extracted from the former (now obsolete)
@thi.ng/geom-clip package.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-clip-line%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/geom-clip-line
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/geom-clip-line?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/geom-clip-line/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 532 bytes / CJS: 598 bytes / UMD: 708 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-clip-line/)

- `liangBarsky2`
- `liangBarksy2Raw`

```ts
import { liangBarsky2 } from "@thi.ng/geom-clip-line";

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

Karsten Schmidt

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

&copy; 2013 - 2020 Karsten Schmidt // Apache Software License 2.0
