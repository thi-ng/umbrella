<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

<!-- include ../../assets/tpl/footer.md -->
