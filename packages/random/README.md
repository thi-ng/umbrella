<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/random](https://media.thi.ng/umbrella/banners-20220914/thing-random.svg?c79b7908)

[![npm version](https://img.shields.io/npm/v/@thi.ng/random.svg)](https://www.npmjs.com/package/@thi.ng/random)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/random.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

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

Pseudo-random number generators w/ unified API, distributions, weighted choices, ID generation

This package provides the `IRandom` interface and various (mostly seedable)
pseudo-random number generator implementations, incl. `IRandom` wrappers for
`Math.random()` and `window.crypto`:

- [Crypto](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/crypto.ts)
- [SFC32](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/sfc32.ts)
- [Smush32](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/smush32.ts)
- [System](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/system.ts)
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
- [`uuidv4Bytes()` / `uuid()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/uuid.ts)

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

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/random"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const random = await import("@thi.ng/random");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.83 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/develop/packages/hex)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                   | Description                                                      | Live demo                                                   | Source                                                                                   |
|:-----------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------|:------------------------------------------------------------|:-----------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/color-themes.png" width="240"/>          | Probabilistic color theme generator                              | [Demo](https://demo.thi.ng/umbrella/color-themes/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/color-themes)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fft-synth.png" width="240"/>             | Interactive inverse FFT toy synth                                | [Demo](https://demo.thi.ng/umbrella/fft-synth/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fft-synth)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-particles.jpg" width="240"/> | 2D Bezier curve-guided particle system                           | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-particles/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-particles) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/>         | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-evo.jpg" width="240"/>        | Evolutionary shader generation using genetic programming         | [Demo](https://demo.thi.ng/umbrella/shader-ast-evo/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-evo)        |

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

&copy; 2015 - 2022 Karsten Schmidt // Apache License 2.0
