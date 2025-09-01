# Change Log

- **Last updated**: 2025-09-01T16:38:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/trie@2.0.0) (2025-08-11)

#### 🛑 Breaking changes

- major update `TrieMap` & `MultiTrie` ([d7f4a12](https://github.com/thi-ng/umbrella/commit/d7f4a12))
- BREAKING CHANGE: major update `TrieMap` & `MultiTrie`
  - update `MultiTrie` to only support array-based keys
    - switch internals to using Map for storing branches
    - update arg types in all methods
    - add `.toJSON()` method to support serialization
  - rename `MultiTrieOpts.vals` => `.values`
  - add/update/dedupe iterators in both impls
  - replace `.suffixes()` iterator in both impls w/ extra args passed to `.keys()`
  - add `defTrieMapFromJSON()` and `defMultiTrieFromJSON()`
  - add/update tests

#### ♻️ Refactoring

- update internals ([065cc27](https://github.com/thi-ng/umbrella/commit/065cc27))
  - remove obsolete size/count in MultiTrie

### [1.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/trie@1.1.10) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/trie@1.1.0) (2024-07-22)

#### 🚀 Features

- import as new package ([#486](https://github.com/thi-ng/umbrella/issues/486)) ([a2007af](https://github.com/thi-ng/umbrella/commit/a2007af))
  - extract `MultiTrie` & `TrieMap` from [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/main/packages/associative)
