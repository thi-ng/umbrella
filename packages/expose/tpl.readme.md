# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

This package provides a single function
[`exposeGlobal()`](https://docs.thi.ng/umbrella/expose/modules.html#exposeGlobal)
to expose a variable in the global scope (e.g. for development/debugging
purposes). It's behavior is controled by the `UMBRELLA_GLOBALS` or
`VITE_UMBRELLA_GLOBALS` environment variables - if either is set (to a non-empty
string) the function will **always** be enabled. Otherwise (by default),
`exposeGlobal()` is **disabled for production builds**, i.e. if
`process.env.NODE_ENV === "production"`.

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


## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
