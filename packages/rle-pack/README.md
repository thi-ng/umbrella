# @thi.ng/rle-pack

[![npm version](https://img.shields.io/npm/v/@thi.ng/rle-pack.svg)](https://www.npmjs.com/package/@thi.ng/rle-pack)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rle-pack.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

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

![data layout](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/rle-layout.png)

- 32 bits - original number of words
- 5 bits - word size
- 16 bits - 4x RLE repeat group / chunk sizes (in bits)

The default group sizes are: 3, 4, 8, 16, i.e. 8, 16, 256, 65536 repetitions

Then per value:

- 1 bit - encoding flag (1 = RLE encoded, 0 = single occurrence)
- 2 bits - repeat or chunk class ID
- m bits - repeat count or chunk size (if greater than max group size
  then split into chunks...)
- n bits - value(s)

## Installation

```bash
yarn add @thi.ng/rle-pack
```

## Dependencies

- [@thi.ng/bitstream](https://github.com/thi-ng/umbrella/tree/master/packages/bitstream)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)

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
packed.length
// 30 => 2.93% of original

// pack with custom word size (3 bits, i.e. our value range is only 0-7)
// and use custom repeat group sizes suitable for our data
alt = rle.encode(src, src.length, 3, [1, 2, 3, 9]);
alt.length
// 20 => 1.95% of original, 66% of default config

// unpack
unpacked = new Uint8Array(rle.decode(alt));
```

## Authors

- Karsten Schmidt

## License

&copy; 2017 - 2018 Karsten Schmidt // Apache Software License 2.0