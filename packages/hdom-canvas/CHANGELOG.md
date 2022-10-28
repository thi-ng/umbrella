# Change Log

- **Last updated**: 2022-10-28T19:08:39Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@4.1.0) (2021-11-17)

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

### [4.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@4.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@4.0.0) (2021-10-12)

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

- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [3.0.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@3.0.24) (2020-12-22)

#### ♻️ Refactoring

- update DiffMode handling ([ae8e3cf](https://github.com/thi-ng/umbrella/commit/ae8e3cf))

### [3.0.23](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@3.0.23) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@3.0.0) (2020-06-05)

#### 🛑 Breaking changes

- remove obsolete files ([41c8a9d](https://github.com/thi-ng/umbrella/commit/41c8a9d))
- BREAKING CHANGE: tree traversal & rendering parts extracted to new
  package [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/main/packages/hiccup-canvas)
  From now on, this package only contains the canvas component wrapper & hdom related interface implementations, allowing canvas rendering parts to be used separately.

### [2.4.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@2.4.4) (2020-02-25)

#### ♻️ Refactoring

- update imports ([1aa1083](https://github.com/thi-ng/umbrella/commit/1aa1083))

### [2.4.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@2.4.2) (2020-01-24)

#### 🩹 Bug fixes

- update points() to draw centered rects ([43d0aef](https://github.com/thi-ng/umbrella/commit/43d0aef))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@2.4.0) (2019-11-09)

#### 🚀 Features

- add `packedPoints` shape type, update readme ([292611a](https://github.com/thi-ng/umbrella/commit/292611a))
  - minor refactor point()/drawPoints()

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@2.3.0) (2019-09-21)

#### 🚀 Features

- add clip attrib support for paths ([2c2909d](https://github.com/thi-ng/umbrella/commit/2c2909d))

### [2.2.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@2.2.4) (2019-08-21)

#### ♻️ Refactoring

- update resolveColor to use resolveAsCSS ([22ab80e](https://github.com/thi-ng/umbrella/commit/22ab80e))
- improve re-use in points(), polygon/polyline() ([b1cb63b](https://github.com/thi-ng/umbrella/commit/b1cb63b))
- update draw state handling ([d5c0738](https://github.com/thi-ng/umbrella/commit/d5c0738))
- split into sep files, expose direct draw fns ([4f0a220](https://github.com/thi-ng/umbrella/commit/4f0a220))
  - all fns in /draw can be used w/o hdom trees (direct canvas shape drawing)
  - make implicit deps explicit

### [2.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@2.2.2) (2019-08-16)

#### 🩹 Bug fixes

- fix attrib default vals, add missing weight val ([f09677f](https://github.com/thi-ng/umbrella/commit/f09677f))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@2.2.0) (2019-07-31)

#### 🚀 Features

- add setTransform attrib, update docs/readme ([eed3de2](https://github.com/thi-ng/umbrella/commit/eed3de2))
  - delegates to canvas 2D context setTransform() to
    override current tx (rather than `transform` which
    concatenates given matrix with existing one

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@2.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([998f5a1](https://github.com/thi-ng/umbrella/commit/998f5a1))

#### ♻️ Refactoring

- TS strictNullChecks ([b79d0c6](https://github.com/thi-ng/umbrella/commit/b79d0c6))

### [2.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@2.0.5) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@2.0.0) (2019-02-27)

#### 🛑 Breaking changes

- update image handling, add image/atlas blitting support ([bc59d30](https://github.com/thi-ng/umbrella/commit/bc59d30))
- BREAKING CHANGE: new image args/attribs & arg order, see readme

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@1.1.0) (2019-01-22)

#### 🚀 Features

- add color dep, update color attrib handling ([1d92c8c](https://github.com/thi-ng/umbrella/commit/1d92c8c))
  - add support for non-string color attribs
  - update readme

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))
- BREAKING CHANGE: enable multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols

#### 🚀 Features

- add ellipse() / ellipticArc(), update readme ([9a50769](https://github.com/thi-ng/umbrella/commit/9a50769))

### [0.1.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@0.1.15) (2018-12-13)

#### ♻️ Refactoring

- update HDOMImplementation, add __skip support, reformat ([43327c9](https://github.com/thi-ng/umbrella/commit/43327c9))

### [0.1.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@0.1.13) (2018-12-08)

#### ⏱ Performance improvements

- update diffTree() to compute edit dist only ([899941f](https://github.com/thi-ng/umbrella/commit/899941f))

#### ♻️ Refactoring

- update diffArray call site ([a7e9def](https://github.com/thi-ng/umbrella/commit/a7e9def))

### [0.1.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@0.1.12) (2018-11-26)

#### 🩹 Bug fixes

- actually pass maxWidth argument to text function ([97965d8](https://github.com/thi-ng/umbrella/commit/97965d8))

### [0.1.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@0.1.7) (2018-10-21)

#### ♻️ Refactoring

- update points() to accept iterables ([b31b480](https://github.com/thi-ng/umbrella/commit/b31b480))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@0.1.0) (2018-09-22)

#### ♻️ Refactoring

- switch canvas back to lifecycle object form ([09a821b](https://github.com/thi-ng/umbrella/commit/09a821b))
  - this allows users to augment the component with `init` & `release`
    lifecycle methods if needed...
- add _serialize control attrib to root group ([53a1d2c](https://github.com/thi-ng/umbrella/commit/53a1d2c))

### [0.1.0-alpha](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom-canvas@0.1.0-alpha) (2018-09-16)

#### 🚀 Features

- update canvas component & diffTree impl, update docs ([74547aa](https://github.com/thi-ng/umbrella/commit/74547aa))
- add HDPI auto-adjustment, update docs ([5de0255](https://github.com/thi-ng/umbrella/commit/5de0255))
  - replace canvas fn with component object w/ life cycle methods
  - if HDPI, inject CSS width/height props and pre-scale drawing ctx
- add warning msg for hydrateTree() impl ([adaaa7a](https://github.com/thi-ng/umbrella/commit/adaaa7a))
- add `.toHiccup()` interface support ([8ecdd13](https://github.com/thi-ng/umbrella/commit/8ecdd13))
  - add `.toHiccup()` type check in `normalizeTree()` and call w/
    user context
- update points() to use circle or rect shapes ([d412269](https://github.com/thi-ng/umbrella/commit/d412269))
- add `defs` node/group type ([de61c21](https://github.com/thi-ng/umbrella/commit/de61c21))
  - in preparation for easier conversion to SVG-hiccup
- add new shape types, add canvas attribs, refactor ([6496e47](https://github.com/thi-ng/umbrella/commit/6496e47))
  - add `points` shapetype for optimized point drawing (rects)
  - add arc segment support for `path`
  - refactor rounded rects to use arc segments
  - add `clear` boolean attrib to (optionally) disable canvas clearing
  - extract walk() from drawTree()
- fix [#43](https://github.com/thi-ng/umbrella/issues/43), add gradient support ([81fe154](https://github.com/thi-ng/umbrella/commit/81fe154))
  - add "linearGradient"/"radialGradient" shape types
  - add defLinearGradient() & defRadialGradient()
  - update mergeState(), restoreState() & setAttrib()
- add rounded rect option (as path) ([764373a](https://github.com/thi-ng/umbrella/commit/764373a))
  - create path if opt radius arg is given for `["rect"...]`
- add canvas-specific normalizeTree() impl ([1d24a16](https://github.com/thi-ng/umbrella/commit/1d24a16))
  - update canvas component hdom control attribs
  - update createTree() (remove fn & iterator checks,
    moved to normalizeTree())
  - minor refactoring
- add path shape type, embedded fn & iterator handling ([82cd938](https://github.com/thi-ng/umbrella/commit/82cd938))
- implement drawing state inheritance & restoration ([ccbf53c](https://github.com/thi-ng/umbrella/commit/ccbf53c))
  - add mergeState() & restoreState() to apply & undo only edited attribs
  - add CTX_ATTRIBS alias mappings & DEFAULTS
  - rename beginShape() => applyTransform()
  - rename createTree() => drawTree()
  - remove export flags from shape fns
  - add [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) dep
- add more shapes/prims, update transform handling ([d3acb70](https://github.com/thi-ng/umbrella/commit/d3acb70))
  - add `line`, `hline`, `vline`, `arc` & `img` prims
  - update beginShape() to support `translate`, `rotate`, `scale` attribs
    and return boolean if context needs restoring later
  - update endShape()
  - optimize repeated property lookups
  - add [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/main/packages/checks) dep

#### 🩹 Bug fixes

- update __normalize handling, rename fns ([a52f83c](https://github.com/thi-ng/umbrella/commit/a52f83c))
  - update canvas() component fn
  - rename drawTree() => createTree()
  - update releaseTree() call sites
  - remove warning from hydrateTree() (just do nothing)

#### ⏱ Performance improvements

- inline type checks, update deps & readme ([ae4b621](https://github.com/thi-ng/umbrella/commit/ae4b621))

#### ♻️ Refactoring

- swap `img` args to be more consistent w/ others ([c20b24a](https://github.com/thi-ng/umbrella/commit/c20b24a))
- update attrib aliases ([5aa9d46](https://github.com/thi-ng/umbrella/commit/5aa9d46))
- update to reflect hdom api changes ([81a39ba](https://github.com/thi-ng/umbrella/commit/81a39ba))
- update canvas component, add docs ([1cfad51](https://github.com/thi-ng/umbrella/commit/1cfad51))
