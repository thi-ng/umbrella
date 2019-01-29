# @thi.ng/geom-voronoi

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/geom-voronoi.svg)](https://www.npmjs.com/package/@thi.ng/geom-voronoi)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-voronoi.svg)
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

Fast, incremental 2D Delaunay & Voronoi mesh implementation, based on
[@thi.ng/quad-edge](https://github.com/thi-ng/umbrella/tree/master/packages/quad-edge)
data structure after Guibas & Stolfi and partially ported from C++
versions by Dani Lischinski, Paul Heckbert et al:

References:

- http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/quadedge.html
- http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/lischinski/114.ps

Construction speed: 20k random points ([poisson disc samples, even
distribution](https://github.com/thi-ng/umbrella/tree/master/packages/poisson))
in ~850ms (Chrome 72, MBP 2016)

## Installation

```bash
yarn add @thi.ng/geom-voronoi
```

## Dependencies

- TODO...

## Usage examples

```ts
import { DVMesh } from "@thi.ng/geom-voronoi";
```

## Authors

- Karsten Schmidt

## License

&copy; 2016 Karsten Schmidt // Apache Software License 2.0
