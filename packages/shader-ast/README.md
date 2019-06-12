# @thi.ng/shader-ast

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/shader-ast.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Tasks prior to initial release](#tasks-prior-to-initial-release)
    - [Future goals](#future-goals)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

**WIP only** - Embedded DSL to define partially type checked shader code
directly in TypeScript and cross-compile to different languages.
Currently only GLSL is supported as target, but custom code generators
can be easily added (see
[src/glsl.ts](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast/src/glsl.ts)
for reference). Once more details have been ironed out, we aim to
support [WHLSL for WebGPU](https://github.com/gpuweb/WHLSL) in the near future as well.

Benefits of this approach:

- type checking (at authoring time & compile time) and type annotations
  of all AST nodes catches many issues early on
- shader functions can be called like standard TS/JS functions (incl.
  automatically type checked args via TS mapped types)
- use standard TS tooling & IDE integration (e.g. docs strings, packaging, dependencies etc.)
- improve general re-use, especially once more target codegens are
  available (see [future goals](#future-goals))
- cross compilation to different graphics environments
- shader code will be fully minimized along with main app code in
  production builds as part of standard bundling processes/toolchains,
  no extra plugins needed
- very small run time & file size overhead (entire pkg ~1.2KB gzipped, but hardly ever fully used)

### Tasks prior to initial release

- [x] type checked swizzling
- [ ] var declarations and assignments
- [ ] more builtin function defs
- [ ] more function arities (currently max 5 args)
- [ ] function call dependency analysis and ordered output
- [ ] GLSL version support (100/300)

### Future goals

- [ ] struct support
- [ ] opt. mem barrier ops (elided for some targets)
- [ ] more code gens (WHLSL, OpenCL, TS/JS, Houdini VEX)

## Installation

```bash
yarn add @thi.ng/shader-ast
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/master/packages/defmulti)

## Usage examples

```ts
import {
    defn,
    dot,
    emitGLSL,
    float,
    ret,
    vec2,
    vec3
} from "@thi.ng/shader-ast";

// init code gen
const GLSL = emitGLSL(300);

// define function w/ ret type and args
// the given inner function will be called with
// type annotated args and returns an array of
// AST nodes defining the function's body
const foo = defn(
    "void", "foo", [["vec2", "a"], ["f32", "b"], ["f32", "c", "out"]],
    (a, b, c) => [
        ret(dot(vec3(a, b), vec3(c)))
    ]);

// another function which calls `foo`
// the args given to `foo()` are type checked by TS
const main = defn(
    "void", "main", [],
    () => [
        foo(vec2(1), float(1), float(2))
    ]);

// emit both functions (this syntax is purely WIP)
console.log([foo, main].map(GLSL).join("\n\n"));
```

```glsl
float foo(in vec2 a, in float b, out float c) {
return dot(vec3(a, b), vec3(c));
}

void main() {
foo(vec2(1.0), 1.0, 2.0);
}
```

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
