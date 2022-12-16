# Change Log

- **Last updated**: 2022-12-16T12:52:25Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
