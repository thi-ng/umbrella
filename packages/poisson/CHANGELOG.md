# Change Log

- **Last updated**: 2025-02-13T16:03:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@3.2.0) (2024-08-10)

#### 🚀 Features

- add poisson-image example ([87ec9e7](https://github.com/thi-ng/umbrella/commit/87ec9e7))
  - update readmes
  - cc @nkint :)

### [3.1.89](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@3.1.89) (2024-06-21)

#### ♻️ Refactoring

- update geom deps, update imports ([e22b92b](https://github.com/thi-ng/umbrella/commit/e22b92b))
- minor internal updates ([dcf2af4](https://github.com/thi-ng/umbrella/commit/dcf2af4))
- internal updates stratifiedGrid2/3() ([063a913](https://github.com/thi-ng/umbrella/commit/063a913))
  - switch loop syntax
  - dedupe range checks

### [3.1.68](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@3.1.68) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

### [3.1.43](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@3.1.43) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [3.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@3.1.3) (2023-02-17)

#### 🩹 Bug fixes

- actually use squared distance in stratifiedGrid2/3 ([59f20f5](https://github.com/thi-ng/umbrella/commit/59f20f5))
  - update separation default value

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@3.1.0) (2023-02-05)

#### 🚀 Features

- add scale option for stratifiedGrid2/3 ([0f828a7](https://github.com/thi-ng/umbrella/commit/0f828a7))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/poisson@3.0.0) (2022-12-22)

#### 🛑 Breaking changes

- update/fix/replace stratifiedGrid() ([e84f920](https://github.com/thi-ng/umbrella/commit/e84f920))
- BREAKING CHANGE: replace stratifiedGrid() w/ new fns
  - add stratifiedGrid2/3() fns
  - update StratifiedGridOpts
  - remove old stratifiedGrid() fn
