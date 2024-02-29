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

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

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

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

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
	resize,
	rotate,
} from "@thi.ng/imago";
import { ConsoleLogger } from "@thi.ng/logger";

const res = await processImage(
	// input image (can also be a typed array or buffer)
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
			],
		}),
		// nested operations each operate on a clone of the current (already
		// semi-transformed) image, they have no impact on the processing pipeline
		// of their parent(s)
		// multiple child pipelines can be spawned, here only a single one
		nest({
			procs: [
				// this pipeline only creates blurhash (stored in `outputs` of result)
				[resize({ size: 100 }), output({ id: "hash", blurhash: 5 })],
			],
		}),
		// crop to 3:2 aspect ratio
		crop({ size: 100, aspect: 1.5, unit: "%" }),
		// back in the main pipleline, add 5% white border (based on smallest side)
		extend({ border: 5, unit: "%", bg: "white", ref: "min" }),
		// resize image to 1920 wide
		resize({ size: 1920 }),
		// add logo watermark centered horizontally and near the bottom
		composite({
			layers: [
				imageLayer({
					path: "logo-128.png",
					unit: "%",
					origin: "s",
					pos: { r: 50, b: 5 },
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
//   main: "...../20240229-1920-frame.jpg",
//   hash: "eQEBz9}]0{5Pxat9n,WnRkWVR%Rks:xHoLoMoMf$R%WUjJxHt5I.I:",
// }
```

<!-- include ../../assets/tpl/footer.md -->
