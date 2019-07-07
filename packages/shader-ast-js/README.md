# @thi.ng/shader-ast-js

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/shader-ast-js.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-js)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-js.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Unsupported features](#unsupported-features)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

JavaScript code generator, compiler & runtime for
[@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast).

Due to lack of native vector operations in JS, this compile target is
much more involved than GLSL and uses a pluggable backend to perform all
math ops. The default backend delegates all ops to
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)
and
[@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices),
which altogether provide ~750 optimized vector/matrix functions.

### Unsupported features

- texture lookups (see [texture tunnel
  demo](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-tunnel)
  for a monkey-patched solution)
- derivatives (`dFdx`, `dFdy`, `fwidth`) - probably never supported in
  this env
- `out` / `inout` function args (see [#96](https://github.com/thi-ng/umbrella/issues/96) for discussion)

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
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Commented examples:

(Possibly non-exhaustive list, live demo links in readme's)

- [Canvas2D shader](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-canvas2d)
- [2D SDF](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-sdf2d)
- [Simplex noise](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-noise)
- [Raymarching](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-raymarch)
- [Textured tunnel](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-tunnel)

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
