<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/pixel-io-tiff](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-pixel-io-tiff.svg?1a6f5e33)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel-io-tiff.svg)](https://www.npmjs.com/package/@thi.ng/pixel-io-tiff)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel-io-tiff.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 213 standalone projects, maintained as part
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
- [Basic usage](#basic-usage)
- [Authors](#authors)
- [License](#license)

## About

Basic TIFF image format support for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel).

This lightweight package (~2.6KB brotli) current only supports read access and
the following TIFF features:

- **Metadata:** Multiple IFDs (tag directories), optional Exif, GPS, Sub-IFDs extraction
- **Compression:** uncompressed or deflate
- **Color formats:** Grayscale 8/16 bits, (A)RGB 8bit
- **Data layout:** Tiled or strips, sub-images

The following functions are included:

- [`readIFDs()`](https://docs.thi.ng/umbrella/pixel-io-tiff/functions/readIFDs.html):
  Only read image metadata directories (incl. Exif/GPS if available), without
  parsing any pixel data. Parsing of nested IFDs can be disabled.
- [`readTIFF()`](https://docs.thi.ng/umbrella/pixel-io-tiff/functions/readTIFF.html):
  Read TIFF image and parse pixel data. If an IFD is given, only the related
  sub-image will be read (else the main image is used).
- [`intBufferFromTIFF()`](https://docs.thi.ng/umbrella/pixel-io-tiff/functions/intBufferFromTIFF.html):
  Converts a parsed raw TIFF to a [@thi.ng/pixel](https://thi.ng/pixel) buffer

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpixel-io-tiff%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/pixel-io-tiff
```

ESM import:

```ts
import * as pit from "@thi.ng/pixel-io-tiff";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/pixel-io-tiff"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const pit = await import("@thi.ng/pixel-io-tiff");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.56 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/pixel-io-tiff/)

## Basic usage

```ts tangle:export/readme-1.ts
import {
    intBufferFromTIFF,
    readIFDs,
    readTIFF,
    Tag,
    Exif,
    type IFD,
} from "@thi.ng/pixel-io-tiff";
import { readBinary } from "@thi.ng/file-io";

// load as Uint8Array
const buf = readBinary("example.tiff");

// read metadata directories of all sub-images in the loaded TIFF (byte array)
// (this op does only deals with metadata and does NOT parse any pixel data)
// (options shown here are defaults)
const ifd = readIFDs(buf, { float: true, subIFD: true, all: true });

// the first IFD in a TIFF always refers to the main image
console.log(ifd);
// [
//   {
//       "256": [ 1920 ],
//       "257": [ 1473 ],
//       "258": [ 16, 16, 16 ],
//       "259": [ 8 ],
//       "262": [ 2 ],
//       "271": "Apple",
//       "272": "iPhone 11",
//       ...
//   },
//   { ... }
// ]

// access specific metadata tags
// (tag values are always arrays, strings or arrays of sub-IFDs)
console.log("size", ifd[0][Tag.ImageWidth][0], ifd[0][Tag.ImageLength][0]);
// size 1920 1473

// access Exif metadata
const exif = <IFD>ifd[0][Tag.Exif][0];
console.log(
    "exif",
    exif[Exif.FNumber][0],
    exif[Exif.ExposureTime][0],
    exif[Exif.DateTimeOriginal]
);
// exif 1.8 0.0002 2024:10:22 14:16:01

// actually parse TIFF fully and convert to thi.ng/pixel buffer
// (the given IFD is optional and can be used to just parse a sub-image (e.g. thumbnail))
const img = intBufferFromTIFF(await readTIFF(buf, ifd[0]));
// IntBuffer { size: [ 1920, 1473 ], stride: [ 1, 1920 ], format: { __packed: true, type: 'u32', ... } }
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-pixel-io-tiff,
  title = "@thi.ng/pixel-io-tiff",
  author = "Karsten Schmidt",
  note = "https://thi.ng/pixel-io-tiff",
  year = 2025
}
```

## License

&copy; 2025 - 2026 Karsten Schmidt // Apache License 2.0
