# @thi.ng/hiccup-svg

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-svg.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-svg)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-svg.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

SVG element functions for
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup)
&
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom).

This package's functionality was formerly part of
[@thi.ng/hdom-components](https://github.com/thi-ng/umbrella/tree/master/packages/hdom),
but has been extracted to remain more focused.

### Important

The functions provided here do produce valid hiccup elements, but
since none of them make use of (or support) the global hiccup / hdom
context object, they can ONLY be invoked directly, i.e. they MUST be
called like:

```ts
// correct (direct invocation)
svg.svg(svg.circle([0, 0], 100, { fill: "red" }));

// incorrect / unsupported (lazy evaluation)
[svg.svg, [svg.circle, [0, 0], 100, { fill: "red" }]]
```

### SVG conversion of hdom-canvas shape trees

Since v2.0.0 this package provides a conversion utility to translate the
more compact syntax used for
[@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/master/packages/hdom-canvas)
shape trees (designed for more performant realtime canvas drawing) into
a SVG serializable hiccup format.

The `convertTree()` function takes a normalized hiccup tree of
hdom-canvas shape definitions and recursively converts it into an hiccup
flavor which is ready for SVG serialization. This conversion also
involves translation & re-organization of various attributes. The
function returns a new tree. The original remains untouched, as will any
unrecognized tree/shape nodes (those will be transferred as-is to the
result tree). See example below.

## Installation

```bash
yarn add @thi.ng/hiccup-svg
```

## Dependencies

- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup)

## Usage examples

```ts
import * as svg from "@thi.ng/hiccup-svg";
import { serialize } from "@thi.ng/hiccup";
import * as fs from "fs";

fs.writeFileSync(
    "hello.svg",
    serialize(
        svg.svg(
            {width: 100, height: 100},
            svg.defs(svg.linearGradient("grad", 0, 0, 0, 1, [[0, "red"], [1, "blue"]])),
            svg.circle([50, 50], 50, {fill: "url(#grad)"}),
            svg.text("Hello", [50, 55], { fill: "white", "text-anchor": "middle"})
        )
    ));
```

Minimal example showing SVG conversion of a hdom-canvas scene:

```ts
// scene tree defined for hdom-canvas
const scene = [
    ["defs", {},
        ["radialGradient",
            { id: "bg", from: [150, 280], to: [150, 300], r1: 300, r2: 100 },
            [[0, "#07f"], [0.5, "#0ef"], [0.8, "#efe"], [1, "#af0"]]],
        ["radialGradient",
            { id: "sun", from: [110, 120], to: [110, 120], r1: 5, r2: 50 },
            [[0, "#fff"], [1, "rgba(255,255,192,0)"]]]
    ],
    ["circle", { fill: "$bg" }, [150, 150], 130],
    ["circle", { fill: "$sun" }, [110, 120], 50],
];

fs.writeFileSync(
    "radialgradient.svg",
    serialize(
        svg.svg({ width: 300, height: 300 }, svg.convertTree(scene))
    )
);
```

Result:

```xml
<svg version="1.1"
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
    <defs>
        <radialGradient id="bg" fx="150.00" fy="280.00" cx="150.00" cy="300.00" fr="300.00" r="100.00" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#07f"/>
            <stop offset="0.5" stop-color="#0ef"/>
            <stop offset="0.8" stop-color="#efe"/>
            <stop offset="1" stop-color="#af0"/>
        </radialGradient>
        <radialGradient id="sun" fx="110.00" fy="120.00" cx="110.00" cy="120.00" fr="5.00" r="50.00" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff"/>
            <stop offset="1" stop-color="rgb(255,255,192)" stop-opacity="0"/>
        </radialGradient>
    </defs>
    <circle cx="150.00" cy="150.00" r="130.00" fill="url(#bg)"/>
    <circle cx="110.00" cy="120.00" r="50.00" fill="url(#sun)"/>
</svg>
```

## Authors

- Karsten Schmidt

## License

&copy; 2016 - 2018 Karsten Schmidt // Apache Software License 2.0
