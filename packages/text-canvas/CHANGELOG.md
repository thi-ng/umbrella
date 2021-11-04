# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/text-canvas@2.1.0...@thi.ng/text-canvas@2.1.1) (2021-11-04)

**Note:** Version bump only for package @thi.ng/text-canvas





# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/text-canvas@2.0.6...@thi.ng/text-canvas@2.1.0) (2021-11-03)


### Features

* **text-canvas:** add IGrid2D impl, minor updates ([6e51c11](https://github.com/thi-ng/umbrella/commit/6e51c11bba65829ccedd6a6351565d4c8541f7dd))





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/text-canvas@1.1.4...@thi.ng/text-canvas@2.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Code Refactoring

* **text-canvas:** update to use thi.ng/text-format ([aa67a5a](https://github.com/thi-ng/umbrella/commit/aa67a5a27197b4c751bb5959cdcd2a238af2a825))


### BREAKING CHANGES

* **text-canvas:** migrate formatting consts/functions to new pkg

- see 8c28655d1 for details
- rename `toString()` => `formatCanvas()`
- update dependencies
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






#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/text-canvas@1.0.3...@thi.ng/text-canvas@1.1.0) (2021-08-13)

###  Features

- **text-canvas:** add image -> braille functions ([8201ad2](https://github.com/thi-ng/umbrella/commit/8201ad2c83f32522fcb6fbf0d3d46925491aacc8))

##  [0.7.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/text-canvas@0.7.13...@thi.ng/text-canvas@0.7.14) (2021-08-07)

###  Bug Fixes

- **text-canvas:** fix ImageOpts.chars type ([0ae7855](https://github.com/thi-ng/umbrella/commit/0ae78552be39f543e98f8716dc239c3ce9c50b7b))

##  [0.7.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/text-canvas@0.7.3...@thi.ng/text-canvas@0.7.4) (2021-03-30)

###  Bug Fixes

- **text-canvas:** fix FMT_NONE suffix, export format preset types ([e7a9ff7](https://github.com/thi-ng/umbrella/commit/e7a9ff7391b2d30ead4b40fced9b76a089be632e))

# [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/text-canvas@0.6.0...@thi.ng/text-canvas@0.7.0) (2021-03-26)

### Features

- **text-canvas:** update table cell wordwrap handling ([f19f925](https://github.com/thi-ng/umbrella/commit/f19f9251443bc609a28fe5776399c162bc75b9b8))

# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/text-canvas@0.5.1...@thi.ng/text-canvas@0.6.0) (2021-03-24)

### Bug Fixes

- **text-canvas:** fix format start/end handling in toString() ([5100222](https://github.com/thi-ng/umbrella/commit/5100222a874ce57ef1cd6892bf4e51faebf62dd1))

### Features

- **text-canvas:** add FMT_ANSI565, update StringFormat ([3bf5b47](https://github.com/thi-ng/umbrella/commit/3bf5b475cd75c9046804c81fb80b5f9e6d056fd0))
- **text-canvas:** add imageCanvas/String565() fns ([6e254eb](https://github.com/thi-ng/umbrella/commit/6e254ebf7acf6520551caf99aef3a0b93d06a519))

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/text-canvas@0.4.12...@thi.ng/text-canvas@0.5.0) (2021-03-24)

###  Features

- **text-canvas:** add FMT_NONE dummy formatter ([0b1f3bd](https://github.com/thi-ng/umbrella/commit/0b1f3bd88405aa89fdf344513bb43f7ac8a95e84))
- **text-canvas:** add hardwrapped text support ([4e171db](https://github.com/thi-ng/umbrella/commit/4e171db1e77269604578495170b05a5e0bfcbc95))

## [0.4.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/text-canvas@0.4.0...@thi.ng/text-canvas@0.4.1) (2021-01-10)

### Bug Fixes

- **text-canvas:** fix FMT_ANSI256 bg bitshift ([b50a0f9](https://github.com/thi-ng/umbrella/commit/b50a0f9c0464774f3b62888d718da89381b3014c))

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/text-canvas@0.3.0...@thi.ng/text-canvas@0.4.0) (2021-01-05)

###  Features

- **text-canvas:** add formatter fns/utils ([fb4470d](https://github.com/thi-ng/umbrella/commit/fb4470d5a708e3d1f700bab5274463f754489940))

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/text-canvas@0.2.36...@thi.ng/text-canvas@0.3.0) (2021-01-02)

###  Features
