# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-patch@0.3.3...@thi.ng/transducers-patch@0.3.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/transducers-patch





## [0.3.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-patch@0.3.2...@thi.ng/transducers-patch@0.3.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/transducers-patch





## [0.3.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-patch@0.3.1...@thi.ng/transducers-patch@0.3.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/transducers-patch





## [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-patch@0.3.0...@thi.ng/transducers-patch@0.3.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/transducers-patch





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-patch@0.2.30...@thi.ng/transducers-patch@0.3.0) (2021-10-12)


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






#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-patch@0.1.33...@thi.ng/transducers-patch@0.2.0) (2020-12-22) 

###  Code Refactoring 

- **transducers-patch:** fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum ([5086a33](https://github.com/thi-ng/umbrella/commit/5086a330698992fc65ce2e774fc495e0d2e3e58a)) 

###  BREAKING CHANGES 

- **transducers-patch:** replace Patch enum w/ type alias, update PatchArrayOp/PatchObjOp 

##  [0.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-patch@0.1.4...@thi.ng/transducers-patch@0.1.5) (2020-03-28) 

###  Bug Fixes 

- **transducers-patch:** update deps & imports ([71d73c3](https://github.com/thi-ng/umbrella/commit/71d73c3acc41d6cf2c5a4a91432bc85afa38980b)) 

#  0.1.0 (2020-02-25) 

###  Features 

- **transducers-patch:** add transaction support ([77fbb77](https://github.com/thi-ng/umbrella/commit/77fbb774083c38e660644d7ee54b517e2521c3b5)) 
- **transducers-patch:** import as new pkg ([274fde1](https://github.com/thi-ng/umbrella/commit/274fde1721d478d70d90c720a819361fbc8af836))
