<!-- This file is generated - DO NOT EDIT! -->

# ![text-canvas](https://media.thi.ng/umbrella/banners/thing-text-canvas.svg?8263e686)

[![npm version](https://img.shields.io/npm/v/@thi.ng/text-canvas.svg)](https://www.npmjs.com/package/@thi.ng/text-canvas)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/text-canvas.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Canvas creation](#canvas-creation)
  - [Format identifiers](#format-identifiers)
    - [Colors](#colors)
    - [Variations](#variations)
    - [Combined formats](#combined-formats)
  - [String conversion format presets](#string-conversion-format-presets)
  - [256 color ANSI format](#256-color-ansi-format)
  - [16bit color ANSI & HTML formats](#16bit-color-ansi--html-formats)
  - [Ad-hoc formatting of strings](#ad-hoc-formatting-of-strings)
  - [Stroke styles](#stroke-styles)
  - [Clipping](#clipping)
  - [Drawing functions](#drawing-functions)
  - [Image functions](#image-functions)
  - [Text functions](#text-functions)
  - [Bars & bar charts](#bars--bar-charts)
  - [Tables](#tables)
  - [3D wireframe cube example](#3d-wireframe-cube-example)
- [Authors](#authors)
- [License](#license)

## About

Text based canvas, drawing, tables with arbitrary formatting (incl. ANSI/HTML).

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btext-canvas%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/text-canvas
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/text-canvas?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/text-canvas/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 6.02 KB / CJS: 6.38 KB / UMD: 6.12 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/geom-clip-line](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-clip-line)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/memoize](https://github.com/thi-ng/umbrella/tree/develop/packages/memoize)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                               | Description                                  | Live demo                                               | Source                                                                               |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas.png" width="240"/>       | 3D wireframe textmode demo                   | [Demo](https://demo.thi.ng/umbrella/text-canvas/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas-image.png" width="240"/> | Textmode image warping w/ 16bit color output | [Demo](https://demo.thi.ng/umbrella/text-canvas-image/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas-image) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/text-canvas/)

### Canvas creation

```ts
const c = canvas(width, height, format?, style?);
```

### Format identifiers

The text canvas stores all characters in a `Uint32Array` with the lower 16 bits
used for the UTF-16 code and the upper 16 bits for **abitrary** formatting data.
The package [provides its own format
IDs](https://github.com/thi-ng/umbrella/blob/develop/packages/text-canvas/src/api.ts#L146)
which are tailored for the bundled ANSI & HTML formatters, but users are free to
choose use any other system (but then will also need to implement a custom
string formatter impl).

The default format ID layout is as shown:

![format bit layout](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/text-canvas/format-layout.png)

Most drawing functions accept an optional `format` arg, but a default
format can also be set via `setFormat(canvas, formatID)`.

The following built-in format IDs are only compatible with these formatters:

- `FMT_ANSI16`
- `FMT_HTML_INLINE_CSS`
- `FMT_HTML_TACHYONS`

Custom formatters are discussed further below:

- [`FMT_ANSI256`](#256-color-ansi-format)
- [`FMT_HTML_565`](#16bit-color-html-format)

#### Colors

These color IDs MUST be prefixed with either `FG_` (foreground) or `BG_`
(background):

- `BLACK`
- `RED`
- `GREEN`
- `YELLOW`
- `BLUE`
- `MAGENTA`
- `CYAN`
- `GRAY`
- `WHITE`
- `LIGHT_GRAY`
- `LIGHT_RED`
- `LIGHT_GREEN`
- `LIGHT_YELLOW`
- `LIGHT_BLUE`
- `LIGHT_MAGENTA`
- `LIGHT_CYAN`

#### Variations

- `BOLD`
- `DIM`
- `UNDERLINE`

#### Combined formats

Format IDs can be combined via the binary OR operator (`|`), e.g.:

```ts
setFormat(canvas, FG_BLACK | BG_LIGHT_CYAN | BOLD | UNDERLINE);
```

### String conversion format presets

Canvas-to-string conversion is completely customizable via the [`StringFormat`
interface](https://github.com/thi-ng/umbrella/blob/develop/packages/text-canvas/src/api.ts#L78)
and the following presets are supplied:

- `FMT_ANSI16` - translate built-in format IDs to 4bit ANSI escape sequences
- `FMT_ANSI256` - uses all 16 format bits for fg & bg colors (ANSI esc sequences)
- `FMT_ANSI_RAW` - verbatim use of format IDs to ANSI sequences
- `FMT_HTML_INLINE_CSS` - HTML `<span>` elements with inline CSS
- `FMT_HTML_TACHYONS` - HTML `<span>` elements with [Tachyons
  CSS](http://tachyons.io/) class names
- `FMT_NONE` - dummy formatter outputting plain text only (all format
  information discarded)

```ts
// Terminal
console.log(toString(canvas, FMT_ANSI16));
// or
console.log(toString(canvas, FMT_ANSI256));

// Browser
const el = document.createElement("pre");
el.innerHTML = toString(canvas, FMT_HTML_TACHYONS);
```

### 256 color ANSI format

If targeting this output format, all 16 bits available for formatting
information are used to encode 2x 8bit foreground/background colors. Therefore,
none of the above mentioned preset color names and/or any additional formatting
flags (e.g. bold, underline etc.) **cannot be used**. Instead, use the
`format256()` function to compute a format ID based on given FG, BG colors.

```ts
// deep purple on yellow bg
textLine(canvas, 1, 1, "hello color!", format256(19, 226));
```

![ANSI256 color pallette](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/text-canvas/ansi256.png)

Source: [Wikipedia](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit)

### 16bit color ANSI & HTML formats

Similar to the above custom ANSI format, here all available 16 bits are used to
store color information, in the standard [RGB565
format](https://en.wikipedia.org/wiki/High_color) (5bits red, 6bits green, 5bits
blue). This also means, only either the text or background color<sup>(1)</sup> can be
controlled and no other formatting flag (bold, underline etc.) are available.

<sup>(1)</sup> In the ANSI version it's always only the text color.

```ts
const el = document.createElement("pre");
// format and assign text colors
el.innerHTML = toString(canvas, FMT_HTML565());

// assign bg colors
el.innerHTML = toString(canvas, FMT_HTML565("background"));
```

These formats are primarily intended for image display, see
[section](#image-functions) below for examples...

### Ad-hoc formatting of strings

String formatters can also be used in an ad-hoc manner, without requiring any of
the other text canvas functionality.

```ts
// create & use a HTML formatter
defFormat(FMT_HTML_INLINE_CSS, FG_LIGHT_RED | BG_GRAY)("hello")
// "<span style="color:#f55;background:#555;">hello</span>"

// create & use an ANSI formatter
defFormat(FMT_ANSI16, FG_LIGHT_RED | BG_GRAY)("hello")
// "\x1B[91;100mhello\x1B[0m"

// ANSI syntax sugar (same result as above)
defAnsi16(FG_LIGHT_RED | BG_GRAY)("hello")
// "\x1B[91;100mhello\x1B[0m"
```

Furthermore, `defFormatPresets()` can be used to create formatting functions for
all 16 preset [foreground color IDs](#colors) for a given string format
strategy:

```ts
const ansi = defFormatPresets(FMT_ANSI16);

`${ansi.green("hello")} ${ansi.lightRed("world")}!`;
// '\x1B[32mhello\x1B[0m \x1B[91mworld\x1B[0m!'

const html = defFormatPresets(FMT_HTML_TACHYONS);

`${html.green("hello")} ${html.lightRed("world")}!`;
// '<span class="dark-green ">hello</span> <span class="red ">world</span>!'
```

### Stroke styles

Built-in style presets:

- `STYLE_ASCII`
- `STYLE_THIN`
- `STYLE_THIN_ROUNDED`
- `STYLE_DASHED`
- `STYLE_DASHED_ROUNDED`
- `STYLE_DOUBLE`

Functions:

- `beginStyle(canvas, style)`
- `endStyle(canvas)`

### Clipping

All drawing operations are constrained to the currently active clipping rect (by
default full canvas). The canvas maintains a stack of such clipping regions,
each newly pushed one being intersected with the previous top-of-stack rect:

- `beginClip(canvas, x, y, w, h)` - push new clip rect
- `endClip(canvas)` - restore previous clip rect

```text
┌──────────────────┐
│ A                │
│         ╔════════╗─────────┐
│         ║        ║         │
│         ║ A & B  ║         │
│         ║        ║         │
└─────────╚════════╝         │
          │                B │
          └──────────────────┘
```

### Drawing functions

- `line`
- `hline`
- `vline`
- `circle`

- `clear`
- `fillRect`
- `strokeRect`

### Image functions

- `blit`
- `resize`
- `extract`
- `scrollV`
- `image` / `imageRaw` / `imageCanvas565` / `imageString565`

```ts
import { RGB565 } from "@thi.ng/pixel";
import { read } from "@thi.ng/pixel-io-netpbm";

// resize non-proportionally (to compensate
// for character aspect ratio, YMMV)
const img = read(readFileSync("chroma-rings.ppm"))
  .resize(32, 32 / 2.25)
  .as(RGB565)

// requires an ANSI 24bit compatible terminal
console.log(imageString565(img));
```

<pre><span style="color:#00205a">█</span><span style="color:#080420">█</span><span style="color:#310000">█</span><span style="color:#621800">█</span><span style="color:#9c4418">█</span><span style="color:#c5794a">█</span><span style="color:#e6aa7b">█</span><span style="color:#f6ceac">█</span><span style="color:#ffead5">█</span><span style="color:#fffaee">█</span><span style="color:#ffffff">██</span><span style="color:#f6faff">█</span><span style="color:#f6f6ff">█</span><span style="color:#f6f6f6">█</span><span style="color:#fff6f6">█</span><span style="color:#fffaf6">█</span><span style="color:#fffaff">█</span><span style="color:#ffffff">█</span><span style="color:#eeffff">█</span><span style="color:#d5f6ff">█</span><span style="color:#b4e6f6">█</span><span style="color:#83cae6">█</span><span style="color:#52a1c5">█</span><span style="color:#206d9c">█</span><span style="color:#003c6a">█</span><span style="color:#001439">█</span><span style="color:#180010">█</span><span style="color:#520800">█</span><span style="color:#833008">█</span><span style="color:#836d31">█</span><span style="color:#838573">█</span><br/></span><span style="color:#620c00">█</span><span style="color:#a43808">█</span><span style="color:#de7d39">█</span><span style="color:#ffba7b">█</span><span style="color:#ffeabd">█</span><span style="color:#eeffee">█</span><span style="color:#cdfaff">█</span><span style="color:#ace2ff">█</span><span style="color:#8bc2e6">█</span><span style="color:#6a9dc5">█</span><span style="color:#527d9c">█</span><span style="color:#41617b">█</span><span style="color:#394c62">█</span><span style="color:#39404a">█</span><span style="color:#413c41">█</span><span style="color:#4a3c39">█</span><span style="color:#5a4039">█</span><span style="color:#735041">█</span><span style="color:#946552">█</span><span style="color:#bd8162">█</span><span style="color:#dea583">█</span><span style="color:#f6caa4">█</span><span style="color:#ffeacd">█</span><span style="color:#eeffee">█</span><span style="color:#c5faff">█</span><span style="color:#8be2ff">█</span><span style="color:#41aede">█</span><span style="color:#106dac">█</span><span style="color:#002c6a">█</span><span style="color:#080429">█</span><span style="color:#080400">█</span><span style="color:#080800">█</span><br/></span><span style="color:#ee8941">█</span><span style="color:#ffce8b">█</span><span style="color:#eef6d5">█</span><span style="color:#bdfaff">█</span><span style="color:#7bdaff">█</span><span style="color:#41a1de">█</span><span style="color:#1865a4">█</span><span style="color:#003062">█</span><span style="color:#001031">█</span><span style="color:#000010">█</span><span style="color:#100000">█</span><span style="color:#180800">█</span><span style="color:#201408">█</span><span style="color:#201c10">█</span><span style="color:#202418">█</span><span style="color:#102020">█</span><span style="color:#081c20">█</span><span style="color:#001018">█</span><span style="color:#000410">█</span><span style="color:#080000">█</span><span style="color:#290000">█</span><span style="color:#5a1400">█</span><span style="color:#943c10">█</span><span style="color:#d57139">█</span><span style="color:#f6ae73">█</span><span style="color:#ffe2b4">█</span><span style="color:#deffe6">█</span><span style="color:#94f2ff">█</span><span style="color:#4ac2f6">█</span><span style="color:#1875bd">█</span><span style="color:#182c73">█</span><span style="color:#181829">█</span><br/></span><span style="color:#eef2bd">█</span><span style="color:#acfff6">█</span><span style="color:#62d6ff">█</span><span style="color:#2091d5">█</span><span style="color:#00448b">█</span><span style="color:#001041">█</span><span style="color:#200010">█</span><span style="color:#521000">█</span><span style="color:#833810">█</span><span style="color:#b46939">█</span><span style="color:#cd996a">█</span><span style="color:#debe9c">█</span><span style="color:#eed6bd">█</span><span style="color:#eee2d5">█</span><span style="color:#e6eae6">█</span><span style="color:#deeaee">█</span><span style="color:#c5e2ee">█</span><span style="color:#a4d2e6">█</span><span style="color:#73b6d5">█</span><span style="color:#4191b4">█</span><span style="color:#10618b">█</span><span style="color:#002c5a">█</span><span style="color:#080829">█</span><span style="color:#390008">█</span><span style="color:#831800">█</span><span style="color:#cd5518">█</span><span style="color:#ffa152">█</span><span style="color:#f6e2a4">█</span><span style="color:#c5ffe6">█</span><span style="color:#83e6ff">█</span><span style="color:#83a5e6">█</span><span style="color:#8385a4">█</span><br/></span><span style="color:#83f2ff">█</span><span style="color:#31baf6">█</span><span style="color:#0065b4">█</span><span style="color:#001c62">█</span><span style="color:#390018">█</span><span style="color:#831400">█</span><span style="color:#c55518">█</span><span style="color:#f69d5a">█</span><span style="color:#ffdea4">█</span><span style="color:#f6fade">█</span><span style="color:#deffff">█</span><span style="color:#c5eaff">█</span><span style="color:#b4d2ee">█</span><span style="color:#acbacd">█</span><span style="color:#b4aebd">█</span><span style="color:#cdaeac">█</span><span style="color:#e6beac">█</span><span style="color:#ffd6bd">█</span><span style="color:#ffeed5">█</span><span style="color:#e6ffee">█</span><span style="color:#acf6ff">█</span><span style="color:#62d2f6">█</span><span style="color:#2091cd">█</span><span style="color:#00448b">█</span><span style="color:#100c41">█</span><span style="color:#520008">█</span><span style="color:#ac2800">█</span><span style="color:#ee7529">█</span><span style="color:#ffca7b">█</span><span style="color:#defacd">█</span><span style="color:#def2ff">█</span><span style="color:#dedeee">█</span><br/></span><span style="color:#29baf6">█</span><span style="color:#0061bd">█</span><span style="color:#101462">█</span><span style="color:#5a0010">█</span><span style="color:#ac2800">█</span><span style="color:#ee7d29">█</span><span style="color:#ffce7b">█</span><span style="color:#defad5">█</span><span style="color:#94f6ff">█</span><span style="color:#52bef6">█</span><span style="color:#2079bd">█</span><span style="color:#083c7b">█</span><span style="color:#001439">█</span><span style="color:#000410">█</span><span style="color:#000000">█</span><span style="color:#100000">█</span><span style="color:#310800">█</span><span style="color:#6a1c08">█</span><span style="color:#b44818">█</span><span style="color:#ee894a">█</span><span style="color:#ffce8b">█</span><span style="color:#defacd">█</span><span style="color:#8bf6ff">█</span><span style="color:#39bef6">█</span><span style="color:#0069bd">█</span><span style="color:#081c62">█</span><span style="color:#520018">█</span><span style="color:#ac2000">█</span><span style="color:#f67520">█</span><span style="color:#ffce7b">█</span><span style="color:#ffffd5">█</span><span style="color:#ffffff">█</span><br/></span><span style="color:#0889de">█</span><span style="color:#00308b">█</span><span style="color:#410029">█</span><span style="color:#a41400">█</span><span style="color:#ee6918">█</span><span style="color:#ffc66a">█</span><span style="color:#cdfac5">█</span><span style="color:#73eeff">█</span><span style="color:#20a5ee">█</span><span style="color:#004ca4">█</span><span style="color:#100c4a">█</span><span style="color:#4a0008">█</span><span style="color:#7b2800">█</span><span style="color:#836129">█</span><span style="color:#6a8162">█</span><span style="color:#318183">█</span><span style="color:#00557b">█</span><span style="color:#001c52">█</span><span style="color:#390018">█</span><span style="color:#941400">█</span><span style="color:#e65d10">█</span><span style="color:#ffba62">█</span><span style="color:#d5f6bd">█</span><span style="color:#7bf6f6">█</span><span style="color:#20b6f6">█</span><span style="color:#0055b4">█</span><span style="color:#200c52">█</span><span style="color:#7b0408">█</span><span style="color:#d54000">█</span><span style="color:#ffa141">█</span><span style="color:#ffeea4">█</span><span style="color:#fffaf6">█</span><br/></span><span style="color:#0075cd">█</span><span style="color:#082073">█</span><span style="color:#5a0020">█</span><span style="color:#bd2400">█</span><span style="color:#ff8129">█</span><span style="color:#f6da83">█</span><span style="color:#a4ffde">█</span><span style="color:#41daff">█</span><span style="color:#007dd5">█</span><span style="color:#08247b">█</span><span style="color:#520020">█</span><span style="color:#b42000">█</span><span style="color:#f67d20">█</span><span style="color:#ffd683">█</span><span style="color:#e6ffde">█</span><span style="color:#8bffff">█</span><span style="color:#31c6ff">█</span><span style="color:#0069c5">█</span><span style="color:#181462">█</span><span style="color:#6a0010">█</span><span style="color:#cd3400">█</span><span style="color:#ff9139">█</span><span style="color:#e6e69c">█</span><span style="color:#94ffee">█</span><span style="color:#31caff">█</span><span style="color:#006dcd">█</span><span style="color:#10186a">█</span><span style="color:#620010">█</span><span style="color:#c53000">█</span><span style="color:#f69131">█</span><span style="color:#f6e694">█</span><span style="color:#f6f6e6">█</span><br/></span><span style="color:#0889de">█</span><span style="color:#00308b">█</span><span style="color:#410029">█</span><span style="color:#a41400">█</span><span style="color:#ee6918">█</span><span style="color:#ffc66a">█</span><span style="color:#cdfac5">█</span><span style="color:#73eeff">█</span><span style="color:#20a5ee">█</span><span style="color:#004ca4">█</span><span style="color:#100c4a">█</span><span style="color:#4a0008">█</span><span style="color:#7b2800">█</span><span style="color:#836129">█</span><span style="color:#6a8162">█</span><span style="color:#318183">█</span><span style="color:#00557b">█</span><span style="color:#001c52">█</span><span style="color:#390018">█</span><span style="color:#941400">█</span><span style="color:#e65d10">█</span><span style="color:#ffba62">█</span><span style="color:#d5f6bd">█</span><span style="color:#7bf6f6">█</span><span style="color:#20b6f6">█</span><span style="color:#0055b4">█</span><span style="color:#200c52">█</span><span style="color:#7b0408">█</span><span style="color:#d54000">█</span><span style="color:#ffa141">█</span><span style="color:#ffeea4">█</span><span style="color:#fffaf6">█</span><br/></span><span style="color:#29baf6">█</span><span style="color:#0061bd">█</span><span style="color:#101462">█</span><span style="color:#5a0010">█</span><span style="color:#ac2800">█</span><span style="color:#ee7d29">█</span><span style="color:#ffce7b">█</span><span style="color:#defad5">█</span><span style="color:#94f6ff">█</span><span style="color:#52bef6">█</span><span style="color:#2079bd">█</span><span style="color:#083c7b">█</span><span style="color:#001439">█</span><span style="color:#000410">█</span><span style="color:#000000">█</span><span style="color:#100000">█</span><span style="color:#310800">█</span><span style="color:#6a1c08">█</span><span style="color:#b44818">█</span><span style="color:#ee894a">█</span><span style="color:#ffce8b">█</span><span style="color:#defacd">█</span><span style="color:#8bf6ff">█</span><span style="color:#39bef6">█</span><span style="color:#0069bd">█</span><span style="color:#081c62">█</span><span style="color:#520018">█</span><span style="color:#ac2000">█</span><span style="color:#f67520">█</span><span style="color:#ffce7b">█</span><span style="color:#ffffd5">█</span><span style="color:#ffffff">█</span><br/></span><span style="color:#83f2ff">█</span><span style="color:#31baf6">█</span><span style="color:#0065b4">█</span><span style="color:#001c62">█</span><span style="color:#390018">█</span><span style="color:#831400">█</span><span style="color:#c55518">█</span><span style="color:#f69d5a">█</span><span style="color:#ffdea4">█</span><span style="color:#f6fade">█</span><span style="color:#deffff">█</span><span style="color:#c5eaff">█</span><span style="color:#b4d2ee">█</span><span style="color:#acbacd">█</span><span style="color:#b4aebd">█</span><span style="color:#cdaeac">█</span><span style="color:#e6beac">█</span><span style="color:#ffd6bd">█</span><span style="color:#ffeed5">█</span><span style="color:#e6ffee">█</span><span style="color:#acf6ff">█</span><span style="color:#62d2f6">█</span><span style="color:#2091cd">█</span><span style="color:#00448b">█</span><span style="color:#100c41">█</span><span style="color:#520008">█</span><span style="color:#ac2800">█</span><span style="color:#ee7529">█</span><span style="color:#ffca7b">█</span><span style="color:#defacd">█</span><span style="color:#def2ff">█</span><span style="color:#dedeee">█</span><br/></span><span style="color:#eef2bd">█</span><span style="color:#acfff6">█</span><span style="color:#62d6ff">█</span><span style="color:#2091d5">█</span><span style="color:#00448b">█</span><span style="color:#001041">█</span><span style="color:#200010">█</span><span style="color:#521000">█</span><span style="color:#833810">█</span><span style="color:#b46939">█</span><span style="color:#cd996a">█</span><span style="color:#debe9c">█</span><span style="color:#eed6bd">█</span><span style="color:#eee2d5">█</span><span style="color:#e6eae6">█</span><span style="color:#deeaee">█</span><span style="color:#c5e2ee">█</span><span style="color:#a4d2e6">█</span><span style="color:#73b6d5">█</span><span style="color:#4191b4">█</span><span style="color:#10618b">█</span><span style="color:#002c5a">█</span><span style="color:#080829">█</span><span style="color:#390008">█</span><span style="color:#831800">█</span><span style="color:#cd5518">█</span><span style="color:#ffa152">█</span><span style="color:#f6e2a4">█</span><span style="color:#c5ffe6">█</span><span style="color:#83e6ff">█</span><span style="color:#83a5e6">█</span><span style="color:#8385a4">█</span><br/></span><span style="color:#ee8941">█</span><span style="color:#ffce8b">█</span><span style="color:#eef6d5">█</span><span style="color:#bdfaff">█</span><span style="color:#7bdaff">█</span><span style="color:#41a1de">█</span><span style="color:#1865a4">█</span><span style="color:#003062">█</span><span style="color:#001031">█</span><span style="color:#000010">█</span><span style="color:#100000">█</span><span style="color:#180800">█</span><span style="color:#201408">█</span><span style="color:#201c10">█</span><span style="color:#202418">█</span><span style="color:#102020">█</span><span style="color:#081c20">█</span><span style="color:#001018">█</span><span style="color:#000410">█</span><span style="color:#080000">█</span><span style="color:#290000">█</span><span style="color:#5a1400">█</span><span style="color:#943c10">█</span><span style="color:#d57139">█</span><span style="color:#f6ae73">█</span><span style="color:#ffe2b4">█</span><span style="color:#deffe6">█</span><span style="color:#94f2ff">█</span><span style="color:#4ac2f6">█</span><span style="color:#1875bd">█</span><span style="color:#182c73">█</span><span style="color:#181829">█</span><br/></span><span style="color:#620c00">█</span><span style="color:#a43808">█</span><span style="color:#de7d39">█</span><span style="color:#ffba7b">█</span><span style="color:#ffeabd">█</span><span style="color:#eeffee">█</span><span style="color:#cdfaff">█</span><span style="color:#ace2ff">█</span><span style="color:#8bc2e6">█</span><span style="color:#6a9dc5">█</span><span style="color:#527d9c">█</span><span style="color:#41617b">█</span><span style="color:#394c62">█</span><span style="color:#39404a">█</span><span style="color:#413c41">█</span><span style="color:#4a3c39">█</span><span style="color:#5a4039">█</span><span style="color:#735041">█</span><span style="color:#946552">█</span><span style="color:#bd8162">█</span><span style="color:#dea583">█</span><span style="color:#f6caa4">█</span><span style="color:#ffeacd">█</span><span style="color:#eeffee">█</span><span style="color:#c5faff">█</span><span style="color:#8be2ff">█</span><span style="color:#41aede">█</span><span style="color:#106dac">█</span><span style="color:#002c6a">█</span><span style="color:#080429">█</span><span style="color:#080400">█</span><span style="color:#080800">█</span></pre>

### Text functions

- `textLine`
- `textLines`
- `textColumn` (word wrapped)
- `textBox` (word wrapped)

### Bars & bar charts

The following are string builders only, draw result via text functions:

- `barHorizontal`
- `barVertical`
- `barChartHStr`
- `barChartVStr`

### Tables

Tables support individual column width, automatic (or user defined) row
heights, cell padding, as well as global and per-cell formats and the
following border style options:

| Border style     | Result                                                                                                          |
|------------------|-----------------------------------------------------------------------------------------------------------------|
| `Border.ALL`     | ![table](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/text-canvas/table-border-all.png)     |
| `Border.NONE`    | ![table](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/text-canvas/table-border-none.png)    |
| `Border.H`       | ![table](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/text-canvas/table-border-h.png)       |
| `Border.V`       | ![table](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/text-canvas/table-border-v.png)       |
| `Border.FRAME`   | ![table](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/text-canvas/table-border-frame.png)   |
| `Border.FRAME_H` | ![table](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/text-canvas/table-border-frame-h.png) |
| `Border.FRAME_V` | ![table](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/text-canvas/table-border-frame-v.png) |

Table cell contents will be word-wrapped. By default, individual words longer
than the configured cell width will be truncated, but can be forced to wrap by
enabling the `hard` option (see example below).

```ts
import { repeatedly } from "@thi.ng/transducers";
import * as tc from "@thi.ng/text-canvas";

// generate 20 random values
const data = repeatedly(() => Math.random(), 20)
// format as bar chart string
const chart = tc.barChartHStr(4, data, 0, 1);

// create text canvas
const canvas = new tc.Canvas(64, 20);

// create table
tc.table(
    canvas,
    0,
    0,
    {
        // column defs
        cols: [{ width: 4 }, { width: 20 }, { width: 8 }],
        // default cell format
        format: tc.FG_BLACK | tc.BG_LIGHT_CYAN,
        // default format for header cells (1st row)
        formatHead: tc.FG_RED | tc.BG_LIGHT_CYAN | tc.BOLD | tc.UNDERLINE,
        // border line style
        style: tc.STYLE_DASHED_ROUNDED,
        // border mode
        border: tc.Border.ALL,
        // internal cell padding [h,v]
        padding: [1, 0],
        // hard word wrap
        hard: true,
    },
    // table contents (row major)
    // each cell either a string or RawCell object
    [
        ["ID", "Main", "Comment"],
        [
            "0001",
            { body: chart, format: tc.FG_BLUE | tc.BG_LIGHT_CYAN },
            "This is a test!"
        ],
        ["0002", "Random data plot", "Word wrapped content"],
        ["0003", { body: "More details...", height: 4 }, ""]
    ]
);

// output as ANSI formatted string
console.log(tc.toString(canvas, tc.FMT_ANSI16));
```

For even more detailed control, tables can also be pre-initialized prior
to creation of the canvas via
[`initTable()`](https://github.com/thi-ng/umbrella/blob/develop/packages/text-canvas/src/table.ts#L20)
and then drawn via
[`drawTable()`](https://github.com/thi-ng/umbrella/blob/develop/packages/text-canvas/src/table.ts#L80).
The `initTable` function returns an object also containing the computed
table size (`width`, `height` keys) which can then be used to create a
canvas with the required size...

For convenience, the `tableCanvas()` function can be used to combine
these steps and to create an auto-sized canvas with the rendered table
as content.

### 3D wireframe cube example

```text
       ┌───┐
  ┌──────────────────────┐
  │ @thi.ng/text-canvas  │
  │ wireframe cube       │++++++++++
  │                      │          +++++++++++    ┌───┐
  │ x: 0.42              │                     ++++│ 6 │
  │ y: 0.30              │        ┌───┐ ++++++++   └───┘
  └──────────────────────┘++++++++│ 7 │+           +
           +         └───┘        └───┘            +
            +          +           +              +
            +          +           +              +
             +         +           +             +
             +         +          +              +
             +          +         +              +
              +         +         +             +
              +         +         +             +
               +        +        ┌───┐         +
               +         +      +│ 3 │         +
                +       ┌───┐+++ └───┘        +
                +       │ 0 │       +         +
                 +      └───┘        +        +
                 +       +            +      +
                 +       +             +     +
                  +     +               +   +
                  +     +                +  +
                   +    +                 ┌───┐
                   +    +                 │ 2 │
                    +   +               ++└───┘
                    +   +            +++
                     + +           ++
                     + +        +++
                      ++      ++
````

Code for this above example output (CLI version):

```ts
import * as geom from "@thi.ng/geom";
import * as mat from "@thi.ng/matrices";
import * as tc from "@thi.ng/text-canvas";

const W = 64;
const H = 32;

// create text canvas
const canvas = new tc.Canvas(W, H, tc.BG_BLACK, tc.STYLE_THIN);

// cube corner vertices
const cube = geom.vertices(geom.center(geom.aabb(1))!);

// edge list (vertex indices)
const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6],
    [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]
];

// animated parameters
let rotx = 0;
let roty = 0;

// 3D transformation matrices
const view = mat.lookAt([], [0, 0, 1], [0, 0, 0], [0, 1, 0]);
const proj = mat.perspective([], 90, W / H, 0.1, 10);
const viewp = mat.viewport([], 0, W, H, 0);

setInterval(() => {
    tc.clear(canvas, true);
    // model rotation matrix
    const model = mat.concat(
        [],
        mat.rotationX44([], rotx += 0.01),
        mat.rotationY44([], roty += 0.03)
    );
    // combined model-view-projection matrix
    const mvp = mat.concat([], proj, view, model);
    // draw cube instances
    // project 3D points to 2D viewport (canvas coords)
    const pts = cube.map((p) => mat.project3([], mvp, viewp, p)!);
    // draw cube edges
    for (let e of edges) {
        const a = pts[e[0]];
        const b = pts[e[1]];
        tc.line(canvas, a[0], a[1], b[0], b[1], "+", tc.FG_WHITE | tc.BG_RED);
    }
    // draw vertex labels
    canvas.format = tc.FG_WHITE | tc.BG_BLUE;
    for (let i = 0; i < 8; i++) {
        const p = pts[i];
        tc.textBox(canvas, p[0] - 1, p[1] - 1, 5, 3, ` ${i} `);
    }
    tc.textBox(
        canvas,
        2, 1, 24, -1,
        `@thi.ng/text-canvas wireframe cube\n\nx: ${rotx.toFixed(2)}\ny: ${roty.toFixed(2)}`,
        {
            format: tc.FG_BLACK | tc.BG_LIGHT_CYAN,
            padding: [1, 0]
        }
    );
    // draw canvas
    console.clear();
    // output as ANSI formatted string
    console.log(tc.toString(canvas, tc.FMT_ANSI16));
    // output as plain text
    // console.log(tc.toString(canvas));
}, 15);
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-text-canvas,
  title = "@thi.ng/text-canvas",
  author = "Karsten Schmidt",
  note = "https://thi.ng/text-canvas",
  year = 2020
}
```

## License

&copy; 2020 - 2021 Karsten Schmidt // Apache Software License 2.0
