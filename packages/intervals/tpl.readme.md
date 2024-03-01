<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Supports point & range queries and set operations with other intervals
(union, intersection, difference).

Furthermore, a parser for [ISO 80000-2 / ISO 31-11 interval
notation](https://en.wikipedia.org/wiki/ISO_31-11#Sets) is provided. See
[`parse()`](https://docs.thi.ng/umbrella/intervals/functions/parse.html) for
details.

{{meta.status}}

#### Breaking changes

With version 3.0.0 the API has been updated to be largely functional rather than
OOP, with all static (and most instance) `Interval` methods converted into
standalone functions. The only class methods remaining are to implement these
standard interfaces: `ICompare`, `IContains`, `ICopy`, `IEquiv`.

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

```ts
import * as i from "@thi.ng/intervals";

// [0 .. +∞] (fully closed)
const a = i.withMin(0);

// [-∞ .. 1) (open on RHS)
const b = i.withMax(1, true);

const c = i.intersection(a, b);
c.toString();
// [0 .. 1)

// parse from string
i.interval("[0 .. 1)")
// Interval { l: 0, r: 1, lopen: false, ropen: true }

i.contains(c, 1);
// or
c.contains(1);
// false (because interval is open on RHS)

i.contains(c, 0.999999);
// true

// classify interval relative to point (true if RHS < x)
i.isBefore(c, -1)
// false

i.isBefore(c, 1)
// true

// classify interval relative to point (true if LHS > x)
i.isAfter(c, -1);
// true

i.isAfter(c, 1);
// false

// grow interval to include 2 => [0 ... 2]
const c2 = i.include(c, 2);

// sort order: LHS -> RHS
i.compare(c, c2);
// -1

// classify WRT given interval arg
// returns Classifier enum
i.classify(c, i.infinity());
// 3 (aka Classifier.SUBSET)

// create transformed interval
// (here scaled around centroid)
i.transform(c, (x) => x + (x - i.centroid(c)) * 2).toString();
// [-1 .. 2)

// iterator of decimated interval values
[...i.values(c, 0.25)];
// [ 0, 0.25, 0.5, 0.75 ]

// close RHS
c.ropen = false;

// iterator of 0.25-spaced values in interval
[...i.values(c, 0.25)];
// [ 0, 0.25, 0.5, 0.75, 1 ] => now includes 1

// iterator of n equidistant samples
[...i.samples(c, 4)]
// [ 0, 0.3333333333333333, 0.6666666666666666, 1 ]

// constrain values to interval (taking openness into account)
i.max(i.interval("(0..1)"), -2)
// 0.000001

// if given value is outside interval, uses opt epsilon value
// to return closest inside value (default: 1e-6)...
i.max(i.interval("(0..1)"), -2, 1e-3)
// 0.001

i.min(i.interval("(0..1)"), 2, 1e-3)
// 0.999

// clamp on both sides
i.clamp(i.interval("[0..1)"), -2, 1e-3)
// 0
i.clamp(i.interval("[0..1)"), 2, 1e-3)
// 0.999
```

<!-- include ../../assets/tpl/footer.md -->
