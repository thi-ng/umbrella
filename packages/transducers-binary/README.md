# @thi.ng/transducers-binary

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/transducers-binary.svg)](https://www.npmjs.com/package/@thi.ng/transducers-binary)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/transducers-binary.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
    - [Streaming hexdump](#streaming-hexdump)
    - [Structured byte buffer construction](#structured-byte-buffer-construction)
    - [Bitstream](#bitstream)
    - [Base64 & UTF-8 en/decoding](#base64--utf-8-endecoding)
- [API](#api)
    - [Transducers](#transducers)
    - [Reducers](#reducers)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Binary data related transducers & reducers.

## Installation

```bash
yarn add @thi.ng/transducers-binary
```

## Dependencies

- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/master/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Usage examples

```ts
import * as tx from "@thi.ng/transducers";
import * as txb from "@thi.ng/transducers-binary";
```

### Streaming hexdump

This is a higher-order transducer, purely composed from other
transducers. [See code
here](https://github.com/thi-ng/umbrella/tree/master/packages/transducers/src/xform/hex-dump.ts).

```ts
src = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 33, 48, 49, 50, 51, 126, 122, 121, 120]

[...tx.iterator(txb.hexDump({ cols: 8, address: 0x400 }), src)]
// [ '00000400 | 41 42 43 44 45 46 47 48 | ABCDEFGH',
//   '00000408 | 49 4a 21 30 31 32 33 7e | IJ!0123~',
//   '00000410 | 7a 79 78 00 00 00 00 00 | zyx.....' ]
```

### Structured byte buffer construction

```ts
console.log(
    tx.str("\n",
        txb.hexDump({ cols: 16 },
            txb.bytes(
                // initial buffer capacity (grows on demand)
                32,
                // structured data
                [
                    txb.u32(0xdecafbad),
                    // all strings will be utf-8 encoded
                    txb.str("vec4"),
                    // use little-endian for these array vals
                    txb.u16array([1, 2, 3, 4], true),
                    txb.str("FIN"),
                    txb.u8(0x2a)
                ]
            )
        )
    )
);

// 00000000 | de ca fb ad 76 65 63 34 01 00 02 00 03 00 04 00 | ....vec4........
// 00000010 | 46 49 4e 2a 00 00 00 00 00 00 00 00 00 00 00 00 | FIN*............
```

### Bitstream

```ts
[...txb.bits(8, [0xf0, 0xaa])]
// [ 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0 ]

[...tx.iterator(
    tx.comp(
        txb.bits(8),
        tx.map(x=> x ? "#" : "."),
        tx.partition(8),
        tx.map(x=>x.join(""))
    ),
    [ 0x00, 0x18, 0x3c, 0x66, 0x66, 0x7e, 0x66, 0x00 ])]
// [ '........',
//   '...##...',
//   '..####..',
//   '.##..##.',
//   '.##..##.',
//   '.######.',
//   '.##..##.',
//   '........' ]
```

### Base64 & UTF-8 en/decoding

Unlike JS default `btoa()` / `atob()` functions which operate on
strings, these transducers convert byte values to base64 and back.

```ts
// here we first add an offset (0x80) to allow negative values to be encoded
// (URL safe results can be produced via opt arg to `base64Encode`)
enc = tx.transduce(
    tx.comp(
        tx.map(x => x + 0x80),
        txb.base64Encode()
    ),
    tx.str(),
    tx.range(-8, 8)
);
// "eHl6e3x9fn+AgYKDhIWGhw=="

// remove offset again during decoding, but (for example) only decode while val < 0
[...tx.iterator(
    tx.comp(
        txb.base64Decode(),
        tx.map(x => x - 0x80),
        tx.takeWhile(x=> x < 0)
    ),
    enc)]
// [ -8, -7, -6, -5, -4, -3, -2, -1 ]

buf = tx.transduce(
    tx.comp(txb.utf8Encode(), txb.base64Encode()),
    tx.str(),
    "beer (🍺) or hot beverage (☕️)"
);
// "YmVlciAo8J+Nuikgb3IgaG90IGJldmVyYWdlICjimJXvuI4p"

tx.transduce(tx.comp(txb.base64Decode(), txb.utf8Decode()), tx.str(), buf)
// "beer (🍺) or hot beverage (☕️)"
```

## API

### Transducers

- [base64Decode](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-binary/src/base64.ts)
- [base64Encode](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-binary/src/base64.ts)
- [bits](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-binary/src/bits.ts)
- [hexDump](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-binary/src/hex-dump.ts)
- [partitionBits](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-binary/src/partition-bits.ts)
- [utf8Decode](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-binary/src/utf8.ts)
- [utf8Encode](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-binary/src/utf8.ts)

### Reducers

- [bytes](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-binary/src/bytes.ts)

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
