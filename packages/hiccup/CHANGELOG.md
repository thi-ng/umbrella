# Change Log

- **Last updated**: 2023-06-14T07:58:51Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@4.2.0) (2021-11-17)

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

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@4.1.0) (2021-10-25)

#### 🚀 Features

- replace entity handling w/ [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/main/packages/strings) ([04154b8](https://github.com/thi-ng/umbrella/commit/04154b8))

### [4.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@4.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@4.0.0) (2021-10-12)

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
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger

### [3.6.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@3.6.4) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [3.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@3.6.1) (2020-09-22)

#### ♻️ Refactoring

- extract mergeEmmetAttribs() ([0c965c9](https://github.com/thi-ng/umbrella/commit/0c965c9))
  - simplify normalize() and improve external re-use in hdom/rdom
- update/split serialization fns ([32ac755](https://github.com/thi-ng/umbrella/commit/32ac755))
  - extract serializeTag()
- update/split serializeAttribs() ([cdf483b](https://github.com/thi-ng/umbrella/commit/cdf483b))

## [3.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@3.6.0) (2020-09-13)

#### 🚀 Features

- add CDATA support, update void tag handling ([5989427](https://github.com/thi-ng/umbrella/commit/5989427))
  - add CDATA tag constant
  - add serializeCData()
  - update VOID_TAGS, extract NO_CLOSE_EMPTY

## [3.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@3.5.0) (2020-07-02)

#### 🚀 Features

- remove obsolete SVG/XLINK urls ([aa34be7](https://github.com/thi-ng/umbrella/commit/aa34be7))
  - moved to [@thi.ng/prefixes](https://github.com/thi-ng/umbrella/tree/main/packages/prefixes) pkg for better re-use
- add RDFa `prefix` attrib handling, add tests ([24a7748](https://github.com/thi-ng/umbrella/commit/24a7748))
  - add `formatPrefixes()` helper
  - update `serializeAttribs()`

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@3.4.0) (2020-06-28)

#### 🚀 Features

- update deps & attrib handling ([09ba171](https://github.com/thi-ng/umbrella/commit/09ba171))
  - add [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) dep
  - add support for IDeref attrib vals
  - add support for `class` attrib obj vals
  - add `mergeClasses()` helper
  - add IDeref support inside `class` & `style` attribs
  - add support for nested data attribs

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@3.3.0) (2020-06-24)

#### 🚀 Features

- support array attrib values, add tests ([1c4ef8a](https://github.com/thi-ng/umbrella/commit/1c4ef8a))
- update `accept` attrib handling ([fabf447](https://github.com/thi-ng/umbrella/commit/fabf447))

### [3.2.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@3.2.4) (2019-08-21)

#### 🩹 Bug fixes

- update/rename regexes & tag maps ([6dba80d](https://github.com/thi-ng/umbrella/commit/6dba80d))

#### ♻️ Refactoring

- split serialize(), move normalize() to own file ([fa56951](https://github.com/thi-ng/umbrella/commit/fa56951))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@3.2.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([d0fce75](https://github.com/thi-ng/umbrella/commit/d0fce75))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([c73b207](https://github.com/thi-ng/umbrella/commit/c73b207))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@3.1.0) (2019-02-18)

#### 🚀 Features

- add support for XML/DTD proc tags, update readme, tests ([ede2842](https://github.com/thi-ng/umbrella/commit/ede2842))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@3.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

### [2.7.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@2.7.2) (2018-12-20)

#### ♻️ Refactoring

- export normalize() fn ([df38394](https://github.com/thi-ng/umbrella/commit/df38394))

## [2.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@2.7.0) (2018-12-13)

#### 🚀 Features

- add __skip support, add test, update readme ([d3500df](https://github.com/thi-ng/umbrella/commit/d3500df))

## [2.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@2.6.0) (2018-11-07)

#### 🚀 Features

- update derefContext() to only apply to selected keys ([749925f](https://github.com/thi-ng/umbrella/commit/749925f))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@2.5.0) (2018-11-06)

#### 🚀 Features

- add support for dynamic user context values ([a947873](https://github.com/thi-ng/umbrella/commit/a947873))
  - add derefContext() helper to auto-deref any IDeref vals
  - update serialize()

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@2.4.0) (2018-09-23)

#### 🚀 Features

- emmet class & class attrib merging in normalize() ([1d8eeb4](https://github.com/thi-ng/umbrella/commit/1d8eeb4))
  - now same behavior as hdom's normalizeElement()
  - update tests

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@2.3.0) (2018-09-22)

#### 🚀 Features

- add control attrib handling, add comment support ([363c241](https://github.com/thi-ng/umbrella/commit/363c241))
  - skip serialize() for elements w/ `__serialize: false` attrib
  - omit output of any control attribs
  - add COMMENT const and comment serialization
  - update imports
  - update docstring

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@2.1.0) (2018-08-31)

#### 🚀 Features

- add optional support for spans & auto keying ([#39](https://github.com/thi-ng/umbrella/issues/39)) ([1b0deb2](https://github.com/thi-ng/umbrella/commit/1b0deb2))

#### 🩹 Bug fixes

- disable spans for certain element types ([1b97a25](https://github.com/thi-ng/umbrella/commit/1b97a25))
  - re-add NO_SPANS (moved from hdom)
  - update _serialize()
- serialize() args ([1e8b4ef](https://github.com/thi-ng/umbrella/commit/1e8b4ef))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@2.0.0) (2018-05-13)

#### 🛑 Breaking changes

- fix [#19](https://github.com/thi-ng/umbrella/issues/19), add support for context object ([feca566](https://github.com/thi-ng/umbrella/commit/feca566))
- BREAKING CHANGE: component functions now take a global context object as
  first argument (like w/ [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/main/packages/hdom))
  - update serialize() to accept & pass optional context
  - add support for component objects
  - add/update tests

#### ⏱ Performance improvements

- update css() ([b1cb7d9](https://github.com/thi-ng/umbrella/commit/b1cb7d9))
  - use string concat (~2.5x faster)
  - skip null values

### [1.3.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@1.3.14) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

### [1.3.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@1.3.4) (2018-04-08)

#### ♻️ Refactoring

- remove obsolete deref check ([fcf1404](https://github.com/thi-ng/umbrella/commit/fcf1404))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@1.3.0) (2018-03-21)

#### 🚀 Features

- update error handling, add [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) dep ([a3238ab](https://github.com/thi-ng/umbrella/commit/a3238ab))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@1.2.0) (2018-03-14)

#### 🚀 Features

- add auto deref() support ([0d2c16f](https://github.com/thi-ng/umbrella/commit/0d2c16f))
- support fn values in style objects ([93343d6](https://github.com/thi-ng/umbrella/commit/93343d6))

#### ♻️ Refactoring

- disable deref() for attrib objects ([de839e8](https://github.com/thi-ng/umbrella/commit/de839e8))

### [1.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@1.1.1) (2018-02-26)

#### ♻️ Refactoring

- sort void tags ([45d6385](https://github.com/thi-ng/umbrella/commit/45d6385))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@1.1.0) (2018-02-24)

#### 🚀 Features

- add support for more SVG tags (66 total) ([44f33df](https://github.com/thi-ng/umbrella/commit/44f33df))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@1.0.0) (2018-02-03)

#### 🛑 Breaking changes

- skip fn exec for event attribs, update tests, readme ([7ae706e](https://github.com/thi-ng/umbrella/commit/7ae706e))
- BREAKING CHANGE: event attribs w/ function values will be omitted, see readme for details/examples

### [0.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@0.1.6) (2018-02-01)

#### ♻️ Refactoring

- update/add deps, restructure/split into sub-modules ([0439d24](https://github.com/thi-ng/umbrella/commit/0439d24))

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup@0.1.2) (2018-01-24)

#### 🚀 Features

- initial re-import as monorepo, update readme files, cleanup imports ([04ff6e9](https://github.com/thi-ng/umbrella/commit/04ff6e9))
