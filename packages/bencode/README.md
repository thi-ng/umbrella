# @thi.ng/bencode

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/bencode.svg)](https://www.npmjs.com/package/@thi.ng/bencode)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/bencode.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Features](#features)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Binary [Bencode](https://en.wikipedia.org/wiki/Bencode) encoder
(currently no decoding yet) for structured data.

### Features

#### Floating point values

This implementation has optional support for floating point
values. If these are not desired (e.g. for compatibility reasons), all
numeric values MUST be pre-rounded to integers. Furthermore, floats are
only supported if their absolute value is in the interval `[1e-6,1e21)`.

#### String handling

All strings will be UTF-8 encoded. To write raw bytes without
transformation, wrap them as `Uint8Array`. These too will be written as
Bencode strings, but are used as is.

## Installation

```bash
yarn add @thi.ng/bencode
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/master/packages/defmulti)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-binary)

## Usage examples

```ts
import { encode } from "@thi.ng/bencode";
import { hexDump } from "@thi.ng/transducers-binary";

[...hexDump({}, b.encode({ foo: "bar", "baz": [0,1,2,3], "pi": Math.PI }))]
// [ '00000000 | 64 33 3a 62 61 7a 6c 69 30 65 69 31 65 69 32 65 | d3:bazli0ei1ei2e',
//   '00000010 | 69 33 65 65 33 3a 66 6f 6f 33 3a 62 61 72 32 3a | i3ee3:foo3:bar2:',
//   '00000020 | 70 69 66 33 2e 31 34 31 35 39 32 36 35 33 35 38 | pif3.14159265358',
//   '00000030 | 39 37 39 33 65 65 00 00 00 00 00 00 00 00 00 00 | 9793ee..........' ]

// Uin8Array values are written verbatim (as Bencode strings)
[...hexDump({}, b.encode({ foo: new Uint8Array([0,1,2,3]) }))]
// [ '00000000 | 64 33 3a 66 6f 6f 34 3a 00 01 02 03 65 00 00 00 | d3:foo4:....e...' ]
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
