# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@6.1.0...@thi.ng/api@6.1.1) (2019-04-26)


### Bug Fixes

* **api:** make LogLevel non-const enum, minor fix ConsoleLogger ([88d5e9d](https://github.com/thi-ng/umbrella/commit/88d5e9d))





# [6.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@6.0.1...@thi.ng/api@6.1.0) (2019-04-24)


### Features

* **api:** add common logging types & default impls ([4578604](https://github.com/thi-ng/umbrella/commit/4578604))
* **api:** update ILogger, freeze NULL_LOGGER ([27ff8de](https://github.com/thi-ng/umbrella/commit/27ff8de))





## [6.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@6.0.0...@thi.ng/api@6.0.1) (2019-04-02)

**Note:** Version bump only for package @thi.ng/api





# [6.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@5.1.0...@thi.ng/api@6.0.0) (2019-03-28)


### Features

* **api:** add new types, update existing ([560eb90](https://github.com/thi-ng/umbrella/commit/560eb90))


### BREAKING CHANGES

* **api:** split up, remove & update various interfaces

- split IAssociative => IAssoc, IAssocIn
- update IDissoc, add IDissocIn
- split IGet => IGet, IGetIn
- update IInto generics & return type
- update ISet, remove IImmutableSet
- update IStack, remove IImmutableStack





# [5.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@5.0.3...@thi.ng/api@5.1.0) (2019-03-10)


### Features

* **api:** add additional Fn arities ([33c7dfe](https://github.com/thi-ng/umbrella/commit/33c7dfe))
* **api:** add more Fn type aliases, update existing ([3707e61](https://github.com/thi-ng/umbrella/commit/3707e61))



# [5.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@4.2.4...@thi.ng/api@5.0.0) (2019-01-21)


### Bug Fixes

* **api:** update assert(), re-export mixin() ([9f91cfa](https://github.com/thi-ng/umbrella/commit/9f91cfa))


### Build System

* **api:** update package build scripts / outputs ([f913d7b](https://github.com/thi-ng/umbrella/commit/f913d7b))


### Features

* **api:** add assert() ([d381ace](https://github.com/thi-ng/umbrella/commit/d381ace))


### BREAKING CHANGES

* **api:** rename mixins to avoid name clashes, update decorators

- append `Mixin` suffix to all mixins (i.e. `INotify` => `INotifyMixin`)
- update re-exports of mixins & decorators (no more nested child namespace)


<a name="4.2.0"></a>
# [4.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@4.1.1...@thi.ng/api@4.2.0) (2018-09-22)


### Features

* **api:** add `IToHiccup` interface ([e390a54](https://github.com/thi-ng/umbrella/commit/e390a54))


<a name="4.1.0"></a>
# [4.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@4.0.6...@thi.ng/api@4.1.0) (2018-08-24)


### Features

* **api:** add new/move type aliases into api.ts ([cf30ba2](https://github.com/thi-ng/umbrella/commit/cf30ba2))
* **api:** add NumericArray and TypedArray types ([519394b](https://github.com/thi-ng/umbrella/commit/519394b))


<a name="4.0.0"></a>
# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@3.0.1...@thi.ng/api@4.0.0) (2018-05-12)


### Code Refactoring

* **api:** update interfaces, add docs ([9b38860](https://github.com/thi-ng/umbrella/commit/9b38860))


### BREAKING CHANGES

* **api:** IBind, IEnable now include generics,
update IIndexed, IMeta, ISet, IStack

- add IInto
- add IImmutableSet
- add IImmutableStack
- minor update IEnabled mixin


<a name="3.0.0"></a>
# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@2.3.2...@thi.ng/api@3.0.0) (2018-05-10)


### Code Refactoring

* **api:** remove obsolete files from package ([f051ca3](https://github.com/thi-ng/umbrella/commit/f051ca3))


### BREAKING CHANGES

* **api:** @thi.ng/api now only contains type declarations,
decorators and mixins. All other features have been moved
to new dedicated packages:

- @thi.ng/bench
- @thi.ng/compare
- @thi.ng/equiv
- @thi.ng/errors


<a name="2.3.1"></a>
## [2.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@2.3.0...@thi.ng/api@2.3.1) (2018-04-29)


### Performance Improvements

* **api:** major speedup equivObject(), update equivSet() ([7fdf172](https://github.com/thi-ng/umbrella/commit/7fdf172))




<a name="2.3.0"></a>
# [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@2.2.0...@thi.ng/api@2.3.0) (2018-04-26)


### Features

* **api:** support more types in equiv(), add tests ([2ac8bff](https://github.com/thi-ng/umbrella/commit/2ac8bff))

<a name="2.2.0"></a>
# [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@2.1.3...@thi.ng/api@2.2.0) (2018-04-08)


### Features

* **api:** add bench() & timed() utils ([d310345](https://github.com/thi-ng/umbrella/commit/d310345))


<a name="2.1.1"></a>
## [2.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@2.1.0...@thi.ng/api@2.1.1) (2018-03-28)


### Bug Fixes

* **api:** illegalState() creates IllegalStateError ([2b7e99b](https://github.com/thi-ng/umbrella/commit/2b7e99b))


<a name="2.1.0"></a>
# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@2.0.4...@thi.ng/api@2.1.0) (2018-03-21)


### Features

* **api:** add error types & ctor fns ([4d3785f](https://github.com/thi-ng/umbrella/commit/4d3785f))


<a name="2.0.1"></a>
## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@2.0.0...@thi.ng/api@2.0.1) (2018-02-02)


### Bug Fixes

* **api:** update compare() & equiv() ([110a9de](https://github.com/thi-ng/umbrella/commit/110a9de))


<a name="2.0.0"></a>
# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@1.5.0...@thi.ng/api@2.0.0) (2018-02-01)


### Bug Fixes

* **api:** fix equiv string handling, update tests ([1354e29](https://github.com/thi-ng/umbrella/commit/1354e29))


### Features

* **api:** update equiv() null handling, add tests ([878520e](https://github.com/thi-ng/umbrella/commit/878520e))


### BREAKING CHANGES

* **api:** equiv now treats null & undefined as equal


<a name="1.5.0"></a>
# [1.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@1.4.2...@thi.ng/api@1.5.0) (2018-01-31)


### Features

* **api:** add Predicate2 & StatefulPredicate2 types ([fbf8453](https://github.com/thi-ng/umbrella/commit/fbf8453))


<a name="1.4.0"></a>
# [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@1.3.0...@thi.ng/api@1.4.0) (2018-01-29)


### Features

* **api:** update IWatch & mixin, boolean returns ([bddd5ce](https://github.com/thi-ng/umbrella/commit/bddd5ce))


<a name="1.3.0"></a>
# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/api@1.2.1...@thi.ng/api@1.3.0) (2018-01-28)


### Features

* **api:** add StatefulPredicate ([c74353b](https://github.com/thi-ng/umbrella/commit/c74353b))
