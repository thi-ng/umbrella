# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/unionstruct@1.0.0...@thi.ng/unionstruct@1.0.1) (2019-01-21)

**Note:** Version bump only for package @thi.ng/unionstruct





# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/unionstruct@0.1.19...@thi.ng/unionstruct@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.
