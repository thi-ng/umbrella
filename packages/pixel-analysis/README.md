<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/pixel-analysis](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-pixel-analysis.svg?d7cb7e3e)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel-analysis.svg)](https://www.npmjs.com/package/@thi.ng/pixel-analysis)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel-analysis.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 209 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Color analysis](#color-analysis)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Image color & feature analysis utilities. This is a support package for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel).

### Color analysis

-   Dominant colors in different color modes/formats:
    -   CSS
    -   sRGB
    -   HSV
    -   Oklch (perceptual)
-   Normalized areas of dominant color clusters
-   Min/max HSV hue range of dominant colors
-   Min/max HSV saturation range of dominant colors
-   Min/max Oklch chroma range of dominant colors
-   Min/max luminance range of dominant colors (obtained from SRGB)
-   Min/max luminance range of entire grayscale image (obtained from SRGB)
-   Normalized warmth, i.e. the area-weighted intensity of "warm" colors in the image
-   Luminance contrast of dominant colors
-   Luminance contrast of entire grayscale image
-   Max. normalized WCAG color contrast of dominant colors
-   Average luminance of dominant colors, weighted by area
-   Average HSV saturation of dominant colors, weighted by area
-   Average Oklch chroma of dominant colors, weighted by area

## Status

**BETA** - possibly breaking changes forthcoming

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpixel-analysis%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/pixel-analysis
```

ESM import:

```ts
import * as pa from "@thi.ng/pixel-analysis";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/pixel-analysis"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const pa = await import("@thi.ng/pixel-analysis");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.36 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
- [@thi.ng/pixel-convolve](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-convolve)
- [@thi.ng/pixel-dominant-colors](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-dominant-colors)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/pixel-analysis/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-pixel-analysis,
  title = "@thi.ng/pixel-analysis",
  author = "Karsten Schmidt",
  note = "https://thi.ng/pixel-analysis",
  year = 2024
}
```

## License

&copy; 2024 - 2025 Karsten Schmidt // Apache License 2.0
