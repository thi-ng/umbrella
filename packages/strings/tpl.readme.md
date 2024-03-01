<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

Various (~100) string formatting, word wrapping & utility functions, some
higher-order, some memoized.

Partially based on Clojure version of [thi.ng/strf](http://thi.ng/strf).

### General

- `defFormat` / `format`
- `interpolate` / `interpolateKeys`
- `escape` / `unescape`
- `join` / `splice` / `split`
- `repeat`
- `stringify`

### Numeric formatters

- `currency` / `chf` / `eur` / `gpb` / `usd` / `yen`
- `radix`
- `int` / `intLocale`
- `float` / `floatFixedWidth`
- `maybeParseFloat` / `maybeParseInt`
- `percent`
- `uuid`
- `vector`
- `B8` / `B16` / `B32` - fixed size binary formatters
- `U8` / `U16` / `U24` / `U32` / `U64` - fixed size hex formatters
- `Z2` / `Z3` / `Z4` - fixed sized zero padded number formatters

### Casing

- `lower` / `upper` / `capitalize`
- `camel` / `kebab` / `snake` / `upperSnake`

### Slugify

- `slugify` / `slugifyGH`

### ANSI

- `isAnsi` / `isAnsiEnd` / `isAnsiStart`
- `stripAnsi`
- `lengthAnsi`

### Word wrapping

- `wordWrap` / `wordWrapLine` / `wordWrapLines`
- `SPLIT_PLAIN` / `SPLIT_ANSI`

### Padding / wrapping

- `center`
- `padLeft` / `padRight`
- `truncate` / `truncateLeft` / `truncateRight`
- `trim`
- `wrap`

### Indentation

- `spacesToTabs` / `spacesToTabsLine`
- `tabsToSpaces` / `tabsToSpacesLine`

### Char range presets / lookup tables

- `charRange`
- `ALPHA` / `ALPHA_NUM` / `DIGITS` / `LOWER` / `UPPER` / `HEX`
- `BOM` / `ESCAPES` / `ESCAPES_REV`
- `WS` / `PUNCTUATION`

### Units

- `units`
- `bits` / `bytes`
- `grams`
- `meters`
- `seconds`
- `ruler` / `grid`

### Miscellaneous

- `hstr` - [Hollerith strings](https://en.wikipedia.org/wiki/Hollerith_constant)
- `computeCursorPos`

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

### Basic usage examples

```ts
import { defFormat, float, percent } from "@thi.ng/strings";

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

<!-- include ../../assets/tpl/footer.md -->
