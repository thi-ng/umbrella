# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@2.1.5...@thi.ng/strings@2.1.6) (2021-08-17)

**Note:** Version bump only for package @thi.ng/strings





## [2.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@2.1.4...@thi.ng/strings@2.1.5) (2021-08-08)

**Note:** Version bump only for package @thi.ng/strings





## [2.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@2.1.3...@thi.ng/strings@2.1.4) (2021-08-08)

**Note:** Version bump only for package @thi.ng/strings





## [2.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@2.1.2...@thi.ng/strings@2.1.3) (2021-08-04)

**Note:** Version bump only for package @thi.ng/strings





## [2.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@2.1.1...@thi.ng/strings@2.1.2) (2021-07-01)

**Note:** Version bump only for package @thi.ng/strings





## [2.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@2.1.0...@thi.ng/strings@2.1.1) (2021-06-08)

**Note:** Version bump only for package @thi.ng/strings





# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@2.0.0...@thi.ng/strings@2.1.0) (2021-03-24)


### Features

* **strings:** add ruler(), grid() fns, update readme ([d93cbf9](https://github.com/thi-ng/umbrella/commit/d93cbf9708c414e703fde61e80b5762f34899aa4))





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.15.6...@thi.ng/strings@2.0.0) (2021-03-24)


### Features

* **strings:** add ANSI predicates ([928694b](https://github.com/thi-ng/umbrella/commit/928694b0a46a7a58b0b4ab56562afceb0b6c8d8d))
* **strings:** major update wordWrap() & co. ([9c9c9cc](https://github.com/thi-ng/umbrella/commit/9c9c9cc1abe68ec32edbe91ac5c277561cafd3c4))
* **strings:** update split() args ([ea503e8](https://github.com/thi-ng/umbrella/commit/ea503e8abdf3598ccd0c1abf5d484164ea73890c))


### BREAKING CHANGES

* **strings:** major update wordWrap(), wordWrapLines() etc.

- update arguments
- add `WordWrapOpts` to configure wordwrap behavior
- add `IWordSplit` interface and `SPLIT_PLAIN`, `SPLIT_ANSI` impls
- implement hardwrap mode





# [1.15.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.14.0...@thi.ng/strings@1.15.0) (2021-02-20)


### Features

* **strings:** add int/intLocale, vector formatters ([ac55fe0](https://github.com/thi-ng/umbrella/commit/ac55fe007bed81d04848eddb1c4145eb26cdd437))





# [1.14.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.13.0...@thi.ng/strings@1.14.0) (2021-01-13)


### Features

* **strings:** add stringify() HOF ([4ab7e72](https://github.com/thi-ng/umbrella/commit/4ab7e72bf87cbf058a38ca85b5e2853a5f432d9d))





# [1.13.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.12.0...@thi.ng/strings@1.13.0) (2021-01-10)


### Features

* **strings:** add stripAnsi(), lengthAnsi() fns ([86fa81a](https://github.com/thi-ng/umbrella/commit/86fa81acb7dfcf1dc3d6f5600cbf427ee44cf722))
* **strings:** add tab conversion fns ([aefdd97](https://github.com/thi-ng/umbrella/commit/aefdd97e27fce2405860e817b9c5b4aedb6e59e4))
* **strings:** add wordWrap*() fns ([2a283c0](https://github.com/thi-ng/umbrella/commit/2a283c018592d8cc76f4ef83b69c6ce3c378aca6))
* **strings:** update padLeft/Right() args ([118f97f](https://github.com/thi-ng/umbrella/commit/118f97f1fca27671c53d184484a7b435e6eedf88))


### Performance Improvements

* **strings:** simplify string default delim regexp ([bb62760](https://github.com/thi-ng/umbrella/commit/bb62760f2069a1f7edeaa09ce0e0639047789af3))





# [1.12.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.11.4...@thi.ng/strings@1.12.0) (2021-01-05)


### Features

* **strings:** add interpolateKeys() ([bd78d1d](https://github.com/thi-ng/umbrella/commit/bd78d1dba5e467e6cda452e6db6fcd0fb9a3cf19))





## [1.11.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.11.3...@thi.ng/strings@1.11.4) (2021-01-02)


### Bug Fixes

* **strings:** update slugifyGH() replacements ([#174](https://github.com/thi-ng/umbrella/issues/174)) ([98a9135](https://github.com/thi-ng/umbrella/commit/98a91351728d730446f9654fc93317c1bece77ed))





# [1.11.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.10.0...@thi.ng/strings@1.11.0) (2020-11-24)


### Features

* **strings:** add split() iterator ([6d2ec4f](https://github.com/thi-ng/umbrella/commit/6d2ec4fccc688acf5a541ea51c9705faca1c9835))





# [1.10.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.9.6...@thi.ng/strings@1.10.0) (2020-09-22)


### Features

* **strings:** add BOM const, update pkg meta ([b6751fc](https://github.com/thi-ng/umbrella/commit/b6751fc506a28a075ea9fee1a5f6d3520449f5af))
* **strings:** add escape(), update unescape(), add tests ([e0d5f1e](https://github.com/thi-ng/umbrella/commit/e0d5f1edcdf78b075908c4973586a0f1732fe006))
* **strings:** add unescape() ([924466b](https://github.com/thi-ng/umbrella/commit/924466bc5d5f16ced3da95fa2f24dab2bfad0679))





# [1.9.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.8.13...@thi.ng/strings@1.9.0) (2020-07-08)


### Features

* **strings:** add computeCursorPos() ([c178d00](https://github.com/thi-ng/umbrella/commit/c178d00edcdbe12cec492a1629c80bf359116b66))





# [1.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.7.0...@thi.ng/strings@1.8.0) (2020-03-28)


### Features

* **strings:** add join() HOF ([1c5c46f](https://github.com/thi-ng/umbrella/commit/1c5c46f5ac832865266613a6d71024507238b694))
* **strings:** add slugifyGH(), refactor slugify() ([1ef805b](https://github.com/thi-ng/umbrella/commit/1ef805be3f0347751eba6da0122e1277a5b81e21))
* **strings:** add trim() HOF ([350a6c6](https://github.com/thi-ng/umbrella/commit/350a6c6cb010e00f2053fb41eeb0f458ee8fb715))





# [1.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.6.0...@thi.ng/strings@1.7.0) (2020-03-06)


### Features

* **strings:** add char group LUTs for classification ([c3ff006](https://github.com/thi-ng/umbrella/commit/c3ff006b237bece057f675d62a47d29bab9df413))





# [1.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.5.2...@thi.ng/strings@1.6.0) (2020-03-01)


### Features

* **strings:** add defFormat() HOF ([62f4e04](https://github.com/thi-ng/umbrella/commit/62f4e04c72e8822930da3f337898dae0ea51f6d0))





# [1.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.4.0...@thi.ng/strings@1.5.0) (2020-02-25)


### Features

* **strings:** add uuid() formatter ([4592742](https://github.com/thi-ng/umbrella/commit/4592742daad1020aa336e3d819324f4555223160))





# [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.3.3...@thi.ng/strings@1.4.0) (2020-01-26)

### Features

* **strings:** add format() helpers (str, ignore) ([df87b7c](https://github.com/thi-ng/umbrella/commit/df87b7c7f0a1f9fa5b299fe8311fda02f40ab4cd))
* **strings:** add interpolate() ([a19e409](https://github.com/thi-ng/umbrella/commit/a19e4094494a8b4af6c35626e4a99394e0481a4e))

# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.2.3...@thi.ng/strings@1.3.0) (2019-09-21)

### Features

* **strings:** add charRange(), add radix & zero-pad presets ([c9e5a63](https://github.com/thi-ng/umbrella/commit/c9e5a63))

# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.1.3...@thi.ng/strings@1.2.0) (2019-07-07)

### Features

* **strings:** enable TS strict compiler flags (refactor) ([76cecb8](https://github.com/thi-ng/umbrella/commit/76cecb8))

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.0.7...@thi.ng/strings@1.1.0) (2019-04-15)

### Features

* **strings:** add hstr() (hollerith) ([619e9ef](https://github.com/thi-ng/umbrella/commit/619e9ef))

## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@1.0.1...@thi.ng/strings@1.0.2) (2019-01-31)

### Bug Fixes

* **strings:** fix [#70](https://github.com/thi-ng/umbrella/issues/70), replace kebab() regex w/ legacy version ([3adabc4](https://github.com/thi-ng/umbrella/commit/3adabc4))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@0.7.1...@thi.ng/strings@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### Features

* **strings:** add floatFixedWidth(), update float() ([816c9c0](https://github.com/thi-ng/umbrella/commit/816c9c0))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

# [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@0.6.0...@thi.ng/strings@0.7.0) (2018-12-13)

### Bug Fixes

* **strings:** update kebab() ([1b298f7](https://github.com/thi-ng/umbrella/commit/1b298f7))

### Features

* **strings:** add slugify() ([8dcc73a](https://github.com/thi-ng/umbrella/commit/8dcc73a))

# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@0.5.2...@thi.ng/strings@0.6.0) (2018-11-08)

### Features

* **strings:** add configurable units() HOF & presets ([33e915b](https://github.com/thi-ng/umbrella/commit/33e915b))

<a name="0.5.0"></a>
# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@0.4.3...@thi.ng/strings@0.5.0) (2018-09-25)

### Features

* **strings:** add splice(), refactor repeat(), add tests ([0cce048](https://github.com/thi-ng/umbrella/commit/0cce048))

<a name="0.4.3"></a>
## [0.4.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@0.4.2...@thi.ng/strings@0.4.3) (2018-09-24)

### Bug Fixes

* **strings:** rename number parsers ([8cbfb97](https://github.com/thi-ng/umbrella/commit/8cbfb97))

<a name="0.3.0"></a>
# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@0.2.0...@thi.ng/strings@0.3.0) (2018-08-24)

### Bug Fixes

* **strings:** buffer length (for null inputs) (`center()`) ([5209c42](https://github.com/thi-ng/umbrella/commit/5209c42))

### Features

* **strings:** add case converters ([653a175](https://github.com/thi-ng/umbrella/commit/653a175))
* **strings:** add truncateLeft() & wrap() stringers ([1a20bc2](https://github.com/thi-ng/umbrella/commit/1a20bc2))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@0.1.1...@thi.ng/strings@0.2.0) (2018-08-08)

### Features

* **strings:** add opt prefix arg for radix() ([5864f2c](https://github.com/thi-ng/umbrella/commit/5864f2c))

<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/strings@0.1.0...@thi.ng/strings@0.1.1) (2018-08-08)

### Bug Fixes

* **strings:** float type decl ([b2ebbfc](https://github.com/thi-ng/umbrella/commit/b2ebbfc))

<a name="0.1.0"></a>
# 0.1.0 (2018-08-08)

### Features

* **strings:** re-import & update [@thi](https://github.com/thi).ng/strings from MBP2010 ([40781eb](https://github.com/thi-ng/umbrella/commit/40781eb))
