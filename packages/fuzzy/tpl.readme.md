# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

### Features

- Entirely declarative & functional approach
- Fuzzy set domain shaping functions (incl. negated/inverse)
- Rules with multiple inputs/outputs and arbitrary term combinators (e.g.
  [T-norms](https://en.wikipedia.org/wiki/T-norm) from
  [@thi.ng/math](https://github.com/thi-ng/umbrella/blob/feature/fuzzy/packages/math/src/tnorms.ts)
  package). Syntax sugar for common `and`/`or` rules.
- Defuzzing via customizable strategies (so far Center-of-Gravity (COG) only)
  and options to balance precision vs. performance.
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

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

```ts
const
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
