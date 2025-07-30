# Change Log

- **Last updated**: 2025-07-30T22:32:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/base-n@2.7.0) (2024-02-06)

#### 🚀 Features

- pkg restructure,separate decoder/encoder, add bases ([47e37bc](https://github.com/thi-ng/umbrella/commit/47e37bc))
  - extract BaseNDecoder/Encoder classes
  - add IBaseDecode/IBaseEncode interfaces
  - migrate chatsets to own files to help w/ treeshaking
  - add base10/26

## [2.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/base-n@2.6.0) (2024-01-26)

#### 🚀 Features

- add base83 chars & preset ([5e09baf](https://github.com/thi-ng/umbrella/commit/5e09baf))
  - add `B83_CHARS` and `BASE83`

#### ⏱ Performance improvements

- memoize value padding (encoding w/ size) ([62ccf80](https://github.com/thi-ng/umbrella/commit/62ccf80))
  - migrate padding into BaseN class
  - add BaseN.clear() for clearing memoization cache

### [2.5.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/base-n@2.5.11) (2023-08-14)

#### ⏱ Performance improvements

- minor internal updates .encodeBigInt() ([43e9a7f](https://github.com/thi-ng/umbrella/commit/43e9a7f))

### [2.5.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/base-n@2.5.10) (2023-08-12)

#### ♻️ Refactoring

- remove deps, minor internal updates ([c675cba](https://github.com/thi-ng/umbrella/commit/c675cba))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/base-n@2.5.0) (2023-03-17)

#### 🚀 Features

- add BASE16/32/58 aliases for default impls ([7a8ae1f](https://github.com/thi-ng/umbrella/commit/7a8ae1f))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/base-n@2.4.0) (2023-02-10)

#### 🚀 Features

- add optional zero-padding for .encode() ([51ce75b](https://github.com/thi-ng/umbrella/commit/51ce75b))
  - update IBase encode method signatures
  - update BaseN encode impls
  - add tests

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/base-n@2.3.0) (2022-05-22)

#### 🚀 Features

- add BASE58_LC alt version ([755a2a7](https://github.com/thi-ng/umbrella/commit/755a2a7))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/base-n@2.2.0) (2022-03-11)

#### 🚀 Features

- add octal support, export char strings ([0c0dac6](https://github.com/thi-ng/umbrella/commit/0c0dac6))
