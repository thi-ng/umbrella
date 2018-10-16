# @thi.ng/morton

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/morton.svg)](https://www.npmjs.com/package/@thi.ng/morton)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/morton.svg)
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

[Z-order-curve](https://en.wikipedia.org/wiki/Z-order_curve) / Morton
encoding & decoding for 1D, 2D, 3D.

- https://fgiesen.wordpress.com/2009/12/13/decoding-morton-codes/
- https://www.forceflow.be/2013/10/07/morton-encodingdecoding-through-bit-interleaving-implementations/
- https://github.com/JaneliaSciComp/Morton.jl/blob/master/src/Morton.jl

## Installation

```bash
yarn add @thi.ng/morton
```

## Dependencies

- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/master/packages/binary)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)

## Usage examples

```ts
import * as m from "@thi.ng/morton";

m.mux2(23, 42);
// 2461

m.demux2(2461)
// [ 23, 42 ]

m.muxScaled2(0.25, 0.75)
// 2594876074

m.demuxScaled2(m.muxScaled2(0.25, 0.75))
// [ 0.2500038147554742, 0.7499961852445258 ]
```

## Authors

- Karsten Schmidt

## License

&copy; 2015 - 2018 Karsten Schmidt // Apache Software License 2.0
