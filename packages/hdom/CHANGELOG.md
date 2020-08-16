# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [8.2.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@8.2.5...@thi.ng/hdom@8.2.6) (2020-08-16)

**Note:** Version bump only for package @thi.ng/hdom





# [8.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@8.1.0...@thi.ng/hdom@8.2.0) (2020-07-02)


### Features

* **hdom:** add RDFa `prefix` attrib support, update xmlns imports ([f0e7460](https://github.com/thi-ng/umbrella/commit/f0e746006a2058a7ddae8413aeefc6451dd8401e))
* **hdom:** update deps, update xmlns import ([99fbae7](https://github.com/thi-ng/umbrella/commit/99fbae79cc3ae07fedf2e681c2882e96e62a375f))





# [8.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@8.0.30...@thi.ng/hdom@8.1.0) (2020-06-28)


### Features

* **hdom:** add support `class` attrib object vals ([074985a](https://github.com/thi-ng/umbrella/commit/074985a02df8665e2d80fb74491534ee2897516c))
* **hdom:** add support for event listener strings ([db8d350](https://github.com/thi-ng/umbrella/commit/db8d35074fbfe620ffebf2c217eec5cd48e9341a))





## [8.0.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@8.0.17...@thi.ng/hdom@8.0.18) (2020-04-06)


### Performance Improvements

* **hdom:** update event attrib checks ([ab54d3c](https://github.com/thi-ng/umbrella/commit/ab54d3cc670dc9b060984e28066d4a84dde64ec2))





## [8.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@8.0.6...@thi.ng/hdom@8.0.7) (2019-11-09)

### Bug Fixes

* **hdom:** fix [#72](https://github.com/thi-ng/umbrella/issues/72), update __skip diff handling & HDOMImplementation ([0071df3](https://github.com/thi-ng/umbrella/commit/0071df3c770d6f9de10301853cbd6ecb06df83fb))

## [8.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@8.0.5...@thi.ng/hdom@8.0.6) (2019-09-23)

### Bug Fixes

* **hdom:** fix [#133](https://github.com/thi-ng/umbrella/issues/133) boolean attrib handling, add more element properties ([c4bf94f](https://github.com/thi-ng/umbrella/commit/c4bf94f))

# [8.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@7.2.8...@thi.ng/hdom@8.0.0) (2019-07-07)

### Code Refactoring

* **hdom:** address TS strictNullChecks flag ([d83600a](https://github.com/thi-ng/umbrella/commit/d83600a))

### Features

* **hdom:** enable TS strict compiler flags (refactor) ([7f093b9](https://github.com/thi-ng/umbrella/commit/7f093b9))

### BREAKING CHANGES

* **hdom:** all HDOMImplementation methods now mandatory, update return types

## [7.2.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@7.2.4...@thi.ng/hdom@7.2.5) (2019-04-17)

### Bug Fixes

* **hdom:** update removeAttribs ([b17fb17](https://github.com/thi-ng/umbrella/commit/b17fb17))

## [7.2.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@7.2.3...@thi.ng/hdom@7.2.4) (2019-04-11)

### Performance Improvements

* **hdom:** minor update diffTree() ([f2efaa5](https://github.com/thi-ng/umbrella/commit/f2efaa5))

## [7.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@7.2.2...@thi.ng/hdom@7.2.3) (2019-04-05)

### Bug Fixes

* **hdom:** off-by-one error when updating child offsets after removal ([beef4e9](https://github.com/thi-ng/umbrella/commit/beef4e9))

# [7.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@7.1.4...@thi.ng/hdom@7.2.0) (2019-03-18)

### Features

* **hdom:** support more input el types in updateValueAttrib() ([8813344](https://github.com/thi-ng/umbrella/commit/8813344))

# [7.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@7.0.2...@thi.ng/hdom@7.1.0) (2019-02-10)

### Bug Fixes

* **hdom:** fix [#72](https://github.com/thi-ng/umbrella/issues/72), update normalizeElement() ([3ed4ea1](https://github.com/thi-ng/umbrella/commit/3ed4ea1))

### Features

* **hdom:** add scrollTop/Left property support in setAttrib() ([895da65](https://github.com/thi-ng/umbrella/commit/895da65))

# [7.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@6.1.0...@thi.ng/hdom@7.0.0) (2019-01-21)

### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))

### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols

# [6.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@6.0.4...@thi.ng/hdom@6.1.0) (2018-12-21)

### Features

* **hdom:** add support for event listener options, update readme ([6618c22](https://github.com/thi-ng/umbrella/commit/6618c22))

## [6.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@6.0.3...@thi.ng/hdom@6.0.4) (2018-12-21)

### Bug Fixes

* **hdom:** fix [#63](https://github.com/thi-ng/umbrella/issues/63) update removeChild() (IE11) ([9f48a76](https://github.com/thi-ng/umbrella/commit/9f48a76))

## [6.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@6.0.1...@thi.ng/hdom@6.0.2) (2018-12-16)

### Bug Fixes

* **hdom:** life cycle init / release handling ([6d85c62](https://github.com/thi-ng/umbrella/commit/6d85c62))

# [6.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.2.2...@thi.ng/hdom@6.0.0) (2018-12-13)

### Code Refactoring

* **hdom:** extend & simplify HDOMImplementation, update DEFAULT_IMPL ([6f2e8ee](https://github.com/thi-ng/umbrella/commit/6f2e8ee))

### Features

* **hdom:** add initial __skip ctrl attrib handling in diffTree() ([a4e6736](https://github.com/thi-ng/umbrella/commit/a4e6736))

### BREAKING CHANGES

* **hdom:** extend & simplify HDOMImplementation

- update args for HDOMImplementation methods
- add createElement(), createTextElement() & getElementById() methods
  to HDOMImplementation
- rename createDOM() => createTree(), make generic
- rename hydrateDOM() => hydrateTree(), make generic
- update / fix diffTree() __impl attrib handling:
  only delegate if __impl != current impl
- update resolveRoot() to require impl arg & delegate

# [5.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.1.0...@thi.ng/hdom@5.2.0) (2018-11-07)

### Features

* **hdom:** update auto-deref ctx behavior ([3016116](https://github.com/thi-ng/umbrella/commit/3016116))

# [5.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.0.7...@thi.ng/hdom@5.1.0) (2018-11-06)

### Features

* **hdom:** add support for dynamic user context vals ([6a3a873](https://github.com/thi-ng/umbrella/commit/6a3a873))

<a name="5.0.3"></a>
## [5.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.0.2...@thi.ng/hdom@5.0.3) (2018-09-24)

### Bug Fixes

* **hdom:** add DEFAULT_IMPL to re-exports ([#47](https://github.com/thi-ng/umbrella/issues/47)) ([50fa649](https://github.com/thi-ng/umbrella/commit/50fa649))

<a name="5.0.0"></a>
# [5.0.0](https://github.com/thi-ng/umbrella/compare/525d90d5...@thi.ng/hdom@5.0.0) (2018-09-22)

### Features

* **hdom:** generalize diffElement() ([#4](https://github.com/thi-ng/umbrella/issues/4)) ([525d90d](https://github.com/thi-ng/umbrella/commit/525d90d))
* **hdom:** update normalizeTree, add to HDOMImplementation ([59bb19c](https://github.com/thi-ng/umbrella/commit/59bb19c))
* **hdom:** reorg & extend HDOMImplementation ([1ac245f](https://github.com/thi-ng/umbrella/commit/1ac245f))
* **hdom:** add `.toHiccup()` interface support ([54ba0ce](https://github.com/thi-ng/umbrella/commit/54ba0ce))
* **hdom:** add renderOnce() ([5ef9cf0](https://github.com/thi-ng/umbrella/commit/5ef9cf0))

### Bug fixes

* **hdom:** minor fix (hydrateDOM) ([e4f780c](https://github.com/thi-ng/umbrella/commit/e4f780c))
* **hdom:** exclude hdom control attribs in setAttrib() ([0592063](https://github.com/thi-ng/umbrella/commit/0592063))
* **hdom:** delegate diffTree() to branch impl ([6c33901](https://github.com/thi-ng/umbrella/commit/6c33901))

### Performance Improvements

* **hdom:** add opt `__release` attrib to disable releaseDeep() ([2e3fb66](https://github.com/thi-ng/umbrella/commit/2e3fb66))
* **hdom:** update diffTree(), inline node type checks ([382c45c](https://github.com/thi-ng/umbrella/commit/382c45c))
* **hdom:** minor updates ([de17db8](https://github.com/thi-ng/umbrella/commit/de17db8))

### BREAKING CHANGES

* **hdom:** new names & call signatures for:

    - normalizeTree
    - diffElement => diffTree
    - createDOM
    - hydrateDOM
    - replaceChild

<a name="4.0.3"></a>
## [4.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@4.0.2...@thi.ng/hdom@4.0.3) (2018-09-01)

### Bug Fixes

* **hdom:** fix local import ([e66a492](https://github.com/thi-ng/umbrella/commit/e66a492))

<a name="4.0.0"></a>
# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.35...@thi.ng/hdom@4.0.0) (2018-08-31)

### Features

* **hdom:** add DOM hydration support (SSR), update start() ([#39](https://github.com/thi-ng/umbrella/issues/39)) ([9f8010d](https://github.com/thi-ng/umbrella/commit/9f8010d))
* **hdom:** update HDOMOpts & start() ([5e74a9c](https://github.com/thi-ng/umbrella/commit/5e74a9c))

### BREAKING CHANGES

* **hdom:** start() args now as options object

<a name="3.0.28"></a>
## [3.0.28](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.27...@thi.ng/hdom@3.0.28) (2018-07-10)

### Bug Fixes

* **hdom:** always update "value" attrib last in diffAttributes() ([126103b](https://github.com/thi-ng/umbrella/commit/126103b))

<a name="3.0.23"></a>
## [3.0.23](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.22...@thi.ng/hdom@3.0.23) (2018-05-15)

### Bug Fixes

* **hdom:** delay init() lifecycle call to ensure children are available ([2482b16](https://github.com/thi-ng/umbrella/commit/2482b16))

<a name="3.0.21"></a>
## [3.0.21](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.20...@thi.ng/hdom@3.0.21) (2018-05-14)

### Bug Fixes

* **hdom:** component obj lifecycle method thisArg handling ([ade96f8](https://github.com/thi-ng/umbrella/commit/ade96f8))

<a name="3.0.15"></a>
## [3.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.14...@thi.ng/hdom@3.0.15) (2018-05-09)

### Bug Fixes

* **hdom:** native boolean attrib handling (e.g. "checked") ([68ea086](https://github.com/thi-ng/umbrella/commit/68ea086))

<a name="3.0.14"></a>
## [3.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.13...@thi.ng/hdom@3.0.14) (2018-05-01)

### Bug Fixes

* **hdom:** boolean attrib reset/removal ([a93cb98](https://github.com/thi-ng/umbrella/commit/a93cb98))

<a name="3.0.13"></a>
## [3.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.12...@thi.ng/hdom@3.0.13) (2018-04-30)

### Performance Improvements

* **hdom:** only build linear diff edit log ([7a543a5](https://github.com/thi-ng/umbrella/commit/7a543a5))

<a name="3.0.12"></a>
## [3.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.11...@thi.ng/hdom@3.0.12) (2018-04-29)

### Performance Improvements

* **hdom:** update event handling in diffAttributes() ([31ec3af](https://github.com/thi-ng/umbrella/commit/31ec3af))

<a name="3.0.11"></a>
## [3.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.10...@thi.ng/hdom@3.0.11) (2018-04-26)

<a name="3.0.1"></a>
## [3.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.0...@thi.ng/hdom@3.0.1) (2018-04-09)

### Performance Improvements

* **hdom:** intern imported checks, update normalizeTree(), add docs, fix tests ([2a91e30](https://github.com/thi-ng/umbrella/commit/2a91e30))

<a name="3.0.0"></a>
# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.3.3...@thi.ng/hdom@3.0.0) (2018-04-08)

### Features

* **hdom:** fix [#13](https://github.com/thi-ng/umbrella/issues/13), add support for user context and pass to components ([70cfe06](https://github.com/thi-ng/umbrella/commit/70cfe06))

### BREAKING CHANGES

* **hdom:** component functions & lifecycle hooks now receive user
context object as their first arg. All components accepting arguments must
be updated, but can potentially be simplified at the same time.

<a name="2.3.0"></a>
# [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.2.5...@thi.ng/hdom@2.3.0) (2018-03-21)

### Features

* **hdom:** update error handling, add [@thi](https://github.com/thi).ng/api dep ([f5173f1](https://github.com/thi-ng/umbrella/commit/f5173f1))

<a name="2.2.0"></a>
# [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.1.1...@thi.ng/hdom@2.2.0) (2018-03-14)

### Features

* **hdom:** add auto deref() support ([0fe6c44](https://github.com/thi-ng/umbrella/commit/0fe6c44))

<a name="2.1.0"></a>
# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.0.0...@thi.ng/hdom@2.1.0) (2018-03-05)

### Features

* **hdom:** add support for frame skipping, add docs ([a200beb](https://github.com/thi-ng/umbrella/commit/a200beb))

<a name="2.0.0"></a>
# 2.0.0 (2018-03-03)

### Documentation

* **hdom:** update readme ([79e1b09](https://github.com/thi-ng/umbrella/commit/79e1b09))

### BREAKING CHANGES

* **hdom:** rename package hiccup-dom => hdom

<a name="1.2.0"></a>
# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@1.1.0...@thi.ng/hiccup-dom@1.2.0) (2018-02-28)

### Features

* **hiccup-dom:** add support for function attribs, add docs ([ca17389](https://github.com/thi-ng/umbrella/commit/ca17389))

<a name="1.1.0"></a>
# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@1.0.7...@thi.ng/hiccup-dom@1.1.0) (2018-02-27)

### Features

* **hiccup-dom:** fix [#11](https://github.com/thi-ng/umbrella/issues/11), update normalizeTree/normalizeElement ([f5b6675](https://github.com/thi-ng/umbrella/commit/f5b6675))
* **hiccup-dom:** start(), add optional spans arg ([8a070ff](https://github.com/thi-ng/umbrella/commit/8a070ff))

<a name="1.0.3"></a>
## [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@1.0.2...@thi.ng/hiccup-dom@1.0.3) (2018-02-04)

### Bug Fixes

* **hiccup-dom:** support parent DOM ID as arg start() ([1f4f4b8](https://github.com/thi-ng/umbrella/commit/1f4f4b8))

<a name="1.0.2"></a>
## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@1.0.1...@thi.ng/hiccup-dom@1.0.2) (2018-02-03)

### Bug Fixes

* **hiccup-dom:** fix [#3](https://github.com/thi-ng/umbrella/issues/3), update start() to be cancellable, add docs ([4edf45f](https://github.com/thi-ng/umbrella/commit/4edf45f))

<a name="1.0.1"></a>
## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@1.0.0...@thi.ng/hiccup-dom@1.0.1) (2018-02-03)

### Bug Fixes

* **hiccup-dom:** add NO_SPANS config ([944cbb3](https://github.com/thi-ng/umbrella/commit/944cbb3))

<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@0.1.2...@thi.ng/hiccup-dom@1.0.0) (2018-02-03)

### Code Refactoring

* **hiccup-dom:** update event attrib naming convention, update readme ([7cc5c93](https://github.com/thi-ng/umbrella/commit/7cc5c93))

### BREAKING CHANGES

* **hiccup-dom:** event attributes now just use `on` prefix, previously `on-`

<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@0.1.0...@thi.ng/hiccup-dom@0.1.1) (2018-02-01)

### Bug Fixes

* **hiccup-dom:** boolean attribs ([1f6bb58](https://github.com/thi-ng/umbrella/commit/1f6bb58))

<a name="0.1.0"></a>
# 0.1.0 (2018-02-01)

### Features

* **hiccup-dom:** add start(), update readme ([3101698](https://github.com/thi-ng/umbrella/commit/3101698))
* **hiccup-dom:** re-import package (MBP2010) ([30ffd00](https://github.com/thi-ng/umbrella/commit/30ffd00))
