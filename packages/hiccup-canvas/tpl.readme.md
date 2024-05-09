<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package provides a simple `draw()` function, which accepts a scene tree of
different shape types in
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
syntax/format (i.e. nested arrays,
[`IToHiccup`](https://docs.thi.ng/umbrella/api/interfaces/IToHiccup.html)
implementations) and then translates these into canvas API draw calls.

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

The shape tree given to
[`draw()`](https://docs.thi.ng/umbrella/hiccup-canvas/functions/draw.html) MUST
consist of well-formed, normalized hiccup syntax (incl. objects implementing the
`IToHiccup()` interface, like the shape types provided by
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

It's very likely (and recommended) you're using the shape type provided
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom),
in which case these can be provided as-is to this package's
[`draw()`](https://docs.thi.ng/umbrella/hiccup-canvas/functions/draw.html)
function and SVG conversion (from the same geometry) can be done like so:

```ts
import { asSvg, svgDoc, group, circle } from "@thi.ng/geom";
import { canvas2d } from "@thi.ng/canvas";
import { draw } from "@thi.ng/hiccup-canvas";

const dots = group({}, [
    circle([100, 100], 20, { fill: "red" }),
    circle([140, 100], 20, { fill: "green" }),
    circle([160, 100], 20, { fill: "blue" }),
]);

const { ctx } = canvas2d(200, 200, document.body);

// draw geometry group to canvas
draw(ctx, dots);

// convert to SVG
// (unless given, width, height and viewBox will be auto-computed)
asSvg(svgDoc({}, dots))
```

## Supported shape types

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

### Circle / circular arc

```ts
["circle", attribs, [x, y], radius, startTheta?, endTheta?, ccw?]
```

Angles in radians. Please see [note about SVG support](#svg-paths-with-arc-segments).

### Ellipse / elliptic arc

```ts
["ellipse", attribs, [x, y], [rx, ry], axisTheta?, startTheta?, endTheta?, ccw?]
```

Angles in radians. Please see [note about SVG support](#svg-paths-with-arc-segments).

### Rect

```ts
["rect", attribs, [x, y], w, h, radii?]
```

If `radii` is given, creates a rounded rectangle. See [Canvas API
roundRect()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect)
for possible radius values.

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

| Format                                                   | Description                                  |
|----------------------------------------------------------|----------------------------------------------|
| `["M", [x, y]]`                                          | Move                                         |
| `["L", [x, y]]`                                          | Line                                         |
| `["H", x]`                                               | Horizontal line                              |
| `["V", y]`                                               | Vertical line                                |
| `["C", [x1,y1], [x2, y2], [x3, y3]]`                     | Cubic / bezier curve                         |
| `["Q", [x1,y1], [x2, y2]]`                               | Quadratic curve                              |
| `["A", rx, ry, theta, large-arc-flag, clockwise, [x,y]]` | Elliptic arc (SVG compatible, see below)     |
| `["R", [x1,y1], [x2, y2], r]`                            | Circular arc (not SVG compatible, see below) |
| `["Z"]`                                                  | Close (sub)path                              |

> [!IMPORTANT]
> Prior to v3.0.0, only circular arc segments were supported and used the
> `A`/`a` identifier, which actually should have been reserved for SVG-style
> elliptic arcs (as is the case now). In the unlikely event you've been using
> paths with circular arc segments, you'll need to update these to use `R`/`r`
> segment types instead.

#### SVG paths with arc segments

Reference about the params for arc segments:

- [circular arc](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc)
- [elliptic arc](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve)

Since v3.0.0 this package supports both circular and elliptic arc path segments,
however only the latter segment type is compatible with SVG (circular arcs are
only supported by the HTML Canvas API). We recommended to use one of the
available path constructor functions in
[@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) to
create individual arcs or paths which ensure SVG compatibility:

Arcs:

- [`arc()`](https://docs.thi.ng/umbrella/geom/functions/arc-1.html)
- [`arcFrom2Points()`](https://docs.thi.ng/umbrella/geom/functions/arcFrom2Points.html)

Paths:

- [`pathFromSvg()`](https://docs.thi.ng/umbrella/geom/functions/pathFromSvg.html)
- [`pathBuilder()`](https://docs.thi.ng/umbrella/geom/functions/pathBuilder-1.html)
- [`pathFromCubics()`](https://docs.thi.ng/umbrella/geom/functions/pathFromCubics.html)
- [`normalizedPath()`](https://docs.thi.ng/umbrella/geom/functions/normalizedPath.html)
- [`roundedRect()`](https://docs.thi.ng/umbrella/geom/functions/roundedRect.html)

```ts tangle:export/readme-path.ts
import { asPolyline, asSvg, normalizedPath, pathFromSVG, roundedRect } from "@thi.ng/geom";

// path w/ elliptic arc segments (for 2 of the corners)
const a = roundedRect([0, 0], [100, 100], [0, 40]);

console.log(asSvg(a));
// <path d="M0,0H60A40,40,0,0,1,100,40V100H40A40,40,0,0,1,0,60.000V0z"/>

// normalize path to only use cubic curves
const b = normalizedPath(a);

console.log(asSvg(b));
// <path d="M0,0C20,0,40,0,60,0C82.091,0,100,17.909,100,40C100,60,100,80,100,100C80,100,60,100,40,100C17.909,100,0.000,82.091,0,60.000C0,40,0,20,0,0z"/>

// convert/sample path as polyline
// (some paths have multiple boundaries, here we only want the first)
const c = asPolyline(a, { dist: 20 })[0];

console.log(asSvg(c));
// <polyline fill="none" points="0,0 20,0 40,0 60,0 79.168,4.924 93.644,18.410 99.889,37.186 100,40 100,60 100,80 100,100 80,100 60,100 40,100 20.832,95.076 6.356,81.590 0.111,62.814 0,60 0,40 0,20 0,0"/>
```

### Points

```ts
["points", attribs, [[x1,y1], [x2,y2],...]]
```

The following shape specific attributes are used:

- `shape`: `circle` or `rect` (default)
- `size`: point size (radius for circles, width for rects) - default: 1

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

### Using flat, packed vertex buffers

The `points`, `polyline` and `polygon` shape types also provide alternative
versions, each allowing the use of a single packed buffer (e.g. typed array) for
all point coordinates instead of individual arrays/views per vertex. This much
simplifies & speeds up WASM interop usecases, which can now skip creating vector
views of a vertexbuffer memory region.

```ts
["packedPoints", attribs, [x1,y1, x2,y2,...]]

["packedPolyline", attribs, [x1,y1, x2,y2,...]]

["packedPolygon", attribs, [x1,y1, x2,y2,...]]
```

Optional start index, number of points, component & element stride lengths (i.e.
the number of indices between each vector x/y component and/or each point
respectively) can be given as attributes and thus these packaged shapes support
both AOS and SOA memory layouts/arrangements.

Options & defaults:

- `start`: start index = 0
- `num`: number of vertices = `(array_length - start) / estride`
- `cstride`: component stride = 1
- `estride`: element stride = 2

```ts
["packedPoints", { cstride: 1, estride: 4 },
    [x1, y1, 0, 0, x2, y2, 0, 0, ...]]

["packedPoints", { offset: 8, num: 3, cstride: 4, estride: 1 },
    [0, 0, 0, 0, 0, 0, 0, 0, x1, x2, x3, 0, y1, y2, y3, 0...]]
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

### Special attributes

#### Background fill

The special `__background` attribute can be used to fill the entire canvas with
a given background color. The attribute only makes sense if attached to the root
group/shape and can take the same values as any other [color
attribs](#color-attributes).

#### Background clear

The special `__clear` boolean attribute is used to force clearing of the canvas
before drawing. This attrib takes priority over `__background` and it too only
should be attached to the root group/shape. By default the canvas is **not**
being cleared.

<!-- include ../../assets/tpl/footer.md -->
