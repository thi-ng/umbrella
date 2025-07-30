<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/random](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-random.svg?58fd6345)

[![npm version](https://img.shields.io/npm/v/@thi.ng/random.svg)](https://www.npmjs.com/package/@thi.ng/random)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/random.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Random distributions](#random-distributions)
  - [Other utilities](#other-utilities)
- [Status](#status)
- [Support packages](#support-packages)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Pseudo-random number generators w/ unified API, distributions, weighted choices, ID generation.

> [!IMPORTANT]
> In July 2024 this package was restructured and split-up to extract some
> features into smaller more focused packages:
>
> - [@thi.ng/uuid](https://thi.ng/uuid)

This package provides the `IRandom` interface and various (mostly seedable)
pseudo-random number generator implementations, incl. `IRandom` wrappers for
`Math.random()` (or other external PRNGs) and `window.crypto`:

- [Crypto](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/crypto.ts)
- [SFC32](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/sfc32.ts)
- [Smush32](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/smush32.ts)
- [System](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/system.ts)
- [WrappedRandom](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/wrapped.ts)
- [Xoshiro128](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/xoshiro128.ts)
- [XorShift128](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/xorshift128.ts)
- [XorWow](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/xorwow.ts)
- [XsAdd](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/xsadd.ts)

Partially ported from C implementations taken from [c.thi.ng](http://c.thi.ng).

### Random distributions

- [`exponential()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/distributions/exponential.ts)
- [`gaussian()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/distributions/gaussian.ts)
- [`geometric()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/distributions/geometric.ts)
- [`normal()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/distributions/normal.ts)
- [`uniform()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/distributions/uniform.ts)

### Other utilities

- [`coin()` / `fairCoin()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/coin.ts)
- [`pickRandom()` / `pickRandomKey()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/pick-random.ts)
- [`randomBytes()` / `randomBytesFrom()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/random-bytes.ts)
- [`randomID()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/random-id.ts)
- [`weightedRandom()` / `weightedRandomKey()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/weighted-random.ts)
- [`uniqueIndices()` / `uniqueValuesFrom()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/unique-indices.ts)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brandom%5D+in%3Atitle)

## Support packages

- [@thi.ng/random-fxhash](https://github.com/thi-ng/umbrella/tree/develop/packages/random-fxhash) - [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random) compatible wrapper & utilities for fxhash's PRNG

## Related packages

- [@thi.ng/ksuid](https://github.com/thi-ng/umbrella/tree/develop/packages/ksuid) - Configurable K-sortable unique IDs, ULIDs, binary & base-N encoded, 32/48/64bit time resolutions

## Installation

```bash
yarn add @thi.ng/random
```

ESM import:

```ts
import * as rnd from "@thi.ng/random";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/random"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const rnd = await import("@thi.ng/random");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.93 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

19 projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                   | Description                                                                              | Live demo                                                   | Source                                                                                   |
|:-----------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------|:------------------------------------------------------------|:-----------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/canvas-recorder.png" width="240"/>       | Self-modifying, animated typographic grid with emergent complex patterns                 | [Demo](https://demo.thi.ng/umbrella/canvas-recorder/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/canvas-recorder)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/color-themes.png" width="240"/>          | Probabilistic color theme generator                                                      | [Demo](https://demo.thi.ng/umbrella/color-themes/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/color-themes)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fft-synth.png" width="240"/>             | Interactive inverse FFT toy synth                                                        | [Demo](https://demo.thi.ng/umbrella/fft-synth/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fft-synth)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-particles.jpg" width="240"/> | 2D Bezier curve-guided particle system                                                   | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-particles/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-particles) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hiccup-canvas-basics.png" width="240"/>  | Basic hiccup-based canvas drawing                                                        | [Demo](https://demo.thi.ng/umbrella/hiccup-canvas-basics/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hiccup-canvas-basics)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ifs-fractal.jpg" width="240"/>           | Barnsley fern IFS fractal renderer                                                       | [Demo](https://demo.thi.ng/umbrella/ifs-fractal/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ifs-fractal)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/kmeans-viz.jpg" width="240"/>            | k-means clustering visualization                                                         | [Demo](https://demo.thi.ng/umbrella/kmeans-viz/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/kmeans-viz)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/layout-gridgen.png" width="240"/>        | Randomized space-filling, nested grid layout generator                                   | [Demo](https://demo.thi.ng/umbrella/layout-gridgen/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/layout-gridgen)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-gradients.jpg" width="240"/>       | Randomized 4-point 2D color gradient image generator                                     | [Demo](https://demo.thi.ng/umbrella/pixel-gradients/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-gradients)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/>         | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel                         | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-subdiv.jpg" width="240"/>           | Animated, iterative polygon subdivisions & visualization                                 | [Demo](https://demo.thi.ng/umbrella/poly-subdiv/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-subdiv)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/procedural-text.jpg" width="240"/>       | Procedural stochastic text generation via custom DSL, parse grammar & AST transformation | [Demo](https://demo.thi.ng/umbrella/procedural-text/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/procedural-text)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-klist.png" width="240"/>            | Basic usage of thi.ng/rdom keyed list component wrapper                                  | [Demo](https://demo.thi.ng/umbrella/rdom-klist/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-klist)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/render-audio.png" width="240"/>          | Generative audio synth offline renderer and WAV file export                              | [Demo](https://demo.thi.ng/umbrella/render-audio/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/render-audio)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-evo.jpg" width="240"/>        | Evolutionary shader generation using genetic programming                                 | [Demo](https://demo.thi.ng/umbrella/shader-ast-evo/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-evo)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/stacked-layout.png" width="240"/>        | Responsive & reactively computed stacked column layout                                   | [Demo](https://demo.thi.ng/umbrella/stacked-layout/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/stacked-layout)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/thing-packages-quiz.avif" width="240"/>  | thi.ng/rdom & thi.ng/rstream based quiz to guess thi.ng package names                    | [Demo](https://demo.thi.ng/umbrella/thing-packages-quiz/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/thing-packages-quiz)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/tsne-colors.avif" width="240"/>          | Animated t-SNE visualization of 4D data                                                  | [Demo](https://demo.thi.ng/umbrella/tsne-colors/)           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/tsne-colors)           |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-game-of-life.png" width="240"/>    | Game of Life implemented as WebGL2 multi-pass shader pipeline                            | [Demo](https://demo.thi.ng/umbrella/webgl-game-of-life/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-game-of-life)    |

## API

[Generated API docs](https://docs.thi.ng/umbrella/random/)

```ts
import { Smush32 } from "@thi.ng/random";

const rnd = new Smush32(0xdecafbad);

// the following methods are available for all generators

// next uint (0 .. 2^32-1)
rnd.int()
// 4022849029

// next float [0.0 .. 1.0)
rnd.float()
// 0.2698542904737066

// next normalized float (w/ opt scale)
// [-scale .. +scale)
rnd.norm(100)
// 57.70723665079737

// next float in given interval [min .. max)
rnd.minmax(10, 20)
// 15.295951807707537

rnd.minmaxInt(10, 20)
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-random,
  title = "@thi.ng/random",
  author = "Karsten Schmidt",
  note = "https://thi.ng/random",
  year = 2015
}
```

## License

&copy; 2015 - 2025 Karsten Schmidt // Apache License 2.0
