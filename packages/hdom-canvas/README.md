# @thi.ng/hdom-canvas

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/hdom-canvas.svg)](https://www.npmjs.com/package/@thi.ng/hdom-canvas)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Supported shape types](#supported-shape-types)
    - [Group](#group)
    - [Circle](#circle)
    - [Rect](#rect)
    - [Line](#line)
    - [Polyline / Polygon](#polyline--polygon)
    - [Path](#path)
    - [Points](#points)
    - [Text](#text)
    - [Gradients](#gradients)
- [Attributes](#attributes)
- [Coordinate transformations](#coordinate-transformations)
    - [Transform matrix](#transform-matrix)
    - [Translation](#translation)
    - [Scaling](#scaling)
    - [Rotation](#rotation)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Declarative canvas scenegraph & visualization for
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom).

### Status

ALPHA - in active development, possibly breaking changes ahead...

## Installation

```bash
yarn add @thi.ng/hdom-canvas
```

## Dependencies

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Please see the [hdom-canvas-clock]() example for reference.

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

## Supported shape types

### Group

```ts
["g", attribs, child1, child2, ...]
```

Attributes defined at group level are inherited by child elements.

### Circle

```ts
["circle", attribs, [x, y], r]
```

### Rect

```ts
["rect", attribs, [x, y], w, h, r?]
```

If `r` is given, creates a rounded rectangle. `r` will be clamped to `Math.min(w, h)/2`.

### Line

```ts
["line", attribs, [x1, y1], [x2, y2]]
```

### Polyline / Polygon

```ts
["polyline", attribs, [[x1, y1], [x2, y2], [x3, y3]...]]
```

Always non-filled (even if `fill` attrib given or inherited)

```ts
["polygon", attribs, [[x1, y1], [x2, y2], [x3, y3]...]]
```

Always closed, filled and/or stroked.

### Path

```ts
["path", attribs, [seg1, seg2, ...]]
```

Path segments are tuples of `[type, [x,y]...]`. The following segment types are supported and (as with SVG), absolute and relative versions can be used. Relative versions use lowercase letters.

| Format                               | Description          |
|--------------------------------------|----------------------|
| `["M", [x, y]]`                      | Move                 |
| `["L", [x, y]]`                      | Line                 |
| `["H", x]`                           | Horizontal line      |
| `["V", y]`                           | Vertical line        |
| `["C", [x1,y1], [x2, y2], [x3, y3]]` | Cubic / bezier curve |
| `["Q", [x1,y1], [x2, y2]]`           | Quadratic curve      |
| `["A", [x1,y1], [x2, y2], r]`        | Arc                  |
| `["Z"]`                              | Close (sub)path      |

### Points

```ts
["points", attribs, [[x1,y1], [x2,y2],...]]
```

### Text

```ts
["text", attribs, [x,y], "body..."]
```

### Gradients

Gradients MUST be defined at the root level of the scene tree and prior to shapes using them. Use the `$` prefix to refer to a gradient in a `fill` or `stroke` attribute, e.g. `{stroke: "$foo" }`

```ts
["linearGradient",
    {id: "foo", from: [x1,y1], to: [x2, y2]},
    [offset1, color1],
    [offset2, color2],
    ...
]
```

```ts
["radialGradient",
    {id: "foo", from: [x1,y1], to: [x2, y2], r1: r1, r2: r2 },
    [offset1, color1],
    [offset2, color2],
    ...
]
```

## Attributes

Some attributes use different names than their actual names in the
`CanvasRenderingContext2D`:

| Attribute   | Context 2D property      |
|-------------|--------------------------|
| align       | textAlign                |
| alpha       | globalAlpha              |
| baseLine    | textBaseline             |
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

## Coordinate transformations

Coordinate system transformations can be achieved via the following attributes. Nested transformations are supported.

If using a combination of `translate`, `scale` and/or `rotate` attribs,
the order of application is always TRS.

### Transform matrix

```ts
{ transform: [xx, xy, yx, yy, ox, oy] }
```

### Translation

```ts
{ translate: [x, y] }
```

### Scaling

```ts
{ scale: [x, y] } // non-uniform
{ scale: x } // uniform
```

### Rotation

```ts
{ rotate: theta } // in radians
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
