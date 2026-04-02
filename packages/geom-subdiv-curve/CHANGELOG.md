# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.0.78](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-subdiv-curve@3.0.78/packages/geom-subdiv-curve) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

# [3.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-subdiv-curve@3.0.0/packages/geom-subdiv-curve) (2024-06-21)

#### 🛑 Breaking changes

- migrate types from [@thi.ng/geom-api](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/geom-api) ([c7564f2](https://codeberg.org/thi.ng/umbrella/commit/c7564f2))
- BREAKING CHANGE: migrate/internalize types from [@thi.ng/geom-api](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/geom-api)
  - add/migrate SubdivKernel
  - update imports
  - update deps
- update subdiv kernels ([cd69dd4](https://codeberg.org/thi.ng/umbrella/commit/cd69dd4))
- BREAKING CHANGE: update SubdivKernel interface & impls
  - update `SubdivKernel` fns to support both open/closed versions
  - merge/rename open/closed kernels & remove obsolete
    - SUBDIV_MID
    - SUBDIV_THIRDS
    - SUBDIV_CHAIKIN
    - SUBDIV_CUBIC
  - add SUBDIV_DLG kernel
- update subdivide() signature ([25576ca](https://codeberg.org/thi.ng/umbrella/commit/25576ca))
- BREAKING CHANGE: update subdivide() signature
  - only accept kernels as array
  - add `closed` arg/flag

#### 🚀 Features

- add SUBDIV_DISPLACE higher-order kernel ([7655e50](https://codeberg.org/thi.ng/umbrella/commit/7655e50))
- add support for passing multiple kernels to subdivide() ([03c5e54](https://codeberg.org/thi.ng/umbrella/commit/03c5e54))
  - update args to support multiple kernels as array
- update SUBDIV_DISPLACE ([a75f37c](https://codeberg.org/thi.ng/umbrella/commit/a75f37c))
  - update displace config to allow specifying normalized split positions
  - add/update docs & example

#### ♻️ Refactoring

- update SUBDIV_DISPLACE, internal refactoring ([3e84ba8](https://codeberg.org/thi.ng/umbrella/commit/3e84ba8))

### [2.1.86](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-subdiv-curve@2.1.86/packages/geom-subdiv-curve) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))
