# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-clip-poly@1.0.70...@thi.ng/geom-clip-poly@2.0.0) (2021-10-12)


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






##  [1.0.70](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-clip-poly@1.0.69...@thi.ng/geom-clip-poly@1.0.70) (2021-09-03)

**Note:** Version bump only for package @thi.ng/geom-clip-poly

#  1.0.0 (2020-02-25)

###  Documentation

- **geom-clip-poly:** update readme ([c7ca79b](https://github.com/thi-ng/umbrella/commit/c7ca79b7e5e3d6badca2baa79fef8870ad9f9309))

###  Features

- **geom-clip-poly:** extract sutherland-hodgeman as own pkg (formerly [@thi](https://github.com/thi).ng/geom-clip) ([782193f](https://github.com/thi-ng/umbrella/commit/782193f2fc06c18a564d5b983839f55b9143b4f7))

###  BREAKING CHANGES

- **geom-clip-poly:** extract as own pkg (formerly @thi.ng/geom-clip)

#  [0.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-clip@0.0.19...@thi.ng/geom-clip@0.1.0) (2019-07-07)

###  Features

- **geom-clip:** enable TS strict compiler flags (refactor) ([9b6a2ae](https://github.com/thi-ng/umbrella/commit/9b6a2ae))
