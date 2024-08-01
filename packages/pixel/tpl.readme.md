<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

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

<!-- include ../../assets/tpl/footer.md -->
