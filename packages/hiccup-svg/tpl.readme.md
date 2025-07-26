<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

### Important

The functions provided here do produce valid hiccup elements, but
since none of them make use of (or support) the global hiccup / hdom
context object, they can ONLY be invoked directly, i.e. they MUST be
called like:

```ts
import { circle, svg } from "@thi.ng/hiccup-svg";

// correct (direct invocation)
svg({}, circle([0, 0], 100, { fill: "red" }));

// incorrect / unsupported (lazy evaluation)
[svg, {}, [circle, [0, 0], 100, { fill: "red" }]]
```

### SVG conversion of @thi.ng/geom & @thi.ng/hiccup-canvas shape trees

Since v2.0.0 this package provides a conversion utility to translate the more
compact syntax used by
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
and
[@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas)
shape trees (designed for more performant realtime / canvas drawing) into a SVG
serializable hiccup format.

The
[`convertTree()`](https://docs.thi.ng/umbrella/hiccup-svg/functions/convertTree.html)
function takes a pre-normalized hiccup tree of geom/hiccup-canvas shape
definitions and recursively converts it into an hiccup flavor which is ready for
SVG serialization (i.e. using stringified geometry attribs). This conversion
also involves translation & re-organization of various attributes. This function
returns a new tree. The original remains untouched, as will any unrecognized
tree / shape nodes (those will be transferred as-is to the result tree).
Conversion can be explicitly disabled for individual elements (tree branches) by
setting the `__convert: false` control attribute. See example below.

Tree conversion can be implicitly triggered by providing a `__convert: true`
attribute to the root `svg()` element. This conversion also supports the
`__prec` control attribute which can be used (on a per-shape basis) to control
the formatting used for various floating point values (except color
conversions). Child shapes (of a group) inherit the precision setting of their
parent.

```ts
import { svg } from "@thi.ng/hiccup-svg";

// create SVG root element and convert body
svg(
    { width: 100, height: 100, __convert: true, __prec: 3 },
    ["rect", { fill: [1, 0, 0] }, [1.2345, -1.2345], 100, 100]
)
// [
//   'svg',
//   {
//     version: '1.1',
//     xmlns: 'http://www.w3.org/2000/svg',
//     'xmlns:xlink': 'http://www.w3.org/1999/xlink',
//     width: 100,
//     height: 100
//   },
//   ['rect', { fill: '#ff0000', x: '1.234', y: '-1.234', width: '100', height: '100' }]
// ]
```

### Automatic attribute conversions

#### Colors

Since v3.1.0:

Color conversions are only applied to `fill` and `stroke` attributes and
color stops provided to `linearGradient()`, `radialGradient()`

##### String

String color attribs prefixed with `$` are replaced with `url(#...)`
refs (e.g. to refer to  gradients), else used as is (untransformed)

##### Number

Interpreted as ARGB hex value:

`{ fill: 0xffaabbcc }` => `{ fill: "#aabbcc" }`

##### Array

Interpreted as float RGB(A):

`{ fill: [1, 0.8, 0.6, 0.4] }` => `{ fill: "rgba(255,204,153,0.40)" }`

##### [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color) values

Converted to CSS color strings:

`{ fill: hcya(0.1666, 1, 0.8859) }` => `{ fill: "#ffff00" }`

#### Transforms

(i.e. `transform`, `rotate`, `scale`, `translate`)

If an element has a `transform` attrib, conversion of the other
transformation attribs will be skipped, else the values are assumed to
be either strings or:

- `transform`: 6-element numeric array ([2x3 matrix in column major
  order](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform#Matrix))
- `translate`: 2-element array
- `rotate`: number (angle in radians)
- `scale`: number (uniform scale) or 2-elem array

If no `transform`, but others are given, the resulting transformation
order will always be TRS. Any string values will be used as-is and
therefore need to be complete, e.g. `{ rotate: "rotate(60)" }`

{{meta.status}}

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
import * as svg from "@thi.ng/hiccup-svg";
import { serialize } from "@thi.ng/hiccup";
import * as fs "node:fs";

fs.writeFileSync(
    "hello.svg",
    serialize(
        svg.svg(
            { width: 100, height: 100 },
            svg.defs(svg.linearGradient("grad", [0, 0], [0, 1], [[0, "red"], [1, "blue"]])),
            svg.circle([50, 50], 50, { fill: "url(#grad)" }),
            svg.text([50, 55], "Hello", { fill: "white", "text-anchor": "middle" })
        )
    ));
```

Minimal example showing SVG conversion of a hiccup-canvas scene (also see
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
for another compatible approach):

```ts
import { svg } from "@thi.ng/hiccup-svg";
import { serialize } from "@thi.ng/hiccup";
import { writeFileSync } from "node:fs";

// scene tree defined for hiccup-canvas
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

writeFileSync(
    "radialgradient.svg",
    serialize(
        svg({ width: 300, height: 300, __convert: true }, scene)
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

<!-- include ../../assets/tpl/footer.md -->
