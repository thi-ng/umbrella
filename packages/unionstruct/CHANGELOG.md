# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.24](https://github.com/thi-ng/umbrella/compare/@thi.ng/unionstruct@1.1.23...@thi.ng/unionstruct@1.1.24) (2020-09-13)

**Note:** Version bump only for package @thi.ng/unionstruct





## [1.1.23](https://github.com/thi-ng/umbrella/compare/@thi.ng/unionstruct@1.1.22...@thi.ng/unionstruct@1.1.23) (2020-08-28)

**Note:** Version bump only for package @thi.ng/unionstruct





## [1.1.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/unionstruct@1.1.21...@thi.ng/unionstruct@1.1.22) (2020-08-17)

**Note:** Version bump only for package @thi.ng/unionstruct





## [1.1.21](https://github.com/thi-ng/umbrella/compare/@thi.ng/unionstruct@1.1.20...@thi.ng/unionstruct@1.1.21) (2020-08-16)

**Note:** Version bump only for package @thi.ng/unionstruct





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/unionstruct@1.0.6...@thi.ng/unionstruct@1.1.0) (2019-07-07)

### Bug Fixes

* **unionstruct:** allow undefined/null args ([9636495](https://github.com/thi-ng/umbrella/commit/9636495))
* **unionstruct:** FieldType typo ([02beff9](https://github.com/thi-ng/umbrella/commit/02beff9))

### Features

* **unionstruct:** enable TS strict compiler flags (refactor) ([eb639fe](https://github.com/thi-ng/umbrella/commit/eb639fe))

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
