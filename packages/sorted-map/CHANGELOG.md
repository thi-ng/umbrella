# Change Log

- **Last updated**: 2026-01-16T11:40:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.2.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/sorted-map@1.2.21) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sorted-map@1.2.0) (2025-07-10)

#### 🚀 Features

- add `Symbol.dispose` support ([7583094](https://github.com/thi-ng/umbrella/commit/7583094))
  - update all `SortedMap` & `SortedSet` impls

#### ♻️ Refactoring

- update all Map/Set private state and `toString()` impls ([#505](https://github.com/thi-ng/umbrella/issues/505)) ([ce2e43a](https://github.com/thi-ng/umbrella/commit/ce2e43a))
  - use private class properties instead of WeakMap to strore internal state
  - replace `__inspectable` with `__tostringMixin`

### [1.1.29](https://github.com/thi-ng/umbrella/tree/@thi.ng/sorted-map@1.1.29) (2025-03-10)

#### 🩹 Bug fixes

- update return types (TS5.8.2) ([541db4c](https://github.com/thi-ng/umbrella/commit/541db4c))

### [1.1.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/sorted-map@1.1.19) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sorted-map@1.1.0) (2024-07-22)

#### 🚀 Features

- import as new pkg ([#486](https://github.com/thi-ng/umbrella/issues/486)) ([02602e8](https://github.com/thi-ng/umbrella/commit/02602e8))
