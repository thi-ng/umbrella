# Change Log

- **Last updated**: 2026-01-23T13:09:44Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.2.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-format@2.2.6) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-format@2.2.0) (2024-03-27)

#### 🚀 Features

- add FMT_HTML_MCSS, update memoizations ([55e85f0](https://github.com/thi-ng/umbrella/commit/55e85f0))
- add FMT_HTML_CSS_VARS() formatter ([277155e](https://github.com/thi-ng/umbrella/commit/277155e))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-format@2.1.0) (2024-02-19)

#### 🚀 Features

- add common ANSI escape seqs ([11231de](https://github.com/thi-ng/umbrella/commit/11231de))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-format@2.0.0) (2023-12-18)

#### 🛑 Breaking changes

- update StringFormat interface ([c04c723](https://github.com/thi-ng/umbrella/commit/c04c723))
- BREAKING CHANGE: add StringFormat.format()
  - update all existing StringFormat impls
  - add FormatPresets.format to expose ref to underlying StringFormat

### [1.4.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-format@1.4.16) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-format@1.4.0) (2023-03-17)

#### 🚀 Features

- add PRESET_NONE ([28e4db4](https://github.com/thi-ng/umbrella/commit/28e4db4))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/text-format@1.3.0) (2023-03-16)

#### 🚀 Features

- add PRESET_ANSI16, update PRESETS_TPL ([33a69cc](https://github.com/thi-ng/umbrella/commit/33a69cc))
  - add bg colors to PRESETS_TPL (and therefore `defFormatPresets()`)
  - add PRESET_ANSI16 to reduce boilerplate
