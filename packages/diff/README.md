<!-- This file is generated - DO NOT EDIT! -->

# ![diff](https://media.thi.ng/umbrella/banners/thing-diff.svg?7be4837a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/diff.svg)](https://www.npmjs.com/package/@thi.ng/diff)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/diff.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Breaking changes](#breaking-changes)
  - [2.0.0](#200)
- [Authors](#authors)
- [License](#license)

## About

Customizable diff implementations for arrays (sequential) & objects (associative), with or without linear edit logs.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdiff%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/diff
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/diff?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/diff/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 1.25 KB / CJS: 1.30 KB / UMD: 1.33 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)

## API

[Generated API docs](https://docs.thi.ng/umbrella/diff/)

```ts
import { diffArray, DiffMode } from "@thi.ng/diff";

diffArray([1, 2, 3], [1, 2, 4], DiffMode.FULL);
// {
//     distance: 2,
//     adds: { 2: 4 },
//     dels: { 2: 3 },
//     const: { 0: 1, 1: 2 },
//     linear: [0, 0, 1,  0, 1, 2,  -1, 2, 3,  1, 2, 4]
// }
```

## Breaking changes

### 2.0.0

The linear edit logs of both `diffArray` and `diffObject` are now
returned as flat arrays, with each log entry consisting of 3 or 2
successive array items. This is to avoid allocation of various small
arrays.

The order of optional args to both functions has been swapped to:

- `diffArray(old, new, mode?, equiv?)`
- `diffObject(old, new, mode?, equiv?)`

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-diff,
  title = "@thi.ng/diff",
  author = "Karsten Schmidt",
  note = "https://thi.ng/diff",
  year = 2016
}
```

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
