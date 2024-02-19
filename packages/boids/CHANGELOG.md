# Change Log

- **Last updated**: 2024-02-19T16:07:07Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/boids@1.0.0) (2024-01-23)

#### 🛑 Breaking changes

- major refactoring/restructuring, new behavior system ([22cb42d](https://github.com/thi-ng/umbrella/commit/22cb42d))
- BREAKING CHANGE: major refactoring/restructuring, new behavior system
  - modular behavior system with currently these 7 behaviors:
    - alignment()
    - attractPolyline()
    - braitenberg2()
    - cohesion()
    - dynamicTarget()
    - followPolyline()
    - separation()
  - add blendedBehaviorUpdate()
  - add clamp2/3() and wrap2/3() global constraints
  - add Flock class (+ defFlock() factory fn)
  - update/simplify Boid class and 2d/3d factory fns
  - update BoidOpts
  - add doc strings
  - add/update deps

#### 🚀 Features

- update dynamicTarget() ([647d7e1](https://github.com/thi-ng/umbrella/commit/647d7e1))
  - add radius param

#### 🩹 Bug fixes

- update separation() behavior neighbor lookup ([c8ece89](https://github.com/thi-ng/umbrella/commit/c8ece89))

### [0.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/boids@0.1.3) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/boids@0.1.0) (2023-10-27)

#### 🚀 Features

- import as new pkg ([4852b92](https://github.com/thi-ng/umbrella/commit/4852b92))
