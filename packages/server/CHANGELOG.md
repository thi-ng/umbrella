# Change Log

- **Last updated**: 2025-01-30T15:45:22Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/server@0.2.0) (2025-01-30)

#### 🚀 Features

- add generics, various other updates ([a340f65](https://github.com/thi-ng/umbrella/commit/a340f65))
  - add generics to most main types/interfaces
  - refactor `SessionInterceptor` as class w/ pluggable storage
  - add `ISessionStore` and `InMemorySessionStore` impl
  - update ServerOpts to allow augmenting request context object
  - add default HTTP OPTIONS handler
  - update Server cookie parsing
  - add StaticOpts.auth flag
  - update logRequest() interceptor
  - update pkg exports
  - update tests

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/server@0.1.0) (2025-01-29)

#### 🚀 Features

- migrate/import as new pkg ([61035bb](https://github.com/thi-ng/umbrella/commit/61035bb))
- re-import various security header interceptors ([036b9b2](https://github.com/thi-ng/umbrella/commit/036b9b2))
  - add interceptors:
    - `crossOriginOpenerPolicy()`
    - `crossOriginResourcePolicy()`
    - `referrerPolicy()`
    - `strictTransportSecurity()`
  - add/update tests
- update sendFile(), staticFiles() and compression handling ([9f4d25a](https://github.com/thi-ng/umbrella/commit/9f4d25a))
  - add support for brotli, gzip, deflate
  - refactor sendFile() internals
  - disable compression by default
- import refactored cacheControl() interceptor ([4eff206](https://github.com/thi-ng/umbrella/commit/4eff206))
  - update pkg deps & exports
  - update tests
- re-add etag support/handlers ([13fb75e](https://github.com/thi-ng/umbrella/commit/13fb75e))
  - add `StaticOpts.etag`
  - update `staticFiles()` HEAD/GET handlers
  - add `Server.unmodified()`
  - add `etagFileTimeModified()`
  - add `etagFileHash()`
  - add `isUnmodified()` helper
  - remove "content-length" header from HEAD handler
  - update tests
- add `server()` factory function (syntax sugar) ([ee22ea1](https://github.com/thi-ng/umbrella/commit/ee22ea1))
