# @thi.ng/geom

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/geom.svg)](https://www.npmjs.com/package/@thi.ng/geom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom.svg)
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

WIP (currently 2D only) geometry types & polymorphic operations, built on
[@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/master/packages/defmulti).

[**Up-to-date feature matrix spreadsheet**](https://docs.google.com/spreadsheets/d/1GxJm-zOQaGECui2MJUmy3gQPTF-T6BJ6vhNlUnPsmDs/edit?usp=sharing)

This package acts as a higher-level front end for the following related packages:

- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/master/packages/geom-api) - shared types & interfaces
- [@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/master/packages/geom-accel) - spatial indexing data structures
- [@thi.ng/geom-arc](https://github.com/thi-ng/umbrella/tree/master/packages/geom-arc) - elliptic arc utils
- [@thi.ng/geom-clip-convex](https://github.com/thi-ng/umbrella/tree/master/packages/geom-clip-convex) - Sutherland-Hodgeman / Liang-Barsky clipping
- [@thi.ng/geom-closest-point](https://github.com/thi-ng/umbrella/tree/master/packages/geom-closest-point) - line-point proximity queries
- [@thi.ng/geom-isec](https://github.com/thi-ng/umbrella/tree/master/packages/geom-isec) - shape intersection tests
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/master/packages/geom-poly-utils) - 2D polygon helpers
- [@thi.ng/geom-resample](https://github.com/thi-ng/umbrella/tree/master/packages/geom-resample) - nD polyline resampling
- [@thi.ng/geom-splines](https://github.com/thi-ng/umbrella/tree/master/packages/geom-splines) - nD cubic / quadratic spline utils
- [@thi.ng/geom-subdiv-curve](https://github.com/thi-ng/umbrella/tree/master/packages/geom-subdiv-curve) - nD subdivision curve utils
- [@thi.ng/geom-tessellate](https://github.com/thi-ng/umbrella/tree/master/packages/geom-tessellate) - nD convex polygon tessellators

## Installation

```bash
yarn add @thi.ng/geom
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/master/packages/compose)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/master/packages/defmulti)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup)
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup-svg)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/master/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

```ts
import * as g from "@thi.ng/geom";
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
