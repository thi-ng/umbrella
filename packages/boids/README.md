<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/boids](https://media.thi.ng/umbrella/banners-20230807/thing-boids.svg?783d6098)

[![npm version](https://img.shields.io/npm/v/@thi.ng/boids.svg)](https://www.npmjs.com/package/@thi.ng/boids)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/boids.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Available behaviors](#available-behaviors)
  - [Acceleration structures](#acceleration-structures)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

n-dimensional boids simulation with modular behavior system.

The API of this package is still unstable, but the underlying implementations
have been used in many of the author's projects since ~2005... The agent/boid
behaviors are fully modular and can be highly customized via the given
parameters (which can also be dynamically/spatially adjusted). As with other
thi.ng packages, the visual representation of the boids is entirely separate and
out of scope of this package. This package only deals with the simulation of
agents, their behavioral aspects and essentially only processes points in space
(and their directions, forces)...

### Available behaviors

The following behavior building blocks are provided. All of them can be freely
combined (incl. multiple instances with different configurations) and assigned
to individual boids (or groups of them). Each behavior also has an associated
weight to adjust its impact on the overall movement of the boids (also
dynamically adjustable).

- [`alignment()`](https://docs.thi.ng/umbrella/boids/functions/alignment.html):
  Steer towards the average direction of neighbors within given radius
- [`attractPolyline()`](https://docs.thi.ng/umbrella/boids/functions/attractPolyline.html):
  Steer towards the nearest point on a pre-configured polyline (or polygon)
- [`braitenberg2()`](https://docs.thi.ng/umbrella/boids/functions/braitenberg2.html):
  Field-based 3-sensor (left/right/center) Braitenberg vehicle steering
- [`cohesion()`](https://docs.thi.ng/umbrella/boids/functions/cohesion.html):
  Steer towards the centroid of neighbors within given radius
- [`dynamicTarget()`](https://docs.thi.ng/umbrella/boids/functions/dynamicTarget.html):
  Steer towards user defined (dynamically changeable) location(s)
- [`followPolyline()`](https://docs.thi.ng/umbrella/boids/functions/followPolyline.html):
  Steer towards the following/next point on a pre-configured polyline (or
  polygon)
- [`separation()`](https://docs.thi.ng/umbrella/boids/functions/separation.html):
  Steer away from neighbors within given radius

### Acceleration structures

Intended for behaviors requiring neighbor lookups, the package defines &
utilizes the [`IBoidAccel`
interface](https://docs.thi.ng/umbrella/boids/interfaces/IBoidAccel.html). It's
recommended to use a compatible spatial acceleration structure such as
[`HashGrid2` or
`HashGrid3`](https://docs.thi.ng/umbrella/geom-accel/classes/HashGrid2.html#queryNeighborhood)
from the [@thi.ng/geom-accel
package](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel).
For cases where this isn't needed, the
[`noAccel`](https://docs.thi.ng/umbrella/boids/functions/noAccel.html) dummy
implementation of this interface can be used... In all cases, an acceleration
structure has to be provided to the boid ctor and factory functions
[`defBoid2()`](https://docs.thi.ng/umbrella/boids/functions/defBoid2.html) /
[`defBoid3()`](https://docs.thi.ng/umbrella/boids/functions/defBoid3.html).

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bboids%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/boids
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/boids"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const boids = await import("@thi.ng/boids");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.92 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/distance](https://github.com/thi-ng/umbrella/tree/develop/packages/distance)
- [@thi.ng/geom-closest-point](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-closest-point)
- [@thi.ng/geom-resample](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-resample)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/timestep](https://github.com/thi-ng/umbrella/tree/develop/packages/timestep)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                         | Description                                                    | Live demo                                         | Source                                                                         |
|:-------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------|:--------------------------------------------------|:-------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/boid-basics.png" width="240"/> | Basic 2D boid simulation and spatial indexing neighbor lookups | [Demo](https://demo.thi.ng/umbrella/boid-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/boid-basics) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/boids/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-boids,
  title = "@thi.ng/boids",
  author = "Karsten Schmidt",
  note = "https://thi.ng/boids",
  year = 2023
}
```

## License

&copy; 2023 - 2024 Karsten Schmidt // Apache License 2.0
