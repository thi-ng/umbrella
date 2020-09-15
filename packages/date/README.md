<!-- This file is generated - DO NOT EDIT! -->

# ![date](https://media.thi.ng/umbrella/banners/thing-date.svg?57458de6)

[![npm version](https://img.shields.io/npm/v/@thi.ng/date.svg)](https://www.npmjs.com/package/@thi.ng/date)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/date.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Formatters](#formatters)
- [Authors](#authors)
- [License](#license)

## About

Date/timestamp iterators, formatters, rounding.

### Status

**ALPHA** - bleeding edge / work-in-progress

## Installation

```bash
yarn add @thi.ng/date
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/date?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/date/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 1.19 KB / CJS: 1.33 KB / UMD: 1.31 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## API

[Generated API docs](https://docs.thi.ng/umbrella/date/)

TODO - Please see tests and doc strings in source for now...

### Formatters

Custom date/time formatters can be assembled via
[`defFormat()`](https://github.com/thi-ng/umbrella/blob/develop/packages/date/src/format.ts#L85),
using the following partial format identifiers.

| ID     | Description                              |
|--------|------------------------------------------|
| `yyyy` | Full year (4 digits)                     |
| `yy`   | Short year (2 digits)                    |
| `MMM`  | 3-letter month name (e.g. `Feb`)         |
| `MM`   | Zero-padded 2-digit month                |
| `M`    | Unpadded month                           |
| `dd`   | Zero-padded 2-digit day of month         |
| `d`    | Unpadded day of month                    |
| `E`    | 3-letter weekday name (e.g. `Mon`)       |
| `HH`   | Zero-padded 2-digit hour of day (0-23)   |
| `h`    | Unpadded hour of day (1-12)              |
| `mm`   | Zero-padded 2-digit minute of hour       |
| `m`    | Unpadded minute of hour                  |
| `ss`   | Zero-padded 2-digit second of minute     |
| `s`    | Unpadded second of minute                |
| `S`    | Unpadded millisecond of second           |
| `A`    | 12-hour AM/PM marker                     |
| `Z`    | Timezone offset in signed `HH:mm` format |

Furthermore, the following preset formatters are available:

- `FMT_yyyyMMdd` - `"2020-09-13"`
- `FMT_MMddyyyy` - `"09/13/2020"`
- `FMT_MMMddyyyy` - `"Sep 13 2020"`
- `FMT_ddMMyyyy` - `"13/09/2020"`
- `FMT_ddMMMyyyy` - `"13 Sep 2020"`
- `FMT_HHmm` - `"21:42"`
- `FMT_hm` - `"9:42 PM"`
- `FMT_HHmmss` - `"21:42:07"`
- `FMT_hms` - `"9:42:07 PM"`

## Authors

Karsten Schmidt

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
