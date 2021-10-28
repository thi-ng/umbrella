# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-components@0.3.6...@thi.ng/rdom-components@0.3.7) (2021-10-28)

**Note:** Version bump only for package @thi.ng/rdom-components





## [0.3.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-components@0.3.5...@thi.ng/rdom-components@0.3.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/rdom-components





## [0.3.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-components@0.3.4...@thi.ng/rdom-components@0.3.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/rdom-components





## [0.3.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-components@0.3.3...@thi.ng/rdom-components@0.3.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/rdom-components





## [0.3.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-components@0.3.2...@thi.ng/rdom-components@0.3.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/rdom-components





## [0.3.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-components@0.3.1...@thi.ng/rdom-components@0.3.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/rdom-components





## [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-components@0.3.0...@thi.ng/rdom-components@0.3.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/rdom-components





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-components@0.2.9...@thi.ng/rdom-components@0.3.0) (2021-10-12)


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






#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-components@0.1.46...@thi.ng/rdom-components@0.2.0) (2021-08-04) 

###  Features 

- **rdom-components:** add input components ([fb390c1](https://github.com/thi-ng/umbrella/commit/fb390c1c30d0224a20526eacae7df7d092709518)) 
- **rdom-components:** add staticRadio() component ([ff3d1c4](https://github.com/thi-ng/umbrella/commit/ff3d1c4495191de814427e36b8ac7ff744fc98c2)) 

##  [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom-components@0.1.1...@thi.ng/rdom-components@0.1.2) (2020-07-09) 

###  Bug Fixes 

- **rdom-components:** sub handling in accord/tabs ([6b51fd2](https://github.com/thi-ng/umbrella/commit/6b51fd2ae851070cb82c8eed7194f9b3ec03e6c0)) 

#  0.1.0 (2020-07-08) 

###  Features 

- **rdom-components:** import as new pkg (MBP2010 version) ([b7f72b6](https://github.com/thi-ng/umbrella/commit/b7f72b6a19dfdc4bdb35d89bda34e787d93e5e22))
