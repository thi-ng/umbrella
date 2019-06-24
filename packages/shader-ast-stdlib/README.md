# @thi.ng/shader-ast-stdlib

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/shader-ast-stdlib.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-stdlib)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-stdlib.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

**WIP only** - Collection of useful functions & higher order constructs
for GPU / shader programming, acting as optional standard library for
[@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast).

Signed Distance Field primitives and operations are based on work by
Inigo Quilezles (iq).

Reference:

- http://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
- http://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm

## Installation

```bash
yarn add @thi.ng/shader-ast-stdlib
```

## Dependencies

- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast)

## Usage examples

```ts
import * as sas from "@thi.ng/shader-ast-stdlib";
```

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
