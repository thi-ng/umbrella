# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/oquery@2.0.3...@thi.ng/oquery@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/oquery





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/oquery@2.0.2...@thi.ng/oquery@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/oquery





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/oquery@2.0.1...@thi.ng/oquery@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/oquery





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/oquery@2.0.0...@thi.ng/oquery@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/oquery





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/oquery@1.0.5...@thi.ng/oquery@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/oquery@1.0.4...@thi.ng/oquery@1.0.5) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/oquery 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/oquery@0.2.11...@thi.ng/oquery@0.3.0) (2021-03-22) 

###  Features 

- **oquery:** fix [#264](https://github.com/thi-ng/umbrella/issues/264), add intersection queries ([f3ad108](https://github.com/thi-ng/umbrella/commit/f3ad1083645076c8a1bd38f7152345e25ab581f1)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/oquery@0.1.15...@thi.ng/oquery@0.2.0) (2020-12-07) 

###  Features 

- **oquery:** add array support, add QueryOpts ([8498db0](https://github.com/thi-ng/umbrella/commit/8498db037216a6ebcd15cb76a141fedc88feecf3)) 
- **oquery:** add defKeyQuery(), refactor/fix types ([4c5ba42](https://github.com/thi-ng/umbrella/commit/4c5ba4256c3b56f4d1e70069675e39f26ac11887)) 

#  0.1.0 (2020-07-04) 

###  Features 

- **oquery:** import as new pkg ([aaa3086](https://github.com/thi-ng/umbrella/commit/aaa30865d3318c06ab8f32862058a06af89ec8cc))
