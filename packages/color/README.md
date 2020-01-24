<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/color

[![npm version](https://img.shields.io/npm/v/@thi.ng/color.svg)](https://www.npmjs.com/package/@thi.ng/color)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/color.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Color spaces / modes](#color-spaces--modes)
    - [Class wrappers](#class-wrappers)
  - [RGBA transformations](#rgba-transformations)
  - [RGBA Porter-Duff compositing](#rgba-porter-duff-compositing)
  - [Cosine gradients](#cosine-gradients)
  - [Two-color gradients](#two-color-gradients)
  - [Multi-stop gradients](#multi-stop-gradients)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Array-based color ops, conversions, multi-color gradients, presets.

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
to / from sRGB (i.e. linear vs gamma corrected).

#### Class wrappers

The package provides lightweight class wrappers for each color mode /
space. These wrappers act similarly to the `Vec2/3/4` wrappers in
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors),
support striding (for mapped memory views), named channel accessor
aliases (in addition to array indexing) and are fully compatible with
all functions (and act as syntax sugar for generic conversion
functions). Wrapper factory functions are provided for convenience.

### RGBA transformations

RGBA [color matrix
transformations](https://github.com/thi-ng/umbrella/tree/develop/packages/color/src/transform.ts),
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
concatenation (see `concat()`) for more efficient application.

### RGBA Porter-Duff compositing

This feature has been moved to the separate
[@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/develop/packages/porter-duff)
package.

### Cosine gradients

- [Original article](http://www.iquilezles.org/www/articles/palettes/palettes.htm)
- [Gradient generator](http://dev.thi.ng/gradients/)

The following presets are bundled (in [`cosine-gradients.ts`](https://github.com/thi-ng/umbrella/tree/develop/packages/color/src/cosine-gradients.ts)):

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

### Two-color gradients

The `cosineCoeffs()` function can be used to compute the cosine gradient
coefficients between 2 start/end colors:

```ts
// compute gradient coeffs between red / green
cosineGradient(10, cosineCoeffs([1,0,0,1], [0,1,0,1])).map(rgbaCss)
// #ff0000
// #f70800
// #e11e00
// #bf4000
// #966900
// #699600
// #40bf00
// #1ee100
// #08f700
// #00ff00
```

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

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/color
```

Package sizes (gzipped): ESM: 7.1KB / CJS: 7.4KB / UMD: 6.9KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/master/packages/compose)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/master/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/master/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### commit-heatmap <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/commit-heatmap.png)

Heatmap visualization of this mono-repo's commits

[Live demo](https://demo.thi.ng/umbrella/commit-heatmap/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/commit-heatmap)

### grid-iterators <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/grid-iterators.png)

[Live demo](https://demo.thi.ng/umbrella/grid-iterators/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/grid-iterators)

### shader-ast-workers <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/shader-ast-workers.jpg)

[Live demo](https://demo.thi.ng/umbrella/shader-ast-workers/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-workers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/color/)

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

Karsten Schmidt

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
