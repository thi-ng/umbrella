# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/unionstruct@2.0.1...@thi.ng/unionstruct@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/unionstruct





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/unionstruct@2.0.0...@thi.ng/unionstruct@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/unionstruct





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/unionstruct@1.1.40...@thi.ng/unionstruct@2.0.0) (2021-10-12)


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






#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/unionstruct@1.0.6...@thi.ng/unionstruct@1.1.0) (2019-07-07) 

###  Bug Fixes 

- **unionstruct:** allow undefined/null args ([9636495](https://github.com/thi-ng/umbrella/commit/9636495)) 
- **unionstruct:** FieldType typo ([02beff9](https://github.com/thi-ng/umbrella/commit/02beff9)) 

###  Features 

- **unionstruct:** enable TS strict compiler flags (refactor) ([eb639fe](https://github.com/thi-ng/umbrella/commit/eb639fe)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/unionstruct@0.1.19...@thi.ng/unionstruct@1.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols.
