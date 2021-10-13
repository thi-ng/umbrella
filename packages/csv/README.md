<!-- This file is generated - DO NOT EDIT! -->

# ![csv](https://media.thi.ng/umbrella/banners/thing-csv.svg?0abaf908)

[![npm version](https://img.shields.io/npm/v/@thi.ng/csv.svg)](https://www.npmjs.com/package/@thi.ng/csv)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/csv.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Features](#features)
  - [Status](#status)
  - [Planned features](#planned-features)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Customizable, transducer-based CSV parser/object mapper and transformer.

Partially ported and extended from the Clojure versions of the
[ws-ldn-1](https://github.com/thi-ng/ws-ldn-1/blob/master/src/ws_ldn_1/day1/csv.clj)
and
[resonate-2014](https://github.com/learn-postspectacular/resonate-workshop-2014)
workshop repos.

### Features

The parser supports customizable delimiters, quoted and unquoted cells, line
breaks within quoted cells. Being transducer based, memory usage is kept at a
minimum by only processing single lines of (pre-split) text. For CSV records
spanning multiple lines (due to line breaks), new results are only
emitted/processed downstream once a _logical_ CSV row is complete.

Also, being transducer based means the parser can be easily integrated into more
complex data preparation, cleaning or conversion workflows. See
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
for more details/ideas.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcsv%5D+in%3Atitle)

### Planned features

- [x] Simple CSV row parsing w/o object mapping (`parseCSVSimple()`)
- [ ] CSV output from structured data
- [ ] CSVW support (#257)
- [ ] Integration with thi.ng/egf

## Installation

```bash
yarn add @thi.ng/csv
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/csv"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const csv = await import("@thi.ng/csv");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.44 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/csv/)

Also see extensive doc strings for `parseCSV()` and `CSVOpts`. See
`parseCSVSimple()` and `parseCSVFromString()` for alternatives and syntax sugar
forms.

```ts
import { parseCSV, upper, float } from "@thi.ng/csv";

[...parseCSV(
  {
    all: false,
    cols: {
      "country": { tx: upper },
      "latitude": { alias: "lat", tx: float(0) },
      "longitude": { alias: "lon", tx: float(0) },
    }
  },
  [
     `"country","country group","name (en)","latitude","longitude"`,
     `"at","eu","Austria","47.6965545","13.34598005"`,
     `"be","eu","Belgium","50.501045","4.47667405"`,
     `"bg","eu","Bulgaria","42.72567375","25.4823218"`,
  ]
)]

// [
//   { country: 'AT', lat: 47.6965545, lon: 13.34598005 },
//   { country: 'BE', lat: 50.501045, lon: 4.47667405 },
//   { country: 'BG', lat: 42.72567375, lon: 25.4823218 }
// ]
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-csv,
  title = "@thi.ng/csv",
  author = "Karsten Schmidt",
  note = "https://thi.ng/csv",
  year = 2014
}
```

## License

&copy; 2014 - 2021 Karsten Schmidt // Apache Software License 2.0
