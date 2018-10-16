# @thi.ng/dsp

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/dsp.svg)](https://www.npmjs.com/package/@thi.ng/dsp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dsp.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Assorted DSP utils collected & ported from other thi.ng projects (e.g.
[thi.ng/synstack](https://github.com/thi-ng/synstack)). Currently only
features various [stateless & stateful wave generators /
oscillators](https://github.com/thi-ng/umbrella/tree/master/packages/dsp/src/osc.ts),
which have been ported from thi.ng/vexed-generation.

## Status

ALPHA / WIP

## Installation

```bash
yarn add @thi.ng/dsp
```

## Dependencies

- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)

## Usage examples

```ts
import * as dsp from "@thi.ng/dsp";
import { take } from "@thi.ng/transducers";

[...take(20, new dsp.Oscillator(dsp.mix(dsp.sin,dsp.rect), 1/20)]
// [ 0.5,
//   0.6545084971874737,
//   0.7938926261462366,
//   0.9045084971874737,
//   0.9755282581475768,
//   1,
//   0.9755282581475768,
//   0.9045084971874737,
//   0.7938926261462367,
//   0.654508497187474,
//   0.5000000000000003,
//   -0.6545084971874735,
//   -0.7938926261462365,
//   -0.9045084971874737,
//   -0.9755282581475768,
//   -1,
//   -0.9755282581475766,
//   -0.9045084971874735,
//   -0.793892626146236,
//   -0.6545084971874731 ]
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
