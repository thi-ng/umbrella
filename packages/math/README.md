<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/math](https://media.thi.ng/umbrella/banners-20230807/thing-math.svg?9dfcf861)

[![npm version](https://img.shields.io/npm/v/@thi.ng/math.svg)](https://www.npmjs.com/package/@thi.ng/math)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/math.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

For the Clojure version, please visit: [thi.ng/math-clj](https://thi.ng/math-clj)

- [About](#about)
- [Status](#status)
  - [Breaking changes in v4.0.0](#breaking-changes-in-v400)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Assorted common math functions & utilities.

Partially ported from Clojure version
[thi.ng/math-clj](https://github.com/thi-ng/math),
[c.thi.ng](https://github.com/thi-ng/c-thing) and
[thi.ng/vexed-generation](https://github.com/thi-ng/vexed-generation).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bmath%5D+in%3Atitle)

### Breaking changes in v4.0.0

The introduction of several [standard libc math
functions](https://www.cplusplus.com/reference/cmath/) causes a behavior change
of the existing `fmod()` function...

- rename `fmod()` => `mod()` to align w/ GLSL counterpart
- add new `fmod()` w/ standard libc behavior (same as JS % op)
- add `remainder()` w/ standard libc behavior

## Installation

```bash
yarn add @thi.ng/math
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/math"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const math = await import("@thi.ng/math");
```

Package sizes (brotli'd, pre-treeshake): ESM: 4.70 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                   | Description                                                            | Live demo                                                   | Source                                                                                   |
|:-----------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------|:------------------------------------------------------------|:-----------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/boid-basics.png" width="240"/>           | Basic 2D boid simulation and spatial indexing neighbor lookups         | [Demo](https://demo.thi.ng/umbrella/boid-basics/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/boid-basics)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/crypto-chart.png" width="240"/>          | Basic crypto-currency candle chart with multiple moving averages plots | [Demo](https://demo.thi.ng/umbrella/crypto-chart/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/crypto-chart)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-particles.jpg" width="240"/> | 2D Bezier curve-guided particle system                                 | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-particles/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-particles) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-isoline.png" width="240"/>              | Animated sine plasma effect visualized using contour lines             | [Demo](https://demo.thi.ng/umbrella/iso-plasma/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/iso-plasma)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mandelbrot.jpg" width="240"/>            | Worker based, interactive Mandelbrot visualization                     | [Demo](https://demo.thi.ng/umbrella/mandelbrot/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mandelbrot)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-subdiv.jpg" width="240"/>           | Animated, iterative polygon subdivisions & visualization               | [Demo](https://demo.thi.ng/umbrella/poly-subdiv/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-subdiv)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ramp-synth.png" width="240"/>            | Unison wavetable synth with waveform editor                            | [Demo](https://demo.thi.ng/umbrella/ramp-synth/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ramp-synth)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph.png" width="240"/>            | 2D scenegraph & shape picking                                          | [Demo](https://demo.thi.ng/umbrella/scenegraph/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph-image.png" width="240"/>      | 2D scenegraph & image map based geometry manipulation                  | [Demo](https://demo.thi.ng/umbrella/scenegraph-image/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph-image)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-barchart.png" width="240"/>          | Simplistic SVG bar chart component                                     | [Demo](https://demo.thi.ng/umbrella/svg-barchart/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-barchart)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-resample.png" width="240"/>          | SVG path parsing & dynamic resampling                                  | [Demo](https://demo.thi.ng/umbrella/svg-resample/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-resample)          |

## API

[Generated API docs](https://docs.thi.ng/umbrella/math/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng) (Main author)
- [@nkint](https://github.com/nkint)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-math,
  title = "@thi.ng/math",
  author = "Karsten Schmidt and others",
  note = "https://thi.ng/math",
  year = 2013
}
```

## License

&copy; 2013 - 2024 Karsten Schmidt // Apache License 2.0
