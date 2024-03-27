<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/ramp](https://media.thi.ng/umbrella/banners-20230807/thing-ramp.svg?4bf9a6f2)

[![npm version](https://img.shields.io/npm/v/@thi.ng/ramp.svg)](https://www.npmjs.com/package/@thi.ng/ramp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/ramp.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Numeric](#numeric)
  - [nD vectors](#nd-vectors)
  - [Nested objects](#nested-objects)
  - [Grouped & nested ramps](#grouped--nested-ramps)
- [Authors](#authors)
- [License](#license)

## About

Extensible keyframe interpolation/tweening of arbitrary, nested types.

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/ramp/readme.png)

This package can perform keyframe interpolation for ramps of numeric values,
n-dimensional vectors and nested objects of the same. It provides linear and
cubic hermite interpolation out of the box, but can be extended by implementing
a simple interface to achieve other interpolation methods.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bramp%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/ramp
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/ramp"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const ramp = await import("@thi.ng/ramp");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.84 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                              | Description                                              | Live demo                                              | Source                                                                              |
|:------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ramp-scroll-anim.png" width="240"/> | Scroll-based, reactive, multi-param CSS animation basics | [Demo](https://demo.thi.ng/umbrella/ramp-scroll-anim/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ramp-scroll-anim) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ramp-synth.png" width="240"/>       | Unison wavetable synth with waveform editor              | [Demo](https://demo.thi.ng/umbrella/ramp-synth/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ramp-synth)       |

## API

[Generated API docs](https://docs.thi.ng/umbrella/ramp/)

### Numeric

```ts tangle:export/readme.ts
import { linear, hermite } from "@thi.ng/ramp";

const rampL = linear([[0.1, 0], [0.5, 1], [0.9, 0]]);
const rampH = hermite([[0.1, 0], [0.5, 1], [0.9, 0]]);

for(let i = 0; i <= 10; i++) {
    const t = i / 10;
    console.log(t, rampL.at(t).toFixed(2), rampH.at(t).toFixed(2));
}

// 0   0.00 0.00
// 0.1 0.00 0.00
// 0.2 0.25 0.16
// 0.3 0.50 0.50
// 0.4 0.75 0.84
// 0.5 1.00 1.00
// 0.6 0.75 0.84
// 0.7 0.50 0.50
// 0.8 0.25 0.16
// 0.9 0.00 0.00
// 1   0.00 0.00
```

### nD vectors

```ts tangle:export/readme-vector.ts
import { HERMITE_V, VEC3, ramp } from "@thi.ng/ramp";
import { FORMATTER } from "@thi.ng/vectors";

// use the generic `ramp()` factory function with a custom implementation
// see: https://docs.thi.ng/umbrella/ramp/interfaces/RampImpl.html
const rgb = ramp(
    // use a vector interpolation preset with the VEC3 API
    HERMITE_V(VEC3),
    // keyframes
    [
        [0.0, [1, 0, 0]], // red
        [0.5, [0, 1, 0]], // green
        [1.0, [0, 0, 1]], // blue
    ]
);

for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    console.log(t, FORMATTER(rgb.at(t)));
}

// 0    [1.000, 0.000, 0.000]
// 0.05 [0.972, 0.028, 0.000]
// 0.1  [0.896, 0.104, 0.000]
// 0.15 [0.784, 0.216, 0.000]
// 0.2  [0.648, 0.352, 0.000]
// 0.25 [0.500, 0.500, 0.000]
// 0.3  [0.352, 0.648, 0.000]
// 0.35 [0.216, 0.784, 0.000]
// 0.4  [0.104, 0.896, 0.000]
// 0.45 [0.028, 0.972, 0.000]
// 0.5  [0.000, 1.000, 0.000]
// 0.55 [0.000, 0.972, 0.028]
// 0.6  [0.000, 0.896, 0.104]
// 0.65 [0.000, 0.784, 0.216]
// 0.7  [0.000, 0.648, 0.352]
// 0.75 [0.000, 0.500, 0.500]
// 0.8  [0.000, 0.352, 0.648]
// 0.85 [0.000, 0.216, 0.784]
// 0.9  [0.000, 0.104, 0.896]
// 0.95 [0.000, 0.028, 0.972]
// 1    [0.000, 0.000, 1.000]
```

### Nested objects

```ts tangle:export/readme-nested.ts
import { HERMITE_V, LINEAR_N, VEC2, nested, ramp } from "@thi.ng/ramp";

const r = ramp(
    nested({
        a: LINEAR_N,
        b: nested({
            c: HERMITE_V(VEC2),
        }),
    }),
    [
        [0, { a: 0, b: { c: [100, 100] } }],
        [0.5, { a: 10, b: { c: [300, 50] } }],
        [1, { a: -10, b: { c: [200, 120] } }],
    ]
);

// produce an iterator of N uniformly spaced sample points
// across the full range of the ramp
console.log([...r.samples(10)]);

// [
// 	[0, { a: 0, b: { c: [100, 100] } }],
// 	[0.1, { a: 2, b: { c: [120.8, 94.8] } }],
// 	[0.2, { a: 4, b: { c: [170.4, 82.4] } }],
// 	[0.3, { a: 6, b: { c: [229.6, 67.6] } }],
// 	[0.4, { a: 8, b: { c: [279.2, 55.2] } }],
// 	[0.5, { a: 10, b: { c: [300, 50] } }],
// 	[0.6, { a: 6, b: { c: [289.6, 57.28] } }],
// 	[0.7, { a: 2, b: { c: [264.8, 74.64] } }],
// 	[0.8, { a: -2, b: { c: [235.2, 95.36] } }],
// 	[0.9, { a: -6, b: { c: [210.4, 112.72] } }],
// 	[1, { a: -10, b: { c: [200, 120] } }]
// ]
```

### Grouped & nested ramps

```ts tangle:export/readme-group.ts
import { group, linear, wrap } from "@thi.ng/ramp";

const example = group({
    // child timeline with looping behavior
    a: linear([[0, 0], [20, 100]], { domain: wrap }),
    // another child timeline
    b: linear([[10, 100], [90, 200]]),
});

console.log(JSON.stringify([...example.samples(10, 0, 100)]));
// [
// 	[0, { a: 0, b: 100 }],
// 	[10, { a: 50, b: 100 }],
// 	[20, { a: 100, b: 112.5 }],
// 	[30, { a: 50, b: 125 }],
// 	[40, { a: 100, b: 137.5 }],
// 	[50, { a: 50, b: 150 }],
// 	[60, { a: 0, b: 162.5 }],
// 	[70, { a: 50, b: 175 }],
// 	[80, { a: 0, b: 187.5 }],
// 	[90, { a: 50, b: 200 }],
// 	[100, { a: 50, b: 200 }]
// ]
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-ramp,
  title = "@thi.ng/ramp",
  author = "Karsten Schmidt",
  note = "https://thi.ng/ramp",
  year = 2019
}
```

## License

&copy; 2019 - 2024 Karsten Schmidt // Apache License 2.0
