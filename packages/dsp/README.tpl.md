# ${pkg.name}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Partially ported from other thi.ng projects (e.g.
[thi.ng/synstack](https://github.com/thi-ng/synstack)). Currently only
features various [stateless & stateful wave generators /
oscillators](https://github.com/thi-ng/umbrella/tree/master/packages/dsp/src/osc.ts),
which have been ported from
[thi.ng/vexed-generation](http://thi.ng/vexed-generation).

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

```bash
yarn add ${pkg.name}
```

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

```ts
import * as dsp from "@thi.ng/dsp";
import { take } from "@thi.ng/transducers";

[...take(20, new dsp.Oscillator(dsp.mix(dsp.sin, dsp.rect), 1/20)]
// [ 0.5,
//   0.6545084971874737,
//   0.7938926261462366,
//   0.9045084971874737,
//   0.9755282581475768,
//   1,
//   0.9755282581475768,
//   0.9045084971874737,
//   0.7938926261462367,
//   0.654508497187474,
//   0.5000000000000003,
//   -0.6545084971874735,
//   -0.7938926261462365,
//   -0.9045084971874737,
//   -0.9755282581475768,
//   -1,
//   -0.9755282581475766,
//   -0.9045084971874735,
//   -0.793892626146236,
//   -0.6545084971874731 ]
```

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
