# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@0.3.1...@thi.ng/bench@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@0.2.4...@thi.ng/bench@0.3.0) (2018-10-21)


### Features

* **bench:** add timedResult() / benchResult() ([0cf708f](https://github.com/thi-ng/umbrella/commit/0cf708f))


<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/bench@0.1.5...@thi.ng/bench@0.2.0) (2018-08-28)


### Features

* **bench:** add opt prefix arg, update docs ([4a37367](https://github.com/thi-ng/umbrella/commit/4a37367))


<a name="0.1.0"></a>
# 0.1.0 (2018-05-10)


### Features

* **bench:** add new package [@thi](https://github.com/thi).ng/bench ([9466d4b](https://github.com/thi-ng/umbrella/commit/9466d4b))
