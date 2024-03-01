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
    - [Bitmap image layers](#bitmap-image-layers)
    - [Color layers](#color-layers)
    - [SVG layers](#svg-layers)
    - [Text layers](#text-layers)
  - [crop](#crop)
  - [dither](#dither)
  - [exif](#exif)
  - [extend](#extend)
  - [gamma](#gamma)
  - [grayscale](#grayscale)
  - [hsbl](#hsbl)
  - [nest](#nest)
  - [output](#output)
    - [Templated output paths](#templated-output-paths)
  - [resize](#resize)
  - [rotate](#rotate)
- [Status](#status)
- [Positions & sizes](#positions--sizes)
  - [Gravity](#gravity)
- [Metadata handling](#metadata-handling)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Multistage processing pipeline](#multistage-processing-pipeline)
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

Transformation trees/pipelines are simple JSON objects (but can be
programmatically created):

The following pipeline performs these steps (in sequence):

- auto-rotate image (using EXIF orientation info, if available)
- add 5% white border (size relative to shortest side)
- proportionally resize image to 1920px (longest side by default)
- overlay bitmap logo layer, positioned at 45% left / 5% bottom
- add custom EXIF metadata
- output this current stage as high quality AVIF (and record expanded output
  path)
- crop center square region
- output as JPEG thumbnail (and record in outputs)
- compute
  [blurhash](https://github.com/thi-ng/umbrella/blob/develop/packages/blurhash)
  (and record in outputs)

```json tangle:export/readme-example1.json
[
    { "op": "rotate" },
    { "op": "extend", "border": 5, "unit": "%", "ref": "min", "bg": "#fff" },
    { "op": "resize", "size": 1920 },
    {
        "op": "composite",
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
        "op": "exif",
        "tags": {
            "IFD0": {
                "Copyright": "Karsten Schmidt",
                "Software": "@thi.ng/imago"
            }
        }
    },
    {
        "op": "output",
        "id": "hires",
        "path": "{name}-{sha256}-{w}x{h}.avif",
        "avif": { "quality": 80 }
    },
    { "op": "crop", "size": [240, 240], "gravity": "c" },
    { "op": "output", "id": "thumb", "path": "{name}-thumb.jpg" },
    { "op": "output", "id": "hash", "path": "", blurhash: 4 }
]
```

Then to process an image using above JSON spec (there're also API wrappers to
create these operator specs programmatically):

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

Compositing multiple layers. The following layer types are available, and custom
layer types can be registered via the polymorphic
[`defLayer()`](https://docs.thi.ng/umbrella/imago/functions/defLayer.html)
function.

#### Common options

- blend mode
- position & origin
- gravity
- tiled repetition

#### Bitmap image layers

- resizable

#### Color layers

- size
- fill color (w/ alpha)

#### SVG layers

- from file or inline doc

#### Text layers

- optional background color (alpha supported)
- text color
- horizontal/vertical text align
- font family & size
- constrained to text box

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

Set custom EXIF metadata (can be given multiple times, will be merged)

### extend

Add pixels on all sides of the image

- supports px or percent units
- proportional to a given reference side/size
- can be individually configured per side

### gamma

Perform gamma correction (forward or reverse)

### grayscale

Grayscale conversion

### hsbl

Hue, saturation, brightness and lightness adjustments

### nest

Performing nested branches/pipelines of operations with no effect on image state
of current/parent pipeline...

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

Alternatively, a
[blurhash](https://github.com/thi-ng/umbrella/blob/develop/packages/blurhash) of
the image can be computed and stored in the outputs. In this case, no file will
be written.

#### Templated output paths

Output paths can contain `{id}`-templated parts which will be replaced/expanded.
The following built-in IDs are supported and custom IDs will be looked up via
the
[pathParts](https://docs.thi.ng/umbrella/imago/interfaces/ImgProcOpts.html#pathParts)
options provided to
[processImage()](https://docs.thi.ng/umbrella/imago/functions/processImage.html).
Any others will remain as is. Custom IDs take precedence over built-in ones.

- `name`: original base filename (w/o ext)
- `sha1`/`sha224`/`sha256`/`sha384`/`sha512`: truncated hash of output (8 chars)
- `w`: current image width
- `h`: current image height
- `aspect`: "p" (portrait), "l" (landscape) or "sq" (square)
- `date`: yyyyMMdd date format, e.g. 20240223
- `time`: HHmmss time format, e.g. 234459
- `year`: 4-digit year
- `month`: 2-digit month
- `week`: 2-digit week
- `day`: 2-digit day in month
- `hour`: 2-digit hour (24h system)
- `minute`: 2-digit minute
- `second`: 2-digit second

Output paths can contain sub-directories which will be automatically created
(relative to the [configured output
dir](https://docs.thi.ng/umbrella/imago/interfaces/ImgProcOpts.html#outDir)).
For example, the path template `{year}/{month}/{day}/{name}-{sha1}.jpg` might
get replaced to: `2024/02/22/test-123cafe4.jpg`...

### resize

Resizing image

- gravity or position
- fit modes
- supports px or percent units
- proportional to a given reference side/size

### rotate

Auto-rotate, rotate by angle and/or flip image along x/y

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bimago%5D+in%3Atitle)

## Positions & sizes

Border sizes, general dimensions, and positions can be specified in pixels
(default) or as percentages (using `unit: "%"`). For the latter case, an
additional reference side (`ref` option) can be provided. The default ref is
`min`, referring to whatever is the smaller side of an image.

The `ref` option/reference side can take the following values (default: `both`):

- `both`: image width for horizontal uses, image height for vertical uses
- `min`: smaller side of an image (aka `min(width,height)`)
- `max`: larger side of an image (aka `min(width,height)`)
- `w`: image width
- `h`: image height

### Gravity

In some operations positioning or alignment can be abstractly stated via one of
the following gravity values:

![diagram of the 9 possible gravity directions](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imago/gravity.png)

## Metadata handling

By default all input metadata will be lost in the outputs. The `keepEXIF` and
`keepICC` options can be used to retain EXIF and/or ICC profile information
(only if also supported in the output format).

**Important:** Retaining EXIF and merging it with [custom additions](#exif) is
still WIP...

## Installation

```bash
yarn add @thi.ng/imago
```

For Node.js REPL:

```js
const imago = await import("@thi.ng/imago");
```

Package sizes (brotli'd, pre-treeshake): ESM: 4.81 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/blurhash](https://github.com/thi-ng/umbrella/tree/develop/packages/blurhash)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/date](https://github.com/thi-ng/umbrella/tree/develop/packages/date)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
- [@thi.ng/pixel-dither](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-dither)
- [@thi.ng/prefixes](https://github.com/thi-ng/umbrella/tree/develop/packages/prefixes)
- [sharp](https://sharp.pixelplumbing.com)

## API

[Generated API docs](https://docs.thi.ng/umbrella/imago/)

### Multistage processing pipeline

```ts tangle:export/readme-api.ts
import {
    colorLayer,
    composite,
    crop,
    extend,
    imageLayer,
    nest,
    output,
    processImage,
    rawLayer,
    resize,
    rotate,
} from "@thi.ng/imago";
import { ConsoleLogger } from "@thi.ng/logger";

const res = await processImage(
    "test.jpg",
    // operator pipeline
    [
        // auto-rotate (EXIF orientation)
        rotate({}),
        // composite w/ semi-transparent color layer (screen)
        composite({
            layers: [
                colorLayer({
                    // magenta with 50% opacity
                    bg: "#f0f8",
                    blend: "screen",
                    // layer size is 50x100% of image
                    size: [50, 100],
                    // aligned left (west)
                    gravity: "w",
                    // size given in percent
                    unit: "%",
                }),
                // diagonal hairline pattern overlay (with tiling) from raw
                // pixel data in ABGR format, i.e. 0xAABBGGRR
                rawLayer({
                    // prettier-ignore
                    buffer: new Uint32Array([
                        0x00000000, 0x00000000, 0x00000000, 0x80ffffff,
                        0x00000000, 0x00000000, 0x80ffffff, 0x00000000,
                        0x00000000, 0x80ffffff, 0x00000000, 0x00000000,
                        0x80ffffff, 0x00000000, 0x00000000, 0x00000000,
                    ]),
                    channels: 4,
                    size: [4, 4],
                    tile: true,
                }),
            ],
        }),
        // nested operations each operate on a clone of the current (already
        // semi-transformed) image, they have no impact on the processing pipeline
        // of their parent(s)
        // multiple child pipelines can be spawned, here only a single one
        nest({
            procs: [
                // this pipeline only creates blurhash (stored in `outputs` of result)
                [resize({ size: 100 }), output({ id: "hash", blurhash: true })],
            ],
        }),
        // crop to 3:2 aspect ratio (always based on longest side)
        crop({ size: 100, aspect: 3 / 2, unit: "%" }),
        // back in the main pipleline, add 5% white border (based on smallest side)
        extend({ border: 5, unit: "%", bg: "white", ref: "min" }),
        // resize image to 1920 (largest side)
        resize({ size: 1920 }),
        // add logo watermark centered horizontally and near the bottom
        composite({
            layers: [
                imageLayer({
                    path: "logo-128.png",
                    unit: "%",
                    origin: "s",
                    pos: { l: 50, b: 5 },
                    ref: "both",
                    blend: "screen",
                }),
            ],
        }),
        output({ id: "main", path: "{date}-1920-frame.jpg" }),
    ],
    {
        logger: new ConsoleLogger("img"),
    }
);

console.log(res.outputs);
// {
//   hash: "UVKmR.^SIVR$_NRiM{jupLRjjEWC%goxofoM",
//   main: "...../20240301-144948-1920-frame.jpg",
// }
```

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
