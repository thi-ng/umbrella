# Change Log

- **Last updated**: 2025-11-25T12:20:38Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@3.0.5) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))

### [3.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@3.0.2) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([6a151a5](https://github.com/thi-ng/umbrella/commit/6a151a5))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@3.0.0) (2024-04-08)

#### 🛑 Breaking changes

- remove/migrate delay() to different pkg ([745abbb](https://github.com/thi-ng/umbrella/commit/745abbb))
- BREAKING CHANGE: migrate delay() & Delay class to [@thi.ng/memoize](https://github.com/thi-ng/umbrella/tree/main/packages/memoize)
  - see [d8f4733c05e724c38195f209337d0a015e049ac4](https://github.com/thi-ng/umbrella/commit/d8f4733c05e724c38195f209337d0a015e049ac4) for details

#### 🚀 Features

- add async composition helpers ([168ea42](https://github.com/thi-ng/umbrella/commit/168ea42))
  - add async functions:
    - compAsync()
    - juxtAsync()
    - threadFirstAsync()/threadLastAsync()
    - trampolineAsync()

### [2.1.35](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@2.1.35) (2023-08-04)

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://github.com/thi-ng/umbrella/commit/b6db053))
