<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/distance-transform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-distance-transform.svg?03e53129)

[![npm version](https://img.shields.io/npm/v/@thi.ng/distance-transform.svg)](https://www.npmjs.com/package/@thi.ng/distance-transform)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/distance-transform.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Binary image to Distance Field transformation.

![example distance field comparison for three different
metrics](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/distance-transform/dt.png)

This package provides a function to transform a binary(-like) input grid/image
into a distance field using a provided distance metric (default: Eucledian). Any
non-zero values in the input grid are used as seed locations for the distance
field. The function returns a plain `Float32Array` of distance values. If
`normalize` is > 0 (default: 1). The result values will be normalized to the
`[0,normalize]` interval.

Based on: ["A general algorithm for computing Distance Transforms in linear
time"](http://www.cs.rug.nl/~roe/publications/dt.pdf), A. Meijster, J.B.T.M.
Roerdink and W.H. Hesselink

![3d visualization](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/distance-transform/dt3d.png)

Example of distance maps being utilized for 3D surface detailing.<br/>
Image credits: (c) 2017 Karsten Schmidt

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdistance-transform%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/distance-transform
```

ESM import:

```ts
import * as dt from "@thi.ng/distance-transform";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/distance-transform"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const dt = await import("@thi.ng/distance-transform");
```

Package sizes (brotli'd, pre-treeshake): ESM: 635 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/distance-transform/)

This small example uses functionality from the
[@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
and
[@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
packages...

```ts
import { pixelCanvas2d } from "@thi.ng/canvas";
import { distanceTransform } from "@thi.ng/distance-transform";
import { floatBuffer, intBuffer, GRAY8, FLOAT_GRAY } from "@thi.ng/pixel";
import { SYSTEM } from "@thi.ng/random";

// create image with 100 random pixels set
const img = intBuffer(256, 256, GRAY8);
for(let i = 0; i < 100; i++) {
  img.setAt(SYSTEM.int() % img.width, SYSTEM.int() % img.height, 255);
}

// compute distance field (aka voronoi)
const dt = distanceTransform(img, EUCLEDIAN);

// wrap as float pixel buffer
const dtImg = floatBuffer(img.width, img.height, FLOAT_GRAY, dt);

// ...and display (browser only)
const { canvas } = pixelCanvas2d(img.width, img.height, document.body);
dtImg.blitCanvas(canvas);
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-distance-transform,
  title = "@thi.ng/distance-transform",
  author = "Karsten Schmidt",
  note = "https://thi.ng/distance-transform",
  year = 2021
}
```

## License

&copy; 2021 - 2025 Karsten Schmidt // Apache License 2.0
