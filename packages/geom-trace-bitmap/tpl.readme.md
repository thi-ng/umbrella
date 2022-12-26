<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package provides an extensible setup to extract user selectable
single-pixel width line segments in horizontal, vertical and diagonal (45°)
directions and/or single pixels 2d point cloud. The main
[`traceBitmap()`](https://docs.thi.ng/umbrella/geom-trace-bitmap/functions/traceBitmap.html)
function supports a predicate function to filter qualifying pixel values,
options to control which line orientations should be considered (incl. providing
custom ones and in which order of application), as well as a 2x3 matrix to
transform extracted points (pixel coordinates). See
[`TraceBitmapOpts`](https://docs.thi.ng/umbrella/geom-trace-bitma/interfaces/TraceBitmapOpts.html)
and example below for details.

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
    dir: ["h", "v", "d", "p"]
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

<!-- include ../../assets/tpl/footer.md -->
