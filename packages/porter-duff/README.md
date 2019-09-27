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
- [Related packages](#related-packages)
- [Usage examples](#usage-examples)
- [API](#api)
    - [Operators](#operators)
    - [Custom operators](#custom-operators)
    - [Additional operators / modifiers](#additional-operators--modifiers)
    - [Pre/post-multiplied colors](#prepost-multiplied-colors)
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

![porter-duff compositing modes](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/porter-duff/porter-duff2.png)

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

## Related packages

- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/master/packages/pixel) - Multi-format pixel buffers

## Usage examples

Full overview of all operators (shown above):

[Live demo](http://demo.thi.ng/umbrella/porter-duff/) |
[Source](https://github.com/thi-ng/umbrella/tree/master/examples/porter-duff)

Basic usage...

```ts
import * as pd from "@thi.ng/porter-duff";

// packed int version (premultiplied ARGB)
pd.SRC_OVER_I(0x80800000, 0xcc0cc00)

// automatically premultiply inputs & post-multiply result
pd.porterDuffPInt(pd.SRC_OVER_I, 0x80ff0000, 0xcc00ff00);

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

### Custom operators

New operators (e.g. for blend modes) can be easily defined via
`porterDuff` / `porterDuffInt`. Both functions take 2 function arguments
to extract blend coefficients from the src & dest colors:

```ts
// coefficient functions take the normalized alpha values
// of both colors as arguments, but unused here...
const customOp = porterDuffInt(() => -0.5, () => 1);
```

![custom operator](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/porter-duff/porter-duff-custom.png)

The following coefficient functions are included by default (and are
used by all standard operators):

- `ZERO` => 0
- `ONE` => 1
- `A` => alpha of src color
- `B` => alpha of dest color
- `ONE_MINUS_A` => 1 - alpha of src color
- `ONE_MINUS_B` => 1 - alpha of dest color

### Additional operators / modifiers

The following modifiers are also discussed in the original Porter-Duff paper (linked above).

- `darken` / `darkenInt`
- `dissolve` / `dissolveInt`
- `opacity` / `opacityInt`

### Pre/post-multiplied colors

All Porter-Duff operators expect colors with **pre-multiplied** alpha.
Premultiplication is also recommended for transparent WebGL textures
(especially when using mipmaps). For that purpose the following helpers
might be useful:

- `premultiply` / `premultiplyInt`
- `postmultiply` / `postmultiplyInt`
- `isPremultiplied` / `isPremultipliedInt`

Furthermore, existing PD operators can be wrapped with automatic
pre/post-multiplies using `porterDuffP` / `porterDuffPInt` (see example
above).

Note: HTML Canvas `ImageData` is using non-premultiplied colors.

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
