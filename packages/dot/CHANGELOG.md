# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.2.8...@thi.ng/dot@1.2.9) (2020-06-14)

**Note:** Version bump only for package @thi.ng/dot





## [1.2.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.2.7...@thi.ng/dot@1.2.8) (2020-06-01)

**Note:** Version bump only for package @thi.ng/dot





# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.1.14...@thi.ng/dot@1.2.0) (2020-04-03)


### Features

* **dot:** support includes, update subgraph handling ([ed53c90](https://github.com/thi-ng/umbrella/commit/ed53c909f7eb41c85c04f55de279e0d82cfed307))





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.0.12...@thi.ng/dot@1.1.0) (2019-07-07)

### Features

* **dot:** enable TS strict compiler flags (refactor) ([29e0cb4](https://github.com/thi-ng/umbrella/commit/29e0cb4))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@0.1.18...@thi.ng/dot@1.0.0) (2019-01-21)

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
# 0.1.0 (2018-05-09)

### Features

* **dot:** initial import [@thi](https://github.com/thi).ng/dot ([500dfa3](https://github.com/thi-ng/umbrella/commit/500dfa3))
