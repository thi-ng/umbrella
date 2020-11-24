# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.1.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@4.1.21...@thi.ng/atom@4.1.22) (2020-11-24)

**Note:** Version bump only for package @thi.ng/atom





## [4.1.21](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@4.1.20...@thi.ng/atom@4.1.21) (2020-09-22)

**Note:** Version bump only for package @thi.ng/atom





## [4.1.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@4.1.19...@thi.ng/atom@4.1.20) (2020-09-13)

**Note:** Version bump only for package @thi.ng/atom





## [4.1.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@4.1.18...@thi.ng/atom@4.1.19) (2020-08-28)

**Note:** Version bump only for package @thi.ng/atom





## [4.1.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@4.1.17...@thi.ng/atom@4.1.18) (2020-08-17)

**Note:** Version bump only for package @thi.ng/atom





## [4.1.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@4.1.16...@thi.ng/atom@4.1.17) (2020-08-16)

**Note:** Version bump only for package @thi.ng/atom





# [4.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@4.0.0...@thi.ng/atom@4.1.0) (2020-04-01)


### Features

* **atom:** protect Transacted against out-of-phase updates ([675a25b](https://github.com/thi-ng/umbrella/commit/675a25b50af563fc3b3093a2484da5aac9095a5f))





# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@3.1.8...@thi.ng/atom@4.0.0) (2020-03-28)


### Bug Fixes

* **atom:** fix defViewUnsafe() type inference ([bb5593a](https://github.com/thi-ng/umbrella/commit/bb5593a6bfeafbfdd8209fa707368634ea30fc28))


### Code Refactoring

* **atom:** update path value inference handling ([8c2aab2](https://github.com/thi-ng/umbrella/commit/8c2aab2f702803245d384b21f0e8c149138f73cd))


### Features

* **atom:** add typechecking for resetIn(), swapIn() impls ([f114e10](https://github.com/thi-ng/umbrella/commit/f114e10a5d8736d9cfd70b32dd5cbbaa503eeadb))
* **atom:** update types, API for supporting type-checked & unchecked paths ([82948b8](https://github.com/thi-ng/umbrella/commit/82948b8dc316ba402b2124cd7263c47e8dc7d2eb))


### BREAKING CHANGES

* **atom:** update IReset, ISwap, SwapFn generics

- use PathVal & OptPathVal for value type inference
* **atom:** update types, API for supporting type-checked & unchecked paths

- support path type checking for upto 8 levels (before falling back to `any`)
- update `resetIn()` / `swapIn()` impls in all types to expect type-checked paths
- add `resetInUnsafe()` / `swapInUnsafe()` for string-based / unchecked paths
- remove support for non-atom-like Cursor parent states
- simplify Cursor ctor
- remove `IViewable` interface and `.addView()` impls (use `defView()` instead)
- remove `ViewTransform` type alias
- add factory fns for typed paths:
  - defAtom()
  - defCursor()
  - defHistory()
  - defTransacted()
  - defView()
- add factory fns for untyped paths:
  - defCursorUnsafe()
  - defViewUnsafe()
* **atom:** add typechecking for resetIn(), swapIn() impls

The more stricter method signatures **could** lead to breaking changes
in more lax existing code bases





# [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@3.0.4...@thi.ng/atom@3.1.0) (2019-09-21)

### Features

* **atom:** add Transacted wrapper & tests ([8aaf6e6](https://github.com/thi-ng/umbrella/commit/8aaf6e6))
* **atom:** update Transacted watch ID handling, update tests, readme ([93d9e1d](https://github.com/thi-ng/umbrella/commit/93d9e1d))

# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@2.0.12...@thi.ng/atom@3.0.0) (2019-07-07)

### Code Refactoring

* **atom:** TS strictNullChecks ([493ea57](https://github.com/thi-ng/umbrella/commit/493ea57))

### Features

* **atom:** enable TS strict compiler flags (refactor) ([c5d2853](https://github.com/thi-ng/umbrella/commit/c5d2853))

### BREAKING CHANGES

* **atom:** IView & IHistory methods can return undefined

- Atom ctor requires an initial state now

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@1.5.8...@thi.ng/atom@2.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

<a name="1.5.3-alpha.1"></a>
## [1.5.3-alpha.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@1.5.3-alpha.0...@thi.ng/atom@1.5.3-alpha.1) (2018-09-17)

### Bug Fixes

* **atom:** add .value getter to IView ([3e647a1](https://github.com/thi-ng/umbrella/commit/3e647a1))

<a name="1.5.0"></a>
# [1.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@1.4.7...@thi.ng/atom@1.5.0) (2018-08-27)

### Features

* **atom:** add .value accessor aliases (for deref()/reset()) ([a0cbd2b](https://github.com/thi-ng/umbrella/commit/a0cbd2b))

<a name="1.4.0"></a>
# [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@1.3.13...@thi.ng/atom@1.4.0) (2018-05-30)

### Features

* **atom:** add INotify impl for History ([9422598](https://github.com/thi-ng/umbrella/commit/9422598))
* **atom:** provide prev/curr states to history event listeners ([7ac6227](https://github.com/thi-ng/umbrella/commit/7ac6227))

<a name="1.3.0"></a>
# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@1.2.5...@thi.ng/atom@1.3.0) (2018-04-15)

### Features

* **atom:** update History.record(), add IHistory interface ([cf42260](https://github.com/thi-ng/umbrella/commit/cf42260))

<a name="1.2.0"></a>
# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@1.1.0...@thi.ng/atom@1.2.0) (2018-03-21)

### Features

* **atom:** add CursorOpts and cursor validation, update ctor, add tests ([3b1d563](https://github.com/thi-ng/umbrella/commit/3b1d563))
* **atom:** add optional validation predicate for Atom, add tests ([bae1647](https://github.com/thi-ng/umbrella/commit/bae1647))
* **atom:** consider parent validators in History update fns ([d93940a](https://github.com/thi-ng/umbrella/commit/d93940a))

<a name="1.1.0"></a>
# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@1.0.3...@thi.ng/atom@1.1.0) (2018-03-18)

### Features

* **atom:** add optional support for eager views, update tests/readme ([c0ec274](https://github.com/thi-ng/umbrella/commit/c0ec274))

<a name="1.0.0"></a>
# 1.0.0 (2018-03-17)

### Documentation

* **atom:** extract @thi.ng/paths & @thi.ng/interceptors functionality ([1273efb](https://github.com/thi-ng/umbrella/commit/1273efb))

### BREAKING CHANGES

* **atom:** extract @thi.ng/paths & @thi.ng/interceptors functionality

<a name="0.13.0"></a>
# [0.13.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.12.1...@thi.ng/atom@0.13.0) (2018-03-16)

### Features

* **atom:** add forwardSideFx() interceptor ([357c46e](https://github.com/thi-ng/umbrella/commit/357c46e))
* **atom:** add FX_FETCH & FX_DELAY sidefx impl, update docs ([e52e7e5](https://github.com/thi-ng/umbrella/commit/e52e7e5))

<a name="0.12.1"></a>
## [0.12.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.12.0...@thi.ng/atom@0.12.1) (2018-03-11)

### Bug Fixes

* **atom:** ignore side fx with null values ([0ca0bf3](https://github.com/thi-ng/umbrella/commit/0ca0bf3))

<a name="0.12.0"></a>
# [0.12.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.11.0...@thi.ng/atom@0.12.0) (2018-03-09)

### Bug Fixes

* **atom:** add interceptors to re-exports ([59085e0](https://github.com/thi-ng/umbrella/commit/59085e0))

### Features

* **atom:** add IRelease impls ([9b3d91e](https://github.com/thi-ng/umbrella/commit/9b3d91e))
* **atom:** add/extract StatelessEventBus ([3fae249](https://github.com/thi-ng/umbrella/commit/3fae249))
* **atom:** update EventBus ctor, add deref() ([667691c](https://github.com/thi-ng/umbrella/commit/667691c))

<a name="0.11.0"></a>
# [0.11.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.10.0...@thi.ng/atom@0.11.0) (2018-03-09)

### Features

* **atom:** add default handlers, add/rename event/fx const values, add checks ([1fd43d7](https://github.com/thi-ng/umbrella/commit/1fd43d7))
* **atom:** add valueSetter/Updater() interceptors ([359c4f5](https://github.com/thi-ng/umbrella/commit/359c4f5))

<a name="0.10.0"></a>
# [0.10.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.9.2...@thi.ng/atom@0.10.0) (2018-03-08)

### Features

* **atom:** add async dispatch effect, update event bus & api types ([56866e0](https://github.com/thi-ng/umbrella/commit/56866e0))

<a name="0.9.2"></a>
## [0.9.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.9.1...@thi.ng/atom@0.9.2) (2018-03-08)

### Bug Fixes

* **atom:** add EventBus to module re-exports, minor cleanup ([9e5239b](https://github.com/thi-ng/umbrella/commit/9e5239b))

<a name="0.9.0"></a>
# [0.9.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.8.0...@thi.ng/atom@0.9.0) (2018-03-07)

### Features

* **atom:** re-add refactored EventBus & interceptor handling ([e01bf73](https://github.com/thi-ng/umbrella/commit/e01bf73))

<a name="0.8.0"></a>
# [0.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.7.3...@thi.ng/atom@0.8.0) (2018-03-05)

### Features

* **atom:** update IAtom, add resetIn() & swapIn() impls ([a7e61a4](https://github.com/thi-ng/umbrella/commit/a7e61a4))

<a name="0.7.1"></a>
## [0.7.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.7.0...@thi.ng/atom@0.7.1) (2018-03-01)

### Bug Fixes

* **atom:** re-export api.ts ([3e55a05](https://github.com/thi-ng/umbrella/commit/3e55a05))

<a name="0.7.0"></a>
# [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.6.1...@thi.ng/atom@0.7.0) (2018-03-01)

### Features

* **atom:** add IView, IViewable, impl for Atom, Cursor, History ([9ad83b2](https://github.com/thi-ng/umbrella/commit/9ad83b2))
* **atom:** add View type to create derrived views/value subscriptions ([8c0c621](https://github.com/thi-ng/umbrella/commit/8c0c621))

### Performance Improvements

* **atom:** add optimized getters for path len < 5 ([ed23376](https://github.com/thi-ng/umbrella/commit/ed23376))
* **atom:** add optimized setter() for path len < 5, fix toPath() ([55c6a7d](https://github.com/thi-ng/umbrella/commit/55c6a7d))

<a name="0.6.0"></a>
# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.5.3...@thi.ng/atom@0.6.0) (2018-02-18)

### Bug Fixes

* **atom:** empty path handling getter/setter ([fbc819e](https://github.com/thi-ng/umbrella/commit/fbc819e))

### Features

* **atom:** add deleteIn() ([b593a9b](https://github.com/thi-ng/umbrella/commit/b593a9b))
* **atom:** add getIn/setIn/updateIn ([6f6e7e5](https://github.com/thi-ng/umbrella/commit/6f6e7e5))

<a name="0.5.0"></a>
# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.4.1...@thi.ng/atom@0.5.0) (2018-02-01)

### Bug Fixes

* **atom:** cursor swap() return type ([36cc956](https://github.com/thi-ng/umbrella/commit/36cc956))
* **atom:** truncate redo stack in record(), swap() return type ([8218814](https://github.com/thi-ng/umbrella/commit/8218814))

### Features

* **atom:** add History.canUndo/Redo() ([c5b6e0f](https://github.com/thi-ng/umbrella/commit/c5b6e0f))

<a name="0.4.0"></a>
# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.3.0...@thi.ng/atom@0.4.0) (2018-01-31)

### Features

* **atom:** add full IAtom impl for History, update tests ([5538362](https://github.com/thi-ng/umbrella/commit/5538362))

<a name="0.3.0"></a>
# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.2.2...@thi.ng/atom@0.3.0) (2018-01-31)

### Bug Fixes

* **atom:** cursor ctor arg checks ([282d989](https://github.com/thi-ng/umbrella/commit/282d989))

### Features

* **atom:** add History, add/update tests ([035c51a](https://github.com/thi-ng/umbrella/commit/035c51a))
* **atom:** add IReset/ISwap impls for History ([e1b57de](https://github.com/thi-ng/umbrella/commit/e1b57de))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.1.2...@thi.ng/atom@0.2.0) (2018-01-29)

### Features

* **atom:** add nested path getter / setter compilers ([5dce8a2](https://github.com/thi-ng/umbrella/commit/5dce8a2))

<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.1.0...@thi.ng/atom@0.1.1) (2018-01-29)

### Bug Fixes

* **atom:** cursor IWatch impls (replace stubs) ([cca801b](https://github.com/thi-ng/umbrella/commit/cca801b))

<a name="0.1.0"></a>
# 0.1.0 (2018-01-29)

### Features

* **atom:** add Cursor, update interfaces, types, readme ([04c3d59](https://github.com/thi-ng/umbrella/commit/04c3d59))
* **atom:** re-import atom package from MBP2010, update main readme ([fefc283](https://github.com/thi-ng/umbrella/commit/fefc283))
