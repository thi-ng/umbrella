# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@6.0.4...@thi.ng/associative@6.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/associative





## [6.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@6.0.3...@thi.ng/associative@6.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/associative





## [6.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@6.0.2...@thi.ng/associative@6.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/associative





## [6.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@6.0.1...@thi.ng/associative@6.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/associative





## [6.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@6.0.0...@thi.ng/associative@6.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/associative





# [6.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@5.2.16...@thi.ng/associative@6.0.0) (2021-10-12)


### Bug Fixes

* **associative:** update merge/meld fns ([25cdc0a](https://github.com/thi-ng/umbrella/commit/25cdc0ad397e60955f575130b870f1b00a2d6706))


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **associative:** add sortedObject() ([51ba06a](https://github.com/thi-ng/umbrella/commit/51ba06a6b22d7caa5b5c36925fa0a43631c31366))


### BREAKING CHANGES

* discontinue CommonJS & UMD versions

- only ESM modules will be published from now on
- CJS obsolete due to ESM support in recent versions of node:
  - i.e. launch NodeJS via:
  - `node --experimental-specifier-resolution=node --experimental-repl-await`
  - in the node REPL use `await import(...)` instead of `require()`
- UMD obsolete due to widespread browser support for ESM

Also:
- normalize/restructure/reorg all package.json files
- cleanup all build scripts, remove obsolete
- switch from mocha to @thi.ng/testament for all tests






#  [5.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@5.1.9...@thi.ng/associative@5.2.0) (2021-03-30) 

###  Features 

- **associative:** add renameTransformedKeys() ([3190537](https://github.com/thi-ng/umbrella/commit/31905378cc32ba7ccfd752803515136ba1507d17)) 
- **associative:** add selectDefinedKeys*() fns ([e0977db](https://github.com/thi-ng/umbrella/commit/e0977db6708abdaaa2ef9dc78d472d77467e30bb)) 

#  [5.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@5.0.17...@thi.ng/associative@5.1.0) (2021-02-20) 

###  Features 

- **associative:** update meldApplyObj/meldObjWith() ([97dda16](https://github.com/thi-ng/umbrella/commit/97dda16a8766314b137c5af2d504eb599d6cf2c5)) 

#  [5.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@4.5.1...@thi.ng/associative@5.0.0) (2020-07-25) 

###  Features 

- **associative:** add TrieMap, rename MultiTrie ([cc2d139](https://github.com/thi-ng/umbrella/commit/cc2d139b92e29a5813e67030ada6776f2736ca6c)) 
- **associative:** update MultiTrie.suffixes() ([ec110ae](https://github.com/thi-ng/umbrella/commit/ec110ae3f0fe6d0fc64b7544904a96b42534988d)) 

###  BREAKING CHANGES 

- **associative:** rename Trie => MultiTrie 

#  [4.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@4.4.1...@thi.ng/associative@4.5.0) (2020-07-17) 

###  Features 

- **associative:** add Trie.knownPrefix() ([26ddd2c](https://github.com/thi-ng/umbrella/commit/26ddd2ceaf7d9327cf0d6f65d9153cff476f2081)) 

##  [4.4.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@4.4.0...@thi.ng/associative@4.4.1) (2020-07-08) 

###  Bug Fixes 

- **associative:** set combinator arg types ([1cbbf27](https://github.com/thi-ng/umbrella/commit/1cbbf272d938232f83511dbb79c871aee081bde0)) 

#  [4.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@4.3.0...@thi.ng/associative@4.4.0) (2020-07-08) 

###  Features 

- **associative:** disallow `__proto__` in merge fns ([d637996](https://github.com/thi-ng/umbrella/commit/d6379964f364232312b7a65c708f07dd0ecf8ff8)) 

#  [4.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@4.2.1...@thi.ng/associative@4.3.0) (2020-07-04) 

###  Features 

- **associative:** add mutable merge fns ([ec6abe4](https://github.com/thi-ng/umbrella/commit/ec6abe4ece0b6792eda05489df28326c30053e5e)) 

#  [4.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@4.1.0...@thi.ng/associative@4.2.0) (2020-06-20) 

###  Features 

- **associative:** add null checks for merge* fns ([7baa3ba](https://github.com/thi-ng/umbrella/commit/7baa3ba29edf5f66d66423b9a33cac6b1ddfec8f)) 
- **associative:** update Trie to allow custom value sets ([777829c](https://github.com/thi-ng/umbrella/commit/777829c0e3bbdf0c5149a9366d22d16a32941310)) 

#  [4.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@4.0.11...@thi.ng/associative@4.1.0) (2020-06-14) 

###  Features 

- **associative:** add Trie and tests ([84b6517](https://github.com/thi-ng/umbrella/commit/84b6517f8988e5032ac2c7614e62ebf4cf1c9e1b)) 

#  [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@3.1.8...@thi.ng/associative@4.0.0) (2020-03-28) 

###  Features 

- **associative:** [#210](https://github.com/thi-ng/umbrella/issues/210), add `defXXX` factory fns ([48ae24a](https://github.com/thi-ng/umbrella/commit/48ae24a478ba430e123489fbb728fcb7e2d26d06)) 
- **associative:** re-add support for nodejs REPL inspection ([49024f7](https://github.com/thi-ng/umbrella/commit/49024f75fd6126f5d6c1991516a411df7d62d893)), closes [nodejs/node#32529](https://github.com/nodejs/node/issues/32529) 

###  BREAKING CHANGES 

- **associative:** remove static `fromObject()` map factories 
    - merged with defHashMap(), defSortedMap() 

#  [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@3.0.1...@thi.ng/associative@3.1.0) (2019-11-09) 

###  Bug Fixes 

- **associative:** fix off-by-one error in sparseSet() factory, add tests ([94ff308](https://github.com/thi-ng/umbrella/commit/94ff3089d7c24627e57c731d57ab048ca1eff5b1)) 

###  Features 

- **associative:** add reducer versions of difference, intersection, union ([058b9d3](https://github.com/thi-ng/umbrella/commit/058b9d38a1fe25ee4e09dde1ed3f9a52831a4769)) 

#  [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@2.4.3...@thi.ng/associative@3.0.0) (2019-08-21) 

###  Code Refactoring 

- **associative:** update XXXMap.dissoc() signature to unify API ([632c57a](https://github.com/thi-ng/umbrella/commit/632c57a)) 

###  BREAKING CHANGES 

- **associative:** dissoc() method signature changed from varargs to `Iterable<K>` 

Example: 

- previously: `HashMap.dissoc(1, 2, 3)` 
- now: `HashMap.dissoc([1, 2, 3])` 

This new signature is the same as used by `dissoc()` standalone fn and the `disj()` methods of the various Sets in this package. 

#  [2.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@2.3.0...@thi.ng/associative@2.4.0) (2019-07-07) 

###  Bug Fixes 

- **associative:** update generics (TS3.5.2) ([75a4f72](https://github.com/thi-ng/umbrella/commit/75a4f72)) 
- **associative:** update SortedMap.fromObject() - PropertyKey => string ([48688da](https://github.com/thi-ng/umbrella/commit/48688da)) 

###  Features 

- **associative:** enable TS strict compiler flags (refactor) ([7931e14](https://github.com/thi-ng/umbrella/commit/7931e14)) 

#  [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@2.2.3...@thi.ng/associative@2.3.0) (2019-05-22) 

###  Features 

- **associative:** add sparseSet factory fn ([867eaa3](https://github.com/thi-ng/umbrella/commit/867eaa3)) 
- **associative:** add SparseSet8/16/32 ([b5994d9](https://github.com/thi-ng/umbrella/commit/b5994d9)) 

#  [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@2.1.2...@thi.ng/associative@2.2.0) (2019-04-09) 

###  Features 

- **associative:** add withoutKeys*(), ensureSet/Map fns ([5173fda](https://github.com/thi-ng/umbrella/commit/5173fda)) 

##  [2.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@2.1.1...@thi.ng/associative@2.1.2) (2019-04-06) 

###  Bug Fixes 

- **associative:** fix mergeApplyMap, update other merge fns, add tests ([a0f3941](https://github.com/thi-ng/umbrella/commit/a0f3941)) 

#  [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@2.0.2...@thi.ng/associative@2.1.0) (2019-04-02) 

###  Features 

- **associative:** add HashMap w/ linear probing, update deps ([e3b84ab](https://github.com/thi-ng/umbrella/commit/e3b84ab)) 

##  [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@2.0.0...@thi.ng/associative@2.0.1) (2019-04-02) 

###  Bug Fixes 

- **associative:** add missing return type decls ([1913bb4](https://github.com/thi-ng/umbrella/commit/1913bb4)) 

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@1.0.12...@thi.ng/associative@2.0.0) (2019-03-28) 

###  Code Refactoring 

- **associative:** fix/update invertMap() / invertObj() ([b57a1c0](https://github.com/thi-ng/umbrella/commit/b57a1c0)) 
- **associative:** update set combinator ops ([9e78d20](https://github.com/thi-ng/umbrella/commit/9e78d20)) 

###  Features 

- **associative:** add polymorphic into() ([4577646](https://github.com/thi-ng/umbrella/commit/4577646)) 
- **associative:** make .forEach() args readonly, add Symbol.toStringTag ([3749d41](https://github.com/thi-ng/umbrella/commit/3749d41)) 
- **associative:** update SortedSet, IEquivSet, add tests ([e8234e8](https://github.com/thi-ng/umbrella/commit/e8234e8)) 
- **associative:** update type sigs & args for various fns ([7bf2504](https://github.com/thi-ng/umbrella/commit/7bf2504)) 

###  BREAKING CHANGES 

- **associative:** improved/stricter type sigs & args for various fns 
    - commonKeys*() 
    - indexed() 
    - join() / joinWith() 
    - renameKeys*() 
    - selectKeys*() 
    - first() 
- **associative:** changed result type handling in invertMap(), see docstring 
- **associative:** make `difference`, `intersection`, `union` immutable ops 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.6.23...@thi.ng/associative@1.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

#  [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.5.11...@thi.ng/associative@0.6.0) (2018-08-24) 

###  Features 

- **associative:** add IReducible impls for SortedMap & SortedSet ([f14f7ce](https://github.com/thi-ng/umbrella/commit/f14f7ce)) 

##  [0.5.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.5.8...@thi.ng/associative@0.5.9) (2018-07-03) 

###  Bug Fixes 

- **associative:** minor SortedSet fixes ([33f0d19](https://github.com/thi-ng/umbrella/commit/33f0d19)) 

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.4.6...@thi.ng/associative@0.5.0) (2018-05-09) 

###  Features 

- **associative:** add mapKeysObj() / mapKeysMap() ([a9574a0](https://github.com/thi-ng/umbrella/commit/a9574a0)) 
- **associative:** add new functions, update arg & return types ([5991be6](https://github.com/thi-ng/umbrella/commit/5991be6)) 

##  [0.4.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.4.1...@thi.ng/associative@0.4.2) (2018-04-20) 

###  Bug Fixes 

- **associative:** allow partial options arg for EquivMap ctor ([bb11ddf](https://github.com/thi-ng/umbrella/commit/bb11ddf)) 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.3.0...@thi.ng/associative@0.4.0) (2018-04-13) 

###  Features 

- **associative:** add renameKeysMap ([bfabe80](https://github.com/thi-ng/umbrella/commit/bfabe80)) 

###  Performance Improvements 

- **associative:** update equiv() impls ([d1178ac](https://github.com/thi-ng/umbrella/commit/d1178ac)) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/associative@0.2.0...@thi.ng/associative@0.3.0) (2018-04-13) 

###  Features 

- **associative:** add SortedMap & tests, minor refactor EquivMap ([ae0eae8](https://github.com/thi-ng/umbrella/commit/ae0eae8)) 
- **associative:** add SortedSet, update SortedMap ([cb4976f](https://github.com/thi-ng/umbrella/commit/cb4976f)) 

#  0.2.0 (2018-04-10) 

###  Features 

- **associative:** add EquivSet.first() ([0dc9f64](https://github.com/thi-ng/umbrella/commit/0dc9f64)) 
- **associative:** initial import [@thi](https://github.com/thi).ng/associative ([cc70dbc](https://github.com/thi-ng/umbrella/commit/cc70dbc))
