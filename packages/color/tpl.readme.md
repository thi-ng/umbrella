<!-- include ../../assets/tpl/header.md -->

For the Clojure version, please visit: [thi.ng/color-clj](https://thi.ng/color-clj)

<!-- toc -->

## About

{{pkg.description}}

### Supported color spaces / modes

Fast color model/space conversions (any direction) between (in alphabetical
order). All types support an alpha channel, which defaults to 100% opaque (apart
from the integer types).

- ABGR (uint32, `0xaabbggrr`, aka sRGB(A) as packed int)
- [ARGB](https://en.wikipedia.org/wiki/RGBA_color_model#ARGB32) (uint32, `0xaarrggbb`, aka sRGB(A) as packed int)
- [CSS](https://www.w3.org/TR/css-color-4/) (string, hex3/4/6/8, named colors, system colors, rgba(), hsla(), lch(), lab(), etc.)
- [HCY](http://www.chilliant.com/rgb2hsv.html) (float4, similar to LCH)
- [HSI](https://en.wikipedia.org/wiki/HSL_and_HSV#HSI_to_RGB) (float4)
- [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) (float4)
- [HSV](https://en.wikipedia.org/wiki/HSL_and_HSV) (float4)
- [Lab](https://en.wikipedia.org/wiki/CIELAB_color_space) (float4, D50/D65 versions)
- [LCH](https://en.wikipedia.org/wiki/HCL_color_space) (float4)
- [Oklab](https://bottosson.github.io/posts/oklab/) (float4)
- [Oklch](https://bottosson.github.io/posts/oklab/) (float4) (polar version of oklab)
- [RGB](https://en.wikipedia.org/wiki/RGB_color_space) (float4, _linear_)
- [sRGB](https://en.wikipedia.org/wiki/SRGB) (float4, [gamma corrected](https://en.wikipedia.org/wiki/Gamma_correction))
- [XYY](https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_xy_chromaticity_diagram_and_the_CIE_xyY_color_space) (float4)
- [XYZ](https://en.wikipedia.org/wiki/CIE_1931_color_space) (float4, aka CIE 1931, D50/D65 versions)
- [YCC](https://en.wikipedia.org/wiki/YCbCr) (float4, aka YCbCr)

| From/To   | CSS             | HCY             | HSI             | HSL             | HSV             | Int             | Lab             | LCH | Oklab | Oklch | RGB             | sRGB            | XYY | XYZ             | YCC             |
|-----------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----|-------|-------|-----------------|-----------------|-----|-----------------|-----------------|
| **CSS**   | ✅               | 🆎              | 🆎              | ✅               | 🆎              | ✅<sup>(1)</sup> | ✅<sup>(4)</sup> | ✅   | ✅     | ✅     | ✅               | ✅               | 🆎  | 🆎              | 🆎              |
| **HCY**   | 🆎              | ✅               | 🆎              | 🆎              | 🆎              | ❌               | 🆎              | 🆎  | 🆎    | 🆎    | ✅<sup>(2)</sup> | ✅<sup>(2)</sup> | 🆎  | 🆎              | 🆎              |
| **HSI**   | 🆎              | 🆎              | ✅               | 🆎              | 🆎              | ❌               | 🆎              | 🆎  | 🆎    | 🆎    | ✅<sup>(2)</sup> | ✅<sup>(2)</sup> | 🆎  | 🆎              | 🆎              |
| **HSL**   | ✅               | 🆎              | 🆎              | ✅               | 🆎              | ❌               | 🆎              | 🆎  | 🆎    | 🆎    | ✅<sup>(2)</sup> | ✅<sup>(2)</sup> | 🆎  | 🆎              | 🆎              |
| **HSV**   | 🆎              | 🆎              | 🆎              | ✅               | ✅               | ❌               | 🆎              | 🆎  | 🆎    | 🆎    | ✅<sup>(2)</sup> | ✅<sup>(2)</sup> | 🆎  | 🆎              | 🆎              |
| **Int**   | ✅               | 🆎              | 🆎              | 🆎              | 🆎              | ❌               | 🆎              | 🆎  | 🆎    | 🆎    | 🆎              | ✅               | ✅   | 🆎              | 🆎              |
| **Lab**   | ✅<sup>(5)</sup> | 🆎              | 🆎              | 🆎              | 🆎              | ❌               | ✅<sup>(3)</sup> | ✅   | 🆎    | 🆎    | ✅<sup>(3)</sup> | 🆎              | 🆎  | ✅<sup>(3)</sup> | 🆎              |
| **LCH**   | ✅<sup>(5)</sup> | 🆎              | 🆎              | 🆎              | 🆎              | ❌               | ✅               | ✅   | 🆎    | 🆎    | 🆎              | 🆎              | 🆎  | 🆎              | 🆎              |
| **Oklab** | ✅<sup>(5)</sup> | 🆎              | 🆎              | 🆎              | 🆎              | ❌               | 🆎              | 🆎  | ✅     | ✅     | ✅               | 🆎              | 🆎  | ✅               | 🆎              |
| **Oklch** | ✅<sup>(5)</sup> | 🆎              | 🆎              | 🆎              | 🆎              | ❌               | 🆎              | 🆎  | ✅     | ✅     | 🆎              | 🆎              | 🆎  | 🆎              | 🆎              |
| **RGB**   | 🆎              | ✅<sup>(2)</sup> | ✅<sup>(2)</sup> | ✅<sup>(2)</sup> | ✅<sup>(2)</sup> | ✅               | ✅<sup>(3)</sup> | ✅   | ✅     | 🆎    | ✅               | ✅               | 🆎  | ✅<sup>(3)</sup> | ✅<sup>(2)</sup> |
| **sRGB**  | ✅               | ✅<sup>(2)</sup> | ✅<sup>(2)</sup> | ✅<sup>(2)</sup> | ✅<sup>(2)</sup> | ✅               | 🆎              | 🆎  | 🆎    | 🆎    | ✅               | ✅               | 🆎  | 🆎              | 🆎              |
| **XYY**   | 🆎              | 🆎              | 🆎              | 🆎              | 🆎              | ❌               | 🆎              | 🆎  | 🆎    | 🆎    | 🆎              | 🆎              | ✅   | ✅               | 🆎              |
| **XYZ**   | 🆎              | 🆎              | 🆎              | 🆎              | 🆎              | ❌               | ✅               | 🆎  | 🆎    | 🆎    | ✅               | 🆎              | ✅   | ✅<sup>(3)</sup> | 🆎              |
| **YCC**   | 🆎              | 🆎              | 🆎              | 🆎              | 🆎              | ❌               | 🆎              | 🆎  | 🆎    | 🆎    | ✅<sup>(2)</sup> | 🆎              | 🆎  | 🆎              | ✅               |

- ✅ - direct conversion
- 🆎 - indirect conversion (mostly via RGB/sRGB)
- (1) - only via `parseHex()`
- (2) - no consideration for linear/gamma encoded RGB/sRGB
  (see [Wikipedia](https://en.wikipedia.org/wiki/HSL_and_HSV#cite_note-26))
- (3) - including [D50/D65 illuminant](https://en.wikipedia.org/wiki/Illuminant_D65) options
- (4) - parsed as Lab w/ D50 illuminant as per [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/#lab-colors)
- (5) - only if targeting CSS Color Module Level 4 or newer

#### Color creation / conversion

Each color type provides a factory function to create & convert color instances
from other models/spaces. These functions can take the following arguments:

- CSS string
- number (interpreted as packed ARGB int32)
- array of color channel values (used as is)
- scalars (one per channel, alpha optional, always defaults to 1.0)
- color instance (might trigger conversion if needed)

Additionally, an optional target backing buffer, start index and stride can be
given. See [next section](#storage--memory-mapping).

Some examples:

```ts tangle:export/readme1.ts
import { css, labD50, rgb, srgb } from "@thi.ng/color";

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

Additionally, colors can be created from black body temperatures
([`kelvinRgb()`](https://docs.thi.ng/umbrella/color/functions/kelvinRgb.html))
or wavelengths
([`wavelengthXyz()`](https://docs.thi.ng/umbrella/color/functions/wavelengthXyz.html)).

![kelvinRgb() result swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/blackbody.svg)

![wavelengthXyz() result swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/wavelength.svg)

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

```ts tangle:export/readme2.ts
import { Hue, css, namedHueRgb, rgb, srgb } from "@thi.ng/color";

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

```ts tangle:export/readme2.ts
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
const colors2 = srgb.mapBuffer(attribs, 3, 5, 1, 9);

css(colors2[0])
// '#408000'
css(colors2[1])
// '#808040'
css(colors2[2])
// '#00ff80'
```

### Color theme generation

The package provides several methods for declarative & probabilistic color theme
generation. The latter relies on the concept of LCH color ranges, which can be
sampled directly and/or mixed with a base color (of any type) to produce
randomized variations. Furthermore, multiple such ranges can be combined into a
weighted set to define probabilistic color themes.

```ts tangle:export/readme-range.ts
import {
	COLOR_RANGES,
	colorFromRange,
	colorsFromRange,
	colorsFromTheme,
	hsv,
	lch,
} from "@thi.ng/color";

// single random color drawn from the "bright" color range preset
colorFromRange("bright");
// [ 0.7302125322518669, 0.8519945301256682, 0.8134374983367859, 1 ]

// single random color based on given raw HSV base color and preset
colorFromRange("warm", { base: hsv(0.33, 1, 1) });
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

// 10 cool reds, w/ ±10% hue variance
[...colorsFromRange("cool", { num: 10, base: lch(1, 0.8, 0), variance: 0.1 })];

// generate colors based on given (weighted) textual description(s)
// here using named CSS colors, but could also be or typed colors or raw LCH tuples
[
	...colorsFromTheme(
		[
			["warm", "goldenrod"],
			["cool", "springgreen", 0.1],
		],
		{ num: 100, variance: 0.05 }
	),
];

// theme parts can also be given in the format used internally
// all keys are optional (range, base, weight),
// but at least `range` or `base` must be given...
[
	...colorsFromTheme(
		[
			{ range: "warm", base: "goldenrod" },
			{ range: COLOR_RANGES.cool, base: hsv(0, 1, 0.5), weight: 0.1 },
		],
		{ num: 100, variance: 0.05 }
	),
];
```

This table below shows three sets of sample swatches for each color range preset
and the following color theme (raw samples and chunked & sorted):

- 1/3 goldenrod
- 1/3 turquoise
- 1/3 pink
- 1/6 black
- 1/6 gray
- 1/6 white

| ID        | 100 colors drawn from color range preset                                                                                    |
|-----------|-----------------------------------------------------------------------------------------------------------------------------|
| `bright`  | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-bright-hue.svg)     |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-bright-mixed.svg)   |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-bright-chunks.svg)  |
| `cool`    | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-cool-hue.svg)       |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-cool-mixed.svg)     |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-cool-chunks.svg)    |
| `dark`    | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-dark-hue.svg)       |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-dark-mixed.svg)     |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-dark-chunks.svg)    |
| `fresh`   | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-fresh-hue.svg)      |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-fresh-mixed.svg)    |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-fresh-chunks.svg)   |
| `hard`    | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-hard-hue.svg)       |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-hard-mixed.svg)     |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-hard-chunks.svg)    |
| `intense` | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-intense-hue.svg)    |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-intense-mixed.svg)  |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-intense-chunks.svg) |
| `light`   | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-light-hue.svg)      |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-light-mixed.svg)    |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-light-chunks.svg)   |
| `neutral` | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-neutral-hue.svg)    |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-neutral-mixed.svg)  |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-neutral-chunks.svg) |
| `soft`    | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-soft-hue.svg)       |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-soft-mixed.svg)     |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-soft-chunks.svg)    |
| `warm`    | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-warm-hue.svg)       |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-warm-mixed.svg)     |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-warm-chunks.svg)    |
| `weak`    | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-weak-hue.svg)       |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-weak-mixed.svg)     |
|           | ![color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-range-weak-chunks.svg)    |

Full example:

```ts tangle:export/readme-theme.ts
import { colorsFromTheme, swatchesH, type ColorThemePartTuple } from "@thi.ng/color";
import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { writeFileSync } "node:fs";

// color theme definition using:
// color range preset names, CSS colors and weights
const theme: ColorThemePartTuple[] = [
	["cool", "goldenrod"],
	["hard", "hotpink", 0.1],
	["fresh", "springgreen", 0.1],
];

// generate 200 LCH colors based on above description
const colors = [...colorsFromTheme(theme, { num: 200, variance: 0.05 })];

// create SVG doc of color swatches (hiccup format)
const doc = svg(
	{ width: 1000, height: 50, __convert: true },
	swatchesH(colors, 5, 50)
);

// serialize to SVG file
writeFileSync("swatches-ex01.svg", serialize(doc));
```

![example result color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-ex01.svg)

### Color theme strategies

In addition to the above approaches to create color themes, the package also
provides these more standard strategies to derive a color theme from a given
base color (all configurable, examples shown here only use default params).
These functions accept colors in any format, but computation and results are
always in LCH.

#### Analog colors

[Documentation](https://docs.thi.ng/umbrella/color/functions/analogStrategy.html)

```ts tangle:export/analog-strategy.ts
import { analogStrategy, cssColors } from "@thi.ng/color";

console.log(cssColors(analogStrategy("#f90")));
// [ "#ff9900", "#ff745b", "#beb700" ]
```

#### Split-analog colors

[Documentation](https://docs.thi.ng/umbrella/color/functions/splitAnalogStrategy.html)

```ts tangle:export/split-analog-strategy.ts
import { splitAnalogStrategy, cssColors } from "@thi.ng/color";

console.log(cssColors(splitAnalogStrategy("#f90")));
// [ "#ff9900", "#00d4ff", "#48b3ff", "#beb700" ]
```

#### Complementary colors

[Documentation](https://docs.thi.ng/umbrella/color/functions/complementaryStrategy.html)

```ts tangle:export/complementary-strategy.ts
import { complementaryStrategy, cssColors } from "@thi.ng/color";

console.log(cssColors(complementaryStrategy("#f90")));
// [ "#ff9900", "#00c9ff" ]
```

#### Split-complementary colors

[Documentation](https://docs.thi.ng/umbrella/color/functions/splitComplementaryStrategy.html)

```ts tangle:export/split-complementary-strategy.ts
import { splitComplementaryStrategy, cssColors } from "@thi.ng/color";

console.log(cssColors(splitComplementaryStrategy("#f90")));
// [ "#ff9900", "#00d4ff", "#48b3ff" ]
```

#### Monochrome colors

[Documentation](https://docs.thi.ng/umbrella/color/functions/monochromeStrategy.html)

```ts tangle:export/monochrome-strategy.ts
import { monochromeStrategy, cssColors } from "@thi.ng/color";

console.log(cssColors(monochromeStrategy("#f90")));
// [ "#3d0000", "#701f00", "#b85d00", "#ff9f0e", "#ffe462" ]
```

#### Triadic colors

[Documentation](https://docs.thi.ng/umbrella/color/functions/triadicStrategy.html)

```ts tangle:export/triadic-strategy.ts
import { triadicStrategy, cssColors } from "@thi.ng/color";

console.log(cssColors(triadicStrategy("#f90")));
// [ "#ff9900", "#00d7c2", "#da91ff" ]
```

#### Tetradic colors

[Documentation](https://docs.thi.ng/umbrella/color/functions/tetradicStrategy.html)

```ts tangle:export/tetradic-strategy.ts
import { tetradicStrategy, cssColors } from "@thi.ng/color";

console.log(cssColors(tetradicStrategy("#f90")));
// [ "#ff9900", "#beb700", "#00c9ff", "#48b3ff" ]
```

### Color sorting & distance

The package provides several functions to compute full or channel-wise distances
between colors. These functions can also be used for sorting color arrays (see below).

- `distChannel` - single channel distance only
- `distHsv` / `distHsvSat` / `distHsvLuma`
- `distEucledian3` / `distEucledian4`
- `distRgbLuma` / `distSrgbLuma`
- `distCIEDE2000`
- `distCMC`

The [`sort()`](https://docs.thi.ng/umbrella/color/functions/sort.html) function
can be used to sort an array of colors using arbitrary sort criteria (basically
any function which can transform a color into a number). The following
comparators are bundled:

- [`selectChannel(i)`](https://docs.thi.ng/umbrella/color/functions/selectChannel.html) - sort by channel
- [`proximity(target, distFn)`](https://docs.thi.ng/umbrella/color/functions/proximity.html) - sort by distance to target color using given distance function
- [`luminance`](https://docs.thi.ng/umbrella/color/functions/luminance.html) /
  `luminanceRgb` / `luminanceSrgb` etc.

```ts tangle:export/readme-sort-theme.ts
import {
	colorsFromTheme,
	distCIEDE2000,
	lch,
	proximity,
	sort,
	type ColorThemePartTuple,
} from "@thi.ng/color";

// (theme from above example)
const theme: ColorThemePartTuple[] = [
	["cool", "goldenrod"],
	["hard", "hotpink", 0.1],
	["fresh", "springgreen", 0.1],
];

const colors = [...colorsFromTheme(theme, { num: 200, variance: 0.05 })];

sort(colors, proximity(lch("#fff"), distCIEDE2000()));
```

![sorted color swatches](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/swatches-ex02.svg)

#### Sorting memory-mapped colors

Memory mapped colors (e.g. a mapped pixel buffer) can be sorted (in place) via
[`sortMapped()`](https://docs.thi.ng/umbrella/color/functions/sortMapped.html).
This function does NOT change the order of elements in the given colors array,
BUT instead sorts the apparent order by swapping the contents of the backing
memory.

See the [pixel sorting
example](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)
for a concrete use case...

```ts tangle:export/readme-sort-buffer.ts
import { css, luminanceSrgb, sortMapped, srgb } from "@thi.ng/color";

// memory buffer of 4 sRGB colors
const buf = new Float32Array([
	0, 1, 0, 1, 0, 0.5, 0, 1, 0, 0.25, 0, 1, 0, 0.75, 0, 1,
]);

// map buffer (creates 4 SRGB instances linked to the buffer)
const pix = srgb.mapBuffer(buf);

// display original order
console.log(pix.map((x) => css(x)));
// [ '#00ff00', '#008000', '#004000', '#00bf00' ]

// sort colors (buffer!) by luminance
sortMapped(pix, luminanceSrgb);

// new order
console.log(pix.map((x) => css(x)));
// [ '#004000', '#008000', '#00bf00', '#00ff00' ]

// buffer contents have been re-ordered
console.log(buf);
// Float32Array(16) [
//     0, 0.25, 0, 1,
//     0, 0.5, 0, 1,
//     0, 0.75, 0, 1,
//     0, 1, 0, 1
// ]
```

### Gradients

The package provides several approaches, functions and presets to declaratively
define color gradients and then sample them at user-defined resolutions to
compute arrays of colors which can then be used for look-up purposes (e.g.
mapping data values to colors).

#### Multi-stop gradients in any color space

The
[`multiColorGradient()`](https://docs.thi.ng/umbrella/color/functions/multiColorGradient.html)
function can be used to generate gradients in any color space and gradient stops
must be using all the same color type. Colors are pairwise interpolated, and by
default, uses generic
[`mix()`](https://docs.thi.ng/umbrella/color/functions/mix.html) function which
delegates to type specific strategies. See
[`GradientOpts`](https://docs.thi.ng/umbrella/color/interfaces/GradientOpts.html)
for details.

![LCH example gradient](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color/lch-gradient.svg)

```ts tangle:export/readme-multi-color-gradient.ts
import { lch, multiColorGradient, swatchesH } from "@thi.ng/color";
import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { writeFileSync } "node:fs";

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
    "lch-gradient.svg",
    serialize(
        svg(
            { width: 500, height: 50, __convert: true },
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

The
[`cosineCoeffs()`](https://docs.thi.ng/umbrella/color/functions/cosineCoeffs-1.html)
function can be used to compute the cosine gradient coefficients between 2
start/end colors:

```ts tangle:export/readme-cosine-gradient.ts
import { css, cosineCoeffs, cosineGradient } from "@thi.ng/color";

// compute gradient coeffs between red / green
console.log(
	cosineGradient(10, cosineCoeffs([1, 0, 1, 1], [0, 1, 0, 1])).map((x) => css(x))
);
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

The
[`multiCosineGradient()`](https://docs.thi.ng/umbrella/color/functions/multiCosineGradient.html)
function returns an iterator of raw RGB colors based on given gradient stops.
This iterator computes a cosine gradient between each color stop and yields a
sequence of RGB values.

```ts tangle:export/readme-multi-cosine-gradient.ts
import { css, multiCosineGradient, srgb } from "@thi.ng/color";

const gradient = multiCosineGradient({
	num: 10,
	// gradient stops (normalized positions)
	stops: [
		[0.1, [1, 0, 0, 1]],
		[0.5, [0, 1, 0, 1]],
		[0.9, [0, 0, 1, 1]],
	],
	// optional color transform/coercion
	tx: srgb
});

console.log(gradient);
// [
// 	[1, 0, 0, 1],
// 	[1, 0, 0, 1],
// 	[0.854, 0.146, 0, 1],
// 	[0.5, 0.5, 0, 1],
// 	[0.146, 0.854, 0, 1],
// 	[0, 1, 0, 1],
// 	[0, 0.854, 0.146, 1],
// 	[0, 0.5, 0.5, 1],
// 	[0, 0.146, 0.853, 1],
// 	[0, 0, 1, 1],
// 	[0, 0, 1, 1]
// ]

// convert to CSS
console.log(gradient.map((x) => css(x)));
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
concatenation (see
[`concat()`](https://docs.thi.ng/umbrella/color/functions/concat.html)) for more
efficient application.

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

<!-- include ../../assets/tpl/footer.md -->
