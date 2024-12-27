<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/pixel](https://media.thi.ng/umbrella/banners-20230807/thing-pixel.svg?fdc39d3a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel.svg)](https://www.npmjs.com/package/@thi.ng/pixel)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 200 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Integer pixel formats](#integer-pixel-formats)
  - [Indexed, palette-based pixel formats](#indexed-palette-based-pixel-formats)
  - [Floating point pixel formats](#floating-point-pixel-formats)
  - [Filtered image sampling and resizing](#filtered-image-sampling-and-resizing)
    - [Filters](#filters)
    - [Wrap mode](#wrap-mode)
- [Status](#status)
- [Support packages](#support-packages)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Typedarray integer & float pixel buffers w/ customizable formats, blitting, drawing, convolution.

> [!IMPORTANT]
> In July 2024 this package was restructured and split-up to extract some
> features into smaller more focused packages:
>
> - [@thi.ng/pixel-convolve](https://thi.ng/pixel-convolve)
> - [@thi.ng/pixel-dominant-colors](https://thi.ng/pixel-dominant-colors)

- Buffer creation from HTML image elements or canvas w/ opt resize & format
  conversion (browser only)
- 12 packed integer and 6 floating point preset formats (see table below)
- Palette-based indexed pixel formats
- Buffer-to-buffer blitting w/ automatic format conversion
- Buffer-to-canvas blitting (incl. offscreen canvas support)
- Buffer-to-buffer blending w/ [Porter-Duff
  operators](https://github.com/thi-ng/umbrella/tree/develop/packages/porter-duff)
- Pre/post-multiply alpha
- Region / sub-image extraction
- Single-channel manipulation / extraction / replacement / conversion
- Accessors for normalized channel value
- Image sampling & filtered resizing
  - Filters: nearest neighbor, bilinear, bicubic
  - Wrap behaviors: clamp, wrap, repeat
- Invert image
- XY coordinate-based pixel & channel-only accessors (w/ optional bounds checking)
- Declarative custom pixel formats with optimized code generation
- HTML canvas creation & `ImageData` utilities

### Integer pixel formats

All integer formats use the canvas native ABGR 32bit format as common
intermediate for conversions. During conversion to ABGR, channels with sizes
smaller than 8 bits will be scaled appropriately to ensure an as full-range and
as linear as possible mapping. E.g. a 4 bit channel will be scaled by 255 / 15 =
17.

Format specs can freely control channel layout within current limits:

- Channel sizes: 1 - 32 bits.
- Storage: 8, 16 or 32 bits per pixel

Custom formats can be defined via
[`defIntFormat()`](https://docs.thi.ng/umbrella/pixel/functions/defIntFormat.html).

| Format ID      | Bits per pixel    | Description                                          |
|----------------|-------------------|------------------------------------------------------|
| `ALPHA8`       | 8                 | 8 bit channel (alpha only)                           |
| `GRAY8`        | 8                 | 8 bit single channel (grayscale conv)                |
| `GRAY_ALPHA8`  | 16                | 8 bit single channel (grayscale conv), 8 bit alpha   |
| `GRAY16`       | 16                | 16 bit single channel (grayscale conv)               |
| `GRAY_ALPHA16` | 32                | 16 bit single channel (grayscale conv), 16 bit alpha |
| `ARGB4444`     | 16                | 4 channels @ 4 bits each                             |
| `ARGB1555`     | 16                | 5 bits each for RGB, 1 bit alpha                     |
| `RGB565`       | 16                | 5 bits red, 6 bits green, 5 bits blue                |
| `RGB888`       | 32 (24 effective) | 3 channels @ 8 bits each                             |
| `ARGB8888`     | 32                | 4 channels @ 8 bits each                             |
| `BGR888`       | 32 (24 effective) | 3 channels @ 8 bits each                             |
| `ABGR8888`     | 32                | 4 channels @ 8 bits each                             |

- `ALPHA8` is mapped from/to ABGR alpha channel
- `GRAY8/16`, `GRAY_ALPHA8/16` compute grayscale/luminance when
  converting from ABGR and in return produce grayscale ABGR
- In all built-in formats supporting it, the alpha channel always
  occupies the most-significant bits (up to format size)

### Indexed, palette-based pixel formats

Instead of storing colors directly for each pixel, palette-based formats are
supported which only store a color index per pixel (e.g. as is done for GIF
and/or indexed PNG formats). These formats can be created via the
[`defIndexed()` family of
functions](https://docs.thi.ng/umbrella/pixel/functions/defIndexed.html).

### Floating point pixel formats

Strided floating point format presets for use with
[`floatBuffer()`](https://docs.thi.ng/umbrella/pixel/functions/floatBuffer-1.html).
New formats can be defined via
[`defFloatFormat()`](https://docs.thi.ng/umbrella/pixel/functions/defFloatFormat.html).

| Format ID          | Channel count | Description                          |
|--------------------|---------------|--------------------------------------|
| `FLOAT_GRAY`       | 1             | Single channel / grayscale           |
| `FLOAT_GRAY_ALPHA` | 2             | Grayscale and alpha channel          |
| `FLOAT_GRAY_RANGE` | 1             | Grayscale (user defined value range) |
| `FLOAT_NORMAL`     | 3             | Normal map (signed values)           |
| `FLOAT_RGB`        | 3             | Red, Green, Blue                     |
| `FLOAT_RGBA`       | 4             | Red, Green, Blue, Alpha              |

- All color channels are unclamped (but can be clamped via `buf.clamp()`). For
  conversion to packed int formats assumed to contain normalized data (i.e.
  [0..1] interval, with exception of `FLOAT_NORMAL` which uses [-1..1] range)
- Conversion between float formats is currently unsupported

### Filtered image sampling and resizing

Available (and optimized) for both integer & floating point formats, image
samplers can be created with the following filters & wrap modes:

#### Filters

- `"nearest"` - nearest neighbor
- `"linear"` - bilinear interpolation
- `"cubic"` - bicubic interpolation

#### Wrap mode

- `"clamp"` - outside values return 0
- `"wrap"` - infinite tiling
- `"repeat"` - edge pixels are repeated

```ts
import { intBuffer, defSampler, ABGR8888 } from "@thi.ng/pixel";

const src = intBuffer(4, 4, ABGR8888);

// fill w/ random colors
src.forEach((_,i) => 0xff000000 | Math.random() * 0xffffff);

// create bilinear sampler w/ repeated edge pixels
const sampler = defSampler(src, "linear", "repeat");

// sample at fractional positions (even outside image)
sampler(-1.1, 0.5).toString(16)
// 'ff79643a'

// resize image to 1024x256 using bicubic sampling
const img = src.resize(1024, 256, "cubic");
```

| Filter      |                                                                                                                                          |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `"nearest"` | ![resized image w/ nearest neighbor sampling](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/resize-nearest.png) |
| `"linear"`  | ![resized image w/ bilinear sampling](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/resize-bilinear.jpg)        |
| `"cubic"`   | ![resized image w/ bicubic sampling](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/resize-bicubic.jpg)          |

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpixel%5D+in%3Atitle)

## Support packages

- [@thi.ng/pixel-convolve](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-convolve) - Extensible bitmap image convolution, kernel presets, normal map & image pyramid generation
- [@thi.ng/pixel-dither](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-dither) - Extensible image dithering w/ various algorithm presets
- [@thi.ng/pixel-dominant-colors](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-dominant-colors) - k-means based dominant color extraction from images/pixel buffers
- [@thi.ng/pixel-io-geotiff](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-io-geotiff) - GeoTIFF reader support for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
- [@thi.ng/pixel-io-netpbm](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-io-netpbm) - Multi-format NetPBM reader & writer support for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
- [@thi.ng/pixel-io-pfm](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-io-pfm) - Portable FloatMap image format support for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)

## Related packages

- [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color) - Array-based color types, CSS parsing, conversions, transformations, declarative theme generation, gradients, presets
- [@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/develop/packages/porter-duff) - Porter-Duff operators for packed ints & float-array alpha compositing
- [@thi.ng/rasterize](https://github.com/thi-ng/umbrella/tree/develop/packages/rasterize) - Headless 2D shape drawing, filling & rasterization for arbitrary targets/purposes (no canvas required)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast) - DSL to define shader code in TypeScript and cross-compile to GLSL, JS and other targets
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl) - WebGL & GLSL abstraction layer

## Installation

```bash
yarn add @thi.ng/pixel
```

ESM import:

```ts
import * as pix from "@thi.ng/pixel";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/pixel"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const pix = await import("@thi.ng/pixel");
```

Package sizes (brotli'd, pre-treeshake): ESM: 7.35 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/canvas)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/develop/packages/porter-duff)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

26 projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                | Description                                                                                  | Live demo                                                | Source                                                                                |
|:--------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/adaptive-threshold.png" width="240"/> | Interactive image processing (adaptive threshold)                                            | [Demo](https://demo.thi.ng/umbrella/adaptive-threshold/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/adaptive-threshold) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ascii-raymarch.jpg" width="240"/>     | ASCII art raymarching with thi.ng/shader-ast & thi.ng/text-canvas                            | [Demo](https://demo.thi.ng/umbrella/ascii-raymarch/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ascii-raymarch)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/blurhash.jpg" width="240"/>           | Interactive & reactive image blurhash generator                                              | [Demo](https://demo.thi.ng/umbrella/blurhash/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/blurhash)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/>    | Color palette generation via dominant color extraction from uploaded images                  | [Demo](https://demo.thi.ng/umbrella/dominant-colors/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-terrain-viz.jpg" width="240"/>   | 2.5D hidden line visualization of digital elevation files (DEM)                              | [Demo](https://demo.thi.ng/umbrella/geom-terrain-viz/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-terrain-viz)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ifs-fractal.jpg" width="240"/>        | Barnsley fern IFS fractal renderer                                                           | [Demo](https://demo.thi.ng/umbrella/ifs-fractal/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ifs-fractal)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/pixel-basics.png" width="240"/>          | Pixel buffer manipulations                                                                   | [Demo](https://demo.thi.ng/umbrella/pixel-basics/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-basics)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-colormatrix.jpg" width="240"/>  | Matrix-based image color adjustments                                                         | [Demo](https://demo.thi.ng/umbrella/pixel-colormatrix/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-colormatrix)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-dither.jpg" width="240"/>       | Showcase of various dithering algorithms                                                     | [Demo](https://demo.thi.ng/umbrella/pixel-dither/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-dither)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-gradients.jpg" width="240"/>    | Randomized 4-point 2D color gradient image generator                                         | [Demo](https://demo.thi.ng/umbrella/pixel-gradients/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-gradients)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-indexed.jpg" width="240"/>      | Image dithering and remapping using indexed palettes                                         | [Demo](https://demo.thi.ng/umbrella/pixel-indexed/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-indexed)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-normal-map.jpg" width="240"/>   | Normal map creation/conversion basics                                                        | [Demo](https://demo.thi.ng/umbrella/pixel-normal-map/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-normal-map)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/>      | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel                             | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-waveform.jpg" width="240"/>     | RGB waveform image analysis                                                                  | [Demo](https://demo.thi.ng/umbrella/pixel-waveform/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-waveform)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poisson-image.avif" width="240"/>     | Image-based Poisson-disk sampling                                                            | [Demo](https://demo.thi.ng/umbrella/poisson-image/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poisson-image)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/porter-duff/porter-duff2.png" width="240"/>    | Port-Duff image compositing / alpha blending                                                 | [Demo](https://demo.thi.ng/umbrella/porter-duff/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/porter-duff)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rasterize-blend.jpg" width="240"/>    | Steering behavior drawing with alpha-blended shapes                                          | [Demo](https://demo.thi.ng/umbrella/rasterize-blend/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rasterize-blend)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-formgen.jpg" width="240"/>       | Basic usage of the declarative rdom-forms generator                                          | [Demo](https://demo.thi.ng/umbrella/rdom-formgen/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-formgen)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/related-images.jpg" width="240"/>     | Responsive image gallery with tag-based Jaccard similarity ranking                           | [Demo](https://demo.thi.ng/umbrella/related-images/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/related-images)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph-image.png" width="240"/>   | 2D scenegraph & image map based geometry manipulation                                        | [Demo](https://demo.thi.ng/umbrella/scenegraph-image/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph-image)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-tunnel.jpg" width="240"/>  | WebGL & Canvas2D textured tunnel shader                                                      | [Demo](https://demo.thi.ng/umbrella/shader-ast-tunnel/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-tunnel)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-workers.jpg" width="240"/> | Fork-join worker-based raymarch renderer (JS/CPU only)                                       | [Demo](https://demo.thi.ng/umbrella/shader-ast-workers/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-workers) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas-image.png" width="240"/>  | Textmode image warping w/ 16bit color output                                                 | [Demo](https://demo.thi.ng/umbrella/text-canvas-image/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas-image)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>       | Multi-layer vectorization & dithering of bitmap images                                       | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/unbiased-normals.png" width="240"/>   | Visual comparison of biased vs. unbiased normal vectors projected on the surface of a sphere | [Demo](https://demo.thi.ng/umbrella/unbiased-normals/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/unbiased-normals)   |
|                                                                                                                           | Minimal multi-pass / GPGPU example                                                           | [Demo](https://demo.thi.ng/umbrella/webgl-multipass/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-multipass)    |

## API

[Generated API docs](https://docs.thi.ng/umbrella/pixel/)

```ts
import * as pix from "@thi.ng/pixel";
import { SRC_OVER_I } from "@thi.ng/porter-duff";
import { pixelCanvas2d } from "@thi.ng/canvas";

import IMG from "../assets/haystack.jpg";
import LOGO from "../assets/logo-64.png";

const [img, logo] = await Promise.all([IMG, LOGO].map((x) => imageFromURL(x)));

// init 16bit int RGB pixel buffer from image (resized to 256x256)
const buf = intBufferFromImage(img, RGB565, 256, 256);

// create grayscale buffer for logo and use Porter-Duff operator to
// composite with main image. Since the logo has transparency, we
// need to premultiply alpha first...
intBufferFromImage(logo, GRAY_ALPHA8).premultiply().blend(SRC_OVER_I, buf, {
    dx: 10,
    dy: 10,
});

// extract sub-image
// (method returns undefined if result region is < 1 pixel)
const region = buf.getRegion(32, 96, 128, 64)!;
// copy region back at new position
region.blit(buf, { dx: 96, dy: 32 });

// or alternatively blit buf into itself
// buf.blit(buf, { dx: 96, dy: 32, sx: 32, sy: 96, w: 128, h: 64 });

// create html canvas
// (returns obj of canvas & 2d context)
const { canvas } = pixelCanvas2d(buf.width, buf.height * 3, document.body);

// write pixel buffer to canvas
buf.blitCanvas(canvas);

// manipulate single color channel
const id = 0;
const ch = buf.getChannel(id).invert();
for (let y = 0; y < ch.height; y += 2) {
    for (let x = (y >> 1) & 1; x < ch.width; x += 2) {
        ch.setAt(x, y, 0xff);
    }
}
// replace original channel
buf.setChannel(id, ch);
// write pixel buffer to new position
buf.blitCanvas(canvas, { y: buf.height });
// create & write grayscale version
buf.as(GRAY8).blitCanvas(canvas, { y: buf.height * 2 });
```

## Authors

- [Karsten Schmidt](https://thi.ng) (Main author)
- [Askar Yusupov](https://github.com/pyoner)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-pixel,
  title = "@thi.ng/pixel",
  author = "Karsten Schmidt and others",
  note = "https://thi.ng/pixel",
  year = 2019
}
```

## License

&copy; 2019 - 2024 Karsten Schmidt // Apache License 2.0
