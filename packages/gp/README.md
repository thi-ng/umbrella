<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/gp

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

### Related packages

- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/master/packages/defmulti) - Dynamic, extensible multiple dispatch via user supplied dispatch function.
- [@thi.ng/pointfree](https://github.com/thi-ng/umbrella/tree/master/packages/pointfree) - Pointfree functional composition / Forth style stack execution engine
- [@thi.ng/sexpr](https://github.com/thi-ng/umbrella/tree/master/packages/sexpr) - Extensible S-Expression parser & runtime infrastructure
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast) - DSL to define shader code in TypeScript and cross-compile to GLSL, JS and other targets
- [@thi.ng/zipper](https://github.com/thi-ng/umbrella/tree/master/packages/zipper) - Functional tree editing, manipulation & navigation

### Blog posts

- [Evolutionary failures (Part 1)](https://medium.com/@thi.ng/evolutionary-failures-part-1-54522c69be37)

## Installation

```bash
yarn add @thi.ng/gp
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/master/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/zipper](https://github.com/thi-ng/umbrella/tree/master/packages/zipper)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### shader-ast-evo <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/shader-ast-evo.jpg)

[Live demo](https://demo.thi.ng/umbrella/shader-ast-evo/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-evo)

## API

[Generated API docs](https://docs.thi.ng/umbrella/gp/)

TODO

## Authors

Karsten Schmidt

## License

&copy; 2019 - 2020 Karsten Schmidt // Apache Software License 2.0
