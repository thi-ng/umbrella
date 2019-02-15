# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@2.0.1...@thi.ng/malloc@2.0.2) (2019-02-15)

**Note:** Version bump only for package @thi.ng/malloc





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@2.0.0...@thi.ng/malloc@2.0.1) (2019-02-10)

**Note:** Version bump only for package @thi.ng/malloc





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@1.0.1...@thi.ng/malloc@2.0.0) (2019-02-05)


### Code Refactoring

* **malloc:** update MemPoolOpts & MemPool ctor args ([6d15686](https://github.com/thi-ng/umbrella/commit/6d15686))


### Features

* **malloc:** add realloc(), update free() ([bf8b28f](https://github.com/thi-ng/umbrella/commit/bf8b28f))
* **malloc:** add reallocArray(), update realloc() & compact(), tests ([a55f477](https://github.com/thi-ng/umbrella/commit/a55f477))


### BREAKING CHANGES

* **malloc:** update MemPoolOpts & MemPool ctor args





## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@1.0.0...@thi.ng/malloc@1.0.1) (2019-01-21)

**Note:** Version bump only for package @thi.ng/malloc





# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@0.2.1...@thi.ng/malloc@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@0.1.1...@thi.ng/malloc@0.2.0) (2018-10-27)


### Features

* **malloc:** add MemPoolOpts, fix top block alloc, update tests, readme ([c5b0f2f](https://github.com/thi-ng/umbrella/commit/c5b0f2f))


# 0.1.0 (2018-10-21)


### Bug Fixes

* **malloc:** add size check, update readme ([787102a](https://github.com/thi-ng/umbrella/commit/787102a))


### Features

* **malloc:** add freeAll(), release(), tests & benchmarks, update docs ([4b72cda](https://github.com/thi-ng/umbrella/commit/4b72cda))
* **malloc:** initial import [@thi](https://github.com/thi).ng/malloc package ([2cf20c9](https://github.com/thi-ng/umbrella/commit/2cf20c9))
* **malloc:** re-add block compaction & splitting, update readme ([89f2bc2](https://github.com/thi-ng/umbrella/commit/89f2bc2))
