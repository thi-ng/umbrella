# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.0.47](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/compose@3.0.47/packages/compose) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [3.0.5](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/compose@3.0.5/packages/compose) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://codeberg.org/thi.ng/umbrella/commit/8088a56))

### [3.0.2](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/compose@3.0.2/packages/compose) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([6a151a5](https://codeberg.org/thi.ng/umbrella/commit/6a151a5))

# [3.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/compose@3.0.0/packages/compose) (2024-04-08)

#### 🛑 Breaking changes

- remove/migrate delay() to different pkg ([745abbb](https://codeberg.org/thi.ng/umbrella/commit/745abbb))
- BREAKING CHANGE: migrate delay() & Delay class to [@thi.ng/memoize](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/memoize)
  - see [d8f4733c05e724c38195f209337d0a015e049ac4](https://codeberg.org/thi.ng/umbrella/commit/d8f4733c05e724c38195f209337d0a015e049ac4) for details

#### 🚀 Features

- add async composition helpers ([168ea42](https://codeberg.org/thi.ng/umbrella/commit/168ea42))
  - add async functions:
    - compAsync()
    - juxtAsync()
    - threadFirstAsync()/threadLastAsync()
    - trampolineAsync()

### [2.1.46](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/compose@2.1.46/packages/compose) (2023-11-09)

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

### [2.1.35](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/compose@2.1.35/packages/compose) (2023-08-04)

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://codeberg.org/thi.ng/umbrella/commit/b6db053))
