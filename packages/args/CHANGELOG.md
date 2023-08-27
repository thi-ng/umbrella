# Change Log

- **Last updated**: 2023-08-27T11:20:58Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.1.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@2.0.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([890936b](https://github.com/thi-ng/umbrella/commit/890936b))

### [1.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@1.1.1) (2021-09-03)

#### ♻️ Refactoring

- fix up TS4.4 changes ([ba616db](https://github.com/thi-ng/umbrella/commit/ba616db))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@1.1.0) (2021-08-19)

#### 🚀 Features

- capitalize usage section headings ([eaa0f23](https://github.com/thi-ng/umbrella/commit/eaa0f23))

### [0.7.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@0.7.1) (2021-07-29)

#### 🩹 Bug fixes

- omit empty groups from usage() ([a66c19a](https://github.com/thi-ng/umbrella/commit/a66c19a))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@0.7.0) (2021-07-01)

#### 🚀 Features

- add showGroupNames option ([6917111](https://github.com/thi-ng/umbrella/commit/6917111))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@0.6.0) (2021-06-08)

#### 🚀 Features

- add kvPairsMulti(), update coerceKV() ([fd12f80](https://github.com/thi-ng/umbrella/commit/fd12f80))
  - add KVMultiDict type alias
  - update tests

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@0.5.0) (2021-03-28)

#### 🚀 Features

- wordwrap usage prefix/suffix, defaults ([325b558](https://github.com/thi-ng/umbrella/commit/325b558))
  - update/revert default val handling in usage(), don't show null/false
  - minor other usage() refactoring
  - update doc strings
- add vec() arg type ([f05cb2a](https://github.com/thi-ng/umbrella/commit/f05cb2a))

### [0.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@0.4.1) (2021-03-24)

#### ♻️ Refactoring

- update wordwrapping in usage() ([4af3d41](https://github.com/thi-ng/umbrella/commit/4af3d41))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@0.4.0) (2021-03-22)

#### 🚀 Features

- support arbitrary length aliases ([1cfdf49](https://github.com/thi-ng/umbrella/commit/1cfdf49))
  - update parseKey() to allow any length aliases
  - add test
- add arg groups, segment usage output ([ebf5197](https://github.com/thi-ng/umbrella/commit/ebf5197))
  - add `ArgSpecBase.group` to classify args
  - update arg factories to define default groups ("flags" & "main")
  - update usage() to output segmented & sorted groups of args

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@0.3.1) (2021-03-21)

#### 🩹 Bug fixes

- fix usage() show defaults logic ([ae31158](https://github.com/thi-ng/umbrella/commit/ae31158))
  - show all default values (incl. zero, false), only skip undefined

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@0.3.0) (2021-03-20)

#### 🚀 Features

- update ParseOpts, UsageOpts ([6577c80](https://github.com/thi-ng/umbrella/commit/6577c80))
  - add `ParseOpts.help` to configure special `--help` option(s)
  - add `UsageOpts.prefix/suffix` strings

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@0.2.0) (2021-01-13)

#### 🚀 Features

- add defaultHint opt, update usage() ([f8a4146](https://github.com/thi-ng/umbrella/commit/f8a4146))
  - add UsageOpts.showDefaults to display arg default vals
  - add ArgSpecBase.defaultHint for default vals for display purposes

#### ♻️ Refactoring

- splitup parse() into smaller fns ([64be608](https://github.com/thi-ng/umbrella/commit/64be608))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/args@0.1.0) (2021-01-10)

#### 🚀 Features

- import as new package ([af5d943](https://github.com/thi-ng/umbrella/commit/af5d943))
- major general package update ([26ec49a](https://github.com/thi-ng/umbrella/commit/26ec49a))
  - use more mapped types to better infer & verify specs for optional args
  - add support for comma separated multi-args
  - add ParseOpts & UsageOpts
  - add/replace coercions
  - add arg spec factories
  - update parse()
    - add comma handling
    - auto-usage on error
    - kebab -> camelCase names
  - update/rewrite usage(), add color support
- add kv args, callbacks, usage opts ([c306aba](https://github.com/thi-ng/umbrella/commit/c306aba))
  - add KVDict type, coerceKV(), kvPairs()
  - add optional `fn` arg spec callbacks
  - add `--help` built-in handling
  - add ColorTheme, update usage()
- add strict mode kvArgs()/coerceKV(), add docs ([b76c4f1](https://github.com/thi-ng/umbrella/commit/b76c4f1))
- update multi arg specs, parse ([dbdf913](https://github.com/thi-ng/umbrella/commit/dbdf913))
  - simplify Args conditionals (remove special casing for string(s))
  - replace spec.comma => spec.delim
  - update ParseResult
  - update parse() to stop at first non-arg value
  - add/update tests
- add tuple arg type support ([a05dde9](https://github.com/thi-ng/umbrella/commit/a05dde9))
