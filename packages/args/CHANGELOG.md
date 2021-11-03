# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/args@2.0.6...@thi.ng/args@2.0.7) (2021-11-03)

**Note:** Version bump only for package @thi.ng/args





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/args@1.1.1...@thi.ng/args@2.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


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






#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/args@1.0.4...@thi.ng/args@1.1.0) (2021-08-19)

###  Features

- **args:** capitalize usage section headings ([eaa0f23](https://github.com/thi-ng/umbrella/commit/eaa0f23a88cfb98da05b245b720a6fbb260ea7da))

##  [0.7.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/args@0.7.0...@thi.ng/args@0.7.1) (2021-07-29)

###  Bug Fixes

- **args:** omit empty groups from usage() ([a66c19a](https://github.com/thi-ng/umbrella/commit/a66c19aa8d682a7f4b6ae5b3de51a26e806a02dc))

#  [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/args@0.6.0...@thi.ng/args@0.7.0) (2021-07-01)

###  Features

- **args:** add showGroupNames option ([6917111](https://github.com/thi-ng/umbrella/commit/6917111aa6f019cbc4622a30be65c7f43cf995f9))

#  [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/args@0.5.1...@thi.ng/args@0.6.0) (2021-06-08)

###  Features

- **args:** add kvPairsMulti(), update coerceKV() ([fd12f80](https://github.com/thi-ng/umbrella/commit/fd12f807dba2546133278a607c4b79dcf9a12b07))

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/args@0.4.2...@thi.ng/args@0.5.0) (2021-03-28)

###  Features

- **args:** add vec() arg type ([f05cb2a](https://github.com/thi-ng/umbrella/commit/f05cb2a6d0798ef0558775a81dba2d834308747c))
- **args:** wordwrap usage prefix/suffix, defaults ([325b558](https://github.com/thi-ng/umbrella/commit/325b558f74f8dbfaa2c7de72c6800cdbc8c54acd))

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/args@0.3.1...@thi.ng/args@0.4.0) (2021-03-22)

###  Features

- **args:** add arg groups, segment usage output ([ebf5197](https://github.com/thi-ng/umbrella/commit/ebf51974e4e1e1d5288af9ad420d4211addd95ad))
- **args:** support arbitrary length aliases ([1cfdf49](https://github.com/thi-ng/umbrella/commit/1cfdf49a53cca2f80836caf428e220e90f687ad1))

##  [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/args@0.3.0...@thi.ng/args@0.3.1) (2021-03-21)

###  Bug Fixes

- **args:** fix usage() show defaults logic ([ae31158](https://github.com/thi-ng/umbrella/commit/ae31158c9496d7c116ee2b4a22ca843888d2bddd))

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/args@0.2.7...@thi.ng/args@0.3.0) (2021-03-20)

###  Features

- **args:** update ParseOpts, UsageOpts ([6577c80](https://github.com/thi-ng/umbrella/commit/6577c806e246ecf8244b1af6a2cefc400a7eb365))

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/args@0.1.0...@thi.ng/args@0.2.0) (2021-01-13)

###  Features

- **args:** add defaultHint opt, update usage() ([f8a4146](https://github.com/thi-ng/umbrella/commit/f8a414605a0d5c93fcef83ab931911c6c2f39f7d))

#  0.1.0 (2021-01-10)

###  Features

- **args:** add kv args, callbacks, usage opts ([c306aba](https://github.com/thi-ng/umbrella/commit/c306abac31dc03bb15a19c36192ee5c07afa1063))
- **args:** add strict mode kvArgs()/coerceKV(), add docs ([b76c4f1](https://github.com/thi-ng/umbrella/commit/b76c4f11ddbe3b7c1a195a93ceed3a953666ef5d))
- **args:** add tuple arg type support ([a05dde9](https://github.com/thi-ng/umbrella/commit/a05dde957be54ae7ed6aeab8233bff0d8573c675))
- **args:** import as new package ([af5d943](https://github.com/thi-ng/umbrella/commit/af5d943153b3012be04ed0e9a044ee944465d035))
- **args:** major general package update ([26ec49a](https://github.com/thi-ng/umbrella/commit/26ec49afc0fa389b7a2551b116a85d95df4aaeee))
- **args:** update multi arg specs, parse ([dbdf913](https://github.com/thi-ng/umbrella/commit/dbdf913b4ed730c2c07246c24ecbafb32d9dc37e))
