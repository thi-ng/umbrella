<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-closest-point](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-geom-closest-point.svg?34494e76)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-closest-point.svg)](https://www.npmjs.com/package/@thi.ng/geom-closest-point)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-closest-point.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

2D / 3D closest point / proximity helpers. This is a support package for [@thi.ng/geom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom).

Current implementations partially based on
[toxiclibs](http://toxiclibs.org) (Java) and Clojure version of
[thi.ng/geom](http://thi.ng/geom).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bgeom-closest-point%5D)

## Related packages

- [@thi.ng/geom-isec](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-isec) - 2D/3D shape intersection checks
- [@thi.ng/geom-resample](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom-resample) - Customizable nD polyline interpolation, re-sampling, splitting & nearest point computation

## Installation

```bash
yarn add @thi.ng/geom-closest-point
```

ESM import:

```ts
import * as gcp from "@thi.ng/geom-closest-point";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-closest-point"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const gcp = await import("@thi.ng/geom-closest-point");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.08 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/math](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/math)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory is using this package:

| Screenshot                                                                                                                       | Description                                             | Live demo                                               | Source                                                                                       |
|:---------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|:--------------------------------------------------------|:---------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/ellipse-proximity.png" width="240"/> | Interactive visualization of closest points on ellipses | [Demo](https://demo.thi.ng/umbrella/ellipse-proximity/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/ellipse-proximity) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-closest-point/)

- `closestPointAABB`
- `closestPointArray`
- `closestPointCircle`
- `closestPointLine`
- `closestPointPlane`
- `closestPointPolyline`
- `closestPointRect`
- `closestPointSphere`
- `closestPointSegment`
- `closestT`
- `distToLine`
- `distToSegment`

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-closest-point,
  title = "@thi.ng/geom-closest-point",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-closest-point",
  year = 2018
}
```

## License

&copy; 2018 - 2026 Karsten Schmidt // Apache License 2.0
