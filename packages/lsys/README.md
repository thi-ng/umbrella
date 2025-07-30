<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/lsys](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-lsys.svg?48d6b1df)

[![npm version](https://img.shields.io/npm/v/@thi.ng/lsys.svg)](https://www.npmjs.com/package/@thi.ng/lsys)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/lsys.svg)
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
  - [Blog posts](#blog-posts)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Stochastic behaviors](#stochastic-behaviors)
- [Default turtle](#default-turtle)
  - [Options](#options)
  - [Symbols](#symbols)
- [Authors](#authors)
- [License](#license)

## About

Small, functional, highly customizable, iterator based
[L-System](https://en.wikipedia.org/wiki/L-system) architecture for
arbitrary rules, basic support for stochastic behaviors and with
separation between symbol expansion and interpretation / execution. A
base 2D turtle implementation is included. 0.6KB gzipped.

Partially based on Clojure version of
[@thi.ng/thingybot](https://github.com/thi-ng/thingybot).

Planned features:

- [ ] parametric grammars
- [ ] max expansion length enforcement
- [ ] convergence testing
- [ ] 3D turtle implementation

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Blsys%5D+in%3Atitle)

### Blog posts

- [Workshop report: Generative design with Clojure](https://medium.com/@thi.ng/workshop-report-generative-design-with-clojure-7d6d8ea9a6e8)

## Installation

```bash
yarn add @thi.ng/lsys
```

ESM import:

```ts
import * as lsys from "@thi.ng/lsys";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/lsys"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const lsys = await import("@thi.ng/lsys");
```

Package sizes (brotli'd, pre-treeshake): ESM: 728 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/lsys/)

| Examples                                                                                    |                                                                                             |
|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| ![example](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/lsys/lsys-0.png) | ![example](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/lsys/lsys-1.png) |
| ![example](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/lsys/lsys-2.png) | ![example](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/lsys/lsys-3.png) |

```ts tangle:export/readme-1.ts
import { expand, interpret, turtle2d, TURTLE_IMPL_2D } from "@thi.ng/lsys";
import { asSvg, svgDoc, polyline } from "@thi.ng/geom";
import { writeFileSync } from "node:fs";

const PI = Math.PI;
const impl = TURTLE_IMPL_2D;

// example L-Systems shown above

const examples = [
    { rules: { s: "[f++f++f]", f: "f+f--f+f" }, delta: PI / 3, iter: 5 },
    { rules: { s: "[f-f-f-f-f-f-f-f]", f: "f---f+f+f+f+f+f+f---f" }, delta: PI / 4, iter: 6 },
    { rules: { s: "[x]", x: "-yf+xfx+fy-", y: "+xf-yfy-fx+" }, delta: PI / 2, iter: 7 },
    { rules: { s: "[a]", a: "a-b--b+a++aa+b-", b: "+a-bb--b-a++a+b" }, delta: PI / 3, iter: 5 }
];

examples.forEach(({ rules, delta, iter }, i) =>
    writeFileSync(
        `lsys-ex${i}.svg`,
        asSvg(
            svgDoc(
                { stroke: "#00f", weight: 0.25, width: 600, height: 600 },
                ...interpret(
                    // create turtle instance with customized delta (rot angle)
                    turtle2d({ delta }),
                    // customize implementation to process syms "a" & "b" as "f"
                    { ...impl, a: impl.f, b: impl.f },
                    // recursively expand start rule "s"
                    expand(rules, "s", iter)
                    //convert result paths to polylines for SVG export
                ).paths.map((pts) => polyline(pts))
            )
        )
    )
);
```

### Stochastic behaviors

The built-in default turtle implementation supports some basic
stochastic features, e.g. randomization of growth direction and
stochastic branch termination. This enables the creation of more organic
looking structures, like shown in the following example:

 ![stochastic L-system](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/lsys/lsys-tree.png)

```ts tangle:export/readme-2.ts
import { expand, interpret, turtle2d, TURTLE_IMPL_2D } from "@thi.ng/lsys";
import { XsAdd } from "@thi.ng/random";

const PI = Math.PI;
const impl = TURTLE_IMPL_2D;

interpret(
    // create turtle instance with customized delta (rot angle)
    turtle2d({
        // initial movement step distance
        step: 20,
        // initial direction
        theta: -PI / 2,
        // rotation offset
        delta: PI / 10,
        // direction jitter (percentage of delta, i.e. here 50%)
        jitter: 0.5,
        // initial survival chance
        aliveProb: 0.999,
        // decay factors for rotation, step, branch survival chance
        decayDelta: 0.98,
        decayStep: 0.85,
        decayAlive: 0.975,
        // use seedable PRNG for deterministic outcome
        rnd: new XsAdd(0x7337c0de)
    }),
    // process syms "a" & "g" as "f"
    { ...impl, a: impl.f, g: impl.f },
    // recursively expand start rule "s" by ping-ponging between f & g
    // (only difference between f & g is swapped branch orientations)
    // see description of all symbols further below
    expand(
        {
            s: "[f]",
            f: "a[kp!>/-g]/a[kp!>/+g]",
            g: "a[kp!>/+f]/a[kp!>/-f]"
        },
        "s",
        13
    )
)
```

## Default turtle

### Options

The `turtle2d()` function creates a new state object for the L-System
interpreter (`interpret()`). The initial state can be customized by
providing a config object with the following options:

```ts
/**
 * Current position
 */
pos: Vec;
/**
 * Current direction (in radians)
 */
theta: number;
/**
 * Rotation angle for "+" / "-" symbols
 */
delta: number;
/**
 * Max. random direction change when processing "/" symbol.
 * Normalized percentage of `delta`. Default: 0.25 (25%)
 */
jitter: number;
/**
 * Step distance. Default: 1
 */
step: number;
/**
 * Probability to keep current branch alive when processing "k"
 * symbol. Default: 0.99
 */
aliveProb: number;
/**
 * Decay factor for `delta`. Should be in (0,1) interval.
 * Default: 0.9
 */
decayDelta: number;
/**
 * Decay factor for `step`. Should be in (0,1) interval.
 * Default: 0.9
 */
decayStep: number;
/**
 * Decay factor for `aliveProp`.
 * Default: 0.95
 */
decayAlive: number;
/**
 * PRNG to use for probability checks. Default: SYSTEM
 */
rnd: IRandom;
```

### Symbols

- `f` - move forward & add to current path
- `g` - move forward & start new path
- `+` - rotate ccw
- `-` - rotate cw
- `>` - shrink rotation angle offset
- `<` - grow rotation angle offset
- `/` - jitter direction
- `k` - stochastically kill branch
- `p` - decay survival chance
- `P` - increase survival chance
- `!` - decay step distance
- `^` - grow step distance
- `[` - start branch / store context on stack
- `]` - end branch / pop context from stack

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-lsys,
  title = "@thi.ng/lsys",
  author = "Karsten Schmidt",
  note = "https://thi.ng/lsys",
  year = 2019
}
```

## License

&copy; 2019 - 2025 Karsten Schmidt // Apache License 2.0
