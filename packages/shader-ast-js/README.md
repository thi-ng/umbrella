<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/shader-ast-js

[![npm version](https://img.shields.io/npm/v/@thi.ng/shader-ast-js.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast-js)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast-js.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Unsupported features](#unsupported-features)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Customizable JS code generator, compiler & runtime for [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast).

Due to the lack of native vector operations in JS, this compile target
is much more involved than the
[@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast-glsl)
code gen and uses a pluggable backend to perform all math ops. The
default backend delegates all ops to
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)
and
[@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices),
which altogether provide ~750 optimized vector/matrix functions.

### Unsupported features

- texture lookups (see [texture tunnel
  demo](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-tunnel)
  for a monkey-patched solution)
- derivatives (`dFdx`, `dFdy`, `fwidth`) - probably never supported in
  this env
- `out` / `inout` function args (see
  [#96](https://github.com/thi-ng/umbrella/issues/96) for discussion)

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/shader-ast-js
```

Package sizes (gzipped): ESM: 4.9KB / CJS: 4.4KB / UMD: 4.4KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/master/packages/pixel)
- [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### shader-ast-canvas2d <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/shader-ast/shader-ast-01.jpg)

[Live demo](https://demo.thi.ng/umbrella/shader-ast-canvas2d/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-canvas2d)

### shader-ast-noise <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/shader-ast-noise/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-noise)

### shader-ast-raymarch <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/shader-ast/shader-ast-raymarch.jpg)

[Live demo](https://demo.thi.ng/umbrella/shader-ast-raymarch/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-raymarch)

### shader-ast-sdf2 <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/shader-ast-sdf2/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-sdf2)

### shader-ast-tunnel <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/shader-ast-tunnel/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-tunnel)

### shader-ast-workers <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/shader-ast-workers.jpg)

[Live demo](https://demo.thi.ng/umbrella/shader-ast-workers/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/shader-ast-workers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/shader-ast-js/)

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

const hello = defn("vec4", "hello", ["float"], (n) => [
    ret(vec4(mul(vec3(1, 2, 3), n), -1))
]);

js(hello)

const Module = js.compile(hello);
Module.hello(10);
// [10, 20, 30, -1]
```

## Authors

Karsten Schmidt

## License

&copy; 2019 - 2020 Karsten Schmidt // Apache Software License 2.0
