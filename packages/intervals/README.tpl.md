# ${pkg.name}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Supports point & range queries and set operations with other intervals
(union, intersection, difference).

Furthermore, a parser for [ISO 80000-2 / ISO 31-11 interval
notation](https://en.wikipedia.org/wiki/ISO_31-11#Sets) is provided. See
[`Interval.parse()`](https://github.com/thi-ng/umbrella/blob/master/packages/intervals/src/index.ts#L25)
for details.

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

```bash
yarn add ${pkg.name}
```

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

```ts
import { Interval } from "@thi.ng/intervals";

// [0 .. +∞] (fully closed)
a = Interval.withMin(0);

// [-∞ .. 1) (open on RHS)
b = Interval.withMax(1, true);

i = a.intersection(b);
i.toString();
// [0 .. 1)

// parse from string
Interval.parse("[0 .. 1)")
// Interval { l: 0, r: 1, lopen: false, ropen: true }

i.contains(1);
// false (because interval is open on RHS)

i.contains(0.999999);
// true

// classify point (true if x < LHS)
i.isBefore(-1)
// true

// classify point (true if x > RHS)
i.isAfter(1);
// true

// grow interval to include 2 => [0 ... 2]
i2 = i.include(2);

// sort order: LHS -> RHS
i.compare(i2);
// -1

// classify WRT given interval arg
i.classify(Interval.infinity());
// Classifier.SUBSET

// create transformed interval
// (here scaled around centroid)
i.map((x) => x + (x - i.centroid()) * 2);
// [-1 .. 2)

// iterator of decimated interval values
[...i.values(0.25)];
// [ 0, 0.25, 0.5, 0.75 ]

// close RHS
i.ropen = false;

[...i.values(0.25)];
// [ 0, 0.25, 0.5, 0.75, 1 ] => now includes 1
```

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
