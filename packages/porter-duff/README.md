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

This package provides all 13 fundamental
[Porter-Duff](https://keithp.com/~keithp/porterduff/p253-porter.pdf)
compositing / blending operators, and utilities to pre/post-multiply
alpha. All operators are available for packed ARGB/ABGR 32bit packed
ints or RGBA float vectors.

*Note:* These operators were previously part of the
[@thi.ng/color](https://github.com/thi-ng/umbrella/tree/master/packages/color)
package (prior to v1.0.0).

![porter-duff compositing modes](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/porter-duff2.png)

([Image source](http://www.svgopen.org/2005/papers/abstractsvgopen/#PorterDuffMap))

### References

- https://keithp.com/~keithp/porterduff/p253-porter.pdf (original paper)
- https://en.wikipedia.org/wiki/Alpha_compositing#Alpha_blending
- https://ciechanow.ski/alpha-compositing/
- http://www.adriancourreges.com/blog/2017/05/09/beware-of-transparent-pixels/
- http://ssp.impulsetrain.com/porterduff.html

## Installation

```bash
yarn add @thi.ng/porter-duff
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)

## Usage examples

Full overview of all operators (shown above):

[Live demo](http://demo.thi.ng/umbrella/porter-duff/) |
[Source](https://github.com/thi-ng/umbrella/tree/develop/examples/porter-duff)

Basic usage...

```ts
import * as pd from "@thi.ng/porter-duff";

// packed int version (premultiplied ARGB)
pd.SRC_OVER_I(0x80800000, 0xcc0cc00)

// automatically premultiply inputs & post-multiply result
pd.porterDuffPInt(pd.SRC_OVER_I, 0x80ff0000, 0xcc00cc00);

// the above is same as:
pd.postmultiplyInt(
    pd.SRC_OVER_I(
        pd.premultiplyInt(0x80ff0000),
        pd.premultiplyInt(0xcc00ff00)
    )
)

// premultiplied float version [R,G,B,A]
pd.SRC_OVER_F([1, 0, 0, 0.5], [0, 1, 0, 0.8]);
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
- `PLUS`

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
