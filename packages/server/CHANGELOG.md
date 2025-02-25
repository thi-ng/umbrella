# Change Log

- **Last updated**: 2025-02-25T13:25:07Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/server@0.6.0) (2025-02-21)

#### 🚀 Features

- update `sessionInterceptor()` cookie signing/handling ([bdd4d66](https://github.com/thi-ng/umbrella/commit/bdd4d66))
  - update `SessionInterceptor.newSession()`
  - pre-compute session metadata (HMAC & cookie values), store in WeakMap
  - update `.withSession()`
  - update `.validateSession()` to use cached signature
  - update tests
- add/update `ServerOpts` ([23b5321](https://github.com/thi-ng/umbrella/commit/23b5321))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/server@0.5.0) (2025-02-19)

#### 🚀 Features

- update interceptor handling ([9cdb8b8](https://github.com/thi-ng/umbrella/commit/9cdb8b8))
  - update post-interceptor execution logic & return values
  - update `Server.runHandler()`, `Server.compileRoute()`
  - update `logResponse()`, `measure()` interceptors

#### ♻️ Refactoring

- rename `serverSession()` => `sessionInterceptor()` ([2ada168](https://github.com/thi-ng/umbrella/commit/2ada168))
  - add docs

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/server@0.4.0) (2025-02-10)

#### 🚀 Features

- update ServerSession & interceptor ([71d26bb](https://github.com/thi-ng/umbrella/commit/71d26bb))
  - add `ServerSession.ip`
  - update `SessionInterceptor` to validate stored IP addr
  - rename `.delete()` => `.deleteSession()`
  - add `.replaceSession()`
  - remove obsolete `FlashMsg` (for now)
- update ServerResponse, update host matching ([25a07f3](https://github.com/thi-ng/umbrella/commit/25a07f3))
  - update `isMatchingHost()`
  - add `ServerResponse.rateLimit()` and `.noResponse()`
  - update tests
- update SessionInterceptor to create signed cookie ([d240107](https://github.com/thi-ng/umbrella/commit/d240107))
  - add `SessionOpts.secret`
  - sign session ID with salt & SHA256
  - add validateSession()
  - update pre() interceptor
- add `rateLimiter()` interceptor ([245cc9d](https://github.com/thi-ng/umbrella/commit/245cc9d))
- add `measure()` interceptor ([4702e84](https://github.com/thi-ng/umbrella/commit/4702e84))
  - refactor logRequest/Response() interceptors

#### ⏱ Performance improvements

- update Server 404 & OPTIONS handling, remove method override ([71307af](https://github.com/thi-ng/umbrella/commit/71307af))
  - process 404 asap (without full request ctx)
  - process default HTTP OPTIONS handler asap
  - in both cases no interceptors will be run anymore

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/server@0.3.0) (2025-02-02)

#### 🚀 Features

- add more HTTP error response methods ([5731ff3](https://github.com/thi-ng/umbrella/commit/5731ff3))
- add ServerResponse, IPv6 support ([22f64c5](https://github.com/thi-ng/umbrella/commit/22f64c5))

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
