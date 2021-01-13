<!-- This file is generated - DO NOT EDIT! -->

# ![random](https://media.thi.ng/umbrella/banners/thing-random.svg?aee58c49)

[![npm version](https://img.shields.io/npm/v/@thi.ng/random.svg)](https://www.npmjs.com/package/@thi.ng/random)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/random.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Random distributions](#random-distributions)
  - [Other utilities](#other-utilities)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Pseudo-random number generators w/ unified API, distributions, weighted choices, ID generation.

This package provides the `IRandom` interface and various (mostly seedable)
pseudo-random number generator implementations, incl. `IRandom` wrappers for
`Math.random()` and `window.crypto`:

- [Crypto](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/crypto.ts)
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

- [`randomBytes()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/random-bytes.ts)
- [`randomID()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/random-id.ts)
- [`weightedRandom()](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/weighted-random.ts)
- [`uuidv4Bytes()` / `uuid()`](https://github.com/thi-ng/umbrella/tree/develop/packages/random/src/uuid.ts)

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brandom%5D+in%3Atitle)

### Related packages

- [@thi.ng/ksuid](https://github.com/thi-ng/umbrella/tree/develop/packages/ksuid) - Configurable K-sortable unique identifiers, binary & base-N encoded

## Installation

```bash
yarn add @thi.ng/random
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/random?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/random/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 1.63 KB / CJS: 1.75 KB / UMD: 1.74 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/develop/packages/hex)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                            | Description                                              | Live demo                                            | Source                                                                            |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fft-synth.png" width="240"/>      | Interactive inverse FFT toy synth                        | [Demo](https://demo.thi.ng/umbrella/fft-synth/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fft-synth)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-evo.jpg" width="240"/> | Evolutionary shader generation using genetic programming | [Demo](https://demo.thi.ng/umbrella/shader-ast-evo/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-evo) |

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

// next gaussian (using iterative CLT approach)
// optional params: num samples, offset, scale
rnd.gaussian()
// 0.10632886109089679
```

## Authors

Karsten Schmidt

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

&copy; 2015 - 2021 Karsten Schmidt // Apache Software License 2.0
