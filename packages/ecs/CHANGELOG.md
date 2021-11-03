# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.6.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/ecs@0.6.7...@thi.ng/ecs@0.6.8) (2021-11-03)

**Note:** Version bump only for package @thi.ng/ecs





# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/ecs@0.5.26...@thi.ng/ecs@0.6.0) (2021-10-12)


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






#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/ecs@0.4.9...@thi.ng/ecs@0.5.0) (2021-02-20)

###  Code Refactoring

- **ecs:** update mem-mapped component type handling ([3207200](https://github.com/thi-ng/umbrella/commit/3207200367fbe905b7f425690c772a7d388f92e3))

###  BREAKING CHANGES

- **ecs:** component buffer data type use string consts
    - part of unified umbrella-wide changes to thi.ng/api Type alias   (see a333d4182)

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/ecs@0.3.34...@thi.ng/ecs@0.4.0) (2020-10-19)

###  Features

- **ecs:** add custom mempool support ([1a59405](https://github.com/thi-ng/umbrella/commit/1a59405bb99c6024294d1361dc35bca8fc770463))

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/ecs@0.2.0...@thi.ng/ecs@0.3.0) (2020-01-24)

###  Bug Fixes

- **ecs:** fix [#178](https://github.com/thi-ng/umbrella/issues/178), refactor listener handling ([5813afc](https://github.com/thi-ng/umbrella/commit/5813afc6d263d09af215b00eb44dad569c6ead9a))

###  Features

- **ecs:** update ECS, components, caches ([15e9cea](https://github.com/thi-ng/umbrella/commit/15e9ceadba6815bf86986176492028ac05eae3aa))

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/ecs@0.1.0...@thi.ng/ecs@0.2.0) (2019-11-30)

###  Bug Fixes

- **ecs:** update VersionedIDGen, add tests ([118405d](https://github.com/thi-ng/umbrella/commit/118405d0039e6f013c0343d805f220d04320f327))

###  Features

- **ecs:** add version bits for VersionedIDGen, add/update tests ([cc06f0b](https://github.com/thi-ng/umbrella/commit/cc06f0b7c964c116468f10a399dd3948610c5840))

#  [0.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/ecs@0.0.2...@thi.ng/ecs@0.1.0) (2019-11-09)

###  Features

- **ecs:** add componentsForID/groupsForID(), add NullCache ([416a8b7](https://github.com/thi-ng/umbrella/commit/416a8b7974716ec8b645dde8d2ed6ad389f18edb))
- **ecs:** add defComponent, fix return types ([8a65446](https://github.com/thi-ng/umbrella/commit/8a654463af1721377aa3372e21d86ec880548c84))
- **ecs:** add ECS INotify impl, entity ops, update Group ([0423f35](https://github.com/thi-ng/umbrella/commit/0423f35b7f589056ee3578d32530023a318322c0))
- **ecs:** add ECS main class, update types, Component, Group ([40dc1b6](https://github.com/thi-ng/umbrella/commit/40dc1b6abcfd0f11e04c7f7f22359bc928a9ff7d))
- **ecs:** add generics for Component & Group related types & methods ([82e3e92](https://github.com/thi-ng/umbrella/commit/82e3e92fe6f74395383069d370e3d6eb21982da5))
- **ecs:** add UnboundedCache, update Component & Group ctors/opts ([5c36892](https://github.com/thi-ng/umbrella/commit/5c36892ef9ed62f973a726277750c5845c9a859e))
- **ecs:** add/update types, new components, update Group, ECS, add tests ([fdae8a7](https://github.com/thi-ng/umbrella/commit/fdae8a794093e42f71165f7552231d9af744dfcd))
- **ecs:** initial refactor & import as new package (MBP2010) ([ad0b566](https://github.com/thi-ng/umbrella/commit/ad0b56629dc6133b3bcde429fa7df26f627ba0c1))
- **ecs:** update Group, Component, cache behavior, IDGen, iteration ([e8c72d5](https://github.com/thi-ng/umbrella/commit/e8c72d587e58ad6dbc7e6961e6daa098b5b7e614))
