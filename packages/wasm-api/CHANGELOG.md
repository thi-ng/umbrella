# Change Log

- **Last updated**: 2022-08-07T15:28:01Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
