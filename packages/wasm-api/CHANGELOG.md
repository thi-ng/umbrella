# Change Log

- **Last updated**: 2022-08-15T23:41:37Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
