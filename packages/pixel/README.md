# @thi.ng/pixel

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/pixel.svg)](https://www.npmjs.com/package/@thi.ng/pixel)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [WIP features](#wip-features)
    - [Preset pixel formats](#preset-pixel-formats)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/screenshots/pixel-basics.jpg)

Typed array backed, packed integer and non-packed float pixel buffers
with customizable layout formats and the following operations:

- buffer creation from HTML image elements w/ opt resize & format
  conversion (browser only)
- buffer-to-buffer blitting w/ automatic format conversion
- buffer-to-canvas blitting
- buffer-to-buffer blending w/ [Porter-Duff
  operators](https://github.com/thi-ng/umbrella/tree/master/packages/color#rgba-porter-duff-compositing)
- region / subimage extraction
- single-channel manipulation / extraction / replacement
- inversion
- XY pixel accessors
- 9 preset formats (see table below)
- declarative custom format & optimized code generation
- HTML canvas creation & ImageData utilities

### WIP features

- [ ] Accessors for normalized channel value
- [ ] Pre/Post-multipy (only if alpha is available)
- [ ] Re-add strided float buffers / formats
- Readonly texture sampling abstraction
    - [ ] Wrap-around behaviors
    - [ ] Filtered access (bilinear interpolation)

### Preset pixel formats

All formats use the canvas native ABGR 32bit format as common
intermediate for conversions. During conversion to ABGR, channels with
sizes smaller than 8 bits will be scaled appropriately to ensure an as
full-range and as linear as possible mapping. E.g. a 4 bit channel will
be scaled by 255 / 15 = 17.

| Format ID      | Bits per pixel    | Description                           |
|----------------|-------------------|---------------------------------------|
| `GRAY8`        | 8                 | 8 bit single channel                  |
| `GRAY_ALPHA88` | 16                | 8 bit single channel, 8 bit alpha     |
| `ARGB4444`     | 16                | 4 channels @ 4 bits each              |
| `ARGB1555`     | 16                | 5 bits each for RGB, 1 bit alpha      |
| `RGB565`       | 16                | 5 bits red, 6 bits green, 5 bits blue |
| `RGB888`       | 32 (24 effective) | 3 channels @ 8 bits each              |
| `ARGB8888`     | 32                | 4 channels @ 8 bits each              |
| `BGR888`       | 32 (24 effective) | 3 channels @ 8 bits each              |
| `ABGR8888`     | 32                | 4 channels @ 8 bits each              |

## Installation

```bash
yarn add @thi.ng/pixel
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)

## Usage examples

Code for the above example / screenshot...

Also see full example here:

[Live demo](http://demo.thi.ng/umbrella/pixel-basics/) |
[Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-basics)

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

## API

TODO see example & source comments for now

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
