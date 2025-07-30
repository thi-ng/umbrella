<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/transducers-binary](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-transducers-binary.svg?259d5d4d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/transducers-binary.svg)](https://www.npmjs.com/package/@thi.ng/transducers-binary)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/transducers-binary.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Random bits](#random-bits)
  - [Streaming hexdump](#streaming-hexdump)
  - [Structured byte buffer construction](#structured-byte-buffer-construction)
  - [Bitstream](#bitstream)
  - [Base64 & UTF-8 en/decoding](#base64--utf-8-endecoding)
  - [Transducers](#transducers)
  - [Reducers](#reducers)
- [Authors](#authors)
- [License](#license)

## About

Binary data related transducers & reducers. This is a support package for [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers).

Like the transducers and reducers defined in
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers),
all functions defined in this package too accept an optional input
iterable for direct use.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btransducers-binary%5D+in%3Atitle)

## Related packages

- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary) - 100+ assorted binary / bitwise operations, conversions, utilities, lookup tables
- [@thi.ng/bitstream](https://github.com/thi-ng/umbrella/tree/develop/packages/bitstream) - ES6 iterator based read/write bit streams with support for variable word widths
- [@thi.ng/unionstruct](https://github.com/thi-ng/umbrella/tree/develop/packages/unionstruct) - C-style struct, union and bitfield read/write views of ArrayBuffers

## Installation

```bash
yarn add @thi.ng/transducers-binary
```

ESM import:

```ts
import * as txb from "@thi.ng/transducers-binary";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/transducers-binary"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const txb = await import("@thi.ng/transducers-binary");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.50 KB

## Dependencies

- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/develop/packages/hex)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Five projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                               | Description                                                                              | Live demo                                               | Source                                                                               |
|:-------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------|:--------------------------------------------------------|:-------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/bitmap-font.gif" width="240"/>       | Figlet-style bitmap font creation with transducers                                       | [Demo](https://demo.thi.ng/umbrella/bitmap-font/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/bitmap-font)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/cellular-automata.png" width="240"/> | 2D transducer based cellular automata                                                    | [Demo](https://demo.thi.ng/umbrella/cellular-automata/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/cellular-automata) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/>  | Parser grammar livecoding editor/playground & codegen                                    | [Demo](https://demo.thi.ng/umbrella/parse-playground/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/procedural-text.jpg" width="240"/>   | Procedural stochastic text generation via custom DSL, parse grammar & AST transformation | [Demo](https://demo.thi.ng/umbrella/procedural-text/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/procedural-text)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/wolfram.png" width="240"/>           | 1D Wolfram automata with OBJ point cloud export                                          | [Demo](https://demo.thi.ng/umbrella/wolfram/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/wolfram)           |

## API

[Generated API docs](https://docs.thi.ng/umbrella/transducers-binary/)

### Random bits

```ts
import { take } from "@thi.ng/transducers";
import { randomBits } from "@thi.ng/transducers-binary";

// 10 samples with 50% probability of drawing a 1
[...randomBits(0.5, 10)]
// [ 1, 0, 1, 1, 0, 1, 0, 1, 1, 0 ]

// infinite iterator without 2nd arg, so limit with `take()`
[...take(10, randomBits(0.1))]
// [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ]

import { Smush32 } from "@thi.ng/random";

// with seeded PRNG
[...randomBits(0.5, 10, new Smush32(12345678))]
// [ 0, 0, 1, 1, 0, 0, 0, 0, 1, 0 ]
```

### Streaming hexdump

This is a higher-order transducer, purely composed from other
transducers. [See code
here](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary/src/hex-dump.ts).

```ts
import { hexDump } from "@thi.ng/transducers-binary";

src = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 33, 48, 49, 50, 51, 126, 122, 121, 120]

[...hexDump({ cols: 8, address: 0x100 }, src)]
// [ '00000100 | 41 42 43 44 45 46 47 48 | ABCDEFGH',
//   '00000108 | 49 4a 21 30 31 32 33 7e | IJ!0123~',
//   '00000110 | 7a 79 78 00 00 00 00 00 | zyx.....' ]
```

### Structured byte buffer construction

The
[`bytes()`](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary/src/bytes.ts)
reducer transforms a stream of declarative data definitions (optionally
with Little-Endian encoding) into an `Uint8Array`.

```ts
import * as tx from "@thi.ng/transducers";
import * as txb from "@thi.ng/transducers-binary";

const bytes = txb.bytes(
    // initial buffer capacity (grows on demand)
    32,
    // structured data
    [
        // default order is Big-Endian
        txb.u32(0xdecafbad),
        // force Little-endian (also works for floats)
        txb.u32(0x44332211, true),
        // all strings will be utf-8 encoded
        txb.str("vec4"),
        // use little-endian for each of these array vals
        txb.f32array([1, 2, 3, 4], true),
        txb.u8(0x2a)
    ]
);

console.log(tx.str("\n", txb.hexDump({}, bytes)));

// 00000000 | de ca fb ad 11 22 33 44 76 65 63 34 00 00 80 3f | ....."3Dvec4...?
// 00000010 | 00 00 00 40 00 00 40 40 00 00 80 40 2a 00 00 00 | ...@..@@...@*...
```

### Bitstream

Decompose / transform a stream of fixed size words into their bits:

```ts
import { comp, map, partition, str, transduce } from "@thi.ng/transducers";
import { bits } from "@thi.ng/transducers-binary";

[...bits(8, [0xf0, 0xaa])];
// [ 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0 ]

console.log(
    transduce(
        comp(
            bits(8),
            map((x) => (x ? "#" : ".")),
            partition(8),
            map((x) => x.join(""))
        ),
        str("\n"),
        [0x00, 0x18, 0x3c, 0x66, 0x66, 0x7e, 0x66, 0x00]
    )
);
// ........
// ...##...
// ..####..
// .##..##.
// .##..##.
// .######.
// .##..##.
// ........
```

Extended to transform longer strings (taken from the [bitmap-font
example](https://github.com/thi-ng/umbrella/tree/develop/examples/bitmap-font),
[live demo](https://demo.thi.ng/umbrella/bitmap-font/)):

```js
import * as tx from "@thi.ng/transducers";
import { bits } from "@thi.ng/transducers-binary";

// font lookup table
const chars = {
    a: [0x00, 0x18, 0x3c, 0x66, 0x66, 0x7e, 0x66, 0x00],
    b: [0x00, 0x7c, 0x66, 0x7c, 0x66, 0x66, 0x7c, 0x00]
};

// re-usable transducer
const xfJoin = tx.map((x) => x.join(""));

// higher order transducer to transform single char from string
const xfChar = (i) =>
    tx.comp(
        tx.pluck(i),
        bits(8),
        tx.map((x) => (x ? "#" : ".")),
        tx.partition(8),
        xfJoin
    );

// transform entire string
const banner = (src) =>
    tx.transduce(
        tx.comp(
            // dynamically create `xfChar` transducers for each char
            // and run them in parallel via `multiplex()`
            tx.multiplex(...tx.map((i) => xfChar(i), tx.range(src.length))),
            // then join the results for each line
            xfJoin
        ),
        // use `str()` reducer to build string result
        tx.str("\n"),
        // convert input string into stream of row-major bitmap font tuples
        tx.zip(...tx.map((x) => chars[x], src))
    );

console.log(banner("abba"));
// ................................
// ...##....#####...#####.....##...
// ..####...##..##..##..##...####..
// .##..##..#####...#####...##..##.
// .##..##..##..##..##..##..##..##.
// .######..##..##..##..##..######.
// .##..##..#####...#####...##..##.
// ................................
```

### Base64 & UTF-8 en/decoding

Unlike JS default `btoa()` / `atob()` functions which operate on
strings, these transducers stepwise convert byte values to base64 and
back.

```ts
import * as tx from "@thi.ng/transducers";
import {
    base64Decode, base64Encode,
    utf8Decode, utf8Encode
} from "@thi.ng/transducers-binary";

// here we first add an offset (0x80) to allow negative values to be encoded
// (URL safe results can be produced via opt arg to `base64Encode`)
enc = tx.transduce(
    tx.comp(tx.map((x) => x + 0x80), base64Encode()),
    tx.str(),
    tx.range(-8, 8)
);
// "eHl6e3x9fn+AgYKDhIWGhw=="

// remove offset again during decoding, but (for example) only decode while val < 0
[
    ...tx.iterator(
        tx.comp(
            txb.base64Decode(),
            tx.map((x) => x - 0x80),
            tx.takeWhile((x) => x < 0)
        ),
        enc
    )
];
// [ -8, -7, -6, -5, -4, -3, -2, -1 ]

buf = tx.transduce(
    tx.comp(utf8Encode(), base64Encode()),
    tx.str(),
    "beer (🍺) or hot beverage (☕️)"
);
// "YmVlciAo8J+Nuikgb3IgaG90IGJldmVyYWdlICjimJXvuI4p"

tx.transduce(tx.comp(base64Decode(), utf8Decode()), tx.str(), buf);
// "beer (🍺) or hot beverage (☕️)"
```

### Transducers

- [base64Decode](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary/src/base64.ts)
- [base64Encode](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary/src/base64.ts)
- [bits](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary/src/bits.ts)
- [hexDump](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary/src/hex-dump.ts)
- [partitionBits](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary/src/partition-bits.ts)
- [utf8Decode](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary/src/utf8.ts)
- [utf8Encode](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary/src/utf8.ts)

### Reducers

- [bytes](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary/src/bytes.ts)

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-transducers-binary,
  title = "@thi.ng/transducers-binary",
  author = "Karsten Schmidt",
  note = "https://thi.ng/transducers-binary",
  year = 2018
}
```

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache License 2.0
