# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.5.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/egf@0.5.5...@thi.ng/egf@0.5.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/egf





## [0.5.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/egf@0.5.4...@thi.ng/egf@0.5.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/egf





## [0.5.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/egf@0.5.3...@thi.ng/egf@0.5.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/egf





## [0.5.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/egf@0.5.2...@thi.ng/egf@0.5.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/egf





## [0.5.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/egf@0.5.1...@thi.ng/egf@0.5.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/egf





## [0.5.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/egf@0.5.0...@thi.ng/egf@0.5.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/egf





# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/egf@0.4.18...@thi.ng/egf@0.5.0) (2021-10-12)


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






#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/egf@0.3.21...@thi.ng/egf@0.4.0) (2021-03-27) 

###  Bug Fixes 

- **egf:** update GPG invocation to avoid arb code exec ([3e14765](https://github.com/thi-ng/umbrella/commit/3e14765d6bfd8006742c9e7860bc7d58ae94dfa5)) 

###  Features 

- **egf:** update readme ([8a36395](https://github.com/thi-ng/umbrella/commit/8a36395db3d31041c71d49cb58945909b8ee7ee2)) 

#  0.3.0 (2020-09-22) 

###  Features 

- **egf:** add <> escape hatch for prefix IDs ([5aca174](https://github.com/thi-ng/umbrella/commit/5aca174cd4ceef7c03c08cb27d736eb5dd1fd35c)) 
- **egf:** add escape seq support in parser ([c7fe807](https://github.com/thi-ng/umbrella/commit/c7fe807fb726388d707e839140249a09028533db)) 
- **egf:** add include cycle breaker, prop merge logic ([eb4d7d1](https://github.com/thi-ng/umbrella/commit/eb4d7d138524fca7421c414a743824ae40807338)), closes [#237](https://github.com/thi-ng/umbrella/issues/237) 
- **egf:** add prune option & pruneNodes() ([634a118](https://github.com/thi-ng/umbrella/commit/634a118e2b612d5979fca7b897ed3d8bf512f28b)) 
- **egf:** add toEGF() implementation ([ed6d3a8](https://github.com/thi-ng/umbrella/commit/ed6d3a8d0e7140ed12a5948057f736aa634ca7f6)) 
- **egf:** fix [#235](https://github.com/thi-ng/umbrella/issues/235), replace #ref tag w/ `->` form ([0dd2f2d](https://github.com/thi-ng/umbrella/commit/0dd2f2d4efe21afce28a00191ee1047a7fe462b6)) 
- **egf:** import as new package ([76b472d](https://github.com/thi-ng/umbrella/commit/76b472d017f3bf456db8204158de6ac4746447b3)) 
- **egf:** update DOT export prop filter ([41a70ee](https://github.com/thi-ng/umbrella/commit/41a70eeaada5b91d7507a52b6b45083548002cda)) 
- **egf:** update tag parser handling ([55b119c](https://github.com/thi-ng/umbrella/commit/55b119ce497f67e939ba865c25930348aaaad380))
