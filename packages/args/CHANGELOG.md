# Change Log

- **Last updated**: 2025-07-03T15:03:31Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.6.0) (2025-06-28)

#### 🚀 Features

- emit colorized error messages in cliApp() ([36f66b6](https://github.com/thi-ng/umbrella/commit/36f66b6))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.5.0) (2025-06-27)

#### 🚀 Features

- update ColorTheme, add color support for cmd list ([75b1ef1](https://github.com/thi-ng/umbrella/commit/75b1ef1))
  - add `ColorTheme.command` option
  - migrate internal formatting helpers to own file
  - refactor cliApp() & usage() internals
- add thi.ng logo header tpl ([838e417](https://github.com/thi-ng/umbrella/commit/838e417))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.4.0) (2025-06-27)

#### 🚀 Features

- add word-wrapping for command descriptions ([46a73a3](https://github.com/thi-ng/umbrella/commit/46a73a3))
  - refactor usage internals for better re-use

### [2.3.34](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.3.34) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [2.3.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.3.31) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([68dd6a2](https://github.com/thi-ng/umbrella/commit/68dd6a2))

### [2.3.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.3.2) (2023-12-26)

#### 🩹 Bug fixes

- update word wrap behavior in usage() ([60b1580](https://github.com/thi-ng/umbrella/commit/60b1580))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.3.0) (2023-12-18)

#### 🚀 Features

- add cliApp() runner ([b2248fa](https://github.com/thi-ng/umbrella/commit/b2248fa))
- update lifecycle hooks, add NO_COLOR support, add docs ([4a0ebda](https://github.com/thi-ng/umbrella/commit/4a0ebda))
  - add CLIAppConfig pre/post lifecycle hooks
  - update UsageOpts.color handling
  - add `NO_COLOR` env var support in cliApp()
  - add doc strings
  - update deps
- update cliApp() to support command context extensions ([61d9fb8](https://github.com/thi-ng/umbrella/commit/61d9fb8))
- update cliApp() error handling ([019e5a1](https://github.com/thi-ng/umbrella/commit/019e5a1))
- update argv handling in cliApp() ([b1ed768](https://github.com/thi-ng/umbrella/commit/b1ed768))
- add NO_COLOR aware formatters to CommandCtx ([0e7ddda](https://github.com/thi-ng/umbrella/commit/0e7ddda))
  - update deps
- update cliApp() to use StreamLogger (target: process.stderr) ([b249295](https://github.com/thi-ng/umbrella/commit/b249295))

### [2.2.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.2.28) (2023-08-04)

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://github.com/thi-ng/umbrella/commit/b6db053))

### [2.2.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.2.15) (2022-12-29)

#### ♻️ Refactoring

- update "no-browser" pkg handling ([0e84f1b](https://github.com/thi-ng/umbrella/commit/0e84f1b))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.2.0) (2022-08-15)

#### 🚀 Features

- add ParseError, update parse() err handling ([c854a13](https://github.com/thi-ng/umbrella/commit/c854a13))
  - update parse() to re-throw any caught error wrapped as ParseError

### [2.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.1.6) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))
