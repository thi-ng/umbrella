# Change Log

- **Last updated**: 2025-05-28T12:02:39Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.5.0) (2024-03-13)

#### 🚀 Features

- add CustomError interface, update docs, add tests ([d2ea8b2](https://github.com/thi-ng/umbrella/commit/d2ea8b2))

### [2.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.4.1) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.4.0) (2023-10-24)

#### 🚀 Features

- update assert() import.meta.env check ([#425](https://github.com/thi-ng/umbrella/issues/425)) ([d30d000](https://github.com/thi-ng/umbrella/commit/d30d000))
  - also check for `import.meta.env.UMBRELLA_ASSERTS` for non-ViteJS tooling
  - btw. this is **not** a fix for the esbuild issue in [#425](https://github.com/thi-ng/umbrella/issues/425)
  (but part of its solution posted in comments)

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.3.0) (2023-08-04)

#### 🚀 Features

- add ensureXXX() functions ([be70868](https://github.com/thi-ng/umbrella/commit/be70868))

### [2.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.2.3) (2022-10-28)

#### 🩹 Bug fixes

- potential fix regression of env var check ([#361](https://github.com/thi-ng/umbrella/issues/361)) ([1d3a805](https://github.com/thi-ng/umbrella/commit/1d3a805))

### [2.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.2.2) (2022-10-04)

#### 🩹 Bug fixes

- update assertion switch logic ([781470d](https://github.com/thi-ng/umbrella/commit/781470d))
  - remove support for obsolete (& broken) snowpack setup
  - add support for Vite's env var handling

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.2.0) (2022-09-21)

#### 🚀 Features

- add I/O error types & factories ([898584b](https://github.com/thi-ng/umbrella/commit/898584b))
  - add IOError
  - add FileNotFoundError
