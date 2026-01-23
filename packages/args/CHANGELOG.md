# Change Log

- **Last updated**: 2026-01-23T13:09:44Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.2.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@3.2.5) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

### [3.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@3.2.1) (2025-11-03)

#### 🩹 Bug fixes

- update `cliApp()` sub-command usage ([c973385](https://github.com/thi-ng/umbrella/commit/c973385))
  - if missing inputs, include actual command opts, not just common opts in usage

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@3.2.0) (2025-11-03)

#### 🚀 Features

- sort commands in `cliApp()` usage ([22a3ffe](https://github.com/thi-ng/umbrella/commit/22a3ffe))

### [3.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@3.1.2) (2025-10-24)

#### 🩹 Bug fixes

- additional fixes for [#550](https://github.com/thi-ng/umbrella/issues/550) (oneOfMulti) ([ca0af0d](https://github.com/thi-ng/umbrella/commit/ca0af0d))
  - update coerce fn signature
  - add tests

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@3.1.0) (2025-09-26)

#### 🚀 Features

- add ARG_TYPES index ([5f68489](https://github.com/thi-ng/umbrella/commit/5f68489))

#### ♻️ Refactoring

- update factory fns to only take single arg (spec) ([2766125](https://github.com/thi-ng/umbrella/commit/2766125))
  - update `oneOf`, `oneOfMulti`, `tuple`, `size`, `vec`
  - fix `required`-handling in `ARG_OUT_DIR` & `ARG_OUT_FILE` presets
  - fix code example for `tuple()`
  - update tests

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@3.0.0) (2025-09-26)

#### 🛑 Breaking changes

- update arg specs & arg factory fns, simplify types ([7ad3efb](https://github.com/thi-ng/umbrella/commit/7ad3efb))
- BREAKING CHANGES: update arg specs & arg factory fns, simplify types
  - add `type` field in all arg specs
  - add/update arg-related types
  - update required arg handling: `optional: false` => `required: true`
  - update delimiter handling (move into arg specs)
  - update `tuple()` arg order
  - remove obsolete coercion fns (`coerceFloats()` etc.)
  - update tests

## [2.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.10.0) (2025-09-04)

#### 🚀 Features

- update cliApp() to show current cmd info w/ usage ([2991527](https://github.com/thi-ng/umbrella/commit/2991527))

## [2.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.9.0) (2025-08-06)

#### 🚀 Features

- add arg preset specs ([2b13af5](https://github.com/thi-ng/umbrella/commit/2b13af5))
  - add ARG_DRY_RUN
  - add ARG_QUIET, ARG_VERBOSE
  - add ARG_OUT_DIR, ARG_OUT_FILE
- add configureLogLevel() ([ea5c6e4](https://github.com/thi-ng/umbrella/commit/ea5c6e4))

## [2.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.8.0) (2025-07-12)

#### 🚀 Features

- update `Command`, support min/max input ranges ([471543e](https://github.com/thi-ng/umbrella/commit/471543e))
  - update cliApp() input checks & error messages

### [2.7.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.7.1) (2025-07-11)

#### 🩹 Bug fixes

- update arg names in parse errors ([5e82c16](https://github.com/thi-ng/umbrella/commit/5e82c16))
  - use kebab-case arg names

## [2.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.7.0) (2025-07-10)

#### 🚀 Features

- add `terminalLineWidth()` helper ([e8fdd27](https://github.com/thi-ng/umbrella/commit/e8fdd27))
- update ColorTheme and error msg output ([c2bca13](https://github.com/thi-ng/umbrella/commit/c2bca13))

#### ♻️ Refactoring

- simplify error handling in cliApp() ([9973cf0](https://github.com/thi-ng/umbrella/commit/9973cf0))

### [2.6.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.6.3) (2025-07-09)

#### 🩹 Bug fixes

- update parse logic to allow option values starting with `-` ([8a9050d](https://github.com/thi-ng/umbrella/commit/8a9050d))
  - disable regex check in `__parseValue()`
  - add tests

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
