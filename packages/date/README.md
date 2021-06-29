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
  - [DateTime & iterators](#datetime--iterators)
  - [Relative dates](#relative-dates)
  - [Formatters](#formatters)
  - [Timecodes](#timecodes)
  - [Locales](#locales)
- [Authors](#authors)
- [License](#license)

## About

Date/timestamp iterators, composable formatters, relative date parsing, rounding.

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdate%5D+in%3Atitle)

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

Package sizes (gzipped, pre-treeshake): ESM: 3.16 KB / CJS: 3.35 KB / UMD: 3.27 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## API

[Generated API docs](https://docs.thi.ng/umbrella/date/)

TODO - Please see tests and doc strings in source for now...

### DateTime & iterators

The `DateTime` class acts as a thin wrapper around **UTC** epochs/timestamps,
with the constructor supporting coercions and varying granularity/precision
(from years to milliseconds). The main use case of this class is as backend for
the various epoch iterators provided by this package, which in turn are largely
intended for visualization purposes (axis tick label generators in
[@thi.ng/viz](https://github.com/thi-ng/umbrella/tree/develop/packages/viz)).

```ts
// create w/ current date (or pass epoch, Date or DateTime instances)
const a = dateTime();
// DateTime { y: 2020, M: 8, d: 19, h: 12, m: 17, s: 16, t: 884 }

// provide additional precision (here year only)
const b = dateTime(a, "y");
// DateTime { y: 2020, M: 0, d: 1, h: 0, m: 0, s: 0, t: 0 }

a.toString();
// Sat Sep 19 2020 12:17:16 GMT'
a.toISOString()
// '2020-09-19T12:17:16.884Z'

b.toISOString();
// 2020-01-01T00:00:00.000Z

a.isLeapYear()
// true

a.daysInMonth()
// 30

[...months(b, a)]
// [
//   1577836800000,
//   1580515200000,
//   1583020800000,
//   1585699200000,
//   1588291200000,
//   1590969600000,
//   1593561600000,
//   1596240000000,
//   1598918400000
// ]

[...months(b, a)].map((x) => FMT_yyyyMMdd(x))
// [
//   '2020-01-01',
//   '2020-02-01',
//   '2020-03-01',
//   '2020-04-01',
//   '2020-05-01',
//   '2020-06-01',
//   '2020-07-01',
//   '2020-08-01',
//   '2020-09-01'
// ]
```

### Relative dates

Relative dates can be obtained via
[`parseRelatie()`](https://docs.thi.ng/umbrella/date/modules.html#parserelative)
or [`relative()`](https://docs.thi.ng/umbrella/date/modules.html#relative).

```ts
const now = dateTime();
// DateTime { y: 2021, M: 2, d: 21, h: 14, m: 26, s: 0, t: 661 }

// see the linked documentation for all supported formats
parseRelative("2 weeks ago", now);
// DateTime { y: 2021, M: 2, d: 7, h: 14, m: 26, s: 0, t: 661 }

parseRelative("an hour", now);
// DateTime { y: 2021, M: 2, d: 21, h: 15, m: 26, s: 0, t: 661 }

parseRelative("tomorrow", now);
// DateTime { y: 2021, M: 2, d: 22, h: 14, m: 26, s: 0, t: 661 }

parseRelative("-1 month", now)
// DateTime { y: 2021, M: 1, d: 21, h: 14, m: 26, s: 0, t: 661 }
```

### Formatters

Custom date/time formatters can be assembled via
[`defFormat()`](https://github.com/thi-ng/umbrella/blob/develop/packages/date/src/format.ts#L93),
using the following partial format identifiers. The `MMM` and `E` formatters use
the currently active [locale](#locale). To escape a formatter and use as a
string literal, prefix the term with `\\`.

| ID     | Description                                 |
|--------|---------------------------------------------|
| `yyyy` | Full year (4 digits)                        |
| `yy`   | Short year (2 digits)                       |
| `MMM`  | Month name in current locale (e.g. `Feb`)   |
| `MM`   | Zero-padded 2-digit month                   |
| `M`    | Unpadded month                              |
| `dd`   | Zero-padded 2-digit day of month            |
| `d`    | Unpadded day of month                       |
| `E`    | Weekday name in current locale (e.g. `Mon`) |
| `HH`   | Zero-padded 2-digit hour of day (0-23)      |
| `H`    | Unpadded hour of day (0-23)                 |
| `h`    | Unpadded hour of day (1-12)                 |
| `mm`   | Zero-padded 2-digit minute of hour          |
| `m`    | Unpadded minute of hour                     |
| `ss`   | Zero-padded 2-digit second of minute        |
| `s`    | Unpadded second of minute                   |
| `S`    | Unpadded millisecond of second              |
| `A`    | 12-hour AM/PM marker (uppercase)            |
| `a`    | 12-hour am/pm marker (lowercase)            |
| `Z`    | Timezone offset in signed `±HH:mm` format   |
| `ZZ`   | Same as `Z`, but special handling for UTC   |
| `/ED`  | Locale-specific weekday-day separator       |
| `/DM`  | Locale-specific day-month separator         |
| `/MY`  | Locale-specific month-year separator        |
| `/HM`  | Locale-specific hour-minute separator       |

<small>(Format IDs somewhat based on Java's
[SimpleDateFormat](https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/text/SimpleDateFormat.html))</small>

The following preset formatters are available:

- `FMT_ISO_SHORT` - `"2020-09-13T21:42:07Z"`
- `FMT_yyyyMMdd` - `"2020-09-13"`
- `FMT_Mdyyyy` - `"9/13/2020"`
- `FMT_MMMdyyyy` - `"Sep 13 2020"`
- `FMT_dMyyyy` - `"13/9/2020"`
- `FMT_dMMMyyyy` - `"13 Sep 2020"`
- `FMT_yyyyMMdd_HHmmss` - `20200913-214207`
- `FMT_HHmm` - `"21:42"`
- `FMT_hm` - `"9:42 PM"`
- `FMT_HHmmss` - `"21:42:07"`
- `FMT_hms` - `"9:42:07 PM"`

### Timecodes

For timebased media applications, the higher-order `defTimecode()` can be used
to create a formatter for a given FPS (frames / second, in [1..1000] range),
e.g. `HH:mm:ss:ff`. The returned function takes a single arg (time in
milliseconds) and returns formatted string.

The timecode considers days too, but only includes them in the result if the day
part is non-zero. The 4 separators between each field can be customized via 2nd
arg (default: all `:`).

```ts
a = defTimecode(30);
a(1*HOUR + 2*MINUTE + 3*SECOND + 4*1000/30)
// "01:02:03:04"

a(DAY);
// "01:00:00:00:00"

b = defTimecode(30, ["d ", "h ", "' ", '" ']);
b(Day + HOUR + 2*MINUTE + 3*SECOND + 999)
// "01d 01h 02' 03" 29"
```

### Locales

The following locale presets are available by default:

| Preset     | Example                          |
|------------|----------------------------------|
| `DE_SHORT` | `29.6.2021 @ 5:48`               |
| `DE_LONG`  | `Dienstag, 29. Juni 2021 @ 5:48` |
| `EN_SHORT` | `29/06/2021 @ 5.48 am`           |
| `EN_LONG`  | `Tuesday 29 June 2021 @ 5.48 am` |
| `ES_SHORT` | `29/06/2021 @ 5:48`              |
| `ES_LONG`  | `martes 29 junio 2021 @ 5:48`    |
| `FR_LONG`  | `mardi 29 juin 2021 @ 5h 48`     |
| `IT_LONG`  | `martedì 29 giugno 2021 @ 5.48`  |

The `MMM` (month) and `E` (weekday) formatters make use of the strings provided
by the current `LOCALE` (default: `EN_SHORT`) and can be set/changed via the
`setLocale()` function:

```ts
const fmt = defFormat(["E", " ", "d", " ", "MMM", " ", "yyyy"]);

setLocale(EN_SHORT); // default
// {
//   months: [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ],
//   days: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
// }

fmt(dateTime());
// Sat 19 Sep 2020

setLocale(EN_LONG);
// {
//   months: [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ],
//   days: [
//     'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
//   ]
// }

fmt(dateTime());
// Saturday 19 September 2020
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-date,
  title = "@thi.ng/date",
  author = "Karsten Schmidt",
  note = "https://thi.ng/date",
  year = 2020
}
```

## License

&copy; 2020 - 2021 Karsten Schmidt // Apache Software License 2.0
