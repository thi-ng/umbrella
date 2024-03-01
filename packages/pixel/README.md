<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/pixel](https://media.thi.ng/umbrella/banners-20230807/thing-pixel.svg?568335f1)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel.svg)](https://www.npmjs.com/package/@thi.ng/pixel)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Integer pixel formats](#integer-pixel-formats)
  - [Floating point pixel formats](#floating-point-pixel-formats)
  - [Filtered image sampling and resizing](#filtered-image-sampling-and-resizing)
    - [Filters](#filters)
    - [Wrap mode](#wrap-mode)
  - [Strided convolution & pooling](#strided-convolution--pooling)
  - [Normal map generation](#normal-map-generation)
  - [Dominant color extraction](#dominant-color-extraction)
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
- k-means based dominant color extraction (float buffers only)
- Accessors for normalized channel value
- Image sampling, resizing, pooling
  - Filters: nearest neighbor, bilinear, bicubic
  - Wrap behaviors: clamp, wrap, repeat
  - Pooling: mean/min/max
- Invert image
- Convolution w/ arbitrary shaped/sized kernels, pooling, striding
- Convolution kernel & pooling kernels presets
  - Higher order kernel generators (Gaussian, Lanczos)
- Image pyramid generation (w/ customizable kernels)
- Customizable normal map generation (i.e. X/Y gradients plus static Z component)
- XY full pixel & channel-only accessors
- 12 packed integer and 6 floating point preset formats (see table below)
- Declarative custom format & optimized code generation
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

New formats can be defined via `defIntFormat()`.

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
| `LANCZOS(a,s)`   | as+1 x as+1 |
| `SHARPEN3`       | 3x3         |
| `SOBEL_X`        | 3x3         |
| `SOBEL_Y`        | 3x3         |
| `UNSHARP_MASK5`  | 5x5         |

Custom kernels can be defined (and code generated) using an array of
coefficients and a given kernel size. See above presets and
[`defKernel()`](https://docs.thi.ng/umbrella/pixel/functions/defKernel.html) for
reference.

Furthermore, convolution supports striding (i.e. only processing & keeping every
nth pixel column/row, aka downscaling) and pixel pooling (e.g. for ML
applications). Available pooling kernel presets (kernel sizes must be configured
independently):

| Kernel                 | Description        |
|------------------------|--------------------|
| `POOL_MEAN`            | Moving average     |
| `POOL_MAX`             | Local maximum      |
| `POOL_MIN`             | Local minimum      |
| `POOL_NEAREST`         | Nearest neighbor   |
| `POOL_THRESHOLD(bias)` | Adaptive threshold |

Convolution can be applied to single, multiple or all channels of a
`FloatBuffer`. See
[`convolveChannel()`](https://docs.thi.ng/umbrella/pixel/functions/convolveChannel.html)
and
[`convolveImage()`](https://docs.thi.ng/umbrella/pixel/functions/convolveImage.html).

See
[ConvolveOpts](https://docs.thi.ng/umbrella/pixel/interfaces/ConvolveOpts.html)
for config options.

```js
// convolutions are only available for float buffers (for now)
src = floatBuffer(read("test.ppm"), FLOAT_RGB);

// apply horizontal Sobel kernel preset to all channels
// downscale image by factor 2 (must be integer)
// scale kernel result values by factor 4
convolveImage(src, { kernel: SOBEL_X, stride: 2, scale: 4 });
```

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

```ts
import { floatBuffer, dominantColors, FLOAT_RGB } from "@thi.ng/pixel";
import { read } from "@thi.ng/pixel-io-netpbm";
import { readFileSync } from "fs";

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

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpixel%5D+in%3Atitle)

## Support packages

- [@thi.ng/pixel-dither](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-dither) - Extensible image dithering w/ various algorithm presets
- [@thi.ng/pixel-io-geotiff](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-io-geotiff) - GeoTIFF reader support for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
- [@thi.ng/pixel-io-netpbm](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-io-netpbm) - Multi-format NetPBM reader & writer support for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
- [@thi.ng/pixel-io-pfm](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-io-pfm) - Portable FloatMap image format support for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)

## Related packages

- [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color) - Array-based color types, CSS parsing, conversions, transformations, declarative theme generation, gradients, presets
- [@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/develop/packages/porter-duff) - Porter-Duff operators for packed ints & float-array alpha compositing
- [@thi.ng/rasterize](https://github.com/thi-ng/umbrella/tree/develop/packages/rasterize) - 2D shape drawing & rasterization
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast) - DSL to define shader code in TypeScript and cross-compile to GLSL, JS and other targets
- [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl) - WebGL & GLSL abstraction layer

## Installation

```bash
yarn add @thi.ng/pixel
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/pixel"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const pixel = await import("@thi.ng/pixel");
```

Package sizes (brotli'd, pre-treeshake): ESM: 9.43 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/canvas)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/distance](https://github.com/thi-ng/umbrella/tree/develop/packages/distance)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/k-means](https://github.com/thi-ng/umbrella/tree/develop/packages/k-means)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/develop/packages/porter-duff)

## Usage examples

Several projects in this repo's
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

TODO see examples & source comments for now

## Authors

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2019 - 2024 Karsten Schmidt // Apache License 2.0
