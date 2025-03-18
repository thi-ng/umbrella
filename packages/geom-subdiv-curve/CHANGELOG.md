# Change Log

- **Last updated**: 2025-03-18T13:24:25Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-subdiv-curve@3.0.0) (2024-06-21)

#### 🛑 Breaking changes

- migrate types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api) ([c7564f2](https://github.com/thi-ng/umbrella/commit/c7564f2))
- BREAKING CHANGE: migrate/internalize types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api)
  - add/migrate SubdivKernel
  - update imports
  - update deps
- update subdiv kernels ([cd69dd4](https://github.com/thi-ng/umbrella/commit/cd69dd4))
- BREAKING CHANGE: update SubdivKernel interface & impls
  - update `SubdivKernel` fns to support both open/closed versions
  - merge/rename open/closed kernels & remove obsolete
    - SUBDIV_MID
    - SUBDIV_THIRDS
    - SUBDIV_CHAIKIN
    - SUBDIV_CUBIC
  - add SUBDIV_DLG kernel
- update subdivide() signature ([25576ca](https://github.com/thi-ng/umbrella/commit/25576ca))
- BREAKING CHANGE: update subdivide() signature
  - only accept kernels as array
  - add `closed` arg/flag

#### 🚀 Features

- add SUBDIV_DISPLACE higher-order kernel ([7655e50](https://github.com/thi-ng/umbrella/commit/7655e50))
- add support for passing multiple kernels to subdivide() ([03c5e54](https://github.com/thi-ng/umbrella/commit/03c5e54))
  - update args to support multiple kernels as array
- update SUBDIV_DISPLACE ([a75f37c](https://github.com/thi-ng/umbrella/commit/a75f37c))
  - update displace config to allow specifying normalized split positions
  - add/update docs & example

#### ♻️ Refactoring

- update SUBDIV_DISPLACE, internal refactoring ([3e84ba8](https://github.com/thi-ng/umbrella/commit/3e84ba8))

### [2.1.86](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-subdiv-curve@2.1.86) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))
