# Change Log

- **Last updated**: 2025-07-30T22:32:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.0.26](https://github.com/thi-ng/umbrella/tree/@thi.ng/fibers@1.0.26) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [1.0.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/fibers@1.0.24) (2024-12-27)

#### ♻️ Refactoring

- update timestamp handling ([d0a7922](https://github.com/thi-ng/umbrella/commit/d0a7922))
  - update deps & imports

### [1.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/fibers@1.0.1) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([9df7cb0](https://github.com/thi-ng/umbrella/commit/9df7cb0))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fibers@1.0.0) (2024-04-11)

#### 🛑 Breaking changes

- remove/migrate CSP buffer types, update readme ([d4a1d23](https://github.com/thi-ng/umbrella/commit/d4a1d23))
- BREAKING CHANGE: remove obsolete CSP buffer types & impls, re-use from [@thi.ng/buffers](https://github.com/thi-ng/umbrella/tree/main/packages/buffers) (see [55ba21b50f](https://github.com/thi-ng/umbrella/commit/55ba21b50f))
  - remove IReadBuffer & IReadWriteBuffer interfaces
  - update deps (add [@thi.ng/buffers](https://github.com/thi-ng/umbrella/tree/main/packages/buffers))
  - update docs
  - update readme

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fibers@0.6.0) (2023-11-09)

#### 🚀 Features

- add Fiber.promise() ([4861d95](https://github.com/thi-ng/umbrella/commit/4861d95))

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [0.5.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/fibers@0.5.5) (2023-10-18)

#### 🩹 Bug fixes

- add opts arg for untilPromise() ([acf5ddf](https://github.com/thi-ng/umbrella/commit/acf5ddf))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fibers@0.5.0) (2023-09-17)

#### 🚀 Features

- add asPromise() fiber-to-promise conversion ([29fc86f](https://github.com/thi-ng/umbrella/commit/29fc86f))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fibers@0.4.0) (2023-09-06)

#### 🚀 Features

- add timeSliceIterable() ([fe13b03](https://github.com/thi-ng/umbrella/commit/fe13b03))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fibers@0.3.0) (2023-08-14)

#### 🚀 Features

- update .run() default handlers ([6137e7a](https://github.com/thi-ng/umbrella/commit/6137e7a))
  - use `setImmediate()` as default for non-browser env
  - update tests

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fibers@0.2.0) (2023-08-10)

#### 🚀 Features

- ensure no pre-existing parent in Fiber.fork() ([612adf9](https://github.com/thi-ng/umbrella/commit/612adf9))
- add auto terminate option, update child handling ([e59063d](https://github.com/thi-ng/umbrella/commit/e59063d))
- add shuffle() operator, update deps ([b3efa79](https://github.com/thi-ng/umbrella/commit/b3efa79))
- add CSP primitives ([d8fa8ce](https://github.com/thi-ng/umbrella/commit/d8fa8ce))
  - add fiber-based Channel class
  - add various buffer implementations
    - fifo
    - lifo
    - sliding
    - dropping

#### ⏱ Performance improvements

- rewrite FIFOBuffer as ring buffer ([ebac714](https://github.com/thi-ng/umbrella/commit/ebac714))
  - use old impl as basis for LIFOBuffer only
  - update other buffer types to use new ring buffer impl
  - add min. capacity assertion in ctors

#### ♻️ Refactoring

- minor update all() ([52836a8](https://github.com/thi-ng/umbrella/commit/52836a8))
- update arg types in various ops ([cb3c253](https://github.com/thi-ng/umbrella/commit/cb3c253))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/fibers@0.1.1) (2023-08-05)

#### 🩹 Bug fixes

- update dependencies ([c92ad43](https://github.com/thi-ng/umbrella/commit/c92ad43))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/fibers@0.1.0) (2023-08-04)

#### 🚀 Features

- import as new pkg ([7f8c6dc](https://github.com/thi-ng/umbrella/commit/7f8c6dc))
- add/update operators, add Fiber.isActive() ([a1099c5](https://github.com/thi-ng/umbrella/commit/a1099c5))
- update Fiber.catch(), childForID(), add docs ([aa8d8d0](https://github.com/thi-ng/umbrella/commit/aa8d8d0))

#### 🩹 Bug fixes

- fix typo in waitFrames() ([5700b3e](https://github.com/thi-ng/umbrella/commit/5700b3e))
