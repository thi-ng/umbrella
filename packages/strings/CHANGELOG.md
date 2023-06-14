# Change Log

- **Last updated**: 2023-06-14T07:58:51Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.4.0) (2023-02-27)

#### 🚀 Features

- add more HTML entities ([d617132](https://github.com/thi-ng/umbrella/commit/d617132))

#### 🩹 Bug fixes

- add emoji ranges for slugify/slugifyGH() ([f5cb210](https://github.com/thi-ng/umbrella/commit/f5cb210))

### [3.3.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.3.3) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.3.0) (2021-12-02)

#### 🚀 Features

- add currency formatters ([52b7340](https://github.com/thi-ng/umbrella/commit/52b7340))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.2.0) (2021-11-17)

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

### [3.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.1.4) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.1.0) (2021-10-25)

#### 🚀 Features

- migrate/add entities, regexes, fns ([57c246d](https://github.com/thi-ng/umbrella/commit/57c246d))

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@3.0.0) (2021-10-12)

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

#### 🚀 Features

- add initials() ([5b8476f](https://github.com/thi-ng/umbrella/commit/5b8476f))

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@2.1.0) (2021-03-24)

#### 🚀 Features

- add ruler(), grid() fns, update readme ([d93cbf9](https://github.com/thi-ng/umbrella/commit/d93cbf9))

#### ♻️ Refactoring

- update opts default handling ([fc92745](https://github.com/thi-ng/umbrella/commit/fc92745))
  - update wrapWord(), wordWrapLine()

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@2.0.0) (2021-03-24)

#### 🛑 Breaking changes

- major update wordWrap() & co. ([9c9c9cc](https://github.com/thi-ng/umbrella/commit/9c9c9cc))
- BREAKING CHANGE: major update wordWrap(), wordWrapLines() etc.
  - update arguments
  - add `WordWrapOpts` to configure wordwrap behavior
  - add `IWordSplit` interface and `SPLIT_PLAIN`, `SPLIT_ANSI` impls
  - implement hardwrap mode

#### 🚀 Features

- update split() args ([ea503e8](https://github.com/thi-ng/umbrella/commit/ea503e8))
  - allow string delimiters (or regexp)
- add ANSI predicates ([928694b](https://github.com/thi-ng/umbrella/commit/928694b))

## [1.15.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.15.0) (2021-02-20)

#### 🚀 Features

- add int/intLocale, vector formatters ([ac55fe0](https://github.com/thi-ng/umbrella/commit/ac55fe0))
  - add optional arg for float() for special NaN/Inf handling

#### ♻️ Refactoring

- update uuid() ([7fe966a](https://github.com/thi-ng/umbrella/commit/7fe966a))
  - re-use fn from [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/main/packages/hex)
- avoid [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/main/packages/checks) dep in vector() ([410d463](https://github.com/thi-ng/umbrella/commit/410d463))

## [1.14.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.14.0) (2021-01-13)

#### 🚀 Features

- add stringify() HOF ([4ab7e72](https://github.com/thi-ng/umbrella/commit/4ab7e72))

#### ♻️ Refactoring

- minor update uuid() ([0a37562](https://github.com/thi-ng/umbrella/commit/0a37562))
- minor update computeCursorPos() ([a593d66](https://github.com/thi-ng/umbrella/commit/a593d66))

## [1.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.13.0) (2021-01-10)

#### 🚀 Features

- update padLeft/Right() args ([118f97f](https://github.com/thi-ng/umbrella/commit/118f97f))
  - add optional length arg to explicitly specify string length
    (e.g. to exclude ANSI control seq chars)
- add stripAnsi(), lengthAnsi() fns ([86fa81a](https://github.com/thi-ng/umbrella/commit/86fa81a))
- add wordWrap*() fns ([2a283c0](https://github.com/thi-ng/umbrella/commit/2a283c0))
- add tab conversion fns ([aefdd97](https://github.com/thi-ng/umbrella/commit/aefdd97))

#### ⏱ Performance improvements

- simplify string default delim regexp ([bb62760](https://github.com/thi-ng/umbrella/commit/bb62760))

## [1.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.12.0) (2021-01-05)

#### 🚀 Features

- add interpolateKeys() ([bd78d1d](https://github.com/thi-ng/umbrella/commit/bd78d1d))

### [1.11.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.11.4) (2021-01-02)

#### 🩹 Bug fixes

- update slugifyGH() replacements ([#174](https://github.com/thi-ng/umbrella/issues/174)) ([98a9135](https://github.com/thi-ng/umbrella/commit/98a9135))
  - hard to find definitive info about GH's slugify rules
  - new rules based on more manual experiments and
    studying of unicode charts
  - likely not a watertight solution, but should fix most issues
    of prev impl

### [1.11.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.11.2) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [1.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.11.0) (2020-11-24)

#### 🚀 Features

- add split() iterator ([6d2ec4f](https://github.com/thi-ng/umbrella/commit/6d2ec4f))

#### ♻️ Refactoring

- replace hex formatters w/ [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/main/packages/hex) ([6d7446c](https://github.com/thi-ng/umbrella/commit/6d7446c))
  - add [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/main/packages/hex) dependency
  - replace U8/16/24/32/64
  - refactor uuid()

## [1.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.10.0) (2020-09-22)

#### 🚀 Features

- add unescape() ([924466b](https://github.com/thi-ng/umbrella/commit/924466b))
- add escape(), update unescape(), add tests ([e0d5f1e](https://github.com/thi-ng/umbrella/commit/e0d5f1e))
- add BOM const, update pkg meta ([b6751fc](https://github.com/thi-ng/umbrella/commit/b6751fc))

### [1.9.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.9.6) (2020-09-13)

#### ♻️ Refactoring

- update deps, imports, use new Fn types ([3d21571](https://github.com/thi-ng/umbrella/commit/3d21571))

## [1.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.9.0) (2020-07-08)

#### 🚀 Features

- add computeCursorPos() ([c178d00](https://github.com/thi-ng/umbrella/commit/c178d00))

### [1.8.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.8.4) (2020-04-20)

#### ♻️ Refactoring

- update ALPHA, ALPHA_NUM & WS groups ([719b437](https://github.com/thi-ng/umbrella/commit/719b437))

## [1.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.8.0) (2020-03-28)

#### 🚀 Features

- add join() HOF ([1c5c46f](https://github.com/thi-ng/umbrella/commit/1c5c46f))
- add slugifyGH(), refactor slugify() ([1ef805b](https://github.com/thi-ng/umbrella/commit/1ef805b))
- add trim() HOF ([350a6c6](https://github.com/thi-ng/umbrella/commit/350a6c6))

#### ♻️ Refactoring

- add truncateRight alias ([81fb592](https://github.com/thi-ng/umbrella/commit/81fb592))
- update bits/bytes unit defs ([f9becb1](https://github.com/thi-ng/umbrella/commit/f9becb1))

## [1.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.7.0) (2020-03-06)

#### 🚀 Features

- add char group LUTs for classification ([c3ff006](https://github.com/thi-ng/umbrella/commit/c3ff006))

## [1.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.6.0) (2020-03-01)

#### 🚀 Features

- add defFormat() HOF ([62f4e04](https://github.com/thi-ng/umbrella/commit/62f4e04))

## [1.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.5.0) (2020-02-25)

#### 🚀 Features

- add uuid() formatter ([4592742](https://github.com/thi-ng/umbrella/commit/4592742))

#### ♻️ Refactoring

- update imports ([3937dc6](https://github.com/thi-ng/umbrella/commit/3937dc6))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.4.0) (2020-01-26)

#### 🚀 Features

- add format() helpers (str, ignore) ([df87b7c](https://github.com/thi-ng/umbrella/commit/df87b7c))
- add interpolate() ([a19e409](https://github.com/thi-ng/umbrella/commit/a19e409))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.3.0) (2019-09-21)

#### 🚀 Features

- add charRange(), add radix & zero-pad presets ([c9e5a63](https://github.com/thi-ng/umbrella/commit/c9e5a63))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.2.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([76cecb8](https://github.com/thi-ng/umbrella/commit/76cecb8))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([fb315fe](https://github.com/thi-ng/umbrella/commit/fb315fe))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.1.0) (2019-04-15)

#### 🚀 Features

- add hstr() (hollerith) ([619e9ef](https://github.com/thi-ng/umbrella/commit/619e9ef))

### [1.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.0.2) (2019-01-31)

#### 🩹 Bug fixes

- fix [#70](https://github.com/thi-ng/umbrella/issues/70), replace kebab() regex w/ legacy version ([3adabc4](https://github.com/thi-ng/umbrella/commit/3adabc4))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@0.7.0) (2018-12-13)

#### 🚀 Features

- add slugify() ([8dcc73a](https://github.com/thi-ng/umbrella/commit/8dcc73a))

#### 🩹 Bug fixes

- update kebab() ([1b298f7](https://github.com/thi-ng/umbrella/commit/1b298f7))
  - fix initial capital handling
  - add (partial) UTF-8 support
  - add note about Safari / FF

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@0.6.0) (2018-11-08)

#### 🚀 Features

- add configurable units() HOF & presets ([33e915b](https://github.com/thi-ng/umbrella/commit/33e915b))
  - add presets formatters: seconds(), meters(), grams(), bits(), bytes()

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@0.5.0) (2018-09-25)

#### 🚀 Features

- add splice(), refactor repeat(), add tests ([0cce048](https://github.com/thi-ng/umbrella/commit/0cce048))

### [0.4.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@0.4.3) (2018-09-24)

#### 🩹 Bug fixes

- rename number parsers ([8cbfb97](https://github.com/thi-ng/umbrella/commit/8cbfb97))
  - rename to `maybeParseInt` / `maybeParseFloat`

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@0.3.0) (2018-08-24)

#### 🚀 Features

- add truncateLeft() & wrap() stringers ([1a20bc2](https://github.com/thi-ng/umbrella/commit/1a20bc2))
- add case converters ([653a175](https://github.com/thi-ng/umbrella/commit/653a175))
  - camel / kebab / snake

#### 🩹 Bug fixes

- buffer length (for null inputs) (`center()`) ([5209c42](https://github.com/thi-ng/umbrella/commit/5209c42))
  - also truncate oversized inputs

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@0.2.0) (2018-08-08)

#### 🚀 Features

- add opt prefix arg for radix() ([5864f2c](https://github.com/thi-ng/umbrella/commit/5864f2c))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@0.1.1) (2018-08-08)

#### 🩹 Bug fixes

- float type decl ([b2ebbfc](https://github.com/thi-ng/umbrella/commit/b2ebbfc))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/strings@0.1.0) (2018-08-08)

#### 🚀 Features

- re-import & update [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/main/packages/strings) from MBP2010 ([40781eb](https://github.com/thi-ng/umbrella/commit/40781eb))
