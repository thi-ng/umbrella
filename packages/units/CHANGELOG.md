# Change Log

- **Last updated**: 2026-02-07T14:15:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/units@1.1.0) (2025-12-25)

#### 🚀 Features

- add `add()`/`sub()` ops for quantities ([0428a32](https://github.com/thi-ng/umbrella/commit/0428a32))
- add Lisp-like formula DSL for more friendly unit calculations ([26c6628](https://github.com/thi-ng/umbrella/commit/26c6628))
  - add `$eval()` function to execute DSL source code
- add `gsm`/`g_m2` presets ([8900f8b](https://github.com/thi-ng/umbrella/commit/8900f8b))

#### ♻️ Refactoring

- add/update pkg exports ([7c7921e](https://github.com/thi-ng/umbrella/commit/7c7921e))

### [1.0.34](https://github.com/thi-ng/umbrella/tree/@thi.ng/units@1.0.34) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/units@0.5.0) (2024-06-21)

#### 🚀 Features

- add DPI constants/presets ([5fe2f78](https://github.com/thi-ng/umbrella/commit/5fe2f78))

#### 🩹 Bug fixes

- update DPI constants ([0b36809](https://github.com/thi-ng/umbrella/commit/0b36809))

### [0.4.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/units@0.4.14) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages T-Z) ([020ef6c](https://github.com/thi-ng/umbrella/commit/020ef6c))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/units@0.4.0) (2023-03-22)

#### 🚀 Features

- add US paper sizes/presets ([bc78668](https://github.com/thi-ng/umbrella/commit/bc78668))
  - rename file din-sizes.ts => paper-sizes.ts
  - update pkg export maps
- add landscape presets (paper sizes) ([a96a714](https://github.com/thi-ng/umbrella/commit/a96a714))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/units@0.3.0) (2023-03-16)

#### 🚀 Features

- add more quantities/constants ([27cd71e](https://github.com/thi-ng/umbrella/commit/27cd71e))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/units@0.2.0) (2023-03-15)

#### 🚀 Features

- add support for quantities ([94ded3e](https://github.com/thi-ng/umbrella/commit/94ded3e))
  - add quantity()
  - update various ops & predicates as polymorphic fns
  - fix asUnit()
  - update docs
- restructure /src, add quantities/constants ([1374162](https://github.com/thi-ng/umbrella/commit/1374162))
  - add /src/constants:
    - velocities
    - DIN paper sizes
  - move all unit presets to /src/units
  - update pkg exports

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/units@0.1.0) (2023-03-14)

#### 🚀 Features

- migrate, refactor & import as new pkg ([73c941a](https://github.com/thi-ng/umbrella/commit/73c941a))
- add coherent(), update unit defs ([d2f7608](https://github.com/thi-ng/umbrella/commit/d2f7608))
- add MaybeUnit, update fn sigs ([fe65abc](https://github.com/thi-ng/umbrella/commit/fe65abc))
- add isDimensionless(), update prefix() ([1851fb9](https://github.com/thi-ng/umbrella/commit/1851fb9))
- add/update units, aliases ([850e604](https://github.com/thi-ng/umbrella/commit/850e604))

#### ♻️ Refactoring

- rename builtin units, update readme ([22031e6](https://github.com/thi-ng/umbrella/commit/22031e6))
