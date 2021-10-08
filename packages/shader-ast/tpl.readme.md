# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/shader-ast/shader-ast-01.jpg)

<small>Example shader running in plain JS & Canvas 2D context,
cross-compiled JS/GLSL outputs on the right</small>

Both an [embedded
DSL](https://en.wikipedia.org/wiki/Domain-specific_language) and [IR
format](https://en.wikipedia.org/wiki/Intermediate_representation) to
encourage and define *modular* shader code directly in TypeScript and
then cross-compile to different languages. Using GLSL types and
semantics as starting point, the DSL is used as an assembly language to
define a partially (as much as possible / feasible) type checked AST,
incl. custom, user defined functions, higher-order functions, inline
functions, automatic vector-scalar overrides, most of GLSL ES 3.0
built-ins, arg checking, and function return type inference.

Code generation can be done for individual expressions or entire shader
programs, incl. call graph analysis and topological re-ordering of all
transitively called functions (other than built-ins). Currently only
GLSL & JS are supported as target (see code gen packages below), but
custom code generators can be easily added. Once more details have been
ironed out, we aim to support [Houdini
VEX](http://www.sidefx.com/docs/houdini/vex/index.html) (in-progress),
[WASM](https://webassembly.org), [WHLSL for
WebGPU](https://github.com/gpuweb/WHLSL) in the near future as well.

![webgl/canvas2d comparison](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/shader-ast/shader-ast-raymarch-compare.jpg)

<small>Comparison of the raymarch shader example (link further below), cross
compiled to both GLSL (left) and JavaScript (right). Difference image of both results in the center.</small>

![VEX plane displacement](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/shader-ast/shader-ast-raymarch-vex-sm.gif)

<small>[Larger
version](https://twitter.com/thing_umbrella/status/1146109598274924544) - The same raymarching example compiled to Houdini VEX and used as "Point
Wrangle" to displace a grid geometry (using only the depth value of the
raymarching step).</small>

### Standard library of common, higher level operations

In addition to the code generation aspects, this package also provides a
form of "standard library", pure functions for common shader & GPGPU use
cases and which can be used as syntax sugar and / or higher level
building blocks for your own shaders. So far, this includes various math
utils, lighting models, fog equations, SDF primitives / operators,
raymarching helpers etc. [These functions are distributed in as separate
package](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib).

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
  [raymarch.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/raymarch/scene.ts),
  or
  [additive.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib/src/math/additive.ts))
- **cross compilation** to different graphics environments
- shader functions can be called like standard TS/JS functions (incl.
  automatically type checked args via TS mapped types)
- type checking (at authoring time & compile time)
  and type annotations of all AST nodes catches many issues early on
- avoids complex GLSL parsing as done by other transpilers
- shader code will be fully minimized along with main app code in
  production builds as part of standard bundling processes / tool
  chains, no extra plugins needed
- small run time & file size overhead (depending on output target impl)

### Prior art / influences

- [Hypergiant](http://alex-charlton.com/posts/Prototype_to_polish_Making_games_in_CHICKEN_Scheme_with_Hypergiant)
- [Lux](https://github.com/cscheid/lux/tree/develop/src/shade)
- [Penumbra](https://github.com/ztellman/penumbra)
- [gamma](https://github.com/kovasb/gamma/)
- [thi.ng/shader-graph](http://thi.ng/shader-graph)
- [LLVM](http://llvm.org)

### Future goals

See the [project
dashboard](https://github.com/thi-ng/umbrella/projects/2) for current
status. The TL;DR list...

- [ ] documentation
- [ ] struct support
- [ ] uniform blocks
- [ ] more code gens (JS ✅, WASM, WHLSL, OpenCL, Houdini VEX (WIP))
- [ ] JS runtime improvements / features (non-GPU / vanilla JS shader execution)
- [ ] Integration w/ a GLSL parser (new or existing)
- [ ] AST transformations (optimizers, e.g. [constant
  folding ✅](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast/src/optimize.ts))

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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
- `isampler2D`
- `isampler3D`
- `isamplerCube`
- `usampler2D`
- `usampler3D`
- `usamplerCube`

### Operators

The following operators are all applied componentwise, take 2 arguments
and support mixed vector / scalar args. One of the operands can also be
a plain JS number, but not both. The resulting AST nodes will contain
type hints to simplify later code generation tasks:

- `add`
- `div`
- `mul`
- `sub`

If one of the operands is a vector or matrix and the other scalar, the
result will be vector/matrix.

If a plain (unwrapped) JS number value is given for one of the operands,
it will be automatically wrapped in a suitable type, based on that of
the other operand. E.g. In `add(vec2(1), 10)`, the `10` will be cast to
`float(10)`. In `add(ivec2(1), 10)`, it will be cast to `int(10)`...

`mul` has exceptional semantics for `matrix * matrix`, `matrix *
vector` and `vector * matrix` operands (all perform correct linear
algebraic multiplications). See GLSL ES language reference.

#### Comparison

All comparisons result in a `bool` term (i.e. `Term<"bool">`)

| AST   | GLSL |
|-------|------|
| `lt`  | `<`  |
| `lte` | `<=` |
| `eq`  | `==` |
| `neq` | `!=` |
| `gte` | `>=` |
| `gt`  | `>`  |

#### Logic

| AST   | GLSL |
|-------|------|
| `and` | `&&` |
| `or`  | `||` |
| `not` | `!`  |

#### Bitwise

| AST      | GLSL |
|----------|------|
| `bitand` | `&`  |
| `bitor`  | `|`  |
| `bitxor` | `^`  |
| `bitnot` | `~`  |

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
- `$xy(v)`
- `$xyz(v)`

Swizzle patterns are type checked in the editor (and at compile time), i.e.

- `$(vec2(1,2), "xyx")` => ok (results in equivalent of `vec3(1,2,1)`)
- `$(vec2(1,2), "xyz")` => **illegal** (since `z` is not available in a `vec2`)

#### Array index lookups

- `index`
- `indexMat`

### Symbol definitions / assignments

- `sym`
- `arraySym`
- `assign`
- `input`
- `output`
- `uniform`

### Control flow

- `brk`
- `cont`
- `discard`

#### If-Then-Else

- `ifThen(test, truthy, falsy)`

#### Ternary operator

- `ternary(test, truthy, falsy)`

#### For-loop

- `forLoop(sym, testFn, iterFn, bodyFn)`

#### While-loop

- `whileLoop(test, body)`

### Built-in functions

The most common set of GLSL ES 3.0 builtins are supported. See
[/builtin](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast/src/builtin/)
for reference.

### User defined functions

Functions can be created via `defn` and can accept 0-8 typed
arguments. Functions declared in this manner can be called like any
other TS/JS function and will return a function call AST node with the
supplied args.

```ts
// example based on @thi.ng/shader-ast-stdlib

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
    ["vec3", "vec3", "bool"],
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

When `defn` is called, the function body will be checked for correct
return types. Additionally a call graph for the function is generated to
ensure the code generator later emits all dependent functions in the
correct order.

Since `defn` returns a standard TS/JS function, all arguments will be
automatically type checked at call sites (in TypeScript only).

#### Function arguments

Function argument lists are given as arrays, with each item either:

1. an AST type string, e.g. `"float"`
2. a tuple of `[type, name?, opts?]`, e.g. `["vec2", "bar", { q: "out" }]`

If no name is specified, an auto-generated one will be used. Generally,
this is preferable, since these names are only used for code generation
purposes and in most cases only need to be machine readable...

The body function (last arg given to `defn`), is called with
instantiated, typed symbols representing each arg and can use any name
within that function (also as shown in the above example).

See `SymOpts` interface in
[/api/syms.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast/src/api/syms.ts)
for more details about the options object...

#### Inline functions

If no function local variables are required and/or inlining is desired,
vanilla TS/JS functions can be used to produce a partial AST, which is
then inserted at the call site:

```ts
/**
 * Inline function. Computes sinc(kx).
 *
 * https://en.wikipedia.org/wiki/Sinc_function
 *
 * @param x
 * @param k
 */
const sinc = (x: FloatTerm, k: FloatTerm) =>
    div(sin(mul(x,k)), mul(x, k));
```

**Performance tip for INLINE functions only:** Since the `FloatTerm`
type (or similarly any other `XXXTerm` type) refers to any expression
evaluating to a `"float"`, in some cases (like this `sinc()` example) it
might be better to only accept `FloatSym` arguments, since this ensures
the arg expressions are not causing duplicate evaluation. For example:

```ts
sinc(length(mul(vec3(1,2,3), 100)), float(10));
```

...will be expanded to:

```ts
div(
    sin(mul(length(mul(vec3(1,2,3), 100)),k)),
    mul(length(mul(vec3(1,2,3), 100)), k)
);
```

...which is not desirable.

If, however, the inline function asks for `FloatSym` args, the caller is
forced to supply variables and so is also responsible to pre-define
them... Alternatively, the function could be re-defined via `defn` to
avoid such issues altogether (but then causes an additional function
call at runtime - nothing comes for free!).

### Global scope

#### Input / output variables / declarations

- `input`
- `output`
- `uniform`

#### Program definition

- `program([...decls, ...functions])`

### Code generation

Currently, an AST can be compiled into the following languages:

#### GLSL (ES)

See
[@thi.ng/shader-ast-glsl](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-glsl)
for further details.

```ts
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";

// create codegen w/ options (defaults shown)
const glsl = targetGLSL({
    version: GLSLVersion.GLES_300,
    versionPragma: true,
    type: "fs"
});

console.log(glsl(lambert))
```

#### JavaScript

See
[@thi.ng/shader-ast-js](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-js)
for further details.

```ts
import { targetJS } from "@thi.ng/shader-ast-js";

const js = targetJS();

console.log(js(lambert))
```

### Compilation & execution

Depending on intended target environment, the following packages can be used to
execute shader-ast trees/programs:

- WebGL (v1, v2): [@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl)
- JavaScript: [@thi.ng/shader-ast-js](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-js)

### AST tooling, traversal, optimization

#### Tree traversals

- `walk`
- `allChildren`
- `scopeChildren`

See
[@thi.ng/shader-ast-optimize](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-optimize)
for AST optimization strategies.

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
