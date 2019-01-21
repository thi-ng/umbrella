# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.6.23...@thi.ng/associative@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


<a name="0.6.0"></a>
# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.5.11...@thi.ng/associative@0.6.0) (2018-08-24)


### Features

* **associative:** add IReducible impls for SortedMap & SortedSet ([f14f7ce](https://github.com/thi-ng/umbrella/commit/f14f7ce))


<a name="0.5.9"></a>
## [0.5.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.5.8...@thi.ng/associative@0.5.9) (2018-07-03)


### Bug Fixes

* **associative:** minor SortedSet fixes ([33f0d19](https://github.com/thi-ng/umbrella/commit/33f0d19))


<a name="0.5.0"></a>
# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.4.6...@thi.ng/associative@0.5.0) (2018-05-09)


### Features

* **associative:** add mapKeysObj() / mapKeysMap() ([a9574a0](https://github.com/thi-ng/umbrella/commit/a9574a0))
* **associative:** add new functions, update arg & return types ([5991be6](https://github.com/thi-ng/umbrella/commit/5991be6))


<a name="0.4.2"></a>
## [0.4.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.4.1...@thi.ng/associative@0.4.2) (2018-04-20)


### Bug Fixes

* **associative:** allow partial options arg for EquivMap ctor ([bb11ddf](https://github.com/thi-ng/umbrella/commit/bb11ddf))


<a name="0.4.0"></a>
# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.3.0...@thi.ng/associative@0.4.0) (2018-04-13)


### Features

* **associative:** add renameKeysMap ([bfabe80](https://github.com/thi-ng/umbrella/commit/bfabe80))


### Performance Improvements

* **associative:** update equiv() impls ([d1178ac](https://github.com/thi-ng/umbrella/commit/d1178ac))


<a name="0.3.0"></a>
# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.2.0...@thi.ng/associative@0.3.0) (2018-04-13)


### Features

* **associative:** add SortedMap & tests, minor refactor EquivMap ([ae0eae8](https://github.com/thi-ng/umbrella/commit/ae0eae8))
* **associative:** add SortedSet, update SortedMap ([cb4976f](https://github.com/thi-ng/umbrella/commit/cb4976f))


<a name="0.2.0"></a>
# 0.2.0 (2018-04-10)


### Features

* **associative:** add EquivSet.first() ([0dc9f64](https://github.com/thi-ng/umbrella/commit/0dc9f64))
* **associative:** initial import [@thi](https://github.com/thi).ng/associative ([cc70dbc](https://github.com/thi-ng/umbrella/commit/cc70dbc))
