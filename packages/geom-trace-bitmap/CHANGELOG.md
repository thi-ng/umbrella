# Change Log

- **Last updated**: 2024-03-01T15:22:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.3.61](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-trace-bitmap@0.3.61) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

### [0.3.35](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-trace-bitmap@0.3.35) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-trace-bitmap@0.3.0) (2023-04-08)

#### 🚀 Features

- add TraceOpts.max ([3b39d61](https://github.com/thi-ng/umbrella/commit/3b39d61))
- update TraceOpts.select() ([01b9e49](https://github.com/thi-ng/umbrella/commit/01b9e49))
  - add point coords as 2nd select() arg
- update extractSegmentX/Y() ([274f71d](https://github.com/thi-ng/umbrella/commit/274f71d))
  - update result to include unmatched points
  - update tests

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-trace-bitmap@0.2.0) (2023-03-25)

#### 🚀 Features

- add pointcloud line extractions ([d65a9ae](https://github.com/thi-ng/umbrella/commit/d65a9ae))
  - add extractSegmentsX/Y() functions

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-trace-bitmap@0.1.0) (2022-12-29)

#### 🚀 Features

- import as new pkg ([20e6849](https://github.com/thi-ng/umbrella/commit/20e6849))
- add support for custom trace orders ([c4c35f4](https://github.com/thi-ng/umbrella/commit/c4c35f4))
  - update TraceBitmapOpts, add TraceDirImpl
  - update traceBitmap() to support custom dirs
  - export border fns for better reuse w/ custom impls
  - update tests
- update/fix border handling, add `last` option ([5c429c1](https://github.com/thi-ng/umbrella/commit/5c429c1))
- update TraceDir, separate diagonals ([cdbdae5](https://github.com/thi-ng/umbrella/commit/cdbdae5))
  - update TraceDir (add `d1` & `d2`)
  - update traceBitmap()
  - add doc strings
