<!-- This file is generated - DO NOT EDIT! -->

# ![hiccup-canvas](https://media.thi.ng/umbrella/banners/thing-hiccup-canvas.svg?d758ad8d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-canvas.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-canvas)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-canvas.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [SVG conversion](#svg-conversion)
- [Supported shape types](#supported-shape-types)
  - [Group](#group)
  - [Definition group](#definition-group)
  - [Circle](#circle)
  - [Circular arc](#circular-arc)
  - [Ellipse / elliptic arc](#ellipse--elliptic-arc)
  - [Rect](#rect)
  - [Line](#line)
  - [Horizontal Line](#horizontal-line)
  - [Vertical Line](#vertical-line)
  - [Polyline / Polygon](#polyline--polygon)
  - [Path](#path)
    - [SVG paths with arc segments](#svg-paths-with-arc-segments)
  - [Points](#points)
  - [Packed points](#packed-points)
  - [Text](#text)
  - [Image](#image)
  - [Gradients](#gradients)
- [Attributes](#attributes)
  - [Color attributes](#color-attributes)
    - [String](#string)
    - [Number](#number)
    - [Array](#array)
    - [@thi.ng/color values](#thingcolor-values)
  - [Coordinate transformations](#coordinate-transformations)
    - [Transform matrix](#transform-matrix)
    - [Override transform](#override-transform)
    - [Translation](#translation)
    - [Scaling](#scaling)
    - [Rotation](#rotation)
- [Authors](#authors)
- [License](#license)

## About

Hiccup shape tree renderer for vanilla Canvas 2D contexts. This is a support package for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup).

This package provides a simple `draw()` function, which accepts a scene tree of
different shape types in
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
syntax/format (i.e. nested arrays,
[`IToHiccup`](https://docs.thi.ng/umbrella/api/interfaces/IToHiccup.html)
implementations) and then translates these into canvas API draw calls.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhiccup-canvas%5D+in%3Atitle)

### Related packages

- [@thi.ng/hdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom-canvas) - [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) component wrapper for declarative canvas scenegraphs
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) - HTML/SVG/XML serialization of nested data structures, iterables & closures

## Installation

```bash
yarn add @thi.ng/hiccup-canvas
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/hiccup-canvas"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const hiccupCanvas = await import("@thi.ng/hiccup-canvas");
```

Package sizes (gzipped, pre-treeshake): ESM: 2.57 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                           | Description                                                          | Live demo                                                   | Source                                                                                   |
|:-------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------|:------------------------------------------------------------|:-----------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-fuzz.png" width="240"/>                         | geom-fuzz basic shape & fill examples                                | [Demo](https://demo.thi.ng/umbrella/geom-fuzz-basics/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-fuzz-basics)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-clock.png" width="240"/>             | Realtime analog clock demo                                           | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-clock/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-clock)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-draw.jpg" width="240"/>              | Interactive pattern drawing demo using transducers                   | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-draw/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-draw)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-particles.jpg" width="240"/>         | 2D Bezier curve-guided particle system                               | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-particles/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-particles) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-shapes)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hiccup-canvas-arcs.png" width="240"/>            | Animated arcs & drawing using hiccup-canvas                          | [Demo](https://demo.thi.ng/umbrella/hiccup-canvas-arcs/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hiccup-canvas-arcs)    |

## API

[Generated API docs](https://docs.thi.ng/umbrella/hiccup-canvas/)

The shape tree given to `draw()` MUST consist of standard, normalized
hiccup syntax (incl. objects implementing the `IToHiccup()` interface,
like the shape types provided by
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)).

## SVG conversion

Even though the shape element names & syntax are intentionally *very
similar* (largely the same) to SVG elements, for performance reasons all
geometry data given to each shape remains un-stringified (only styling
attributes can be strings). However, the
[@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg)
package provides a `convertTree()` function which takes the arguably
more "raw" shape format used by this package and converts an entire
shape tree into SVG compatible & serializable format.

It's very likely (and recommended) you're using the shape type provided [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom), in which case these can be provided as is to this package's `draw()` function and SVG conversion can be done like so:

```ts
import { asSvg, svgDoc, group, circle } from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";

const dots = group({}, [
    circle([100, 100], 20, { fill: "red" }),
    circle([140, 100], 20, { fill: "green" }),
    circle([160, 100], 20, { fill: "blue" }),
]);

// draw to canvas
draw(canvas.getContext("2d"), dots);

// convert to SVG
// (unless given, width, height and viewBox will be auto-computed)
asSvg(svgDoc({}, dots))
```

## Supported shape types

In the near future, factory functions for these shape types will be
provided...

### Group

```ts
["g", attribs, child1, child2, ...]
```

Attributes defined at group level are inherited by child elements.

### Definition group

```ts
["defs", {}, def1, def2, ...]
```

Special group / container for [gradient definitions](#gradients). If
used, should always come first in a scene tree.

### Circle

```ts
["circle", attribs, [x, y], radius]
```

### Circular arc

```ts
["arc", attribs, [x, y], radius, startAngle, endAngle, anticlockwise?]
```

Only circular arcs are supported in this format. Please see [note about
differences to SVG](#svg-paths-with-arc-segments).

### Ellipse / elliptic arc

```ts
["ellipse", attribs, [x, y], [rx, ry], axisTheta?, start?, end?, ccw?]
```

### Rect

```ts
["rect", attribs, [x, y], w, h, radius?]
```

If `radius` is given, creates a rounded rectangle. `radius` will be
clamped to `Math.min(w, h)/2`.

### Line

```ts
["line", attribs, [x1, y1], [x2, y2]]
```

### Horizontal Line

```ts
["hline", attribs, y]
```

### Vertical Line

```ts
["vline", attribs, x]
```

### Polyline / Polygon

```ts
["polyline", attribs, [[x1, y1], [x2, y2], [x3, y3]...]]
```

Always non-filled (even if `fill` attrib is given or inherited)

```ts
["polygon", attribs, [[x1, y1], [x2, y2], [x3, y3]...]]
```

Always closed, can be filled and/or stroked.

### Path

```ts
["path", attribs, [seg1, seg2, ...]]
```

Path segments are tuples of `[type, [x,y]...]`. The following segment
types are supported and (as with SVG), absolute and relative versions
can be used. Relative versions use lowercase letters and are always
relative to the end point of the previous segment. The first segment
(usually of type `"M"`) must be absolute.

| Format                               | Description              |
|--------------------------------------|--------------------------|
| `["M", [x, y]]`                      | Move                     |
| `["L", [x, y]]`                      | Line                     |
| `["H", x]`                           | Horizontal line          |
| `["V", y]`                           | Vertical line            |
| `["C", [x1,y1], [x2, y2], [x3, y3]]` | Cubic / bezier curve     |
| `["Q", [x1,y1], [x2, y2]]`           | Quadratic curve          |
| `["A", [x1,y1], [x2, y2], r]`        | Circular arc (see below) |
| `["Z"]`                              | Close (sub)path          |

#### SVG paths with arc segments

**IMPORTANT:** Currently, due to differences between SVG and canvas API
arc handling, SVG paths containing arc segments are **NOT** compatible
with the above format. [This
issue](https://github.com/thi-ng/umbrella/issues/69) is being worked on,
but in the meantime, to use such paths, these should first be converted
to use cubics or polygon / polyline. E.g. here using
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom):

```ts
import { normalizedPath, pathFromSVG, asPolyline } from "@thi.ng/geom";

// path w/ arc segments (*not* usable by hiccup-canvas)
const a = pathFromSvg("M0,0H80A20,20,0,0,1,100,20V30A20,20,0,0,1,80,50")[0];

// normalized to only use cubic curves (usable by hiccup-canvas)
const b = normalizedPath(a);

// converted to polyline (usable by hiccup-canvas)
const c = asPolyline(a);

asSvg(b);
// <path d="M0.00,0.00C26.67,0.00,53.33,0.00,80.00,0.00C..."/>

asSvg(c);
// <polyline fill="none" points="0.00,0.00 80.00,0.00 81.57,0.06..."/>
```

### Points

```ts
["points", attribs, [[x1,y1], [x2,y2],...]]
```

The following shape specific attributes are used:

- `shape`: `circle` or `rect` (default)
- `size`: point size (radius for circles, width for rects) - default: 1

### Packed points

Similar to `points`, but uses a single packed buffer for all point
coordinates.

```ts
["packedPoints", attribs, [x1,y1, x2,y2,...]]
```

Optional start index, number of points, component & point stride lengths
(number of indices between each vector component and each point
respectively) can be given as attributes.

Defaults:

- start index: 0
- number of points: (array_length - start) / estride
- component stride: 1
- element stride: 2

```ts
["packedPoints", { cstride: 1, estride: 4 },
    [x1, y1, 0, 0, x2, y2, 0, 0, ...]]

["packedPoints", { offset: 8, num: 3, cstride: 4, estride: 1 },
    [0, 0, 0, 0, 0, 0, 0, 0, x1, x2, x3, 0, y1, y2, y3, 0...]]
```

### Text

```ts
["text", attribs, [x,y], "body...", maxWidth?]
```

### Image

```ts
["img", { width?, height? }, img, dpos, spos?, ssize?]
```

**IMPORTANT**: Since v2.0.0 this element has new/changed args...

`img` MUST be an HTML image, canvas or video element. `dpos`, `spos`,
`ssize` are 2D vectors. The latter two are optional, as are `width` and `height` attribs. Defaults:

- `width` - original image width
- `height` - original image height
- `spos` - `[0,0]`
- `ssize` - `[width, height]`

Note: For SVG conversion `spos` & `ssize` will be ignored. Sub-image
blitting is not supported in SVG.

### Gradients

Gradients MUST be defined within a root-level `defs` group, which itself
MUST be given prior to any other shapes. Use the `$` prefix to refer to
a gradient in a `fill` or `stroke` attribute, e.g. `{stroke: "$foo" }`

```ts
["linearGradient",
    {id: "foo", from: [x1,y1], to: [x2, y2]},
    [[offset1, color1], [offset2, color2], ...]
]
```

```ts
["radialGradient",
    {id: "foo", from: [x1,y1], to: [x2, y2], r1: r1, r2: r2 },
    [[offset1, color1], [offset2, color2], ...]
]
```

## Attributes

Some attributes use different names than their actual names in the
`CanvasRenderingContext2D`:

| Attribute   | Context 2D property      |
|-------------|--------------------------|
| align       | textAlign                |
| alpha       | globalAlpha              |
| baseline    | textBaseline             |
| compose     | globalCompositeOperation |
| dash        | setLineDash              |
| dashOffset  | lineDashOffset           |
| direction   | direction                |
| fill        | fillStyle                |
| filter      | filter                   |
| font        | font                     |
| lineCap     | lineCap                  |
| lineJoin    | lineJoin                 |
| miterLimit  | miterLimit               |
| shadowBlur  | shadowBlur               |
| shadowColor | shadowColor              |
| shadowX     | shadowOffsetX            |
| shadowY     | shadowOffsetY            |
| smooth      | imageSmoothingEnabled    |
| stroke      | strokeStyle              |
| weight      | lineWidth                |

### Color attributes

Color conversions are only applied to `fill`, `stroke`, `shadowColor`
attributes and color stops provided to gradient definitions.

#### String

String color attribs prefixed with `$` are replaced with `url(#...)`
refs (e.g. to refer to  gradients), else used as is (untransformed)

#### Number

Interpreted as ARGB hex value:

`{ fill: 0xffaabbcc }` => `{ fill: "#aabbcc" }`

#### Array

Interpreted as float RGB(A):

`{ fill: [1, 0.8, 0.6, 0.4] }` => `{ fill: "rgba(255,204,153,0.40)" }`

#### @thi.ng/color values

Colors defined via the
[@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color)
package can be automatically converted to CSS color strings:

`{ fill: hcya(0.1666, 1, 0.8859) }` => `{ fill: "#ffff00" }`

### Coordinate transformations

Coordinate system transformations can be achieved via the following
attributes (for groups and individual shapes).
Nested transformations are supported.

If using a combination of `translate`, `scale` and/or `rotate` attribs,
the order of application is always TRS.

#### Transform matrix

```ts
{ transform: [xx, xy, yx, yy, ox, oy] }
```

#### Override transform

```ts
{ setTransform: [xx, xy, yx, yy, ox, oy] }
```

Similar to `transform` but completely overrides transformation matrix,
rather than concatenating with existing one.

See [MDN
docs](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform)
for further details.

Also see the [2x3 matrix functions in the
@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/develop/packages/matrices/README.md)
package for creating different kinds of transformation matrices, e.g.

```
{ transform: skewX23([], Math.PI / 12) }
```

#### Translation

```ts
{ translate: [x, y] }
```

#### Scaling

```ts
{ scale: [x, y] } // non-uniform
{ scale: x } // uniform
```

#### Rotation

```ts
{ rotate: theta } // in radians
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hiccup-canvas,
  title = "@thi.ng/hiccup-canvas",
  author = "Karsten Schmidt",
  note = "https://thi.ng/hiccup-canvas",
  year = 2018
}
```

## License

&copy; 2018 - 2022 Karsten Schmidt // Apache Software License 2.0
