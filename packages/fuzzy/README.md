<!-- This file is generated - DO NOT EDIT! -->

# ![fuzzy](https://media.thi.ng/umbrella/banners/thing-fuzzy.svg?74e82ef9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/fuzzy.svg)](https://www.npmjs.com/package/@thi.ng/fuzzy)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/fuzzy.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Features](#features)
  - [References / Further reading](#references---further-reading)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Fuzzy set shaping functions](#fuzzy-set-shaping-functions)
  - [Linguistic variables](#linguistic-variables)
  - [Rule creation & inferencing](#rule-creation--inferencing)
- [Authors](#authors)
- [License](#license)

## About

Fuzzy logic operators & configurable rule inferencing engine.

### Features

- Entirely declarative & functional approach
- Fuzzy set domain shaping functions (incl. negated/inverse)
- Rules with multiple inputs/outputs and arbitrary term combinators (e.g.
  [T-norms](https://en.wikipedia.org/wiki/T-norm) from
  [@thi.ng/math](https://github.com/thi-ng/umbrella/blob/develop/packages/math/src/tnorms.ts)
  package). Syntax sugar for common `and`/`or` rules.
- Defuzzing via customizable strategies and options to balance precision vs.
  performance
  - Maxima: First, Last, Mean
  - Center-of-Gravity (COG)
- Linguistic variable creation and term/set classification for given domain
  values

### References / Further reading

- [Fuzzy Logic (Wikipedia)](https://en.wikipedia.org/wiki/Fuzzy_logic)
- [T-norm (Wikipedia)](https://en.wikipedia.org/wiki/T-Norm)
- [Fuzzy Logic - University of Western Australia](https://teaching.csse.uwa.edu.au/units/CITS7212/Lectures/Students/Fuzzy.pdf)
- [Introduction to Fuzzy Logic](https://www.researchgate.net/publication/267041266_Introduction_to_fuzzy_logic)
- [Defuzzification (Wikipedia)](https://en.wikipedia.org/wiki/Defuzzification)
- [Defuzzification methods](https://cse.iitkgp.ac.in/~dsamanta/courses/archive/sca/Archives/Chapter%205%20Defuzzification%20Methods.pdf)
- [Comparison of the COG Defuzzification Technique](https://arxiv.org/pdf/1612.00742.pdf)

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bfuzzy%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/fuzzy
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/fuzzy?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/fuzzy/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 1.09 KB / CJS: 1.19 KB / UMD: 1.21 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)

## API

[Generated API docs](https://docs.thi.ng/umbrella/fuzzy/)

### Fuzzy set shaping functions

- `constant()`
- `point()`
- `ramp()` / `invRamp()`
- `triangle()`
- `trapezoid()`
- `sigmoid()` / `invSigmoid()`
- `gaussian()`
- `negate()`
- `weighted()`
- `compose()`

TODO

### Linguistic variables

```ts
// temperature sets (in celsius)
const temp = variable([-20, 40], {
  freezing: invSigmoid(0, 2),
  cold: trapezoid(0, 4, 16, 20),
  warm: trapezoid(15, 20, 25, 30),
  hot: sigmoid(30, 2)
});

evaluate(temp, 18)
// {
//   freezing: 2.220446049250313e-16,
//   cold: 0.5,
//   warm: 0.6,
//   hot: 3.7751345441365816e-11
// }

evaluate(temp, 28)
// {
//   freezing: 0,
//   cold: 0,
//   warm: 0.4,
//   hot: 0.01798620996209156
// }

classify(temp, 28)
// "warm"
```

### Rule creation & inferencing

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-fuzzy,
  title = "@thi.ng/fuzzy",
  author = "Karsten Schmidt",
  note = "https://thi.ng/fuzzy",
  year = 2020
}
```

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
