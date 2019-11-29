<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/pixel

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel.svg)](https://www.npmjs.com/package/@thi.ng/pixel)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [WIP features](#wip-features)
  - [Preset pixel formats](#preset-pixel-formats)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Typed array backed, packed pixel buffer w/ customizable formats, blitting, conversions.

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/pixel/pixel-basics.png)

- Buffer creation from HTML image elements w/ opt resize & format
  conversion (browser only)
- Buffer-to-buffer blitting w/ automatic format conversion
- Buffer-to-canvas blitting
- Buffer-to-buffer blending w/ [Porter-Duff
  operators](https://github.com/thi-ng/umbrella/tree/master/packages/porter-duff)
- Pre/post-multiply alpha
- Region / sub-image extraction
- Single-channel manipulation / extraction / replacement / conversion
- Inversion
- XY pixel accessors
- 10 preset formats (see table below)
- Declarative custom format & optimized code generation
- HTML canvas creation & `ImageData` utilities

### WIP features

- [x] Accessors for normalized channel value
- [x] Pre/Post-multipy (only if alpha is available)
- [ ] Re-add strided float buffers / formats
- Readonly texture sampling abstraction
    - [ ] Wrap-around behaviors
    - [ ] Filtered access (bilinear interpolation)

### Preset pixel formats

All packed integer formats use the canvas native ABGR 32bit format as
common intermediate for conversions. During conversion to ABGR, channels
with sizes smaller than 8 bits will be scaled appropriately to ensure an
as full-range and as linear as possible mapping. E.g. a 4 bit channel
will be scaled by 255 / 15 = 17.

Format specs can freely control channel layout within current limits:

- Channel sizes: 1 - 32 bits.
- Storage: 8, 16 or 32 bits per pixel

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

### Status

**STABLE** - used in production

### Related packages

- [@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/master/packages/porter-duff) - Porter-Duff operators for packed ints & float-array alpha compositing

## Installation

```bash
yarn add @thi.ng/pixel
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/master/packages/porter-duff)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### pixel-basics <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/pixel/pixel-basics.png)

[Live demo](https://demo.thi.ng/umbrella/pixel-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/pixel-basics)

### porter-duff <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/porter-duff/porter-duff2.png)

[Live demo](https://demo.thi.ng/umbrella/porter-duff/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/porter-duff)

### shader-ast-workers <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/shader-ast-workers.jpg)

[Live demo](https://demo.thi.ng/umbrella/shader-ast-workers/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-workers)

### webgl-multipass <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/webgl-multipass/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-multipass)

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

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
