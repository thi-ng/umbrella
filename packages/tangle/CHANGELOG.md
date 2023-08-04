# Change Log

- **Last updated**: 2023-08-04T10:58:19Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@0.1.1) (2022-09-22)

#### 🩹 Bug fixes

- in-memory rel path handling ([d184eb2](https://github.com/thi-ng/umbrella/commit/d184eb2))
  - update test fixtures

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@0.1.0) (2022-09-21)

#### 🚀 Features

- import as new package ([99e789e](https://github.com/thi-ng/umbrella/commit/99e789e))
- update/fix tangle logic, filesys context, CLI ([85a3968](https://github.com/thi-ng/umbrella/commit/85a3968))
  - add block concatenation if multiple blocks w/ same target
  - fix block boundary regex
  - add absolute path checks for outputs
  - refactor TangleCtx, extract FileSys, update in-memory impl
  - expose CLI in package.json
