<!-- This file is generated - DO NOT EDIT! -->

# ![color](https://media.thi.ng/umbrella/banners/thing-color.svg?f089ad05)

[![npm version](https://img.shields.io/npm/v/@thi.ng/color.svg)](https://www.npmjs.com/package/@thi.ng/color)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/color.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Color spaces / modes](#color-spaces---modes)
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

| Preview                                                                                                                                       | Gradient ID             |
|-----------------------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| ![gradient: blue-cyan](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-blue-cyan.png)                         | `blue-cyan`             |
| ![gradient: blue-magenta-orange](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-blue-magenta-orange.png)     | `blue-magenta-orange`   |
| ![gradient: blue-white-red](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-blue-white-red.png)               | `blue-white-red`        |
| ![gradient: cyan-magenta](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-cyan-magenta.png)                   | `cyan-magenta`          |
| ![gradient: green-blue-orange](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-green-blue-orange.png)         | `green-blue-orange`     |
| ![gradient: green-cyan](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-green-cyan.png)                       | `green-cyan`            |
| ![gradient: green-magenta](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-green-magenta.png)                 | `green-magenta`         |
| ![gradient: green-red](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-green-red.png)                         | `green-red`             |
| ![gradient: heat1](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-heat1.png)                                 | `heat1`                 |
| ![gradient: magenta-green](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-magenta-green.png)                 | `magenta-green`         |
| ![gradient: orange-blue](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-orange-blue.png)                     | `orange-blue`           |
| ![gradient: orange-magenta-blue](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-orange-magenta-blue.png)     | `orange-magenta-blue`   |
| ![gradient: purple-orange-cyan](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-purple-orange-cyan.png)       | `purple-orange-cyan`    |
| ![gradient: rainbow1](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-rainbow1.png)                           | `rainbow1`              |
| ![gradient: rainbow2](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-rainbow2.png)                           | `rainbow2`              |
| ![gradient: rainbow3](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-rainbow3.png)                           | `rainbow3`              |
| ![gradient: rainbow4](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-rainbow4.png)                           | `rainbow4`              |
| ![gradient: red-blue](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-red-blue.png)                           | `red-blue`              |
| ![gradient: yellow-green-blue](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-yellow-green-blue.png)         | `yellow-green-blue`     |
| ![gradient: yellow-magenta-cyan](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-yellow-magenta-cyan.png)     | `yellow-magenta-cyan`   |
| ![gradient: yellow-purple-magenta](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-yellow-purple-magenta.png) | `yellow-purple-magenta` |
| ![gradient: yellow-red](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/gradient-yellow-red.png)                       | `yellow-red`            |

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

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/color?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/color/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 7.19 KB / CJS: 7.56 KB / UMD: 7.14 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                | Description                                         | Live demo                                                | Source                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/commit-heatmap.png" width="240"/>     | Heatmap visualization of this mono-repo's commits   |                                                          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/commit-heatmap)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/grid-iterators.png" width="240"/>     | Visualization of different grid iterator strategies | [Demo](https://demo.thi.ng/umbrella/grid-iterators/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/grid-iterators)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-workers.jpg" width="240"/> | Fork-join worker-based raymarch renderer            | [Demo](https://demo.thi.ng/umbrella/shader-ast-workers/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-workers) |

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
