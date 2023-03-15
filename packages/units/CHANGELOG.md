# Change Log

- **Last updated**: 2023-03-15T14:55:07Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
