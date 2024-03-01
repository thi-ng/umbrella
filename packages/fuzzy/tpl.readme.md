<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

### Features

- Entirely declarative & functional approach
- Fully type checked
- Fuzzy set domain shaping & composition functions (incl. negated / inverse)
- Various [T-norms &
  S-norms](https://github.com/thi-ng/umbrella/blob/develop/packages/fuzzy/src/tnorms.ts),
  incl. parametric versions
- Rules with multiple inputs/outputs and arbitrary term combinators (i.e.
  T-norms). Syntax sugar for common `and`/`or` rules.
- Defuzzification via customizable strategies and options to balance precision
  vs. performance
  - Maxima: First, Last, Mean
  - Center-of-Gravity (COG)
- Linguistic variable creation and term/set classification for given domain
  values
- Fuzzy set visualization (via
  [@thi.ng/fuzzy-viz](https://github.com/thi-ng/umbrella/tree/develop/packages/fuzzy-viz))

### References / Further reading

- [Fuzzy Logic (Wikipedia)](https://en.wikipedia.org/wiki/Fuzzy_logic)
- [T-norm (Wikipedia)](https://en.wikipedia.org/wiki/T-Norm)
- [Fuzzy Logic - University of Western Australia](https://teaching.csse.uwa.edu.au/units/CITS7212/Lectures/Students/Fuzzy.pdf)
- [Introduction to Fuzzy Logic](https://www.researchgate.net/publication/267041266_Introduction_to_fuzzy_logic)
- [Defuzzification (Wikipedia)](https://en.wikipedia.org/wiki/Defuzzification)
- [Defuzzification methods](https://cse.iitkgp.ac.in/~dsamanta/courses/archive/sca/Archives/Chapter%205%20Defuzzification%20Methods.pdf)
- [Comparison of the COG Defuzzification Technique](https://arxiv.org/pdf/1612.00742.pdf)

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

(See
[tests](https://github.com/thi-ng/umbrella/tree/develop/packages/fuzzy/test) for
more usage examples).

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
- `compose()` / `intersect()` / `union()`

### Linguistic variables

Linguistic variables (short: **L-var**s) are groupings of named (and possibly
overlapping) fuzzy sets within a given value domain. The can be used standalone
or as inputs/outputs in rules (further below).

The
[@thi.ng/fuzzy-viz](https://github.com/thi-ng/umbrella/tree/develop/packages/fuzzy-viz)
package provides utilities to visualize the fuzzy sets of an L-var.

![fuzzy set visualization of the example
l-var](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/fuzzy/temperature-lvar-2.svg)

```ts
import {
	variable, invSigmoid, sigmoid, trapezoid,
	evaluate, classify
} from "@thi.ng/fuzzy";

// temperature sets (in celsius)
const temp = variable(
  // value domain
  [-20, 40],
  {
    freezing: invSigmoid(0, 2),
    cold: trapezoid(-1, 2, 16, 20),
    warm: trapezoid(15, 20, 30, 34),
    hot: sigmoid(32, 2)
  }
);

// evaluate all fuzzy sets for given domain value
evaluate(temp, 18)
// {
//   freezing: 2.220446049250313e-16,
//   cold: 0.5,
//   warm: 0.6,
//   hot: 6.914400106935423e-13
// }

evaluate(temp, 28)
// {
//   freezing: 0,
//   cold: 0,
//   warm: 1,
//   hot: 0.0003353501304664781
// }

// classify temperature (min confidence 33%, default: 50%)
classify(temp, 28, 0.33)
// "warm"
```

### Rule creation & inferencing

Example taken from Franck Dernoncourt's [Introduction to Fuzzy
Logic](https://www.researchgate.net/publication/267041266_Introduction_to_fuzzy_logic):

![fuzzy set illustration from F.Dernoncourt's
tutorial](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/fuzzy/fuzzy-matrix-dernoncourt.png)

```ts
import {
	variable, ramp, invRamp, gaussian, triangle,
	or, defuzz, meanOfMaximaStrategy
} from "@thi.ng/fuzzy";

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
  inputs,
  outputs,
  rules,
  // input values
  { food: 7.32, service: 7.83 },
);
// { tip: 22.650000000000034 }

// defuzz with custom strategy (note: each has further config options)
defuzz(
  inputs,
  outputs,
  rules,
  // input values
  { food: 7.32, service: 7.83 },
  // custom defuzz strategy
  meanOfMaximaStrategy()
);
// { tip: 25.050000000000043 }
```

Note: The results are slightly different than those in the textbook example, due
to different `gaussian` fuzzy sets used for the `service` L-var.

Using `instrumentStrategy()` from the upcoming
[@thi.ng/fuzzy-viz](https://github.com/thi-ng/umbrella/tree/develop/packages/fuzzy-viz)
package, we can also visualize the final, transformed fuzzy sets used to compute
crisp results and highlight the position of the crisp result value.

Here is the ASCII art output for the
[`centroidStrategy`](https://docs.thi.ng/umbrella/fuzzy/functions/centroidStrategy.html)
and using `tnormMin` (the default) to transform each rule's output set(s):

```ts
import { defuzz, centroidStrategy } from "@thi.ng/fuzzy";
import { instrumentStrategy, fuzzySetToAscii } from "@thi.ng/fuzzy-viz";

// wrap existing strategy
const strat = instrumentStrategy(centroidStrategy(), fuzzySetToAscii());

// call defuzz as normal
defuzz(inputs, outputs, rules, strat);

// obtain secondary results via deref()
console.log(strat.deref()[0]);
```

```text
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅.....
.......................................................................▁|██████████████████████▇....
......................................................................▁█|███████████████████████▇...
....................................▅▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▅....▂██|████████████████████████▇..
...................................▅█████████████████████████████▅..▂███|██████████████████████████.
..................................▅███████████████████████████████▅▂████|███████████████████████████
                                                                        ^ 21.52
```

Different results can be obtained by adjusting the
[T-norm](https://en.wikipedia.org/wiki/T-Norm) used to transform each rule's
output sets, here using `tnormHamacher(2)`.

```text
.........................................................................|..........................
.........................................................................|..........................
.........................................................................|..........................
.........................................................................|..........................
.........................................................................|..........................
.........................................................................|..........................
.........................................................................|..........................
.........................................................................|..........................
.........................................................................|..........................
.........................................................................|..........................
.........................................................................|.........▃▂...............
.........................................................................|.......▃███▆▂.............
.........................................................................|....▁▅███████▇▃...........
................................................▁▃▆▃▁....................|.▁▄▇████████████▆▃........
...........................................▁▂▄▆███████▆▄▂▁..............▂|▇██████████████████▆▃▁....
...................................▁▂▃▄▅▆▇█████████████████▇▆▅▄▃▂▁..▂▄▆██|███████████████████████▅▃▁
                                                                         ^ 21.84
```

...or using `tnormAczelAlsina(2)` (there're many more available):

```text
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|...........................
........................................................................|.....▂▃▄▅▅▅▅▅▄▄▃▁..........
........................................................................|.▂▅▇██████████████▆▄.......
........................................................................|▇████████████████████▆▂....
........................................▁▂▃▄▄▅▅▆▆▆▆▆▆▆▅▅▄▄▃▂▁.........▃█|███████████████████████▆▁..
....................................▂▄▇███████████████████████▇▄▂....▆██|█████████████████████████▄.
..................................▃▇█████████████████████████████▇▃▂████|██████████████████████████▇
                                                                        ^ 21.58
```

Just for illustration purposes (and using a different example), SVG output can
be obtained by merely switching to another instrumentation function (here
`fuzzySetToSvg()`):

![fuzzySetToSvg() visualization example](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/fuzzy/strategy-viz.svg)

<!-- include ../../assets/tpl/footer.md -->
