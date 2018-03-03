# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.7.3"></a>
## [0.7.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.7.2...@thi.ng/atom@0.7.3) (2018-03-03)




**Note:** Version bump only for package @thi.ng/atom

<a name="0.7.2"></a>
## [0.7.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.7.1...@thi.ng/atom@0.7.2) (2018-03-02)




**Note:** Version bump only for package @thi.ng/atom

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




<a name="0.6.1"></a>
## [0.6.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.6.0...@thi.ng/atom@0.6.1) (2018-02-26)




**Note:** Version bump only for package @thi.ng/atom

<a name="0.6.0"></a>
# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.5.3...@thi.ng/atom@0.6.0) (2018-02-18)


### Bug Fixes

* **atom:** empty path handling getter/setter ([fbc819e](https://github.com/thi-ng/umbrella/commit/fbc819e))


### Features

* **atom:** add deleteIn() ([b593a9b](https://github.com/thi-ng/umbrella/commit/b593a9b))
* **atom:** add getIn/setIn/updateIn ([6f6e7e5](https://github.com/thi-ng/umbrella/commit/6f6e7e5))




<a name="0.5.3"></a>
## [0.5.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.5.2...@thi.ng/atom@0.5.3) (2018-02-08)




**Note:** Version bump only for package @thi.ng/atom

<a name="0.5.2"></a>
## [0.5.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.5.1...@thi.ng/atom@0.5.2) (2018-02-03)




**Note:** Version bump only for package @thi.ng/atom

<a name="0.5.1"></a>
## [0.5.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.5.0...@thi.ng/atom@0.5.1) (2018-02-02)




**Note:** Version bump only for package @thi.ng/atom

<a name="0.5.0"></a>
# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.4.1...@thi.ng/atom@0.5.0) (2018-02-01)


### Bug Fixes

* **atom:** cursor swap() return type ([36cc956](https://github.com/thi-ng/umbrella/commit/36cc956))
* **atom:** truncate redo stack in record(), swap() return type ([8218814](https://github.com/thi-ng/umbrella/commit/8218814))


### Features

* **atom:** add History.canUndo/Redo() ([c5b6e0f](https://github.com/thi-ng/umbrella/commit/c5b6e0f))




<a name="0.4.1"></a>
## [0.4.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.4.0...@thi.ng/atom@0.4.1) (2018-02-01)




**Note:** Version bump only for package @thi.ng/atom

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




<a name="0.2.2"></a>
## [0.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.2.1...@thi.ng/atom@0.2.2) (2018-01-30)




**Note:** Version bump only for package @thi.ng/atom

<a name="0.2.1"></a>
## [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.2.0...@thi.ng/atom@0.2.1) (2018-01-29)




**Note:** Version bump only for package @thi.ng/atom

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.1.2...@thi.ng/atom@0.2.0) (2018-01-29)


### Features

* **atom:** add nested path getter / setter compilers ([5dce8a2](https://github.com/thi-ng/umbrella/commit/5dce8a2))




<a name="0.1.2"></a>
## [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.1.1...@thi.ng/atom@0.1.2) (2018-01-29)




**Note:** Version bump only for package @thi.ng/atom

<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/atom@0.1.0...@thi.ng/atom@0.1.1) (2018-01-29)


### Bug Fixes

* **atom:** cursor IWatch impls (replace stubs) ([cca801b](https://github.com/thi-ng/umbrella/commit/cca801b))




<a name="0.1.0"></a>
# 0.1.0 (2018-01-29)


### Features

* **atom:** add Cursor, update interfaces, types, readme ([04c3d59](https://github.com/thi-ng/umbrella/commit/04c3d59))
* **atom:** re-import atom package from MBP2010, update main readme ([fefc283](https://github.com/thi-ng/umbrella/commit/fefc283))
