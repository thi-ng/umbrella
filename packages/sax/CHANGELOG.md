# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.40](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@1.1.39...@thi.ng/sax@1.1.40) (2020-11-24)

**Note:** Version bump only for package @thi.ng/sax





## [1.1.39](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@1.1.38...@thi.ng/sax@1.1.39) (2020-09-22)

**Note:** Version bump only for package @thi.ng/sax





## [1.1.38](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@1.1.37...@thi.ng/sax@1.1.38) (2020-09-13)

**Note:** Version bump only for package @thi.ng/sax





## [1.1.37](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@1.1.36...@thi.ng/sax@1.1.37) (2020-08-28)

**Note:** Version bump only for package @thi.ng/sax





## [1.1.36](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@1.1.35...@thi.ng/sax@1.1.36) (2020-08-17)

**Note:** Version bump only for package @thi.ng/sax





## [1.1.35](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@1.1.34...@thi.ng/sax@1.1.35) (2020-08-16)

**Note:** Version bump only for package @thi.ng/sax





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@1.0.19...@thi.ng/sax@1.1.0) (2019-07-07)

### Features

* **sax:** enable TS strict compiler flags (refactor) ([eb30aaf](https://github.com/thi-ng/umbrella/commit/eb30aaf))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@0.5.13...@thi.ng/sax@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

<a name="0.5.0"></a>
# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@0.4.1...@thi.ng/sax@0.5.0) (2018-09-25)

### Features

* **sax:** add opt support for boolean attribs, add tests ([5119b67](https://github.com/thi-ng/umbrella/commit/5119b67))

<a name="0.4.0"></a>
# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@0.3.21...@thi.ng/sax@0.4.0) (2018-09-24)

### Features

* **sax:** update parse() to return iterator if input given (optional) ([665564c](https://github.com/thi-ng/umbrella/commit/665564c))

<a name="0.3.0"></a>
# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@0.2.0...@thi.ng/sax@0.3.0) (2018-06-20)

### Features

* **sax:** add children & trim opts, add CDATA support ([882f394](https://github.com/thi-ng/umbrella/commit/882f394))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@0.1.1...@thi.ng/sax@0.2.0) (2018-06-19)

### Features

* **sax:** add support for escape seqs, minor optimizations ([e824b6b](https://github.com/thi-ng/umbrella/commit/e824b6b))

<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/sax@0.1.0...@thi.ng/sax@0.1.1) (2018-06-18)

### Bug Fixes

* **sax:** correct docs in readme ([0e4662d](https://github.com/thi-ng/umbrella/commit/0e4662d))

<a name="0.1.0"></a>
# 0.1.0 (2018-06-18)

### Features

* **sax:** add entity support, update result format, update states ([0f2fcdf](https://github.com/thi-ng/umbrella/commit/0f2fcdf))
* **sax:** add support for proc & doctype elements, update `end` results ([a4766a5](https://github.com/thi-ng/umbrella/commit/a4766a5))
* **sax:** emit child elements with `end` results, support comments ([3dea954](https://github.com/thi-ng/umbrella/commit/3dea954))
* **sax:** initial import ([dce189f](https://github.com/thi-ng/umbrella/commit/dce189f))
* **sax:** update error handling, add parse() wrapper, add FSMOpts ([64f2378](https://github.com/thi-ng/umbrella/commit/64f2378))
