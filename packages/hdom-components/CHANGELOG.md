# Change Log

- **Last updated**: 2022-07-19T15:36:12Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@5.1.0) (2021-11-17)

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

### [5.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@5.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@5.0.0) (2021-10-12)

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

- dedupe toggle() internals ([4b09d0e](https://github.com/thi-ng/umbrella/commit/4b09d0e))
- update imports (transducers) ([4707563](https://github.com/thi-ng/umbrella/commit/4707563))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [4.0.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@4.0.17) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@4.0.0) (2020-06-07)

#### 🛑 Breaking changes

- remove adaptDPI() ([2b89ad4](https://github.com/thi-ng/umbrella/commit/2b89ad4))
- BREAKING CHANGE: re-use adaptDPI() from new [@thi.ng/adapt-dpi](https://github.com/thi-ng/umbrella/tree/main/packages/adapt-dpi) pkg
  - update deps

### [3.2.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@3.2.9) (2020-05-14)

#### ♻️ Refactoring

- remove obsolete pager defaults ([f198835](https://github.com/thi-ng/umbrella/commit/f198835))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@3.2.0) (2020-03-06)

#### 🚀 Features

- import slideToggleDot/Rect() components ([a2d0158](https://github.com/thi-ng/umbrella/commit/a2d0158))

#### 🩹 Bug fixes

- fix total size calc in slideToggleRect() ([8f58b09](https://github.com/thi-ng/umbrella/commit/8f58b09))

### [3.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@3.1.10) (2020-02-25)

#### ♻️ Refactoring

- update imports ([b94f90b](https://github.com/thi-ng/umbrella/commit/b94f90b))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@3.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([6233ba2](https://github.com/thi-ng/umbrella/commit/6233ba2))

#### 🩹 Bug fixes

- update CanvasHandler args ([080411f](https://github.com/thi-ng/umbrella/commit/080411f))

#### ♻️ Refactoring

- TS strictNullChecks ([112f41e](https://github.com/thi-ng/umbrella/commit/112f41e))

### [3.0.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@3.0.17) (2019-04-16)

#### 🩹 Bug fixes

- `this` handling in CanvasHandlers ([f104b64](https://github.com/thi-ng/umbrella/commit/f104b64))
  - call all given handlers as method, not as standalone fn

### [3.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@3.0.9) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@3.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))
- BREAKING CHANGE: enable multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@2.4.0) (2018-12-14)

#### 🚀 Features

- merge button & button group attribs ([da441c1](https://github.com/thi-ng/umbrella/commit/da441c1))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@2.3.0) (2018-12-13)

#### 🚀 Features

- add FPS counter & sparkline components, update deps ([ebd3380](https://github.com/thi-ng/umbrella/commit/ebd3380))
  - add mergeAttribs() helper

#### ♻️ Refactoring

- emit int coords for sparkline ([73a298d](https://github.com/thi-ng/umbrella/commit/73a298d))

### [2.2.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@2.2.11) (2018-10-17)

#### 🩹 Bug fixes

- add Canvas2DContextAttributes (removed in TS3.1) ([775cc8a](https://github.com/thi-ng/umbrella/commit/775cc8a))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@2.2.0) (2018-08-27)

#### 🚀 Features

- add HDPI adaptation helper for canvas comps ([135d6f1](https://github.com/thi-ng/umbrella/commit/135d6f1))
  - add adaptDPI() and automatically call from init()

#### 🩹 Bug fixes

- call canvas update from init() ([b25edbe](https://github.com/thi-ng/umbrella/commit/b25edbe))
  - previously update() was only called from 2nd frame onward

### [2.1.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@2.1.12) (2018-08-24)

#### ♻️ Refactoring

- update/replace deps (iterators => transducers) ([c17cb08](https://github.com/thi-ng/umbrella/commit/c17cb08))

### [2.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@2.1.1) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))
- add ButtonGroup type alias ([b4476cb](https://github.com/thi-ng/umbrella/commit/b4476cb))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@2.1.0) (2018-05-09)

#### 🚀 Features

- add buttonGroup ([c0950d6](https://github.com/thi-ng/umbrella/commit/c0950d6))
- add notification component ([a11803c](https://github.com/thi-ng/umbrella/commit/a11803c))
- add button component ([cef3c6a](https://github.com/thi-ng/umbrella/commit/cef3c6a))
- add title component ([f9a2daf](https://github.com/thi-ng/umbrella/commit/f9a2daf))
- add pager component, add [@thi.ng/iterators](https://github.com/thi-ng/umbrella/tree/main/packages/iterators) dep ([efb288d](https://github.com/thi-ng/umbrella/commit/efb288d))

#### ♻️ Refactoring

- remove CanvasOpts, update re-exports ([cefb199](https://github.com/thi-ng/umbrella/commit/cefb199))
- update notification & appLink comps ([4f8e7ba](https://github.com/thi-ng/umbrella/commit/4f8e7ba))
- update button args ([ec41eb9](https://github.com/thi-ng/umbrella/commit/ec41eb9))
- make pager more customizable ([334a4d2](https://github.com/thi-ng/umbrella/commit/334a4d2))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@2.0.0) (2018-04-08)

#### 🛑 Breaking changes

- update dropdown components ([0873832](https://github.com/thi-ng/umbrella/commit/0873832))
- BREAKING CHANGE: add hdom context arg as first arg to `dropdown` and
  `groupedDropdown`
- update canvas handlers, add webgl2 version ([7c88a3f](https://github.com/thi-ng/umbrella/commit/7c88a3f))
  - add CanvasHandlers interface
  - update canvas component to pass component args to handlers
  - add/compute `time` arg (in addition to `frame`)
  - add support for `release` handlers to cleanup webgl resources
  - add `canvasWebGL2`
  - add/update docs
- BREAKING CHANGE: canvas user handlers passed as object and taking
  different / more args
- remove svg, update canvas (hdom context support) ([86d1f0d](https://github.com/thi-ng/umbrella/commit/86d1f0d))
  - remove entire svg.ts
  - remove [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/main/packages/hiccup) dependency
  - update readme
- BREAKING CHANGE: SVG functionality has been moved to new
  [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/main/packages/hiccup-svg) package. Canvas component user fns have new args

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-components@1.1.0) (2018-03-29)

#### 🚀 Features

- add svg line() ([6cbacec](https://github.com/thi-ng/umbrella/commit/6cbacec))
