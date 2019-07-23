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

```ts
import * as pix from "@thi.ng/pixel";

pix.ARGBBuffer.fromImagePromise("foo.jpg").then((buf) => {
    // manipulate red channel
    const red = buf.getChannel(pix.Channel.RED);
    for(let y = 0; y < red.height; y += 2) {
        for(let x = 0; x < red.width; x += 2) {
            red.setAt(x, y, 0xff);
        }
    }
    // replace original channel
    buf.setChannel(pix.Channel.RED, red);
    // create canvas
    const ctx = pix.canvas2d(buf.width * 2, buf.height);
    // write pixel buffer
    buf.blitCanvas(ctx.canvas);
    // create grayscale version
    const gray = buf.grayscale();
    // blit into right half of canvas
    gray.blitCanvas(ctx.canvas, buf.width, 0);

    document.body.appendChild(ctx.canvas);
});
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
