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

![screenshot](https://github.com/thi-ng/umbrella/tree/feature/webgl/assets/screenshots/shader-ast-00.jpg)

**WIP only** - Embedded DSL to define partially (as much as possible /
feasible) type checked shader code directly in TypeScript and
cross-compile to different languages. Currently only GLSL & JS are
supported as target, but custom code generators can be easily added (see
[glsl.ts](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast/src/codegen/glsl.ts)
&
[js.ts](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast/src/codegen/js.ts)
for reference). Once more details have been ironed out, we aim to
support [WHLSL for WebGPU](https://github.com/gpuweb/WHLSL) in the near
future as well.

In addition to the code generation aspects, this package also provides a number of commonly used pure functions which can be used as syntax sugar and / or higher level building blocks for your own shaders. See [/std](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast/src/std/).

Benefits of this approach:

- even if incomplete, type checking (at authoring time & compile time)
  and type annotations of all AST nodes catches many issues early on
- shader functions can be called like standard TS/JS functions (incl.
  automatically type checked args via TS mapped types)
- higher-order function composition & customization (e.g. see [raymarch.ts](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast/src/std/raymarch.ts))
- use standard TS tooling & IDE integration (e.g. docs strings,
  packaging, dependencies etc.)
- improve general re-use, especially once more target codegens are
  available (see [future goals](#future-goals))
- cross compilation to different graphics environments
- avoids complex GLSL parsing as done by other transpilers
- shader code will be fully minimized along with main app code in
  production builds as part of standard bundling processes/toolchains,
  no extra plugins needed
- very small run time & file size overhead (WIP / TBC)

### Prior art / influences

- https://github.com/cscheid/lux/tree/master/src/shade
- https://github.com/kovasb/gamma/

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
- [ ] more builtin type ctors / casts (ivec, bvec, mat ✅, samplers)
- [x] more builtin function defs
- [x] support for builtin `gl_XXX` variables (target specific)
- [x] more function arities (max 8 args)
- [x] function call dependency analysis and ordered output
- [ ] GLSL version support (100/300)

### Future goals

- [ ] struct support
- [ ] opt. mem barrier ops (where supported)
- [ ] more code gens (JS ✅, WHLSL, OpenCL, Houdini VEX)

## Installation

```bash
yarn add @thi.ng/shader-ast
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/master/packages/defmulti)

## Usage examples

- [raymarch shader demo](https://twitter.com/thing_umbrella/status/1140765043614801920), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/raymarch-ast)
- [canvas2d shader](https://twitter.com/thing_umbrella/status/1140310781994647552), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/canvas2d-shader)

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
