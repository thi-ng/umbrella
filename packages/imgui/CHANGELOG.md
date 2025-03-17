# Change Log

- **Last updated**: 2025-03-17T13:40:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@3.2.1) (2025-02-05)

#### 🩹 Bug fixes

- update dropdown label handling ([8dc2e93](https://github.com/thi-ng/umbrella/commit/8dc2e93))
  - show label in default state if selected value is undefined
    (e.g. because `value` was set to -1)
- update ramp color handling, add `fill` option ([874d701](https://github.com/thi-ng/umbrella/commit/874d701))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@3.2.0) (2025-02-05)

#### 🚀 Features

- add RampOpts.samples ([8aaaae5](https://github.com/thi-ng/umbrella/commit/8aaaae5))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@3.1.0) (2024-10-07)

#### 🚀 Features

- clamp value args to min/max range ([ee866b1](https://github.com/thi-ng/umbrella/commit/ee866b1))
  - update dial, ring, sliders and XY pad components
  - ensure provided value arg is within limits
- update ramp component & RampOpts ([953f2fa](https://github.com/thi-ng/umbrella/commit/953f2fa))

#### ♻️ Refactoring

- update DropDownOpts ([fe0f080](https://github.com/thi-ng/umbrella/commit/fe0f080))
  - rename `title` option => `label`

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@3.0.0) (2024-10-03)

#### 🛑 Breaking changes

- update all component/widget functions ([ffe21dd](https://github.com/thi-ng/umbrella/commit/ffe21dd))
- BREAKING CHANGE: replace function args w/ option objects

### [2.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@2.3.1) (2024-09-05)

#### 🩹 Bug fixes

- update ramp(), clamp mouse pos ([420b41a](https://github.com/thi-ng/umbrella/commit/420b41a))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@2.3.0) (2024-09-05)

#### 🚀 Features

- add ramp widget ([3c84204](https://github.com/thi-ng/umbrella/commit/3c84204))

#### ♻️ Refactoring

- update textLabel to use geom types ([176024f](https://github.com/thi-ng/umbrella/commit/176024f))

### [2.2.60](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@2.2.60) (2024-06-21)

#### ♻️ Refactoring

- update geom deps, update imports ([afd0b8b](https://github.com/thi-ng/umbrella/commit/afd0b8b))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [2.2.55](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@2.2.55) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([bee8fd5](https://github.com/thi-ng/umbrella/commit/bee8fd5))

### [2.2.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@2.2.8) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [2.2.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@2.2.5) (2023-10-30)

#### ♻️ Refactoring

- add IGridLayout generics ([bdca6fc](https://github.com/thi-ng/umbrella/commit/bdca6fc))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@2.2.0) (2023-10-18)

#### 🚀 Features

- add defGUI() factory fn (syntax sugar) ([84ef0a8](https://github.com/thi-ng/umbrella/commit/84ef0a8))
  - minor internal refactoring

### [2.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/imgui@2.1.9) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))
