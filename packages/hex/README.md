<!-- This file is generated - DO NOT EDIT! -->

# ![hex](https://media.thi.ng/umbrella/banners-20220914/thing-hex.svg?acd0a87c)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hex.svg)](https://www.npmjs.com/package/@thi.ng/hex)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hex.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Hex string formatters for 4/8/16/24/32/48/64bit words.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhex%5D+in%3Atitle)

## Related packages

- [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n) - Arbitrary base-n conversions w/ presets for base16/32/36/58/62/64/85, support for arrays & bigints

## Installation

```bash
yarn add @thi.ng/hex
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/hex"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const hex = await import("@thi.ng/hex");
```

Package sizes (brotli'd, pre-treeshake): ESM: 578 bytes

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/hex/)

```ts
import * as h from "@thi.ng/hex";

const cssColor = (x: number) => "#" + h.U24(x);

cssColor(10597059)
// "#a1b2c3"

h.U48(223928981472033);
// "cba987654321"

h.U48HL(0xcba9, 0x87654321)
// "cba987654321"

h.U64(0xaa * 0x010101010101)
// "0000aaaaaaaaaaaa"

h.U64HL(0x11223344, 0x89abcdef);
// "1122334489abcdef"

// format directly from byte arrays

const BUF = [1, 2, 3, 4, 0x10, 0x20, 0x30, 0x40];

// big-endian

h.U32BE(BUF, 0)
// "01020304"
h.U32BE(BUF, 4)
// "10203040"

// little-endian

h.U32LE(BUF, 0)
// "04030201"

h.U32LE(BUF, 4)
// "40302010"
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hex,
  title = "@thi.ng/hex",
  author = "Karsten Schmidt",
  note = "https://thi.ng/hex",
  year = 2020
}
```

## License

&copy; 2020 - 2022 Karsten Schmidt // Apache Software License 2.0
