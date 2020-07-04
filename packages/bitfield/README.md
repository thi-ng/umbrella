<!-- This file is generated - DO NOT EDIT! -->

# ![bitfield](https://media.thi.ng/umbrella/banners/thing-bitfield.svg?20dbf443)

[![npm version](https://img.shields.io/npm/v/@thi.ng/bitfield.svg)](https://www.npmjs.com/package/@thi.ng/bitfield)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/bitfield.svg)
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

1D / 2D bit field implementations.

All implementations are backed by typed arrays. Due to `Uint32Array`
backing the width is always rounded to a multiple of 32.

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/bitfield
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/bitfield?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/bitfield/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 947 bytes / CJS: 1008 bytes / UMD: 1.06 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## API

[Generated API docs](https://docs.thi.ng/umbrella/bitfield/)

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

Karsten Schmidt

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
