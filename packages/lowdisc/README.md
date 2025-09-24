<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/lowdisc](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-lowdisc.svg?54818180)

[![npm version](https://img.shields.io/npm/v/@thi.ng/lowdisc.svg)](https://www.npmjs.com/package/@thi.ng/lowdisc)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/lowdisc.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Halton](#halton)
  - [Kronecker](#kronecker)
  - [R<sub>2</sub> recurrence](#rsub2sub-recurrence)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
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

## Status

**BETA** - possibly breaking changes forthcoming

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Blowdisc%5D+in%3Atitle)

## Related packages

- [@thi.ng/poisson](https://github.com/thi-ng/umbrella/tree/develop/packages/poisson) - nD Stratified grid and Poisson-disc sampling w/ support for spatial density functions and custom PRNGs
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random) - Pseudo-random number generators w/ unified API, distributions, weighted choices, ID generation

## Installation

```bash
yarn add @thi.ng/lowdisc
```

ESM import:

```ts
import * as ld from "@thi.ng/lowdisc";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/lowdisc"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const ld = await import("@thi.ng/lowdisc");
```

Package sizes (brotli'd, pre-treeshake): ESM: 458 bytes

## Dependencies

- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## Usage examples

Two projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                               | Description                                                | Live demo                                              | Source                                                                              |
|:-------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/quasi-lattice.png" width="240"/>     | Quasi-random lattice generator                             | [Demo](https://demo.thi.ng/umbrella/quasi-lattice/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/quasi-lattice)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/viz-scatter-plot.avif" width="240"/> | Interactive scatter & line plot of low-discrepancy samples | [Demo](https://demo.thi.ng/umbrella/viz-scatter-plot/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/viz-scatter-plot) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/lowdisc/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2020 - 2025 Karsten Schmidt // Apache License 2.0
