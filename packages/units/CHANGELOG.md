# Change Log

- **Last updated**: 2024-01-23T15:58:27Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
