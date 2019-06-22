# @thi.ng/shader-ast-glsl

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/shader-ast-glsl.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-glsl)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-glsl.svg)
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

GLSL code generator for
[@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast).
Supports GLSL ES 1.00 (WebGL) & GLSL ES 3.00 (WebGL 2).

This package is also used for shader assembly by
[@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/features/webgl/packages/webgl).

## Installation

```bash
yarn add @thi.ng/shader-ast-glsl
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/features/webgl/packages/shader-ast)

## Usage examples

Partially commented examples:

- [2D SDF](https://demo.thi.ng/umbrella/shader-ast-sdf2d/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-sdf2d)
- [Raymarching](https://demo.thi.ng/umbrella/shader-ast-raymarch/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-raymarch)
- [Textured tunnel](https://demo.thi.ng/umbrella/shader-ast-tunnel/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-tunnel)

```ts
import * as sag from "@thi.ng/shader-ast-glsl";
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
