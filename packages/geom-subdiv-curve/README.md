<!-- This file is generated - DO NOT EDIT! -->

# ![geom-subdiv-curve](https://media.thi.ng/umbrella/banners/thing-geom-subdiv-curve.svg?97e73b93)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-subdiv-curve.svg)](https://www.npmjs.com/package/@thi.ng/geom-subdiv-curve)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-subdiv-curve.svg)
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

Freely customizable, iterative nD subdivision curves for open / closed geometries.

Based in principle on:

- [Generating subdivision curves with L−systems on a
  GPU](http://algorithmicbotany.org/papers/subgpu.sig2003.pdf)
- Clojure version [thi.ng/geom-clj](http://thi.ng/geom-clj).

Supplied / implemented subdivision schemes:

- Split @ midpoints (open / closed)
- Split @ thirds (open / closed)
- Chaikin (open / closed)
- Cubic (closed only)

| Chaikin (closed)                                        | Chaikin (open)                                      |
|---------------------------------------------------------|-----------------------------------------------------|
| ![chaikin closed](../../assets/geom/chaikin-closed.svg) | ![chaikin open](../../assets/geom/chaikin-open.svg) |

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=is%3Aissue+is%3Aopen+%5Bgeom-subdiv-curve%5D)

## Installation

```bash
yarn add @thi.ng/geom-subdiv-curve
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/geom-subdiv-curve?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/geom-subdiv-curve/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 657 bytes / CJS: 734 bytes / UMD: 788 bytes

## Dependencies

- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-subdiv-curve/)

```ts
import * as gsc from "@thi.ng/geom-subdiv-curve";

gsc.subdivide([[0,0], [100,0], [100,100], [0,100]], gsc.SUBDIV_CHAIKIN_CLOSED, 4)
```

## Authors

Karsten Schmidt

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
