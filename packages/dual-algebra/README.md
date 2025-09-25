<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/dual-algebra](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-dual-algebra.svg?0530ab72)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dual-algebra.svg)](https://www.npmjs.com/package/@thi.ng/dual-algebra)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dual-algebra.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Multivariate dual number algebra, automatic differentiation.

- [Wikipedia: Dual numbers](https://en.wikipedia.org/wiki/Dual_number)
- [Wikipedia: Automatic_differentiation](https://en.wikipedia.org/wiki/Automatic_differentiation#Automatic_differentiation_using_dual_numbers)

(Package name with hat tip to [@paniq](https://www.shadertoy.com/view/4dVGzw))

Dual numbers are an elegant solution to compute **precise**<sup>(1)</sup> derivatives of
functions which otherwise require complex & brittle numerical solutions.
Furthermore, multivariate dual numbers can be used to obtain (in parallel)
derivatives of multiple variables within a single function execution.

In this package, dual numbers are encoded as vanilla JS arrays with the internal
structure: `[real, d1 .. dn]`, where `real` is the real-valued part of the
number and `d1`..`dn` multivariate derivatives. At minimum, at least `d1`
exists, but the number (of derivatives) depends on usage and the number of
variables in a function one wishes to compute derivatives for.

<small><sup>(1)</sup> Here *"precise"* within the realm of IEEE-754</small>

Some examples (see further below for code example):

```ts
[Math.PI, 0] // the scalar π as 1-dual number
[Math.PI, 1] // π as the current value of a 1-dual variable

[5, 1, 0] // 5 as first variable in 2-variable function
[3, 0, 1] // 3 as second variable in a 2-var function

[5, 1, 0, 0] // 1st var in 3-var fn
[3, 0, 1, 0] // 2nd var in 3-var fn
[2, 0, 0, 1] // 3rd var in 3-var fn
```

Alternatively, use convenience fns to create dual numbers:

```ts
import { $, $2, $3, dual } from "@thi.ng/dual-algebra";

$(5)     // [5, 0]
$(5, 1)  // [5, 1]

$2(5)    // [5, 0, 0]
$2(5, 2) // [5, 0, 1]

$3(5)    // [5, 0, 0, 0]
$3(5, 2) // [5, 0, 1, 0]

dual(5, 6)    // [5, 0, 0, 0, 0, 0, 0]
dual(5, 6, 4) // [5, 0, 0, 0, 1, 0, 0]
```

The following operations are available so far. Each operation takes one or more
multivariate dual number(s) and computes the actual real-valued results as well
as the 1st derivatives. Each op has an optimized/loop-free impl for 1-dual
numbers.

- `add(a, b)`
- `sub(a, b)`
- `mul(a, b)`
- `div(a, b)`
- `neg(a)`
- `abs(a)`

Exponentials:

- `pow(a, k)` (k = scalar)
- `sqrt(a)`
- `exp(a)`
- `log(a)`

Trigonometry:

- `sin(a)`
- `cos(a)`
- `tan(a)`
- `atan(a)`

Polynomials:

- `quadratic(x, a, b, c)` ⇒ _ax^2 + bx + c_
- `cubic(x, a, b, c, d)` ⇒ _ax^3 + bx^2 + cx + d_
- `quartic(x, a, b, c, d, e)` ⇒ _ax^4 + bx^3 + cx^2 + dx + e_

For each polynomial, there're scalar versions available too, taking only
rational numbers as arguments (rather than dual numbers already). These versions
are suffixed with `S` (for "scalar"): `quadraticS`, `cubicS` and `quarticS`...

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdual-algebra%5D+in%3Atitle)

## Related packages

- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math) - Assorted common math functions & utilities

## Installation

```bash
yarn add @thi.ng/dual-algebra
```

ESM import:

```ts
import * as da from "@thi.ng/dual-algebra";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/dual-algebra"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const da = await import("@thi.ng/dual-algebra");
```

Package sizes (brotli'd, pre-treeshake): ESM: 992 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                            | Description                                                | Live demo                                            | Source                                                                            |
|:----------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------|:-----------------------------------------------------|:----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/spline-tangent.png" width="240"/> | Compute cubic spline position & tangent using Dual Numbers | [Demo](https://demo.thi.ng/umbrella/spline-tangent/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/spline-tangent) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/dual-algebra/)

```ts
import { $2, add, mul, neg, sin, evalFn2 } from "@thi.ng/dual-algebra";

// compute the actual result and derivatives of X & Y
// of this function with 2 variables:
// z = -x^2 + 3 * sin(y)

const f = (x: number, y: number) => {
    // convert to multivariate dual numbers
    const xx = $2(x, 1);
    const yy = $2(y, 2);
    // compute...
    return add(neg(mul(xx, xx)), mul($2(3), sin(yy)));
}

// `evalFn2()` is higher order fn syntax sugar to simplify
// dealing w/ scalars, here same with that wrapper:
const g = evalFn2((x, y) => add(neg(mul(x, x)), mul($2(3), sin(y))));

f(0, 0);
// [0, 0, 3] => [f(x,y), dFdx(f(x,y)), dFdy(f(x,y))]

g(0, 0);
// [0, 0, 3]

f(1, Math.PI);
// [-0.9999999999999997, -2, -3]
```

Polynomial example (see [interactive
graph](https://www.desmos.com/calculator/5ot2dpgv0a) of this function):

```ts
import { add, mul, pow, cubicS } from "@thi.ng/dual-algebra";

// compute the cubic polynomial: f(x) = 2x^3 - 3x^2 - 4x + 5

// using `cubicS()` polynomial helper
const f1 = (x: number) => cubicS(x, 2, -3, -4, 5);

// ...or expanded out
const f2 = (x: number) =>
    add(
        add(
            add(
                mul([2, 0], pow([x, 1], 3)),
                mul([-3, 0], pow([x, 1], 2))
            ),
            mul([-4, 0], [x, 1])
        ),
        [5, 0]
    );

f2(0) // [5, -4] [f(x), dFdx(f(x))]
f2(1) // [0, -4]
f2(2) // [1, 8]
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-dual-algebra,
  title = "@thi.ng/dual-algebra",
  author = "Karsten Schmidt",
  note = "https://thi.ng/dual-algebra",
  year = 2020
}
```

## License

&copy; 2020 - 2025 Karsten Schmidt // Apache License 2.0
