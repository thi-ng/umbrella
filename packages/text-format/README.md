<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/text-format](https://media.thi.ng/umbrella/banners-20230807/thing-text-format.svg?c90d9fe3)

[![npm version](https://img.shields.io/npm/v/@thi.ng/text-format.svg)](https://www.npmjs.com/package/@thi.ng/text-format)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/text-format.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Format identifiers](#format-identifiers)
    - [Colors](#colors)
    - [Stylistic variations](#stylistic-variations)
    - [Combined formats](#combined-formats)
    - [Compatibility](#compatibility)
  - [String conversion format presets](#string-conversion-format-presets)
    - [256 color ANSI format](#256-color-ansi-format)
    - [16bit color ANSI & HTML formats](#16bit-color-ansi--html-formats)
  - [Ad-hoc formatting of strings](#ad-hoc-formatting-of-strings)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Customizable color text formatting with presets for ANSI & HTML.

This package provides a number of color and other styling format constants, as
well as formatting functions to interpret and apply these abstract format
identifiers for different output formats.

### Format identifiers

The format constants provided by this package are _primarily_ (not exclusively)
aimed at being used with the
[@thi.ng/text-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/text-canvas)
package. The text canvas stores all characters in a `Uint32Array` with the lower
16 bits used for the UTF-16 code and the upper 16 bits for **abitrary**
formatting data.

The [format
IDs](https://github.com/thi-ng/umbrella/blob/develop/packages/text-format/src/api.ts#L146)
provided here are tailored for some of the included ANSI & HTML formatters, but
users are free to choose use any other interpretation (but then will also need
to implement a custom string formatter impl).

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

#### Stylistic variations

- `BOLD`
- `DIM`
- `UNDERLINE`

#### Combined formats

Format IDs can be combined via the binary OR operator, e.g.:

`FG_BLACK | BG_LIGHT_CYAN | BOLD | UNDERLINE`

#### Compatibility

These above listed built-in format IDs are only compatible with these bundled
formatters (described below):

- `FMT_ANSI16`
- `FMT_HTML_INLINE_CSS`
- `FMT_HTML_TACHYONS`

### String conversion format presets

String formatting is completely customizable via the [`StringFormat`
interface](https://docs.thi.ng/umbrella/text-format/interfaces/StringFormat.html).
Currently the following presets are supplied:

- `FMT_ANSI16` - translate built-in format IDs to 4-bit ANSI escape sequences
- `FMT_ANSI256` - uses all 16 format bits for fg & bg colors (ANSI esc sequences)
- `FMT_ANSI565` - uses all 16 format bits for RGB565 fg colors (ANSI esc sequences)
- `FMT_ANSI_RAW` - verbatim use of format IDs to ANSI sequences
- `FMT_HTML_INLINE_CSS` - HTML `<span>` elements with inline CSS
- `FMT_HTML_TACHYONS` - HTML `<span>` elements with [Tachyons
  CSS](http://tachyons.io/) class names
- `FMT_HTML565` - HTML `<span>` elements with RGB565 color coding
- `FMT_NONE` - dummy formatter outputting plain text only (all format
  information discarded, e.g. for [`NO_COLOR`](https://no-color.org/) support)

#### 256 color ANSI format

If targeting this output format, all 16 bits available for formatting
information are used to encode 2x 8bit foreground/background colors. Therefore,
none of the above mentioned preset color names and/or any additional formatting
flags (e.g. bold, underline etc.) **cannot be used**. Instead, use the
[`format256()`](https://docs.thi.ng/umbrella/text-format/functions/format256.html)
function to create a format ID based on given FG, BG colors.

![ANSI256 color pallette](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/text-canvas/ansi256.png)

Source: [Wikipedia](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit)

#### 16bit color ANSI & HTML formats

Similar to the above custom ANSI format, here all available 16 bits are used to
store color information, but here in the standard [RGB565
format](https://en.wikipedia.org/wiki/High_color) (5bits red, 6bits green, 5bits
blue). This too means, only _either_ the text or background color<sup>(1)</sup>
can be controlled and no other formatting flags (bold, underline etc.) are
available.

<sup>(1)</sup> In the ANSI version it's always only the text color.

These formats are primarily intended for image display, see the
[@thi.ng/text-canvas
readme](https://github.com/thi-ng/umbrella/blob/develop/packages/text-canvas/README.md#image-functions)
for usage examples...

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

Furthermore,
[`defFormatPresets()`](https://docs.thi.ng/umbrella/text-format/functions/defFormatPresets.html)
can be used to create formatting functions for all 16 preset [foreground color
IDs](#colors) for a given string format strategy:

```ts
// since v1.3.0 also available as PRESET_ANSI16
const ansi = defFormatPresets(FMT_ANSI16);

`${ansi.green("hello")} ${ansi.lightRed("world")}!`;
// '\x1B[32mhello\x1B[0m \x1B[91mworld\x1B[0m!'

const html = defFormatPresets(FMT_HTML_TACHYONS);

`${html.green("hello")} ${html.lightRed("world")}!`;
// '<span class="dark-green ">hello</span> <span class="red ">world</span>!'
```

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btext-format%5D+in%3Atitle)

## Related packages

- [@thi.ng/text-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/text-canvas) - Text based canvas, drawing, tables with arbitrary formatting (incl. ANSI/HTML)

## Installation

```bash
yarn add @thi.ng/text-format
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/text-format"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const textFormat = await import("@thi.ng/text-format");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.63 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/develop/packages/hex)
- [@thi.ng/memoize](https://github.com/thi-ng/umbrella/tree/develop/packages/memoize)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                               | Description                                  | Live demo                                               | Source                                                                               |
|:-------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------|:--------------------------------------------------------|:-------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas.png" width="240"/>       | 3D wireframe textmode demo                   | [Demo](https://demo.thi.ng/umbrella/text-canvas/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas-image.png" width="240"/> | Textmode image warping w/ 16bit color output | [Demo](https://demo.thi.ng/umbrella/text-canvas-image/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas-image) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/text-format/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-text-format,
  title = "@thi.ng/text-format",
  author = "Karsten Schmidt",
  note = "https://thi.ng/text-format",
  year = 2020
}
```

## License

&copy; 2020 - 2023 Karsten Schmidt // Apache License 2.0
