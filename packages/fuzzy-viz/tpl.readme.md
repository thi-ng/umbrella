<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

### Linguistic variable visualization

Generate an SVG visualization of all fuzzy sets defined in a [linguistic
variable](https://github.com/thi-ng/umbrella/tree/develop/packages/fuzzy#linguistic-variables):

![fuzzy set visualization of the example l-var](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/fuzzy/temperature-lvar-2.svg)

```ts tangle:export/readme-svg.ts
import { invSigmoid, sigmoid, trapezoid, variable } from "@thi.ng/fuzzy";
import { varToSvg } from "@thi.ng/fuzzy-viz";
import { writeFileSync } from "fs";

// temperature sets (in celsius)
const temp = variable([-20, 40], {
	freezing: invSigmoid(0, 2),
	cold: trapezoid(-1, 2, 16, 20),
	warm: trapezoid(15, 20, 30, 34),
	hot: sigmoid(32, 2),
});

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

```ts tangle:export/readme-ascii.ts
import { centroidStrategy, gaussian } from "@thi.ng/fuzzy";
import { fuzzySetToAscii, instrumentStrategy } from "@thi.ng/fuzzy-viz";

const strategy = instrumentStrategy(
	centroidStrategy({ samples: 1000 }),
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

<!-- include ../../assets/tpl/footer.md -->
