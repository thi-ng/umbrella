# Change Log

- **Last updated**: 2025-03-18T13:24:25Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.1.42](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@3.1.42) (2025-03-11)

#### ♻️ Refactoring

- update for Zig v0.14.0 ([890f3eb](https://github.com/thi-ng/umbrella/commit/890f3eb))

### [3.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@3.1.4) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@3.1.0) (2024-04-20)

#### 🚀 Features

- update docs, add encode[SU]LEB128Into() fns ([44f927b](https://github.com/thi-ng/umbrella/commit/44f927b))
  - update/fix doc strings
  - retroactively document new functions by @jtenner's PR ([#460](https://github.com/thi-ng/umbrella/issues/460))
    - add encodeSLEB128Into()
    - add encodeULEB128Into()

### [3.0.47](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@3.0.47) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [3.0.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@3.0.21) (2023-06-29)

#### ♻️ Refactoring

- Zig v0.11-dev syntax & build updates ([cae6541](https://github.com/thi-ng/umbrella/commit/cae6541))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/leb128@3.0.0) (2022-12-02)

#### 🛑 Breaking changes

- add bigint support ([0440c34](https://github.com/thi-ng/umbrella/commit/0440c34))
- BREAKING CHANGE: update decode return type
  - update all encode to accept bigint or number, cast to correct u64/i64 range
  - update decode result to [bigint, number] tuple
  - rebuild binary (~400 bytes smaller)
  - move zig source to /zig
  - update tests
  - update readme
