# @thi.ng/color

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/color.svg)](https://www.npmjs.com/package/@thi.ng/color)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/color.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Color modes](#color-modes)
    - [RGBA transformations](#rgba-transformations)
    - [RGBA Porter-Duff compositing](#rgba-porter-duff-compositing)
    - [Cosine gradients](#cosine-gradients)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

### Color modes

Color space conversions (any direction) between:

- CSS (string, hex3/hex4/hex6/hex8, `rgba()`, `hsla()`, color names)
- ARGB (uint32, `0xaarrggbb`)
- RGBA (float4, `[r,g,b,a]`)
- HSIA (float4, `[h,s,i,a]`)
- HSLA (float4, `[h,s,l,a]`)
- HSVA (float4, `[h,s,v,a]`)

RGBA, HSLA, HSVA colors can be stored as plain, typed or custom
array-like types of normalized values (`[0,1]` interval).

### RGBA transformations

RGBA color matrix transformations, including parametric preset
transforms:

- brightness
- contrast
- exposure
- saturation (luminance aware)
- hue rotation
- color temperature (warm / cold)
- sepia (w/ fade amount)
- tint (green / purple)
- grayscale (luminance aware)
- invert (also available as non-matrix op)
- luminance to alpha

### RGBA Porter-Duff compositing

![porter-duff compositing modes](https://raw.githubusercontent.com/thi-ng/umbrella/feature/color/assets/porterduff.png)

[Image source](http://www.svgopen.org/2005/papers/abstractsvgopen/#PorterDuffMap)

### Cosine gradients

- [Original article](http://www.iquilezles.org/www/articles/palettes/palettes.htm)
- [Gradient generator](http://dev.thi.ng/gradients/)

The following presets are bundled (in [`cosine-gradients.ts`](https://github.com/thi-ng/umbrella/tree/feature/vec-refactor/packages/color/src/cosine-gradients.ts)):
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
- [@thi.ng/vectors3](https://github.com/thi-ng/umbrella/tree/feature/vec-refactor/packages/vectors3)

## Usage examples

```ts
import * as col from "@thi.ng/color";

// route #1: asXXX() converters: CSS -> ARGB (int) -> RGBA
const a = col.asRGBA("#3cf", col.ColorMode.CSS);
// [0.2, 0.8, 1, 1]

// route #2: parseCSS(): CSS -> HSLA -> RGBA
const b = col.parseCss("hsla(30,100%,50%,0.75)", col.ColorMode.RGBA);
// [ 1, 0.5, 0, 0.75 ]

// route #3: convert() multi-method: HSVA -> RGBA
const c = col.convert([0.5, 1, 1, 1], col.ColorMode.RGBA, col.ColorMode.HSVA);
// [ 0, 1, 1, 1 ]

col.luminanceRGB(a)
// 0.6434

// apply color matrix (RGBA only)
col.applyMatrix([], col.saturation(1.25), a)
// [ 0.07835000000000002, 0.82835, 1, 1 ]
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
