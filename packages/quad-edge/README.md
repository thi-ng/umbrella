<!-- This file is generated - DO NOT EDIT! -->

# ![quad-edge](https://media.thi.ng/umbrella/banners/thing-quad-edge.svg?6d78bc1a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/quad-edge.svg)](https://www.npmjs.com/package/@thi.ng/quad-edge)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/quad-edge.svg)
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

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bquad-edge%5D+in%3Atitle)

### Related packages

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

```text
# with flag only for < v16
node --experimental-repl-await

> const quadEdge = await import("@thi.ng/quad-edge");
```

Package sizes (gzipped, pre-treeshake): ESM: 522 bytes

## Dependencies

- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/quad-edge/)

TODO

## Authors

Karsten Schmidt

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

&copy; 2015 - 2022 Karsten Schmidt // Apache Software License 2.0
