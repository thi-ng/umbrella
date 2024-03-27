<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/pixel-io-pfm](https://media.thi.ng/umbrella/banners-20230807/thing-pixel-io-pfm.svg?988dde31)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel-io-pfm.svg)](https://www.npmjs.com/package/@thi.ng/pixel-io-pfm)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel-io-pfm.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Portable FloatMap image format support for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel).

Similar to the [NetPBM
formats](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-io-netpbm),
the [Portable FloatMap image format](https://pauldebevec.com/Research/HDR/PFM/)
is extremely simple, uncompressed and mainly interesting for development
purposes & interchange (e.g. for use with Intel's [Open Image Denoise CLI
tools](https://github.com/OpenImageDenoise/oidn)).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpixel-io-pfm%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/pixel-io-pfm
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/pixel-io-pfm"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const pixelIoPfm = await import("@thi.ng/pixel-io-pfm");
```

Package sizes (brotli'd, pre-treeshake): ESM: 747 bytes

## Dependencies

- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)

## API

[Generated API docs](https://docs.thi.ng/umbrella/pixel-io-pfm/)

The package only provides 2 functions:

- [`asPFM(img: IntBuffer | FloatBuffer, littleEndian?: boolean, linearRGB?: boolean):
  Uint8Array`](https://docs.thi.ng/umbrella/pixel-io-pfm/functions/asPFM.html):
  Serializes an image to PFM and returns result as byte array
- [`readPFM(buf: Uint8Array, linearRGB?: boolean):
  FloatBuffer`](https://docs.thi.ng/umbrella/pixel-io-pfm/functions/readPFM.html):
  Parses byte array as PFM image and returns it as
  [`FloatBuffer`](https://docs.thi.ng/umbrella/pixel/classes/FloatBuffer.html)

```ts tangle:export/readme.ts
import { intBuffer, RGB888 } from "@thi.ng/pixel";
import { asPFM }  from "@thi.ng/pixel-io-pfm";
import { writeFileSync } from "fs";

// create 2x2 image
const img = intBuffer(2, 2, RGB888);
// set pixel data (R,G,B,Y)
img.data.set([0xff0000, 0x00ff00, 0x0000ff, 0xffff00]);

// serialize image to PFM byte array and write to file
// (format conversion to FLOAT_RGB is done automatically & non-destructively)
writeFileSync("export/rgby.pfm", asPFM(img));
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-pixel-io-pfm,
  title = "@thi.ng/pixel-io-pfm",
  author = "Karsten Schmidt",
  note = "https://thi.ng/pixel-io-pfm",
  year = 2023
}
```

## License

&copy; 2023 - 2024 Karsten Schmidt // Apache License 2.0
