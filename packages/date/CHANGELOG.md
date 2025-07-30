# Change Log

- **Last updated**: 2025-07-30T22:32:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.7.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.7.19) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [2.7.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.7.9) (2024-03-18)

#### ♻️ Refactoring

- update defFormat() internals ([cf5890c](https://github.com/thi-ng/umbrella/commit/cf5890c))

## [2.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.7.0) (2024-02-22)

#### 🚀 Features

- add single component formatter presets ([661a4b7](https://github.com/thi-ng/umbrella/commit/661a4b7))

## [2.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.6.0) (2024-02-22)

#### 🚀 Features

- add FMT_yyyyMMdd_ALT and FMT_HHmmss_ALT formatters ([658bcf9](https://github.com/thi-ng/umbrella/commit/658bcf9))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.5.0) (2023-11-04)

#### 🚀 Features

- add durationAs() & asXXX() duration helpers ([ad17cee](https://github.com/thi-ng/umbrella/commit/ad17cee))
- add absDifference(), add/update docs ([9b54f6c](https://github.com/thi-ng/umbrella/commit/9b54f6c))

### [2.4.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.4.10) (2023-03-27)

#### ♻️ Refactoring

- update imports (TS5.0) ([9ad7746](https://github.com/thi-ng/umbrella/commit/9ad7746))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.4.0) (2022-12-29)

#### 🚀 Features

- add formatDuration(), internal restructure ([d610a8a](https://github.com/thi-ng/umbrella/commit/d610a8a))
  - add formatDuration() & formatDurationParts()
  - add composeDuration()
  - refactor formatRelativeParts()
  - move all formatting fns to format.ts
  - move decomposeDuration() to duration.ts
  - add tests

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.3.0) (2022-06-15)

#### 🚀 Features

- update parseRelative() ([0f7ecfc](https://github.com/thi-ng/umbrella/commit/0f7ecfc))
  - add "mo" shorthand for months

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.2.0) (2022-05-18)

#### 🚀 Features

- use current time as default for all formatters ([ee536db](https://github.com/thi-ng/umbrella/commit/ee536db))

### [2.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/date@2.1.6) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))
