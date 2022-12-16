<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/leb128](https://media.thi.ng/umbrella/banners-20220914/thing-leb128.svg?e3f70939)

[![npm version](https://img.shields.io/npm/v/@thi.ng/leb128.svg)](https://www.npmjs.com/package/@thi.ng/leb128)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/leb128.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Breaking changes](#breaking-changes)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Building the binary](#building-the-binary)
- [Authors](#authors)
- [License](#license)

## About

WASM based [Little Endian Base
128](https://en.wikipedia.org/wiki/LEB128) varint encoding / decoding,
supporting the full (u)int64 range.

The WASM binary (~860 bytes) is embedded as base64 string in the
TypeScript source to make it easier to use in both browser & node
environments. The source code of the actual implementation (written in
[Zig](https://ziglang.org)) is included in
[/zig/leb128.zig](https://github.com/thi-ng/umbrella/tree/develop/packages/leb128/zig/leb128.zig)

All public functions throw an error if the WASM module could not be
initialized.

References:

- https://en.wikipedia.org/wiki/LEB128
- http://webassembly.github.io/spec/core/binary/values.html#integers

## Breaking changes

v3.0.0 introduces JS `bigint` support and both decode functions return a tuple
of `[bigint, number]` with the `bigint` being the decoded value and the 2nd item
the number of bytes consumed. Simarly, the encode functions now accept a JS
number or bigint arg.

Furthermore, all values to be encoded/decoded are cast to i64/u64 range now.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bleb128%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/leb128
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/leb128"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const leb128 = await import("@thi.ng/leb128");
```

Package sizes (brotli'd, pre-treeshake): ESM: 876 bytes

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary)

## API

[Generated API docs](https://docs.thi.ng/umbrella/leb128/)

```ts
import * as leb from "@thi.ng/leb128";

// if WASM is unavailable, the encode/decode functions will throw an error
enc = leb.encodeULEB128(Number.MAX_SAFE_INTEGER);
// Uint8Array [ 255, 255, 255, 255, 255, 255, 255, 15 ]

// decoding returns tuple of [value (bigint), bytes consumed]
leb.decodeULEB128(enc);
// [ 9007199254740991n, 8 ]

// encode signed int
enc = leb.encodeSLEB128(Number.MIN_SAFE_INTEGER)
// Uint8Array [ 129, 128, 128, 128, 128, 128, 128, 112 ]

leb.decodeSLEB128(enc)
// [ -9007199254740991n, 8 ]
```

## Building the binary

Requirements:

- [Zig](https://ziglang.org/download/)
- [Binaryen](https://github.com/WebAssembly/binaryen)

```bash
# install required tools
brew install zig binaryen

# first run native tests
zig test zig/leb128.zig
# Test 1/2 min safe integer...OK
# Test 2/2 max safe integer...OK
# All tests passed.

# build binary and regenerate src/binary.ts
yarn build:binary

# test TS/JS version
yarn test
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-leb128,
  title = "@thi.ng/leb128",
  author = "Karsten Schmidt",
  note = "https://thi.ng/leb128",
  year = 2019
}
```

## License

&copy; 2019 - 2022 Karsten Schmidt // Apache License 2.0
