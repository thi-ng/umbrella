# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.1.37](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@1.1.37/packages/shader-ast) (2026-02-07)

#### ♻️ Refactoring

- replace deprecated `unsupported()` call sites in all pkgs ([3abbddf](https://codeberg.org/thi.ng/umbrella/commit/3abbddf))

## [1.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@1.1.0/packages/shader-ast) (2025-05-18)

#### 🚀 Features

- add trigonometry builtins ([8c83592](https://codeberg.org/thi.ng/umbrella/commit/8c83592))

### [1.0.13](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@1.0.13/packages/shader-ast) (2025-03-10)

#### 🩹 Bug fixes

- update return types (TS5.8.2) ([541db4c](https://codeberg.org/thi.ng/umbrella/commit/541db4c))

### [1.0.2](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@1.0.2/packages/shader-ast) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://codeberg.org/thi.ng/umbrella/commit/c5a0a13))

### [0.15.16](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@0.15.16/packages/shader-ast) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://codeberg.org/thi.ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [0.15.12](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@0.15.12/packages/shader-ast) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([e5f1e8b](https://codeberg.org/thi.ng/umbrella/commit/e5f1e8b))

### [0.15.5](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@0.15.5/packages/shader-ast) (2024-03-18)

#### ♻️ Refactoring

- minor updates ([5c329e1](https://codeberg.org/thi.ng/umbrella/commit/5c329e1))

## [0.15.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@0.15.0/packages/shader-ast) (2024-03-07)

#### 🚀 Features

- add isLitNumOrVecConst() node check ([72399b0](https://codeberg.org/thi.ng/umbrella/commit/72399b0))

#### 🩹 Bug fixes

- fix allChildren() handling of void returns ([4aff1ec](https://codeberg.org/thi.ng/umbrella/commit/4aff1ec))

## [0.14.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@0.14.0/packages/shader-ast) (2024-03-06)

#### 🚀 Features

- add self-assign math ops syntax sugar ([4575082](https://codeberg.org/thi.ng/umbrella/commit/4575082))
  - add addSelf(), subSelf(), mulSelf(), divSelf() fns
  - add minSelf(), maxSelf()
    - alias for `assign(x, op(x, y))`
  - add clampSelf()
    - alias for `assign(x, clamp(x, y, z))`
  - add normalizeSelf()
    - alias for `assign(x, normalize(x))`

### [0.13.9](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@0.13.9/packages/shader-ast) (2024-02-16)

#### ♻️ Refactoring

- update LOGGER handling ([a388a75](https://codeberg.org/thi.ng/umbrella/commit/a388a75))

### [0.13.7](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@0.13.7/packages/shader-ast) (2024-02-06)

#### ♻️ Refactoring

- use shader type consts ([ace18a4](https://codeberg.org/thi.ng/umbrella/commit/ace18a4))

## [0.13.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@0.13.0/packages/shader-ast) (2023-12-31)

#### 🚀 Features

- add uvec support for basic math ops ([#435](https://codeberg.org/thi.ng/umbrella/issues/435)) ([c21e975](https://codeberg.org/thi.ng/umbrella/commit/c21e975))
  - update function signatures for basic math ops: add, sub, mul, div
- fix [#435](https://codeberg.org/thi.ng/umbrella/issues/435), add lshift/rshift ops ([a986766](https://codeberg.org/thi.ng/umbrella/commit/a986766))

#### 🩹 Bug fixes

- fix [#436](https://codeberg.org/thi.ng/umbrella/issues/436), update scope traversal ([4c082d7](https://codeberg.org/thi.ng/umbrella/commit/4c082d7))
  - update scopedChildren() & allChildren()

### [0.12.79](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@0.12.79/packages/shader-ast) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

### [0.12.75](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@0.12.75/packages/shader-ast) (2023-10-25)

#### 🩹 Bug fixes

- fix if() handling in scopedChildren() ([64d23c0](https://codeberg.org/thi.ng/umbrella/commit/64d23c0))
  - include test in returned children otherwise any referenced functions
    there will not be captured in dependencies

### [0.12.52](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@0.12.52/packages/shader-ast) (2023-05-11)

#### ♻️ Refactoring

- intern common type constants ([b22891c](https://codeberg.org/thi.ng/umbrella/commit/b22891c))

### [0.12.47](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/shader-ast@0.12.47/packages/shader-ast) (2023-03-27)

#### 🧪 Tests

- update all tests (mainly imports) ([63a85f9](https://codeberg.org/thi.ng/umbrella/commit/63a85f9))
