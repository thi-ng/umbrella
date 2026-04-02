# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.1.51](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/router@4.1.51/packages/router) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [4.1.47](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/router@4.1.47/packages/router) (2025-11-08)

#### 🩹 Bug fixes

- fix [#496](https://codeberg.org/thi.ng/umbrella/issues/496) use correct order of URL parts ([eb44951](https://codeberg.org/thi.ng/umbrella/commit/eb44951))
  - ensure querystring is in correct URL order, depending on `useFragment`

### [4.1.28](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/router@4.1.28/packages/router) (2025-05-15)

#### 🩹 Bug fixes

- fix [#496](https://codeberg.org/thi.ng/umbrella/issues/496), add support for query string ([2d29f46](https://codeberg.org/thi.ng/umbrella/commit/2d29f46))
  - update `HTMLRouter.route()` to keep existing query string
    (only needed if not using hash fragment)

## [4.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/router@4.1.0/packages/router) (2024-07-02)

#### 🚀 Features

- update HTMLRouter initial & default route handling ([8ea075e](https://codeberg.org/thi.ng/umbrella/commit/8ea075e))
  - avoid duplicate dispatch (and breaking back button) for missing routes
  - new behavior: HTMLRouter dispatches default route redirect, but does **not** push it to history
  - update initial route handling to use `replaceState()` instead of `pushState()`

### [4.0.11](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/router@4.0.11/packages/router) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [4.0.8](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/router@4.0.8/packages/router) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([835dfb0](https://codeberg.org/thi.ng/umbrella/commit/835dfb0))

### [4.0.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/router@4.0.1/packages/router) (2024-03-13)

#### ♻️ Refactoring

- update/simplify AugmentedRoute handling ([37ae88b](https://codeberg.org/thi.ng/umbrella/commit/37ae88b))

# [4.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/router@4.0.0/packages/router) (2024-03-13)

#### 🛑 Breaking changes

- trie-based route matching & wildcard support ([f1ab427](https://codeberg.org/thi.ng/umbrella/commit/f1ab427))
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
- rename BasicRouter => Router ([4d14aab](https://codeberg.org/thi.ng/umbrella/commit/4d14aab))
- BREAKING CHANGE: rename BasicRouter => Router
  - update all refs

#### 🚀 Features

- update RouteAuthenticator and .route() args ([f009afb](https://codeberg.org/thi.ng/umbrella/commit/f009afb))
  - add support for optional arbitrary user context object passed
    to .route() and global auth handler
  - update optional args for HTMLRouter.route()/.routeTo()
- update/improve wildcard priority handling ([59c2557](https://codeberg.org/thi.ng/umbrella/commit/59c2557))
  - implement wildcard fallback logic in `Trie.get()`
  - add docs
  - add tests

## [3.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/router@3.4.0/packages/router) (2024-03-10)

#### 🚀 Features

- add defMatch() helper ([12134b6](https://codeberg.org/thi.ng/umbrella/commit/12134b6))

#### 🩹 Bug fixes

- rebuild index in updateRoutes() ([deb494e](https://codeberg.org/thi.ng/umbrella/commit/deb494e))

## [3.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/router@3.3.0/packages/router) (2024-03-09)

#### 🚀 Features

- sort & validate routes, add tests ([9243c01](https://codeberg.org/thi.ng/umbrella/commit/9243c01))

### [3.2.39](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/router@3.2.39/packages/router) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

### [3.2.30](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/router@3.2.30/packages/router) (2023-08-04)

#### ♻️ Refactoring

- update INotify impl ([d36aca6](https://codeberg.org/thi.ng/umbrella/commit/d36aca6))
- update INotify impls ([cbdc527](https://codeberg.org/thi.ng/umbrella/commit/cbdc527))
