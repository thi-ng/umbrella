# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@6.0.1...@thi.ng/hdom@6.0.2) (2018-12-16)


### Bug Fixes

* **hdom:** life cycle init / release handling ([6d85c62](https://github.com/thi-ng/umbrella/commit/6d85c62))





## [6.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@6.0.0...@thi.ng/hdom@6.0.1) (2018-12-15)

**Note:** Version bump only for package @thi.ng/hdom





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





## [5.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.2.1...@thi.ng/hdom@5.2.2) (2018-12-09)

**Note:** Version bump only for package @thi.ng/hdom





## [5.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.2.0...@thi.ng/hdom@5.2.1) (2018-12-08)

**Note:** Version bump only for package @thi.ng/hdom





# [5.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.1.0...@thi.ng/hdom@5.2.0) (2018-11-07)


### Features

* **hdom:** update auto-deref ctx behavior ([3016116](https://github.com/thi-ng/umbrella/commit/3016116))





# [5.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.0.7...@thi.ng/hdom@5.1.0) (2018-11-06)


### Features

* **hdom:** add support for dynamic user context vals ([6a3a873](https://github.com/thi-ng/umbrella/commit/6a3a873))





## [5.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.0.6...@thi.ng/hdom@5.0.7) (2018-10-21)

**Note:** Version bump only for package @thi.ng/hdom





## [5.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.0.5...@thi.ng/hdom@5.0.6) (2018-10-17)

**Note:** Version bump only for package @thi.ng/hdom





<a name="5.0.5"></a>
## [5.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.0.4...@thi.ng/hdom@5.0.5) (2018-09-28)

**Note:** Version bump only for package @thi.ng/hdom





<a name="5.0.4"></a>
## [5.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.0.3...@thi.ng/hdom@5.0.4) (2018-09-26)

**Note:** Version bump only for package @thi.ng/hdom





<a name="5.0.3"></a>
## [5.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.0.2...@thi.ng/hdom@5.0.3) (2018-09-24)


### Bug Fixes

* **hdom:** add DEFAULT_IMPL to re-exports ([#47](https://github.com/thi-ng/umbrella/issues/47)) ([50fa649](https://github.com/thi-ng/umbrella/commit/50fa649))





<a name="5.0.2"></a>
## [5.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.0.1...@thi.ng/hdom@5.0.2) (2018-09-24)

**Note:** Version bump only for package @thi.ng/hdom





<a name="5.0.1"></a>
## [5.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@5.0.0...@thi.ng/hdom@5.0.1) (2018-09-23)

**Note:** Version bump only for package @thi.ng/hdom





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


<a name="4.0.5"></a>
## [4.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@4.0.4...@thi.ng/hdom@4.0.5) (2018-09-10)

**Note:** Version bump only for package @thi.ng/hdom





<a name="4.0.4"></a>
## [4.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@4.0.3...@thi.ng/hdom@4.0.4) (2018-09-03)




**Note:** Version bump only for package @thi.ng/hdom

<a name="4.0.3"></a>
## [4.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@4.0.2...@thi.ng/hdom@4.0.3) (2018-09-01)


### Bug Fixes

* **hdom:** fix local import ([e66a492](https://github.com/thi-ng/umbrella/commit/e66a492))




<a name="4.0.2"></a>
## [4.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@4.0.1...@thi.ng/hdom@4.0.2) (2018-09-01)




**Note:** Version bump only for package @thi.ng/hdom

<a name="4.0.1"></a>
## [4.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@4.0.0...@thi.ng/hdom@4.0.1) (2018-09-01)




**Note:** Version bump only for package @thi.ng/hdom

<a name="4.0.0"></a>
# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.35...@thi.ng/hdom@4.0.0) (2018-08-31)


### Features

* **hdom:** add DOM hydration support (SSR), update start() ([#39](https://github.com/thi-ng/umbrella/issues/39)) ([9f8010d](https://github.com/thi-ng/umbrella/commit/9f8010d))
* **hdom:** update HDOMOpts & start() ([5e74a9c](https://github.com/thi-ng/umbrella/commit/5e74a9c))


### BREAKING CHANGES

* **hdom:** start() args now as options object




<a name="3.0.35"></a>
## [3.0.35](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.34...@thi.ng/hdom@3.0.35) (2018-08-27)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.34"></a>
## [3.0.34](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.33...@thi.ng/hdom@3.0.34) (2018-08-24)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.33"></a>
## [3.0.33](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.32...@thi.ng/hdom@3.0.33) (2018-08-24)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.32"></a>
## [3.0.32](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.31...@thi.ng/hdom@3.0.32) (2018-08-01)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.31"></a>
## [3.0.31](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.30...@thi.ng/hdom@3.0.31) (2018-08-01)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.30"></a>
## [3.0.30](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.29...@thi.ng/hdom@3.0.30) (2018-07-20)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.29"></a>
## [3.0.29](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.28...@thi.ng/hdom@3.0.29) (2018-07-11)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.28"></a>
## [3.0.28](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.27...@thi.ng/hdom@3.0.28) (2018-07-10)


### Bug Fixes

* **hdom:** always update "value" attrib last in diffAttributes() ([126103b](https://github.com/thi-ng/umbrella/commit/126103b))




<a name="3.0.27"></a>
## [3.0.27](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.26...@thi.ng/hdom@3.0.27) (2018-07-04)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.26"></a>
## [3.0.26](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.25...@thi.ng/hdom@3.0.26) (2018-06-21)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.25"></a>
## [3.0.25](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.24...@thi.ng/hdom@3.0.25) (2018-06-18)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.24"></a>
## [3.0.24](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.23...@thi.ng/hdom@3.0.24) (2018-05-30)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.23"></a>
## [3.0.23](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.22...@thi.ng/hdom@3.0.23) (2018-05-15)


### Bug Fixes

* **hdom:** delay init() lifecycle call to ensure children are available ([2482b16](https://github.com/thi-ng/umbrella/commit/2482b16))




<a name="3.0.22"></a>
## [3.0.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.21...@thi.ng/hdom@3.0.22) (2018-05-14)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.21"></a>
## [3.0.21](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.20...@thi.ng/hdom@3.0.21) (2018-05-14)


### Bug Fixes

* **hdom:** component obj lifecycle method thisArg handling ([ade96f8](https://github.com/thi-ng/umbrella/commit/ade96f8))




<a name="3.0.20"></a>
## [3.0.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.19...@thi.ng/hdom@3.0.20) (2018-05-14)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.19"></a>
## [3.0.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.18...@thi.ng/hdom@3.0.19) (2018-05-13)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.18"></a>
## [3.0.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.17...@thi.ng/hdom@3.0.18) (2018-05-12)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.17"></a>
## [3.0.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.16...@thi.ng/hdom@3.0.17) (2018-05-10)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.16"></a>
## [3.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.15...@thi.ng/hdom@3.0.16) (2018-05-10)




**Note:** Version bump only for package @thi.ng/hdom

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




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.10"></a>
## [3.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.9...@thi.ng/hdom@3.0.10) (2018-04-26)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.9"></a>
## [3.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.8...@thi.ng/hdom@3.0.9) (2018-04-22)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.8"></a>
## [3.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.7...@thi.ng/hdom@3.0.8) (2018-04-19)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.7"></a>
## [3.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.6...@thi.ng/hdom@3.0.7) (2018-04-17)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.6"></a>
## [3.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.5...@thi.ng/hdom@3.0.6) (2018-04-16)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.5"></a>
## [3.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.4...@thi.ng/hdom@3.0.5) (2018-04-15)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.4"></a>
## [3.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.3...@thi.ng/hdom@3.0.4) (2018-04-14)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.3"></a>
## [3.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.2...@thi.ng/hdom@3.0.3) (2018-04-13)




**Note:** Version bump only for package @thi.ng/hdom

<a name="3.0.2"></a>
## [3.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@3.0.1...@thi.ng/hdom@3.0.2) (2018-04-10)




**Note:** Version bump only for package @thi.ng/hdom

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




<a name="2.3.3"></a>
## [2.3.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.3.2...@thi.ng/hdom@2.3.3) (2018-04-04)




**Note:** Version bump only for package @thi.ng/hdom

<a name="2.3.2"></a>
## [2.3.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.3.1...@thi.ng/hdom@2.3.2) (2018-04-01)




**Note:** Version bump only for package @thi.ng/hdom

<a name="2.3.1"></a>
## [2.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.3.0...@thi.ng/hdom@2.3.1) (2018-03-28)




**Note:** Version bump only for package @thi.ng/hdom

<a name="2.3.0"></a>
# [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.2.5...@thi.ng/hdom@2.3.0) (2018-03-21)


### Features

* **hdom:** update error handling, add [@thi](https://github.com/thi).ng/api dep ([f5173f1](https://github.com/thi-ng/umbrella/commit/f5173f1))




<a name="2.2.5"></a>
## [2.2.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.2.4...@thi.ng/hdom@2.2.5) (2018-03-18)




**Note:** Version bump only for package @thi.ng/hdom

<a name="2.2.4"></a>
## [2.2.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.2.3...@thi.ng/hdom@2.2.4) (2018-03-18)




**Note:** Version bump only for package @thi.ng/hdom

<a name="2.2.3"></a>
## [2.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.2.2...@thi.ng/hdom@2.2.3) (2018-03-18)




**Note:** Version bump only for package @thi.ng/hdom

<a name="2.2.2"></a>
## [2.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.2.1...@thi.ng/hdom@2.2.2) (2018-03-17)




**Note:** Version bump only for package @thi.ng/hdom

<a name="2.2.1"></a>
## [2.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.2.0...@thi.ng/hdom@2.2.1) (2018-03-16)




**Note:** Version bump only for package @thi.ng/hdom

<a name="2.2.0"></a>
# [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.1.1...@thi.ng/hdom@2.2.0) (2018-03-14)


### Features

* **hdom:** add auto deref() support ([0fe6c44](https://github.com/thi-ng/umbrella/commit/0fe6c44))




<a name="2.1.1"></a>
## [2.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom@2.1.0...@thi.ng/hdom@2.1.1) (2018-03-08)




**Note:** Version bump only for package @thi.ng/hdom

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




<a name="1.2.1"></a>
## [1.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@1.2.0...@thi.ng/hiccup-dom@1.2.1) (2018-03-03)




**Note:** Version bump only for package @thi.ng/hiccup-dom

<a name="1.2.0"></a>
# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@1.1.0...@thi.ng/hiccup-dom@1.2.0) (2018-02-28)


### Features

* **hiccup-dom:** add support for function attribs, add docs ([ca17389](https://github.com/thi-ng/umbrella/commit/ca17389))




<a name="1.1.0"></a>
# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@1.0.7...@thi.ng/hiccup-dom@1.1.0) (2018-02-27)


### Features

* **hiccup-dom:** fix [#11](https://github.com/thi-ng/umbrella/issues/11), update normalizeTree/normalizeElement ([f5b6675](https://github.com/thi-ng/umbrella/commit/f5b6675))
* **hiccup-dom:** start(), add optional spans arg ([8a070ff](https://github.com/thi-ng/umbrella/commit/8a070ff))




<a name="1.0.7"></a>
## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@1.0.6...@thi.ng/hiccup-dom@1.0.7) (2018-02-26)




**Note:** Version bump only for package @thi.ng/hiccup-dom

<a name="1.0.6"></a>
## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@1.0.5...@thi.ng/hiccup-dom@1.0.6) (2018-02-24)




**Note:** Version bump only for package @thi.ng/hiccup-dom

<a name="1.0.5"></a>
## [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@1.0.4...@thi.ng/hiccup-dom@1.0.5) (2018-02-18)




**Note:** Version bump only for package @thi.ng/hiccup-dom

<a name="1.0.4"></a>
## [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@1.0.3...@thi.ng/hiccup-dom@1.0.4) (2018-02-08)




**Note:** Version bump only for package @thi.ng/hiccup-dom

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




<a name="0.1.2"></a>
## [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@0.1.1...@thi.ng/hiccup-dom@0.1.2) (2018-02-02)




**Note:** Version bump only for package @thi.ng/hiccup-dom

<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hiccup-dom@0.1.0...@thi.ng/hiccup-dom@0.1.1) (2018-02-01)


### Bug Fixes

* **hiccup-dom:** boolean attribs ([1f6bb58](https://github.com/thi-ng/umbrella/commit/1f6bb58))




<a name="0.1.0"></a>
# 0.1.0 (2018-02-01)


### Features

* **hiccup-dom:** add start(), update readme ([3101698](https://github.com/thi-ng/umbrella/commit/3101698))
* **hiccup-dom:** re-import package (MBP2010) ([30ffd00](https://github.com/thi-ng/umbrella/commit/30ffd00))
