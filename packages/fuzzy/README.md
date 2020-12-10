<!-- This file is generated - DO NOT EDIT! -->

# ![fuzzy](https://media.thi.ng/umbrella/banners/thing-fuzzy.svg?74e82ef9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/fuzzy.svg)](https://www.npmjs.com/package/@thi.ng/fuzzy)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/fuzzy.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Features](#features)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Fuzzy logic operators & configurable rule inferencing engine.

### Features

- Entirely declarative & functional approach
- Fuzzy set domain shaping functions (incl. negated/inverse)
- Rules with multiple inputs/outputs and arbitrary term combinators (e.g.
  [T-norms](https://en.wikipedia.org/wiki/T-norm) from the
  [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
  package). Syntax sugar for common `and`/`or` rules.
- Defuzzing via customizable strategies (so far Center-of-Gravity (COG) only)
  and options to balance precision vs. performance.
- Linguistic variable creation and term/set classification for given domain
  values

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bfuzzy%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/fuzzy
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/fuzzy?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/fuzzy/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 773 bytes / CJS: 850 bytes / UMD: 901 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)

## API

[Generated API docs](https://docs.thi.ng/umbrella/fuzzy/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-fuzzy,
  title = "@thi.ng/fuzzy",
  author = "Karsten Schmidt",
  note = "https://thi.ng/fuzzy",
  year = 2020
}
```

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
