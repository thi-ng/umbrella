# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@2.0.3...@thi.ng/bitfield@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/bitfield





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@2.0.2...@thi.ng/bitfield@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/bitfield





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@2.0.1...@thi.ng/bitfield@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/bitfield





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@2.0.0...@thi.ng/bitfield@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/bitfield





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@1.0.3...@thi.ng/bitfield@2.0.0) (2021-10-12)


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






##  [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@1.0.2...@thi.ng/bitfield@1.0.3) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/bitfield 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@0.3.30...@thi.ng/bitfield@0.4.0) (2021-02-20) 

###  Features 

- **bitfield:** add row/column extracts, popcounts, rename factories ([0c4c112](https://github.com/thi-ng/umbrella/commit/0c4c1127cbb9bd6fb071837adef2d7b65e2de533)) 

###  BREAKING CHANGES 

- **bitfield:** rename factory fns to follow umbrella-wide naming conventions 
    - rename bitField() => defBitField() 
    - rename bitMatrix() => defBitMatrix() 
    - add BitMatrix.row()/column() bitfield extraction 
    - add BitMatrix.popCountRow/Column() 
    - add BitField.popCount() 
    - update masks in bit accessors 
    - update BitField ctor & accessors to allow numbers (not just booleans) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@0.2.8...@thi.ng/bitfield@0.3.0) (2020-03-06) 

###  Features 

- **bitfield:** add and/or/xor/not() methods, add IClear, ICopy impls ([52d3005](https://github.com/thi-ng/umbrella/commit/52d3005281c90b89d41d3b2504e3eb47cafa6e03)) 
- **bitfield:** add toggleAt(), setRange(), update ctor ([6ed20c1](https://github.com/thi-ng/umbrella/commit/6ed20c13768fe3bdd38990ee79c865a13775fc2d)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitfield@0.1.12...@thi.ng/bitfield@0.2.0) (2019-09-21) 

###  Features 

- **bitfield:** update BitMatrix to support non-squared sizes, update docstrings ([0fd8620](https://github.com/thi-ng/umbrella/commit/0fd8620)) 

#  0.1.0 (2019-02-17) 

###  Features 

- **bitfield:** add new package ([5e17fd1](https://github.com/thi-ng/umbrella/commit/5e17fd1)) 
- **bitfield:** add/update resize() & setAt(), add doc strings ([f227107](https://github.com/thi-ng/umbrella/commit/f227107))
