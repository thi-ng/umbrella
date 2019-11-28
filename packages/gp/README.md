<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/gp

[![npm version](https://img.shields.io/npm/v/@thi.ng/gp.svg)](https://www.npmjs.com/package/@thi.ng/gp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/gp.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
  - [shader-ast-evo](#shader-ast-evo)
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

## Installation

```bash
yarn add @thi.ng/gp
```

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

### shader-ast-evo

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-ast-evo.jpg)

[Live demo](https://demo.thi.ng/umbrella/shader-ast-evo/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-ast-evo)

## API

[Generated API docs](https://docs.thi.ng/umbrella/gp/)

TODO

## Authors

Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
