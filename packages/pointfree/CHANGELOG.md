# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.2.0...@thi.ng/pointfree@1.2.1) (2019-09-21)

**Note:** Version bump only for package @thi.ng/pointfree





# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.1.3...@thi.ng/pointfree@1.2.0) (2019-08-21)


### Features

* **pointfree:** add new r-stack words, refactor ([dbad162](https://github.com/thi-ng/umbrella/commit/dbad162))





## [1.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.1.2...@thi.ng/pointfree@1.1.3) (2019-08-16)

**Note:** Version bump only for package @thi.ng/pointfree





## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.1.1...@thi.ng/pointfree@1.1.2) (2019-07-31)

**Note:** Version bump only for package @thi.ng/pointfree





## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.1.0...@thi.ng/pointfree@1.1.1) (2019-07-12)

**Note:** Version bump only for package @thi.ng/pointfree





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.0.14...@thi.ng/pointfree@1.1.0) (2019-07-07)


### Features

* **pointfree:** enable TS strict compiler flags (refactor) ([1f9d155](https://github.com/thi-ng/umbrella/commit/1f9d155))





## [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.0.13...@thi.ng/pointfree@1.0.14) (2019-05-22)


### Bug Fixes

* **pointfree:** update safeMode handling ([d27bcba](https://github.com/thi-ng/umbrella/commit/d27bcba))





## [1.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.0.12...@thi.ng/pointfree@1.0.13) (2019-04-26)

**Note:** Version bump only for package @thi.ng/pointfree





## [1.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.0.11...@thi.ng/pointfree@1.0.12) (2019-04-24)

**Note:** Version bump only for package @thi.ng/pointfree





## [1.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.0.10...@thi.ng/pointfree@1.0.11) (2019-04-02)

**Note:** Version bump only for package @thi.ng/pointfree





## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@1.0.9...@thi.ng/pointfree@1.0.10) (2019-03-28)

**Note:** Version bump only for package @thi.ng/pointfree







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.8.15...@thi.ng/pointfree@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


<a name="0.8.0"></a>
# [0.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.7.10...@thi.ng/pointfree@0.8.0) (2018-05-13)


### Features

* **pointfree:** add execjs for host calls, update readme ([373701b](https://github.com/thi-ng/umbrella/commit/373701b))


<a name="0.7.9"></a>
## [0.7.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.7.8...@thi.ng/pointfree@0.7.9) (2018-05-10)


### Bug Fixes

* **pointfree:** minor update error handling ([5391d98](https://github.com/thi-ng/umbrella/commit/5391d98))


<a name="0.7.0"></a>
# [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.6.2...@thi.ng/pointfree@0.7.0) (2018-04-03)


### Features

* **pointfree:** add copy() word ([68a8dba](https://github.com/thi-ng/umbrella/commit/68a8dba))
* **pointfree:** add math ops, update load/loadkey, update tests ([2101e92](https://github.com/thi-ng/umbrella/commit/2101e92))


<a name="0.6.1"></a>
## [0.6.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.6.0...@thi.ng/pointfree@0.6.1) (2018-03-31)


### Bug Fixes

* **pointfree:** reexport ensureStack fns ([a0bf781](https://github.com/thi-ng/umbrella/commit/a0bf781))




<a name="0.6.0"></a>
# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.5.0...@thi.ng/pointfree@0.6.0) (2018-03-31)


### Features

* **pointfree:** add caseq() ([5db90c5](https://github.com/thi-ng/umbrella/commit/5db90c5))




<a name="0.5.0"></a>
# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.4.0...@thi.ng/pointfree@0.5.0) (2018-03-29)


### Features

* **pointfree:** add combinators, update controlflow words, remove execq ([3dc30a8](https://github.com/thi-ng/umbrella/commit/3dc30a8))
* **pointfree:** add more dataflow combinators, words & tests ([b096e43](https://github.com/thi-ng/umbrella/commit/b096e43))




<a name="0.4.0"></a>
# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.3.0...@thi.ng/pointfree@0.4.0) (2018-03-29)


### Features

* **pointfree:** add new words, constructs, aliases, fix re-exports ([943b4f9](https://github.com/thi-ng/umbrella/commit/943b4f9))




<a name="0.3.0"></a>
# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.2.1...@thi.ng/pointfree@0.3.0) (2018-03-28)


### Bug Fixes

* **pointfree:** add 0-arity comp() (identity fn) ([10d5a34](https://github.com/thi-ng/umbrella/commit/10d5a34))
* **pointfree:** wordU(), add tests ([1a01f9a](https://github.com/thi-ng/umbrella/commit/1a01f9a))


### Features

* **pointfree:** add new words, rename words, remove mapnth, pushl2 ([0f0c382](https://github.com/thi-ng/umbrella/commit/0f0c382))
* **pointfree:** add rstack, update StackContext ([1c4cd2f](https://github.com/thi-ng/umbrella/commit/1c4cd2f))
* **pointfree:** further restructure, perf, add tests ([3252554](https://github.com/thi-ng/umbrella/commit/3252554))
* **pointfree:** major refactor & restructure ([a48361d](https://github.com/thi-ng/umbrella/commit/a48361d))
* **pointfree:** major update readme, package ([e52b869](https://github.com/thi-ng/umbrella/commit/e52b869))
* **pointfree:** update all words to return stack ([79b4ce3](https://github.com/thi-ng/umbrella/commit/79b4ce3))
* **pointfree:** update word/wordU, add append(), tuple(), join() ([f3f0bec](https://github.com/thi-ng/umbrella/commit/f3f0bec))




<a name="0.2.1"></a>
## [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.2.0...@thi.ng/pointfree@0.2.1) (2018-03-23)


### Bug Fixes

* **pointfree:** fix readme/docs ([f211c39](https://github.com/thi-ng/umbrella/commit/f211c39))




<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree@0.1.0...@thi.ng/pointfree@0.2.0) (2018-03-23)


### Features

* **pointfree:** add unwrap, quatations, math/bitops, array/obj access ([f75486d](https://github.com/thi-ng/umbrella/commit/f75486d))
* **pointfree:** support data vals in program, add collect(), update readme ([6cac0c7](https://github.com/thi-ng/umbrella/commit/6cac0c7))
