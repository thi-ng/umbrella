<!-- This file is generated - DO NOT EDIT! -->

# ![csv](https://media.thi.ng/umbrella/banners/thing-csv.svg?0abaf908)

[![npm version](https://img.shields.io/npm/v/@thi.ng/csv.svg)](https://www.npmjs.com/package/@thi.ng/csv)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/csv.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Customizable, transducer-based CSV parser/object mapper.

Partially ported from the Clojure version of the
[thi.ng/ws-ldn-1](https://github.com/thi-ng/ws-ldn-1/blob/master/src/ws_ldn_1/day1/csv.clj)
workshop repo.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=is%3Aissue+is%3Aopen+%5Bcsv%5D)

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

Package sizes (gzipped, pre-treeshake): ESM: 719 bytes / CJS: 777 bytes / UMD: 875 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/csv/)

```ts
import { parseCSV, parseCSVString } from "@thi.ng/csv";
```

## Authors

Karsten Schmidt

## License

&copy; 2014 - 2020 Karsten Schmidt // Apache Software License 2.0
