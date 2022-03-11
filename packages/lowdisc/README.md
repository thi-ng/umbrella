<!-- This file is generated - DO NOT EDIT! -->

# ![lowdisc](https://media.thi.ng/umbrella/banners/thing-lowdisc.svg?637bcba0)

[![npm version](https://img.shields.io/npm/v/@thi.ng/lowdisc.svg)](https://www.npmjs.com/package/@thi.ng/lowdisc)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/lowdisc.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Halton](#halton)
  - [Kronecker](#kronecker)
  - [R<sub>2</sub> recurrence](#rsub2sub-recurrence)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

n-dimensional low-discrepancy sequence generators/iterators.

This package provides the following n-dimensional [low-discrepancy
sequence](https://en.wikipedia.org/wiki/Low-discrepancy_sequence) generators,
partially based on the article [The Unreasonable Effectiveness of Quasirandom
Sequences](http://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/)
by Martin Roberts.

### Halton

Configurable basis for each dimension:

`haltonND([2,3])`

![2D Halton(2,3) sequence](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/lowdisc/ld-halton-small.gif)

### Kronecker

Configurable basis for each dimension:

`kroneckerND([1 / 2 ** 0.5, 1 / 5 ** 0.5])`

![2D Kronecker sequence (Golden ratio)](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/lowdisc/ld-kronecker-small.gif)

### R<sub>2</sub> recurrence

Based on Kronecker with each dimension's base automatically derived from the
[Plastic number](https://en.wikipedia.org/wiki/Plastic_number):

`plasticND(2)`

![2D R2 recurrence sequence](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/lowdisc/ld-plastic-small.gif)

### Status

**BETA** - possibly breaking changes forthcoming

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Blowdisc%5D+in%3Atitle)

### Related packages

- [@thi.ng/poisson](https://github.com/thi-ng/umbrella/tree/develop/packages/poisson) - nD Stratified grid and Poisson-disc sampling w/ support for spatial density functions and custom PRNGs
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random) - Pseudo-random number generators w/ unified API, distributions, weighted choices, ID generation

## Installation

```bash
yarn add @thi.ng/lowdisc
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/lowdisc"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const lowdisc = await import("@thi.ng/lowdisc");
```

Package sizes (gzipped, pre-treeshake): ESM: 497 bytes

## Dependencies

- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/lowdisc/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-lowdisc,
  title = "@thi.ng/lowdisc",
  author = "Karsten Schmidt",
  note = "https://thi.ng/lowdisc",
  year = 2020
}
```

## License

&copy; 2020 - 2022 Karsten Schmidt // Apache Software License 2.0
