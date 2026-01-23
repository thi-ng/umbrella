# Change Log

- **Last updated**: 2026-01-23T13:09:44Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/errors@2.6.0) (2025-12-25)

#### 🚀 Features

- add `unsupportedFeature()`, rename `unsupported` => `unsupportedOp()` ([f6a8800](https://github.com/thi-ng/umbrella/commit/f6a8800))

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
