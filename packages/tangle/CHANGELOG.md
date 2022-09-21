# Change Log

- **Last updated**: 2022-09-21T21:37:59Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@0.1.0) (2022-09-21)

#### 🚀 Features

- update/fix tangle logic, filesys context, CLI ([85a3968](https://github.com/thi-ng/umbrella/commit/85a3968))
  - add block concatenation if multiple blocks w/ same target
  - fix block boundary regex
  - add absolute path checks for outputs
  - refactor TangleCtx, extract FileSys, update in-memory impl
  - expose CLI in package.json
- import as new package ([99e789e](https://github.com/thi-ng/umbrella/commit/99e789e))
