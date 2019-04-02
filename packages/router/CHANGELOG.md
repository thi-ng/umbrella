# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@1.0.8...@thi.ng/router@1.0.9) (2019-04-02)

**Note:** Version bump only for package @thi.ng/router





## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@1.0.7...@thi.ng/router@1.0.8) (2019-03-28)

**Note:** Version bump only for package @thi.ng/router







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/router@0.1.30...@thi.ng/router@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


<a name="0.1.0"></a>
# 0.1.0 (2018-03-11)


### Features

* **router:** re-import router package (MBP2010), minor refactor & fixes ([07b4e06](https://github.com/thi-ng/umbrella/commit/07b4e06))
