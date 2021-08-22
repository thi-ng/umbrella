# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

WASM based [Little Endian Base
128](https://en.wikipedia.org/wiki/LEB128) varint encoding / decoding,
supporting (u)int64 range (however for JS purposes only up to
`MAX_SAFE_INTEGER`).

The WASM binary (~860 bytes) is embedded as base64 string in the
TypeScript source to make it easier to use in both browser & node
environments. The source code of the actual implementation (written in
[Zig](https://ziglang.org)) is included in
[/src/leb128.zig](https://github.com/thi-ng/umbrella/tree/develop/packages/leb128/src/leb128.zig)

All public functions throw an error if the WASM module could not be
initialized.

References:

- https://en.wikipedia.org/wiki/LEB128
- http://webassembly.github.io/spec/core/binary/values.html#integers

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

```ts
import * as leb from "@thi.ng/leb128";

// if WASM is unavailable, the encode/decode functions will throw an error
enc = leb.encodeULEB128(Number.MAX_SAFE_INTEGER);
// Uint8Array [ 255, 255, 255, 255, 255, 255, 255, 15 ]

// decoding returns tuple of [value, bytes consumed]
leb.decodeULEB128(enc);
// [ 9007199254740991, 8 ]

// encode signed int
enc = leb.encodeSLEB128(Number.MIN_SAFE_INTEGER)
// Uint8Array [ 129, 128, 128, 128, 128, 128, 128, 112 ]

leb.decodeSLEB128(enc)
// [ -9007199254740991, 8 ]
```

## Building the binary

Requirements:

- [Zig](https://ziglang.org/download/)
- [Binaryen](https://github.com/WebAssembly/binaryen)

```bash
# install required tools
brew install zig binaryen

# first run native tests
zig test packages/leb128/src/leb128.zig
# Test 1/2 min safe integer...OK
# Test 2/2 max safe integer...OK
# All tests passed.

# build binary and regenerate src/binary.ts
yarn build:binary

# test TS/JS version
yarn test
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
