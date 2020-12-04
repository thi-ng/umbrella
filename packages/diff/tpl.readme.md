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

```ts
import { diffArray, DiffMode } from "@thi.ng/diff";

diffArray([1, 2, 3], [1, 2, 4], DiffMode.FULL);
// {
//     distance: 2,
//     adds: { 2: 4 },
//     dels: { 2: 3 },
//     const: { 0: 1, 1: 2 },
//     linear: [0, 0, 1,  0, 1, 2,  -1, 2, 3,  1, 2, 4]
// }
```

## Breaking changes

### 2.0.0

The linear edit logs of both `diffArray` and `diffObject` are now
returned as flat arrays, with each log entry consisting of 3 or 2
successive array items. This is to avoid allocation of various small
arrays.

The order of optional args to both functions has been swapped to:

- `diffArray(old, new, mode?, equiv?)`
- `diffObject(old, new, mode?, equiv?)`

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
