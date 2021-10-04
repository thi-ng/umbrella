<!-- This file is generated - DO NOT EDIT! -->

# ![pixel-dither](https://media.thi.ng/umbrella/banners/thing-pixel-dither.svg?cd0ecd41)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel-dither.svg)](https://www.npmjs.com/package/@thi.ng/pixel-dither)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel-dither.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Extensible image dithering w/ various algorithm presets.

The package provides the following dithering algorithm presets (but can also be
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

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpixel-dither%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/pixel-dither
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/pixel-dither"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const pixelDither = await import("@thi.ng/pixel-dither");
```

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)

## API

[Generated API docs](https://docs.thi.ng/umbrella/pixel-dither/)

```ts
import { packedBufferFromImage, GRAY8 } from "@thi.ng/pixel";
import { ditherWithKernel, ATKINSON } from "@thi.ng/pixel-dither";

const img = packedBufferFromImage("foo.jpg");

// apply dithering to all channels in given pixel buffer
ditherWithKernel(img, ATKINSON);

// first convert to 8-bit gray before dithering
ditherWithKernel(img.as(GRAY8), ATKINSON);

// apply dithering to select channels only
// use custom threshold & error spillage/bleed factor
ditherWithKernel(img, ATKINSON, { channels: [1, 2, 3], threshold: 0.66, bleed: 0.75 });
```

TODO

## Authors

Karsten Schmidt

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

&copy; 2021 Karsten Schmidt // Apache Software License 2.0
