# @thi.ng/grid-iterators

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/grid-iterators.svg)](https://www.npmjs.com/package/@thi.ng/grid-iterators)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/grid-iterators.svg)
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

Collection of 2D grid iterators, providing the following orderings:

| [Diagonal](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/diagonal2d.ts)         | [Hilbert curve](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/hilbert2d.ts)     | [Outward spiral](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/spiral2d.ts) |
|---------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| ![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/grid-diagonal.gif)    | ![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/grid-hilbert.gif)     | ![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/grid-spiral.gif)  |
| [Zigzag columns](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/columns2d.ts)    | [Zigzag rows](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/rows2d.ts)          |                                                                                                           |
| ![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/grid-zigzag-cols.gif) | ![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/grid-zigzag-rows.gif) |                                                                                                           |

All functions have been ported from [Christopher
Kulla](https://fpsunflower.github.io/ckulla/)'s Java-based [Sunflow
renderer](https://sunflow.sf.net).

For alternative 2D/3D grid iteration, also see `range2d()` & `range3d()` in
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers).

## Installation

```bash
yarn add @thi.ng/grid-iterators
```

## Dependencies

None

## Usage examples

```ts
import * as gi from "@thi.ng/grid-iterators";

[...gi.zigzagRows2d(4, 4)]

// [
//   [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ],
//   [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ],
//   [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ],
//   [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ]
// ]
```

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
