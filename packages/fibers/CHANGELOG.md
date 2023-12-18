# Change Log

- **Last updated**: 2023-12-18T13:41:19Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
