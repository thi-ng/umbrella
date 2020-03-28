<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/geom-clip-line](https://media.thi.ng/umbrella/banners/thing-geom-clip-line.svg?1585427390)

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
(Java) and Clojure version of [thi.ng/geom](http://thi.ng/geom).

This package has been extracted from the former (now obsolete)
@thi.ng/geom-clip package.

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/geom-clip-line
```

Package sizes (gzipped): ESM: 292 bytes / CJS: 348 bytes / UMD: 454 bytes

## Dependencies

- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)
- [tslib](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

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

## License

&copy; 2013 - 2020 Karsten Schmidt // Apache Software License 2.0
