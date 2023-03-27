<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/pixel-io-geotiff](https://media.thi.ng/umbrella/banners-20220914/thing-pixel-io-geotiff.svg?cf8538e7)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel-io-geotiff.svg)](https://www.npmjs.com/package/@thi.ng/pixel-io-geotiff)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel-io-geotiff.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

GeoTIFF reader support for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel).

![Pseudo-3D DEM visualization using hidden lines plot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel-io-geotiff/20230109-n45w121-crop-1280.jpg)

This package is only intended to simplify obtaining DEM (elevation) data and not
aimed at general
[GeoTIFF](http://docs.opengeospatial.org/is/19-008r4/19-008r4.html)
functionality. For the latter we recommend using the wrapped
[geotiff.js](https://geotiffjs.github.io/) package directly.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpixel-io-geotiff%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/pixel-io-geotiff
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/pixel-io-geotiff"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const pixelIoGeotiff = await import("@thi.ng/pixel-io-geotiff");
```

Package sizes (brotli'd, pre-treeshake): ESM: 399 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
- [geotiff](https://github.com/geotiffjs/geotiff.js)

## API

[Generated API docs](https://docs.thi.ng/umbrella/pixel-io-geotiff/)

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

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-pixel-io-geotiff,
  title = "@thi.ng/pixel-io-geotiff",
  author = "Karsten Schmidt",
  note = "https://thi.ng/pixel-io-geotiff",
  year = 2023
}
```

## License

&copy; 2023 Karsten Schmidt // Apache License 2.0
