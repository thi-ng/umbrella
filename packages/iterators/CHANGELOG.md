# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@6.0.4...@thi.ng/iterators@6.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/iterators





## [6.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@6.0.3...@thi.ng/iterators@6.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/iterators





## [6.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@6.0.2...@thi.ng/iterators@6.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/iterators





## [6.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@6.0.1...@thi.ng/iterators@6.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/iterators





## [6.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@6.0.0...@thi.ng/iterators@6.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/iterators





# [6.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@5.1.74...@thi.ng/iterators@6.0.0) (2021-10-12)


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






#  [5.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@5.0.19...@thi.ng/iterators@5.1.0) (2019-07-07) 

###  Bug Fixes 

- **iterators:** update concat/mapcat, fnil args ([c51ff98](https://github.com/thi-ng/umbrella/commit/c51ff98)) 

###  Features 

- **iterators:** enable TS strict compiler flags (refactor) ([24fd9e7](https://github.com/thi-ng/umbrella/commit/24fd9e7)) 
- **iterators:** TS strictNullChecks ([9f9be1d](https://github.com/thi-ng/umbrella/commit/9f9be1d)) 

#  [5.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@4.2.4...@thi.ng/iterators@5.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

#  [4.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@4.1.40...@thi.ng/iterators@4.2.0) (2018-12-20) 

###  Features 

- **iterators:** add `children` arg for walk()/walkIterator() ([61b7b11](https://github.com/thi-ng/umbrella/commit/61b7b11)) 

#  [4.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@4.0.7...@thi.ng/iterators@4.1.0) (2018-03-21) 

###  Features 

- **iterators:** update error handling, add [@thi](https://github.com/thi).ng/api dep ([9316a6c](https://github.com/thi-ng/umbrella/commit/9316a6c)) 

#  [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@3.2.4...@thi.ng/iterators@4.0.0) (2018-01-29) 

###  Code Refactoring 

- **iterators:** remove default exports ([651d07c](https://github.com/thi-ng/umbrella/commit/651d07c)) 

###  BREAKING CHANGES 

- **iterators:** switch back to named function exports for project consistency and following lead from tslint (https://palantir.github.io/tslint/rules/no-default-export/) 

##  3.1.0 (2017-12-12) 

- Add `groupBy()` 
- Add optional key fn for `frequencies()` 
- Update package structure (build commands & target dirs) 

##  3.0.1 (2017-07-30) 

- Update readme 

##  3.0.0 (2017-07-30) 

- Package name change `thing-iterators` => `@thi.ng/iterators` 
- Add `fork()` 
- Breaking change `cached()` API (now same as `fork()`) 

##  2.0.0 (2017-07-07) 

- All functions are defined as sub-modules and exposed as default exports. This is an additional feature. The full library can still be imported as before. 
- Function sub-modules use *Kebab case* whereas function names are in *Camel case*.
