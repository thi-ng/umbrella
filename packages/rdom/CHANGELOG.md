# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.7.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.7.6...@thi.ng/rdom@0.7.7) (2021-10-28)

**Note:** Version bump only for package @thi.ng/rdom





## [0.7.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.7.5...@thi.ng/rdom@0.7.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/rdom





## [0.7.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.7.4...@thi.ng/rdom@0.7.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/rdom





## [0.7.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.7.3...@thi.ng/rdom@0.7.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/rdom





## [0.7.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.7.2...@thi.ng/rdom@0.7.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/rdom





## [0.7.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.7.1...@thi.ng/rdom@0.7.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/rdom





## [0.7.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.7.0...@thi.ng/rdom@0.7.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/rdom





# [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.6.9...@thi.ng/rdom@0.7.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **rdom:** add $replace() control/wrapper ([6096357](https://github.com/thi-ng/umbrella/commit/609635729a7d92d087a59684e00d19e609c5927f))


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






#  [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.5.0...@thi.ng/rdom@0.6.0) (2021-08-04) 

###  Features 

- **rdom:** add $inputFile/Files() handlers ([7f8888b](https://github.com/thi-ng/umbrella/commit/7f8888b0f0857aa9abde8ca6ea666a6f37bb64f2)) 

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.4.17...@thi.ng/rdom@0.5.0) (2021-07-27) 

###  Bug Fixes 

- **rdom:** fix [#304](https://github.com/thi-ng/umbrella/issues/304), update Switch.update() ([a2899c0](https://github.com/thi-ng/umbrella/commit/a2899c09b62458edd75dd785b64db0519b85eb6d)) 

###  Features 

- **rdom:** relax return types for $switch() ([71c334b](https://github.com/thi-ng/umbrella/commit/71c334bfc5715e58296750e9d118927dce53406a)) 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.3.9...@thi.ng/rdom@0.4.0) (2021-02-24) 

###  Features 

- **rdom:** add $inputCheckbox, $inputTrigger ([99c569e](https://github.com/thi-ng/umbrella/commit/99c569e629018d679bae0f9d07fbde8ddd4f16cc)) 

##  [0.3.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.3.8...@thi.ng/rdom@0.3.9) (2021-02-22) 

###  Bug Fixes 

- **rdom:** add stream IDs for $Sub/$SubA ([e8b8fd4](https://github.com/thi-ng/umbrella/commit/e8b8fd4785f9836f0270bbc01dc216c2c87d2e8d)) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.2.16...@thi.ng/rdom@0.3.0) (2020-12-07) 

###  Features 

- **rdom:** add $subObject() wrapper, add docs ([cd5cf08](https://github.com/thi-ng/umbrella/commit/cd5cf08d6ae0ffb5ff8a89a19918a563fb889cbd)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rdom@0.1.2...@thi.ng/rdom@0.2.0) (2020-07-08) 

###  Features 

- **rdom:** add $input, $inputNum event listeners ([c29fb49](https://github.com/thi-ng/umbrella/commit/c29fb49824429ba1175deca30fbfe693d6fd689d)) 
- **rdom:** add $promise() wrapper ([53f9688](https://github.com/thi-ng/umbrella/commit/53f96881094603b885a409b8965b491468a3c247)) 

#  0.1.0 (2020-07-02) 

###  Features 

- **rdom:** add RDFa `prefix` attrib support, update prefix handling ([b589da5](https://github.com/thi-ng/umbrella/commit/b589da51385957a5defffb66307bd3d750814e4c)) 
- **rdom:** add support for namespaced el/attribs ([9d16ef0](https://github.com/thi-ng/umbrella/commit/9d16ef0a2f6d6a062bf164ca38813290d7660149)) 
- **rdom:** rename hdom2020 => rdom, update pkg ([1224706](https://github.com/thi-ng/umbrella/commit/1224706fa2fbca82afb73afeda3c3075c9b35f91)) 
- **rdom:** update $tree() span handling, update $moveTo() ([6d90187](https://github.com/thi-ng/umbrella/commit/6d9018763af7f0f2096cdc1d79889791193a01e0))
