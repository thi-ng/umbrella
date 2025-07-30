<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/intervals](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-intervals.svg?d084bfb4)

[![npm version](https://img.shields.io/npm/v/@thi.ng/intervals.svg)](https://www.npmjs.com/package/@thi.ng/intervals)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/intervals.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
    - [Breaking changes](#breaking-changes)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Closed/open/semi-open interval data type, queries & operations.

Supports point & range queries and set operations with other intervals
(union, intersection, difference).

Furthermore, a parser for [ISO 80000-2 / ISO 31-11 interval
notation](https://en.wikipedia.org/wiki/ISO_31-11#Sets) is provided. See
[`parse()`](https://docs.thi.ng/umbrella/intervals/functions/parse.html) for
details.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bintervals%5D+in%3Atitle)

#### Breaking changes

With version 3.0.0 the API has been updated to be largely functional rather than
OOP, with all static (and most instance) `Interval` methods converted into
standalone functions. The only class methods remaining are to implement these
standard interfaces: `ICompare`, `IContains`, `ICopy`, `IEquiv`.

## Installation

```bash
yarn add @thi.ng/intervals
```

ESM import:

```ts
import * as i from "@thi.ng/intervals";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/intervals"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const i = await import("@thi.ng/intervals");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.61 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/dlogic](https://github.com/thi-ng/umbrella/tree/develop/packages/dlogic)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                           | Description                                                      | Live demo                                           | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/> | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/intervals/)

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

## Authors

- [Karsten Schmidt](https://thi.ng) (Main author)
- [@oljeger](https://github.com/oljeger)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-intervals,
  title = "@thi.ng/intervals",
  author = "Karsten Schmidt and others",
  note = "https://thi.ng/intervals",
  year = 2018
}
```

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache License 2.0
