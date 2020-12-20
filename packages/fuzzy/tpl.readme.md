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
- Fully type checked
- Fuzzy set domain shaping & composition functions (incl. negated / inverse)
- Various [T-norms & S-norms](https://github.com/thi-ng/umbrella/blob/develop/packages/fuzzy/src/tnorms.ts), incl. parametric versions
- Rules with multiple inputs/outputs and arbitrary term combinators (i.e.
  T-norms). Syntax sugar for common `and`/`or` rules.
- Defuzzification via customizable strategies and options to balance precision
  vs. performance
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

### Fuzzy set generators & combinators

Generators:

- `constant()`
- `point()`
- `ramp()` / `invRamp()`
- `triangle()`
- `trapezoid()`
- `sigmoid()` / `invSigmoid()`
- `gaussian()`

Combinators:

- `negate()`
- `weighted()`
- `alphaCut()` / `invAlphaCut()`
- `implication()`
- `compose()`

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

// classify temperature (min confidence 33%, default: 50%)
classify(temp, 28, 0.33)
// "warm"
```

### Rule creation & inferencing

Example taken from Franck Dernoncourt's [Introduction to Fuzzy
Logic](https://www.researchgate.net/publication/267041266_Introduction_to_fuzzy_logic):

```ts
// define fuzzy input variables
const inputs = {
  food: variable([0, 10], {
    awful: invRamp(1, 3),
    delicious: ramp(7, 9),
  }),
  service: variable([0, 10], {
    poor: gaussian(0, 1.5),
    good: gaussian(5, 1.5),
    excellent: gaussian(10, 1.5),
  }),
};

const outputs = {
  tip: variable([0, 30], {
    low: triangle(0, 5, 10),
    medium: triangle(10, 15, 20),
    high: triangle(20, 25, 30),
  }),
};

// l-vars, rules and defuzzification are using generics for type safety
// we define these 2 type aliases for brevity
type I = typeof inputs;
type O = typeof outputs;

// rule definitions:
// if service is poor OR food is awful -> tip is low
// if service is normal -> tip is medium
// if service is excellent OR food is delicious -> tip is high
const rules = [
  or<I, O>({ food: "awful", service: "poor" }, { tip: "low" }),
  or<I, O>({ service: "good" }, { tip: "medium" }),
  or<I, O>({ food: "delicious", service: "excellent" }, { tip: "high" }),
];

// defuzzification using default center-of-gravity strategy
defuzz(
  // input variables
  { food, service },
  // output variables
  { tip },
  // rules (see above)
  rules,
  // input values
  { food: 7.32, service: 7.83 },
);
// { tip: 22.650000000000034 }

// defuzz with custom strategy (note: each has further config options)
defuzz(
  // input variables
  { food, service },
  // output variables
  { tip },
  // rules (see above)
  rules,
  // input values
  { food: 7.32, service: 7.83 },
  // custom defuzz strategy
  meanOfMaximaStrategy()
);
// { tip: 25.050000000000043 }
```

Note: The results are slightly different than those in the textbook example, due
to different `gaussian` fuzzy sets used for the `service` lvar.

Using `traceStrategy` from the upcoming
[@thi.ng/fuzzy-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/fuzzy-utils)
package, we can also visualize the fuzzy sets and highlight the position of the
crisp result value.

Here is the result for COG strategy and using `tnormMin` (the default) to
transform each rule's output set(s):

```text
...........................................................................|........................
...........................................................................|........................
...........................................................................|........................
...........................................................................|........................
...........................................................................|........................
...........................................................................|........................
...........................................................................|........................
...........................................................................|........................
...........................................................................|........................
...........................................................................|........................
........................................................................▁▅▅|▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅.....
.......................................................................▁███|███████████████████▇....
......................................................................▁████|████████████████████▇...
....................................▅▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▅....▂█████|█████████████████████▇..
...................................▅█████████████████████████████▅..▂██████|███████████████████████.
..................................▅███████████████████████████████▅▂███████|████████████████████████
                                                                           ^ 22.65
```

Different results can be obtained by adjusting the
[T-norm](https://en.wikipedia.org/wiki/T-Norm) used to transform each rule's
output sets, here using `tnormHamacher(2)`.

```text
.............................................................................|......................
.............................................................................|......................
.............................................................................|......................
.............................................................................|......................
.............................................................................|......................
.............................................................................|......................
.............................................................................|......................
.............................................................................|......................
.............................................................................|......................
.............................................................................|......................
.............................................................................|.....▃▂...............
.............................................................................|...▃███▆▂.............
.............................................................................|▁▅███████▇▃...........
................................................▁▃▆▃▁......................▁▄|████████████▆▃........
...........................................▁▂▄▆███████▆▄▂▁..............▂▄▇██|███████████████▆▃▁....
...................................▁▂▃▄▅▆▇█████████████████▇▆▅▄▃▂▁..▂▄▆██████|███████████████████▅▃▁
                                                                             ^ 23.55
```

...or using `tnormAczelAlsina(2)` (there're many more available):

```text
............................................................................|.......................
............................................................................|.......................
............................................................................|.......................
............................................................................|.......................
............................................................................|.......................
............................................................................|.......................
............................................................................|.......................
............................................................................|.......................
............................................................................|.......................
............................................................................|.......................
............................................................................|.▂▃▄▅▅▅▅▅▄▄▃▁..........
..........................................................................▂▅|██████████████▆▄.......
........................................................................▃▇██|█████████████████▆▂....
........................................▁▂▃▄▄▅▅▆▆▆▆▆▆▆▅▅▄▄▃▂▁.........▃█████|███████████████████▆▁..
....................................▂▄▇███████████████████████▇▄▂....▆██████|█████████████████████▄.
..................................▃▇█████████████████████████████▇▃▂████████|██████████████████████▇
                                                                            ^ 22.95
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
