<!-- This file is generated - DO NOT EDIT! -->

# ![math](https://media.thi.ng/umbrella/banners/thing-math.svg?4738af0a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/math.svg)](https://www.npmjs.com/package/@thi.ng/math)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/math.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

For the Clojure version, please visit: [thi.ng/math-clj](https://thi.ng/math-clj)

- [About](#about)
  - [Status](#status)
  - [Breaking changes in v4.0.0](#breaking-changes-in-v400)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
  - [Maintainer](#maintainer)
  - [Contributors](#contributors)
- [License](#license)

## About

Assorted common math functions & utilities.

Partially ported from Clojure version
[thi.ng/math-clj](https://github.com/thi-ng/math),
[c.thi.ng](https://github.com/thi-ng/c-thing) and
[thi.ng/vexed-generation](https://github.com/thi-ng/vexed-generation).

### Status

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

```text
# with flag only for < v16
node --experimental-repl-await

> const math = await import("@thi.ng/math");
```

Package sizes (gzipped, pre-treeshake): ESM: 4.29 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                   | Description                                                            | Live demo                                                   | Source                                                                                   |
|:-----------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------|:------------------------------------------------------------|:-----------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/crypto-chart.png" width="240"/>          | Basic crypto-currency candle chart with multiple moving averages plots | [Demo](https://demo.thi.ng/umbrella/crypto-chart/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/crypto-chart)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-particles.jpg" width="240"/> | 2D Bezier curve-guided particle system                                 | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-particles/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-particles) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-isoline.png" width="240"/>              | Animated sine plasma effect visualized using contour lines             | [Demo](https://demo.thi.ng/umbrella/iso-plasma/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/iso-plasma)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mandelbrot.jpg" width="240"/>            | Worker based, interactive Mandelbrot visualization                     | [Demo](https://demo.thi.ng/umbrella/mandelbrot/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mandelbrot)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ramp-synth.png" width="240"/>            | Unison wavetable synth with waveform editor                            | [Demo](https://demo.thi.ng/umbrella/ramp-synth/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ramp-synth)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph.png" width="240"/>            | 2D scenegraph & shape picking                                          | [Demo](https://demo.thi.ng/umbrella/scenegraph/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/scenegraph-image.png" width="240"/>      | 2D scenegraph & image map based geometry manipulation                  | [Demo](https://demo.thi.ng/umbrella/scenegraph-image/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/scenegraph-image)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-barchart.png" width="240"/>          | Simplistic SVG bar chart component                                     | [Demo](https://demo.thi.ng/umbrella/svg-barchart/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-barchart)          |

## API

[Generated API docs](https://docs.thi.ng/umbrella/math/)

TODO

## Authors

### Maintainer

-   Karsten Schmidt ([@postspectacular](https://github.com/postspectacular))

### Contributors

-   [@nkint](https://github.com/nkint)

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

&copy; 2013 - 2022 Karsten Schmidt // Apache Software License 2.0
