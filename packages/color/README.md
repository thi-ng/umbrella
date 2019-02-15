# @thi.ng/color

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/color.svg)](https://www.npmjs.com/package/@thi.ng/color)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/color.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Color spaces / modes](#color-spaces--modes)
    - [RGBA transformations](#rgba-transformations)
    - [RGBA Porter-Duff compositing](#rgba-porter-duff-compositing)
    - [Cosine gradients](#cosine-gradients)
    - [Multi-stop gradients](#multi-stop-gradients)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Raw, array-based, color operations, color space conversions, optional type
wrappers, multi-color gradients, based on
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors).

### Color spaces / modes

Fast color space conversions (any direction) between:

- CSS (string, hex3/hex4/hex6/hex8, rgba(), hsla(), named colors)
- HCYA (float4)
- HSIA (float4)
- HSLA (float4)
- HSVA (float4)
- Int32 (uint32, `0xaarrggbb`)
- RGBA (float4)
- XYZA (float4, aka CIE 1931)
- YCbCr (float4)

Apart from `CSS` and `Int32` colors, all others can be stored as plain
arrays, typed array or custom array-like types of (mostly) normalized
values (`[0,1]` interval). Where applicable, the hue too is stored in
that range, NOT in degrees.

Apart from conversions, most other operations provided by this package
are currently only supporting RGBA colors. These can also be converted
to / from sRGB (i.e. linear vs gamma corrected). Additionally, RGBA
colors can be pre-multiplied (and post-multiplied) with their alpha
channel (see [Porter-Duff](#rgba-porter-duff-compositing) section
below).

#### Class wrappers

The package provides lightweight class wrappers for each color mode /
space. These wrappers act similarly to the `Vec2/3/4` wrappers in
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors),
support striding (for mapped memory views), named channel accessor
aliases (in addition to array indexing) and are fully compatible with
all functions (and act as syntax sugar for generic conversion
functions). Wrapper factory functions are provided for convenience.

### RGBA transformations

RGBA [color matrix
transformations](https://github.com/thi-ng/umbrella/tree/master/packages/color/src/transform.ts),
including parametric preset transforms:

- brightness
- contrast
- exposure
- saturation (luminance aware)
- hue rotation
- color temperature (warm / cold)
- sepia (w/ fade amount)
- tint (green / magenta)
- grayscale (luminance aware)
- subtraction/inversion (also available as non-matrix op)
- luminance to alpha

Transformation matrices can be combined using matrix multiplication /
concatenation (`concat()`) for more efficient application.

### RGBA Porter-Duff compositing

The package provides all 12 basic
[Porter-Duff](https://github.com/thi-ng/umbrella/tree/master/packages/color/src/porter-duff.ts)
compositing / blending operators, both for colors with pre-multiplied
alpha and without.

![porter-duff compositing modes](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/porter-duff.png)

([Image source](http://www.svgopen.org/2005/papers/abstractsvgopen/#PorterDuffMap))

### Cosine gradients

- [Original article](http://www.iquilezles.org/www/articles/palettes/palettes.htm)
- [Gradient generator](http://dev.thi.ng/gradients/)

The following presets are bundled (in [`cosine-gradients.ts`](https://github.com/thi-ng/umbrella/tree/master/packages/color/src/cosine-gradients.ts)):

|                                                                |                                                                  |
|----------------------------------------------------------------|------------------------------------------------------------------|
| ![](http://media.thi.ng/color/presets/rainbow1.svg)            | ![](http://media.thi.ng/color/presets/rainbow2.svg)              |
| rainbow1                                                       | rainbow2                                                         |
| ![](http://media.thi.ng/color/presets/rainbow3.svg)            | ![](http://media.thi.ng/color/presets/rainbow4.svg)              |
| rainbow3                                                       | rainbow4                                                         |
| ![](http://media.thi.ng/color/presets/yellow-magenta-cyan.svg) | ![](http://media.thi.ng/color/presets/orange-blue.svg)           |
| yellow-magenta-cyan preset                                     | orange-blue                                                      |
| ![](http://media.thi.ng/color/presets/green-magenta.svg)       | ![](http://media.thi.ng/color/presets/green-red.svg)             |
| green-magenta                                                  | green-red                                                        |
| ![](http://media.thi.ng/color/presets/green-cyan.svg)          | ![](http://media.thi.ng/color/presets/blue-cyan.svg)             |
| green-cyan                                                     | blue-cyan                                                        |
| ![](http://media.thi.ng/color/presets/yellow-red.svg)          | ![](http://media.thi.ng/color/presets/red-blue.svg)              |
| yellow-red                                                     | red-blue                                                         |
| ![](http://media.thi.ng/color/presets/yellow-green-blue.svg)   | ![](http://media.thi.ng/color/presets/blue-white-red.svg)        |
| yellow-green-blue                                              | blue-white-red                                                   |
| ![](http://media.thi.ng/color/presets/cyan-magenta.svg)        | ![](http://media.thi.ng/color/presets/yellow-purple-magenta.svg) |
| cyan-magenta                                                   | yellow-purple-magenta                                            |
| ![](http://media.thi.ng/color/presets/green-blue-orange.svg)   | ![](http://media.thi.ng/color/presets/orange-magenta-blue.svg)   |
| green-blue-orange                                              | orange-magenta-blue                                              |
| ![](http://media.thi.ng/color/presets/blue-magenta-orange.svg) | ![](http://media.thi.ng/color/presets/magenta-green.svg)         |
| blue-magenta-orange                                            | magenta-green                                                    |

### Multi-stop gradients

The `multiCosineGradient()` function returns an iterator of raw RGBA
colors based on given gradient stops. This iterator computes a cosine
gradient between each color stop and yields a sequence of RGBA values.

```ts
col.multiCosineGradient(
    // num colors to produce
    10,
    // gradient stops (normalized positions, only RGBA colors supported)
    [0.1, col.RED], [0.5, col.GREEN], [0.9, col.BLUE]
)
// convert to CSS
.map(col.rgbaCss)

// [
//   "#ff0000",
//   "#ff0000",
//   "#da2500",
//   "#807f00",
//   "#25da00",
//   "#00ff00",
//   "#00da25",
//   "#00807f",
//   "#0025da",
//   "#0000ff",
//   "#0000ff",
// ]
```

## Status

ALPHA - work in progress

- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/master/packages/geom) - 2D/3D geometry types & operations
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices) - 2x2, 2x3, 3x3, 4x4 matrix & quaternion ops
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors) - optimized 2d/3d/4d and arbitrary length vector ops
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/master/packages/vector-pools) - operations on memory mapped data

## Installation

```bash
yarn add @thi.ng/color
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/master/packages/compose)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/master/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/master/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

```ts
import * as col from "@thi.ng/color";

// route #1: asXXX() converters: string -> CSS -> ARGB (int) -> RGBA
const a = col.asRGBA(col.css("#3cf"));
// [0.2, 0.8, 1, 1]

// route #2: parseCSS(): string -> RGBA
const b = col.parseCss("hsla(30,100%,50%,0.75)");
// [ 1, 0.5, 0, 0.75 ]

// route #3: convert() multi-method: CSS -> RGBA -> HSVA
// (see convert.ts)
const c = col.convert("rgb(0,255,255)", col.ColorMode.HSVA, col.ColorMode.CSS);
// [ 0.4999999722222268, 0.9999990000010001, 1, 1 ]

// route #4: direct conversion RGBA -> HSLA -> CSS
// first arg is output color (same calling convention as @thi.ng/vectors)
// (use `null` to mutate the input color)
col.hslaCss(col.rgbaHsla([], [1, 0.5, 0.5, 1]))
// "hsl(0.00,100.00%,75.00%)"

col.luminance(col.css("white"))
col.luminance(0xffffff, col.ColorMode.INT32)
// 1

// apply color matrix (RGBA only)
col.transform([], col.saturation(1.25), a)
// [ 0.07835000000000002, 0.82835, 1, 1 ]

// combine matrix transformations
filter = col.concat(
    col.saturation(0.5), // 50% saturation
    col.brightness(0.1), // +10% brightness
);

col.transform([], filter, col.RED);
// [ 0.7065, 0.2065, 0.2065, 1 ]
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
