# Change Log

Last updated: 2021-11-17T23:24:59Z

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code changes and/or
version bumps of transitive dependencies.

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@4.2.0) (2021-11-17)

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

### [4.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@4.1.6) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [4.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@4.1.1) (2021-10-27)

#### 🩹 Bug fixes

- re-enable `filter` attrib in conversion ([7c75fbe](https://github.com/thi-ng/umbrella/commit/7c75fbe))
  - update convertAttrib() to treat filter attrib as normal attrib

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@4.1.0) (2021-10-25)

#### 🚀 Features

- update numericAttribs() ([bf06b65](https://github.com/thi-ng/umbrella/commit/bf06b65))
  - add `DEFAULT_NUMERIC_IDS` to always include in numericAttribs()
  - now called automatically by fattribs(), no more explicit calls needed

### [4.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@4.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@4.0.0) (2021-10-12)

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

#### 🩹 Bug fixes

- check values passed to numericAttribs are actually numeric ([dbd51c3](https://github.com/thi-ng/umbrella/commit/dbd51c3))

#### ♻️ Refactoring

- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

## [3.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.8.0) (2021-08-22)

#### 🚀 Features

- add numericAttribs(), fix svg() ([d6cb992](https://github.com/thi-ng/umbrella/commit/d6cb992))
  - update svg() to format some attribs using ff()

### [3.7.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.7.31) (2021-08-17)

#### ♻️ Refactoring

- single return in svg() ([a770847](https://github.com/thi-ng/umbrella/commit/a770847))

### [3.7.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.7.6) (2021-02-20)

#### ♻️ Refactoring

- update color attrib resolution/conversion ([5415760](https://github.com/thi-ng/umbrella/commit/5415760))
- update fcolor() (resolveAsCss()) ([f58ca90](https://github.com/thi-ng/umbrella/commit/f58ca90))

## [3.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.7.0) (2021-01-02)

#### 🚀 Features

- update svg(), add convert attrib ([cd67a09](https://github.com/thi-ng/umbrella/commit/cd67a09))
  - update attrib handling and call convertTree() if requested
  - update docstrings

### [3.6.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.6.5) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [3.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.6.0) (2020-09-13)

#### 🚀 Features

- update ff() formatter (int check) ([609d278](https://github.com/thi-ng/umbrella/commit/609d278))
  - add integer check and use as is if true (improves result filesize)
- fix/update convertTree() ([997dbf6](https://github.com/thi-ng/umbrella/commit/997dbf6))
  - add support for child elements within shapes (do not traverse!)
  - treat <a> as group-like element (do traverse children!)
  - add support for nullish elements in shape tree (skip)
- allow child elements in shapes ([7447ee1](https://github.com/thi-ng/umbrella/commit/7447ee1))
  - update all shape functions to allow optional child elements
    (e.g. required for adding <animate>, <title>, <desc> etc.)
- fix [#194](https://github.com/thi-ng/umbrella/issues/194), add `baseline` support ([f8d4a38](https://github.com/thi-ng/umbrella/commit/f8d4a38))
  - add BASE_LINE value mappings
  - update convertAttrib()

## [3.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.5.0) (2020-07-02)

#### 🚀 Features

- update deps, update xmlns import ([aab66bb](https://github.com/thi-ng/umbrella/commit/aab66bb))

#### 🩹 Bug fixes

- update XML ns imports ([32bd8d7](https://github.com/thi-ng/umbrella/commit/32bd8d7))

### [3.4.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.4.2) (2020-02-25)

#### ♻️ Refactoring

- update imports ([eda42ed](https://github.com/thi-ng/umbrella/commit/eda42ed))
- fix [#197](https://github.com/thi-ng/umbrella/issues/197), update points() ([89f6c36](https://github.com/thi-ng/umbrella/commit/89f6c36))

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.4.0) (2020-01-24)

#### 🚀 Features

- add packedPoints(), update convertTree() ([67be25e](https://github.com/thi-ng/umbrella/commit/67be25e))

### [3.3.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.3.2) (2019-11-09)

#### 🩹 Bug fixes

- fix [#142](https://github.com/thi-ng/umbrella/issues/142), add missing exports (ellipse, image) ([1bd7f64](https://github.com/thi-ng/umbrella/commit/1bd7f64))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.3.0) (2019-08-21)

#### 🚀 Features

- update polyline(), add fill: none default ([cff9e30](https://github.com/thi-ng/umbrella/commit/cff9e30))

#### 🩹 Bug fixes

- convertAttrib() arg order ([8b48a27](https://github.com/thi-ng/umbrella/commit/8b48a27))

#### ♻️ Refactoring

- update points(), extract buildShape() ([e01fae3](https://github.com/thi-ng/umbrella/commit/e01fae3))
- update convertAttribs ([9cc6849](https://github.com/thi-ng/umbrella/commit/9cc6849))
- update fcolor(), extract buildTransform() ([101bb94](https://github.com/thi-ng/umbrella/commit/101bb94))
  - re-use resolveAsCSS()

### [3.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.2.2) (2019-07-12)

#### 🩹 Bug fixes

- update points(), use centered rects ([c7d6aaa](https://github.com/thi-ng/umbrella/commit/c7d6aaa))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.2.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([3143141](https://github.com/thi-ng/umbrella/commit/3143141))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([9a1b92e](https://github.com/thi-ng/umbrella/commit/9a1b92e))

### [3.1.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.1.7) (2019-02-27)

#### 🩹 Bug fixes

- update convert() image (new arg order in hdom-canvas) ([b206cff](https://github.com/thi-ng/umbrella/commit/b206cff))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.1.0) (2019-01-22)

#### 🚀 Features

- add color dep, add attrib conversion for all elements ([7f6011e](https://github.com/thi-ng/umbrella/commit/7f6011e))
  - fix "rect" size handling in convertTree(), revert back to individual
    width/height values
  - add [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/main/packages/color) dependency
  - add fattrib() & fcolor() helpers
  - update & move convertTransforms => ftransforms()
  - update attrib handling for all elements

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@3.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### 🚀 Features

- add ellipse shape type, update convert() ([a39811c](https://github.com/thi-ng/umbrella/commit/a39811c))

#### 🩹 Bug fixes

- convert path arc segment axis theta to degrees ([370f928](https://github.com/thi-ng/umbrella/commit/370f928))

### [2.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@2.0.5) (2018-11-06)

#### 🚀 Features

- add toHiccup() support in convertTree() ([e197f90](https://github.com/thi-ng/umbrella/commit/e197f90))

#### ♻️ Refactoring

- update convertTransforms(), update formatting ([3713c02](https://github.com/thi-ng/umbrella/commit/3713c02))

### [2.0.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@2.0.4) (2018-10-21)

#### 🩹 Bug fixes

- fix arc segment handling ([85426d9](https://github.com/thi-ng/umbrella/commit/85426d9))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@1.0.0) (2018-05-13)

#### 🛑 Breaking changes

- resolve [#19](https://github.com/thi-ng/umbrella/issues/19), update readme, add invocation notes ([dc77540](https://github.com/thi-ng/umbrella/commit/dc77540))
- BREAKING CHANGE: technically identical to previous version, however
  due to breaking changes and new context support in [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/main/packages/hiccup),
  SVG functions MUST be invoked directly now and do not support lazy
  evaluation anymore. see notice in readme.
- rename svgdoc => svg ([396faec](https://github.com/thi-ng/umbrella/commit/396faec))
- BREAKING CHANGE: rename svgdoc => svg

### [0.2.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@0.2.11) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@0.2.1) (2018-04-09)

#### 🩹 Bug fixes

- path(), update add null check for points() ([b9d9a49](https://github.com/thi-ng/umbrella/commit/b9d9a49))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-svg@0.2.0) (2018-04-08)

#### 🚀 Features

- re-add svg fns as new [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/main/packages/hiccup-svg) package ([afccabd](https://github.com/thi-ng/umbrella/commit/afccabd))
  - split existing source file into (mostly) single-fn modules
  - minor refactoring
