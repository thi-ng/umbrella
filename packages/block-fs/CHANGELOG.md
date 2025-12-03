# Change Log

- **Last updated**: 2025-12-03T22:43:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.6.32](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.6.32) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

### [0.6.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.6.18) (2025-09-26)

#### ♻️ Refactoring

- update CLI arg specs ([691ea5d](https://github.com/thi-ng/umbrella/commit/691ea5d))

### [0.6.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.6.11) (2025-08-06)

#### ♻️ Refactoring

- update CLI internals ([53d5820](https://github.com/thi-ng/umbrella/commit/53d5820))

### [0.6.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.6.3) (2025-07-12)

#### 🩹 Bug fixes

- update block count calculation (CLI convert cmd) ([95cee85](https://github.com/thi-ng/umbrella/commit/95cee85))

### [0.6.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.6.2) (2025-07-12)

#### ♻️ Refactoring

- minor updates CLI commands ([9a394b1](https://github.com/thi-ng/umbrella/commit/9a394b1))

### [0.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.6.1) (2025-07-12)

#### 🩹 Bug fixes

- fix tree output in CLI list cmd, update deps ([8d33970](https://github.com/thi-ng/umbrella/commit/8d33970))
  - update entry sorting for tree output to avoid order edge cases w/ prev approach

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.6.0) (2025-07-11)

#### 🚀 Features

- update Directory.tree(), add optional comparator ([a3c7f4c](https://github.com/thi-ng/umbrella/commit/a3c7f4c))

#### ♻️ Refactoring

- split out CLI cmds to own files, fix tree display ([8665244](https://github.com/thi-ng/umbrella/commit/8665244))

### [0.5.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.5.3) (2025-06-27)

#### ♻️ Refactoring

- minor update CLI wrapper ([8138d88](https://github.com/thi-ng/umbrella/commit/8138d88))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.5.0) (2025-06-18)

#### 🚀 Features

- update block count estimation, add more logging ([02c8037](https://github.com/thi-ng/umbrella/commit/02c8037))

### [0.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.4.1) (2025-04-16)

#### ♻️ Refactoring

- update Entry memory layout ([b5416bd](https://github.com/thi-ng/umbrella/commit/b5416bd))
  - move block start & end ID locations

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.4.0) (2025-04-06)

#### 🚀 Features

- add support for wrapping `ArrayBuffer` ([e23f008](https://github.com/thi-ng/umbrella/commit/e23f008))
  - update `MemoryBlockStorageOpts.buffer` to allow array buffers
  - update `MemoryBlockStorage` ctor
- auto-infer MIME type in `.readAsObjectURL()` ([8fbcebd](https://github.com/thi-ng/umbrella/commit/8fbcebd))
  - use `preferredTypeForPath()` as MIME type fallback
  - update deps
- update CLI, add include/exclude regexp, logging ([ef04e09](https://github.com/thi-ng/umbrella/commit/ef04e09))
  - add support for multiple include/exclude regexps in `convert` command
  - add `--quiet` flag to disable logging

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/block-fs@0.3.0) (2025-04-02)

#### 🚀 Features

- add `BlockFS.readAsObjectURL()` ([551327c](https://github.com/thi-ng/umbrella/commit/551327c))
- add mem storage opts, add logging ([27016d6](https://github.com/thi-ng/umbrella/commit/27016d6))
  - add `MemoryBlockStorage` support for pre-loaded buffers
  - add logging
  - add docs
- add CLI app wrapper ([68abe74](https://github.com/thi-ng/umbrella/commit/68abe74))
  - add CLI app wrapper with these commands:
    - `convert`: convert file tree into single BlockFS blob
    - `list`: list file tree of a BlockFS blob
  - update deps
- improve tree display (`list` cmd) ([a23866c](https://github.com/thi-ng/umbrella/commit/a23866c))

#### 🩹 Bug fixes

- fix parent dir linkage ([a121e76](https://github.com/thi-ng/umbrella/commit/a121e76))

#### ♻️ Refactoring

- update sentinel block ID ([51a1e44](https://github.com/thi-ng/umbrella/commit/51a1e44))

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
