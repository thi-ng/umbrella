<!-- This file is generated - DO NOT EDIT! -->

# ![geom-clip-poly](https://media.thi.ng/umbrella/banners-20220914/thing-geom-clip-poly.svg?28898564)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-clip-poly.svg)](https://www.npmjs.com/package/@thi.ng/geom-clip-poly)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-clip-poly.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

2D polygon clipping / offsetting (Sutherland-Hodgeman, Grainer-Hormann). This is a support package for [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom).

Current implementations are based on [toxiclibs](http://toxiclibs.org)
(Java) and Clojure versions [thi.ng/geom-clj](http://thi.ng/geom-clj).

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-clip-poly%5D+in%3Atitle)

### Related packages

- [@thi.ng/geom-clip-line](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-line) - 2D line clipping (Liang-Barsky)

## Installation

```bash
yarn add @thi.ng/geom-clip-poly
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-clip-poly"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const geomClipPoly = await import("@thi.ng/geom-clip-poly");
```

Package sizes (gzipped, pre-treeshake): ESM: 347 bytes

## Dependencies

- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isec)
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-poly-utils)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-clip-poly/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-clip-poly,
  title = "@thi.ng/geom-clip-poly",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-clip-poly",
  year = 2013
}
```

## License

&copy; 2013 - 2022 Karsten Schmidt // Apache Software License 2.0
