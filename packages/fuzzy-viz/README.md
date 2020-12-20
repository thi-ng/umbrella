<!-- This file is generated - DO NOT EDIT! -->

# ![fuzzy-viz](https://media.thi.ng/umbrella/banners/thing-fuzzy-viz.svg?1ebd05a8)

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

Visualization & introspection utilities for [@thi.ng/fuzzy](https://github.com/thi-ng/umbrella/tree/develop/packages/fuzzy).

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bfuzzy-viz%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/fuzzy-viz
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/fuzzy-viz?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/fuzzy-viz/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 794 bytes / CJS: 860 bytes / UMD: 984 bytes

## Dependencies

- [@thi.ng/fuzzy](https://github.com/thi-ng/umbrella/tree/develop/packages/fuzzy)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/text-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/text-canvas)

## API

[Generated API docs](https://docs.thi.ng/umbrella/fuzzy-viz/)

### Linguistic variable visualization

Generate an SVG visualization of all fuzzy sets defined in a [linguistic
variable](https://github.com/thi-ng/umbrella/tree/develop/packages/fuzzy#linguistic-variables):

![fuzzy set visualization of the example l-var](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/fuzzy/temperature-lvar.svg)

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

See [`VizualizeVarOpts`]() for further options to configure the visualization.

### Instrument a DefuzzStrategy

TODO

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

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
