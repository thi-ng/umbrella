# Change Log

- **Last updated**: 2025-10-24T14:08:38Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@1.1.0) (2025-05-18)

#### 🚀 Features

- add trigonometry builtins ([8c83592](https://github.com/thi-ng/umbrella/commit/8c83592))

### [1.0.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@1.0.13) (2025-03-10)

#### 🩹 Bug fixes

- update return types (TS5.8.2) ([541db4c](https://github.com/thi-ng/umbrella/commit/541db4c))

### [1.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@1.0.2) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [0.15.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.15.16) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [0.15.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.15.12) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([e5f1e8b](https://github.com/thi-ng/umbrella/commit/e5f1e8b))

### [0.15.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.15.5) (2024-03-18)

#### ♻️ Refactoring

- minor updates ([5c329e1](https://github.com/thi-ng/umbrella/commit/5c329e1))

## [0.15.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.15.0) (2024-03-07)

#### 🚀 Features

- add isLitNumOrVecConst() node check ([72399b0](https://github.com/thi-ng/umbrella/commit/72399b0))

#### 🩹 Bug fixes

- fix allChildren() handling of void returns ([4aff1ec](https://github.com/thi-ng/umbrella/commit/4aff1ec))

## [0.14.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.14.0) (2024-03-06)

#### 🚀 Features

- add self-assign math ops syntax sugar ([4575082](https://github.com/thi-ng/umbrella/commit/4575082))
  - add addSelf(), subSelf(), mulSelf(), divSelf() fns
  - add minSelf(), maxSelf()
    - alias for `assign(x, op(x, y))`
  - add clampSelf()
    - alias for `assign(x, clamp(x, y, z))`
  - add normalizeSelf()
    - alias for `assign(x, normalize(x))`

### [0.13.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.13.9) (2024-02-16)

#### ♻️ Refactoring

- update LOGGER handling ([a388a75](https://github.com/thi-ng/umbrella/commit/a388a75))

### [0.13.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.13.7) (2024-02-06)

#### ♻️ Refactoring

- use shader type consts ([ace18a4](https://github.com/thi-ng/umbrella/commit/ace18a4))

## [0.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.13.0) (2023-12-31)

#### 🚀 Features

- add uvec support for basic math ops ([#435](https://github.com/thi-ng/umbrella/issues/435)) ([c21e975](https://github.com/thi-ng/umbrella/commit/c21e975))
  - update function signatures for basic math ops: add, sub, mul, div
- fix [#435](https://github.com/thi-ng/umbrella/issues/435), add lshift/rshift ops ([a986766](https://github.com/thi-ng/umbrella/commit/a986766))

#### 🩹 Bug fixes

- fix [#436](https://github.com/thi-ng/umbrella/issues/436), update scope traversal ([4c082d7](https://github.com/thi-ng/umbrella/commit/4c082d7))
  - update scopedChildren() & allChildren()

### [0.12.79](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.12.79) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [0.12.75](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.12.75) (2023-10-25)

#### 🩹 Bug fixes

- fix if() handling in scopedChildren() ([64d23c0](https://github.com/thi-ng/umbrella/commit/64d23c0))
  - include test in returned children otherwise any referenced functions
    there will not be captured in dependencies

### [0.12.52](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.12.52) (2023-05-11)

#### ♻️ Refactoring

- intern common type constants ([b22891c](https://github.com/thi-ng/umbrella/commit/b22891c))

### [0.12.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast@0.12.6) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))
