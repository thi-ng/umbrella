# Change Log

- **Last updated**: 2022-10-04T10:33:14Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.13.0) (2022-10-04)

#### 🚀 Features

- update C11 code gen ([ff8037f](https://github.com/thi-ng/umbrella/commit/ff8037f))
  - add `#ifdef __cplusplus` guards to pre/post
- add WasmStringSlice.setSlice() ([50cc798](https://github.com/thi-ng/umbrella/commit/50cc798))

#### ⏱ Performance improvements

- lazy eval log message args ([3e13397](https://github.com/thi-ng/umbrella/commit/3e13397))

## [0.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.12.0) (2022-10-03)

#### 🚀 Features

- update CLI ([98d2414](https://github.com/thi-ng/umbrella/commit/98d2414))
  - add optional type analytics JSON output
  - add support for including user code via `@`-file references
  - update config `@`-file refs to resolve relative to config file
- add support for sentinels & user type body injection ([d240046](https://github.com/thi-ng/umbrella/commit/d240046))
  - update sizeOf() to include sentinels
  - add TopLevelType.body for extra user code
  - update Zig codegen to:
    - support array/slice sentinels
    - add optional user code injection
    - add `std` import header
- add ReadonlyWasmString, update impls ([240a148](https://github.com/thi-ng/umbrella/commit/240a148))
- add default value support for Zig codegen ([3c37ae7](https://github.com/thi-ng/umbrella/commit/3c37ae7))
- add doc string word wrapping ([c0b8e15](https://github.com/thi-ng/umbrella/commit/c0b8e15))
  - update prefixLines(), add target line width arg
  - update ICodeGen & CodeGenOpts
  - update all codegens
  - update deps

#### 🩹 Bug fixes

- update zig panic handler sig for latest zig master version ([cb51bf6](https://github.com/thi-ng/umbrella/commit/cb51bf6))
  - see https://github.com/ziglang/zig/commit/694fab484805088030fa36efe3e6b6e7ee385852
- minor fix word wrap line width ([053ba0f](https://github.com/thi-ng/umbrella/commit/053ba0f))

## [0.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.11.0) (2022-09-21)

#### 🚀 Features

- refactor CodeGenOpts, update CLI config handling ([fa2e30f](https://github.com/thi-ng/umbrella/commit/fa2e30f))
  - extract CodeGenOptsBase interface for common pre/post config
  - update CLI config loading to support loading pre/post contents
    from separate files (if value given as `@path/to-file.ext`)
- update/fix codegens & config ([87def23](https://github.com/thi-ng/umbrella/commit/87def23))
  - add global `CodeGenOpts.uppercaseEnums` option (migrate from TSOpts)
  - set `i32` as enum default tag (for C compatibility)
  - update C11 codegen, add `typePrefix` option
  - fix C11 enum codegen (use `typedef enum`)
  - add internal enumName() helper
  - minor updates Zig codegen
- update codegen CLI ([435ad2b](https://github.com/thi-ng/umbrella/commit/435ad2b))
  - add C11 support
  - add support for padding fields (in `validateTypeRefs()`)
  - add CLI arg for forcing string type impl
  - update deps
- add C11 support, update codegens & config ([590311e](https://github.com/thi-ng/umbrella/commit/590311e))
  - add preliminary C11 codegen
  - add optional `tag` field for structs (extern/packed)
  - add support for auto-labeled padding fields
    - i.e. defined via unnamed fields with `pad` value
  - move debug config option to global `CodeGenOpts`
- update TS codegen (array pointers) ([30360f2](https://github.com/thi-ng/umbrella/commit/30360f2))
- update CodeGenOpts ([b9fd7ff](https://github.com/thi-ng/umbrella/commit/b9fd7ff))
- major update codegens, string & pointer handling ([4f02295](https://github.com/thi-ng/umbrella/commit/4f02295))
  - update/fix string wrappers (`WasmStringSlice/Ptr`)
  - add generic `Pointer` wrapper
  - add `const` field type support
  - add applyIndents() formatter fn, simplify all codegens
  - major update TS & Zig codegens
- WasmString codegen integration ([97fc318](https://github.com/thi-ng/umbrella/commit/97fc318))
  - update TS codegen to wrap strings using new `WasmString` or `WasmStringPtr`
  - update global codegen options handling, now passed to each codegen
  - update TSOpts & ZigOpts to include custom pre/post
- add WasmString wrappers ([18d8fcb](https://github.com/thi-ng/umbrella/commit/18d8fcb))
  - still unused (to be added to TS codegen)
- update core API & bindings ([b185ea5](https://github.com/thi-ng/umbrella/commit/b185ea5))
  - add _panic(), timer(), epoch() core API fns
  - update printI/U64() fns to accept bigint
  - update C & Zig bindings
  - update tests
  - add clang-format

## [0.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.10.0) (2022-08-24)

#### 🚀 Features

- add events, update allocator handling ([89416b1](https://github.com/thi-ng/umbrella/commit/89416b1))
  - add INotify impl for WasmBridge
  - emit event when WASM memory has changed (e.g. to recreate user views)
  - reverse logic so that NO allocator is used by default and instead must
    be explicitly enabled (rather than disabled)
  - update Zig & C bindings
  - add/update docstrings

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.9.0) (2022-08-23)

#### 🚀 Features

- add debug() core API function ([ca01978](https://github.com/thi-ng/umbrella/commit/ca01978))

#### 🩹 Bug fixes

- update setString() return value ([116dd0b](https://github.com/thi-ng/umbrella/commit/116dd0b))
  - always only return num bytes written w/o sentinel

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.8.0) (2022-08-16)

#### 🚀 Features

- add preliminary string handling support ([3da4efe](https://github.com/thi-ng/umbrella/commit/3da4efe))
  - update/rename IWasmMemoryAccess (add string getter/setter)
  - update StructField.type (add `string`)
  - add CodeGenOpts.stringType option
  - update codegen fns
  - update TS & Zig codegen impls

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.7.0) (2022-08-15)

#### 🚀 Features

- add CLI wrapper for codegens ([683a560](https://github.com/thi-ng/umbrella/commit/683a560))
- update TSOpts & TS codegen ([4f6bbbf](https://github.com/thi-ng/umbrella/commit/4f6bbbf))
  - add `uppercaseEnum` option to force UC enum IDs
- update helper predicates ([65b23d4](https://github.com/thi-ng/umbrella/commit/65b23d4))

#### 🩹 Bug fixes

- allow signed ints for enum tags ([78d0822](https://github.com/thi-ng/umbrella/commit/78d0822))
- correct TS __mapArray codegen ([289b137](https://github.com/thi-ng/umbrella/commit/289b137))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.6.0) (2022-08-15)

#### 🚀 Features

- add C11 header/include file, update WasmBridge ([a67dc00](https://github.com/thi-ng/umbrella/commit/a67dc00))
  - migrate headers/includes to /include
  - rename "core" import section => "wasmapi"
  - rename WasmBridge.core => WasmBridge.api
  - update pkg file
- update codegens, add opts, fix alignments ([5c1fec5](https://github.com/thi-ng/umbrella/commit/5c1fec5))
  - add global CodeGenOpts
  - update generateTypes() to consider new opts
  - add global USIZE type (for pointer sizes & codegens)
  - add options for Zig codegen (extra debug helpers)
  - simplify TS codegen
  - fix sizeOf() for struct fields
  - make prepareType() idempotent
- add bindings code generator framework ([17ee06f](https://github.com/thi-ng/umbrella/commit/17ee06f))
  - add/update deps
  - add preliminary codegens for Zig & TS
  - add supporting types & utils
  - add generateTypes() codegen facade fn
- update allocate/free() fns, update Zig core API ([8a55989](https://github.com/thi-ng/umbrella/commit/8a55989))
  - add _wasm_free() Zig impl
  - add printFmt() Zig fn
  - update WasmBridge.allocate() (add clear option)
  - update WasmBridge.free()
  - ensure memory in WasmBridge.getString()
  - add/update docstrings

#### ♻️ Refactoring

- extract WasmMemViews interface, update test WASM ([4c73e65](https://github.com/thi-ng/umbrella/commit/4c73e65))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.5.0) (2022-08-08)

#### 🚀 Features

- add memory allocation ([980c1f2](https://github.com/thi-ng/umbrella/commit/980c1f2))
  - add WasmBridge.allocate()/free()
  - add WasmBridge.growMemory()
  - extract WasmBridge.ensureMemory()
  - update WasmExports
  - update Zig bindings (configurable allocator, GPA as default)

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.4.0) (2022-08-07)

#### 🚀 Features

- use named import objects ([4965f20](https://github.com/thi-ng/umbrella/commit/4965f20))
  - switch to name import objects to avoid merging into flat namespace
  - update externs in core.zig
  - update docstrings

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.3.0) (2022-08-04)

#### 🚀 Features

- add i64/u64 support/accessors ([768c8bd](https://github.com/thi-ng/umbrella/commit/768c8bd))
- add WasmBridge.instantiate, add/update accessors ([0698bae](https://github.com/thi-ng/umbrella/commit/0698bae))
  - add WasmBridge.instantiate() boilerplate
  - add setters for typed scalars & arrays
  - rename derefXX() => getXX() getters
  - update tests
- major update WasmBridge, add types ([47aa222](https://github.com/thi-ng/umbrella/commit/47aa222))
  - add WasmExports base interface
  - add generics for WasmBridge & IWasmAPI
  - update WasmBridge.init() arg (full WASM exports, not just mem)
  - add WasmBridge.exports field to store WASM module exports
  - add naming conflict check in WasmBridge.getImports()

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.2.0) (2022-08-01)

#### 🚀 Features

- major update ObjectIndex ([4547f1f](https://github.com/thi-ng/umbrella/commit/4547f1f))
  - add ObjectIndexOpts ctor options
  - add IDGen for internal ID generation/recycling
  - add iterators
  - rename existing methods
- fix zig slice pointer handling, use named child modules ([bd7905a](https://github.com/thi-ng/umbrella/commit/bd7905a))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@0.1.0) (2022-08-01)

#### 🚀 Features

- import as new pkg ([eda4840](https://github.com/thi-ng/umbrella/commit/eda4840))
