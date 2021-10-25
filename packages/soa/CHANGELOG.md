# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/soa@0.3.3...@thi.ng/soa@0.3.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/soa





## [0.3.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/soa@0.3.2...@thi.ng/soa@0.3.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/soa





## [0.3.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/soa@0.3.1...@thi.ng/soa@0.3.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/soa





## [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/soa@0.3.0...@thi.ng/soa@0.3.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/soa





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/soa@0.2.25...@thi.ng/soa@0.3.0) (2021-10-12)


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






#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/soa@0.1.47...@thi.ng/soa@0.2.0) (2021-02-20) 

###  Code Refactoring 

- **soa:** update attrib type handling ([274dadf](https://github.com/thi-ng/umbrella/commit/274dadf2507ac4daeea59c53a0f408343d582d8e)) 

###  BREAKING CHANGES 

- **soa:** attrib buffer data type use string consts 
    - part of unified umbrella-wide changes to thi.ng/api Type alias   (see a333d4182) 

#  0.1.0 (2019-11-09) 

###  Bug Fixes 

- **soa:** remove obsolete imports ([2309ccd](https://github.com/thi-ng/umbrella/commit/2309ccd6e581b6f385f4a2720fd2ad5cfb8a0d79)) 

###  Features 

- **soa:** add new pkg [@thi](https://github.com/thi).ng/soa ([5f8ffa1](https://github.com/thi-ng/umbrella/commit/5f8ffa175fabc4518f6b931c8c57473ea8ab1a74)) 
- **soa:** add/update types, update aos(), add SOA.setValues(), tests ([b8e0780](https://github.com/thi-ng/umbrella/commit/b8e07806427041a7ef3413ca47357e3360f6a4c8)) 
- **soa:** update SOAAttribSpec.buf to use ArrayBuffer w/ opt offset ([2759570](https://github.com/thi-ng/umbrella/commit/27595700ce0df21258dad58e18abf98b8ddb7c30)) 

###  Performance Improvements 

- **soa:** update attribValues() impl ([786a02f](https://github.com/thi-ng/umbrella/commit/786a02f66fd0f50e678f3eb048964fadf293db3f))
