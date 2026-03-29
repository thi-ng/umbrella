<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/bitfield](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-bitfield.svg?1ec5b594)

[![npm version](https://img.shields.io/npm/v/@thi.ng/bitfield.svg)](https://www.npmjs.com/package/@thi.ng/bitfield)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/bitfield.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

1D / 2D bit field implementations.

All implementations are backed by typed arrays. Due to `Uint32Array`
backing the width is always rounded to a multiple of 32.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bbitfield%5D)

## Related packages

- [@thi.ng/adjacency](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/adjacency) - Sparse & bitwise adjacency matrices, lists and selected traversal algorithms for directed & undirected graphs

## Installation

```bash
yarn add @thi.ng/bitfield
```

ESM import:

```ts
import * as bf from "@thi.ng/bitfield";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/bitfield"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const bf = await import("@thi.ng/bitfield");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.61 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/binary](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/binary)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/strings](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/strings)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory is using this package:

| Screenshot                                                                                                            | Description                                                        | Live demo                                            | Source                                                                                    |
|:----------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------|:-----------------------------------------------------|:------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/related-images.jpg" width="240"/> | Responsive image gallery with tag-based Jaccard similarity ranking | [Demo](https://demo.thi.ng/umbrella/related-images/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/related-images) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/bitfield/)

```ts
import { BitField, BitMatrix } from "@thi.ng/bitfield";

// size always rounded up to a multiple of 32
const field = new BitField(16);

field.setAt(0);

// if 2nd arg is false, the bit will be cleared
// setAt returns non-zero value if bit was previously set
field.setAt(31, true);
// 0

// returns non-zero value if bit is set
field.at(0)
// -2147483648

field.at(1)
// 0

field.toString();
// 10000000000000000000000000000001

field.resize(64)
// 1000000000000000000000000000000100000000000000000000000000000000

const mat = new BitMatrix(8, 32);
for(let i = 0; i < 8; i++) mat.setAt(i, i);

mat.at(7, 7);
// 16777216

mat.toString();
// 10000000000000000000000000000000
// 01000000000000000000000000000000
// 00100000000000000000000000000000
// 00010000000000000000000000000000
// 00001000000000000000000000000000
// 00000100000000000000000000000000
// 00000010000000000000000000000000
// 00000001000000000000000000000000
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-bitfield,
  title = "@thi.ng/bitfield",
  author = "Karsten Schmidt",
  note = "https://thi.ng/bitfield",
  year = 2016
}
```

## License

&copy; 2016 - 2026 Karsten Schmidt // Apache License 2.0
