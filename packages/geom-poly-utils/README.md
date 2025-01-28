<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/geom-poly-utils](https://media.thi.ng/umbrella/banners-20230807/thing-geom-poly-utils.svg?fdf24370)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-poly-utils.svg)](https://www.npmjs.com/package/@thi.ng/geom-poly-utils)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-poly-utils.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 201 standalone projects, maintained as part
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

2D polygon/polyline analysis & processing utilities. This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

- signed 2D polygon & triangle area
- triangle barycentric coord conversion
- nD point cloud bounding box
- 2D poly center of weight
- nD point cloud centroid
- 2D circumcenter
- 2D polygon convexity classification
- 2D equilateral triangle
- polygon / polyline perimeter

Current implementations partially based on
[toxiclibs](http://toxiclibs.org) (Java) and Clojure version of
[thi.ng/geom](http://thi.ng/geom).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-poly-utils%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/geom-poly-utils
```

ESM import:

```ts
import * as gpu from "@thi.ng/geom-poly-utils";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/geom-poly-utils"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const gpu = await import("@thi.ng/geom-poly-utils");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.63 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-poly-utils/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-poly-utils,
  title = "@thi.ng/geom-poly-utils",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-poly-utils",
  year = 2013
}
```

## License

&copy; 2013 - 2025 Karsten Schmidt // Apache License 2.0
