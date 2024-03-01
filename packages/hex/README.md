<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/hex](https://media.thi.ng/umbrella/banners-20230807/thing-hex.svg?acd0a87c)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hex.svg)](https://www.npmjs.com/package/@thi.ng/hex)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hex.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
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
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Hex string formatters for 4/8/16/24/32/48/64bit words.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhex%5D+in%3Atitle)

## Related packages

- [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n) - Arbitrary base-n conversions w/ presets for base8/16/32/36/58/62/64/83/85, support for bigints and encoding/decoding of byte arrays

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

```js
const hex = await import("@thi.ng/hex");
```

Package sizes (brotli'd, pre-treeshake): ESM: 631 bytes

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

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2020 - 2024 Karsten Schmidt // Apache License 2.0
