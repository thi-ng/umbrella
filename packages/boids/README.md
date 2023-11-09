<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/boids](https://media.thi.ng/umbrella/banners-20230807/thing-boids.svg?783d6098)

[![npm version](https://img.shields.io/npm/v/@thi.ng/boids.svg)](https://www.npmjs.com/package/@thi.ng/boids)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/boids.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

n-dimensional boids simulation with highly configurable behaviors.

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

Package sizes (brotli'd, pre-treeshake): ESM: 1.14 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/distance](https://github.com/thi-ng/umbrella/tree/develop/packages/distance)
- [@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel)
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

&copy; 2023 Karsten Schmidt // Apache License 2.0
