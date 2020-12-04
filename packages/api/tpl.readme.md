# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

This package is implicitly used by most other projects in this
repository. It defines:

- Dozens of generic, common interfaces & types
- Class & method decorators
- Mixins
- Logging
- Assert (can be disabled for production builds)
- Typedarray utilities

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

### Environment variables

The following env variables are used to control the behavior of some functions in production builds:

- `UMBRELLA_ASSERTS` -  if set to `1` the
  [assert](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/assert.ts)
  function will **always** be enabled. By default, `assert()` is
  disabled for production builds, i.e. if `process.env.NODE_ENV ===
  "production"`.
- `UMBRELLA_GLOBALS` -  if set to `1` the
  [exposeGlobal](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/expose.ts)
  function will **always** be enabled. By default, `exposeGlobal()` is
  disabled for production builds, i.e. if `process.env.NODE_ENV ===
  "production"`.

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
