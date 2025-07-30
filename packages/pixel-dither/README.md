<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/pixel-dither](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-pixel-dither.svg?fd072b2b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel-dither.svg)](https://www.npmjs.com/package/@thi.ng/pixel-dither)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel-dither.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
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
  - [Custom dither kernels](#custom-dither-kernels)
- [Authors](#authors)
- [License](#license)

## About

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-dither.jpg)

Extensible image dithering w/ various algorithm presets. This is a support package for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel).

The package provides the following dithering algorithm presets (can also be
very easily extended via definition of custom kernels):

- Atkinson
- Bayes (ordered dithering w/ customizable sizes & levels)
- Burkes
- Diffusion (1D row/column, 2D)
- Floyd-Steinberg
- Jarvis-Judice-Ninke
- Sierra 2-row
- Stucki
- Threshold

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpixel-dither%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/pixel-dither
```

ESM import:

```ts
import * as pd from "@thi.ng/pixel-dither";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/pixel-dither"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const pd = await import("@thi.ng/pixel-dither");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.06 KB

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)

## Usage examples

Three projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                           | Description                                            | Live demo                                           | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-dither.jpg" width="240"/>  | Showcase of various dithering algorithms               | [Demo](https://demo.thi.ng/umbrella/pixel-dither/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-dither)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-indexed.jpg" width="240"/> | Image dithering and remapping using indexed palettes   | [Demo](https://demo.thi.ng/umbrella/pixel-indexed/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-indexed) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>  | Multi-layer vectorization & dithering of bitmap images | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)  |

## API

[Generated API docs](https://docs.thi.ng/umbrella/pixel-dither/)

```ts
import { imageFromURL, intBufferFromImage, GRAY8 } from "@thi.ng/pixel";
import { ditherWith, ATKINSON } from "@thi.ng/pixel-dither";

// create pixel buffer from HTML image element
const img = intBufferFromImage(await imageFromURL("test.jpg"));

// apply dithering to all channels in given pixel buffer
ditherWith(ATKINSON, img);

// first convert to 8-bit gray before dithering
ditherWith(ATKINSON, img.as(GRAY8));

// ...or apply dithering to select channels only
// use custom threshold & error spillage/bleed factor
ditherWith(ATKINSON, img, { channels: [1, 2, 3], threshold: 0.66, bleed: 0.75 });
```

### Custom dither kernels

All bundled algorithm presets (apart from `orderedDither()`) are implemented as
[`DitherKernel`](https://docs.thi.ng/umbrella/pixel-dither/interfaces/DitherKernel.html)
configurations for, defining how each dithered pixel's error should be
diffused/distributed to neighbors. This approach makes it very easy to define
custom dither configs, like so:

```ts
import { ditherWith, type DitherKernel } from "@thi.ng/pixel-dither";

const CUSTOM: DitherKernel = {
    // X offsets of neighbor pixels to update
    ox: [1],
    // Y offsets of neighbor pixels to update
    oy: [1],
    // error weights for updated pixels
    weights: [1],
    // bit shift (scale factor)
    shift: 1,
};

ditherWith(CUSTOM, img);
```

The above config will distribute the error to a single pixel @ offset (1,1).
However the error will be bit-shifted by 1 bit to the right (aka division-by-2).
In code form:

```ts
pixels[i + ox + oy * width] += (err * weight) >> shift;
```

**Important:** Ensure the offset positions only refer to still unprocessed
pixels, i.e. those to the right and/or below the currently processed pixel (in
following rows).

You can see the result of this kernel in the [pixel-dither
demo](https://demo.thi.ng/umbrella/pixel-dither/).

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-pixel-dither,
  title = "@thi.ng/pixel-dither",
  author = "Karsten Schmidt",
  note = "https://thi.ng/pixel-dither",
  year = 2021
}
```

## License

&copy; 2021 - 2025 Karsten Schmidt // Apache License 2.0
