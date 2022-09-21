<!-- This file is generated - DO NOT EDIT! -->

# ![fuzzy-viz](https://media.thi.ng/umbrella/banners-20220914/thing-fuzzy-viz.svg?ea12bee6)

[![npm version](https://img.shields.io/npm/v/@thi.ng/fuzzy-viz.svg)](https://www.npmjs.com/package/@thi.ng/fuzzy-viz)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/fuzzy-viz.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Linguistic variable visualization](#linguistic-variable-visualization)
  - [Instrument a DefuzzStrategy](#instrument-a-defuzzstrategy)
- [Authors](#authors)
- [License](#license)

## About

Visualization, instrumentation & introspection utils for [@thi.ng/fuzzy](https://github.com/thi-ng/umbrella/tree/develop/packages/fuzzy).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bfuzzy-viz%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/fuzzy-viz
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/fuzzy-viz"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const fuzzyViz = await import("@thi.ng/fuzzy-viz");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.11 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/fuzzy](https://github.com/thi-ng/umbrella/tree/develop/packages/fuzzy)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/text-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/text-canvas)

## API

[Generated API docs](https://docs.thi.ng/umbrella/fuzzy-viz/)

### Linguistic variable visualization

Generate an SVG visualization of all fuzzy sets defined in a [linguistic
variable](https://github.com/thi-ng/umbrella/tree/develop/packages/fuzzy#linguistic-variables):

![fuzzy set visualization of the example l-var](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/fuzzy/temperature-lvar-2.svg)

```ts
import { varToSvg } from "@thi.ng/fuzzy-viz";

// temperature sets (in celsius)
const temp = variable(
    [-20, 40],
    {
        freezing: invSigmoid(0, 2),
        cold: trapezoid(-1, 2, 16, 20),
        warm: trapezoid(15, 20, 30, 34),
        hot: sigmoid(32, 2)
    }
);

// generate & write SVG file
writeFileSync("temperature.svg", varToSvg(temp, { samples: 200 }));
```

See
[`VisualizeVarOpts`](https://docs.thi.ng/umbrella/fuzzy-viz/interfaces/VisualizeVarOpts.html)
for further options to configure the visualization.

### Instrument a DefuzzStrategy

`instrumentStrategy()` is an higher order function. It takes an existing
`DefuzzStrategy` and an instrumentation function. Returns new `DefuzzStrategy`
which first executes original `strategy`, then calls `instrument` with the same
args AND the computed result obtained from `strategy`. Returns result of
original `strategy`.

The instrumentation function is intended to perform side effects (e.g. debug
outputs) and/or produce secondary results (e.g. visualizations). The latter can
be obtained through the `IDeref` mechanism implemented by the returned function.
Since `defuzz()` might call the strategy multiple times (i.e. if there are
multiple output vars used), `.deref()` will always return an array of secondary
results.

**Note:** The secondary results from the instrumentation function will persist &
accumulate. If re-using the instrumented strategy for multiple `defuzz()`
invocations, it's highly recommended to clear any previous results using
`.clear()`.

```ts
const strategy = instrumentStrategy(
  cogStrategy({ samples: 1000 }),
  fuzzySetToAscii({ width: 40, height: 8 })
);

// apply strategy as normal (well, usually done via defuzz())
strategy(gaussian(5, 2), [0, 10]);
// 4.995

strategy.deref().forEach((viz) => console.log(viz));
// .................▄▆█|█▆▄.................
// ...............▅████|████▅...............
// .............▄██████|██████▄.............
// ...........▂▇███████|███████▇▂...........
// ..........▅█████████|█████████▅..........
// .......▁▅███████████|███████████▅▁.......
// .....▃▆█████████████|█████████████▆▃.....
// ▃▄▅▇████████████████|████████████████▇▅▄▃
//                     ^ 5.00

// cleanup (optional)
strategy.clear();
```

Using `fuzzySetToHiccup()`/`fuzzySetToSvg()` visualizations like below can be
created following the same pattern as above:

![fuzzySetToSvg() visualization example](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/fuzzy/strategy-viz.svg)

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-fuzzy-viz,
  title = "@thi.ng/fuzzy-viz",
  author = "Karsten Schmidt",
  note = "https://thi.ng/fuzzy-viz",
  year = 2020
}
```

## License

&copy; 2020 - 2022 Karsten Schmidt // Apache Software License 2.0
