# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@5.0.9...@thi.ng/malloc@5.0.10) (2021-08-04)

**Note:** Version bump only for package @thi.ng/malloc





## [5.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@5.0.8...@thi.ng/malloc@5.0.9) (2021-07-01)

**Note:** Version bump only for package @thi.ng/malloc





## [5.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@5.0.7...@thi.ng/malloc@5.0.8) (2021-06-08)

**Note:** Version bump only for package @thi.ng/malloc





# [5.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@4.2.6...@thi.ng/malloc@5.0.0) (2021-02-20)


### Code Refactoring

* **malloc:** update mallocAs/callocAs() handling ([159042a](https://github.com/thi-ng/umbrella/commit/159042ab4ca90db3d0e3879b61e9b0b2d203362a))


### BREAKING CHANGES

* **malloc:** block type use string consts

- part of unified umbrella-wide changes to thi.ng/api Type alias
  (see a333d4182)
- no code changes, just arg type update
- update tests





# [4.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@4.1.26...@thi.ng/malloc@4.2.0) (2020-10-19)


### Features

* **malloc:** add NativePool & tests ([8b2b4f6](https://github.com/thi-ng/umbrella/commit/8b2b4f6629bf0be5d1bf538b15973298474d0f8d))





# [4.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@4.0.5...@thi.ng/malloc@4.1.0) (2019-11-09)

### Bug Fixes

* **malloc:** fix realloc(), various refactorings, add tests ([fa3e1bc](https://github.com/thi-ng/umbrella/commit/fa3e1bcff26f553d845d2145ed7c8f9238b796bd))
* **malloc:** update freeAll(), add test, doc strings, minor cleanup ([830b267](https://github.com/thi-ng/umbrella/commit/830b267f8bf3f050ea5914b7e9f8ba539dcd0c4e))

### Features

* **malloc:** add more buffered state, align opt, refactor, update tests ([1ff9487](https://github.com/thi-ng/umbrella/commit/1ff9487980645315e77df02af651ff442288f1a9))
* **malloc:** fix block alignment/layout, update calloc/realloc ([a40c265](https://github.com/thi-ng/umbrella/commit/a40c265708fc6e66bef5a700b436569106f81e31))

# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@3.0.0...@thi.ng/malloc@4.0.0) (2019-07-07)

### Code Refactoring

* **malloc:** address TS strictNullChecks flag ([e4781e3](https://github.com/thi-ng/umbrella/commit/e4781e3))

### Features

* **malloc:** enable TS strict compiler flags (refactor) ([e23e555](https://github.com/thi-ng/umbrella/commit/e23e555))
* **malloc:** export typed array ctors, update wrap() ([3413ad7](https://github.com/thi-ng/umbrella/commit/3413ad7))

### BREAKING CHANGES

* **malloc:** update IMemPool return types

- callocAs, mallocAs, reallocAs() now return `undefined` instead of
  `null` if operation failed

# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@2.0.10...@thi.ng/malloc@3.0.0) (2019-05-22)

### Code Refactoring

* **malloc:** remove Type enum, SIZEOF ([b26df6d](https://github.com/thi-ng/umbrella/commit/b26df6d))

### BREAKING CHANGES

* **malloc:** remove Type enum, SIZEOF, migrated to @thi.ng/api

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/malloc@1.0.1...@thi.ng/malloc@2.0.0) (2019-02-05)

### Code Refactoring

* **malloc:** update MemPoolOpts & MemPool ctor args ([6d15686](https://github.com/thi-ng/umbrella/commit/6d15686))

### Features

* **malloc:** add realloc(), update free() ([bf8b28f](https://github.com/thi-ng/umbrella/commit/bf8b28f))
* **malloc:** add reallocArray(), update realloc() & compact(), tests ([a55f477](https://github.com/thi-ng/umbrella/commit/a55f477))

### BREAKING CHANGES

* **malloc:** update MemPoolOpts & MemPool ctor args

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
