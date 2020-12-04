# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

Various higher-order, configurable string formatting & utility
functions, some memoized. Please sources / docstrings for now.

Partially based on Clojure version of [thi.ng/strf](http://thi.ng/strf).

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
