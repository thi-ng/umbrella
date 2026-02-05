<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/text-format-image](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-text-format-image.svg?bf6f3f5b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/text-format-image.svg)](https://www.npmjs.com/package/@thi.ng/text-format-image)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/text-format-image.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Bitmap image formatting for CLI/Terminal.

Currently only supports the widely supported iTerm format as
output format. Sixel support considered. Accepts images in various file formats
(e.g. JPG, PNG etc.) or [thi.ng/pixel](https://thi.ng/pixel) pixel buffers.

Reference:

- https://iterm2.com/documentation-images.html
- https://github.com/BourgeoisBear/rasterm
- https://en.wikipedia.org/wiki/Sixel

(iTerm image strings are supported by at least: iterm2, mintty, mlterm, rio,
rlogin, wezterm...)

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btext-format-image%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/text-format-image
```

ESM import:

```ts
import * as tfi from "@thi.ng/text-format-image";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/text-format-image"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const tfi = await import("@thi.ng/text-format-image");
```

Package sizes (brotli'd, pre-treeshake): ESM: 334 bytes

## Dependencies

- [@thi.ng/imago](https://github.com/thi-ng/umbrella/tree/develop/packages/imago)

## API

[Generated API docs](https://docs.thi.ng/umbrella/text-format-image/)

```ts tangle:export/readme.ts
import { iTermImageStringFromBinary } from "@thi.ng/text-format-image";
import { readFileSync } from "node:fs";

// read JPG as binary blob
const src = readFileSync("assets/examples/zig-cellular.jpg");

// convert to image string to show image at 200px width
// (example will only work in terminals supporting the iTerm image format)
console.log(iTermImageStringFromBinary(src, { width: "400px" }));
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-text-format-image,
  title = "@thi.ng/text-format-image",
  author = "Karsten Schmidt",
  note = "https://thi.ng/text-format-image",
  year = 2025
}
```

## License

&copy; 2025 - 2026 Karsten Schmidt // Apache License 2.0
