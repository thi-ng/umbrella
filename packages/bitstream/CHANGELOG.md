# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitstream@1.1.17...@thi.ng/bitstream@1.1.18) (2020-06-14)

**Note:** Version bump only for package @thi.ng/bitstream





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitstream@1.0.6...@thi.ng/bitstream@1.1.0) (2019-07-07)

### Features

* **bitstream:** enable TS strict compiler flags (refactor) ([ab18310](https://github.com/thi-ng/umbrella/commit/ab18310))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitstream@0.4.21...@thi.ng/bitstream@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

<a name="0.4.0"></a>
# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bitstream@0.3.7...@thi.ng/bitstream@0.4.0) (2018-03-21)

### Features

* **bitstream:** update error handling, add [@thi](https://github.com/thi).ng/atom dep ([0fc1038](https://github.com/thi-ng/umbrella/commit/0fc1038))
