# Change Log

- **Last updated**: 2026-01-16T11:40:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.80](https://github.com/thi-ng/umbrella/tree/@thi.ng/porter-duff@2.1.80) (2024-06-21)

#### ⏱ Performance improvements

- update clamping in porterDuffInt() ([1c6ffc0](https://github.com/thi-ng/umbrella/commit/1c6ffc0))

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [2.1.47](https://github.com/thi-ng/umbrella/tree/@thi.ng/porter-duff@2.1.47) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [2.1.23](https://github.com/thi-ng/umbrella/tree/@thi.ng/porter-duff@2.1.23) (2023-01-10)

#### ⏱ Performance improvements

- return optimized blend fns ([1c408c7](https://github.com/thi-ng/umbrella/commit/1c408c7))
  - add PD coefficient checks in porterDuff()/porterDuffInt()
  - return optimized blend fns if one or both coeffs are zero
