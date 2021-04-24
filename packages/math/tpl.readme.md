# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

For the Clojure version, please visit: [thi.ng/math-clj](https://thi.ng/math-clj)

<!-- TOC -->

## About

${pkg.description}

Partially ported from Clojure version
[thi.ng/math-clj](https://github.com/thi-ng/math),
[c.thi.ng](https://github.com/thi-ng/c-thing) and
[thi.ng/vexed-generation](https://github.com/thi-ng/vexed-generation).

${status}

### Breaking changes in v4.0.0

The introduction of several [standard libc math
functions](https://www.cplusplus.com/reference/cmath/) causes a behavior change
of the existing `fmod()` function...

- rename `fmod()` => `mod()` to align w/ GLSL counterpart
- add new `fmod()` w/ standard libc behavior (same as JS % op)
- add `remainder()` w/ standard libc behavior

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

TODO

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
