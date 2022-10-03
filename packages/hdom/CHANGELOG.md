# Change Log

- **Last updated**: 2022-10-03T16:07:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [9.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.1.6) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [9.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.1.0) (2021-11-17)

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

### [9.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [9.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [9.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@9.0.0) (2021-10-12)

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

- minor pkg restructure ([61a6592](https://github.com/thi-ng/umbrella/commit/61a6592))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [8.2.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@8.2.14) (2020-12-22)

#### ♻️ Refactoring

- update DiffMode handling ([b8f7d5c](https://github.com/thi-ng/umbrella/commit/b8f7d5c))

### [8.2.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@8.2.13) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [8.2.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@8.2.10) (2020-09-22)

#### ♻️ Refactoring

- update normalizeTree() ([cda40f1](https://github.com/thi-ng/umbrella/commit/cda40f1))
  - extract normalizeChildren()
- simplify normalizeElement() ([b310c61](https://github.com/thi-ng/umbrella/commit/b310c61))

### [8.2.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@8.2.9) (2020-09-13)

#### ♻️ Refactoring

- update imports ([e95ff1e](https://github.com/thi-ng/umbrella/commit/e95ff1e))

## [8.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@8.2.0) (2020-07-02)

#### 🚀 Features

- add RDFa `prefix` attrib support, update xmlns imports ([f0e7460](https://github.com/thi-ng/umbrella/commit/f0e7460))
- update deps, update xmlns import ([99fbae7](https://github.com/thi-ng/umbrella/commit/99fbae7))

## [8.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@8.1.0) (2020-06-28)

#### 🚀 Features

- add support for event listener strings ([db8d350](https://github.com/thi-ng/umbrella/commit/db8d350))
- add support `class` attrib object vals ([074985a](https://github.com/thi-ng/umbrella/commit/074985a))
  - update normalizeElement() class merge logic

### [8.0.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@8.0.18) (2020-04-06)

#### ⏱ Performance improvements

- update event attrib checks ([ab54d3c](https://github.com/thi-ng/umbrella/commit/ab54d3c))
  - replace .indexOf("on") with array-style accessor checks
  - benchmarking shows ~30% improvement

### [8.0.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@8.0.11) (2020-02-25)

#### ♻️ Refactoring

- update imports, internal restruct ([9f31a03](https://github.com/thi-ng/umbrella/commit/9f31a03))

### [8.0.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@8.0.7) (2019-11-09)

#### 🩹 Bug fixes

- fix [#72](https://github.com/thi-ng/umbrella/issues/72), update __skip diff handling & HDOMImplementation ([0071df3](https://github.com/thi-ng/umbrella/commit/0071df3))
  - when a previously skipped element is re-enabled, replace entire sub-tree,
    but do NOT call lifecycle `init()` methods
  - add init arg/flag to HDOMImplementation.createTree() / replaceChild()
  - update DEFAULT_IMPL
  - update normalizeElement()

### [8.0.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@8.0.6) (2019-09-23)

#### 🩹 Bug fixes

- fix [#133](https://github.com/thi-ng/umbrella/issues/133) boolean attrib handling, add more element properties ([c4bf94f](https://github.com/thi-ng/umbrella/commit/c4bf94f))

### [8.0.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@8.0.4) (2019-08-21)

#### ♻️ Refactoring

- update to use new hiccup regex names ([0236ff6](https://github.com/thi-ng/umbrella/commit/0236ff6))
- refactor/simplify diff & dom impls ([20de716](https://github.com/thi-ng/umbrella/commit/20de716))
  - extract diffDeleted()/diffAdded() from diffTree()
  - extract incOffsets()/decOffsets() from diffTree()
  - update diffAttributes()
  - extract maybeInitElement() from createTree()/hydrateTree()
  - extract addChild(), update createElement/createTextElement()
  - update various conditionals

# [8.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@8.0.0) (2019-07-07)

#### 🛑 Breaking changes

- address TS strictNullChecks flag ([d83600a](https://github.com/thi-ng/umbrella/commit/d83600a))
- BREAKING CHANGE: all HDOMImplementation methods now mandatory, update return types

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([7f093b9](https://github.com/thi-ng/umbrella/commit/7f093b9))
  - update return types for HDOMImplementation methods

### [7.2.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@7.2.6) (2019-04-24)

#### ♻️ Refactoring

- replace DEBUG w/ LOGGER ([a37252a](https://github.com/thi-ng/umbrella/commit/a37252a))

### [7.2.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@7.2.5) (2019-04-17)

#### 🩹 Bug fixes

- update removeAttribs ([b17fb17](https://github.com/thi-ng/umbrella/commit/b17fb17))
  - check for attribute first, else treat as element property

### [7.2.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@7.2.4) (2019-04-11)

#### ⏱ Performance improvements

- minor update diffTree() ([f2efaa5](https://github.com/thi-ng/umbrella/commit/f2efaa5))
  - re-order diff state checks to prioritize unchanges results

### [7.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@7.2.3) (2019-04-05)

#### 🩹 Bug fixes

- off-by-one error when updating child offsets after removal ([beef4e9](https://github.com/thi-ng/umbrella/commit/beef4e9))

## [7.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@7.2.0) (2019-03-18)

#### 🚀 Features

- support more input el types in updateValueAttrib() ([8813344](https://github.com/thi-ng/umbrella/commit/8813344))

## [7.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@7.1.0) (2019-02-10)

#### 🚀 Features

- add scrollTop/Left property support in setAttrib() ([895da65](https://github.com/thi-ng/umbrella/commit/895da65))

#### 🩹 Bug fixes

- fix [#72](https://github.com/thi-ng/umbrella/issues/72), update normalizeElement() ([3ed4ea1](https://github.com/thi-ng/umbrella/commit/3ed4ea1))
  - ensure empty elements with `__skip` attrib always have at least 1 child

# [7.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@7.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))
- BREAKING CHANGE: enable multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols

## [6.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@6.1.0) (2018-12-21)

#### 🚀 Features

- add support for event listener options, update readme ([6618c22](https://github.com/thi-ng/umbrella/commit/6618c22))

### [6.0.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@6.0.4) (2018-12-21)

#### 🩹 Bug fixes

- fix [#63](https://github.com/thi-ng/umbrella/issues/63) update removeChild() (IE11) ([9f48a76](https://github.com/thi-ng/umbrella/commit/9f48a76))

### [6.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@6.0.2) (2018-12-16)

#### 🩹 Bug fixes

- life cycle init / release handling ([6d85c62](https://github.com/thi-ng/umbrella/commit/6d85c62))
  - createTree() init handling: call AFTER all children have been created
  - releaseTree(): bind release() calls to component (not tag wrapper)
  - update docs / readme

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@6.0.0) (2018-12-13)

#### 🛑 Breaking changes

- extend & simplify HDOMImplementation, update DEFAULT_IMPL ([6f2e8ee](https://github.com/thi-ng/umbrella/commit/6f2e8ee))
- BREAKING CHANGE: extend & simplify HDOMImplementation
  - update args for HDOMImplementation methods
  - add createElement(), createTextElement() & getElementById() methods
    to HDOMImplementation
  - rename createDOM() => createTree(), make generic
  - rename hydrateDOM() => hydrateTree(), make generic
  - update / fix diffTree() __impl attrib handling:
    only delegate if __impl != current impl
  - update resolveRoot() to require impl arg & delegate

#### 🚀 Features

- add initial __skip ctrl attrib handling in diffTree() ([a4e6736](https://github.com/thi-ng/umbrella/commit/a4e6736))

#### ♻️ Refactoring

- update createTextElement() sig, update docstrings ([fe9a312](https://github.com/thi-ng/umbrella/commit/fe9a312))

### [5.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@5.2.1) (2018-12-08)

#### ♻️ Refactoring

- minor update diff call sites ([c3f6f98](https://github.com/thi-ng/umbrella/commit/c3f6f98))
- update diffTree & diffAttributes ([@thi.ng/diff](https://github.com/thi-ng/umbrella/tree/main/packages/diff) updates) ([e9b067b](https://github.com/thi-ng/umbrella/commit/e9b067b))

## [5.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@5.2.0) (2018-11-07)

#### 🚀 Features

- update auto-deref ctx behavior ([3016116](https://github.com/thi-ng/umbrella/commit/3016116))
  - add `autoDerefKeys` option
  - update docs
  - update tests

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@5.1.0) (2018-11-06)

#### 🚀 Features

- add support for dynamic user context vals ([6a3a873](https://github.com/thi-ng/umbrella/commit/6a3a873))
  - update start() & renderOnce()
  - reformat all sub-modules
  - update docs & tests

### [5.0.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@5.0.3) (2018-09-24)

#### 🩹 Bug fixes

- add DEFAULT_IMPL to re-exports ([#47](https://github.com/thi-ng/umbrella/issues/47)) ([50fa649](https://github.com/thi-ng/umbrella/commit/50fa649))

### [5.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@5.0.1) (2018-09-23)

#### ♻️ Refactoring

- minor refactoring, fix/update docs ([4a2f79b](https://github.com/thi-ng/umbrella/commit/4a2f79b))
  - extract resolveRoot() helper fn
  - update start(), renderOnce()
  - update various doc strings

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@5.0.0) (2018-09-22)

#### 🚀 Features

- add renderOnce() ([5ef9cf0](https://github.com/thi-ng/umbrella/commit/5ef9cf0))

#### ⏱ Performance improvements

- minor updates ([de17db8](https://github.com/thi-ng/umbrella/commit/de17db8))

#### ♻️ Refactoring

- allow HDOMOpts extensions ([6d6fae3](https://github.com/thi-ng/umbrella/commit/6d6fae3))

### [5.0.0-alpha](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@5.0.0-alpha) (2018-09-16)

#### 🚀 Features

- add `.toHiccup()` interface support ([54ba0ce](https://github.com/thi-ng/umbrella/commit/54ba0ce))
  - add `.toHiccup()` type check in `normalizeTree()` and call w/
    user context
- reorg & extend HDOMImplementation ([1ac245f](https://github.com/thi-ng/umbrella/commit/1ac245f))
  - add normalizeTree, hydrateTree & diffTree to HDOMImplementation
  - add HDOMBehaviorAttribs
  - update ComponentAttribs
  - remove `normalize` option from HDOMOpts
    (use `__normalize` attrib instead)
  - update DEFAULT_IMPL, move to default.ts
  - fix embedded fn handling in createDOM() & hydrateDOM()
    (inject user context)
  - add `__impl` support in hydrateDOM()
  - add opt `impl` arg for start()
  BREAKING CHANGES: new names & call signatures for:
  - normalizeTree
  - diffElement => diffTree
  - createDOM
  - hydrateDOM
  - replaceChild
- update normalizeTree, add to HDOMImplementation ([59bb19c](https://github.com/thi-ng/umbrella/commit/59bb19c))
  - update normalizeTree() to check for & use branch-local impl if present
  - add existing normalizeTree to DEFAULT_IMPL
  - update HDOMImplementation interface

#### 🩹 Bug fixes

- delegate diffTree() to branch impl ([6c33901](https://github.com/thi-ng/umbrella/commit/6c33901))
- exclude hdom control attribs in setAttrib() ([0592063](https://github.com/thi-ng/umbrella/commit/0592063))
- minor fix (hydrateDOM) ([e4f780c](https://github.com/thi-ng/umbrella/commit/e4f780c))

#### ⏱ Performance improvements

- update diffTree(), inline node type checks ([382c45c](https://github.com/thi-ng/umbrella/commit/382c45c))
  - add child tracking index table template for diffTree()
  - bail out early if edit distance = 2 and only attribs changed
  - update checks in normalizeTree(), normalizeElement(), createDOM(),
    hydrateDOM(), setAttrib()
  - rename releaseDeep() => releaseTree()
  -
- add opt `__release` attrib to disable releaseDeep() ([2e3fb66](https://github.com/thi-ng/umbrella/commit/2e3fb66))

#### ♻️ Refactoring

- export diff related fns ([ebfcf15](https://github.com/thi-ng/umbrella/commit/ebfcf15))
- update custom equiv() ([d9af2e5](https://github.com/thi-ng/umbrella/commit/d9af2e5))
- use custom equiv also for diffAttributes() ([bde18d5](https://github.com/thi-ng/umbrella/commit/bde18d5))
- trial run of custom equiv() impl for diffTree() ([96beaf3](https://github.com/thi-ng/umbrella/commit/96beaf3))

### [4.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@4.0.5) (2018-09-10)

#### 🚀 Features

- generalize diffElement() ([#4](https://github.com/thi-ng/umbrella/issues/4)) ([525d90d](https://github.com/thi-ng/umbrella/commit/525d90d))
  - add HDOMOps interface
  - add DEFAULT_OPS implementation
  - update diffElement() & diffAttributes() to delegate to ops
  - refactor diffElement() to be more legible
  - update createDOM(), add support for `__ops` node attrib
    to use custom ops for subtrees
  - add getChild(), replaceChild(), setContent()
- add optional support for blocking normalize & diff ([5cb4350](https://github.com/thi-ng/umbrella/commit/5cb4350))
  - add `__normalize` attrib to stop normalization of subtree
  - add `__diff` attrib to stop diffing of subtree

#### ♻️ Refactoring

- rename HDOMOps => HDOMImplementation, add docs ([cc73c76](https://github.com/thi-ng/umbrella/commit/cc73c76))
  - rename `__ops` attrib => `__impl`

### [4.0.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@4.0.3) (2018-09-01)

#### 🩹 Bug fixes

- fix local import ([e66a492](https://github.com/thi-ng/umbrella/commit/e66a492))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@4.0.0) (2018-08-31)

#### 🛑 Breaking changes

- add DOM hydration support (SSR), update start() ([#39](https://github.com/thi-ng/umbrella/issues/39)) ([9f8010d](https://github.com/thi-ng/umbrella/commit/9f8010d))
  - add HDOMOpts interface
  - add hydrateDOM()
  - update start() to support hydration
  - re-use migrated NO_SPANS const from hiccup
  - switch all fn to arrow fns
- BREAKING CHANGE: start() args now as options object

#### 🚀 Features

- update HDOMOpts & start() ([5e74a9c](https://github.com/thi-ng/umbrella/commit/5e74a9c))
  - add `normalize` option
  - simplify `start()`

#### ♻️ Refactoring

- minor update HDOMOpts & start() ([d55d930](https://github.com/thi-ng/umbrella/commit/d55d930))
  - rename `parent` option => `root`

### [3.0.33](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@3.0.33) (2018-08-24)

#### ♻️ Refactoring

- remove [@thi.ng/iterators](https://github.com/thi-ng/umbrella/tree/main/packages/iterators) dependency ([1434b0e](https://github.com/thi-ng/umbrella/commit/1434b0e))
- replace SEMAPHORE const w/ [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) def ([9b443cb](https://github.com/thi-ng/umbrella/commit/9b443cb))

### [3.0.32](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@3.0.32) (2018-08-01)

#### ♻️ Refactoring

- cleanup imports ([1467273](https://github.com/thi-ng/umbrella/commit/1467273))

### [3.0.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@3.0.28) (2018-07-10)

#### 🩹 Bug fixes

- always update "value" attrib last in diffAttributes() ([126103b](https://github.com/thi-ng/umbrella/commit/126103b))
  - fixes issue when patching <input type=range> elements
    with changed min/max limits

### [3.0.23](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@3.0.23) (2018-05-15)

#### 🩹 Bug fixes

- delay init() lifecycle call to ensure children are available ([2482b16](https://github.com/thi-ng/umbrella/commit/2482b16))
  - update diffElement()

### [3.0.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@3.0.21) (2018-05-14)

#### 🩹 Bug fixes

- component obj lifecycle method thisArg handling ([ade96f8](https://github.com/thi-ng/umbrella/commit/ade96f8))

### [3.0.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@3.0.16) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

### [3.0.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@3.0.15) (2018-05-09)

#### 🩹 Bug fixes

- native boolean attrib handling (e.g. "checked") ([68ea086](https://github.com/thi-ng/umbrella/commit/68ea086))

### [3.0.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@3.0.14) (2018-05-01)

#### 🩹 Bug fixes

- boolean attrib reset/removal ([a93cb98](https://github.com/thi-ng/umbrella/commit/a93cb98))

### [3.0.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@3.0.13) (2018-04-30)

#### ⏱ Performance improvements

- only build linear diff edit log ([7a543a5](https://github.com/thi-ng/umbrella/commit/7a543a5))

### [3.0.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@3.0.12) (2018-04-29)

#### ⏱ Performance improvements

- update event handling in diffAttributes() ([31ec3af](https://github.com/thi-ng/umbrella/commit/31ec3af))
  - avoid replacing element if changed event handlers
  - update removeAttribs()

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@3.0.1) (2018-04-09)

#### ⏱ Performance improvements

- intern imported checks, update normalizeTree(), add docs, fix tests ([2a91e30](https://github.com/thi-ng/umbrella/commit/2a91e30))
  - avoid `path` copies in normalizeTree()
  - fix `render` life cycle return val handling
    (must be array for init/release to be called)

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@3.0.0) (2018-04-08)

#### 🛑 Breaking changes

- fix [#13](https://github.com/thi-ng/umbrella/issues/13), add support for user context and pass to components ([70cfe06](https://github.com/thi-ng/umbrella/commit/70cfe06))
  - add optional context arg for start()
  - update normalizeTree(), diffElement() to inject provided context for
    all component functions and objects w/ lifecycle methods
  - context is always injected as 1st arg to comp fns, with only exception of
    `init` lifecycle hook, where (for perf reasons) the created DOM element
    is passed as the first arg (context 2nd)
  - various minor optimizations
  - add doc strings
- BREAKING CHANGE: component functions & lifecycle hooks now receive user
  context object as their first arg. All components accepting arguments must
  be updated, but can potentially be simplified at the same time.

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@2.3.0) (2018-03-21)

#### 🚀 Features

- update error handling, add [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) dep ([f5173f1](https://github.com/thi-ng/umbrella/commit/f5173f1))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@2.2.0) (2018-03-14)

#### 🚀 Features

- add auto deref() support ([0fe6c44](https://github.com/thi-ng/umbrella/commit/0fe6c44))
  - top-level or child element objects with `deref()` impl will be automatically resolved

#### ♻️ Refactoring

- disable deref() for attrib objects ([28b0b57](https://github.com/thi-ng/umbrella/commit/28b0b57))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@2.1.0) (2018-03-05)

#### 🚀 Features

- add support for frame skipping, add docs ([a200beb](https://github.com/thi-ng/umbrella/commit/a200beb))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hdom@2.0.0) (2018-03-03)

#### 🛑 Breaking changes

- update readme ([79e1b09](https://github.com/thi-ng/umbrella/commit/79e1b09))
- BREAKING CHANGE: rename package hiccup-dom => hdom

#### ♻️ Refactoring

- rename package hiccup-dom => hdom ([f1c5315](https://github.com/thi-ng/umbrella/commit/f1c5315))
