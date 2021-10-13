# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@2.0.0...@thi.ng/pointfree-lang@2.0.1) (2021-10-13)


### Bug Fixes

* **pointfree-lang:** update CLI wrapper ([4da9a50](https://github.com/thi-ng/umbrella/commit/4da9a503230868f0cf8513179ecf75ef826cb126))





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@1.4.38...@thi.ng/pointfree-lang@2.0.0) (2021-10-12)


### Bug Fixes

* **pointfree-lang:** update bash wrapper ([4170b4b](https://github.com/thi-ng/umbrella/commit/4170b4b0f025281ca5ce5140a049490ada300ce0))


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






#  [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@1.3.0...@thi.ng/pointfree-lang@1.4.0) (2020-04-27) 

###  Features 

- **pointfree-lang:** add word metadata ([7343116](https://github.com/thi-ng/umbrella/commit/7343116d2e94191b468a37f8c21dc9ef08f0e49c)) 
- **pointfree-lang:** update grammar (add line comments) ([a8cdbe8](https://github.com/thi-ng/umbrella/commit/a8cdbe86a96df0b63682d3f7628ff77f75f23ced)) 

#  [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@1.2.3...@thi.ng/pointfree-lang@1.3.0) (2020-04-16) 

###  Features 

- **pointfree-lang:** add `>word`, update pkg & readme ([4fe2f7f](https://github.com/thi-ng/umbrella/commit/4fe2f7f97b234f92141c2a455aad50d4732de75a)) 

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@1.1.14...@thi.ng/pointfree-lang@1.2.0) (2020-03-29) 

###  Features 

- **pointfree-lang:** add `try` alias, fix `include` cli word ([ab61e5b](https://github.com/thi-ng/umbrella/commit/ab61e5b428fbb98d2edfcd69c2582a98ca70779d)) 
- **pointfree-lang:** add initial CLI tooling, add new aliases, update deps ([90c9d96](https://github.com/thi-ng/umbrella/commit/90c9d96197d3f84d0c1069f998cf90521a260d11)) 

##  [1.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@1.1.4...@thi.ng/pointfree-lang@1.1.5) (2019-09-21) 

###  Bug Fixes 

- **pointfree-lang:** update imports ([8de1366](https://github.com/thi-ng/umbrella/commit/8de1366)) 

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@1.0.14...@thi.ng/pointfree-lang@1.1.0) (2019-07-07) 

###  Features 

- **pointfree:** enable TS strict compiler flags (refactor) ([1f9d155](https://github.com/thi-ng/umbrella/commit/1f9d155)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@0.2.27...@thi.ng/pointfree-lang@1.0.0) (2019-01-21) 

###  Bug Fixes 

- **pointfree-lang:** update NodeType handling ([227be4b](https://github.com/thi-ng/umbrella/commit/227be4b)) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

##  [0.2.26](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@0.2.25...@thi.ng/pointfree-lang@0.2.26) (2018-12-15) 

###  Bug Fixes 

- **pointfree-lang:** update parser stubs (TS3.2.x) ([3b3e503](https://github.com/thi-ng/umbrella/commit/3b3e503)) 

##  [0.2.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@0.2.21...@thi.ng/pointfree-lang@0.2.22) (2018-09-24) 

###  Performance Improvements 

- **pointfree-lang:** `NodeType` => const enum ([a7b9a42](https://github.com/thi-ng/umbrella/commit/a7b9a42)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@0.1.3...@thi.ng/pointfree-lang@0.2.0) (2018-04-03) 

###  Bug Fixes 

- **pointfree-lang:** update grammar (parse order), add tests ([5450e50](https://github.com/thi-ng/umbrella/commit/5450e50)) 

###  Features 

- **pointfree-lang:** implement dynamic var scoping & local var grammar ([3310ec3](https://github.com/thi-ng/umbrella/commit/3310ec3)) 
- **pointfree-lang:** overhaul visitor quote/array & map handling, grammar ([769e84d](https://github.com/thi-ng/umbrella/commit/769e84d)) 
- **pointfree-lang:** update grammar, aliases, ASTNode, NodeType ([ee684c7](https://github.com/thi-ng/umbrella/commit/ee684c7)) 

##  [0.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@0.1.2...@thi.ng/pointfree-lang@0.1.3) (2018-04-01) 

###  Bug Fixes 

- **pointfree-lang:** object literal grammar rule (allow initial WS) ([208b5c3](https://github.com/thi-ng/umbrella/commit/208b5c3)) 

##  [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@0.1.1...@thi.ng/pointfree-lang@0.1.2) (2018-03-31) 

###  Bug Fixes 

- **pointfree-lang:** add ensureEnv, update re-exports, update readme ([659cce9](https://github.com/thi-ng/umbrella/commit/659cce9))
