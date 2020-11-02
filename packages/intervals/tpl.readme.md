# ${pkg.banner}

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
[`Interval.parse()`](https://github.com/thi-ng/umbrella/blob/develop/packages/intervals/src/index.ts#L25)
for details.

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
import { interval, Interval } from "@thi.ng/intervals";

// [0 .. +∞] (fully closed)
a = Interval.withMin(0);

// [-∞ .. 1) (open on RHS)
b = Interval.withMax(1, true);

i = a.intersection(b);
i.toString();
// [0 .. 1)

// parse from string
interval("[0 .. 1)")
// Interval { l: 0, r: 1, lopen: false, ropen: true }

i.contains(1);
// false (because interval is open on RHS)

i.contains(0.999999);
// true

// classify interval relative to point (true if RHS < x)
i.isBefore(-1)
// false

i.isBefore(1)
// true

// classify interval relative to point (true if LHS > x)
i.isAfter(-1);
// true

i.isAfter(1);
// false

// grow interval to include 2 => [0 ... 2]
i2 = i.include(2);

// sort order: LHS -> RHS
i.compare(i2);
// -1

// classify WRT given interval arg
i.classify(Interval.infinity());
// 3 (aka Classifier.SUBSET)

// create transformed interval
// (here scaled around centroid)
i.map((x) => x + (x - i.centroid()) * 2).toString();
// [-1 .. 2)

// iterator of decimated interval values
[...i.values(0.25)];
// [ 0, 0.25, 0.5, 0.75 ]

// close RHS
i.ropen = false;

[...i.values(0.25)];
// [ 0, 0.25, 0.5, 0.75, 1 ] => now includes 1

// constrain values to interval (taking openness into account)
interval("(0..1)").max(-2)
// 0.000001

// if given value is outside interval, uses opt epsilon value
// to return closest inside value (default: 1e-6)...
interval("(0..1)").max(-2, 1e-3)
// 0.001

interval("(0..1)").min(2, 1e-3)
// 0.999

// clamp on both sides
interval("[0..1)").clamp(-2, 1e-3)
// 0
interval("[0..1)").clamp(2, 1e-3)
// 0.999
```

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
