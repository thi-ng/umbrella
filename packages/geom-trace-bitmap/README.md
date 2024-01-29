<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/geom-trace-bitmap](https://media.thi.ng/umbrella/banners-20230807/thing-geom-trace-bitmap.svg?f80a6c2d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-trace-bitmap.svg)](https://www.npmjs.com/package/@thi.ng/geom-trace-bitmap)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-trace-bitmap.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic usage](#basic-usage)
- [Authors](#authors)
- [License](#license)

## About

Bitmap image to hairline vector and point cloud conversions. This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

This package provides an extensible setup to extract user selectable
single-pixel width line segments in horizontal, vertical and diagonal (45°)
directions and/or single pixels as 2d point cloud. The main
[`traceBitmap()`](https://docs.thi.ng/umbrella/geom-trace-bitmap/functions/traceBitmap.html)
function supports a predicate function to filter qualifying pixel values,
options to control which line orientations should be considered (incl. providing
custom ones and in which order of application), as well as a 2x3 matrix to
transform extracted points (pixel coordinates). See
[`TraceBitmapOpts`](https://docs.thi.ng/umbrella/geom-trace-bitmap/interfaces/TraceBitmapOpts.html)
and example below for details.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-trace-bitmap%5D+in%3Atitle)

## Related packages

- [@thi.ng/geom-axidraw](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-axidraw) - Conversion and preparation of thi.ng/geom shapes & shape groups to/from AxiDraw pen plotter draw commands
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel) - Typedarray integer & float pixel buffers w/ customizable formats, blitting, drawing, convolution

## Installation

```bash
yarn add @thi.ng/geom-trace-bitmap
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-trace-bitmap"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const geomTraceBitmap = await import("@thi.ng/geom-trace-bitmap");
```

Package sizes (brotli'd, pre-treeshake): ESM: 991 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/grid-iterators](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/develop/packages/matrices)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                          | Description                                            | Live demo                                          | Source                                                                          |
|:--------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------|:---------------------------------------------------|:--------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/> | Multi-layer vectorization & dithering of bitmap images | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-trace-bitmap/)

TODO

### Basic usage

For brevity, this example uses
[thi.ng/pixel-io-netpbm](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-io-netpbm)
to load an image in PGM format. For that image format,  the `read()` function
returns a [thi.ng/pixel
IntBuffer](https://docs.thi.ng/umbrella/pixel/classes/IntBuffer.html) using the
[`GRAY8`](https://docs.thi.ng/umbrella/pixel/index.html#integer-pixel-formats)
pixel format...

```ts tangle:export/readme.ts
import { asSvg, group, line, points, svgDoc } from "@thi.ng/geom";
import { traceBitmap } from "@thi.ng/geom-trace-bitmap";
import { read } from "@thi.ng/pixel-io-netpbm";
import { readFileSync, writeFileSync } from "fs";

// vectorize bitmap, the returned arrays contain:
// - pairs of vectors (line segments)
// - vectors (points)
const { lines, points: dots } =  traceBitmap({
    // source image (WILL be mutated!)
    img: read(readFileSync("foo.pgm")),
    // pixel selection predicate (here to select all bright pixels)
    select: (x) => x > 128,
    // process horizontals, verticals, diagonals & points (default)
    // see: https://docs.thi.ng/umbrella/geom-trace-bitmap/types/TraceDir.html
    dir: ["h", "v", "d1", "d2", "p"]
});

// write extracted geometry as SVG file
writeFileSync(
    "export/trace.svg",
    asSvg(
        svgDoc(
            {},
            group({}, lines.map(([a,b]) => line(a, b))),
            points(dots, { fill: "#000", stroke: "none" })
        )
    )
);
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-trace-bitmap,
  title = "@thi.ng/geom-trace-bitmap",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-trace-bitmap",
  year = 2022
}
```

## License

&copy; 2022 - 2024 Karsten Schmidt // Apache License 2.0
