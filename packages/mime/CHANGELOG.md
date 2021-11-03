# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/mime@1.0.5...@thi.ng/mime@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/mime@1.0.4...@thi.ng/mime@1.0.5) (2021-09-03)

**Note:** Version bump only for package @thi.ng/mime

##  [0.5.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/mime@0.5.0...@thi.ng/mime@0.5.1) (2021-04-10)

###  Bug Fixes

- **mime:** fix preferredExtension() ([2ebe6ed](https://github.com/thi-ng/umbrella/commit/2ebe6ed8d448eb35b42c6cc5c95094938a7d5a22))

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/mime@0.4.0...@thi.ng/mime@0.5.0) (2021-04-04)

###  Features

- **mime:** add MSFT & SideFX types ([58c247d](https://github.com/thi-ng/umbrella/commit/58c247de4c30528319ab274c2609487e5dd4df5f))

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/mime@0.3.1...@thi.ng/mime@0.4.0) (2021-04-03)

###  Features

- **mime:** update tool, incl. more mime types ([df59d93](https://github.com/thi-ng/umbrella/commit/df59d930f6813781aada2c9d4b1d9a1d485b1dfb))

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/mime@0.2.0...@thi.ng/mime@0.3.0) (2021-03-27)

###  Features

- **mime:** add preferredExtension(), update convert tool ([c3f5ec1](https://github.com/thi-ng/umbrella/commit/c3f5ec12f324a4e627b26dc45d480c0e761602ea))

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/mime@0.1.33...@thi.ng/mime@0.2.0) (2021-03-26)

###  Features

- **mime:** update to latest mime-db release ([1010191](https://github.com/thi-ng/umbrella/commit/10101919d5dcfdb1477d54904a164c1d6e2e65e6))

#  0.1.0 (2020-02-25)

###  Features

- **mime:** add preferredType() ([942aa84](https://github.com/thi-ng/umbrella/commit/942aa8493ebc67c08bf02d4e88508f4058f726ce))
- **mine:** import as new pkg (MBP2010) ([1a60345](https://github.com/thi-ng/umbrella/commit/1a603459b30de13879ca8a02af7f7d95b5c3f8cc))
