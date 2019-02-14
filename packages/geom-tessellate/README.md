# @thi.ng/geom-tessellate

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/geom-tessellate.svg)](https://www.npmjs.com/package/@thi.ng/geom-tessellate)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-tessellate.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

2D/3D polygon tessellators:

- [earcut](https://github.com/thi-ng/umbrella/tree/master/packages/geom-tessellate/src/earcut.ts)
- [edgeSplit](https://github.com/thi-ng/umbrella/tree/master/packages/geom-tessellate/src/edge-split.ts)
- [inset](https://github.com/thi-ng/umbrella/tree/master/packages/geom-tessellate/src/inset.ts)
- [quadFan](https://github.com/thi-ng/umbrella/tree/master/packages/geom-tessellate/src/quad-fan.ts)
- [rimTris](https://github.com/thi-ng/umbrella/tree/master/packages/geom-tessellate/src/rim-tris.ts)
- [triFan](https://github.com/thi-ng/umbrella/tree/master/packages/geom-tessellate/src/tri-fan.ts)

## Installation

```bash
yarn add @thi.ng/geom-tessellate
```

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

```ts
import * as tess from "@thi.ng/geom-tessellate";
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
