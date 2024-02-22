<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
> [!IMPORTANT]
> ‼️ Announcing the thi.ng user survey 2024 📋
>
> [Please participate in the survey here!](https://forms.gle/XacbSDEmQMPZg8197)\
> (open until end of February)
>
> **To achieve a better sample size, I'd highly appreciate if you could
> circulate the link to this survey in your own networks.**
>
> [Discussion](https://github.com/thi-ng/umbrella/discussions/447)

# ![@thi.ng/imago](https://media.thi.ng/umbrella/banners-20230807/thing-imago.svg?5b75bcfc)

[![npm version](https://img.shields.io/npm/v/@thi.ng/imago.svg)](https://www.npmjs.com/package/@thi.ng/imago)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/imago.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Basic example](#basic-example)
- [Supported operations](#supported-operations)
  - [blur](#blur)
  - [composite](#composite)
    - [Common options](#common-options)
    - [Bitmap layers](#bitmap-layers)
    - [SVG layers](#svg-layers)
  - [crop](#crop)
  - [dither](#dither)
  - [exif](#exif)
  - [extend](#extend)
  - [gamma](#gamma)
  - [grayscale](#grayscale)
  - [hsbl](#hsbl)
  - [nest](#nest)
  - [output](#output)
  - [resize](#resize)
  - [rotate](#rotate)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

JSON & API-based declarative and extensible image processing trees/pipelines.

Spiritual successor of an eponymous, yet never fully published
CLojure/Java-based image processor from 2014...

In this new TypeScript version all image I/O and processing is delegated to
[sharp](https://sharp.pixelplumbing.com) and
[@thi.ng/pixel](https://github.com/thi-ng/umbrella/blob/develop/packages/pixel).

### Basic example

Transformation trees/pipelines are simple JSON objects (but can be programmatically created):

The following pipeline performs the following steps:

- auto-rotate image (using EXIF orientation info)
- add 5% white border (size relative to shortest side)
- proportionally resize to 1920px (by default longest side)
- overlay bitmap logo layer, positioned at 45% left / 5% bottom
- add custom EXIF metadata
- output this current stage as high quality AVIF (using templated output path)
- crop center square region
- output as JPEG thumbnail

```json tangle:export/readme-example1.json
[
    { "type": "rotate" },
    { "type": "extend", "border": 5, "unit": "%", "ref": "min", "bg": "#fff" },
    { "type": "resize", "size": 1920 },
    {
        "type": "composite",
        "layers": [
            {
                "type": "img",
                "path": "logo-128.png",
                "pos": { "l": 45, "b": 5 },
                "unit": "%",
                "blend": "screen"
            }
        ]
    },
    {
        "type": "exif",
        "tags": {
            "IFD0": {
                "Copyright": "Karsten Schmidt",
                "Software": "@thi.ng/imago"
            }
        }
    },
    {
        "type": "output",
        "path": "{name}-{sha256}-{w}x{h}.avif",
        "avif": { "quality": 80 }
    },
    { "type": "crop", "size": [240, 240], "gravity": "c" },
    { "type": "output", "path": "{name}-thumb.jpg" }
]
```

Then to process an image:

```ts tangle:export/readme1.ts
import { processImage } from "@thi.ng/imago";
import { readJSON } from "@thi.ng/file-io";

await processImage(
    "test.jpg",
    readJSON("readme-example1.json"),
    { outDir: "." }
);
```

## Supported operations

TODO write docs

### blur

Gaussian blur

- radius

### composite

Compositing multiple layers:

#### Common options

- blend mode
- gravity or position
- tiled repetition

#### Bitmap layers

- resizable

#### SVG layers

- from file or inline doc

### crop

Cropping a part of the image

- from edges or region
- supports px or percent units
- proportional to a given reference side/size

### dither

Supported dither modes from
[thi.ng/pixel-dither](https://github.com/thi-ng/umbrella/blob/develop/packages/pixel-dither):

- "atkinson"
- "burkes"
- "column"
- "diffusion"
- "floyd"
- "jarvis"
- "row"
- "sierra"
- "stucki"

### exif

Set EXIF metadata (can only be given directly before [output](#output))

### extend

Add pixels on all sides of the image

- supports px or percent units
- proportional to a given reference side/size

### gamma

Perform gamma correction (forward or reverse)

### grayscale

Grayscale conversion

### hsbl

Hue, saturation, brightness and lightness adjustments

### nest

Nested branch/pipeline of operations with no effect on image state of
current/parent pipeline...

### output

File output in any of these formats:

- avif
- gif
- jpeg
- jp2 (JPEG 2000)
- jxl (JPEG XL)
- png
- raw (headless raw data)
- tiff
- webp

### resize

Resizing image

- gravity or position
- fit modes
- supports px or percent units
- proportional to a given reference side/size

### rotate

Auto-rotate, rotate and/or mirror image

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bimago%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/imago
```

For Node.js REPL:

```js
const imago = await import("@thi.ng/imago");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.14 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/date](https://github.com/thi-ng/umbrella/tree/develop/packages/date)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
- [@thi.ng/pixel-dither](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-dither)

## API

[Generated API docs](https://docs.thi.ng/umbrella/imago/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-imago,
  title = "@thi.ng/imago",
  author = "Karsten Schmidt",
  note = "https://thi.ng/imago",
  year = 2024
}
```

## License

&copy; 2024 Karsten Schmidt // Apache License 2.0
