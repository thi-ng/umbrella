# @thi.ng/bitfield

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/bitfield.svg)](https://www.npmjs.com/package/@thi.ng/bitfield)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/bitfield.svg)
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

Typed array backed 1D / 2D bit field / bit matrix implementations. Due
to `Uint32Array` backing, width is always a multiple of 32.

## Installation

```bash
yarn add @thi.ng/bitfield
```

## Dependencies

- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/master/packages/binary)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/master/packages/strings)

## Usage examples

```ts
import { BitField, BitMatrix } from "@thi.ng/bitfield";

// size always rounded up to a multiple of 32
const field = new BitField(16);

field.setAt(0);

// if 2nd arg is false, the bit will be cleared
// setAt returns non-zero value if bit was previously set
field.setAt(31, true);
// 0

// returns non-zero value if bit is set
field.at(0)
// -2147483648

field.at(1)
// 0

field.toString();
// 10000000000000000000000000000001

field.resize(64)
// 1000000000000000000000000000000100000000000000000000000000000000

const mat = new BitMatrix(8, 32);
for(let i = 0; i < 8; i++) mat.setAt(i, i);

mat.at(7, 7);
// 16777216

mat.toString();
// 10000000000000000000000000000000
// 01000000000000000000000000000000
// 00100000000000000000000000000000
// 00010000000000000000000000000000
// 00001000000000000000000000000000
// 00000100000000000000000000000000
// 00000010000000000000000000000000
// 00000001000000000000000000000000
```

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
