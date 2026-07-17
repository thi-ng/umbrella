# Change Log

- **Last updated**: 2026-07-17T06:11:48Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.0.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-io-obj@1.0.1/packages/geom-io-obj) (2026-07-16)

#### 🩹 Bug fixes

- add Safari hack/workaround for `parseOBJFromStream()` ([4151fca](https://codeberg.org/thi.ng/umbrella/commit/4151fca))
  - Safari still doesn't support `for await(...)` syntax over `ReadableStream`
  - update function to use fallback to convert stream to async iterable manually

# [1.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-io-obj@1.0.0/packages/geom-io-obj) (2026-07-16)

#### 🛑 Breaking changes

- add support for stream parsing ([887eba5](https://codeberg.org/thi.ng/umbrella/commit/887eba5))
- BREAKING CHANGE: rename `parseOBJ()` => `parseOBJFromString()`. All parse functions async now
  - add `parseOBJFromStream()`
  - add `parseOBJFromIterable()`
  - rename `parseOBJ()` => `parseOBJFromString()`
  - extract main parser to separate internal HOF for better re-use
  - add/update doc strings
  - add stream test & bunny fixture

#### 🚀 Features

- [#405](https://codeberg.org/thi.ng/umbrella/issues/405) add `parseOBJGenerator()` for coroutine/fiber based processing ([2899c1c](https://codeberg.org/thi.ng/umbrella/commit/2899c1c))

### [0.3.128](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-io-obj@0.3.128/packages/geom-io-obj) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [0.3.82](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-io-obj@0.3.82/packages/geom-io-obj) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))
