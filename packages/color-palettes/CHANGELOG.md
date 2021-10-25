# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color-palettes@0.4.3...@thi.ng/color-palettes@0.5.0) (2021-10-25)


### Features

* **color-palettes:** add 30+ new palettes ([a33ea48](https://github.com/thi-ng/umbrella/commit/a33ea48822e6e6fd4da5da40f719b2f19d1adfaa))





## [0.4.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/color-palettes@0.4.2...@thi.ng/color-palettes@0.4.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/color-palettes





## [0.4.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/color-palettes@0.4.1...@thi.ng/color-palettes@0.4.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/color-palettes





## [0.4.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/color-palettes@0.4.0...@thi.ng/color-palettes@0.4.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/color-palettes





# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color-palettes@0.3.0...@thi.ng/color-palettes@0.4.0) (2021-10-12)


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






#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color-palettes@0.2.0...@thi.ng/color-palettes@0.3.0) (2021-08-24) 

###  Features 

- **color-palettes:** add new palettes, update readme ([14f2952](https://github.com/thi-ng/umbrella/commit/14f29523554b82540bba020d52d6fffde8347348)) 
- **color-palettes:** update/simplify swatch gen ([3187949](https://github.com/thi-ng/umbrella/commit/31879491ed4b59e4d91c818939f9c9beee980779)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/color-palettes@0.1.0...@thi.ng/color-palettes@0.2.0) (2021-08-22) 

###  Features 

- **color-palettes:** add more palettes, update gen ([ba4057c](https://github.com/thi-ng/umbrella/commit/ba4057c4f1bfe4d093674c953080ae84fd92a531)) 

#  0.1.0 (2021-08-21) 

###  Features 

- **color-palettes:** add as new pkg, add assets & swatch gen ([9d1bb17](https://github.com/thi-ng/umbrella/commit/9d1bb17b4373a0cbe43705a41a4cbce353999c7e))
