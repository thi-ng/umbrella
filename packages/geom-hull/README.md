<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/geom-hull](https://media.thi.ng/umbrella/banners-20230807/thing-geom-hull.svg?430a47e9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-hull.svg)](https://www.npmjs.com/package/@thi.ng/geom-hull)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-hull.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This is a standalone project, maintained as part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and
anti-framework.

> [!NOTE]
> 🚀 Help me to work full-time on these projects by [sponsoring me on GitHub](https://github.com/sponsors/postspectacular) ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Fast 2D convex hull (Graham Scan). This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

Current implementation is partially based on Clojure version of
[thi.ng/geom](http://thi.ng/geom).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-hull%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/geom-hull
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-hull"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const geomHull = await import("@thi.ng/geom-hull");
```

Package sizes (brotli'd, pre-treeshake): ESM: 414 bytes

## Dependencies

- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                              | Description                                 | Live demo                                              | Source                                                                              |
|:------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-convex-hull.png" width="240"/> | Convex hull & shape clipping of 2D polygons | [Demo](https://demo.thi.ng/umbrella/geom-convex-hull/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-convex-hull) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-hull/)

```ts
import { grahamScan2 } from "@thi.ng/geom-hull";

grahamScan2([[0, 0], [50, 10], [100, 0], [80, 50], [100, 100], [50, 90], [0, 100]]);
// [ [ 0, 0 ], [ 100, 0 ], [ 100, 100 ], [ 0, 100 ] ]
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-hull,
  title = "@thi.ng/geom-hull",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-hull",
  year = 2013
}
```

## License

&copy; 2013 - 2024 Karsten Schmidt // Apache License 2.0
