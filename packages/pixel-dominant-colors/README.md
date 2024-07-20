<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/pixel-dominant-colors](https://media.thi.ng/umbrella/banners-20230807/thing-pixel-dominant-colors.svg?60875ef0)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel-dominant-colors.svg)](https://www.npmjs.com/package/@thi.ng/pixel-dominant-colors)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel-dominant-colors.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 196 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

k-means based dominant color extraction from images/pixel buffers. This is a support package for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpixel-dominant-colors%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/pixel-dominant-colors
```

ESM import:

```ts
import * as pdc from "@thi.ng/pixel-dominant-colors";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/pixel-dominant-colors"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const pdc = await import("@thi.ng/pixel-dominant-colors");
```

Package sizes (brotli'd, pre-treeshake): ESM: 246 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/k-means](https://github.com/thi-ng/umbrella/tree/develop/packages/k-means)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                             | Description                                                                 | Live demo                                             | Source                                                                             |
|:-----------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/> | Color palette generation via dominant color extraction from uploaded images | [Demo](https://demo.thi.ng/umbrella/dominant-colors/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/pixel-dominant-colors/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-pixel-dominant-colors,
  title = "@thi.ng/pixel-dominant-colors",
  author = "Karsten Schmidt",
  note = "https://thi.ng/pixel-dominant-colors",
  year = 2021
}
```

## License

&copy; 2021 - 2024 Karsten Schmidt // Apache License 2.0
