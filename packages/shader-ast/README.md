# @thi.ng/shader-ast

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/shader-ast.svg)](https://www.npmjs.com/package/@thi.ng/shader-ast)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/shader-ast.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Standard library of common, higher level operations](#standard-library-of-common-higher-level-operations)
    - [Benefits](#benefits)
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

<small>Comparison of the raymarch shader example (link further below), cross compiled to both WebGL and JavaScript and showing the difference image of both results.</small>

### Standard library of common, higher level operations

In addition to the code generation aspects, this package also provides a
form of "standard library", pure functions for common shader & GPGPU use
cases and which can be used as syntax sugar and / or higher level
building blocks for your own shaders. So far, this includes lighting
models, fog equations, SDF primitives / operators, raymarching helpers
etc. [These functions are distributed in as separate
package](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast-stdlib).

### Benefits

- **no more copy & pasting, string interpolation / templating**: use
  standard TS/JS tooling & full IDE integration to create shaders (e.g.
  docs strings, packaging, 3rd party dependencies etc.)
- **all non-builtin functions keep track of their transitive dependencies**,
  enabling call graph analysis, dead code elimination, topologically
  correct code output ordering etc. - all without manual user intervention
- **improve general re-use**, especially once more target codegens are
  available (see [future goals](#future-goals)).
- **higher-order function composition & customization** (e.g. see
  [raymarch.ts](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/shader-ast-stdlib/src/raymarch/scene.ts))
- **cross compilation** to different graphics environments
- shader functions can be called like standard TS/JS functions (incl.
  automatically type checked args via TS mapped types)
- type checking (at authoring time & compile time)
  and type annotations of all AST nodes catches many issues early on
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
- [x] bitwise operators
- [x] loops (for, while, break, continue)
- [x] const var modifier
- [ ] more builtin type ctors / casts (ivec ✅, bvec, mat ✅, samplers ✅)
- [x] more builtin function defs
- [x] support for builtin `gl_XXX` variables (target specific)
- [x] more function arities (max 8 args)
- [x] function call dependency analysis and ordered output
- [x] GLSL version support (100/300)
- [ ] attribute, varying, uniform declarations
- [ ] documentation

### Future goals

- [ ] struct support
- [ ] more code gens (JS ✅, WASM, WHLSL, OpenCL, Houdini VEX)
- [ ] integration w/
  [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/feature/webgl/packages/webgl)
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

## Usage examples

Partially commented examples:

- [Canvas2D shader](https://demo.thi.ng/umbrella/shader-ast-canvas2d/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-canvas2d)
- [2D SDF](https://demo.thi.ng/umbrella/shader-ast-sdf2d/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-sdf2d)
- [Raymarching](https://demo.thi.ng/umbrella/shader-ast-raymarch/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-raymarch)
- [Textured tunnel](https://demo.thi.ng/umbrella/shader-ast-tunnel/), [source code](https://github.com/thi-ng/umbrella/tree/feature/webgl/examples/shader-ast-tunnel)

## API

**TODO** - docs forthcoming

### Supported types

- `float` (32 bit)
- `int` (signed 32bit)
- `uint` (unsigned 32bit)
- `bool`
- `vec2` (f32)
- `vec3` (f32)
- `vec4` (f32)
- `ivec2` (i32)
- `ivec3` (i32)
- `ivec4` (i32)
- `uvec2` (u32)
- `uvec3` (u32)
- `uvec4` (u32)
- `bvec2` (bool)
- `bvec3` (bool)
- `bvec4` (bool)
- `mat2` (2x2, f32)
- `mat3` (3x3, f32)
- `mat4` (4x4, f32)
- `sampler2D`
- `sampler3D`
- `samplerCube`
- `sampler2DShadow`
- `samplerCubeShadow`

### Operators

The following operators are all applied componentwise, take 2 arguments and support mixed vector / scalar args. The resulting AST nodes will contain type hints to simplify later code generation tasks:

- `add`
- `div`
- `mul`
- `sub`

Multiply has execptional semantics for matrix * matrix, matrix * vector
and vector * matrix (all perform correct linear algebraic
multiplications). See GLES language reference.

#### Swizzling

Only available for vector types - to extract, , optionally reordered,
components and / or to expand, shorten vectors. If only one component is
selected, the result will be a scalar, else a vector of the specified
length.

- `$(vec3(1,2,3), "zyx")` => `vec3(3,2,1)`

Syntax sugar for single component lookups:

- `$x(v)` (same as `$(v, "x")`)
- `$y(v)`
- `$z(v)`
- `$w(v)`

Swizzle patterns are type checked in the editor (and at compile time), i.e.

- `$(vec2(1,2), "xxx")` => ok (results in equivalent of `vec3(1,1,1)`)
- `$(vec2(1,2), "xyz")` => **illegal** (since `z` is not available in a `vec2`)

#### Index lookups

### Symbol definitions / assignments

### Control flow

#### If-Then-Else

#### Ternary operator

#### For-loop

#### While-loop

### Built-in functions

The most common set of GLSL ES 3.0 builtins are supported. See
[builtins.ts](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast/src/builtins.ts)
for reference.

### User defined functions

Functions can be created via `defn()` and can accept 0-8 typed
arguments. Functions declared in this manner can be called like any
other TS/JS function and will return a function call AST node with the
supplied args.

```ts
// example from @thi.ng/shader-ast-stdlib

/**
 * Computes Lambert term, optionally using Half-Lambertian,
 * if `half` is true.
 *
 * https://developer.valvesoftware.com/wiki/Half_Lambert
 *
 * @param surfNormal vec3
 * @param lightDir vec3
 * @param half bool
 */
const lambert = defn(
    // return type
    "float",
    // function name
    "lambert",
    // args (incl. optional name and other opts)
    [["vec3"], ["vec3"], ["bool"]],
    // function body
    (n, ldir, bidir) => {
        // pre-declare local var
        let d: FloatSym;
        // function body is array of AST nodes
        return [
            // initialize local using expr given to `sym()`
            (d = sym(dot(n, ldir))),
            // return statement
            ret(
                ternary(
                    bidir,
                    fit1101(d),
                    // also see clamp01() in stdlib
                    clamp(d, float(0), float(1))
                )
            )
        ];
    }
);
```

When `defn` is called the function body will be checked for correct
return types. Additionally a call graph for the function is generated to
ensure the code generator later emits all dependent functions in the
correct order.

Since `defn` returns a standard TS/JS function, all arguments will type
checked at call sites.

#### Inline functions

If no function local variables are required and/or inlining is desired, vanilla TS/JS functions can be used to produce a partial AST, which is then inserted at the call site:

```ts
/**
 * Computes sinc(kx).
 *
 * https://en.wikipedia.org/wiki/Sinc_function
 *
 * @param x
 * @param k
 */
const sinc = (x: FloatTerm, k: FloatTerm) =>
    div(sin(mul(k,x)), mul(k, x));
```

### Code generation

Currently, an AST can be compiled into the following languages:

#### GLSL (ES)

See
[@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast-glsl)
for further details.

```ts
import { targetGLSL } from "@thi.ng/shader-ast-glsl";

const glsl = targetGLSL();

console.log(glsl(lambert))
```

#### JavaScript

See
[@thi.ng/shader-ast-js](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast-js)
for further details.

```ts
import { targetJS } from "@thi.ng/shader-ast-js";

const js = targetJS();

console.log(js(lambert))

```

### Compilation & execution

### AST tooling & traversal

#### Tree traversals

- `walk`
- `allChildren`
- `scopeChildren`

#### Constant folding

Currently only works for scalars and primitive math ops:

```ts
import { constantFolding } from "@thi.ng/shader-ast";

const ast = mul(float(10), add(float(1), float(2)));

// {
//   tag: 'op2',
//   type: 'float',
//   info: undefined,
//   op: '*',
//   l: { tag: 'lit', type: 'float', info: undefined, val: 10 },
//   r: {
//     tag: 'op2',
//     type: 'float',
//     info: undefined,
//     op: '+',
//     l: { tag: 'lit', type: 'float', info: undefined, val: 1 },
//     r: { tag: 'lit', type: 'float', info: undefined, val: 2 }
//   }
// }

constantFolding(ast)
// { tag: 'lit', type: 'float', info: undefined, val: 30 }
```

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
