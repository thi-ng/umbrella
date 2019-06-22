# @thi.ng/shader-ast

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/shader-ast.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Language specific code generators](#language-specific-code-generators)
    - [Prior art / influences](#prior-art--influences)
    - [Tasks prior to initial release](#tasks-prior-to-initial-release)
    - [Future goals](#future-goals)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
    - [Supported types](#supported-types)
    - [Operators](#operators)
    - [Symbol definitions / assignments](#symbol-definitions--assignments)
    - [Control flow](#control-flow)
    - [Built-in functions](#built-in-functions)
    - [User defined functions](#user-defined-functions)
    - [Code generation](#code-generation)
    - [Compilation & execution](#compilation--execution)
    - [AST tooling & traversal](#ast-tooling--traversal)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/feature/webgl/assets/screenshots/shader-ast-01.jpg)
<small>Example shader running in plain JS & Canvas 2D context, cross-compiled JS/GLSL outputs on the right</small>

An embedded DSL to encourage and define *modular* shader code directly
in TypeScript and then cross-compile to different languages. Using GLSL
types and semantics as starting point, the DSL is used as an assembly
language to define a partially (as much as possible / feasible) type
checked AST, incl. custom, user defined functions, higher-order
functions, inline functions, automatic vector-scalar overrides, most of
GLSL ES 3.0 built-ins, arg checking, and function return type inference.

Code generation can be done for individual expressions or entire shader
programs, incl. call graph analysis and toplogical re-ordering of all
transitively called functions (other than built-ins). Currently only
GLSL & JS are supported as target (see code gen packages below), but
custom code generators can be easily added. Once more details have been
ironed out, we aim to support [WASM](https://webassembly.org), [WHLSL for
WebGPU](https://github.com/gpuweb/WHLSL) in the near future as well.

| WebGL version                                                                                                        | Canvas 2D version                                                                                                 |
|----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| ![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/feature/webgl/assets/screenshots/raymarch-webgl.jpg) | ![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/feature/webgl/assets/screenshots/raymarch-2d.jpg) |
| Delta image                                                                                                          |                                                                                                                   |
| ![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/feature/webgl/assets/screenshots/raymarch-delta.jpg) |                                                                                                                   |

In addition to the code generation aspects, this package also provides a
form of "standard library", pure functions for common use cases and
which can be used as syntax sugar and / or higher level building blocks
for your own shaders. See
[/std](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast/src/std/).

Benefits of this approach:

- **no more copy pasting, string interpolation / templating**: use
  standard TS/JS tooling & full IDE integration (e.g. docs strings,
  packaging, 3rd party dependencies etc.)
- **all non-builtin functions keep track of their transitive dependencies**,
  enabling call graph analysis, dead code elimination, topologically
  correct code output ordering etc. - all without manual user intervention
- **improve general re-use**, especially once more target codegens are
  available (see [future goals](#future-goals))
- **cross compilation** to different graphics environments
- shader functions can be called like standard TS/JS functions (incl.
  automatically type checked args via TS mapped types)
- type checking (at authoring time & compile time)
  and type annotations of all AST nodes catches many issues early on
- higher-order function composition & customization (e.g. see
  [raymarch.ts](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast/src/std/raymarch.ts))
- avoids complex GLSL parsing as done by other transpilers
- shader code will be fully minimized along with main app code in
  production builds as part of standard bundling processes/toolchains,
  no extra plugins needed
- small run time & file size overhead (depending on output target impl)

### Language specific code generators

- [@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast-glsl) - GLSL 100 / 300 (WebGL1 / 2)
- [@thi.ng/shader-ast-js](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast-js) - plain JavaScript (incl. runtime)

### Prior art / influences

- https://github.com/cscheid/lux/tree/master/src/shade
- https://github.com/kovasb/gamma/
- http://thi.ng/shader-graph

### Tasks prior to initial release

- [x] type checked swizzling
- [x] var declarations and assignments
- [x] function definitions and return type checking
- [x] branching
- [x] ternary operator
- [x] math operators
- [x] comparisons
- [ ] bitwise operators
- [ ] loops (for ✅, while, break ✅, continue ✅)
- [x] const var modifier
- [ ] more builtin type ctors / casts (ivec, bvec, mat ✅, samplers ✅)
- [x] more builtin function defs
- [x] support for builtin `gl_XXX` variables (target specific)
- [x] more function arities (max 8 args)
- [x] function call dependency analysis and ordered output
- [x] GLSL version support (100/300)

### Future goals

- [ ] struct support
- [ ] more code gens (JS ✅, WASM, WHLSL, OpenCL, Houdini VEX)
- [ ] integration w/
  [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/master/packages/webgl)
- [x] boilerplate for JS runtime (non-GPU shader execution)
- [ ] AST transformations (optimizers, e.g. [constant
  folding ✅](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast/src/optimize.ts))

## Installation

```bash
yarn add @thi.ng/shader-ast
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/master/packages/defmulti)
- [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/master/packages/dgraph)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)

## Usage examples

Partially commented examples:

- [Canvas2D shader](https://demo.thi.ng/umbrella/shader-ast-canvas2d/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-canvas2d)
- [2D SDF](https://demo.thi.ng/umbrella/shader-ast-sdf2d/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-sdf2d)
- [Raymarching](https://demo.thi.ng/umbrella/shader-ast-raymarch/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-raymarch)
- [Textured tunnel](https://demo.thi.ng/umbrella/shader-ast-tunnel/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-tunnel)

## API

TODO

### Supported types

### Operators

#### Swizzling

#### Index lookups

### Symbol definitions / assignments

### Control flow

### Built-in functions

### User defined functions

#### Inline functions

### Code generation

### Compilation & execution

### AST tooling & traversal

#### Tree optimizations

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
