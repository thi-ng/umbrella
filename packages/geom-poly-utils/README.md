<!-- This file is generated - DO NOT EDIT! -->

# ![geom-poly-utils](https://media.thi.ng/umbrella/banners/thing-geom-poly-utils.svg?65a90bef)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-poly-utils.svg)](https://www.npmjs.com/package/@thi.ng/geom-poly-utils)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-poly-utils.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

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

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-poly-utils%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/geom-poly-utils
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-poly-utils"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const geomPolyUtils = await import("@thi.ng/geom-poly-utils");
```

Package sizes (gzipped, pre-treeshake): ESM: 2.15 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-poly-utils/)

TODO

## Authors

Karsten Schmidt

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

&copy; 2013 - 2022 Karsten Schmidt // Apache Software License 2.0
