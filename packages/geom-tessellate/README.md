<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/geom-tessellate

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-tessellate.svg)](https://www.npmjs.com/package/@thi.ng/geom-tessellate)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-tessellate.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

2D/3D convex polygon tessellators.

- [earcut](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/earcut.ts)
- [edgeSplit](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/edge-split.ts)
- [inset](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/inset.ts)
- [quadFan](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/quad-fan.ts)
- [rimTris](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/rim-tris.ts)
- [triFan](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-tessellate/src/tri-fan.ts)

**Note**: Though not officially supported, all functions *might* also
work (in principle) with concave polygons, though correct results are
highly dependent on the concavities present. YMMV!

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/geom-tessellate
```

Package sizes (gzipped): ESM: 0.8KB / CJS: 0.9KB / UMD: 0.9KB

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/master/packages/geom-api)
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/master/packages/geom-isec)
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/master/packages/geom-poly-utils)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### geom-tessel <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/geom/tessel.png)

[Live demo](https://demo.thi.ng/umbrella/geom-tessel/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/geom-tessel)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-tessellate/)

TODO

## Authors

Karsten Schmidt

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
