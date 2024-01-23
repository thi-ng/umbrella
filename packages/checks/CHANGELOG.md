# Change Log

- **Last updated**: 2024-01-23T15:58:27Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.4.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.4.7) (2023-11-09)

#### 🩹 Bug fixes

- update isTypedArray() to return boolean ([2c0f72f](https://github.com/thi-ng/umbrella/commit/2c0f72f))

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.4.0) (2023-08-04)

#### 🚀 Features

- add isGenerator() ([af8ffb3](https://github.com/thi-ng/umbrella/commit/af8ffb3))

### [3.3.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.3.5) (2022-12-16)

#### ♻️ Refactoring

- add generics for isFunction() ([2850048](https://github.com/thi-ng/umbrella/commit/2850048))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.3.0) (2022-10-17)

#### 🚀 Features

- add isTouchEvent() ([7ef2acc](https://github.com/thi-ng/umbrella/commit/7ef2acc))

### [3.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.2.1) (2022-06-11)

#### 🩹 Bug fixes

- update export map (add missing isBigInt()) ([9270de0](https://github.com/thi-ng/umbrella/commit/9270de0))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.2.0) (2022-06-09)

#### 🚀 Features

- add isBigInt(), update pkg/readme ([bb6d833](https://github.com/thi-ng/umbrella/commit/bb6d833))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.1.0) (2021-11-17)

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

### [3.0.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.0.7) (2021-11-10)

#### 🩹 Bug fixes

- add boolean to isPrimitive() ([fde4d2b](https://github.com/thi-ng/umbrella/commit/fde4d2b))

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@3.0.0) (2021-10-12)

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

### [2.9.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.9.6) (2021-04-03)

#### ♻️ Refactoring

- add implementsFunction() generics ([63d78cb](https://github.com/thi-ng/umbrella/commit/63d78cb))

## [2.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.9.0) (2021-02-20)

#### 🚀 Features

- replace isPrototypePolluted() w/ isProtoPath() ([d276b84](https://github.com/thi-ng/umbrella/commit/d276b84))
  - isPrototypePolluted() assumed given string is a single property
    name, but could be a `.` separated lookup path. New function
    checks for that and also supports arrays
  - add tests
- add isIllegalKey() (make public) ([507fc80](https://github.com/thi-ng/umbrella/commit/507fc80))

## [2.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.8.0) (2021-01-10)

#### 🚀 Features

- add isNumericInt/Float() checks ([7e054c1](https://github.com/thi-ng/umbrella/commit/7e054c1))

### [2.7.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.7.9) (2020-09-22)

#### ♻️ Refactoring

- update isNode() ([e988d0d](https://github.com/thi-ng/umbrella/commit/e988d0d))

### [2.7.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.7.3) (2020-07-02)

#### 🩹 Bug fixes

- update isPlainObject() type assertion ([e5ceb7d](https://github.com/thi-ng/umbrella/commit/e5ceb7d))

## [2.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.7.0) (2020-05-14)

#### 🚀 Features

- add isAsyncIterable() ([59ac3a9](https://github.com/thi-ng/umbrella/commit/59ac3a9))

## [2.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.6.0) (2020-03-28)

#### 🚀 Features

- add better type assertion for isTypedArray() ([548ba52](https://github.com/thi-ng/umbrella/commit/548ba52))
- add new string validators ([9d9e8a8](https://github.com/thi-ng/umbrella/commit/9d9e8a8))
  - add isAlpha(), isAlphaNum(), isNumeric()
  - add isASCII(), isPrintableASCII()
  - add isDataURL()
  - add isFloatString(), isIntString()
  - add isHex()

#### 🩹 Bug fixes

- typo ([4e4a6e1](https://github.com/thi-ng/umbrella/commit/4e4a6e1))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.5.0) (2020-01-24)

#### 🚀 Features

- add hasBigInt() ([aa4faed](https://github.com/thi-ng/umbrella/commit/aa4faed))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.4.0) (2019-09-21)

#### 🚀 Features

- add generics to existsAndNotNull() ([bced8b9](https://github.com/thi-ng/umbrella/commit/bced8b9))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.3.0) (2019-08-16)

#### 🚀 Features

- isNil and isHexColorString ([ebaa15e](https://github.com/thi-ng/umbrella/commit/ebaa15e))

#### 🩹 Bug fixes

- test, better naming ([90dce20](https://github.com/thi-ng/umbrella/commit/90dce20))
- better hex string, export, isNil doc ([19b1981](https://github.com/thi-ng/umbrella/commit/19b1981))
- fix vscode autoimport ([8ac6408](https://github.com/thi-ng/umbrella/commit/8ac6408))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.2.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([90515e7](https://github.com/thi-ng/umbrella/commit/90515e7))

#### 🩹 Bug fixes

- isMobile for Chrome iOS ([8216d48](https://github.com/thi-ng/umbrella/commit/8216d48))

### [2.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.1.2) (2019-03-12)

#### 🩹 Bug fixes

- fix [#77](https://github.com/thi-ng/umbrella/issues/77), update & minor optimization isPlainObject() ([47ac88a](https://github.com/thi-ng/umbrella/commit/47ac88a))
  - add/update tests
  - add AUTHORS.md

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.1.0) (2019-02-10)

#### 🚀 Features

- add isPrimitive() ([190701e](https://github.com/thi-ng/umbrella/commit/190701e))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@2.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- update all as arrow fns ([b70a3e1](https://github.com/thi-ng/umbrella/commit/b70a3e1))

### [1.5.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@1.5.4) (2018-06-18)

#### 🩹 Bug fixes

- isOdd() for negative values ([3589e15](https://github.com/thi-ng/umbrella/commit/3589e15))

### [1.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@1.5.1) (2018-04-29)

#### 🩹 Bug fixes

- exclude functions in isArrayLike() ([ac60404](https://github.com/thi-ng/umbrella/commit/ac60404))
- return type isMap() ([76920f7](https://github.com/thi-ng/umbrella/commit/76920f7))

## [1.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@1.5.0) (2018-04-26)

#### 🚀 Features

- add date, map, nan, set checks ([a865f62](https://github.com/thi-ng/umbrella/commit/a865f62))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@1.4.0) (2018-04-08)

#### 🚀 Features

- add hasPerformance() check (performance.now) ([40d706b](https://github.com/thi-ng/umbrella/commit/40d706b))

### [1.3.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@1.3.2) (2018-04-04)

#### 🩹 Bug fixes

- add prototype check for isPlainObject(), add tests ([bffc443](https://github.com/thi-ng/umbrella/commit/bffc443))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@1.3.0) (2018-03-08)

#### 🚀 Features

- add isPromise() & isPromiseLike() ([9900e99](https://github.com/thi-ng/umbrella/commit/9900e99))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@1.2.0) (2018-02-08)

#### 🚀 Features

- add new predicates, refactor existing ([68f8fc2](https://github.com/thi-ng/umbrella/commit/68f8fc2))
  - add: isBlob, isEven, isFile, isInRange, isOdd, isRegExp
  - add: hasMinLength, hasMaxLength
  - update: existsAndNotNull, isArray, isArrayLike

### [1.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@1.1.6) (2018-02-02)

#### ♻️ Refactoring

- isPlainObject() ([9848576](https://github.com/thi-ng/umbrella/commit/9848576))

### [1.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/checks@1.1.1) (2018-01-24)

#### 🚀 Features

- initial re-import as monorepo, update readme files, cleanup imports ([04ff6e9](https://github.com/thi-ng/umbrella/commit/04ff6e9))
