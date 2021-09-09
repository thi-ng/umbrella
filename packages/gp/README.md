<!-- This file is generated - DO NOT EDIT! -->

# ![gp](https://media.thi.ng/umbrella/banners/thing-gp.svg?4de0cbbf)

[![npm version](https://img.shields.io/npm/v/@thi.ng/gp.svg)](https://www.npmjs.com/package/@thi.ng/gp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/gp.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
  - [Blog posts](#blog-posts)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Genetic programming helpers & strategies (tree based & multi-expression programming).

This package does not (yet) provide a complete GP framework and is
largely focused on the following operations:

- General GP setup configuration
- Genotype / chromosome / AST generation
- Phenotype / chromosome translation
- Offspring generation
    - Crossover (single-point, uniform)
    - Mutation

Does *not* specifically deal with:

- Population management
- AST evaluation
- Fitness computation

References:

- [Evolutionary failures (blog post)](https://medium.com/@thi.ng/evolutionary-failures-part-1-54522c69be37)
- [Multi Expression Programming (Oltean, Dumitrescu)](https://www.mepx.org/oltean_mep.pdf)

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgp%5D+in%3Atitle)

### Related packages

- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti) - Dynamic, extensible multiple dispatch via user supplied dispatch function.
- [@thi.ng/pointfree](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree) - Pointfree functional composition / Forth style stack execution engine
- [@thi.ng/sexpr](https://github.com/thi-ng/umbrella/tree/develop/packages/sexpr) - Extensible S-Expression parser & runtime infrastructure
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast) - DSL to define shader code in TypeScript and cross-compile to GLSL, JS and other targets
- [@thi.ng/zipper](https://github.com/thi-ng/umbrella/tree/develop/packages/zipper) - Functional tree editing, manipulation & navigation

### Blog posts

- [Evolutionary failures (Part 1)](https://medium.com/@thi.ng/evolutionary-failures-part-1-54522c69be37)

## Installation

```bash
yarn add @thi.ng/gp
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/gp"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const gp = await import("@thi.ng/gp");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.20 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/zipper](https://github.com/thi-ng/umbrella/tree/develop/packages/zipper)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                            | Description                                              | Live demo                                            | Source                                                                            |
|:----------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------|:-----------------------------------------------------|:----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-evo.jpg" width="240"/> | Evolutionary shader generation using genetic programming | [Demo](https://demo.thi.ng/umbrella/shader-ast-evo/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-evo) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/gp/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-gp,
  title = "@thi.ng/gp",
  author = "Karsten Schmidt",
  note = "https://thi.ng/gp",
  year = 2019
}
```

## License

&copy; 2019 - 2021 Karsten Schmidt // Apache Software License 2.0
