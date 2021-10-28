# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/sexpr@0.3.5...@thi.ng/sexpr@0.3.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/sexpr





## [0.3.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/sexpr@0.3.4...@thi.ng/sexpr@0.3.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/sexpr





## [0.3.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/sexpr@0.3.3...@thi.ng/sexpr@0.3.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/sexpr





## [0.3.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/sexpr@0.3.2...@thi.ng/sexpr@0.3.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/sexpr





## [0.3.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/sexpr@0.3.1...@thi.ng/sexpr@0.3.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/sexpr





## [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/sexpr@0.3.0...@thi.ng/sexpr@0.3.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/sexpr





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sexpr@0.2.48...@thi.ng/sexpr@0.3.0) (2021-10-12)


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






##  [0.2.35](https://github.com/thi-ng/umbrella/compare/@thi.ng/sexpr@0.2.34...@thi.ng/sexpr@0.2.35) (2021-03-03) 

###  Bug Fixes 

- **sexpr:** add missing type anno (TS4.2) ([89827bb](https://github.com/thi-ng/umbrella/commit/89827bb431a2dabf1087bcd2ac967b253152b9d7)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/sexpr@0.1.0...@thi.ng/sexpr@0.2.0) (2019-09-23) 

###  Features 

- **sexpr:** add Token w/ location info, update tokenize() & parse() ([3917775](https://github.com/thi-ng/umbrella/commit/3917775)) 

#  0.1.0 (2019-09-21) 

###  Features 

- **sexpr:** add ParseError ([7998afe](https://github.com/thi-ng/umbrella/commit/7998afe)) 
- **sexpr:** import as new package ([f526b7c](https://github.com/thi-ng/umbrella/commit/f526b7c)) 
- **sexpr:** update SyntaxOpts, runtime, update scope parsing, types ([7c840e1](https://github.com/thi-ng/umbrella/commit/7c840e1))
