# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@1.2.0...@thi.ng/compare@1.2.1) (2020-03-06)

**Note:** Version bump only for package @thi.ng/compare





# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@1.1.4...@thi.ng/compare@1.2.0) (2020-03-01)


### Features

* **compare:** add HOFs, restructure, update deps & docs ([ed2c41c](https://github.com/thi-ng/umbrella/commit/ed2c41c120f6447b05022d74e510017a1f4a6257))





## [1.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@1.1.3...@thi.ng/compare@1.1.4) (2020-02-26)

**Note:** Version bump only for package @thi.ng/compare





## [1.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@1.1.2...@thi.ng/compare@1.1.3) (2020-02-26)

**Note:** Version bump only for package @thi.ng/compare





## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@1.1.1...@thi.ng/compare@1.1.2) (2020-02-25)

**Note:** Version bump only for package @thi.ng/compare





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@1.0.10...@thi.ng/compare@1.1.0) (2019-11-30)

### Features

* **compare:** add compareNumAsc/Desc numeric comparators ([2b8fafc](https://github.com/thi-ng/umbrella/commit/2b8fafc9eca040b649ade479203537bbd9ba54ef))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/compare@0.1.12...@thi.ng/compare@1.0.0) (2019-01-21)

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
# 0.1.0 (2018-05-10)

### Features

* **compare:** add new package [@thi](https://github.com/thi).ng/compare ([e4a87c4](https://github.com/thi-ng/umbrella/commit/e4a87c4))
