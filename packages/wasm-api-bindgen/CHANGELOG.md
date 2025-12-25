# Change Log

- **Last updated**: 2025-12-25T15:58:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.2.57](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@1.2.57) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

### [1.2.45](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@1.2.45) (2025-09-26)

#### ♻️ Refactoring

- update CLI arg specs ([7c43dac](https://github.com/thi-ng/umbrella/commit/7c43dac))

### [1.2.42](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@1.2.42) (2025-09-25)

#### ♻️ Refactoring

- simplify CLI impl via cliApp() wrapper ([f0ca0a9](https://github.com/thi-ng/umbrella/commit/f0ca0a9))

### [1.2.40](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@1.2.40) (2025-09-02)

#### 🩹 Bug fixes

- update zig function pointer callconv ([5cfd515](https://github.com/thi-ng/umbrella/commit/5cfd515))
  - use `callconv(.c)` (older format now deprecated in 0.15.1)

### [1.2.36](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@1.2.36) (2025-08-06)

#### ♻️ Refactoring

- update CLI internals ([51a7659](https://github.com/thi-ng/umbrella/commit/51a7659))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@1.2.0) (2025-02-11)

#### 🚀 Features

- update CLI wrapper ([cbbb33f](https://github.com/thi-ng/umbrella/commit/cbbb33f))
  - check if `bun` is available, otherwise fallback to `node`

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@1.1.0) (2025-01-10)

#### 🚀 Features

- update generated TS default imports ([b9ffe90](https://github.com/thi-ng/umbrella/commit/b9ffe90))
  - update test snapshots

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.8.0) (2024-11-10)

#### 🚀 Features

- update TypeScript codegen to use defType() ([1de3a70](https://github.com/thi-ng/umbrella/commit/1de3a70))
  - re-use `defType()` for generated structs/unions (see [947e3fc1cc](https://github.com/thi-ng/umbrella/commit/947e3fc1cc)),
    resulting in much smaller outputs
  - update test snapshots

#### ♻️ Refactoring

- update TS code gen ([42c6fa3](https://github.com/thi-ng/umbrella/commit/42c6fa3))
  - coalesce pointer & string var declarations
  - update test snapshots

### [0.7.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.7.9) (2024-11-09)

#### ♻️ Refactoring

- update TypeScript codegen ([49d1bc5](https://github.com/thi-ng/umbrella/commit/49d1bc5))
  - reduce filesize of generated code by injecting wrapper for string type ctor
    if type collection uses strings
  - update test snapshots

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.7.0) (2024-08-21)

#### 🚀 Features

- add support for external types ([af1a44d](https://github.com/thi-ng/umbrella/commit/af1a44d))
  - update ICodeGen interface & all impls (C, TS, Zig)
- update JSON schema ([e7bd5a9](https://github.com/thi-ng/umbrella/commit/e7bd5a9))

#### 🩹 Bug fixes

- update type prefix handling in C11 codegen ([5b6fcc2](https://github.com/thi-ng/umbrella/commit/5b6fcc2))
  - don't add prefix for external types
  - add naming convention helper fns

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.6.0) (2024-08-18)

#### 🚀 Features

- update TS codegen to produce more compact results ([ee5e283](https://github.com/thi-ng/umbrella/commit/ee5e283))
  - update array & slice handling to re-use new helpers in [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/main/packages/wasm-api)
  - update test snapshots
- add getter/setter field flags ([6e87558](https://github.com/thi-ng/umbrella/commit/6e87558))
  - update JSON schema
  - update TS codegen to handle optional getters/setters
  - add doc strings

#### 🩹 Bug fixes

- fix TS codegen address divisor for prim slices ([dfd66ba](https://github.com/thi-ng/umbrella/commit/dfd66ba))
  - update __primSlice()
    - address needs to be divided based on type size
  - update test snapshots

### [0.5.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.5.5) (2024-06-21)

#### ♻️ Refactoring

- dedupe struct/union gens for C/Zig ([be628f7](https://github.com/thi-ng/umbrella/commit/be628f7))
- update/dedupe user body injection ([40cbf13](https://github.com/thi-ng/umbrella/commit/40cbf13))
  - update TS & Zig code gens
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.5.0) (2024-04-22)

#### 🚀 Features

- update Zig funcptr codegen to include `callconv(.C)` ([ac3da9e](https://github.com/thi-ng/umbrella/commit/ac3da9e))
  - `callconv` explicitly required for function pointers in `extern struct`s in Zig v0.12
  - update docs
  - update test snapshots

### [0.4.69](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.4.69) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([1c4a3c3](https://github.com/thi-ng/umbrella/commit/1c4a3c3))

### [0.4.52](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.4.52) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

### [0.4.51](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.4.51) (2024-02-22)

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://github.com/thi-ng/umbrella/commit/c71a526))

### [0.4.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.4.28) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages T-Z) ([020ef6c](https://github.com/thi-ng/umbrella/commit/020ef6c))

### [0.4.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.4.5) (2023-06-29)

#### ♻️ Refactoring

- Zig v0.11-dev syntax updates ([dea00ff](https://github.com/thi-ng/umbrella/commit/dea00ff))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.4.0) (2023-03-27)

#### 🚀 Features

- update codegen for TS 5.0 ([93bf2e2](https://github.com/thi-ng/umbrella/commit/93bf2e2))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.3.0) (2023-02-05)

#### 🚀 Features

- add WasmType.instanceArray() impl ([f69d46e](https://github.com/thi-ng/umbrella/commit/f69d46e))

#### 🩹 Bug fixes

- add missing Field.skip check ([ac43440](https://github.com/thi-ng/umbrella/commit/ac43440))
  - update generateField() in TypeScript gen

### [0.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.2.2) (2022-11-30)

#### ♻️ Refactoring

- update Zig codegen default imports ([#368](https://github.com/thi-ng/umbrella/issues/368)) ([574af0f](https://github.com/thi-ng/umbrella/commit/574af0f))
  - adopt unscoped JS pkg name also as Zig import
  - update fixtures
  - update readme

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.2.0) (2022-11-24)

#### 🚀 Features

- update TS multi-ptr handling & doc gen ([243981f](https://github.com/thi-ng/umbrella/commit/243981f))
  - provide at least access to ptr target address
  - update doc string generation
- migrate C & Zig type headers ([aa56930](https://github.com/thi-ng/umbrella/commit/aa56930))
  - move includes from [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/main/packages/wasm-api) core pkg
  - update Zig codegen
  - update fixtures
  - update pkg files

#### 🩹 Bug fixes

- fix C sentinel array handling ([1adda1e](https://github.com/thi-ng/umbrella/commit/1adda1e))
  - emit array size without sentinel
  - add extra hidden field to ensure correct offset of next field

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-bindgen@0.1.0) (2022-11-23)

#### 🚀 Features

- import as new pkg ([2c02dc6](https://github.com/thi-ng/umbrella/commit/2c02dc6))
  - extract all codegen related parts from [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/main/packages/wasm-api)

#### ♻️ Refactoring

- migrate JSON schema, update readme & pkg ([a6d9c3a](https://github.com/thi-ng/umbrella/commit/a6d9c3a))
