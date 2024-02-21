<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
> [!IMPORTANT]
> ‼️ Announcing the thi.ng user survey 2024 📋
>
> [Please participate in the survey here!](https://forms.gle/XacbSDEmQMPZg8197)\
> (open until end of February)
>
> **To achieve a better sample size, I'd highly appreciate if you could
> circulate the link to this survey in your own networks.**
>
> [Discussion](https://github.com/thi-ng/umbrella/discussions/447)

# ![@thi.ng/bitstream](https://media.thi.ng/umbrella/banners-20230807/thing-bitstream.svg?83eee6da)

[![npm version](https://img.shields.io/npm/v/@thi.ng/bitstream.svg)](https://www.npmjs.com/package/@thi.ng/bitstream)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/bitstream.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [BitOutputStream](#bitoutputstream)
  - [BitInputStream](#bitinputstream)
  - [Barebones alternatives](#barebones-alternatives)
- [Authors](#authors)
- [License](#license)

## About

ES6 iterator based read/write bit streams with support for variable word widths.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bbitstream%5D+in%3Atitle)

## Related packages

- [@thi.ng/range-coder](https://github.com/thi-ng/umbrella/tree/develop/packages/range-coder) - Binary data range encoder / decoder
- [@thi.ng/rle-pack](https://github.com/thi-ng/umbrella/tree/develop/packages/rle-pack) - Binary run-length encoding packer w/ flexible repeat bit widths

## Installation

```bash
yarn add @thi.ng/bitstream
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/bitstream"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const bitstream = await import("@thi.ng/bitstream");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.33 KB

## Dependencies

- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/bitstream/)

### BitOutputStream

`Uint8Array` backed, bitwise output stream abstraction (big endian
order). Individual word sizes can range between 1-52 bits (in practice)
and are not fixed (each word can have a different size).

The constructor accepts an optional initial `Uint8Array` buffer or
buffer size (in bytes) and an optional write start position (**in
bits**). The buffer will only be written to starting from the given bit
position (even if in the middle of a byte). Default buffer size is 16
bytes, but the array is resized (x2) automatically each time capacity is
reached.

**Note**: The max. word size of 52 bits is not enforced by the library,
but JS can only represent integers (w/o loss of precision) up to
`2^53-1`. If you're willing to accept lossy precision for larger values,
technically the max. supported word width is 64 bits.

```ts
out = new BitOutputStream();
// write 3-bit number (only the lowest 3 bits are used, here 0x05)
out.write(0xf5, 3);
// write 7-bit number
out.write(0x66, 7);
// write 32-bit number
out.write(0xdecafbad, 32);

// write values from given iterable (w/ fixed word size, here 16 bits)
out.writeWords([0xaaaa, 0x5555], 16);

// get bytes (only up to current write position)
out.bytes()
// Uint8Array [ 185, 183, 178, 190, 235, 106, 170, 149, 85, 64 ]
```

In addition to the generic `write()` method, there's also the slightly
faster `writeBit()` for writing single bits (the arg MUST be `0` or `1`
only).

Using `seek(pos)`, the write position can be repositioned within current
limits (does not attempt to resize backing buffer).

### BitInputStream

`Uint8Array` backed bitwise input stream abstraction (big endian order)
with optional start position and read limit (both **in bits**). All
readers are independent instances, but if obtained from
`BitOutputStream` will share the same backing buffer as the writer. An
auto-configured input stream can also be obtained via `output.reader()`.
The class too implements the ES6 Iterator API for **bitwise** read
access, as well as a `read()` method to read bitfields.

**Note**: Attempting to read beyond capacity will throw an EOF error.

Using `input.seek(pos)`, the read position can be repositioned within
stream limits.

```ts
// get input from output stream...
// (for reference, the ^ indicate the start of each bit field)
[...out.reader()].join("")
// "10111001101101111011001010111110111010110110101010101010100101010101010101"
//  ^  ^      ^                               ^               ^

// obtain new reader
input = out.reader();
// sequentially read bit fields of varying sizes
out.reader().readFields([3, 7, 32, 16, 16]).map(x => x.toString(16))
// [ "5", "66", "decafbad", "aaaa", "5555" ]

// or read fields into object
out.reader().readStruct([["a", 3], ["b", 7], ["c", 32], ["d", 16], ["e", 16]]);
// { a: 5, b: 102, c: 3737844653, d: 43690, e: 21845 }

// or read a number of fixed size words (here also from given pos)
out.reader().seek(10).readWords(4, 16).map(x=>x.toString(16));
// [ 'deca', 'fbad', 'aaaa', '5555' ]

src = new Uint8Array([0xf1,0xe2,0xd3,0xc4,0xb5,0xa6,0x97,0x88]);
// create stream from bit 36
input = new BitInputStream(src, 36);
input.read(12).toString(16);
// 5a6
input.read(4)
// 9
input.read(4)
// 7
input.read(1) // or use input.readBit()
// 1 => msb of last byte (0x88)
input.read(7)
// 8 => low nibble of last byte
```

In addition to the generic `read()` method, there's also the slightly
faster `readBit()` for reading single bits.

### Barebones alternatives

For use cases requiring only word sizes <=8 bits and none of the advanced features provided by the above implementations, the package also provides functional barebones alternatives in the form of [`bitWriter()`](https://docs.thi.ng/umbrella/bitstream/functions/bitWriter.html) and [`bitReader()`](https://docs.thi.ng/umbrella/bitstream/functions/bitReader.html):

```ts
import { bitReader, bitWriter } from "@thi.ng/bistream";

const writer = bitWriter();
// write single bit
writer.write(1);

// write unsigned value (up to 8 bits)
writer.write(31, 5);

// retrieve buffer
const bytes = writer.bytes();
// Uint8Array(1) [ 252 ]

// create reader from byte buffer
const reader = bitReader(bytes);

// read single bit
reader();
// 1

// read n-bit unsigned value
reader(5);
// 31
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-bitstream,
  title = "@thi.ng/bitstream",
  author = "Karsten Schmidt",
  note = "https://thi.ng/bitstream",
  year = 2016
}
```

## License

&copy; 2016 - 2024 Karsten Schmidt // Apache License 2.0
