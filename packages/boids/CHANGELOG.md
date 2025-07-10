# Change Log

- **Last updated**: 2025-07-10T14:20:23Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/boids@1.1.10) (2025-06-19)

#### ⏱ Performance improvements

- various minor optimizations ([f47c986](https://github.com/thi-ng/umbrella/commit/f47c986))
  - hoist local vars in hotspots
  - update Radial.setRadius() to avoid distance calc if possible

### [1.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/boids@1.1.4) (2025-05-12)

#### ⏱ Performance improvements

- add Boid.force, update blendedBehaviorUpdate() ([dbb3178](https://github.com/thi-ng/umbrella/commit/dbb3178))
  - pre-allocate force vector to avoid re-allocations for every frame

### [1.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/boids@1.1.3) (2025-05-09)

#### 🩹 Bug fixes

- off-by-one error in cohesion() ([e93b66c](https://github.com/thi-ng/umbrella/commit/e93b66c))

### [1.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/boids@1.1.2) (2025-05-08)

#### 🩹 Bug fixes

- update cohesion(), count used neighbors only ([9eef80c](https://github.com/thi-ng/umbrella/commit/9eef80c))

### [1.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/boids@1.1.1) (2025-05-08)

#### 🩹 Bug fixes

- update cohesion(), use filter predicate ([66d219b](https://github.com/thi-ng/umbrella/commit/66d219b))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/boids@1.1.0) (2025-05-08)

#### 🚀 Features

- add optional amp param for behaviors ([74720a5](https://github.com/thi-ng/umbrella/commit/74720a5))
  - update alignment(), cohesion(), separation() behaviors
- add optional `BoidOpts.id` ([965c2ad](https://github.com/thi-ng/umbrella/commit/965c2ad))

#### ♻️ Refactoring

- rename Boid internals ([8bdd9cd](https://github.com/thi-ng/umbrella/commit/8bdd9cd))
  - rename `.computeSteer()` => `.averageForce()`
  - rename `.limitSteer()` => `.limitForce()`
  - add docs

### [1.0.34](https://github.com/thi-ng/umbrella/tree/@thi.ng/boids@1.0.34) (2024-06-21)

#### ♻️ Refactoring

- dedupe wrap2/3() internals ([6ca4b99](https://github.com/thi-ng/umbrella/commit/6ca4b99))

### [1.0.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/boids@1.0.30) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([abad151](https://github.com/thi-ng/umbrella/commit/abad151))

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
