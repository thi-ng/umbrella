# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@2.0.5...@thi.ng/arrays@2.0.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/arrays





## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@2.0.4...@thi.ng/arrays@2.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/arrays





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@2.0.3...@thi.ng/arrays@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/arrays





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@2.0.2...@thi.ng/arrays@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/arrays





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@2.0.1...@thi.ng/arrays@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/arrays





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@2.0.0...@thi.ng/arrays@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/arrays





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@1.0.3...@thi.ng/arrays@2.0.0) (2021-10-12)


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






##  [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@1.0.2...@thi.ng/arrays@1.0.3) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/arrays 

#  [0.10.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@0.9.2...@thi.ng/arrays@0.10.0) (2021-01-21) 

###  Bug Fixes 

- **arrays:** fixed-length binarySearch2/4/8/16/32 ([39e5c37](https://github.com/thi-ng/umbrella/commit/39e5c3736135f9a49daceee1fe4da9fbdbb96eab)) 

###  Features 

- **arrays:** add insert/insertUnsafe() ([2a78598](https://github.com/thi-ng/umbrella/commit/2a7859823d2fb56eef4ee7a6919fe70072475f42)) 

#  [0.9.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@0.8.5...@thi.ng/arrays@0.9.0) (2021-01-02) 

###  Features 

- **arrays:** add bisect(), bisectWith() ([17d06a4](https://github.com/thi-ng/umbrella/commit/17d06a43e338aca5f2dc61110382363639daecc5)) 
- **arrays:** add into(), sortByCachedKey() ([b94f64c](https://github.com/thi-ng/umbrella/commit/b94f64c2c351cfed5ea9ade5e42ad0b7076ef9e9)) 
- **arrays:** update sortByCachedKey(), add tests ([64e8f6e](https://github.com/thi-ng/umbrella/commit/64e8f6e4e83c26c73e23a4831483bd328b78bc49)) 

#  [0.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@0.7.0...@thi.ng/arrays@0.8.0) (2020-09-13) 

###  Features 

- **arrays:** add first() ([3f5f722](https://github.com/thi-ng/umbrella/commit/3f5f7226e5c0495086c973a33e91fc2666f4c68c)) 

#  [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@0.6.15...@thi.ng/arrays@0.7.0) (2020-08-28) 

###  Features 

- **arrays:** add non-recursive binary search fns ([29a4ee4](https://github.com/thi-ng/umbrella/commit/29a4ee4d888ccb049df9b50a57e3884ce2d4d0f3)) 

#  [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@0.5.6...@thi.ng/arrays@0.6.0) (2020-03-28) 

###  Features 

- **arrays:** add fillRange() & levenshtein() ([2f98225](https://github.com/thi-ng/umbrella/commit/2f98225d129c7c1ae6b88a4f0bea9227254fcf91)) 

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@0.4.0...@thi.ng/arrays@0.5.0) (2020-01-24) 

###  Features 

- **arrays:** add binary search predicates, tests, update readme ([b8f421e](https://github.com/thi-ng/umbrella/commit/b8f421eb8888fa1b57a9287f6841cd29952bf19f)) 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@0.3.0...@thi.ng/arrays@0.4.0) (2019-11-30) 

###  Features 

- **arrays:** add arraySeq(), arrayIterator() & tests ([d94df57](https://github.com/thi-ng/umbrella/commit/d94df5786dddf6ef6915af79c3fbf0331ddfd2bd)) 
- **arrays:** add binarySearchNumeric() ([7b38202](https://github.com/thi-ng/umbrella/commit/7b38202480db71753d24aa52a9c09d3ac78d36ae)) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@0.2.5...@thi.ng/arrays@0.3.0) (2019-11-09) 

###  Features 

- **arrays:** add isSorted() ([65b29f4](https://github.com/thi-ng/umbrella/commit/65b29f487459c535acdbed3890c8a4e27d87ae2c)) 
- **arrays:** add shuffleRange(), refactor shuffle(), add tests ([1924a05](https://github.com/thi-ng/umbrella/commit/1924a05ea093e3d1d0b3f063cb331b330cee0c0a)) 
- **arrays:** add types, quickSort(), swap(), multiSwap(), update readme ([b834722](https://github.com/thi-ng/umbrella/commit/b83472237b3ba262dcbb644c8ccc516d0021bc84)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/arrays@0.1.9...@thi.ng/arrays@0.2.0) (2019-07-07) 

###  Features 

- **arrays:** enable TS strict compiler flags (refactor) ([8724f9e](https://github.com/thi-ng/umbrella/commit/8724f9e)) 

#  0.1.0 (2019-02-15) 

###  Features 

- **arrays:** add find/findIndex() ([0007152](https://github.com/thi-ng/umbrella/commit/0007152)) 
- **arrays:** extract as new package ([361ba37](https://github.com/thi-ng/umbrella/commit/361ba37))
