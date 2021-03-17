<!-- This file is generated - DO NOT EDIT! -->

# ![pixel](https://media.thi.ng/umbrella/banners/thing-pixel.svg?c62147b1)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel.svg)](https://www.npmjs.com/package/@thi.ng/pixel)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [WIP features](#wip-features)
  - [Packed integer pixel formats](#packed-integer-pixel-formats)
  - [Floating point pixel formats](#floating-point-pixel-formats)
  - [Filtered image sampling and resizing](#filtered-image-sampling-and-resizing)
    - [Filters](#filters)
    - [Wrap mode](#wrap-mode)
  - [Strided convolution & pooling](#strided-convolution--pooling)
  - [Normal map generation](#normal-map-generation)
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

Typedarray integer & float pixel buffers w/ customizable formats, blitting, dithering, convolution.

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/pixel-basics.png)

- Buffer creation from HTML image elements w/ opt resize & format
  conversion (browser only)
- Buffer-to-buffer blitting w/ automatic format conversion
- Buffer-to-canvas blitting
- Buffer-to-buffer blending w/ [Porter-Duff
  operators](https://github.com/thi-ng/umbrella/tree/develop/packages/porter-duff)
- Pre/post-multiply alpha
- Region / sub-image extraction
- Single-channel manipulation / extraction / replacement / conversion
- Convolution w/ arbitrary shaped/sized kernels, pooling, striding (resizing)
- Convolution kernel & pooling kernels presets
- Customizable normal map generation (i.e. X/Y gradients plus static Z component)
- Inversion
- Image sampling, resizing, pooling (nearest neighbor, bilinear, bicubic, mean/min/max pooling)
- XY full pixel & channel-only accessors
- 12 packed integer and 6 floating point preset formats (see table below)
- Ordered dithering w/ customizable Bayer matrix size and target color
  steps (int formats only)
- Declarative custom format & optimized code generation
- HTML canvas creation & `ImageData` utilities

### WIP features

- [x] Accessors for normalized channel value
- [x] Pre/Post-multipy (only if alpha is available)
- [x] Re-add strided float buffers / formats
- [x] Dithering
- Readonly texture sampling abstraction
    - [ ] Wrap-around behaviors
    - [ ] Filtered access (bilinear interpolation)

### Packed integer pixel formats

All packed integer formats use the canvas native ABGR 32bit format as
common intermediate for conversions. During conversion to ABGR, channels
with sizes smaller than 8 bits will be scaled appropriately to ensure an
as full-range and as linear as possible mapping. E.g. a 4 bit channel
will be scaled by 255 / 15 = 17.

Format specs can freely control channel layout within current limits:

- Channel sizes: 1 - 32 bits.
- Storage: 8, 16 or 32 bits per pixel

New formats can be defined via `defPackedFormat()`.

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

### Floating point pixel formats

Strided floating point format presets for use with `floatBuffer()`. New
formats can be defined via `defFloatFormat()`.

| Format ID          | Channel count | Description                 |
|--------------------|---------------|-----------------------------|
| `FLOAT_GRAY`       | 1             | Single channel / grayscale  |
| `FLOAT_GRAY_ALPHA` | 2             | Grayscale and alpha channel |
| `FLOAT_NORMAL`     | 3             | Normal map (signed values)  |
| `FLOAT_RGB`        | 3             | Red, Green, Blue            |
| `FLOAT_RGBA`       | 4             | Red, Green, Blue, Alpha     |

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
const src = packedBuffer(4, 4, ABGR8888);

// fill w/ random colors
src.pixels.forEach((_,i) => src.pixels[i] = 0xff << 24 | (Math.random() * 0xffffff));

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

### Strided convolution & pooling

Floating point buffers can be processed using arbitrary convolution kernels. The
following convolution kernel presets are provided for convenience:

| Kernel           | Size        |
|------------------|-------------|
| `BOX_BLUR3`      | 3x3         |
| `BOX_BLUR5`      | 5x5         |
| `GAUSSIAN_BLUR3` | 3x3         |
| `GAUSSIAN_BLUR5` | 5x5         |
| `GAUSSIAN(n)`    | 2n+1 x 2n+1 |
| `HIGHPASS3`      | 3x3         |
| `SHARPEN3`       | 3x3         |
| `SOBEL_X`        | 3x3         |
| `SOBEL_Y`        | 3x3         |
| `UNSHARP_MASK5`  | 5x5         |

Furthermore, convolution supports striding (i.e. only processing every nth pixel
column/row) and pixel pooling (e.g. for ML applications). Available pooling
kernel presets (kernel sizes are configured independently):

| Kernel                 | Description        |
|------------------------|--------------------|
| `POOL_MEAN`            | Moving average     |
| `POOL_MAX`             | Local maximum      |
| `POOL_MIN`             | Local minimum      |
| `POOL_NEAREST`         | Nearest neighbor   |
| `POOL_THRESHOLD(bias)` | Adaptive threshold |

Convolution can be applied to single, multiple or all channels of a
`FloatBuffer`. See
[`convolveChannel()`](https://docs.thi.ng/umbrella/pixel/modules.html#convolvechannel)
and
[`convolveImage()`](https://docs.thi.ng/umbrella/pixel/modules.html#convolveimage)

TODO add image & code example

### Normal map generation

Normal maps can be created via `normalMap()`. This function uses an adjustable
convolution kernel size to control gradient smoothness & details. Result X/Y
gradients can also be scaled (uniform or anisotropic) and the Z component can be
customized to (default: 1.0). The resulting image is in `FLOAT_NORMAL` format,
using signed channel values. This channel format is auto-translating these into
unsigned values when the image is converted into an integer format.

| Step | Scale = 1                                                                                | Scale = 2                                                                                | Scale = 4                                                                                | Scale = 8                                                                                |
|------|------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| 0    | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-0-1.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-0-2.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-0-4.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-0-8.jpg) |
| 1    | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-1-1.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-1-2.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-1-4.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-1-8.jpg) |
| 2    | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-2-1.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-2-2.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-2-4.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-2-8.jpg) |
| 3    | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-3-1.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-3-2.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-3-4.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-3-8.jpg) |

```ts
import { floatBuffer, normalMap, FLOAT_GRAY, RGB888 } from "@thi.ng/pixel";
import { asPPM, read } from "@thi.ng/pixel-io-netpbm";

// read source image into a single channel floating point buffer
const src = floatBuffer(read(readFileSync("noise.pgm")), FLOAT_GRAY);

// create normal map (w/ default options)
const nmap = normalMap(src, { step: 0, scale: 1 });

// pixel lookup (vectors are stored _un_normalized)
nmap.getAt(10, 10);
// Float32Array(3) [ -0.019607841968536377, -0.04313725233078003, 1 ]

// save as 24bit PBM, conversion to RGB int format first
writeFileSync("noise-normal.ppm", asPPM(nmap.as(RGB888)));
```

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpixel%5D+in%3Atitle)

### Support packages

- [@thi.ng/pixel-io-netpbm](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-io-netpbm) - Multi-format NetPBM reader & writer support for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)

### Related packages

- [@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/develop/packages/porter-duff) - Porter-Duff operators for packed ints & float-array alpha compositing

## Installation

```bash
yarn add @thi.ng/pixel
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/pixel?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/pixel/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 8.69 KB / CJS: 8.96 KB / UMD: 8.70 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/develop/packages/porter-duff)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                | Description                                                      | Live demo                                                | Source                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/adaptive-threshold.png" width="240"/> | Interactive image processing (adaptive threshold)                | [Demo](https://demo.thi.ng/umbrella/adaptive-threshold/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/adaptive-threshold) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/pixel-basics.png" width="240"/>          | Pixel buffer manipulations                                       | [Demo](https://demo.thi.ng/umbrella/pixel-basics/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-basics)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/>      | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/porter-duff/porter-duff2.png" width="240"/>    | Port-Duff image compositing / alpha blending                     | [Demo](https://demo.thi.ng/umbrella/porter-duff/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/porter-duff)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-workers.jpg" width="240"/> | Fork-join worker-based raymarch renderer                         | [Demo](https://demo.thi.ng/umbrella/shader-ast-workers/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-workers) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas-image.png" width="240"/>  | Textmode image warping w/ 16bit color output                     | [Demo](https://demo.thi.ng/umbrella/text-canvas-image/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas-image)  |
|                                                                                                                           | Minimal multi-pass / GPGPU example                               | [Demo](https://demo.thi.ng/umbrella/webgl-multipass/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-multipass)    |

## API

[Generated API docs](https://docs.thi.ng/umbrella/pixel/)

```ts
import * as pix from "@thi.ng/pixel";
import { SRC_OVER_I } from "@thi.ng/porter-duff";

import IMG from "../assets/haystack.jpg";
import LOGO from "../assets/logo-64.png";

Promise
    .all([IMG, LOGO].map(pix.imagePromise))
    .then(([img, logo]) => {

        // init 16 bit packed RGB pixel buffer from image (resized to 256x256)
        const buf = pix.PackedBuffer.fromImage(img, pix.RGB565, 256, 256);

        // create grayscale buffer for logo and use Porter-Duff operator to
        // composite with main image. Since the logo has transparency, we need
        // to premultiply alpha first...
        pix.PackedBuffer.fromImage(logo, pix.GRAY_ALPHA88)
            .premultiply()
            .blend(SRC_OVER_I, buf, {
                dx: 10,
                dy: 10
            });

        // extract sub-image
        const region = buf.getRegion(32, 96, 128, 64);
        // copy region back at new position
        region.blit(buf, { dx: 96, dy: 32 });

        // or alternatively blit buf into itself
        // buf.blit(buf, { dx: 96, dy: 32, sx: 32, sy: 96, w: 128, h: 64 });

        // create html canvas
        // (returns obj of canvas & 2d context)
        const ctx = pix.canvas2d(buf.width, buf.height * 3);

        // write pixel buffer to canvas
        buf.blitCanvas(ctx.canvas);

        // manipulate single color channel (here red)
        const id = 0;
        // obtain channel & invert
        const ch = buf.getChannel(id).invert();
        // create dot pattern
        for (let y = 0; y < ch.height; y += 2) {
            for (let x = (y >> 1) & 1; x < ch.width; x += 2) {
                ch.setAt(x, y, 0xff);
            }
        }
        // replace original channel
        buf.setChannel(id, ch);

        // write pixel buffer to new position
        buf.blitCanvas(ctx.canvas, 0, buf.height);

        // create & write grayscale version
        buf.as(GRAY8).blitCanvas(ctx.canvas, 0, buf.height * 2);

        document.body.appendChild(ctx.canvas);
});
```

TODO see examples & source comments for now

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-pixel,
  title = "@thi.ng/pixel",
  author = "Karsten Schmidt",
  note = "https://thi.ng/pixel",
  year = 2019
}
```

## License

&copy; 2019 - 2021 Karsten Schmidt // Apache Software License 2.0
