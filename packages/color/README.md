<!-- This file is generated - DO NOT EDIT! -->

# ![color](https://media.thi.ng/umbrella/banners/thing-color.svg?f089ad05)

[![npm version](https://img.shields.io/npm/v/@thi.ng/color.svg)](https://www.npmjs.com/package/@thi.ng/color)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/color.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

For the Clojure version, please visit: [thi.ng/color-clj](https://thi.ng/color-clj)

- [About](#about)
  - [Supported color spaces / modes](#supported-color-spaces--modes)
    - [Color creation / conversion](#color-creation--conversion)
  - [Storage & memory mapping](#storage--memory-mapping)
  - [Color theme generation](#color-theme-generation)
  - [Color sorting](#color-sorting)
  - [Gradients](#gradients)
    - [Multi-stop gradients in any color space](#multi-stop-gradients-in-any-color-space)
    - [Cosine gradients](#cosine-gradients)
  - [RGB color transformations](#rgb-color-transformations)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Array-based color types, CSS parsing, conversions, transformations, declarative theme generation, gradients, presets.

---

**Note: This readme is a work-in-progress, partially outdated and will apply to
the still unreleased version 3.0.0, a major overhaul of the entire package.
Please see readme on [main
branch](https://github.com/thi-ng/umbrella/blob/main/packages/color/README.md)
for the current version...**

---

### Supported color spaces / modes

Fast color model/space conversions (any direction) between (in alphabetical
order). All types support an alpha channel, which defaults to 100% opaque (apart
from the integer types).

- ABGR (uint32, `0xaabbggrr`, aka sRGB(A) as packed int)
- [ARGB](https://en.wikipedia.org/wiki/RGBA_color_model#ARGB32) (uint32, `0xaarrggbb`, aka sRGB(A) as packed int)
- [CSS](https://www.w3.org/TR/css-color-4/) (string, hex3/hex4/hex6/hex8, named colors, rgba(), hsla(), etc.)
- [HCY](http://www.chilliant.com/rgb2hsv.html) (float4, similar to LCH)
- [HSI](https://en.wikipedia.org/wiki/HSL_and_HSV#HSI_to_RGB) (float4)
- [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) (float4)
- [HSV](https://en.wikipedia.org/wiki/HSL_and_HSV) (float4)
- [Lab](https://en.wikipedia.org/wiki/CIELAB_color_space) (float4, D50/D65 versions)
- [LCH](https://en.wikipedia.org/wiki/HCL_color_space) (float4)
- [Oklab](https://bottosson.github.io/posts/oklab/) (float4)
- [RGB](https://en.wikipedia.org/wiki/RGB_color_space) (float4, _linear_)
- [sRGB](https://en.wikipedia.org/wiki/SRGB) (float4, [gamma corrected](https://en.wikipedia.org/wiki/Gamma_correction))
- [XYY](https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_xy_chromaticity_diagram_and_the_CIE_xyY_color_space) (float4)
- [XYZ](https://en.wikipedia.org/wiki/CIE_1931_color_space) (float4, aka CIE 1931, D50/D65 versions)
- [YCC](https://en.wikipedia.org/wiki/YCbCr) (float4, aka YCbCr)

| From/To   | CSS | HCY  | HSI  | HSL  | HSV  | Int  | Lab  | LCH | Oklab | RGB  | sRGB | XYY | XYZ  | YCC  |
|-----------|-----|------|------|------|------|------|------|-----|-------|------|------|-----|------|------|
| **CSS**   | ✅   | 🆎   | 🆎   | ✅    | 🆎   | ✅(1) | ✅(4) | ✅   | 🆎    | ✅    | ✅    | 🆎  | 🆎   | 🆎   |
| **HCY**   | 🆎  | ✅    | 🆎   | 🆎   | 🆎   | ❌    | 🆎   | 🆎  | 🆎    | ✅(2) | ✅(2) | 🆎  | 🆎   | 🆎   |
| **HSI**   | 🆎  | 🆎   | ✅    | 🆎   | 🆎   | ❌    | 🆎   | 🆎  | 🆎    | ✅(2) | ✅(2) | 🆎  | 🆎   | 🆎   |
| **HSL**   | ✅   | 🆎   | 🆎   | ✅    | 🆎   | ❌    | 🆎   | 🆎  | 🆎    | ✅(2) | ✅(2) | 🆎  | 🆎   | 🆎   |
| **HSV**   | 🆎  | 🆎   | 🆎   | ✅    | ✅    | ❌    | 🆎   | 🆎  | 🆎    | ✅(2) | ✅(2) | 🆎  | 🆎   | 🆎   |
| **Int**   | ✅   | 🆎   | 🆎   | 🆎   | 🆎   | ❌    | 🆎   | 🆎  | 🆎    | 🆎   | ✅    | ✅   | 🆎   | 🆎   |
| **Lab**   | ✅   | 🆎   | 🆎   | 🆎   | 🆎   | ❌    | ✅(3) | ✅   | 🆎    | ✅(3) | 🆎   | 🆎  | ✅(3) | 🆎   |
| **LCH**   | ✅   | 🆎   | 🆎   | 🆎   | 🆎   | ❌    | ✅    | ✅   | 🆎    | 🆎   | 🆎   | 🆎  | 🆎   | 🆎   |
| **Oklab** | 🆎  | 🆎   | 🆎   | 🆎   | 🆎   | ❌    | 🆎   | 🆎  | ✅     | ✅    | 🆎   | 🆎  | ✅    | 🆎   |
| **RGB**   | 🆎  | ✅(2) | ✅(2) | ✅(2) | ✅(2) | ✅    | ✅(3) | ✅   | ✅     | ✅    | ✅    | 🆎  | ✅(3) | ✅(2) |
| **sRGB**  | ✅   | ✅(2) | ✅(2) | ✅(2) | ✅(2) | ✅    | 🆎   | 🆎  | 🆎    | ✅    | ✅    | 🆎  | 🆎   | 🆎   |
| **XYY**   | 🆎  | 🆎   | 🆎   | 🆎   | 🆎   | ❌    | 🆎   | 🆎  | 🆎    | 🆎   | 🆎   | ✅   | ✅    | 🆎   |
| **XYZ**   | 🆎  | 🆎   | 🆎   | 🆎   | 🆎   | ❌    | ✅    | 🆎  | 🆎    | ✅    | 🆎   | ✅   | ✅(3) | 🆎   |
| **YCC**   | 🆎  | 🆎   | 🆎   | 🆎   | 🆎   | ❌    | 🆎   | 🆎  | 🆎    | ✅(2) | 🆎   | 🆎  | 🆎   | ✅    |

- ✅ - direct conversion
- 🆎 - indirect conversion (mostly via RGB/sRGB)
- (1) - only via `parseHex()`
- (2) - no consideration for linear/gamma encoded RGB/sRGB
  (see [Wikipedia](https://en.wikipedia.org/wiki/HSL_and_HSV#cite_note-26))
- (3) - including [D50/D65
  illuminant](https://en.wikipedia.org/wiki/Illuminant_D65) options
- (4) - parsed as Lab w/ D50 illuminant as per [CSS Color Module Level
  4](https://www.w3.org/TR/css-color-4/#lab-colors)

#### Color creation / conversion

Each color type provides a factory function to create & convert color instances
from other models/spaces. These functions can take the following arguments:

- CSS string
- number (interpreted as packed ARGB int32)
- array (used as is)
- scalars (one per channel, alpha optional, always defaults to 1.0)
- color instance (triggers conversion)

Additionally, an optional target backing buffer, start index and stride can be
given. See [next section](#storage--memory-mapping).

Some examples:

```ts
srgb("#ff0")
// $Color { offset: 0, stride: 1, buf: [ 1, 1, 0, 1 ] }

srgb(0x44ffff00)
// $Color { offset: 0, stride: 1, buf: [ 1, 1, 0, 0.26666666666666666 ] }

srgb(1,1,0)
// $Color { offset: 0, stride: 1, buf: [ 1, 1, 0, 1 ] }

srgb([0.1, 0.2, 0.3, 0.4])
// $Color { offset: 0, stride: 1, buf: [ 0.1, 0.2, 0.3, 0.4 ] }

// convert RGB CSS into Lab (D50)
labD50("#ff0")
// $Color {
//   offset: 0,
//   stride: 1,
//   buf: [ 0.9760712516622824, -0.1575287517691254, 0.9338847788323792, 1 ]
// }

// convert RGB CSS into Lab CSS (CSS Level 4 only)
css(labD50("#ff0"))
// 'lab(97.607% -15.753 93.388)'

// round trip:
// CSS -> sRGB -> lin RGB -> Lab -> lin RGB -> sRGB -> CSS
css(rgb(labD50("#ff0")))
// '#ffff00'
```

### Storage & memory mapping

All color types store their channel values in plain arrays, typed arrays of
(mostly) normalized values (`[0,1]` interval). Where applicable, the hue too is
stored in that range (similar to [CSS
`turn`](https://www.w3.org/TR/css-values-3/#angle-value) units), NOT in degrees.
Likewise, luminance is always stored in the `[0,1]` too, even for Lab, LCH where
often the `[0,100]` range is used instead.

As a fairly unique feature, all color types can be used to provided views of a
backing memory buffer (e.g. for WASM/WebGL/WebGPU interop, pixel buffers etc.),
incl. support for arbitrary component strides.

The lightweight class wrappers act similarly to the `Vec2/3/4` wrappers in
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors),
support striding (for mapped memory views), named channel accessor
aliases (in addition to array indexing) and are fully compatible with
all vector functions.

![Memory diagram of densely packed buffer](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/mapped-colors-01.png)

```ts
const memory = new Float32Array(16);

// create RGBA color views of buffer: num, start index, strides
// here the colors are tightly packed w/o gaps in between
// (by default entire buffer is mapped, last 4 args are optional)
const colors = rgb.mapBuffer(memory, 4, 0, 1, 4);

// manipulating the colors, will directly manipulate the underlying buffer
namedHueRgb(colors[0], Hue.ORANGE);
namedHueRgb(colors[1], Hue.CHARTREUSE);
namedHueRgb(colors[2], Hue.SPRING_GREEN);
namedHueRgb(colors[3], Hue.AZURE);

memory
// Float32Array(16) [ 1, 0.5, 0, 1, 0.5, 1, 0, 1, 0, 1, 0.5, 1, 0, 0.5, 1, 1 ]

css(colors[0])
// '#ff8000'
css(colors[1])
// '#80ff00'
css(colors[2])
// '#00ff80'
css(colors[3])
// '#0080ff'

// use deref() to obtain a packed copy
colors[0].deref()
// [ 1, 0.5, 0, 1 ]
```

![Memory diagram of strided & interleaved buffer](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/mapped-colors-02.png)

```ts
// here we create a *strided* WebGL attrib buffer for 3 points
// each point defines a: 3D position, UV coords and RGB(A) color
const attribs = new Float32Array([
  // pos     uv   color
  0,0,0,     0,0, 0.25,0.5,0,1,
  100,0,0,   1,0, 0.5,0.5,0.25,1,
  100,100,0, 1,1, 0,1,0.5,1,
]);

// create strided view of colors
// 3 items, start index 5, component stride 1, element stride 9
colors = srgb.mapBuffer(attribs, 3, 5, 1, 9);

css(colors[0])
// '#408000'
css(colors[1])
// '#808040'
css(colors[2])
// '#00ff80'
```

### Color theme generation

The package provides several methods for procedural & declarative color theme
generations. The latter relies on the concept of LCH color ranges, which can be
sampled directly and/or mixed with a base color (of any type) to produce
randomized variations. Furthermore, multiple such ranges can be combined into a
weighted set to define probabilistic color themes.

```ts
// single random color drawn from the "bright" color range preset
colorFromRange("bright");
// [ 0.7302125322518669, 0.8519945301256682, 0.8134374983367859, 1 ]

// single random color based on given raw HSV base color and preset
// ()
colorFromRange("warm", { base: hsv(0.33, 1, 1) })
// $Color {
//   offset: 0,
//   stride: 1,
//   buf: [ 0.774977122048776, 0.7432832945738063, 0.3186095419992927, 1 ]
// }

// infinite iterator of colors sampled from the preset
// (see table below)
const colors = colorsFromRange("bright");
colors.next();
// {
//   value: [ 0.006959075656347791, 0.8760165887192115, 0.912149937028727, 1 ],
//   done: false
// }

// 10 cool reds, w/ 10% hue variance
[...colorsFromRange("cool", { num: 10, base: hsv(0, 0.8, 1), variance: 0.1 })]

// generate colors based on given (weighted) textual description(s)
// here using named CSS colors, but could also be or typed colors or raw LCH tuples
[...colorsFromTheme(
    [["warm", "goldenrod"], ["cool", "springgreen", 0.1]],
    { num: 100, variance: 0.05 }
)]

// theme parts can also be given in the format used internally
// all keys are optional (range, base, weight),
// but at least `range` or `base` must be given...
[...colorsFromTheme(
    [
        { range: "warm", base: "goldenrod" },
        { range: COLOR_RANGES.cool, base: hsv(0, 1, 0.5), weight: 0.1 }
    ],
    { num: 100, variance: 0.05 }
)]
```

| ID        | 100 colors drawn from color range preset only, sorted by hue                                                       |
|-----------|--------------------------------------------------------------------------------------------------------------------|
| `bright`  | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-bright.svg)  |
| `cool`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-cool.svg)    |
| `dark`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-dark.svg)    |
| `fresh`   | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-fresh.svg)   |
| `hard`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-hard.svg)    |
| `intense` | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-intense.svg) |
| `light`   | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-light.svg)   |
| `neutral` | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-neutral.svg) |
| `soft`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-soft.svg)    |
| `warm`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-warm.svg)    |
| `weak`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-weak.svg)    |

| ID        | 100 colors, single base color w/ color range preset, sorted by hue                                                 |
|-----------|--------------------------------------------------------------------------------------------------------------------|
| `bright`  | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-green-bright.svg)  |
| `cool`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-green-cool.svg)    |
| `dark`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-green-dark.svg)    |
| `fresh`   | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-green-fresh.svg)   |
| `hard`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-green-hard.svg)    |
| `intense` | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-green-intense.svg) |
| `light`   | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-green-light.svg)   |
| `neutral` | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-green-neutral.svg) |
| `soft`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-green-soft.svg)    |
| `warm`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-green-warm.svg)    |
| `weak`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-green-weak.svg)    |

| ID        | 100 colors, 2 base colors w/ color range preset, sorted by brightness                                            |
|-----------|------------------------------------------------------------------------------------------------------------------|
| `bright`  | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-duo-bright.svg)  |
| `cool`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-duo-cool.svg)    |
| `dark`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-duo-dark.svg)    |
| `fresh`   | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-duo-fresh.svg)   |
| `hard`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-duo-hard.svg)    |
| `intense` | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-duo-intense.svg) |
| `light`   | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-duo-light.svg)   |
| `neutral` | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-duo-neutral.svg) |
| `soft`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-duo-soft.svg)    |
| `warm`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-duo-warm.svg)    |
| `weak`    | ![color swatch](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-duo-weak.svg)    |

Full example:

```ts
import { colorsFromTheme, swatchesH } from "@thi.ng/color";
import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { writeFileSync } from "fs";

// color theme definition using:
// color range preset names, CSS colors and weights
const theme: ColorThemePartTuple[] = [
    ["cool", "goldenrod"],
    ["fresh", "hotpink", 0.1],
    ["light", "springgreen", 0.1],
];

// generate 200 LCH colors based on above description
const colors = [...colorsFromTheme(theme, { num: 200, variance: 0.05 })];

// create SVG doc of color swatches (hiccup format)
const doc = svg(
    { width: 1000, height: 50, convert: true },
    swatchesH(colors, 5, 50)
);

// serialize to SVG file
writeFileSync("export/swatches-ex01.svg", serialize(doc));
```

![example result color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-ex01.svg)

### Color sorting

The `sort()` function can be used to sort an array of colors using
arbitrary sort criteria. The following comparators are bundled:

- `selectChannel(i)` - sort by channel
- `proximityHsv(target)` - sort by distance to target color (HSV colors)
- `proximityRgb(target)` - sort by distance to target color (RGB colors)

```ts
// (see above example)
const colors = [...colorsFromTheme(theme, { num: 200, variance: 0.05 })];

sortColors(colors, proximityHsv([0,1,0.5]));
```

![sorted color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-ex02.svg)

### Gradients

#### Multi-stop gradients in any color space

The `multiColorGradient()` function can be used to generate gradients in any
color space and gradient stops must be using all the same color type. Colors are
pairwise interpolated, and by default, uses generic `mix()` function which
delegates to type specific strategies. See `GradientOpts` for details.

![LCH example gradient](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/lch-gradient.svg)

```ts
const L = 0.8;
const C = 0.8;

const gradient = multiColorGradient({
    num: 100,
    // gradient stops
    stops: [
        [0, lch(L, C, 0)],
        [1 / 3, lch(L, C, 1 / 3)],
        [2 / 3, lch(L, C, 2 / 3)],
        [1, lch(L, 0, 1)],
    ],
    // optionally with easing function
    // easing: (t) => t * t,
});

writeFileSync(
    `export/lch-gradient.svg`,
    serialize(
        svg(
            { width: 500, height: 50, convert: true },
            swatchesH(gradient, 5, 50)
        )
    )
);
```

#### Cosine gradients

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

##### Two-color cosine gradients

The `cosineCoeffs()` function can be used to compute the cosine gradient
coefficients between 2 start/end colors:

```ts
// compute gradient coeffs between red / green
cosineGradient(10, cosineCoeffs([1,0,1,1], [0,1,0,1])).map(css)
// '#ff00ff'
// '#f708f7'
// '#e11ee1'
// '#bf40bf'
// '#966996'
// '#699669'
// '#40bf40'
// '#1ee11e'
// '#08f708'
// '#00ff00'
```

##### Multi-stop gradients

The `multiCosineGradient()` function returns an iterator of raw RGB
colors based on given gradient stops. This iterator computes a cosine
gradient between each color stop and yields a sequence of RGB values.

```ts
multiCosineGradient({
    num: 10,
    // gradient stops (normalized positions)
    stops: [[0.1, [1, 0, 0, 1]], [0.5, [0, 1, 0, 1]], [0.9, [0, 0, 1, 1]]],
    // optional color transform/coercion
    tx: srgba
})
// convert to CSS
.map(css)
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

### RGB color transformations

RGB [color matrix
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

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcolor%5D+in%3Atitle)

### Related packages

- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel) - Typed array backed, integer and floating point pixel buffers w/ customizable formats, blitting, dithering, conversions

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

Package sizes (gzipped, pre-treeshake): ESM: 12.89 KB / CJS: 13.55 KB / UMD: 12.66 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                | Description                                                      | Live demo                                                | Source                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/commit-heatmap.png" width="240"/>     | Heatmap visualization of this mono-repo's commits                |                                                          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/commit-heatmap)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/grid-iterators.png" width="240"/>     | Visualization of different grid iterator strategies              | [Demo](https://demo.thi.ng/umbrella/grid-iterators/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/grid-iterators)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/>      | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-workers.jpg" width="240"/> | Fork-join worker-based raymarch renderer                         | [Demo](https://demo.thi.ng/umbrella/shader-ast-workers/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-workers) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/color/)

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-color,
  title = "@thi.ng/color",
  author = "Karsten Schmidt",
  note = "https://thi.ng/color",
  year = 2016
}
```

## License

&copy; 2016 - 2021 Karsten Schmidt // Apache Software License 2.0
