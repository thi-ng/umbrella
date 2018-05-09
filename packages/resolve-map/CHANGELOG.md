# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

      <a name="2.0.0"></a>
# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@1.0.5...@thi.ng/resolve-map@2.0.0) (2018-05-09)


### Code Refactoring

* **resolve-map:** fix [#21](https://github.com/thi-ng/umbrella/issues/21) ([5d2a3fe](https://github.com/thi-ng/umbrella/commit/5d2a3fe))


### BREAKING CHANGES

* **resolve-map:** update lookup path prefix & separators

- lookup paths now are prefixed with `@` instead of `->`
- all path segments must be separated by `/`
- update readme & tests




      <a name="1.0.5"></a>
## [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@1.0.4...@thi.ng/resolve-map@1.0.5) (2018-05-09)




**Note:** Version bump only for package @thi.ng/resolve-map

<a name="1.0.4"></a>
## [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@1.0.3...@thi.ng/resolve-map@1.0.4) (2018-04-29)




**Note:** Version bump only for package @thi.ng/resolve-map

<a name="1.0.3"></a>
## [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@1.0.2...@thi.ng/resolve-map@1.0.3) (2018-04-26)




**Note:** Version bump only for package @thi.ng/resolve-map

<a name="1.0.2"></a>
## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@1.0.1...@thi.ng/resolve-map@1.0.2) (2018-04-19)




**Note:** Version bump only for package @thi.ng/resolve-map

<a name="1.0.1"></a>
## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@1.0.0...@thi.ng/resolve-map@1.0.1) (2018-04-17)




**Note:** Version bump only for package @thi.ng/resolve-map

<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.2.0...@thi.ng/resolve-map@1.0.0) (2018-04-16)


### Features

* **resolve-map:** support relative parent refs, update tests/readme ([a379d12](https://github.com/thi-ng/umbrella/commit/a379d12))


### BREAKING CHANGES

* **resolve-map:** lookup paths passed to the provided `resolve()` fn
inside function values are now relative by default (previously only
absolute paths were allowed)

- remove `resolveArray()` from module exports
(use `resolveMap()` instead)
- add absPath() to compute absolute path
- add support for "../" ancestor access




<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.1.7...@thi.ng/resolve-map@0.2.0) (2018-04-16)


### Features

* **resolve-map:** resolve each ref only once, re-use resolved results ([6992e82](https://github.com/thi-ng/umbrella/commit/6992e82))




<a name="0.1.7"></a>
## [0.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.1.6...@thi.ng/resolve-map@0.1.7) (2018-04-13)




**Note:** Version bump only for package @thi.ng/resolve-map

<a name="0.1.6"></a>
## [0.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.1.5...@thi.ng/resolve-map@0.1.6) (2018-04-08)




**Note:** Version bump only for package @thi.ng/resolve-map

<a name="0.1.5"></a>
## [0.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.1.4...@thi.ng/resolve-map@0.1.5) (2018-04-04)




**Note:** Version bump only for package @thi.ng/resolve-map

<a name="0.1.4"></a>
## [0.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.1.3...@thi.ng/resolve-map@0.1.4) (2018-04-01)




**Note:** Version bump only for package @thi.ng/resolve-map

<a name="0.1.3"></a>
## [0.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.1.2...@thi.ng/resolve-map@0.1.3) (2018-03-28)




**Note:** Version bump only for package @thi.ng/resolve-map

<a name="0.1.2"></a>
## [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.1.1...@thi.ng/resolve-map@0.1.2) (2018-03-18)




**Note:** Version bump only for package @thi.ng/resolve-map

<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.1.0...@thi.ng/resolve-map@0.1.1) (2018-03-18)




**Note:** Version bump only for package @thi.ng/resolve-map
