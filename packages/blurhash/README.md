<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/blurhash](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-blurhash.svg?8ea0a899)

[![npm version](https://img.shields.io/npm/v/@thi.ng/blurhash.svg)](https://www.npmjs.com/package/@thi.ng/blurhash)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/blurhash.svg)
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
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Fast, optimized TS implementation of the Wolt Blurhash algorithm.

- https://blurha.sh/
- https://github.com/woltapp/blurhash
- https://github.com/woltapp/blurhash/blob/master/Algorithm.md

This implementation is principally based on the official TypeScript version of
the above repo, but in addition to API extensions, the algorithm has been
refactored & optimized in several fundamental ways, including:

- massive caching & reduction of repeated cosine calculations in both
  encoder/decoder
- reduction of internal allocations
- approximation of gamma conversion hotspot (the slightly lower precision is
  negligible for this use case)
- reading & writing of 32bit pixel data (i.e. using `Uint32Array` vs.
  `Uint8ClampedArray`)

On Firefox 122 (MBP M1 2021), these changes result in ~1.6x faster encoding and
~2.3x faster decoding performance...

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bblurhash%5D)

## Installation

```bash
yarn add @thi.ng/blurhash
```

ESM import:

```ts
import * as bhash from "@thi.ng/blurhash";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/blurhash"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const bhash = await import("@thi.ng/blurhash");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.21 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/base-n](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/base-n)
- [@thi.ng/canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/canvas)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/math](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/math)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory is using this package:

| Screenshot                                                                                                              | Description                                     | Live demo                                      | Source                                                                       |
|:------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------|:-----------------------------------------------|:-----------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/blurhash.jpg" width="240"/> | Interactive & reactive image blurhash generator | [Demo](https://demo.thi.ng/umbrella/blurhash/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/blurhash) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/blurhash/)

```ts
import { encodeFromImage, decodeToCanvas } from "@thi.ng/blurhash";
import { imagePromise } from "@thi.ng/pixel";

// obtain image data in 32bit ABGR format
// (little endian byte order, same as canvas image data)
const pixels = new Uint32Array(...);

// compute hash
// default detail = 4 (must be in [1,9] range)
const hash = encode(pixels, imgW, imgH, 4, 4);
// "ChD9#TE7NFt6k]WCnhbc"

// in browser env you can encode directly from an
// HTML image or canvas element, see API docs for options
import { imagePromise } from "@thi.ng/pixel";
const hash = encodeFromImage(await imagePromise("test.jpg"));

const hash = encodeFromCanvas(canvas, 4, 4);

// decode to a raw 32bit ABGR pixel array (with optional contrast param)
const pixels = decode(hash, 32, 32, 1);

// decode hash to a new canvas element (optionally attach it to DOM)
const canvas = decodeToCanvas(hash, 32, 32, 1, document.body);

// use CSS to stretch
canvas.style.width = "320px";
canvas.style.height = "240px";
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-blurhash,
  title = "@thi.ng/blurhash",
  author = "Karsten Schmidt",
  note = "https://thi.ng/blurhash",
  year = 2023
}
```

## License

&copy; 2023 - 2026 Karsten Schmidt // Apache License 2.0
