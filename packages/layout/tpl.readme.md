# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Currently, this package features only a single grid layout allocator, as
well as more [generic supporting
types](https://github.com/thi-ng/umbrella/tree/develop/packages/layout/src/api.ts)
to define other layout types / implementations.

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

### GridLayout

The `GridLayout` class supports infinite nesting and column/row-based
space allocation, based on an initial configuration and supporting
multiple column/row spans.

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/layout/grid-layout.png)

The code producing this structure:

```ts
import { gridLayout } from "@thi.ng/layout";

// create a single column layout @ position 10,10 / 200px wide
// the last values are row height and cell spacing
const layout = gridLayout(10, 10, 200, 1, 16, 4);

// get next layout box (1st row)
// usually you don't need to call .next() manually, but merely pass
// the layout instance to a component...
layout.next();
// { x: 10, y: 10, w: 200, h: 16, cw: 200, ch: 16, gap: 4 }

// 2nd row
layout.next();
// { x: 10, y: 30, w: 200, h: 16, cw: 200, ch: 16, gap: 4 }

// create nested 2-column layout (3rd row)
const twoCols = layout.nest(2);

twoCols.next();
// { x: 10, y: 50, w: 98, h: 16, cw: 98, ch: 16, gap: 4 }

twoCols.next();
// { x: 112, y: 50, w: 98, h: 16, cw: 98, ch: 16, gap: 4 }

// now nest 3-columns in the 1st column of twoCols
// (i.e. now each column is 1/6th of the main layout's width)
const inner = twoCols.nest(3);

// allocate with col/rowspan, here 1 column x 4 rows
inner.next([1, 4])
// { x: 10, y: 70, w: 30, h: 76, cw: 30, ch: 16, gap: 4 }
inner.next([1, 4])
// { x: 44, y: 70, w: 30, h: 76, cw: 30, ch: 16, gap: 4 }
inner.next([1, 4])
// { x: 78, y: 70, w: 30, h: 76, cw: 30, ch: 16, gap: 4 }

// back to twoCols (2nd column)
twoCols.next([1, 2]);
// { x: 112, y: 70, w: 98, h: 36, cw: 98, ch: 16, gap: 4 }
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
