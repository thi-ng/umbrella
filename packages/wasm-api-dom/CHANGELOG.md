# Change Log

- **Last updated**: 2026-02-07T14:15:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.0.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@2.0.13) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@2.0.1) (2025-09-02)

#### 🩹 Bug fixes

- update function pointer types ([3e5ea93](https://github.com/thi-ng/umbrella/commit/3e5ea93))
  - update/fix `callconv(.c)`

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@2.0.0) (2025-09-01)

#### 🛑 Breaking changes

- internal restructure of generated types ([23b5676](https://github.com/thi-ng/umbrella/commit/23b5676))
- BREAKING CHANGE: internal restructure due to breaking Zig 0.15.1 changes
  - `usenamespace` deprecated in Zig 0.15.1, so earlier struct/namespace merging not possible anymore
  - instead, sub-namespaces exposed via: `events`, `fullscreen`, `types`

### [1.0.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@1.0.18) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [1.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@1.0.9) (2024-11-10)

#### ♻️ Refactoring

- regenerate typescript bindings ([07e939a](https://github.com/thi-ng/umbrella/commit/07e939a))
- regenerate TS bindings ([c540cb4](https://github.com/thi-ng/umbrella/commit/c540cb4))

### [1.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@1.0.8) (2024-11-09)

#### ♻️ Refactoring

- regenerate typescript sources ([9055e0e](https://github.com/thi-ng/umbrella/commit/9055e0e))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@1.0.0) (2024-08-18)

#### 🛑 Breaking changes

- update WasmDom, add WasmDomModule spec ([51bedd2](https://github.com/thi-ng/umbrella/commit/51bedd2))
- BREAKING CHANGE: update WasmDom, add WasmDomModule spec

#### ⏱ Performance improvements

- update typedefs, optimize/minimize generated TS code ([08c6e01](https://github.com/thi-ng/umbrella/commit/08c6e01))

#### ♻️ Refactoring

- regenerate types ([ef98da6](https://github.com/thi-ng/umbrella/commit/ef98da6))

### [0.11.89](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.11.89) (2024-04-22)

#### ♻️ Refactoring

- minor zig v0.12.0 updates ([ee4f117](https://github.com/thi-ng/umbrella/commit/ee4f117))
- minor zig v0.12.0 updates ([aaaa4e8](https://github.com/thi-ng/umbrella/commit/aaaa4e8))

### [0.11.88](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.11.88) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([2f77b8b](https://github.com/thi-ng/umbrella/commit/2f77b8b))

### [0.11.49](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.11.49) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [0.11.25](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.11.25) (2023-06-29)

#### ♻️ Refactoring

- Zig v0.11-dev syntax updates ([325bf98](https://github.com/thi-ng/umbrella/commit/325bf98))

### [0.11.20](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.11.20) (2023-03-27)

#### ♻️ Refactoring

- update generated imports ([8982c0b](https://github.com/thi-ng/umbrella/commit/8982c0b))
- update imports (TS5.0) ([5d006cc](https://github.com/thi-ng/umbrella/commit/5d006cc))

### [0.11.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/wasm-api-dom@0.11.12) (2023-02-05)

#### ♻️ Refactoring

- regenerate types ([a28869d](https://github.com/thi-ng/umbrella/commit/a28869d))
