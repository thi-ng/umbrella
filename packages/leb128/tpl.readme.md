<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

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

The `encodeSLEB128Into()` and `encodeULEB128Into()` functions will check the
bounds of the target array to ensure all bytes can be written and will
throw an error if the result would go out of bounds.

References:

- https://en.wikipedia.org/wiki/LEB128
- http://webassembly.github.io/spec/core/binary/values.html#integers

## Breaking changes

v3.0.0 introduces JS `bigint` support and both decode functions return a tuple
of `[bigint, number]` with the `bigint` being the decoded value and the 2nd item
the number of bytes consumed. Simarly, the encode functions now accept a JS
number or bigint arg.

Furthermore, all values to be encoded/decoded are cast to i64/u64 range now.

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

```ts tangle:export/readme1.ts
import * as leb from "@thi.ng/leb128";

// if WASM is unavailable, the encode/decode functions will throw an error
let encoded = leb.encodeULEB128(Number.MAX_SAFE_INTEGER);

console.log(encoded);
// Uint8Array [ 255, 255, 255, 255, 255, 255, 255, 15 ]

// decoding returns tuple of [value (bigint), bytes consumed]
console.log(leb.decodeULEB128(encoded));
// [ 9007199254740991n, 8 ]

// encode signed int
encoded = leb.encodeSLEB128(Number.MIN_SAFE_INTEGER);

console.log(encoded)
// Uint8Array [ 129, 128, 128, 128, 128, 128, 128, 112 ]

console.log(leb.decodeSLEB128(encoded));
// [ -9007199254740991n, 8 ]

// when writing into an existing buffer, there needs to be enough bytes to write the value
const target = new Uint8Array(10);
const count = leb.encodeULEB128Into(target, Number.MAX_SAFE_INTEGER);

console.log(target);
// Uint8Array [ 255, 255, 255, 255, 255, 255, 255, 15, 0, 0 ]

console.log(count);
// 8
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

<!-- include ../../assets/tpl/footer.md -->
