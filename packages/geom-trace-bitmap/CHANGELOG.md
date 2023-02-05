# Change Log

- **Last updated**: 2023-02-05T14:42:21Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
