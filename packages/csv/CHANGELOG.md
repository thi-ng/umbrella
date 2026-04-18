# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.5.2](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csv@2.5.2/packages/csv) (2025-08-06)

#### 🩹 Bug fixes

- update default handling (empty) ([b223719](https://codeberg.org/thi.ng/umbrella/commit/b223719))
  - include empty columns/cells for default eligibility
  - update `ColumnSpec` docs (re: role of cell transforms)
  - update tests

### [2.5.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csv@2.5.1/packages/csv) (2025-08-06)

#### ♻️ Refactoring

- update default value handling (fn lookup) ([8d373bb](https://codeberg.org/thi.ng/umbrella/commit/8d373bb))
  - allow `ColumnSpec.default` to be functions
  - update `parseCSV()`
  - update tests

## [2.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csv@2.5.0/packages/csv) (2025-08-06)

#### 🚀 Features

- add support for column default values ([e105548](https://codeberg.org/thi.ng/umbrella/commit/e105548))
  - update `ColumnSpec`
  - update `parseCSV()` to support & validate column specs w/ default values
  - add tests

## [2.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csv@2.4.0/packages/csv) (2025-07-12)

#### 🚀 Features

- add `json()` higher-order cell transform ([d8a95dd](https://codeberg.org/thi.ng/umbrella/commit/d8a95dd))

### [2.3.87](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csv@2.3.87/packages/csv) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [2.3.81](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csv@2.3.81/packages/csv) (2024-04-08)

#### ♻️ Refactoring

- update reducer handling due to updates in [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/transducers) pkg ([99871a1](https://codeberg.org/thi.ng/umbrella/commit/99871a1))

### [2.3.66](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csv@2.3.66/packages/csv) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://codeberg.org/thi.ng/umbrella/commit/f36aeb0))

### [2.3.42](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csv@2.3.42/packages/csv) (2023-11-09)

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

### [2.3.26](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csv@2.3.26/packages/csv) (2023-08-28)

#### ♻️ Refactoring

- add ColumnSpecs alias ([217cb84](https://codeberg.org/thi.ng/umbrella/commit/217cb84))

## [2.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/csv@2.3.0/packages/csv) (2023-02-05)

#### 🚀 Features

- add oneOff() cell transform for enum like values ([7c297db](https://codeberg.org/thi.ng/umbrella/commit/7c297db))
