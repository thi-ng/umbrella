# Change Log

- **Last updated**: 2024-01-29T20:39:37Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
