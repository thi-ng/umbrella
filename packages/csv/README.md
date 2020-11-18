<!-- This file is generated - DO NOT EDIT! -->

# ![csv](https://media.thi.ng/umbrella/banners/thing-csv.svg?0abaf908)

[![npm version](https://img.shields.io/npm/v/@thi.ng/csv.svg)](https://www.npmjs.com/package/@thi.ng/csv)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/csv.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Planned features](#planned-features)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Customizable, transducer-based CSV parser/object mapper.

Partially ported and extended from the Clojure versions of the
[ws-ldn-1](https://github.com/thi-ng/ws-ldn-1/blob/master/src/ws_ldn_1/day1/csv.clj)
and
[resonate-2014](https://github.com/learn-postspectacular/resonate-workshop-2014)
workshop repos.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=is%3Aissue+is%3Aopen+%5Bcsv%5D)

### Planned features

- [ ] CSV output from structured data
- [ ] CSVW support (#257)
- [ ] integration with thi.ng/egf

## Installation

```bash
yarn add @thi.ng/csv
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/csv?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/csv/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 919 bytes / CJS: 990 bytes / UMD: 1.02 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/csv/)

Also see extensive doc strings for `parseCSV()` and `CSVOpts`. See `parseCSVString()` for alternative/syntax sugar.

```ts
import { parseCSV, upper, float } from "@thi.ng/csv";

[...parseCSV(
  {
    all: false,
    cols: {
      "country": { tx: upper },
      "latitude": { alias: "lat", tx: float() },
      "longitude": { alias: "lon", tx: float() },
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

## License

&copy; 2014 - 2020 Karsten Schmidt // Apache Software License 2.0
