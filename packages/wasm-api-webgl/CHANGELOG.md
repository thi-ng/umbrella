# Change Log

- **Last updated**: 2025-10-24T13:42:49Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-webgl@1.0.0) (2025-09-01)

#### 🛑 Breaking changes

- internal restructure of generated types ([76a1592](https://github.com/thi-ng/umbrella/commit/76a1592))
- BREAKING CHANGE: internal restructure due to breaking Zig 0.15.1 changes
  - `usenamespace` syntax deprecated in Zig 0.15.1, so earlier struct/namespace merging not possible anymore
  - instead, generated types exposed via `types` (e.g. `gl.ShaderSpec` => `gl.types.ShaderSpec`)

### [0.1.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-webgl@0.1.16) (2024-11-10)

#### ♻️ Refactoring

- regenerate typescript bindings ([07e939a](https://github.com/thi-ng/umbrella/commit/07e939a))
- regenerate TS bindings ([c540cb4](https://github.com/thi-ng/umbrella/commit/c540cb4))

### [0.1.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-webgl@0.1.15) (2024-11-09)

#### ♻️ Refactoring

- regenerate typescript sources ([9055e0e](https://github.com/thi-ng/umbrella/commit/9055e0e))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-webgl@0.1.0) (2024-08-18)

#### 🚀 Features

- initial import as new pkg ([3e27f06](https://github.com/thi-ng/umbrella/commit/3e27f06))
- add/update attrib, uniform, texture handlers/utils ([9dcc599](https://github.com/thi-ng/umbrella/commit/9dcc599))
- update WasmWebGL, add WasmWebGLModule spec ([4c43ac5](https://github.com/thi-ng/umbrella/commit/4c43ac5))
  - add docs

#### ♻️ Refactoring

- minor update dependency lookup ([eebc6cd](https://github.com/thi-ng/umbrella/commit/eebc6cd))
