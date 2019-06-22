# @thi.ng/shader-ast-js

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/shader-ast-js.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-js)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-js.svg)
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

JavaScript code generator, compiler & runtime for
[@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast).

Due to lack of native vector operations in JS, this compile target is
much more involved than GLSL and uses a pluggable backend to perform all
math ops. The default backend delegates all ops to
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)
and
[@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices),
which altogether provided 500+ optimized vector/matrix functions.

## Installation

```bash
yarn add @thi.ng/shader-ast-js
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/features/webgl/packages/shader-ast)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Partially commented examples:

- [Canvas2D shader](https://demo.thi.ng/umbrella/shader-ast-canvas2d/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-canvas2d)
- [2D SDF](https://demo.thi.ng/umbrella/shader-ast-sdf2d/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-sdf2d)
- [Raymarching](https://demo.thi.ng/umbrella/shader-ast-raymarch/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-raymarch)
- [Textured tunnel](https://demo.thi.ng/umbrella/shader-ast-tunnel/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-tunnel)

```ts
// AST node functions from main shader-ast pkg
import {
    mul,
    defn,
    float,
    ret,
    vec3
} from "@thi.ng/shader-ast";

// codegen / compiler
import { targetJS } from "@thi.ng/shader-ast-js";

const js = targetJS();

const hello = defn("vec4", "hello", [["float"]], (n) => [
    ret(vec4(mul(vec3(1, 2, 3), n), -1))
]);

js(hello)

const Module = js.compile(hello);
Module.hello(10);
// [10, 20, 30, -1]
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
