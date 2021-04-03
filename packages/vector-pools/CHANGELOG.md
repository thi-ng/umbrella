# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/vector-pools@2.0.10...@thi.ng/vector-pools@2.0.11) (2021-04-03)

**Note:** Version bump only for package @thi.ng/vector-pools





## [2.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/vector-pools@2.0.9...@thi.ng/vector-pools@2.0.10) (2021-03-30)

**Note:** Version bump only for package @thi.ng/vector-pools





## [2.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/vector-pools@2.0.8...@thi.ng/vector-pools@2.0.9) (2021-03-28)

**Note:** Version bump only for package @thi.ng/vector-pools





## [2.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/vector-pools@2.0.7...@thi.ng/vector-pools@2.0.8) (2021-03-27)

**Note:** Version bump only for package @thi.ng/vector-pools





## [2.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/vector-pools@2.0.6...@thi.ng/vector-pools@2.0.7) (2021-03-17)

**Note:** Version bump only for package @thi.ng/vector-pools





## [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/vector-pools@2.0.5...@thi.ng/vector-pools@2.0.6) (2021-03-12)

**Note:** Version bump only for package @thi.ng/vector-pools





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vector-pools@1.0.57...@thi.ng/vector-pools@2.0.0) (2021-02-20)


### Bug Fixes

* **vector-pools:** fix regression/update buffer arg types ([27a3614](https://github.com/thi-ng/umbrella/commit/27a36148ace1bd19d346137d80e897c91b67a5c6))


### Code Refactoring

* **vector-pools:** update attrib type handling ([0ebd889](https://github.com/thi-ng/umbrella/commit/0ebd8893d3651df6c033d40ce59fd7e77a66f790))


### Features

* **vector-pools:** export asNativeType/asGLType() ([d4b397b](https://github.com/thi-ng/umbrella/commit/d4b397b99f5d6c0daef76c86011b165ecda31b4d))


### BREAKING CHANGES

* **vector-pools:** update attrib types to use string consts

- part of umbrella-wide changes to thi.ng/api Type aliases
  (see a333d4182)
- remove obsolete asNativeType()/asGLType() fns
  (moved to thi.ng/api for better re-use)





# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vector-pools@0.2.16...@thi.ng/vector-pools@1.0.0) (2019-07-07)

### Code Refactoring

* **vector-pools:** address TS strictNullChecks flag ([981b5ce](https://github.com/thi-ng/umbrella/commit/981b5ce))

### Features

* **vector-pools:** add AttribPool.attribArray(), add tests ([285022a](https://github.com/thi-ng/umbrella/commit/285022a))
* **vector-pools:** enable TS strict compiler flags (refactor) ([1af6f78](https://github.com/thi-ng/umbrella/commit/1af6f78))
* **vector-pools:** update AttribPool, add tests, update readme ([33109d0](https://github.com/thi-ng/umbrella/commit/33109d0))

### BREAKING CHANGES

* **vector-pools:** update return types of various class methods

- some AList, ArrayList, LinkedList, VecPool methods now return
  `undefined` if operation failed

# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vector-pools@0.1.2...@thi.ng/vector-pools@0.2.0) (2019-02-05)

### Bug Fixes

* **vector-pools:** AttribPool opts & default handling ([16b48b3](https://github.com/thi-ng/umbrella/commit/16b48b3))

### Features

* **vector-pools:** update & fix AttribPool resize logic ([b7d162f](https://github.com/thi-ng/umbrella/commit/b7d162f))

# 0.1.0 (2019-01-21)

### Features

* **vector-pools:** add AttribPool, refactor lists ([019c0af](https://github.com/thi-ng/umbrella/commit/019c0af))
* **vector-pools:** add GLType alias, AttribPoolOpts, update pool impls ([4fe2047](https://github.com/thi-ng/umbrella/commit/4fe2047))
* **vector-pools:** add VecPool, VecArrayList & VecLinkedList ([48d5d57](https://github.com/thi-ng/umbrella/commit/48d5d57))
* **vector-pools:** update readme, add examples ([fd54d32](https://github.com/thi-ng/umbrella/commit/fd54d32))
