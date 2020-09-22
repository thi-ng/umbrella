<!-- This file is generated - DO NOT EDIT! -->

# ![strings](https://media.thi.ng/umbrella/banners/thing-strings.svg?d9c5892d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/strings.svg)](https://www.npmjs.com/package/@thi.ng/strings)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/strings.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic usage examples](#basic-usage-examples)
  - [General](#general)
  - [Case](#case)
  - [Numeric & radix-based](#numeric--radix-based)
  - [Padding / truncation](#padding---truncation)
  - [Units](#units)
  - [String creation & editing](#string-creation--editing)
- [Authors](#authors)
- [License](#license)

## About

Various higher-order, configurable string formatting & utility
functions, some memoized. Please sources / docstrings for now.

Partially based on Clojure version of [thi.ng/strf](http://thi.ng/strf).

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=is%3Aissue+is%3Aopen+%5Bstrings%5D)

## Installation

```bash
yarn add @thi.ng/strings
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/strings?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/strings/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 2.72 KB / CJS: 2.97 KB / UMD: 2.84 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/memoize](https://github.com/thi-ng/umbrella/tree/develop/packages/memoize)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                 | Description                                                            | Live demo                                                 | Source                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/crypto-chart.png" width="240"/>        | Basic crypto-currency candle chart with multiple moving averages plots | [Demo](https://demo.thi.ng/umbrella/crypto-chart/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/crypto-chart)        |
|                                                                                                                            | Basic SPA example with atom-based UI router                            | [Demo](https://demo.thi.ng/umbrella/login-form/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/login-form)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-spreadsheet.png" width="240"/> | rstream based spreadsheet w/ S-expression formula DSL                  | [Demo](https://demo.thi.ng/umbrella/rstream-spreadsheet/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-spreadsheet) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/xml-converter.png" width="240"/>       | XML/HTML/SVG to hiccup/JS conversion                                   | [Demo](https://demo.thi.ng/umbrella/xml-converter/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/xml-converter)       |

## API

[Generated API docs](https://docs.thi.ng/umbrella/strings/)

### Basic usage examples

```ts
// create a custom string formatter
const fmt = defFormat([
    "Price: ",
    { usd: "$", gbp: "£", eur: "€" },
    float(2),
    " (",
    percent(2),
    " off)"
]);

// use format
fmt("usd", 1.2345, 0.5);
// Price: $1.23 (50.00% off)

fmt("eur", 1.2345, 0.25)
// Price: €1.23 (25.00% off)
```

### General

- `defFormat`
- `format`
- `hstr`
- `ignore`
- `interpolate`
- `str`

### Case

- `camel`
- `capitalize`
- `kebab`
- `lower`
- `snake`
- `slugify`
- `upper`

### Numeric & radix-based

- `float`
- `floatFixedWidth`
- `maybeParseFloat`
- `maybeParseInt`
- `percent`
- `radix`
- `uuid`
- `B8` / `B16` / `B32` - binary / bitstring presets
- `U8` / `U16` / `U24` / `U32` / `U64` - hex format presets (unsigned values)

### Padding / truncation

- `center`
- `padLeft`
- `padRight`
- `truncate`
- `truncateLeft`
- `wrap`
- `Z2` / `Z3` / `Z4` - zero-pad presets

### Units

- `units` - define new unit w/ magnitudes & suffixes
- `bits`
- `bytes`
- `grams`
- `meters`
- `seconds`

### String creation & editing

- `charRange`
- `repeat`
- `splice`

## Authors

Karsten Schmidt

## License

&copy; 2015 - 2020 Karsten Schmidt // Apache Software License 2.0
