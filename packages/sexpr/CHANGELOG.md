# Change Log

- **Last updated**: 2026-02-07T14:15:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.1.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@1.1.18) (2025-12-25)

#### 🩹 Bug fixes

- fix/update number parsing ([399ece6](https://github.com/thi-ng/umbrella/commit/399ece6))
  - add `isFloatString()` as pre-check if token completely represents a numeric value

### [1.1.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@1.1.17) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@1.1.0) (2025-07-29)

#### 🚀 Features

- update `parse()`, add string unescaping ([fbb7455](https://github.com/thi-ng/umbrella/commit/fbb7455))

### [0.5.26](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.5.26) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

### [0.5.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.5.5) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.5.0) (2023-09-15)

#### 🚀 Features

- add support for line comments, fix tokenize ([d3e708e](https://github.com/thi-ng/umbrella/commit/d3e708e))
  - update SyntaxOpts
  - fix/update tokenize() to emit
