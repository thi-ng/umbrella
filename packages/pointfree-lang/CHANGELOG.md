# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@1.1.12...@thi.ng/pointfree-lang@1.1.13) (2020-03-06)

**Note:** Version bump only for package @thi.ng/pointfree-lang





## [1.1.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@1.1.11...@thi.ng/pointfree-lang@1.1.12) (2020-02-26)

**Note:** Version bump only for package @thi.ng/pointfree-lang





## [1.1.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@1.1.10...@thi.ng/pointfree-lang@1.1.11) (2020-02-26)

**Note:** Version bump only for package @thi.ng/pointfree-lang





## [1.1.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@1.1.9...@thi.ng/pointfree-lang@1.1.10) (2020-02-25)

**Note:** Version bump only for package @thi.ng/pointfree-lang





## [1.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@1.1.4...@thi.ng/pointfree-lang@1.1.5) (2019-09-21)

### Bug Fixes

* **pointfree-lang:** update imports ([8de1366](https://github.com/thi-ng/umbrella/commit/8de1366))

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@1.0.14...@thi.ng/pointfree-lang@1.1.0) (2019-07-07)

### Features

* **pointfree:** enable TS strict compiler flags (refactor) ([1f9d155](https://github.com/thi-ng/umbrella/commit/1f9d155))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@0.2.27...@thi.ng/pointfree-lang@1.0.0) (2019-01-21)

### Bug Fixes

* **pointfree-lang:** update NodeType handling ([227be4b](https://github.com/thi-ng/umbrella/commit/227be4b))

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

## [0.2.26](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@0.2.25...@thi.ng/pointfree-lang@0.2.26) (2018-12-15)

### Bug Fixes

* **pointfree-lang:** update parser stubs (TS3.2.x) ([3b3e503](https://github.com/thi-ng/umbrella/commit/3b3e503))

<a name="0.2.22"></a>
## [0.2.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@0.2.21...@thi.ng/pointfree-lang@0.2.22) (2018-09-24)

### Performance Improvements

* **pointfree-lang:** `NodeType` => const enum ([a7b9a42](https://github.com/thi-ng/umbrella/commit/a7b9a42))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@0.1.3...@thi.ng/pointfree-lang@0.2.0) (2018-04-03)

### Bug Fixes

* **pointfree-lang:** update grammar (parse order), add tests ([5450e50](https://github.com/thi-ng/umbrella/commit/5450e50))

### Features

* **pointfree-lang:** implement dynamic var scoping & local var grammar ([3310ec3](https://github.com/thi-ng/umbrella/commit/3310ec3))
* **pointfree-lang:** overhaul visitor quote/array & map handling, grammar ([769e84d](https://github.com/thi-ng/umbrella/commit/769e84d))
* **pointfree-lang:** update grammar, aliases, ASTNode, NodeType ([ee684c7](https://github.com/thi-ng/umbrella/commit/ee684c7))

<a name="0.1.3"></a>
## [0.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@0.1.2...@thi.ng/pointfree-lang@0.1.3) (2018-04-01)

### Bug Fixes

* **pointfree-lang:** object literal grammar rule (allow initial WS) ([208b5c3](https://github.com/thi-ng/umbrella/commit/208b5c3))

<a name="0.1.2"></a>
## [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/pointfree-lang@0.1.1...@thi.ng/pointfree-lang@0.1.2) (2018-03-31)

### Bug Fixes

* **pointfree-lang:** add ensureEnv, update re-exports, update readme ([659cce9](https://github.com/thi-ng/umbrella/commit/659cce9))
