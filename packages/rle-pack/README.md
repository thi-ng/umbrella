# @thi.ng/rle-pack

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rle-pack.svg)](https://www.npmjs.com/package/@thi.ng/rle-pack)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Binary run-length encoding packer/unpacker w/ support for customizable
input word sizes (1 - 32 bits) and repeat count (run-length) bit sizes
(1 - 16 bits). The encoder uses 4 different repeat group sizes
(thresholds) to minimize the number of bits used to store the run
lengths. The range of supported run lengths is 16 bits (i.e. 65536
repetitions). If a value is repeated more often than that, the remainder
will be encoded using additional RLE chunks...

### Encoding format

![data layout](https://github.com/thi-ng/umbrella/tree/master/packages/assets/rle-layout.png)

- 32 bits - original number of words
- 5 bits - word size
- 16 bits - RLE repeat group bit sizes (default: 3, 4, 8, 16)

Then per value:

- 1 bit - encoding flag (1 = RLE encoded, 0 = single occurrence)
- n bits - value

The following are only used for repeated values:

- 2 bits - repeat class
- m bits - repeat count - 1 (if greater than max group size then split into chunks...)

Brief overview for 8-bit word size (default):

| Repeats | Original (bits) | RLE (bits) | Saving (bits) | Ratio    |
|---------|-----------------|------------|---------------|----------|
| 1       | 8               | 1+8        | -1            | 1.125    |
| 2       | 16              | 1+8+2+3    | 2             | 0.875    |
| 3       | 24              | 1+8+2+3    | 10            | 0.583    |
| 4       | 32              | 1+8+2+3    | 18            | 0.438    |
| 8       | 64              | 1+8+2+3    | 50            | 0.219    |
| 9       | 72              | 1+8+2+4    | 57            | 0.208    |
| 16      | 128             | 1+8+2+4    | 113           | 0.117    |
| 17      | 136             | 1+8+2+8    | 117           | 0.14     |
| 256     | 2048            | 1+8+2+8    | 2029          | 0.0093   |
| 257     | 2056            | 1+8+2+16   | 2029          | 0.013    |
| 512     | 4096            | 1+8+2+16   | 4069          | 0.0066   |
| 1024    | 8192            | 1+8+2+16   | 8165          | 0.0033   |
| 65536   | 524288          | 1+8+2+16   | 524261        | 0.000051 |

## Installation

```bash
yarn add @thi.ng/rle-pack
```

## Dependencies

- [@thi.ng/bitstream](https://github.com/thi-ng/umbrella/tree/master/packages/bitstream)

## API

```ts
let rle = require("@thi.ng/rle-pack");
```

```ts
// prepare dummy data
src = new Uint8Array(1024);
src.set([1,1,1,1,1,2,2,2,2,3,3,3,4,4,5,4,4,3,3,3,2,2,2,2,1,1,1,1,1], 512);

// pack data
packed = rle.encode(src, src.length);
// Uint8Array [0,0,4,0,65,27,252,3,1,255,128,146,4,56,24,160,129,2,193,3,3,20,8,112,18,64,48,30,32]

packed.length
// 29 => 2.83% of original

// pack with custom word size (3 bits, i.e. our value range is only 0-7)
// and use custom repeat group sizes suitable for our data
alt = rle.encode(src, src.length, 3, [1, 2, 3, 9]);
// Uint8Array [0,0,4,0,24,9,68,127,249,165,61,182,21,195,109,79,52,143,196]

alt.length
// 19 => 1.85% of original, ~65% of default config

// unpack
unpacked = new Uint8Array(rle.decode(alt));
```

## Authors

- Karsten Schmidt

## License

&copy; 2017 - 2018 Karsten Schmidt // Apache Software License 2.0