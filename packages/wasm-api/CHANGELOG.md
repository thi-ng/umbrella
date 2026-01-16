# Change Log

- **Last updated**: 2026-01-16T11:40:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.4.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@2.4.12) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

### [2.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@2.4.1) (2025-09-02)

#### ♻️ Refactoring

- update zig `_wasm_allocate()`  & `ManagedIndex` ([3e8870c](https://github.com/thi-ng/umbrella/commit/3e8870c))
  - store allocator in `ManagedIndex` due to Zig ArrayList defaulting to unmanaged in 0.15.1
    and managed versions will be removed in future
  - fix alignment param in `_wasm_allocate()`

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@2.4.0) (2025-09-01)

#### 🚀 Features

- update Zig build file for Zig v0.15.1 ([ddb2402](https://github.com/thi-ng/umbrella/commit/ddb2402))
  - set Zig workspace version to 0.15.1

### [2.3.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@2.3.12) (2025-03-11)

#### ♻️ Refactoring

- minor update core lib (Zig v0.14.0) ([ebe1533](https://github.com/thi-ng/umbrella/commit/ebe1533))

### [2.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@2.3.1) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@2.3.0) (2025-01-10)

#### 🚀 Features

- add WasmTypeKeys helper type ([7e293ce](https://github.com/thi-ng/umbrella/commit/7e293ce))

### [2.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@2.2.1) (2024-11-10)

#### 🩹 Bug fixes

- fix defType() property handling ([37bebee](https://github.com/thi-ng/umbrella/commit/37bebee))
  - inject `__base` and `__bytes` getters using `Object.defineProperties()`

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@2.2.0) (2024-11-10)

#### 🚀 Features

- add defType() construction helper ([947e3fc](https://github.com/thi-ng/umbrella/commit/947e3fc))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@2.1.0) (2024-11-09)

#### 🚀 Features

- add null handling in WasmStringPtr ([e8a094d](https://github.com/thi-ng/umbrella/commit/e8a094d))
  - update logic to interpret as null pointer if addr=0
  - update doc strings
- add null pointer checks, update tests ([247cbbf](https://github.com/thi-ng/umbrella/commit/247cbbf))
  - update Pointer/Pointer64 deref logic to return undefined for null pointers
  - add `.isNull` getter for all pointer types (incl. `WasmStringPtr`)
  - update tests

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@2.0.0) (2024-08-18)

#### 🛑 Breaking changes

- update WASM module dependency handling ([31f0358](https://github.com/thi-ng/umbrella/commit/31f0358))
- BREAKING CHANGE: update WASM module dependency handling
  - add `WasmModuleSpec` interface to declare WASM modules with their deps
  - update `WasmBridge` ctor to accept array of module specs
  - add buildModuleGraph() to process dependencies & init modules from specs
  - add/update docstrings
  - update tests

#### 🚀 Features

- add ObjectIndex.addUnique() ([e79275d](https://github.com/thi-ng/umbrella/commit/e79275d))
- add MemoryView types ([b621adc](https://github.com/thi-ng/umbrella/commit/b621adc))
- add internal memory view accessors ([6830337](https://github.com/thi-ng/umbrella/commit/6830337))
  - these accessors are shared by various types generated via [@thi.ng/wasm-api-bindgen](https://github.com/thi-ng/umbrella/tree/main/packages/wasm-api-bindgen)
    and help to drastically cut down filesize of generated code
  - update pkg exports
- update ObjectIndex ctor, make opts fully optional ([564e0f3](https://github.com/thi-ng/umbrella/commit/564e0f3))

#### ♻️ Refactoring

- update internal array mem accessors ([b442d92](https://github.com/thi-ng/umbrella/commit/b442d92))

## [1.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.6.0) (2024-06-21)

#### 🚀 Features

- update build script & readme for Zig v0.13.0 ([cd401b2](https://github.com/thi-ng/umbrella/commit/cd401b2))

## [1.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.5.0) (2024-04-22)

#### 🚀 Features

- update build script for zig v0.12.0 (incomplete) ([99a1916](https://github.com/thi-ng/umbrella/commit/99a1916))
  - store existing script as build-v0.11.zig
- update build script for zig v0.12.0 (incomplete) ([d4fcc54](https://github.com/thi-ng/umbrella/commit/d4fcc54))
  - store existing script as build-v0.11.zig

#### 🩹 Bug fixes

- re-add -rdynamic flag in build.zig ([f509d1e](https://github.com/thi-ng/umbrella/commit/f509d1e))

#### ♻️ Refactoring

- minor zig v0.12.0 updates ([4a0751c](https://github.com/thi-ng/umbrella/commit/4a0751c))
- minor zig v0.12.0 updates ([e3e074d](https://github.com/thi-ng/umbrella/commit/e3e074d))

### [1.4.69](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.4.69) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([ab27740](https://github.com/thi-ng/umbrella/commit/ab27740))

### [1.4.54](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.4.54) (2024-02-22)

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://github.com/thi-ng/umbrella/commit/c71a526))

### [1.4.32](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.4.32) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages T-Z) ([020ef6c](https://github.com/thi-ng/umbrella/commit/020ef6c))

### [1.4.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.4.13) (2023-08-04)

#### ♻️ Refactoring

- update INotify impl ([07e884f](https://github.com/thi-ng/umbrella/commit/07e884f))
- update INotify impls ([cbdc527](https://github.com/thi-ng/umbrella/commit/cbdc527))

### [1.4.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.4.12) (2023-07-14)

#### ♻️ Refactoring

- update zig build script ([ac0f375](https://github.com/thi-ng/umbrella/commit/ac0f375))
  - use non-deprecated `std.Build.Step.Compile` type

### [1.4.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.4.10) (2023-06-29)

#### 🩹 Bug fixes

- temporarily disable `WasmLibOpts.out` due to Zig build updates ([cf63c04](https://github.com/thi-ng/umbrella/commit/cf63c04))

#### ♻️ Refactoring

- Zig v0.11-dev syntax updates ([83a1c7b](https://github.com/thi-ng/umbrella/commit/83a1c7b))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.4.0) (2023-02-17)

#### 🚀 Features

- add build script for Zig v0.11.0-dev ([4c8abcb](https://github.com/thi-ng/umbrella/commit/4c8abcb))

#### ♻️ Refactoring

- update build-v0.11.zig build script ([fe7c24c](https://github.com/thi-ng/umbrella/commit/fe7c24c))
  - single source of truth for core module names
  - rename .mode => .optimize (as per new zig nomenclature)
  - add autodoc generation option

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api@1.3.0) (2023-02-05)

#### 🚀 Features

- add ManagedIndex.initCapacity() ([788dfa2](https://github.com/thi-ng/umbrella/commit/788dfa2))
- add WasmType.instanceArray(), add docs ([2adf65f](https://github.com/thi-ng/umbrella/commit/2adf65f))
