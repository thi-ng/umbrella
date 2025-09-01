# Change Log

- **Last updated**: 2025-09-01T16:38:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/layout@4.0.0) (2025-07-26)

#### 🛑 Breaking changes

- add support for separate X/Y gaps/gutters ([cdc3385](https://github.com/thi-ng/umbrella/commit/cdc3385))
- BREAKING CHANGE: update `LayoutBox` and `IGridLayout`, split `gap` into `gapX` and `gapY`
  - update `LayoutBox`, `IGridLayout`
  - update `IGridLayout.nest()` to support differing gaps/gutters
  - update `GridLayout` and `StackedLayout` impls
  - add/update docs

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/layout@3.2.0) (2025-07-22)

#### 🚀 Features

- add `.height` getter ([a0188a6](https://github.com/thi-ng/umbrella/commit/a0188a6))

### [3.1.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/layout@3.1.11) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/layout@3.1.0) (2024-08-13)

#### 🚀 Features

- add StackedLayout.isEqualized() ([b93702c](https://github.com/thi-ng/umbrella/commit/b93702c))

### [3.0.37](https://github.com/thi-ng/umbrella/tree/@thi.ng/layout@3.0.37) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([ec30ca2](https://github.com/thi-ng/umbrella/commit/ec30ca2))

### [3.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/layout@3.0.2) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/layout@3.0.0) (2023-10-30)

#### 🛑 Breaking changes

- add IGridLayout generics ([52bad17](https://github.com/thi-ng/umbrella/commit/52bad17))
- BREAKING CHANGE: IGridLayout requires a generic type now (for `.nest()`)
  - update GridLayout class

#### 🚀 Features

- add StackedLayout, update types & GridLayout ([1c1281f](https://github.com/thi-ng/umbrella/commit/1c1281f))
- update StackedLayout.largestSpan() ([9ce54cd](https://github.com/thi-ng/umbrella/commit/9ce54cd))
  - add optional max. size constraint arg
