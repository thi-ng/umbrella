# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.2.56](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@3.2.56/packages/imgui) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [3.2.36](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@3.2.36/packages/imgui) (2025-07-26)

#### ♻️ Refactoring

- minor update layout handling in components ([91885c9](https://codeberg.org/thi.ng/umbrella/commit/91885c9))

### [3.2.12](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@3.2.12/packages/imgui) (2025-04-16)

#### ♻️ Refactoring

- minor internal updates (imports) ([db32858](https://codeberg.org/thi.ng/umbrella/commit/db32858))

### [3.2.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@3.2.1/packages/imgui) (2025-02-05)

#### 🩹 Bug fixes

- update dropdown label handling ([8dc2e93](https://codeberg.org/thi.ng/umbrella/commit/8dc2e93))
  - show label in default state if selected value is undefined
    (e.g. because `value` was set to -1)
- update ramp color handling, add `fill` option ([874d701](https://codeberg.org/thi.ng/umbrella/commit/874d701))

## [3.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@3.2.0/packages/imgui) (2025-02-05)

#### 🚀 Features

- add RampOpts.samples ([8aaaae5](https://codeberg.org/thi.ng/umbrella/commit/8aaaae5))

## [3.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@3.1.0/packages/imgui) (2024-10-07)

#### 🚀 Features

- clamp value args to min/max range ([ee866b1](https://codeberg.org/thi.ng/umbrella/commit/ee866b1))
  - update dial, ring, sliders and XY pad components
  - ensure provided value arg is within limits
- update ramp component & RampOpts ([953f2fa](https://codeberg.org/thi.ng/umbrella/commit/953f2fa))

#### ♻️ Refactoring

- update DropDownOpts ([fe0f080](https://codeberg.org/thi.ng/umbrella/commit/fe0f080))
  - rename `title` option => `label`

# [3.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@3.0.0/packages/imgui) (2024-10-03)

#### 🛑 Breaking changes

- update all component/widget functions ([ffe21dd](https://codeberg.org/thi.ng/umbrella/commit/ffe21dd))
- BREAKING CHANGE: replace function args w/ option objects

### [2.3.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@2.3.1/packages/imgui) (2024-09-05)

#### 🩹 Bug fixes

- update ramp(), clamp mouse pos ([420b41a](https://codeberg.org/thi.ng/umbrella/commit/420b41a))

## [2.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@2.3.0/packages/imgui) (2024-09-05)

#### 🚀 Features

- add ramp widget ([3c84204](https://codeberg.org/thi.ng/umbrella/commit/3c84204))

#### ♻️ Refactoring

- update textLabel to use geom types ([176024f](https://codeberg.org/thi.ng/umbrella/commit/176024f))

### [2.2.60](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@2.2.60/packages/imgui) (2024-06-21)

#### ♻️ Refactoring

- update geom deps, update imports ([afd0b8b](https://codeberg.org/thi.ng/umbrella/commit/afd0b8b))
- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [2.2.55](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@2.2.55/packages/imgui) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([bee8fd5](https://codeberg.org/thi.ng/umbrella/commit/bee8fd5))

### [2.2.8](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@2.2.8/packages/imgui) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

### [2.2.5](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@2.2.5/packages/imgui) (2023-10-30)

#### ♻️ Refactoring

- add IGridLayout generics ([bdca6fc](https://codeberg.org/thi.ng/umbrella/commit/bdca6fc))

## [2.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/imgui@2.2.0/packages/imgui) (2023-10-18)

#### 🚀 Features

- add defGUI() factory fn (syntax sugar) ([84ef0a8](https://codeberg.org/thi.ng/umbrella/commit/84ef0a8))
  - minor internal refactoring
