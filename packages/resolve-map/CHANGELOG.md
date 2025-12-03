# Change Log

- **Last updated**: 2025-12-03T22:43:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [7.1.122](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@7.1.122) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

### [7.1.75](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@7.1.75) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [7.1.41](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@7.1.41) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [7.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@7.1.0) (2022-07-12)

#### 🚀 Features

- add `onlyFnRefs` option ([a23fc98](https://github.com/thi-ng/umbrella/commit/a23fc98))

# [7.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@7.0.0) (2022-07-07)

#### 🛑 Breaking changes

- add ResolveOpts, conditional unwrapping ([a23308b](https://github.com/thi-ng/umbrella/commit/a23308b))
- BREAKING CHANGE: update resolve() signature, use new `ResolveOpts`
  - this change has only downstream impact on use cases requiring custom
  prefixes to indicate lookup paths
  - add new option to control value unwrapping in final result
  - update docs/readme
  - add new tests

## [6.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@6.2.0) (2022-07-07)

#### 🚀 Features

- unwrap all resolved() values in result ([888fa33](https://github.com/thi-ng/umbrella/commit/888fa33))
  - add unwrapResolved() to unwrap any values wrapped via `resolved()`
  - update resolveMap/Array()
  - update doc strings
  - update tests

## [6.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@6.1.0) (2022-05-23)

#### 🚀 Features

- add support for protected values ([6280510](https://github.com/thi-ng/umbrella/commit/6280510))
  - add `Resolved` wrapper & factory fn for protecting values from
    future/duplicate resolution attempts
  - add tests
  - update docs/readme

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@6.0.0) (2022-05-02)

#### 🛑 Breaking changes

- add `Unresolved` type & type checking ([a997fd2](https://github.com/thi-ng/umbrella/commit/a997fd2))
- BREAKING CHANGE: add type checking to `resolve()`.
  This MIGHT require additional type generics (of the result object type)
  to be added to any call sites. See tests for examples.

### [5.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/resolve-map@5.1.5) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))
