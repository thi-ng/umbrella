<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Spiritual successor of an eponymous, yet never fully published
CLojure/Java-based image processor from 2014...

In this new version all image I/O and processing is delegated to
[sharp](https://sharp.pixelplumbing.com) and
[@thi.ng/pixel](https://github.com/thi-ng/umbrella/blob/develop/packages/pixel).

### Basic example

Transformation trees/pipelines are simple JSON objects (but can be programmatically created):

The following pipeline performs the following steps:

- auto-rotate image (using EXIF orientation info)
- add 5% white border (size relative to shortest side)
- proportionally resize to 1920px (by default longest side)
- overlay logo, positioned at 45%/5% (left/bottom)
- output this stage as high quality AVIF
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
	{ "type": "output", "path": "image-1920.avif", "avif": { "quality": 80 } },
	{ "type": "crop", "size": [240, 240], "gravity": "c" },
	{ "type": "output", "path": "thumb.jpg" }
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

### Supported operations

TODO write docs

#### blur

Gaussian blur

#### composite

Compositing multiple layers

##### Common options

##### Bitmap layers

##### SVG layers

#### crop

#### dither

Supported dither modes (from [thi.ng/pixel-dither](https://github.com/thi-ng/umbrella/blob/develop/packages/pixel-dither)):

- "atkinson"
- "burkes"
- "column"
- "diffusion"
- "floyd"
- "jarvis"
- "row"
- "sierra"
- "stucki"

#### exif

Set EXIF metadata (must be given directly before [output](#output))

#### extend

Add pixels on all sides of the image

#### gamma

Perform gamma correction (forward or reverse)

#### grayscale

Grayscale conversion

#### hsbl

Hue, saturation, brightbness and lightness adjustments

#### nest

Nested branch/pipeline of operations with no effect on image state of
current/parent pipeline...

#### output

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

#### resize

Resize image, with gravity, fit modes, choice of size units

#### rotate

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
