# @thi.ng/porter-duff

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/porter-duff.svg)](https://www.npmjs.com/package/@thi.ng/porter-duff)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/porter-duff.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [References](#references)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
    - [Operators](#operators)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

This package provides all 12 fundamental
[Porter-Duff](http://ssp.impulsetrain.com/porterduff.html) compositing /
blending operators, and utilities to pre/post-multiply alpha. All
operators are available for packed ARGB/ABGR 32bit packed ints or RGBA
float vectors.

*Note:* These operators were previously part of the
[@thi.ng/color](https://github.com/thi-ng/umbrella/tree/master/packages/color)
package (prior to v1.0.0).

![porter-duff compositing modes](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/porter-duff.png)

([Image source](http://www.svgopen.org/2005/papers/abstractsvgopen/#PorterDuffMap))

### References

- https://en.wikipedia.org/wiki/Alpha_compositing#Alpha_blending
- http://ssp.impulsetrain.com/porterduff.html
- https://ciechanow.ski/alpha-compositing/

## Installation

```bash
yarn add @thi.ng/porter-duff
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)

## Usage examples

```ts
import * as pd from "@thi.ng/porter-duff";

// packed int version (premultiplied ARGB)
pd.SRC_OVER_I(0x80800000, 0xff00ff00)

// automatically premultiply inputs & post-multiply result
pd.porterDuffPInt(pd.SRC_OVER_I, 0x80ff0000, 0xff00ff00);

// float version [R,G,B,A]
pd.SRC_OVER_F([1, 0, 0, 0.5], [0, 1, 0, 1]);
```

## API

### Operators

Integer operators are suffixed with `_I`, float versions with `_F`.
Consult above diagram for expected results.

- `CLEAR`
- `SRC`
- `DEST`
- `SRC_OVER`
- `DEST_OVER`
- `SRC_IN`
- `DEST_IN`
- `SRC_OUT`
- `DEST_OUT`
- `SRC_ATOP`
- `DEST_ATOP`
- `XOR`

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
