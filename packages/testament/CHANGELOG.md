# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/testament@0.1.0...@thi.ng/testament@0.1.1) (2021-10-13)


### Bug Fixes

* **testament:** update CLI wrapper ([8daaf38](https://github.com/thi-ng/umbrella/commit/8daaf3884f6b836ac75ac9ad2f341c1fdd246a66))





# 0.1.0 (2021-10-12)


### Bug Fixes

* **testament:** re-quote CLI args in bash wrapper ([61ce3f1](https://github.com/thi-ng/umbrella/commit/61ce3f1782a1975977a5fdb5520b87717c60b4a9))
* **testament:** update bash wrapper ([d8b733d](https://github.com/thi-ng/umbrella/commit/d8b733d27a849e1ae3d834f15bc4a659927e13ab))


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **testament:** add file watching, bug fixes ([4987e1d](https://github.com/thi-ng/umbrella/commit/4987e1d9d432bce8d0c4f996a68e43dcdd34b27f))
* **testament:** add new pkg ([d2bbab4](https://github.com/thi-ng/umbrella/commit/d2bbab4cadafd4a75603247dc3ab53a03a581c73))
* **testament:** add result format/output, global opts ([b624396](https://github.com/thi-ng/umbrella/commit/b624396e5ed94ddb9f279a84824a35a6c07b34e0))
* **testament:** add/update lifecycle handlers ([39f6040](https://github.com/thi-ng/umbrella/commit/39f60405eb1db61867f6a37e5214d558220e8b9c))
* **testament:** add/update types, config, cli, docs ([c045a57](https://github.com/thi-ng/umbrella/commit/c045a5740c6c1d4ad402e409e39ee858dd9c7548))
* **testament:** more flexible CLI parsing/order ([9f56f79](https://github.com/thi-ng/umbrella/commit/9f56f79afa30f2a473c8710a8b60335d3269f644))
* **testament:** update CLI wrapper and group() behavior ([aa2ceef](https://github.com/thi-ng/umbrella/commit/aa2ceeff8686f289519fb14134f05aef59e10bee))


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
