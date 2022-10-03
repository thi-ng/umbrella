<!-- This file is generated - DO NOT EDIT! -->

# ![porter-duff](https://media.thi.ng/umbrella/banners-20220914/thing-porter-duff.svg?5860729d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/porter-duff.svg)](https://www.npmjs.com/package/@thi.ng/porter-duff)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/porter-duff.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [References](#references)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic usage](#basic-usage)
  - [Operators](#operators)
  - [Custom operators](#custom-operators)
  - [Additional operators / modifiers](#additional-operators--modifiers)
  - [Pre/post-multiplied colors](#prepost-multiplied-colors)
- [Authors](#authors)
- [License](#license)

## About

Porter-Duff operators for packed ints & float-array alpha compositing.

This package provides all 13 fundamental
[Porter-Duff](https://keithp.com/~keithp/porterduff/p253-porter.pdf)
compositing / blending operators, and utilities to pre/post-multiply
alpha. All operators are available for packed ARGB/ABGR 32bit packed
ints or RGBA float vectors.

### References

- https://keithp.com/~keithp/porterduff/p253-porter.pdf (original paper)
- https://en.wikipedia.org/wiki/Alpha_compositing#Alpha_blending
- https://ciechanow.ski/alpha-compositing/
- http://www.adriancourreges.com/blog/2017/05/09/beware-of-transparent-pixels/
- http://ssp.impulsetrain.com/porterduff.html

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bporter-duff%5D+in%3Atitle)

## Related packages

- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel) - Typedarray integer & float pixel buffers w/ customizable formats, blitting, drawing, convolution
- [@thi.ng/shader-ast-stdlib](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib) - Function collection for modular GPGPU / shader programming with [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)

## Installation

```bash
yarn add @thi.ng/porter-duff
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/porter-duff"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const porterDuff = await import("@thi.ng/porter-duff");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.01 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                             | Description                                  | Live demo                                          | Source                                                                          |
|:-----------------------------------------------------------------------------------------------------------------------|:---------------------------------------------|:---------------------------------------------------|:--------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/pixel-basics.png" width="240"/>       | Pixel buffer manipulations                   | [Demo](https://demo.thi.ng/umbrella/pixel-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-basics) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/porter-duff/porter-duff2.png" width="240"/> | Port-Duff image compositing / alpha blending | [Demo](https://demo.thi.ng/umbrella/porter-duff/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/porter-duff)  |

## API

[Generated API docs](https://docs.thi.ng/umbrella/porter-duff/)

### Basic usage

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

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-porter-duff,
  title = "@thi.ng/porter-duff",
  author = "Karsten Schmidt",
  note = "https://thi.ng/porter-duff",
  year = 2018
}
```

## License

&copy; 2018 - 2022 Karsten Schmidt // Apache Software License 2.0
