<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/pixel-dominant-colors](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-pixel-dominant-colors.svg?60875ef0)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel-dominant-colors.svg)](https://www.npmjs.com/package/@thi.ng/pixel-dominant-colors)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel-dominant-colors.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 208 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Dominant color extraction](#dominant-color-extraction)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

k-means based dominant color extraction from images/pixel buffers. This is a support package for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel).

This package contains functionality which was previously part of and has been
extracted from the [@thi.ng/pixel](https://thi.ng/pixel) package.

### Dominant color extraction

The
[`dominantColors()`](https://docs.thi.ng/umbrella/pixel/functions/dominantColors.html)
function applies [k-means
clustering](https://github.com/thi-ng/umbrella/tree/develop/packages/k-means) to
extract the dominant colors from the given image. The clustering can be
configured. The function returns an array of `{ color, area }` objects (sorted
by descending area), where `color` is a cluster's dominant color (in the format
of the source image) and `area` the normalized cluster size (number of selected
pixels over total number of pixels in the image).

Also see the [dominant colors example project & online
tool](https://demo.thi.ng/umbrella/dominant-colors/) based on this function.
Furthermore, the
[thi.ng/color-palettes](https://github.com/thi-ng/umbrella/tree/develop/packages/color-palettes)
package provides 200+ curated color themes extracted from images using this
function...

![Example image & extracted dominant colors](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/dominant-colors-01.jpg)

<small>Picture credit: [/u/kristophershinn](https://www.reddit.com/r/EarthPorn/comments/j3z0f6/fall_in_yosemite_valley_oc3186_3983/)</small>

```ts tangle:export/readme.ts
import { floatBuffer, FLOAT_RGB } from "@thi.ng/pixel";
import { dominantColors } from "@thi.ng/pixel-dominant-colors";
import { read } from "@thi.ng/pixel-io-netpbm";
import { readFileSync } from "node:fs";

// read test PPM image and convert into float RGB format
const img = floatBuffer(read(readFileSync(`test.ppm`)), FLOAT_RGB);

// extract 5 dominant color clusters
const clusters = dominantColors(img, 5);

console.log(clusters);
// [
//   {
//     color: [ 0.4000000059604645, 0.30980393290519714, 0.21176470816135406 ],
//     area: 0.3141084558823529
//   },
//   {
//     color: [ 0.21960784494876862, 0.19607843458652496, 0.1411764770746231 ],
//     area: 0.2780330882352941
//   },
//   {
//     color: [ 0.4156862795352936, 0.4745098054409027, 0.5647059082984924 ],
//     area: 0.16620710784313725
//   },
//   {
//     color: [ 0.6666666865348816, 0.7568627595901489, 0.9254902005195618 ],
//     area: 0.12385110294117647
//   },
//   {
//     color: [ 0.7176470756530762, 0.4745098054409027, 0.12941177189350128 ],
//     area: 0.11780024509803921
//   }
// ]
```

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

Package sizes (brotli'd, pre-treeshake): ESM: 223 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/k-means](https://github.com/thi-ng/umbrella/tree/develop/packages/k-means)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                             | Description                                                                 | Live demo                                             | Source                                                                             |
|:-----------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/> | Color palette generation via dominant color extraction from uploaded images | [Demo](https://demo.thi.ng/umbrella/dominant-colors/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/pixel-dominant-colors/)

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

&copy; 2021 - 2025 Karsten Schmidt // Apache License 2.0
