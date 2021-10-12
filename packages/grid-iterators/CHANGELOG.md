# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/grid-iterators@1.0.5...@thi.ng/grid-iterators@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/grid-iterators@1.0.4...@thi.ng/grid-iterators@1.0.5) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/grid-iterators 

##  [0.4.24](https://github.com/thi-ng/umbrella/compare/@thi.ng/grid-iterators@0.4.23...@thi.ng/grid-iterators@0.4.24) (2021-03-03) 

###  Bug Fixes 

- **grid-iterators:** enforce int coords ([e8e570f](https://github.com/thi-ng/umbrella/commit/e8e570fa57640569554084a846cbde54966c0b06)) 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/grid-iterators@0.3.17...@thi.ng/grid-iterators@0.4.0) (2020-06-20) 

###  Features 

- **grid-iterators:** add new iterators ([e08985e](https://github.com/thi-ng/umbrella/commit/e08985ee07a2bc449e4f2126191a96261ef6dfb0)) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/grid-iterators@0.2.3...@thi.ng/grid-iterators@0.3.0) (2020-02-25) 

###  Features 

- **grid-iterators:** add line & circle iterators ([a6b757d](https://github.com/thi-ng/umbrella/commit/a6b757dd350e46404bfd2f82e58d8a3bc2c5b133)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/grid-iterators@0.1.0...@thi.ng/grid-iterators@0.2.0) (2019-11-09) 

###  Features 

- **grid-iterators:** add interleave fns ([c883ea0](https://github.com/thi-ng/umbrella/commit/c883ea03d9a37698533d981a96f7122828731364)) 
- **grid-iterators:** add z-curve & random iterators, add deps ([ba8ed18](https://github.com/thi-ng/umbrella/commit/ba8ed18cd84db77ccb35ed95586c66151cf1d690)) 
- **grid-iterators:** add zigzagDiagonal(), update readme, rename files ([5630055](https://github.com/thi-ng/umbrella/commit/56300557f395698f82b453c79956ada72726444a)) 
- **grid-iterators:** make row args optional ([60dccfc](https://github.com/thi-ng/umbrella/commit/60dccfcb0ba1d731eeecd4c12433d44b5491e7a7)) 

#  0.1.0 (2019-09-21) 

###  Features 

- **grid-iterators:** import as new package, incl. assets ([fe4ee00](https://github.com/thi-ng/umbrella/commit/fe4ee00))
