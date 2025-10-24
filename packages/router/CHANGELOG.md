# Change Log

- **Last updated**: 2025-10-24T13:42:49Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.1.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@4.1.28) (2025-05-15)

#### 🩹 Bug fixes

- fix [#496](https://github.com/thi-ng/umbrella/issues/496), add support for query string ([2d29f46](https://github.com/thi-ng/umbrella/commit/2d29f46))
  - update `HTMLRouter.route()` to keep existing query string
    (only needed if not using hash fragment)

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@4.1.0) (2024-07-02)

#### 🚀 Features

- update HTMLRouter initial & default route handling ([8ea075e](https://github.com/thi-ng/umbrella/commit/8ea075e))
  - avoid duplicate dispatch (and breaking back button) for missing routes
  - new behavior: HTMLRouter dispatches default route redirect, but does **not** push it to history
  - update initial route handling to use `replaceState()` instead of `pushState()`

### [4.0.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@4.0.11) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [4.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@4.0.8) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([835dfb0](https://github.com/thi-ng/umbrella/commit/835dfb0))

### [4.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@4.0.1) (2024-03-13)

#### ♻️ Refactoring

- update/simplify AugmentedRoute handling ([37ae88b](https://github.com/thi-ng/umbrella/commit/37ae88b))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@4.0.0) (2024-03-13)

#### 🛑 Breaking changes

- trie-based route matching & wildcard support ([f1ab427](https://github.com/thi-ng/umbrella/commit/f1ab427))
- BREAKING CHANGES: update types, args, rename option fields
  - add `Trie` data structure for route storage & matching
  - add support for `+` wildcards to match arbitrary length routes
  - update `BasicRouter.route()` & replace `.matchRoutes()` with new impl
  - add `AugmentedRoute` interface & pre-process routes to compute
    wildcard indices for faster matching (along with using the trie)
  - update `Route.match` to be initially specified as string
  - update `RouteMatch` to include `.rest` args (if any)
  - add optional `RouteMatch.redirect` flag
  - REMOVE `Route.title` & `RouteMatch.title` (obsolete since only used
    by `HTMLRouter`, but usage unsupported by browsers now
    (`history.pushState()` doesn't support title anymore)
  - RENAME `RouterConfig` => `RouterOpts` (align naming convention)
  - RENAME `RouterOpts.defaultRouteID` => `RouterOpts.default`
  - RENAME `RouterOpts.initialRouteID` => `RouterOpts.initial`
  - RENAME `RouterOpts.removeTrailingSlash` => `RouterOpts.trim`
  - REMOVE obsolete `defMatch()` helper
  - add/update tests
- rename BasicRouter => Router ([4d14aab](https://github.com/thi-ng/umbrella/commit/4d14aab))
- BREAKING CHANGE: rename BasicRouter => Router
  - update all refs

#### 🚀 Features

- update RouteAuthenticator and .route() args ([f009afb](https://github.com/thi-ng/umbrella/commit/f009afb))
  - add support for optional arbitrary user context object passed
    to .route() and global auth handler
  - update optional args for HTMLRouter.route()/.routeTo()
- update/improve wildcard priority handling ([59c2557](https://github.com/thi-ng/umbrella/commit/59c2557))
  - implement wildcard fallback logic in `Trie.get()`
  - add docs
  - add tests

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.4.0) (2024-03-10)

#### 🚀 Features

- add defMatch() helper ([12134b6](https://github.com/thi-ng/umbrella/commit/12134b6))

#### 🩹 Bug fixes

- rebuild index in updateRoutes() ([deb494e](https://github.com/thi-ng/umbrella/commit/deb494e))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.3.0) (2024-03-09)

#### 🚀 Features

- sort & validate routes, add tests ([9243c01](https://github.com/thi-ng/umbrella/commit/9243c01))

### [3.2.39](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.2.39) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [3.2.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.2.30) (2023-08-04)

#### ♻️ Refactoring

- update INotify impl ([d36aca6](https://github.com/thi-ng/umbrella/commit/d36aca6))
- update INotify impls ([cbdc527](https://github.com/thi-ng/umbrella/commit/cbdc527))

### [3.2.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.2.14) (2022-11-28)

#### ♻️ Refactoring

- update INotify.notify() signature ([066bae5](https://github.com/thi-ng/umbrella/commit/066bae5))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.2.0) (2022-06-17)

#### 🚀 Features

- add trailing slash option, optimize routeForID() ([c003dc2](https://github.com/thi-ng/umbrella/commit/c003dc2))
  - update BasicRouter default config init
  - pre-build `routeIndex` in ctor
  - optimize `routeForID()` to use new `routeIndex`
- update format(), hash/prefix handling ([724b3ad](https://github.com/thi-ng/umbrella/commit/724b3ad))
  - update HTMLRouter default prefix to "#/" if `useFragment` is true
  - remove obsolete `HTMLRouter.format()` (now the same as BasicRouter)
  - update BasicRouter.format() to throw error for missing route param value

### [3.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/router@3.1.5) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))
