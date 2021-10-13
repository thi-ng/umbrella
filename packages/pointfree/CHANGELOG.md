# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@3.0.0...@thi.ng/pointfree@3.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/pointfree





# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@2.0.36...@thi.ng/pointfree@3.0.0) (2021-10-12)


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






#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.3.3...@thi.ng/pointfree@2.0.0) (2020-04-16) 

###  Features 

- **pointfree:** add new words, rename HOF words ([0d19c9a](https://github.com/thi-ng/umbrella/commit/0d19c9a23de3fc4188d8d0329783211f5013716b)), closes [#210](https://github.com/thi-ng/umbrella/issues/210) 

###  BREAKING CHANGES 

- **pointfree:** rename HOF words 

#  [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.2.10...@thi.ng/pointfree@1.3.0) (2020-03-29) 

###  Features 

- **pointfree:** add $try word, update compile() to allow empty quotations ([41de106](https://github.com/thi-ng/umbrella/commit/41de106e776ad102e827ccc062a19a4e637613a0)) 
- **pointfree:** add tojson()/fromjson() conversion ops ([829f3ab](https://github.com/thi-ng/umbrella/commit/829f3ab129084619c05b434732b46b6c26d32b5e)) 
- **pointfree:** add whenq(), ismatch() ([44ab1d7](https://github.com/thi-ng/umbrella/commit/44ab1d7f5ff52a9226b873b42adada3eac1674e9)) 

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.1.3...@thi.ng/pointfree@1.2.0) (2019-08-21) 

###  Features 

- **pointfree:** add new r-stack words, refactor ([dbad162](https://github.com/thi-ng/umbrella/commit/dbad162)) 

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.0.14...@thi.ng/pointfree@1.1.0) (2019-07-07) 

###  Features 

- **pointfree:** enable TS strict compiler flags (refactor) ([1f9d155](https://github.com/thi-ng/umbrella/commit/1f9d155)) 

##  [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.0.13...@thi.ng/pointfree@1.0.14) (2019-05-22) 

###  Bug Fixes 

- **pointfree:** update safeMode handling ([d27bcba](https://github.com/thi-ng/umbrella/commit/d27bcba)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.8.15...@thi.ng/pointfree@1.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

#  [0.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.7.10...@thi.ng/pointfree@0.8.0) (2018-05-13) 

###  Features 

- **pointfree:** add execjs for host calls, update readme ([373701b](https://github.com/thi-ng/umbrella/commit/373701b)) 

##  [0.7.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.7.8...@thi.ng/pointfree@0.7.9) (2018-05-10) 

###  Bug Fixes 

- **pointfree:** minor update error handling ([5391d98](https://github.com/thi-ng/umbrella/commit/5391d98)) 

#  [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.6.2...@thi.ng/pointfree@0.7.0) (2018-04-03) 

###  Features 

- **pointfree:** add copy() word ([68a8dba](https://github.com/thi-ng/umbrella/commit/68a8dba)) 
- **pointfree:** add math ops, update load/loadkey, update tests ([2101e92](https://github.com/thi-ng/umbrella/commit/2101e92)) 

##  [0.6.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.6.0...@thi.ng/pointfree@0.6.1) (2018-03-31) 

###  Bug Fixes 

- **pointfree:** reexport ensureStack fns ([a0bf781](https://github.com/thi-ng/umbrella/commit/a0bf781)) 

#  [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.5.0...@thi.ng/pointfree@0.6.0) (2018-03-31) 

###  Features 

- **pointfree:** add caseq() ([5db90c5](https://github.com/thi-ng/umbrella/commit/5db90c5)) 

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.4.0...@thi.ng/pointfree@0.5.0) (2018-03-29) 

###  Features 

- **pointfree:** add combinators, update controlflow words, remove execq ([3dc30a8](https://github.com/thi-ng/umbrella/commit/3dc30a8)) 
- **pointfree:** add more dataflow combinators, words & tests ([b096e43](https://github.com/thi-ng/umbrella/commit/b096e43)) 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.3.0...@thi.ng/pointfree@0.4.0) (2018-03-29) 

###  Features 

- **pointfree:** add new words, constructs, aliases, fix re-exports ([943b4f9](https://github.com/thi-ng/umbrella/commit/943b4f9)) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.2.1...@thi.ng/pointfree@0.3.0) (2018-03-28) 

###  Bug Fixes 

- **pointfree:** add 0-arity comp() (identity fn) ([10d5a34](https://github.com/thi-ng/umbrella/commit/10d5a34)) 
- **pointfree:** wordU(), add tests ([1a01f9a](https://github.com/thi-ng/umbrella/commit/1a01f9a)) 

###  Features 

- **pointfree:** add new words, rename words, remove mapnth, pushl2 ([0f0c382](https://github.com/thi-ng/umbrella/commit/0f0c382)) 
- **pointfree:** add rstack, update StackContext ([1c4cd2f](https://github.com/thi-ng/umbrella/commit/1c4cd2f)) 
- **pointfree:** further restructure, perf, add tests ([3252554](https://github.com/thi-ng/umbrella/commit/3252554)) 
- **pointfree:** major refactor & restructure ([a48361d](https://github.com/thi-ng/umbrella/commit/a48361d)) 
- **pointfree:** major update readme, package ([e52b869](https://github.com/thi-ng/umbrella/commit/e52b869)) 
- **pointfree:** update all words to return stack ([79b4ce3](https://github.com/thi-ng/umbrella/commit/79b4ce3)) 
- **pointfree:** update word/wordU, add append(), tuple(), join() ([f3f0bec](https://github.com/thi-ng/umbrella/commit/f3f0bec)) 

##  [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.2.0...@thi.ng/pointfree@0.2.1) (2018-03-23) 

###  Bug Fixes 

- **pointfree:** fix readme/docs ([f211c39](https://github.com/thi-ng/umbrella/commit/f211c39)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.1.0...@thi.ng/pointfree@0.2.0) (2018-03-23) 

###  Features 

- **pointfree:** add unwrap, quatations, math/bitops, array/obj access ([f75486d](https://github.com/thi-ng/umbrella/commit/f75486d)) 
- **pointfree:** support data vals in program, add collect(), update readme ([6cac0c7](https://github.com/thi-ng/umbrella/commit/6cac0c7))
