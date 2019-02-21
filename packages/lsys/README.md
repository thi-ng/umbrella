# @thi.ng/lsys

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/lsys.svg)](https://www.npmjs.com/package/@thi.ng/lsys)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/lsys.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Default turtle](#default-turtle)
    - [Options](#options)
    - [Symbols](#symbols)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Small, functional, highly customizable, iterator based
[L-System](https://en.wikipedia.org/wiki/L-system) architecture for
arbitrary rules, with separation between symbol expansion and
interpretation / execution. A base 2D turtle implementation is included.
0.5KB gzipped.

Partially based on Clojure version of
[@thi.ng/thingybot](https://github.com/thi-ng/thingybot).

## Installation

```bash
yarn add @thi.ng/lsys
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/master/packages/compose)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

| Examples                                                                               |                                                                                        |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| ![example](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/lsys-0.png) | ![example](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/lsys-1.png) |
| ![example](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/lsys-2.png) | ![example](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/lsys-3.png) |

```ts
import * as lsys from "@thi.ng/lsys";
import * as g from "@thi.ng/geom";
import * as fs from "fs";

// example L-Systems shown above

const examples = [
    { rules: { s: "[f++f++f]", f: "f+f--f+f" }, delta: Math.PI / 3, iter: 5 },
    { rules: { s: "[f-f-f-f-f-f-f-f]", f: "f---f+f+f+f+f+f+f---f" }, delta: Math.PI / 4, iter: 6 },
    { rules: { s: "[x]", x: "-yf+xfx+fy-", y: "+xf-yfy-fx+" }, delta: Math.PI / 2, iter: 7 },
    { rules: { s: "[a]", a: "a-b--b+a++aa+b-", b: "+a-bb--b-a++a+b" }, delta: Math.PI / 3, iter: 5 }
];

const impl = lsys.TURTLE_IMPL_2D;

examples.forEach(({ rules, delta, iter }, i) =>
    fs.writeFileSync(
        `lsys-ex${i}.svg`,
        g.asSvg(
            g.svgDoc(
                { stroke: "#00f", "stroke-width": 0.25, width: 600, height: 600 },
                ...lsys.interpret(
                    // create turtle instance with customized delta (rot angle)
                    lsys.turtle2d({ delta }),
                    // customize implementation to process syms "a" & "b" as "f"
                    { ...impl, a: impl.f, b: impl.f },
                    // recursively expand start rule "s"
                    lsys.expand(rules, "s", iter)
                    //convert result paths to polylines for SVG export
                ).paths.map(g.polyline)
            )
        )
    )
);
```

## Default turtle

### Options

The `turtle2d()` function creates a new state object for the L-System
interpreter (`interpret()`). The initial state can be customized by
providing a config object with the following options:

```ts
/**
 * Start position. Default: [0,0]
 */
pos: Vec;
/**
 * Start direction (in radians). Default: 0
 */
theta: number;
/**
 * Rotation angle for "+" / "-" symbols.
 * Default: PI/2
 */
delta: number;
/**
 * Step distance. Default 1
 */
step: number;
/**
 * Decay factor for `delta`. Should be in (0,1) interval.
 * Default 0.9
 */
decayDelta: number;
/**
 * Decay factor for `step`. Should be in (0,1) interval.
 * Default 0.9
 */
decayStep: number;
```

### Symbols

- `f` - move forward
- `+` - rotate ccw
- `-` - rotate cw
- `>` - shrink rotation angle
- `<` - grow rotation angle
- `!` - decay step distance
- `^` - grow step distance
- `[` - start branch / store context on stack
- `]` - end branch / pop context from stack

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
