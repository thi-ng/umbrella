# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

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

```ts
import * as h from "@thi.ng/hex";

const cssColor = (x: number) => "#" + h.U24(x);

cssColor(10597059)
// "#a1b2c3"

h.U48(223928981472033);
// "cba987654321"

h.U48HL(0xcba9, 0x87654321)
// "cba987654321"

h.U64(0xaa * 0x010101010101)
// "0000aaaaaaaaaaaa"

h.U64HL(0x11223344, 0x89abcdef);
// "1122334489abcdef"

// format directly from byte arrays

const BUF = [1, 2, 3, 4, 0x10, 0x20, 0x30, 0x40];

// big-endian

h.U32BE(BUF, 0)
// "01020304"
h.U32BE(BUF, 4)
// "10203040"

// little-endian

h.U32LE(BUF, 0)
// "04030201"

h.U32LE(BUF, 4)
// "40302010"
```

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
