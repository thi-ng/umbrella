# Change Log

- **Last updated**: 2026-04-18T11:32:54Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.2.21](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/sorted-map@1.2.21/packages/sorted-map) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

## [1.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/sorted-map@1.2.0/packages/sorted-map) (2025-07-10)

#### 🚀 Features

- add `Symbol.dispose` support ([7583094](https://codeberg.org/thi.ng/umbrella/commit/7583094))
  - update all `SortedMap` & `SortedSet` impls

#### ♻️ Refactoring

- update all Map/Set private state and `toString()` impls ([#505](https://codeberg.org/thi.ng/umbrella/issues/505)) ([ce2e43a](https://codeberg.org/thi.ng/umbrella/commit/ce2e43a))
  - use private class properties instead of WeakMap to strore internal state
  - replace `__inspectable` with `__tostringMixin`

### [1.1.29](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/sorted-map@1.1.29/packages/sorted-map) (2025-03-10)

#### 🩹 Bug fixes

- update return types (TS5.8.2) ([541db4c](https://codeberg.org/thi.ng/umbrella/commit/541db4c))

### [1.1.19](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/sorted-map@1.1.19/packages/sorted-map) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://codeberg.org/thi.ng/umbrella/commit/c5a0a13))

## [1.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/sorted-map@1.1.0/packages/sorted-map) (2024-07-22)

#### 🚀 Features

- import as new pkg ([#486](https://codeberg.org/thi.ng/umbrella/issues/486)) ([02602e8](https://codeberg.org/thi.ng/umbrella/commit/02602e8))
