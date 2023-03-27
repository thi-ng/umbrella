# Change Log

- **Last updated**: 2023-03-27T19:05:49Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [6.2.25](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.2.25) (2023-02-10)

#### 🩹 Bug fixes

- [#375](https://github.com/thi-ng/umbrella/issues/375) update .set() for existing keys ([4c1da10](https://github.com/thi-ng/umbrella/commit/4c1da10))
  - when updating existing keys, add missing value propagation
    for intermediate nodes
  - add tests
- [#375](https://github.com/thi-ng/umbrella/issues/375) fix SortedMap.delete(), add fuzz test ([ccbdfeb](https://github.com/thi-ng/umbrella/commit/ccbdfeb))
  - fix issue which caused lane corruption and detached heads
  - add fuzz test repeatedly setting/deleting keys

### [6.2.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.2.24) (2023-02-05)

#### 🩹 Bug fixes

- [#375](https://github.com/thi-ng/umbrella/issues/375) major update/rewrite SortedMap impl ([d5f793a](https://github.com/thi-ng/umbrella/commit/d5f793a))
  - update Node impl to use 4-way linkage
  - simplify .set()/.delete() impls
  - remove obsolete SortedMapOpts.capacity
  - add SortedMapOpts.rnd to customize IRandom impl
    (e.g. for reproducible behavior/branching)
  - update tests
  - update deps (add [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/main/packages/random))

## [6.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.2.0) (2022-07-19)

#### 🚀 Features

- add BidirIndex & tests ([26f749f](https://github.com/thi-ng/umbrella/commit/26f749f))

### [6.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.1.9) (2022-06-09)

#### ♻️ Refactoring

- various (minor) TS4.7 related updates/fixes ([9d9ecae](https://github.com/thi-ng/umbrella/commit/9d9ecae))

## [6.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.1.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [6.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.0.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [6.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@6.0.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests

#### 🚀 Features

- add sortedObject() ([51ba06a](https://github.com/thi-ng/umbrella/commit/51ba06a))

#### 🩹 Bug fixes

- update merge/meld fns ([25cdc0a](https://github.com/thi-ng/umbrella/commit/25cdc0a))
  - the object spread operator under ESNext compile target
    doesn't exclude the `__proto__` property anymore, hence
    we add the `copyObj()` helper

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update node inspect import ([6786c35](https://github.com/thi-ng/umbrella/commit/6786c35))
- update imports ([51f4867](https://github.com/thi-ng/umbrella/commit/51f4867))
- update imports (transducers) ([3fcf9a9](https://github.com/thi-ng/umbrella/commit/3fcf9a9))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- restructure package/utils ([966f5e4](https://github.com/thi-ng/umbrella/commit/966f5e4))
- rename internals ([e7818a7](https://github.com/thi-ng/umbrella/commit/e7818a7))

### [5.2.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@5.2.12) (2021-08-17)

#### ♻️ Refactoring

- update internal destructures ([e847a27](https://github.com/thi-ng/umbrella/commit/e847a27))
- update ArraySet.get() ([40383fa](https://github.com/thi-ng/umbrella/commit/40383fa))
  - add explicit [@thi.ng/array](https://github.com/thi-ng/umbrella/tree/main/packages/array) dep (already was a transient dep)
  - update destructuring

## [5.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@5.2.0) (2021-03-30)

#### 🚀 Features

- add selectDefinedKeys*() fns ([e0977db](https://github.com/thi-ng/umbrella/commit/e0977db))
- add renameTransformedKeys() ([3190537](https://github.com/thi-ng/umbrella/commit/3190537))

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@5.1.0) (2021-02-20)

#### 🚀 Features

- update meldApplyObj/meldObjWith() ([97dda16](https://github.com/thi-ng/umbrella/commit/97dda16))
  - improve protection against prototype poisoning using extended
    isIllegalKey() predicate from [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/main/packages/checks)

### [5.0.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@5.0.7) (2020-09-22)

#### ♻️ Refactoring

- remove obsolete string coercions ([9919c56](https://github.com/thi-ng/umbrella/commit/9919c56))

### [5.0.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@5.0.6) (2020-09-13)

#### ♻️ Refactoring

- update imports, use new function aliases ([17a0be0](https://github.com/thi-ng/umbrella/commit/17a0be0))
- update imports, use new Fn types in various pkgs ([ced1e5d](https://github.com/thi-ng/umbrella/commit/ced1e5d))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@5.0.0) (2020-07-25)

#### 🛑 Breaking changes

- add TrieMap, rename MultiTrie ([cc2d139](https://github.com/thi-ng/umbrella/commit/cc2d139))
  - add simplified TrieMap for string keys and Map-like semantics
  - add MultiTrie ctor opts to allow custom value sets
  - add defTrieMap()/defMultiTrie() factory fns
  - add/update tests
- BREAKING CHANGE: rename Trie => MultiTrie

#### 🚀 Features

- update MultiTrie.suffixes() ([ec110ae](https://github.com/thi-ng/umbrella/commit/ec110ae))
  - add opt separator arg for arraylike keys

## [4.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@4.5.0) (2020-07-17)

#### 🚀 Features

- add Trie.knownPrefix() ([26ddd2c](https://github.com/thi-ng/umbrella/commit/26ddd2c))

### [4.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@4.4.1) (2020-07-08)

#### 🩹 Bug fixes

- set combinator arg types ([1cbbf27](https://github.com/thi-ng/umbrella/commit/1cbbf27))
  - unionR() / intersectionR() / differenceR()

## [4.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@4.4.0) (2020-07-08)

#### 🚀 Features

- disallow `__proto__` in merge fns ([d637996](https://github.com/thi-ng/umbrella/commit/d637996))
  - many thanks to @nkint for reporting! :)

## [4.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@4.3.0) (2020-07-04)

#### 🚀 Features

- add mutable merge fns ([ec6abe4](https://github.com/thi-ng/umbrella/commit/ec6abe4))
  - add `meldApplyObj()`
  - add `meldDeepObj()`
  - add `meldObjWith()`
  - update exisiting immutable versions
  - add doc strings
  - add/update tests

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@4.2.0) (2020-06-20)

#### 🚀 Features

- update Trie to allow custom value sets ([777829c](https://github.com/thi-ng/umbrella/commit/777829c))
- add null checks for merge* fns ([7baa3ba](https://github.com/thi-ng/umbrella/commit/7baa3ba))
  - update arg types to allow nullish args

#### ♻️ Refactoring

- update arg types for .forEach() ([aafb0b7](https://github.com/thi-ng/umbrella/commit/aafb0b7))
  - remove readonly flags due to built-in TS Set/Map interface defs

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@4.1.0) (2020-06-14)

#### 🚀 Features

- add Trie and tests ([84b6517](https://github.com/thi-ng/umbrella/commit/84b6517))

### [4.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@4.0.8) (2020-05-14)

#### ♻️ Refactoring

- update types/generics (TS3.9) ([467d33e](https://github.com/thi-ng/umbrella/commit/467d33e))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@4.0.0) (2020-03-28)

#### 🛑 Breaking changes

- [#210](https://github.com/thi-ng/umbrella/issues/210), add `defXXX` factory fns ([48ae24a](https://github.com/thi-ng/umbrella/commit/48ae24a))
  - add defArraySet()
  - add defLLSet()
  - add defSortedSet()
  - add defSparseSet()
  - add defEquivMap()
  - add defHashMap()
  - add defSortedMap()
- BREAKING CHANGE: remove static `fromObject()` map factories
  - merged with defHashMap(), defSortedMap()

#### 🚀 Features

- re-add support for nodejs REPL inspection ([49024f7](https://github.com/thi-ng/umbrella/commit/49024f7))
  - custom Set/Map impls were showing up as empty in the REPL
    in recent Node versions (13.x)
  - adding @inspectable decorator mixin for all impls to provide hook
    for Node's inspection mechanism
  - Ref: nodejs/node[#32529](https://github.com/thi-ng/umbrella/issues/32529)

### [3.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@3.1.4) (2020-02-25)

#### ♻️ Refactoring

- update imports ([717a5a9](https://github.com/thi-ng/umbrella/commit/717a5a9))

### [3.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@3.1.2) (2020-01-24)

#### ♻️ Refactoring

- minor update IEquivSet (IClear) ([8d4745e](https://github.com/thi-ng/umbrella/commit/8d4745e))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@3.1.0) (2019-11-09)

#### 🚀 Features

- add reducer versions of difference, intersection, union ([058b9d3](https://github.com/thi-ng/umbrella/commit/058b9d3))

#### 🩹 Bug fixes

- fix off-by-one error in sparseSet() factory, add tests ([94ff308](https://github.com/thi-ng/umbrella/commit/94ff308))

#### ♻️ Refactoring

- fix [#169](https://github.com/thi-ng/umbrella/issues/169), update set op reducers ([0e0a76f](https://github.com/thi-ng/umbrella/commit/0e0a76f))
  - extract internal xformSetOp HOF reducer
  - update unionR/intersectionR/differenceR()

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@3.0.0) (2019-08-21)

#### 🛑 Breaking changes

- update XXXMap.dissoc() signature to unify API ([632c57a](https://github.com/thi-ng/umbrella/commit/632c57a))
- BREAKING CHANGE: dissoc() method signature changed from varargs to `Iterable<K>`
  Example:
  - previously: `HashMap.dissoc(1, 2, 3)`
  - now: `HashMap.dissoc([1, 2, 3])`
  This new signature is the same as used by `dissoc()` standalone fn and
  the `disj()` methods of the various Sets in this package.

#### ♻️ Refactoring

- minor update SortedMap.compare() ([93d8e34](https://github.com/thi-ng/umbrella/commit/93d8e34))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@2.4.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([7931e14](https://github.com/thi-ng/umbrella/commit/7931e14))

#### 🩹 Bug fixes

- update SortedMap.fromObject() - PropertyKey => string ([48688da](https://github.com/thi-ng/umbrella/commit/48688da))
- update generics (TS3.5.2) ([75a4f72](https://github.com/thi-ng/umbrella/commit/75a4f72))

#### ♻️ Refactoring

- TS strictNullChecks, fix [#88](https://github.com/thi-ng/umbrella/issues/88) ([d592845](https://github.com/thi-ng/umbrella/commit/d592845))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@2.3.0) (2019-05-22)

#### 🚀 Features

- add SparseSet8/16/32 ([b5994d9](https://github.com/thi-ng/umbrella/commit/b5994d9))
- add sparseSet factory fn ([867eaa3](https://github.com/thi-ng/umbrella/commit/867eaa3))

#### ♻️ Refactoring

- minor updates ArraySet ([c5e2323](https://github.com/thi-ng/umbrella/commit/c5e2323))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@2.2.0) (2019-04-09)

#### 🚀 Features

- add withoutKeys*(), ensureSet/Map fns ([5173fda](https://github.com/thi-ng/umbrella/commit/5173fda))

### [2.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@2.1.2) (2019-04-06)

#### 🩹 Bug fixes

- fix mergeApplyMap, update other merge fns, add tests ([a0f3941](https://github.com/thi-ng/umbrella/commit/a0f3941))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@2.1.0) (2019-04-02)

#### 🚀 Features

- add HashMap w/ linear probing, update deps ([e3b84ab](https://github.com/thi-ng/umbrella/commit/e3b84ab))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@2.0.1) (2019-04-02)

#### 🩹 Bug fixes

- add missing return type decls ([1913bb4](https://github.com/thi-ng/umbrella/commit/1913bb4))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@2.0.0) (2019-03-28)

#### 🛑 Breaking changes

- update set combinator ops ([9e78d20](https://github.com/thi-ng/umbrella/commit/9e78d20))
  - add opt `out` arg
- BREAKING CHANGE: make `difference`, `intersection`, `union` immutable ops
- fix/update invertMap() / invertObj() ([b57a1c0](https://github.com/thi-ng/umbrella/commit/b57a1c0))
  - add opt `dest` arg
- BREAKING CHANGE: changed result type handling in invertMap(), see docstring
- update type sigs & args for various fns ([7bf2504](https://github.com/thi-ng/umbrella/commit/7bf2504))
- BREAKING CHANGE: improved/stricter type sigs & args for various fns
  - commonKeys*()
  - indexed()
  - join() / joinWith()
  - renameKeys*()
  - selectKeys*()
  - first()

#### 🚀 Features

- make .forEach() args readonly, add Symbol.toStringTag ([3749d41](https://github.com/thi-ng/umbrella/commit/3749d41))
- add polymorphic into() ([4577646](https://github.com/thi-ng/umbrella/commit/4577646))

#### ♻️ Refactoring

- update IEquivSet & EquivSetConstructor ([75cc900](https://github.com/thi-ng/umbrella/commit/75cc900))

### [1.0.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@1.0.12) (2019-03-21)

#### 🚀 Features

- update SortedSet, IEquivSet, add tests ([e8234e8](https://github.com/thi-ng/umbrella/commit/e8234e8))
  - remove opts() from IEquivSet
  - add min/max key query opts for SortedSet.entries/keys/values()

### [1.0.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@1.0.11) (2019-03-18)

#### ♻️ Refactoring

- re-implement SortedMap / skiplist, update tests ([5bb09d9](https://github.com/thi-ng/umbrella/commit/5bb09d9))

### [1.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@1.0.9) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- use arrow fns, update formatting ([aaf2723](https://github.com/thi-ng/umbrella/commit/aaf2723))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@0.6.0) (2018-08-24)

#### 🚀 Features

- add IReducible impls for SortedMap & SortedSet ([f14f7ce](https://github.com/thi-ng/umbrella/commit/f14f7ce))

#### ♻️ Refactoring

- update/replace deps (iterators => transducers) ([abe1a88](https://github.com/thi-ng/umbrella/commit/abe1a88))
- replace Pair & SEMAPHORE w/ identical [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) defs ([c22ac3c](https://github.com/thi-ng/umbrella/commit/c22ac3c))

### [0.5.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@0.5.11) (2018-08-01)

#### ♻️ Refactoring

- TS3.0 PropertyKey handling ([2234313](https://github.com/thi-ng/umbrella/commit/2234313))

### [0.5.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@0.5.9) (2018-07-03)

#### 🩹 Bug fixes

- minor SortedSet fixes ([33f0d19](https://github.com/thi-ng/umbrella/commit/33f0d19))
  - partial opts for SortedSet ctor
  - update first() return type

### [0.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@0.5.1) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@0.5.0) (2018-05-09)

#### 🚀 Features

- add mapKeysObj() / mapKeysMap() ([a9574a0](https://github.com/thi-ng/umbrella/commit/a9574a0))
- add new functions, update arg & return types ([5991be6](https://github.com/thi-ng/umbrella/commit/5991be6))
  - add commonKeys*()
  - add mergeMapWith() / mergeObjWith()
  - add mergeDeepObj()
  - rename mapKeys*() => mergeApply*()
  - update renameKeys*() arg/return types
  - update indexed() arg types
  - update join() & joinWith() arg/return types
  - update re-exports

### [0.4.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@0.4.2) (2018-04-20)

#### 🩹 Bug fixes

- allow partial options arg for EquivMap ctor ([bb11ddf](https://github.com/thi-ng/umbrella/commit/bb11ddf))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@0.4.0) (2018-04-13)

#### 🚀 Features

- add renameKeysMap ([bfabe80](https://github.com/thi-ng/umbrella/commit/bfabe80))

#### ⏱ Performance improvements

- update equiv() impls ([d1178ac](https://github.com/thi-ng/umbrella/commit/d1178ac))

#### ♻️ Refactoring

- update EquivMap, update SortedSet, add docs ([1f8af6c](https://github.com/thi-ng/umbrella/commit/1f8af6c))
  - add IEquivSet interface
  - add EquivSetOpts & EquivMapOpts
  - rename ArrayMap => EquivMap
  - update EquivMap to support customizable key set impls
  - rename ArraySet => LLSet
  - add actual arraybased ArraySet
  - add into() & disj() impls for SortedSet
  - add various doc strings

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@0.3.0) (2018-04-13)

#### 🚀 Features

- add SortedMap & tests, minor refactor EquivMap ([ae0eae8](https://github.com/thi-ng/umbrella/commit/ae0eae8))
- add SortedSet, update SortedMap ([cb4976f](https://github.com/thi-ng/umbrella/commit/cb4976f))
  - add compare() & equiv() impls for SortedMap

#### ♻️ Refactoring

- add private impls for EquivMap/Set ([a769856](https://github.com/thi-ng/umbrella/commit/a769856))
- rename EquivMap/Set => ArrayMap/Set, export interfaces ([8756027](https://github.com/thi-ng/umbrella/commit/8756027))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/associative@0.2.0) (2018-04-10)

#### 🚀 Features

- initial import [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/main/packages/associative) ([cc70dbc](https://github.com/thi-ng/umbrella/commit/cc70dbc))
- add EquivSet.first() ([0dc9f64](https://github.com/thi-ng/umbrella/commit/0dc9f64))
