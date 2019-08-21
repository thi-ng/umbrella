# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.31](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.30...@thi.ng/rstream-csp@1.0.31) (2019-08-21)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.30](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.29...@thi.ng/rstream-csp@1.0.30) (2019-08-16)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.29](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.28...@thi.ng/rstream-csp@1.0.29) (2019-07-31)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.28](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.27...@thi.ng/rstream-csp@1.0.28) (2019-07-12)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.27](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.26...@thi.ng/rstream-csp@1.0.27) (2019-07-07)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.26](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.25...@thi.ng/rstream-csp@1.0.26) (2019-05-22)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.25](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.24...@thi.ng/rstream-csp@1.0.25) (2019-04-26)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.24](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.23...@thi.ng/rstream-csp@1.0.24) (2019-04-24)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.23](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.22...@thi.ng/rstream-csp@1.0.23) (2019-04-15)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.21...@thi.ng/rstream-csp@1.0.22) (2019-04-11)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.21](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.20...@thi.ng/rstream-csp@1.0.21) (2019-04-11)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.19...@thi.ng/rstream-csp@1.0.20) (2019-04-09)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.18...@thi.ng/rstream-csp@1.0.19) (2019-04-06)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.17...@thi.ng/rstream-csp@1.0.18) (2019-04-03)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.16...@thi.ng/rstream-csp@1.0.17) (2019-04-02)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.15...@thi.ng/rstream-csp@1.0.16) (2019-04-02)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.14...@thi.ng/rstream-csp@1.0.15) (2019-04-02)

**Note:** Version bump only for package @thi.ng/rstream-csp





## [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@1.0.13...@thi.ng/rstream-csp@1.0.14) (2019-03-28)

**Note:** Version bump only for package @thi.ng/rstream-csp







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-csp@0.1.125...@thi.ng/rstream-csp@1.0.0) (2019-01-21)


### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))


### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols


<a name="0.1.0"></a>
# 0.1.0 (2018-01-28)


### Features

* **rstream-csp:** add new package, remove CSP dep from rstream ([e37f6a1](https://github.com/thi-ng/umbrella/commit/e37f6a1))
