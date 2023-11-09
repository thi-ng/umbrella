<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/quad-edge](https://media.thi.ng/umbrella/banners-20230807/thing-quad-edge.svg?0079fd4c)

[![npm version](https://img.shields.io/npm/v/@thi.ng/quad-edge.svg)](https://www.npmjs.com/package/@thi.ng/quad-edge)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/quad-edge.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Quadedge data structure after Guibas & Stolfi.

See the related
[@thi.ng/geom-voronoi](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-voronoi)
package for concrete usage. This package merely provides the underlying
graph data structure.

Reference:

- http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/quadedge.html
- https://github.com/thi-ng/c-thing/blob/develop/src/geom/quadedge.h
- Guibas & Stolfi: _Primitives for the manipulation of general
  subdivisions and the computation of Voronoi diagrams, ACM Transactions
  on Graphics, 4, 1985, p.75-123_

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bquad-edge%5D+in%3Atitle)

## Related packages

- [@thi.ng/geom-voronoi](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-voronoi) - Fast, incremental 2D Delaunay & Voronoi mesh implementation

## Installation

```bash
yarn add @thi.ng/quad-edge
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/quad-edge"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const quadEdge = await import("@thi.ng/quad-edge");
```

Package sizes (brotli'd, pre-treeshake): ESM: 559 bytes

## Dependencies

- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/quad-edge/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-quad-edge,
  title = "@thi.ng/quad-edge",
  author = "Karsten Schmidt",
  note = "https://thi.ng/quad-edge",
  year = 2015
}
```

## License

&copy; 2015 - 2023 Karsten Schmidt // Apache License 2.0
