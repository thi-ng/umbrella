<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

![Pseudo-3D DEM visualization using hidden lines](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel-io-geotiff/20230109-n45w121-crop-1280.jpg)

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

```ts
import { GRAY16 } from "@thi.ng/pixel";
import { readGeoTiff } from "@thi.ng/pixel-io-geotiff";
import { asPGM16 } from "@thi.ng/pixel-io-netpbm";
import { readFileSync } from "fs";

// load GeoTIFF image and convert to thi.ng/pixel floatBuffer
// the result image uses a custom pixel format (FLOAT_GRAY_RANGE, with [min..max]
// set to the analyzed value range found in the source image raster...)
const result = await readGeoTiff(readFileSync("USGS_1_n37w119_20211004.tif"));
// { img: FloatBuffer { size: [ 3612, 3612 ], ... }, tiff: { ... } }

// convert to 16bit PGM
writeFileSync("n37w119.pgm", asPGM16(result.img.as(GRAY16)));

// the result also contains the original TIFF image
// (see 3rd party geotiff package for more details)
result.tiff.getGDALMetadata(0);
// {
//   LAYER_TYPE: '*',
//   RepresentationType: '*',
//   STATISTICS_MAXIMUM: '4412.8549804688',
//   STATISTICS_MEAN: '2114.5010480446',
//   STATISTICS_MINIMUM: '140.41374206543',
//   STATISTICS_STDDEV: '918.91201914189',
//   STATISTICS_VALID_PERCENT: '100'
// }
```

<!-- include ../../assets/tpl/footer.md -->
