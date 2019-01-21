# @thi.ng/poisson

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/poisson.svg)](https://www.npmjs.com/package/@thi.ng/poisson)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/poisson.svg)
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

TODO...

## Installation

```bash
yarn add @thi.ng/poisson
```

## Dependencies

- TODO...

## Usage examples

```ts
import { samplePoisson } from "@thi.ng/poisson";

import { asSvg, svgDoc, circle } from "@thi.ng/geom";
import { KdTree } from "@thi.ng/geom-accel";
import { fit01 } from "@thi.ng/math";
import { dist2, randMinMax2 } from "@thi.ng/vectors";

accel = new KdTree(2);

pts = samplePoisson({
	points: () => randMinMax2(null, [0, 0], [500, 500]),
	density: (p) => fit01(Math.pow(Math.max(dist2(p, [250, 250]) / 250, 0), 2), 2, 10),
	accel,
	iter: 5,
	max: 8000,
	quality: 500
});

mapAsCircle = (p) => circle(p, dist2(p, accel.selectKeys(p, 10, 40)[1]) / 2)

document.body.innerHTML = asSvg(svgDoc({ fill: "none", stroke: "red" }, ...pts.map(mapAsCircle)));
```

## Authors

- Karsten Schmidt

## License

&copy; 2016 - 2018 Karsten Schmidt // Apache Software License 2.0
