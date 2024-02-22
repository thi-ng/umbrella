<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

Auto-rotate, rotate and/or mirror image

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

TODO

<!-- include ../../assets/tpl/footer.md -->
