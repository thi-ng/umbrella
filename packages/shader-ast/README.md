# @thi.ng/shader-ast

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/shader-ast.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Prior art / influences](#prior-art--influences)
    - [Tasks prior to initial release](#tasks-prior-to-initial-release)
    - [Future goals](#future-goals)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/feature/webgl/assets/screenshots/shader-ast-01.jpg)
<small>Example shader running in JS & Canvas 2D context, cross-compiled JS/GLSL outputs on the right</small>

**WIP only** - An embedded DSL to encourage and define *modular* shader
code directly in TypeScript and then cross-compile to different
languages. Using GLSL semantics as starting point, the DSL is used as an
assembly language to define a partially (as much as possible / feasible)
type checked AST, incl. custom, user defined functions, higher-order
functions, automatic vector-scalar overrides, most of GLSL ES 3.0
built-ins, arg checking, and function return type inference.

Code generation can be done for individual nodes or entire shader
programs, incl. call graph analysis and toplogical re-ordering of all
transitively called functions (other than built-ins). Currently only
GLSL & JS are supported as target, but custom code generators can be
easily added (see
[glsl.ts](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast/src/codegen/glsl.ts)
&
[js.ts](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast/src/codegen/js.ts)
for reference). Due to lack of native vector operations in JS, that
target is much more involved than GLSL and uses a pluggable backend to
perform all math ops
([@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)
by default). Once more details have been ironed out, we aim to
support [WHLSL for WebGPU](https://github.com/gpuweb/WHLSL) in the near
future as well.

In addition to the code generation aspects, this package also provides a
number of commonly used pure functions which can be used as syntax sugar
and / or higher level building blocks for your own shaders. See
[/std](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast/src/std/).

Benefits of this approach:

- no more copy pasting, use standard TS/JS tooling & IDE integration
  (e.g. docs strings, packaging, 3rd party dependencies etc.)
- shader functions can be called like standard TS/JS functions (incl.
  automatically type checked args via TS mapped types)
- even if incomplete, type checking (at authoring time & compile time)
  and type annotations of all AST nodes catches many issues early on
- higher-order function composition & customization (e.g. see
  [raymarch.ts](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast/src/std/raymarch.ts))
- improve general re-use, especially once more target codegens are
  available (see [future goals](#future-goals))
- cross compilation to different graphics environments
- avoids complex GLSL parsing as done by other transpilers
- shader code will be fully minimized along with main app code in
  production builds as part of standard bundling processes/toolchains,
  no extra plugins needed
- small run time & file size overhead (WIP / TBC)

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
- [ ] more code gens (JS ✅, WHLSL, OpenCL, Houdini VEX)
- [ ] integration w/
  [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/master/packages/webgl)
- [ ] boilerplate for JS runtime (non-GPU shader execution)

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

- [canvas2d shader](https://demo.thi.ng/umbrella/shader-ast-canvas2d/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-canvas2d)
- [raymarch shader](https://demo.thi.ng/umbrella/shader-ast-raymarch/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-raymarch)
- [tunnel shader](https://demo.thi.ng/umbrella/shader-ast-tunnel/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-tunnel)

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
