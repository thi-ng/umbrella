# @thi.ng/rle-pack

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rle-pack.svg)](https://www.npmjs.com/package/@thi.ng/rle-pack)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Binary run-length encoding packer/unpacker w/ flexible repeat bit
widths. Written in TypeScript, distributed in ES6.

Encoding format:

- 32 bits - original size in bytes (header)

Then per value:

- 1 bit - encoding flag (1 = RLE encoded, 0 = single occurrence)
- 8 bits - value

The following is only used for repeated values:

- 2 bits - repeat class
- 3/4/8/16 bits - repeat count - 1 (if > 0x10000 then split into chunks...)

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
packed = rle.encodeBytes(src);
// Uint8Array [0,0,4,0,128,96,63,240,18,64,135,3,20,16,32,88,32,96,98,129,14,2,72,6,3,196]

packed.length
// 26 => 2.5% of original

// unpack
dest = rle.decodeBytes(packed);
```

## Authors

- Karsten Schmidt

## License

&copy; 2017 Karsten Schmidt // Apache Software License 2.0