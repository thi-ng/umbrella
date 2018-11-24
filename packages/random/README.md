# @thi.ng/random

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/random.svg)](https://www.npmjs.com/package/@thi.ng/random)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/random.svg)
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

This package provides the `IRandom` interface and various (mostly
seedable) pseudo-random number generator implementations, incl. a
`IRandom` wrapper for `Math.random()`:

- [Smush32](https://github.com/thi-ng/umbrella/tree/master/packages/random/src/smush.ts)
- [System](https://github.com/thi-ng/umbrella/tree/master/packages/random/src/system.ts)
- [XorShift128](https://github.com/thi-ng/umbrella/tree/master/packages/random/src/xorshift128.ts)
- [XorWow](https://github.com/thi-ng/umbrella/tree/master/packages/random/src/xorwow.ts)
- [XsAdd](https://github.com/thi-ng/umbrella/tree/master/packages/random/src/xsadd.ts)

## Installation

```bash
yarn add @thi.ng/random
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)

## Usage examples

```ts
import * as r from "@thi.ng/random";

const rnd = new r.Smush32(0xdecafbad);

// the following methods are available for all generators

// next uint (0 .. 2^32-1)
rnd.int()
// 4022849029

// next float [0.0 .. 1.0)
rnd.float()
// 0.2698542904737066

// next normalized float (w/ opt scale)
// [-scale .. +scale)
rnd.norm(100)
// 57.70723665079737

// next float in given interval [min .. max)
rnd.minmax(10, 20)
// 15.295951807707537

// next gaussian (using iterative CLT approach)
// optional params: num samples, offset, scale
rnd.gaussian()
// 0.10632886109089679
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
