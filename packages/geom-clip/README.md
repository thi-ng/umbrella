# @thi.ng/geom-clip

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/geom-clip.svg)](https://www.npmjs.com/package/@thi.ng/geom-clip)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-clip.svg)
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

2D line & convex polygon clipping (Liang-Barsky / Sutherland-Hodgeman)

## Installation

```bash
yarn add @thi.ng/geom-clip
```

## Dependencies

- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/master/packages/geom-isec)
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/master/packages/geom-poly-utils)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

```ts
import * as gc from "@thi.ng/geom-clip";
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
