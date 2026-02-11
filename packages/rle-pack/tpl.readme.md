<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

The package provides two approaches for [Run-length
encoding/decoding](https://en.wikipedia.org/wiki/Run-length_encoding):

### Simple RLE

The naive approach operates on arrays of arbitrary values and supports
user-defined predicates to determine if a consecutive input values are equal
(i.e. repeated). By default uses `===` strict comparison.

```ts tangle:export/readme-simple.ts
import { encodeSimple, decodeSimple } from "@thi.ng/rle-pack";

const src = [..."aaaaaabbbbaaaxyxxx"];

const encoded = encodeSimple(src);
console.log(encoded);
// ["a", 6, "b", 4, "a", 3, "x", 1, "y", 1, "x", 3]

const decoded = decodeSimple(encoded);
console.log(decoded);
// ["a", "a", "a", "a", "a", "a", "b", "b", "b", "b", "a", "a", "a", "x", "y", "x", "x", "x"]
```

### Binary encoding

Binary [run-length
encoding](https://en.wikipedia.org/wiki/Run-length_encoding)
packer/unpacker with support for customizable input word sizes (1 - 32
bits) and repeat count (run-length) bit sizes (1 - 16 bits). The encoder
uses 4 different repeat group sizes (thresholds) to minimize the number
of bits used to store the run lengths. The range of supported run
lengths is 16 bits (i.e. 65536 repetitions). If a value is repeated more
often than that, the remainder will be encoded using additional RLE
chunks...

#### Encoding format

![data layout](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/rle/rle-layout.png)

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

#### Code example

```ts tangle:export/readme-binary.ts
import { encodeBinary, decodeBinary } from "@thi.ng/rle-pack";

// prepare dummy data
const src = new Uint8Array(1024);
src.set([1,1,1,1,1,2,2,2,2,3,3,3,4,4,5,4,4,3,3,3,2,2,2,2,1,1,1,1,1], 512);

// pack data
const packed = encodeBinary(src, src.length);
console.log(packed.length);
// 30 => 2.93% of original

// pack with custom word size (3 bits, i.e. our value range is only 0-7)
// and use custom repeat group sizes suitable for our data
const alt = encodeBinary(src, src.length, 3, [1, 2, 3, 9]);
console.log(alt.length);
// 20 => 1.95% of original, 66% of default config

// unpack
const unpacked = decodeBinary(alt);
console.log(unpacked.length);
```

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

<!-- include ../../assets/tpl/footer.md -->
