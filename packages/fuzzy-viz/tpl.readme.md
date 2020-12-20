# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
