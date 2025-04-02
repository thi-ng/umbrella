# Change Log

- **Last updated**: 2025-04-02T10:24:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.2.0) (2025-04-02)

#### 🚀 Features

- add path separator option, various refactoring ([875465e](https://github.com/thi-ng/umbrella/commit/875465e))
  - add `BlockFSOpts.separator`
  - rename `.readFileRaw()` => `.readBlocks()`
  - rename `.writeFileRaw()` => `.writeBlocks()`
  - add additional internal safety checks
  - internal refactoring (`this` destructuring)
  - add docs

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.1.0) (2025-04-01)

#### 🚀 Features

- import as new pkg ([36ecb56](https://github.com/thi-ng/umbrella/commit/36ecb56))
- major updates & refactoring, initial dir/file entry handling ([970af58](https://github.com/thi-ng/umbrella/commit/970af58))
- major updates directory & entry handling ([453ac10](https://github.com/thi-ng/umbrella/commit/453ac10))
- add support for customizable entries ([ca16f2f](https://github.com/thi-ng/umbrella/commit/ca16f2f))
- add path support for write/append/delete ops ([f282476](https://github.com/thi-ng/umbrella/commit/f282476))
- update & consolidate read/write/append methods ([7e97f4c](https://github.com/thi-ng/umbrella/commit/7e97f4c))
- update read & path methods, logging ([5a30e21](https://github.com/thi-ng/umbrella/commit/5a30e21))

#### 🩹 Bug fixes

- update `MemoryBlock.delete()` to zero block data ([5d9be16](https://github.com/thi-ng/umbrella/commit/5d9be16))

#### ♻️ Refactoring

- restructure pkg, split src files ([146b275](https://github.com/thi-ng/umbrella/commit/146b275))
