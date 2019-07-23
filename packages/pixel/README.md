# @thi.ng/pixel

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/pixel.svg)](https://www.npmjs.com/package/@thi.ng/pixel)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Single & multi-channel pixel buffers, conversions, utilities. Some
features are browser-only.

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/screenshots/pixel-basics.jpg)

## Installation

```bash
yarn add @thi.ng/pixel
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/master/packages/binary)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)

## Usage examples

Code for the above example / screenshot...

Also see full example here:

[Live demo](http://demo.thi.ng/umbrella/pixel-basics/) |
[Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-basics)

```ts
import * as pix from "@thi.ng/pixel";

// init 32bit packed ARGB pixel buffer from image (resized to 256x256)
pix.ARGBBuffer.fromImagePromise(pix.imagePromise("foo.jpg"), 256, 256).then((buf) => {
    // extract sub-image
    const region = buf.getRegion(32, 96, 128, 64);
    // copy region back at new position
    region.blit(buf, 96, 32);

    // create html canvas
    const ctx = pix.canvas2d(buf.width * 3, buf.height);

    // write pixel buffer to canvas
    buf.blitCanvas(ctx.canvas);

    // manipulate single color channel with dot pattern
    const id = pix.Channel.RED;
    const ch = buf.getChannel(id).invert();
    for (let y = 0; y < ch.height; y += 2) {
        for (let x = (y >> 1) & 1; x < ch.width; x += 2) {
            ch.setAt(x, y, 0xff);
        }
    }
    // replace original channel
    buf.setChannel(id, ch);
    // write pixel buffer
    buf.blitCanvas(ctx.canvas, buf.width, 0);
    // create & write grayscale version (uint8 buffer)
    buf.grayscale().blitCanvas(ctx.canvas, buf.width * 2, 0);

    document.body.appendChild(ctx.canvas);
});
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
