# Change Log

- **Last updated**: 2023-05-05T21:29:28Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.12.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.12.6) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [0.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.12.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [0.11.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.11.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.11.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests
- remove AST optimization tools ([a1174db](https://github.com/thi-ng/umbrella/commit/a1174db))
- BREAKING CHANGE: migrate AST optimizations to new package
  - migrated to [@thi.ng/shader-ast-optimize](https://github.com/thi-ng/umbrella/tree/main/packages/shader-ast-optimize), see  [b71cd16ab](https://github.com/thi-ng/umbrella/commit/b71cd16ab)
  - update deps/readme

#### 🚀 Features

- update & export gensym() ([8a3f1ff](https://github.com/thi-ng/umbrella/commit/8a3f1ff))
  - add opt prefix arg for better re-use

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- sideeffect-free defmulti specs ([1282973](https://github.com/thi-ng/umbrella/commit/1282973))

## [0.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.10.0) (2021-08-17)

#### 🚀 Features

- add node type for matrix indexing ([394dd49](https://github.com/thi-ng/umbrella/commit/394dd49))
  - add `idxm` node `Tag`
  - add `IndexM` node type interface
  - update indexMat(), add column type LUT
  - update `TargetImpl` interface
- add reciprocal() syntax sugar ([c710d81](https://github.com/thi-ng/umbrella/commit/c710d81))

#### ⏱ Performance improvements

- avoid nested literals ([998cf35](https://github.com/thi-ng/umbrella/commit/998cf35))
  - update `lit()` to avoid nesting if already same type & info

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.9.0) (2021-08-13)

#### 🚀 Features

- add/update vec2/3 & float consts ([2748f0b](https://github.com/thi-ng/umbrella/commit/2748f0b))
- add/update AST node predicates ([8a4855e](https://github.com/thi-ng/umbrella/commit/8a4855e))
- add module logger ([24c8ad5](https://github.com/thi-ng/umbrella/commit/24c8ad5))
- update/improve AST optimizer ([ad60add](https://github.com/thi-ng/umbrella/commit/ad60add))
  - add support for lit hoisting & single comp swizzling
  - add logger support in replaceNode()
  - update constantFolding() to run iteratively as many times as needed
  - fix op1/op2 optimizers to use correct node predicates
- add optimizers for built-in fns ([b0124d7](https://github.com/thi-ng/umbrella/commit/b0124d7))

### [0.8.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.8.14) (2021-06-08)

#### 🩹 Bug fixes

- add missing vector coercions ([a84e053](https://github.com/thi-ng/umbrella/commit/a84e053))
  - update ivec/uvec/bvec2/3/4 ctors

### [0.8.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.8.13) (2021-04-24)

#### 🩹 Bug fixes

- fix/extend vec coercions info ([6679b52](https://github.com/thi-ng/umbrella/commit/6679b52))

### [0.8.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.8.1) (2021-03-03)

#### ♻️ Refactoring

- simplify texture fns ([a0a2bda](https://github.com/thi-ng/umbrella/commit/a0a2bda))
  - update $call helper to support all texture lookup args, re-use

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.8.0) (2021-02-24)

#### 🚀 Features

- add more texture lookup fns ([3c95d13](https://github.com/thi-ng/umbrella/commit/3c95d13))
  - add tests

### [0.7.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.7.1) (2020-09-13)

#### ♻️ Refactoring

- update imports ([643376a](https://github.com/thi-ng/umbrella/commit/643376a))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.7.0) (2020-08-28)

#### 🚀 Features

- add PrimTerm, PrimTypeMap, TermType ([ffdfe81](https://github.com/thi-ng/umbrella/commit/ffdfe81))
- allow nullish defn() func name (autogen) ([d959858](https://github.com/thi-ng/umbrella/commit/d959858))
  - make name arg optional and auto-generate if nullish

#### 🩹 Bug fixes

- fix vec3(vec2, float) ctor version ([bd5395d](https://github.com/thi-ng/umbrella/commit/bd5395d))

### [0.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.6.1) (2020-08-12)

#### ♻️ Refactoring

- update madd()/addm() args ([cfce142](https://github.com/thi-ng/umbrella/commit/cfce142))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.6.0) (2020-08-10)

#### 🚀 Features

- add/update vec coercions ([764f4e5](https://github.com/thi-ng/umbrella/commit/764f4e5))
  - add $info() helper to allow new coercion details:
    - b = bvec
    - i = ivec
    - u = uvec
    - v = vec
  - add tests

### [0.5.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.5.2) (2020-08-08)

#### 🩹 Bug fixes

- fix typo in isTerm(), add tests ([615c8d2](https://github.com/thi-ng/umbrella/commit/615c8d2))

### [0.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.5.1) (2020-08-08)

#### 🩹 Bug fixes

- update allChildren(), add isTerm() ([267a0c0](https://github.com/thi-ng/umbrella/commit/267a0c0))
  - update allChildren() to descend into literals if value is a Term

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.5.0) (2020-08-08)

#### 🚀 Features

- add vec coercions (bvec, ivec..) ([a0d0c55](https://github.com/thi-ng/umbrella/commit/a0d0c55))

#### ♻️ Refactoring

- update bool presets ([8a1835c](https://github.com/thi-ng/umbrella/commit/8a1835c))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.4.0) (2020-07-28)

#### 🚀 Features

- add sym interpolation qualifiers ([0601af2](https://github.com/thi-ng/umbrella/commit/0601af2))
  - add `Interpolation` type
  - add `SymOpts.smooth` option

### [0.3.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.3.6) (2020-02-25)

#### ♻️ Refactoring

- update imports ([ff6eb70](https://github.com/thi-ng/umbrella/commit/ff6eb70))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.3.0) (2019-08-21)

#### 🚀 Features

- add modf(), isnan(), isinf() built-ins ([7fae67b](https://github.com/thi-ng/umbrella/commit/7fae67b))

#### ♻️ Refactoring

- split large TS files into smaller subfolders ([9a4881b](https://github.com/thi-ng/umbrella/commit/9a4881b))
- improve re-use vec ctors, bvec ops, texture fns ([1774c9b](https://github.com/thi-ng/umbrella/commit/1774c9b))
- more re-use vec/mat ctors ([bcd5829](https://github.com/thi-ng/umbrella/commit/bcd5829))
- update allChildren() ([e3ae743](https://github.com/thi-ng/umbrella/commit/e3ae743))
- update constant folding using defmulti ([e9dfacb](https://github.com/thi-ng/umbrella/commit/e9dfacb))

### [0.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.2.3) (2019-08-17)

#### 🩹 Bug fixes

- update atan built-in handling ([9f0c739](https://github.com/thi-ng/umbrella/commit/9f0c739))
  - add call info for 2-arg version

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.2.0) (2019-07-12)

#### 🚀 Features

- support number casts from bools ([119f257](https://github.com/thi-ng/umbrella/commit/119f257))

#### 🩹 Bug fixes

- builtin `not` (bvec) used wrong internal fn name ([237c6f3](https://github.com/thi-ng/umbrella/commit/237c6f3))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.1.1) (2019-07-08)

#### 🩹 Bug fixes

- fix [#98](https://github.com/thi-ng/umbrella/issues/98), update defn() arg lists, add/update docs ([bcfbcfd](https://github.com/thi-ng/umbrella/commit/bcfbcfd))

#### ♻️ Refactoring

- update function arg lists ([#98](https://github.com/thi-ng/umbrella/issues/98)) ([7d5fdce](https://github.com/thi-ng/umbrella/commit/7d5fdce))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.1.0) (2019-07-07)

#### 🚀 Features

- initial pkg import  w/ updated deps & readme ([30efebe](https://github.com/thi-ng/umbrella/commit/30efebe))
- more fn arities, add defTarget(), add/update types ([fdceb65](https://github.com/thi-ng/umbrella/commit/fdceb65))
- add assignments, re-org types, update vec ctors ([7dc32d1](https://github.com/thi-ng/umbrella/commit/7dc32d1))
  - temp disable ret type check in defn()
- update/rename targetGLSL() ([2e405f8](https://github.com/thi-ng/umbrella/commit/2e405f8))
  - add builtin output vars (gl_Position etc)
  - add GLSLTarget interface
  - implement assignment
- add AST node types, builtins, major refactor ([f8caed5](https://github.com/thi-ng/umbrella/commit/f8caed5))
  - add scope nodes for functions, branching and as mechanism to create
    var declarations from existing embedded symbols. any direct descendant
    Sym within a scope will transformed into a Decl node (var declaration)
  - update `defn()` to traverse local scope to check for correct return type
  - implement array indexing (Index)
  - update assignments to allow Sym, Swizzle, Index nodes on LHS
  - update `swizzle()` to support ivec2/3/4 types
  - update vec2/3/4 ctors
  - update math ops to support more types
  - add comparison ops
  - add `builtinCall()`
  - add various builtin GLSL func call wrappers
  - refactor / simplify GLSL code gen
  - update readme
- add JS target, re-org ([c4a35e1](https://github.com/thi-ng/umbrella/commit/c4a35e1))
- add builtins, update codegens, sym/lit opts, matrices ([3caede4](https://github.com/thi-ng/umbrella/commit/3caede4))
- major update JS codegen, implement most builtin fns, fixes ([7da1738](https://github.com/thi-ng/umbrella/commit/7da1738))
  - add JSBuiltins* interfaces, update JSEnv
  - add JS_DEFAULT_ENV w/ all implementations (for actual code execution)
  - fix swizzle assignments
  - update fn & operator calls
  - update JSTarget.compile()
- add op2 info, fix result type, make var names optional ([9cc13ab](https://github.com/thi-ng/umbrella/commit/9cc13ab))
- update JS codegen ([1d4cc58](https://github.com/thi-ng/umbrella/commit/1d4cc58))
  - add matrix impls
  - add vector/matrix scalar impls
  - update op2 gen
- add sym() fn overrides, args ([02d62a2](https://github.com/thi-ng/umbrella/commit/02d62a2))
- add forLoop(), ternary(), fix float/int casts, docs ([474e320](https://github.com/thi-ng/umbrella/commit/474e320))
- rename swizzle() => $(), add break/continue ([5db7d1c](https://github.com/thi-ng/umbrella/commit/5db7d1c))
- major updates ([51d42b4](https://github.com/thi-ng/umbrella/commit/51d42b4))
  - add initial collection of re-usable shader functions
    - SDF primitives & combinators
    - raymarch helpers
    - fog/falloff functions
    - clamp / fit
    - lambert / diffuse lighting
  - add constantFolding() tree optimizer
  - add userland function dependencies (mandatory, but still unused)
  - optimize single component swizzles in JS target
  - add more node type checkers, update walk()
  - update types
- add buildCallGraph(), add deps ([4017284](https://github.com/thi-ng/umbrella/commit/4017284))
- add trilight lighting  model ([0705e9d](https://github.com/thi-ng/umbrella/commit/0705e9d))
- simplify fn dep/call graph handling, fix allChildren() ([6ee63ea](https://github.com/thi-ng/umbrella/commit/6ee63ea))
- add program(), add docs ([fd1fca9](https://github.com/thi-ng/umbrella/commit/fd1fca9))
- add texture built-ins ([42ffed9](https://github.com/thi-ng/umbrella/commit/42ffed9))
- update GLSL & JS targets to support texture fns ([10782e2](https://github.com/thi-ng/umbrella/commit/10782e2))
  - JS target only provides stubs for now
- add/update sdf fns, fix fogExp2, update readme ([d5115ff](https://github.com/thi-ng/umbrella/commit/d5115ff))
- add single component swizzle fns ([8b36527](https://github.com/thi-ng/umbrella/commit/8b36527))
- add/update stdlib functions & docs ([e36c5b8](https://github.com/thi-ng/umbrella/commit/e36c5b8))
- add WASM target basics & C runtime ([ef06c74](https://github.com/thi-ng/umbrella/commit/ef06c74))
- add type aliases, update all uses, minor additions ([0914c56](https://github.com/thi-ng/umbrella/commit/0914c56))
  - XXXTerm & XXXSym aliases
  - add transformMVP() & surfaceNormal std lib fns
  - fix tests
- add ivec / uvec support, bitwise ops, update types ([4f7ca39](https://github.com/thi-ng/umbrella/commit/4f7ca39))
- add isBool() helper, update gensym() to use base36 ids ([2b23b83](https://github.com/thi-ng/umbrella/commit/2b23b83))
- add input(), output(), uniform(), update SymOpts ([1307b3f](https://github.com/thi-ng/umbrella/commit/1307b3f))
- add post-increment/decrement, update op1() ([c809af1](https://github.com/thi-ng/umbrella/commit/c809af1))
- update program() to accept global syms & fns, add/update docs ([95524fb](https://github.com/thi-ng/umbrella/commit/95524fb))
- add defMain, allow null values in scope bodies ([de0a3da](https://github.com/thi-ng/umbrella/commit/de0a3da))
- add builtins, `discard`, add/refactor ControlFlow node type ([663e992](https://github.com/thi-ng/umbrella/commit/663e992))
  - add texelFetch()
  - add dFdx / dFdy / fwidth()
- add % modulo operator as modi() ([e7ace59](https://github.com/thi-ng/umbrella/commit/e7ace59))
- add arraySym(), update op2 to accept plain numbers ([dc4dc15](https://github.com/thi-ng/umbrella/commit/dc4dc15))
- add $xy, $xyz swizzle sugar ([ff0ed9e](https://github.com/thi-ng/umbrella/commit/ff0ed9e))
- update numeric ctors/casts, update swizzles, add uvec/bvec ctors ([423fd84](https://github.com/thi-ng/umbrella/commit/423fd84))
- update texture builtins, add texelFetchOffset ([a0af395](https://github.com/thi-ng/umbrella/commit/a0af395))
- add support for (iu)sampler types, add textureGrad() ([f8f245b](https://github.com/thi-ng/umbrella/commit/f8f245b))
- add powf(), update matchingPrimFor() ([ac179a3](https://github.com/thi-ng/umbrella/commit/ac179a3))

#### 🩹 Bug fixes

- fix op2(), update Tag, general cleanup ([46bcb04](https://github.com/thi-ng/umbrella/commit/46bcb04))
- use JS op2 info hints to delegate ([162c1ae](https://github.com/thi-ng/umbrella/commit/162c1ae))
- buildCallGraph zero-dep fn handling ([2f9da96](https://github.com/thi-ng/umbrella/commit/2f9da96))
- use GLSL style mod in JS codegen ([b4ca8e4](https://github.com/thi-ng/umbrella/commit/b4ca8e4))
- allChildren() (while loop support) ([3a559cf](https://github.com/thi-ng/umbrella/commit/3a559cf))
- mod() type inference ([1412f71](https://github.com/thi-ng/umbrella/commit/1412f71))
- update allChildren() ([1711064](https://github.com/thi-ng/umbrella/commit/1711064))

#### ♻️ Refactoring

- internal reuse in emitGLSL() ([9dacac6](https://github.com/thi-ng/umbrella/commit/9dacac6))
- rename predef'd bool consts ([8a8eecc](https://github.com/thi-ng/umbrella/commit/8a8eecc))
- rename numeric types, make defTarget generic ([ba0eaa6](https://github.com/thi-ng/umbrella/commit/ba0eaa6))
  - f32 => float
  - i32 => int
  - u32 => uint
- update/add op2 info tags (incl. integer ops) ([4e0cf46](https://github.com/thi-ng/umbrella/commit/4e0cf46))
