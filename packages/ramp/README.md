<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/ramp

[![npm version](https://img.shields.io/npm/v/@thi.ng/ramp.svg)](https://www.npmjs.com/package/@thi.ng/ramp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/ramp.svg)
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

Parametric interpolated 1D lookup tables for remapping values.

### Status

**ALPHA** - bleeding edge / work-in-progress

## Installation

```bash
yarn add @thi.ng/ramp
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

### ramp-synth <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ramp-synth.png)

Unison wavetable synth with waveform editor

[Live demo](https://demo.thi.ng/umbrella/ramp-synth/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ramp-synth)

## API

[Generated API docs](https://docs.thi.ng/umbrella/ramp/)

```ts
import { linear, hermite } from "@thi.ng/ramp";

const ramp = linear([[0.1, 0], [0.5, 1], [0.9, 0]]);

for(let i = 0; i <= 10; i++) {
    console.log(i / 10, ramp.at(i / 10));
}
// 0 0
// 0.1 0
// 0.2 0.25
// 0.3 0.49999999999999994
// 0.4 0.7500000000000001
// 0.5 1
// 0.6 0.75
// 0.7 0.5000000000000001
// 0.8 0.2499999999999999
// 0.9 0
// 1 0
```

## Authors

Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
