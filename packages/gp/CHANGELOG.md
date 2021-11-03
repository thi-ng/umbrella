# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/gp@0.3.4...@thi.ng/gp@0.3.5) (2021-10-27)


### Bug Fixes

* **gp:** limit AST.mutate() to max tree depth ([afcdda0](https://github.com/thi-ng/umbrella/commit/afcdda0e10bd7d824af68dd4e79ceb749d16181b))





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/gp@0.2.30...@thi.ng/gp@0.3.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### BREAKING CHANGES

* discontinue CommonJS & UMD versions

- only ESM modules will be published from now on
- CJS obsolete due to ESM support in recent versions of node:
  - i.e. launch NodeJS via:
  - `node --experimental-specifier-resolution=node --experimental-repl-await`
  - in the node REPL use `await import(...)` instead of `require()`
- UMD obsolete due to widespread browser support for ESM

Also:
- normalize/restructure/reorg all package.json files
- cleanup all build scripts, remove obsolete
- switch from mocha to @thi.ng/testament for all tests






#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/gp@0.1.35...@thi.ng/gp@0.2.0) (2020-12-22)

###  Code Refactoring

- **gp:** fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([6fd4291](https://github.com/thi-ng/umbrella/commit/6fd4291eb2be4baae93b3f365478f73990e044b0))

###  BREAKING CHANGES

- **gp:** replace GeneType w/ type alias

#  0.1.0 (2019-11-30)

###  Bug Fixes

- **gp:** update ASTNode as recursive type (TS3.7) ([33fbd7f](https://github.com/thi-ng/umbrella/commit/33fbd7f152df370270690e5b1381a86f647f9b6b))

###  Features

- **gp:** add MEP, refactor all as classes, add/update types, tests ([d9061b1](https://github.com/thi-ng/umbrella/commit/d9061b17a6aa89f690a0c97c12825c077f45e38b))
- **gp:** add opt min depth filter for MEP.decodeChromosome() ([921fcdd](https://github.com/thi-ng/umbrella/commit/921fcdd4e1c1919e4539c033df591782b63cff0a))
- **gp:** add support for arbitrary op arities, simplify ([8e71a88](https://github.com/thi-ng/umbrella/commit/8e71a88fb7b1ca36e7b89b5f2923a198c974c575))
- **gp:** import as new package ([dcfee15](https://github.com/thi-ng/umbrella/commit/dcfee156c8b196c6c4a4f2b5f0f7986e19bacee8))
- **gp:** update crossover/mutation for both AST/MEP, add tests ([9852631](https://github.com/thi-ng/umbrella/commit/9852631e227d9704c41f9dbe8a6b2cce10bd8fa9))
- **gp:** update MEP.decodeChromosome, tests, add docs ([e339925](https://github.com/thi-ng/umbrella/commit/e339925bc1fcbf2f7787e6453d2e29922adb3836))
