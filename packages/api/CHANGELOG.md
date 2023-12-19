# Change Log

- **Last updated**: 2023-12-19T11:01:47Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [8.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.9.0) (2023-08-04)

#### 🚀 Features

- add generics for Event & INotify ([7702882](https://github.com/thi-ng/umbrella/commit/7702882))
- add basic utility functions: identity, always, never ([4801e2d](https://github.com/thi-ng/umbrella/commit/4801e2d))
- add generics for INotify, Event, Listener types ([dd0a6ed](https://github.com/thi-ng/umbrella/commit/dd0a6ed))
- add IIDGen interface ([26cf9d1](https://github.com/thi-ng/umbrella/commit/26cf9d1))

## [8.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.8.0) (2023-04-19)

#### 🚀 Features

- add typedArrayOfVec() ([39307bf](https://github.com/thi-ng/umbrella/commit/39307bf))

## [8.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.7.0) (2023-02-05)

#### 🚀 Features

- add narrow/widenType() fns ([5ce9938](https://github.com/thi-ng/umbrella/commit/5ce9938))

## [8.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.6.0) (2022-12-16)

#### 🚀 Features

- add SomeRequired type alias ([ff28e71](https://github.com/thi-ng/umbrella/commit/ff28e71))

## [8.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.5.0) (2022-11-28)

#### 🚀 Features

- add boolean result for INotifiy.notify(), update mixin ([f4cb33a](https://github.com/thi-ng/umbrella/commit/f4cb33a))

### [8.4.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.4.5) (2022-11-01)

#### 🩹 Bug fixes

- off-by-one error for BIT_SHIFTS LUT (f64) ([dae2279](https://github.com/thi-ng/umbrella/commit/dae2279))

## [8.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.4.0) (2022-08-15)

#### 🚀 Features

- add i64/u64 support for typed arrays ([0bb5277](https://github.com/thi-ng/umbrella/commit/0bb5277))
  - add various 64bit bigint related types & lookups
  - add BIT_SHIFTS LUT
  - update sizeOf()
  - update typedArray()

## [8.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.3.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### 🩹 Bug fixes

- disable debug console output in mixin() ([50354c8](https://github.com/thi-ng/umbrella/commit/50354c8))

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

## [8.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.2.0) (2021-11-10)

#### 🚀 Features

- update IGrid types, add mixins ([f0f3236](https://github.com/thi-ng/umbrella/commit/f0f3236))

#### 🩹 Bug fixes

- add missing module exports ([fc8805e](https://github.com/thi-ng/umbrella/commit/fc8805e))

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

## [8.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.1.0) (2021-11-03)

#### 🚀 Features

- add IGrid2D/3D interfaces ([e57ad7e](https://github.com/thi-ng/umbrella/commit/e57ad7e))
- add asInt() coercion helper ([49cd772](https://github.com/thi-ng/umbrella/commit/49cd772))

### [8.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [8.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.0.0) (2021-10-12)

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
- remove obsolete assert() ([5f6ec5c](https://github.com/thi-ng/umbrella/commit/5f6ec5c))
- BREAKING CHANGE: assert() moved to [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/main/packages/errors) pkg
  - see [7030a6aec](https://github.com/thi-ng/umbrella/commit/7030a6aec) for details
- major pkg restructure ([98e286d](https://github.com/thi-ng/umbrella/commit/98e286d))
- BREAKING CHANGE: major pkg restructure, migrations
  - migrate logging related types/classes to new [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/main/packages/logger) pkg
    - see [e0399a8f6](https://github.com/thi-ng/umbrella/commit/e0399a8f6) for details
  - migrate `exposeGlobal()` to new [@thi.ng/expose](https://github.com/thi-ng/umbrella/tree/main/packages/expose) pkg
    - see [323995fd7](https://github.com/thi-ng/umbrella/commit/323995fd7) for details
  - lift /api source files to main /src folder for easier import
  - this pkg now only contains type defs, constants, decorators and mixins
    all other functionality migrated to other packages...

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- minor pkg restructure (various) ([47f88d2](https://github.com/thi-ng/umbrella/commit/47f88d2))

## [7.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@7.2.0) (2021-09-03)

#### 🚀 Features

- add DeepArrayValue type ([a309fac](https://github.com/thi-ng/umbrella/commit/a309fac))

### [7.1.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@7.1.7) (2021-08-04)

#### ♻️ Refactoring

- dedupe IEnableMixin method impls ([3433e5d](https://github.com/thi-ng/umbrella/commit/3433e5d))

### [7.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@7.1.5) (2021-06-08)

#### ♻️ Refactoring

- [#294](https://github.com/thi-ng/umbrella/issues/294) update recursive helper types ([6ad582d](https://github.com/thi-ng/umbrella/commit/6ad582d))
  - simplify Head, Tail, Prepend type defs
  - update ArrayValue, Reverse

## [7.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@7.1.0) (2021-03-03)

#### 🚀 Features

- add StringOrSym type alias ([fb92c9d](https://github.com/thi-ng/umbrella/commit/fb92c9d))

# [7.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@7.0.0) (2021-02-20)

#### 🛑 Breaking changes

- replace Type enum w/ strings consts ([a333d41](https://github.com/thi-ng/umbrella/commit/a333d41))
- BREAKING CHANGE: replace Type enum w/ string consts
  - update Type, UintType, IntType, FloatType aliases
  - update GL2TYPE, TYPE2GL, SIZEOF, TYPEDARRAY_CTORS tables
  - add asNativeType(), asGLType() conversions
  - add sizeOf()
  - add uintTypeForBits(), intTypeForBits()
  - update/rename uintTypeForSize(), intTypeForSize()

#### 🚀 Features

- add Range type ([5d94974](https://github.com/thi-ng/umbrella/commit/5d94974))
- add typedArrayType() classifier ([5c81fd8](https://github.com/thi-ng/umbrella/commit/5c81fd8))
- more finely grained typedarray types ([8316d05](https://github.com/thi-ng/umbrella/commit/8316d05))

### [6.13.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.13.4) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([94be931](https://github.com/thi-ng/umbrella/commit/94be931))

## [6.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.13.0) (2020-09-13)

#### 🚀 Features

- add FnU and FnN function types ([4ba48d0](https://github.com/thi-ng/umbrella/commit/4ba48d0))
- add DeepPartial type ([0d9a0de](https://github.com/thi-ng/umbrella/commit/0d9a0de))

#### 🩹 Bug fixes

- update assert() & exposeGlobal() detection ([2cdc038](https://github.com/thi-ng/umbrella/commit/2cdc038))

## [6.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.12.0) (2020-07-28)

#### 🚀 Features

- add Always & ArrayValue types ([dcf9aeb](https://github.com/thi-ng/umbrella/commit/dcf9aeb))

## [6.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.11.0) (2020-06-01)

#### 🚀 Features

- add deref(), isDeref() fns & MaybeDeref ([722bf3e](https://github.com/thi-ng/umbrella/commit/722bf3e))
  (cherry picked from commit [2ab46adee629bf06d064bdcd5c064f7fcc1e7433](https://github.com/thi-ng/umbrella/commit/2ab46adee629bf06d064bdcd5c064f7fcc1e7433))
- add deref(), isDeref() fns & MaybeDeref ([2ab46ad](https://github.com/thi-ng/umbrella/commit/2ab46ad))

## [6.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.10.0) (2020-04-06)

#### 🚀 Features

- add LogLevelName type ([25b6c67](https://github.com/thi-ng/umbrella/commit/25b6c67))

### [6.9.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.9.1) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([b247903](https://github.com/thi-ng/umbrella/commit/b247903))

## [6.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.9.0) (2020-03-28)

#### 🚀 Features

- add Path0-8, PathVal1-8, DeepPath types ([0c76108](https://github.com/thi-ng/umbrella/commit/0c76108))
- update Path alias, add doc strings ([e2b35bc](https://github.com/thi-ng/umbrella/commit/e2b35bc))
- add Derefed & DerefedKeys types ([95f1576](https://github.com/thi-ng/umbrella/commit/95f1576))
- add optional props in Keys/Val types ([08b88f0](https://github.com/thi-ng/umbrella/commit/08b88f0))
  - force intermediate props using `Required<T>`
  - update Keys1-8, Val1-8
  - update KeysN / ValN

#### ♻️ Refactoring

- update path value & tuple types ([aa9db3a](https://github.com/thi-ng/umbrella/commit/aa9db3a))
  - replace PathVal1-8 w/ PathVal
  - add OptPathVal
  - add IsOpt, IsOptPath type predicates
  - add IsEmpty type predicate
  - update Last, ButLast tuple types

## [6.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.8.0) (2020-02-25)

#### 🚀 Features

- add TypedKeys, NumericKeys, StringKeys ([fab1a5e](https://github.com/thi-ng/umbrella/commit/fab1a5e))

#### 🩹 Bug fixes

- fix imports ([e3e0cdc](https://github.com/thi-ng/umbrella/commit/e3e0cdc))

#### ♻️ Refactoring

- update type exports, internal restructure ([b8c7681](https://github.com/thi-ng/umbrella/commit/b8c7681))
  - dissolve api.ts
  - move constants to constants.ts

### [6.7.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.7.1) (2020-01-26)

#### ♻️ Refactoring

- update IToHiccup, add opt args ([ac35685](https://github.com/thi-ng/umbrella/commit/ac35685))
- remove obsolete Drop/DropReducer ([5e80c4d](https://github.com/thi-ng/umbrella/commit/5e80c4d))

## [6.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.7.0) (2020-01-24)

#### 🚀 Features

- add exposeGlobal(), update assert(), update readme ([7981cc9](https://github.com/thi-ng/umbrella/commit/7981cc9))
- add more RangeXX types & RangeValueMap ([654ea53](https://github.com/thi-ng/umbrella/commit/654ea53))
- add IClear interface ([38f03ff](https://github.com/thi-ng/umbrella/commit/38f03ff))
- added the Head type ([f000a3d](https://github.com/thi-ng/umbrella/commit/f000a3d))
- added the Tail type ([fa59ff3](https://github.com/thi-ng/umbrella/commit/fa59ff3))
- added the Prepend type ([7bfe7a8](https://github.com/thi-ng/umbrella/commit/7bfe7a8))
- added the Reverse type ([88cfaa4](https://github.com/thi-ng/umbrella/commit/88cfaa4))
- added the KeysN type ([e0f0e90](https://github.com/thi-ng/umbrella/commit/e0f0e90))
- added the ValN type ([b48623f](https://github.com/thi-ng/umbrella/commit/b48623f))
- added the Last type ([44ae2f7](https://github.com/thi-ng/umbrella/commit/44ae2f7))
- added the Init type ([f6c333a](https://github.com/thi-ng/umbrella/commit/f6c333a))
- added the WithoutN type ([0d13af5](https://github.com/thi-ng/umbrella/commit/0d13af5))
- added the ReplaceN type ([4da54ae](https://github.com/thi-ng/umbrella/commit/4da54ae))
- add Drop, TupleLength, update Tuple ([dc79324](https://github.com/thi-ng/umbrella/commit/dc79324))
- add IReset interface ([d491bd0](https://github.com/thi-ng/umbrella/commit/d491bd0))

#### 🩹 Bug fixes

- don't use optional chaining, update assert(), exposeGlobal() ([ddfc65e](https://github.com/thi-ng/umbrella/commit/ddfc65e))

## [6.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.6.0) (2019-11-30)

#### 🚀 Features

- add Uint/Int/FloatType & helpers ([1d3c824](https://github.com/thi-ng/umbrella/commit/1d3c824))
  - add grouped Type aliases
  - add uintType() / intType() helpers
- add ISeq, ISeqable ([541e9c8](https://github.com/thi-ng/umbrella/commit/541e9c8))
- add WithoutX & ReplaceX types, update KeysX/ValX ([7707370](https://github.com/thi-ng/umbrella/commit/7707370))
  - add versions up to arity 8

#### ♻️ Refactoring

- replace error w/ assert() in decorator ([adfec26](https://github.com/thi-ng/umbrella/commit/adfec26))

## [6.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.5.0) (2019-11-09)

#### 🚀 Features

- add types, split api.ts into separate files ([b72e664](https://github.com/thi-ng/umbrella/commit/b72e664))
  - add GLType enum & GL2TYPE / TYPE2GL conversions
  - add TypedArrayContstructor, TYPEDARRAY_CTORS LUT
- add RangeXX types ([fc9cf21](https://github.com/thi-ng/umbrella/commit/fc9cf21))
- add typedArray() factory, update type mappers, docs ([ac7fa13](https://github.com/thi-ng/umbrella/commit/ac7fa13))

#### ♻️ Refactoring

- update INotifyMixin to clean up listeners ([ed2be64](https://github.com/thi-ng/umbrella/commit/ed2be64))
- fix [#168](https://github.com/thi-ng/umbrella/issues/168), refactor Range types ([39bf8f1](https://github.com/thi-ng/umbrella/commit/39bf8f1))

## [6.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.4.0) (2019-09-21)

#### 🚀 Features

- add Nullable ([8366223](https://github.com/thi-ng/umbrella/commit/8366223))
  (cherry picked from commit [bed4c3c95293374bcf002266c4a906e11f68bed3](https://github.com/thi-ng/umbrella/commit/bed4c3c95293374bcf002266c4a906e11f68bed3))
- add Nullable ([bed4c3c](https://github.com/thi-ng/umbrella/commit/bed4c3c))

#### ♻️ Refactoring

- Use `this` parameter to avoid casts in mixins. ([c78cf32](https://github.com/thi-ng/umbrella/commit/c78cf32))

## [6.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.3.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([0430d01](https://github.com/thi-ng/umbrella/commit/0430d01))
  - add missing return types for IEnable, IGet, IGetIn
  - update mixins, add private interfaces
- update assert() message arg types ([6137b48](https://github.com/thi-ng/umbrella/commit/6137b48))
  - add support for supplying message as no-arg fn to delay
    execution of template string literals
- add Select2/3/4 conditional types ([a4bfb88](https://github.com/thi-ng/umbrella/commit/a4bfb88))

#### ♻️ Refactoring

- update IEnable mixin (strictNullChecks) ([525ad0d](https://github.com/thi-ng/umbrella/commit/525ad0d))
- update IStack return types (TS strictNullChecks flag) ([daf1f4c](https://github.com/thi-ng/umbrella/commit/daf1f4c))

## [6.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.2.0) (2019-05-22)

#### 🚀 Features

- add Type enum, IntArray, UIntArray, FloatArray, SIZEOF ([b0c44fe](https://github.com/thi-ng/umbrella/commit/b0c44fe))

### [6.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.1.1) (2019-04-26)

#### 🩹 Bug fixes

- make LogLevel non-const enum, minor fix ConsoleLogger ([88d5e9d](https://github.com/thi-ng/umbrella/commit/88d5e9d))

## [6.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.1.0) (2019-04-24)

#### 🚀 Features

- add common logging types & default impls ([4578604](https://github.com/thi-ng/umbrella/commit/4578604))
  - add ILogger interface, LogLevel enum
  - add NULL_LOGGER & ConsoleLogger
- update ILogger, freeze NULL_LOGGER ([27ff8de](https://github.com/thi-ng/umbrella/commit/27ff8de))

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@6.0.0) (2019-03-28)

#### 🛑 Breaking changes

- add new types, update existing ([560eb90](https://github.com/thi-ng/umbrella/commit/560eb90))
  - add Keys* & Val* types
  - add ArrayLikeIterable
  - add Primitive
  - add Tuple, IterableTuple
- BREAKING CHANGE: split up, remove & update various interfaces
  - split IAssociative => IAssoc, IAssocIn
  - update IDissoc, add IDissocIn
  - split IGet => IGet, IGetIn
  - update IInto generics & return type
  - update ISet, remove IImmutableSet
  - update IStack, remove IImmutableStack

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@5.1.0) (2019-03-10)

#### 🚀 Features

- add additional Fn arities ([33c7dfe](https://github.com/thi-ng/umbrella/commit/33c7dfe))
- add more Fn type aliases, update existing ([3707e61](https://github.com/thi-ng/umbrella/commit/3707e61))

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@5.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts / outputs ([f913d7b](https://github.com/thi-ng/umbrella/commit/f913d7b))
- BREAKING CHANGE: rename mixins to avoid name clashes, update decorators
  - append `Mixin` suffix to all mixins (i.e. `INotify` => `INotifyMixin`)
  - update re-exports of mixins & decorators (no more nested child namespace)

#### 🩹 Bug fixes

- update assert(), re-export mixin() ([9f91cfa](https://github.com/thi-ng/umbrella/commit/9f91cfa))

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@4.2.0) (2018-09-22)

#### 🚀 Features

- add `IToHiccup` interface ([e390a54](https://github.com/thi-ng/umbrella/commit/e390a54))

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@4.1.0) (2018-08-24)

#### 🚀 Features

- add new/move type aliases into api.ts ([cf30ba2](https://github.com/thi-ng/umbrella/commit/cf30ba2))
  - Fn, FnAny, Pair, SEMAPHORE
- add NumericArray and TypedArray types ([519394b](https://github.com/thi-ng/umbrella/commit/519394b))

### [4.0.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@4.0.6) (2018-08-01)

#### ♻️ Refactoring

- TS3.0 PropertyKey handling ([2047807](https://github.com/thi-ng/umbrella/commit/2047807))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@4.0.0) (2018-05-12)

#### 🛑 Breaking changes

- update interfaces, add docs ([9b38860](https://github.com/thi-ng/umbrella/commit/9b38860))
- BREAKING CHANGE: IBind, IEnable now include generics,
  update IIndexed, IMeta, ISet, IStack
  - add IInto
  - add IImmutableSet
  - add IImmutableStack
  - minor update IEnabled mixin

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@3.0.0) (2018-05-10)

#### 🛑 Breaking changes

- remove obsolete files from package ([f051ca3](https://github.com/thi-ng/umbrella/commit/f051ca3))
- BREAKING CHANGE: [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) now only contains type declarations,
  decorators and mixins. All other features have been moved
  to new dedicated packages:
  - [@thi.ng/bench](https://github.com/thi-ng/umbrella/tree/main/packages/bench)
  - [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/main/packages/compare)
  - [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/main/packages/equiv)
  - [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/main/packages/errors)

### [2.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@2.3.1) (2018-04-29)

#### ⏱ Performance improvements

- major speedup equivObject(), update equivSet() ([7fdf172](https://github.com/thi-ng/umbrella/commit/7fdf172))
  - equivSet() now only checks keys
  - add equivMap() to check full entries/pairs

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@2.3.0) (2018-04-26)

#### 🚀 Features

- support more types in equiv(), add tests ([2ac8bff](https://github.com/thi-ng/umbrella/commit/2ac8bff))
  - add equivSetLike() for ES6 Set/Map
  - add checks for Date, RegExp & NaN

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@2.2.0) (2018-04-08)

#### 🚀 Features

- add bench() & timed() utils ([d310345](https://github.com/thi-ng/umbrella/commit/d310345))

### [2.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@2.1.1) (2018-03-28)

#### 🩹 Bug fixes

- illegalState() creates IllegalStateError ([2b7e99b](https://github.com/thi-ng/umbrella/commit/2b7e99b))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@2.1.0) (2018-03-21)

#### 🚀 Features

- add error types & ctor fns ([4d3785f](https://github.com/thi-ng/umbrella/commit/4d3785f))

#### ♻️ Refactoring

- update mixins, IEnable / INotify return types ([fbb19ac](https://github.com/thi-ng/umbrella/commit/fbb19ac))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@2.0.1) (2018-02-02)

#### 🩹 Bug fixes

- update compare() & equiv() ([110a9de](https://github.com/thi-ng/umbrella/commit/110a9de))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@2.0.0) (2018-02-01)

#### 🛑 Breaking changes

- update equiv() null handling, add tests ([878520e](https://github.com/thi-ng/umbrella/commit/878520e))
- BREAKING CHANGE: equiv now treats null & undefined as equal

#### 🩹 Bug fixes

- fix equiv string handling, update tests ([1354e29](https://github.com/thi-ng/umbrella/commit/1354e29))

## [1.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@1.5.0) (2018-01-31)

#### 🚀 Features

- add Predicate2 & StatefulPredicate2 types ([fbf8453](https://github.com/thi-ng/umbrella/commit/fbf8453))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@1.4.0) (2018-01-29)

#### 🚀 Features

- update IWatch & mixin, boolean returns ([bddd5ce](https://github.com/thi-ng/umbrella/commit/bddd5ce))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@1.3.0) (2018-01-28)

#### 🚀 Features

- add StatefulPredicate ([c74353b](https://github.com/thi-ng/umbrella/commit/c74353b))

### [1.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@1.2.1) (2018-01-24)

#### 🚀 Features

- initial re-import as monorepo, update readme files, cleanup imports ([04ff6e9](https://github.com/thi-ng/umbrella/commit/04ff6e9))
