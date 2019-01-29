# @thi.ng/quad-edge

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/quad-edge.svg)](https://www.npmjs.com/package/@thi.ng/quad-edge)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/quad-edge.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Quad-edge data structure after Guibas & Stolfi: _Primitives for the
manipulation of general subdivisions and the computation of Voronoi
diagrams, ACM Transactions on Graphics, 4, 1985, p.75-123_

See the related
[@thi.ng/geom-voronoi](https://github.com/thi-ng/umbrella/tree/master/packages/geom-voronoi)
package for concrete usage. This package merely provides the underlying
graph data structure.

Reference:

- http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/quadedge.html
- https://github.com/thi-ng/c-thing/blob/master/src/geom/quadedge.h

## Installation

```bash
yarn add @thi.ng/quad-edge
```

## Dependencies

- None

## Usage examples

```ts
import { Edge } from "@thi.ng/quad-edge";
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
