# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.3.10...@thi.ng/dcons@2.3.11) (2021-02-24)

**Note:** Version bump only for package @thi.ng/dcons





## [2.3.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.3.9...@thi.ng/dcons@2.3.10) (2021-02-20)

**Note:** Version bump only for package @thi.ng/dcons





# [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.2.32...@thi.ng/dcons@2.3.0) (2020-10-19)


### Features

* **dcons:** add self-organizing list types, add tests ([d7fd88f](https://github.com/thi-ng/umbrella/commit/d7fd88fe37d3fcc758c632395b2e354e3fbdbcae))





# [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.1.6...@thi.ng/dcons@2.2.0) (2019-11-30)

### Features

* **dcons:** add dcons() factory fn (syntax sugar) ([6e09446](https://github.com/thi-ng/umbrella/commit/6e0944661d92effea2b117d09a5b24facd61fc42))
* **dcons:** add ISeqable impl (seq()) & tests ([1cfb02a](https://github.com/thi-ng/umbrella/commit/1cfb02a828db3670a745e7d4e30867614f594881))
* **dcons:** add sort(), update shuffle(), add tests ([f6bbcd5](https://github.com/thi-ng/umbrella/commit/f6bbcd57a04cf71389eb8045773275748ef0c50c))

# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@2.0.19...@thi.ng/dcons@2.1.0) (2019-07-07)

### Bug Fixes

* **dcons:** .toString() impl, use String() conv for values ([d6b1f11](https://github.com/thi-ng/umbrella/commit/d6b1f11))

### Features

* **dcons:** address TS strictNullChecks flag, minor optimizations ([cb5ad93](https://github.com/thi-ng/umbrella/commit/cb5ad93))
* **dcons:** enable TS strict compiler flags (refactor) ([4e73667](https://github.com/thi-ng/umbrella/commit/4e73667))

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@1.1.23...@thi.ng/dcons@2.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

<a name="1.1.0"></a>
# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@1.0.7...@thi.ng/dcons@1.1.0) (2018-08-24)

### Features

* **dcons:** add IReducible impl, update deps & imports ([1280cfd](https://github.com/thi-ng/umbrella/commit/1280cfd))

<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@0.3.6...@thi.ng/dcons@1.0.0) (2018-05-12)

### Code Refactoring

* **dcons:** update pop() ([67f0e54](https://github.com/thi-ng/umbrella/commit/67f0e54))

### BREAKING CHANGES

* **dcons:** due to @thi.ng/api/IStack update, pop() now returns
popped value instead of the list itself

- minor other refactoring

<a name="0.3.0"></a>
# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@0.2.0...@thi.ng/dcons@0.3.0) (2018-04-22)

### Features

* **dcons:** add asHead()/asTail() ([19f7e76](https://github.com/thi-ng/umbrella/commit/19f7e76))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dcons@0.1.19...@thi.ng/dcons@0.2.0) (2018-04-10)

### Features

* **dcons:** add IEmpty impl, minor refactoring ([10c089a](https://github.com/thi-ng/umbrella/commit/10c089a))
