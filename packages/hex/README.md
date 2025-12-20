<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/hex](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-hex.svg?f5f1656a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hex.svg)](https://www.npmjs.com/package/@thi.ng/hex)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hex.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 212 standalone projects, maintained as part
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
  - [Creating hexdumps](#creating-hexdumps)
- [Authors](#authors)
- [License](#license)

## About

Hex string formatters for 4/8/16/24/32/48/64bit words, hexdump formatting of binary data.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhex%5D+in%3Atitle)

## Related packages

- [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n) - Arbitrary base-n conversions w/ presets for base8/16/32/36/58/62/64/83/85, support for bigints and encoding/decoding of byte arrays

## Installation

```bash
yarn add @thi.ng/hex
```

ESM import:

```ts
import * as hex from "@thi.ng/hex";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/hex"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const hex = await import("@thi.ng/hex");
```

Package sizes (brotli'd, pre-treeshake): ESM: 616 bytes

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/hex/)

```ts tangle:export/readme.ts
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

### Creating hexdumps

The following functions are provided to create customizable hexdumps:

- [hexdump()](https://docs.thi.ng/umbrella/hex/functions/hexdump.html)
- [hexdumpLines()](https://docs.thi.ng/umbrella/hex/functions/hexdumpLines.html)
- [printHexdump()](https://docs.thi.ng/umbrella/hex/functions/printHexdump.html)

```ts tangle:export/readme-hexdump.ts
import { printHexdump } from "@thi.ng/hex";
import { readFileSync } from "node:fs";

const bytes = readFileSync("README.md");

// hexdump of the first 100 bytes
printHexdump(bytes, 0, 100);

// 00000000 21 5b 74 68 69 2e 6e 67 2f 75 6d 62 72 65 6c 6c ![thi.ng/umbrell
// 00000010 61 5d 28 68 74 74 70 73 3a 2f 2f 72 61 77 2e 67 a](https://raw.g
// 00000020 69 74 68 75 62 75 73 65 72 63 6f 6e 74 65 6e 74 ithubusercontent
// 00000030 2e 63 6f 6d 2f 74 68 69 2d 6e 67 2f 75 6d 62 72 .com/thi-ng/umbr
// 00000040 65 6c 6c 61 2f 64 65 76 65 6c 6f 70 2f 61 73 73 ella/develop/ass
// 00000050 65 74 73 2f 62 61 6e 6e 65 72 73 2f 74 68 69 6e ets/banners/thin
// 00000060 67 2d 75 6d                                     g-um
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

&copy; 2020 - 2025 Karsten Schmidt // Apache License 2.0
