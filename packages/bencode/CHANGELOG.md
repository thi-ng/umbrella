# Change Log

- **Last updated**: 2026-02-07T14:15:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.0.48](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@3.0.48) (2026-02-07)

#### ♻️ Refactoring

- replace deprecated `unsupported()` call sites in all pkgs ([3abbddf](https://github.com/thi-ng/umbrella/commit/3abbddf))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@3.0.0) (2025-01-14)

#### 🛑 Breaking changes

- major internal refactor & MUCH faster decode ([ce6d528](https://github.com/thi-ng/umbrella/commit/ce6d528))
- BREAKING CHANGE: `decode()` now requires `Uint8Array` as input
  - update `decode()` & `encode()` internals
  - update non-UTF-8 decoding (also add note to readme)
  - avoid use of iterators in `decode()`
  - update `__readBytes()` to return sub-arrays (zero copy op)
  - remove [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/main/packages/defmulti) dependency
  - remove internal use of `const enum`s
  - update tests
  - update readme

### [2.1.128](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@2.1.128) (2024-07-22)

#### 🩹 Bug fixes

- fix [#485](https://github.com/thi-ng/umbrella/issues/485), update encode() for arraylike objects ([8bd8912](https://github.com/thi-ng/umbrella/commit/8bd8912))
  - switch order of type analysis in encode() dispatch
  - add tests

### [2.1.123](https://github.com/thi-ng/umbrella/tree/@thi.ng/bencode@2.1.123) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))
