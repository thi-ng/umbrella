# Change Log

- **Last updated**: 2025-10-24T17:47:44Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse-set@1.2.0) (2025-07-10)

#### 🚀 Features

- add `Symbol.dispose` support ([f88ac0d](https://github.com/thi-ng/umbrella/commit/f88ac0d))

#### ♻️ Refactoring

- update all Map/Set private state and `toString()` impls ([#505](https://github.com/thi-ng/umbrella/issues/505)) ([9ab7d9d](https://github.com/thi-ng/umbrella/commit/9ab7d9d))
  - use private class properties instead of WeakMap to strore internal state
  - replace `__inspectable` with `__tostringMixin`

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse-set@1.1.0) (2024-07-22)

#### 🚀 Features

- import as new pkg ([#486](https://github.com/thi-ng/umbrella/issues/486)) ([49f7e2d](https://github.com/thi-ng/umbrella/commit/49f7e2d))
  - extract sparseset-related fns/classes from [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/main/packages/associative)
