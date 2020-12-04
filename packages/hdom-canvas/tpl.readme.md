# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

This package provides a [re-usable canvas
component](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-canvas/src/index.ts#L66),
which accepts child nodes defining a scene tree of different shape types
in standard
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
syntax/format (i.e. nested arrays) and then translates these into canvas
API draw calls during the hdom update process / cycle.

${status}

### BREAKING CHANGES 3.0.0

The actual tree traversal & drawing has been extracted to the new
[@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas)
package for better re-usability, also outside without hdom.

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
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";

start(() => {
    const t = Date.now() * 0.001;
    return [canvas, { width: 100, height: 100 },
        ["circle", { fill: "red", stroke: "black" }, [50, 50], 25 + 25 * Math.sin(t)]
    ];
});
```

Usage with
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
shape primitives:

```ts
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import * as g from "@thi.ng/geom";

start(() => {
    const t = Date.now() * 0.001;
    return [canvas, { width: 100, height: 100 },
        g.group(
            { translate: [50, 50], fill: "none" },
            [
                g.withAttribs(
                    g.asPolygon(g.circle(50), 6),
                    { rotate: t % Math.PI, stroke: "red" }
                ),
                g.star(25 + 25 * Math.sin(t), 6, [0.5, 1], { stroke: "blue" }),
            ]
        )
    ];
});
```

## How it works

The package provides a `canvas` component which uses the branch-local
behavior implementation feature of
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
v5.0.0 to support virtual SVG-like shape elements / components. These
are defined as part of the main UI component tree just like any other
component, but are then translated into canvas API draw commands during
the hdom update process. Any embedded shape component functions receive
the user context object as first arg, just like normal hdom components.

Shape components are expressed in standard hiccup syntax (or as objects
implementing the `IToHiccup()` interface, like the shape types provided
by
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)),
and with the following...

### Restrictions & behavior controls

- Shape component objects with life cycle methods are only partially
  supported, i.e. only the `render` & `release` methods are used.
- For performance reasons `release` methods are disabled by default. If
  your shape tree contains stateful components which use the `release`
  life cycle method, you'll need to explicitly enable the canvas
  component's `__release` control attribute by setting it to `true`.
- Currently no event listeners can be assigned to shapes (ignored),
  though this is planned for a future version. The canvas element itself
  can of course have event handlers as usual.

For best performance it's recommended to ensure all resulting shapes
elements are provided in already normalized hiccup format, i.e.

```ts
[tag, {attribs}, ...] // or
[tag, null, ...]
```

That way the `__normalize: false` control attribute can be added either
to the canvas component itself (or to individual shapes / groups), and
if present, will skip normalization of that element's children.

Likewise, for animated scenes, the `__diff` control attribute should be
set to `false` to skip unnecessary diffing and force redraws.

To disable the automatic background clearing of the canvas, set the `__clear` attribute to `false`.

```ts
[canvas, { width: 100, height: 100, __clear: false }, ...]
```

### HDPI support

The canvas component automatically adjusts its size for HDPI displays by
adding CSS `width` & `height` properties and pre-scaling the drawing
context accordingly before any shapes are processed. For fullscreen
canvases simply set the `width` & `height` attribs to:

```ts
[canvas,
    {
        width: window.innerWidth,
        height: window.innerHeight
    },
    // shapes
    ...
]
```

## SVG conversion

Even though the element names & syntax are *very similar* to SVG
elements, for performance reasons all geometry data given to each shape
remains un-stringified (only styling attributes are). However, the
[@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg)
package provides a `convertTree()` function which takes the arguably
more "raw" shape format used by hdom-canvas and converts an entire shape
tree into SVG compatible & serializable format. Note: the tree MUST
first be normalized (if not already) using hdom-canvas'
`normalizeTree()`.

```ts
import { serialize } from "@thi.ng/hiccup";
import { convertTree, svg } from "@thi.ng/hiccup-svg";
import { normalizeTree } from "@thi.ng/hdom-canvas";

serialize(
    svg({ width: 100, height: 100},
        convertTree(
            normalizeTree(
                {}, // default normalization options
                ["g",
                    {
                        fill: "red",
                        stroke: "none",
                        translate: [50, 50]
                    },
                    ["circle", {}, [0, 0], 25],
                    ["polygon", { fill: "white" },
                        [[-10,10],[10,10],[0,-10]]
                    ]
                ]
            )
        )
    )
);
```

```xml
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">
    <g transform="translate(50.00 50.00)" fill="red" stroke="none">
        <circle cx="0.00" cy="0.00" r="25.00"/>
        <polygon points="-10.00,10.00 10.00,10.00 0.00,-10.00" fill="white"/>
    </g>
</svg>
```

## Supported shape types

Please see the [@thi.ng/hiccup-canvas
README](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas/README.md#supported-shape-types)
for the full list of supported shapes, gradients, attributes, colors and
transformations.

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
