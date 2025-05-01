<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/tensors](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-tensors.svg?0d90e46c)

[![npm version](https://img.shields.io/npm/v/@thi.ng/tensors.svg)](https://www.npmjs.com/package/@thi.ng/tensors)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/tensors.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 207 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Built-in tensor operations](#built-in-tensor-operations)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Basic usage](#basic-usage)
  - [Matrix-matrix multiplication](#matrix-matrix-multiplication)
  - [Matrix-vector multiplication](#matrix-vector-multiplication)
- [Authors](#authors)
- [License](#license)

## About

1D/2D/3D/4D tensors with extensible polymorphic operations and customizable storage.

> [!NOTE]
> This package contains code originally written in 2017/18 and, at the moment, is
> undergoing heavy refactoring to be stylistically more aligned with other thi.ng
> packages — use with caution!

## Built-in tensor operations

The set of tensor polymorphic component-wise ops is easily extensible via
provided higher-order functions in the `defOpXX()` family. Most of the ops
listed below are also based on this approach. The function signatures and naming
conventions are closely aligned to the ones used by the
[thi.ng/vectors](https://thi.ng/vectors) package.

- [abs](https://docs.thi.ng/umbrella/tensors/variables/abs.html): componentwise `Math.abs`
- [add](https://docs.thi.ng/umbrella/tensors/variables/add.html): tensor-tensor addition
- [addN](https://docs.thi.ng/umbrella/tensors/variables/addN.html): tensor-scalar addition
- [argMax](https://docs.thi.ng/umbrella/tensors/variables/argMax.html): maximum component index/value
- [argMin](https://docs.thi.ng/umbrella/tensors/variables/argMin.html): minimum component index/value
- [clamp](https://docs.thi.ng/umbrella/tensors/variables/clamp.html): tensor-tensor interval clamping
- [clampN](https://docs.thi.ng/umbrella/tensors/variables/clampN.html): tensor-scalar interval clamping
- [cos](https://docs.thi.ng/umbrella/tensors/variables/cos.html): componentwise `Math.cos`
- [diagonal](https://docs.thi.ng/umbrella/tensors/variables/diagonal.html): diagonal extraction
- [div](https://docs.thi.ng/umbrella/tensors/variables/div.html): tensor-tensor division
- [divN](https://docs.thi.ng/umbrella/tensors/variables/divN.html): tensor-scalar division
- [dot](https://docs.thi.ng/umbrella/tensors/variables/dot.html): dot product
- [exp](https://docs.thi.ng/umbrella/tensors/variables/exp.html): componentwise `Math.exp`
- [exp2](https://docs.thi.ng/umbrella/tensors/variables/exp2.html): componentwise `2^x`
- [log](https://docs.thi.ng/umbrella/tensors/variables/log.html): componentwise `Math.log`
- [log2](https://docs.thi.ng/umbrella/tensors/variables/log2.html): componentwise `Math.log2`
- [mag](https://docs.thi.ng/umbrella/tensors/variables/mag.html): tensor magnitude
- [magSq](https://docs.thi.ng/umbrella/tensors/variables/magSq.html): tensor squared magnitude
- [max](https://docs.thi.ng/umbrella/tensors/variables/max.html): tensor-tensor maximum
- [maxN](https://docs.thi.ng/umbrella/tensors/variables/maxN.html): tensor-scalar maximum
- [min](https://docs.thi.ng/umbrella/tensors/variables/min.html): tensor-tensor minimum
- [minN](https://docs.thi.ng/umbrella/tensors/variables/minN.html): tensor-scalar maximum
- [mul](https://docs.thi.ng/umbrella/tensors/variables/mul.html): tensor-tensor multiplication
- [mulN](https://docs.thi.ng/umbrella/tensors/variables/mulN.html): tensor-scalar multiplication
- [mulM](https://docs.thi.ng/umbrella/tensors/variables/mulM.html): matrix-matrix product
- [mulV](https://docs.thi.ng/umbrella/tensors/variables/mulV.html): matrix-vector product
- [normalize](https://docs.thi.ng/umbrella/tensors/variables/normalize.html): tensor normalization (w/ optional length)
- [pow](https://docs.thi.ng/umbrella/tensors/variables/pow.html): tensor-tensor `Math.pow`
- [powN](https://docs.thi.ng/umbrella/tensors/variables/powN.html): tensor-scalar `Math.pow`
- [product](https://docs.thi.ng/umbrella/tensors/variables/product.html): component product
- [randDistrib](https://docs.thi.ng/umbrella/tensors/variables/randDistrib.html): fill with random data from distribution fn
- [relu](https://docs.thi.ng/umbrella/tensors/variables/relu.html): ReLU activation
- [reluN](https://docs.thi.ng/umbrella/tensors/variables/reluN.html): leaky ReLU activation
- [select](https://docs.thi.ng/umbrella/tensors/variables/select.html): generalization of argMin/Max
- [set](https://docs.thi.ng/umbrella/tensors/variables/set.html): tensor setter
- [setN](https://docs.thi.ng/umbrella/tensors/variables/setN.html): tensor setter w/ uniform scalar
- [sigmoid](https://docs.thi.ng/umbrella/tensors/variables/sigmoid.html): Sigmoid activation
- [sin](https://docs.thi.ng/umbrella/tensors/variables/sin.html): componentwise `Math.sin`
- [softMax](https://docs.thi.ng/umbrella/tensors/variables/softMax.html): Soft Max activation
- [sqrt](https://docs.thi.ng/umbrella/tensors/variables/sqrt.html): componentwise `Math.sqrt`
- [step](https://docs.thi.ng/umbrella/tensors/variables/step.html): Threshold function (as as GLSL `step()`)
- [sub](https://docs.thi.ng/umbrella/tensors/variables/sub.html): tensor-tensor subtraction
- [subN](https://docs.thi.ng/umbrella/tensors/variables/subN.html): tensor-scalar subtraction
- [sum](https://docs.thi.ng/umbrella/tensors/variables/sum.html): component sum
- [svd](https://docs.thi.ng/umbrella/tensors/variables/sum.html): singular value decomposition
- [tan](https://docs.thi.ng/umbrella/tensors/variables/tan.html): componentwise `Math.tan`
- [tanh](https://docs.thi.ng/umbrella/tensors/variables/tanh.html): componentwise `Math.tanh`
- [trace](https://docs.thi.ng/umbrella/tensors/variables/trace.html): matrix trace (diagonal component sum)

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btensors%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/tensors
```

ESM import:

```ts
import * as ten from "@thi.ng/tensors";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/tensors"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const ten = await import("@thi.ng/tensors");
```

Package sizes (brotli'd, pre-treeshake): ESM: 7.72 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/tensors/)

TODO

### Basic usage

```ts tangle:export/readme-1.ts
import * as t from "@thi.ng/tensors";
import { range } from "@thi.ng/transducers";

// create 4x4x4 3D tensor and fill with values
const a = t.tensor("f32", [4, 4, 4], { data: [...range(64)] });

t.print(a);
// --- 0: ---
//         0    1.0000    2.0000    3.0000
//    4.0000    5.0000    6.0000    7.0000
//    8.0000    9.0000   10.0000   11.0000
//   12.0000   13.0000   14.0000   15.0000
// --- 1: ---
//   16.0000   17.0000   18.0000   19.0000
//   20.0000   21.0000   22.0000   23.0000
//   24.0000   25.0000   26.0000   27.0000
//   28.0000   29.0000   30.0000   31.0000
// --- 2: ---
//   32.0000   33.0000   34.0000   35.0000
//   36.0000   37.0000   38.0000   39.0000
//   40.0000   41.0000   42.0000   43.0000
//   44.0000   45.0000   46.0000   47.0000
// --- 3: ---
//   48.0000   49.0000   50.0000   51.0000
//   52.0000   53.0000   54.0000   55.0000
//   56.0000   57.0000   58.0000   59.0000
//   60.0000   61.0000   62.0000   63.0000

// pick a tensor slice/axis (view only, 2d tensor)
t.print(a.pick([3]));
//   48.0000   49.0000   50.0000   51.0000
//   52.0000   53.0000   54.0000   55.0000
//   56.0000   57.0000   58.0000   59.0000
//   60.0000   61.0000   62.0000   63.0000

// any axis set to -1 will be skipped
// here we select slice 3 and column 2 only (1d tensor)
t.print(a.pick([3, -1, 2]));
//   50.0000   54.0000   58.0000   62.0000

// use `.pack()` to apply view to standalone densely packed tensor (own data)
console.log(a.pick([3, 2]).pack().data);
// Float32Array(4) [ 56, 57, 58, 59 ]

// only select every second value along each axis
t.print(a.step([2, 2, 2]));
// --- 0: ---
//         0    2.0000
//    8.0000   10.0000
// --- 1: ---
//   32.0000   34.0000
//   40.0000   42.0000

// extract an axis range (view only, use `.pack()` to extract)
t.print(a.lo([1, 1, 1]).hi([2, 2, 2]));
// --- 0: ---
//   21.0000   22.0000
//   25.0000   26.0000
// --- 1: ---
//   37.0000   38.0000
//   41.0000   42.0000

// read & write elements (no bounds checking!)
a.set([1, 2, 3], 100);

console.log(a.get([1, 2, 3]));
// 100

// or via direct array access
console.log(a.data[a.index([1, 2, 3])]);
// 100

// tensors are iterables (in current stride order)
console.log([...a]);
// [ 0, 1, 2, 3, 4, ... 60, 61, 62, 63 ]

// create a 2D tensor w/ random values (by default normal distribution, bias=0, std=1)
const b = t.randDistrib(t.tensor("f64", [4, 2]));

t.print(b);
//    0.3854    0.6597
//    0.5775    0.9201
//   -0.7276   -0.1069
//    1.0550    0.4903

// apply sigmoid
// (null as output arg means mutate original [in 99% of all provided ops])
t.print(t.sigmoid(null, b));
//    0.5952    0.6592
//    0.6405    0.7151
//    0.3257    0.4733
//    0.7417    0.6202
```

### Matrix-matrix multiplication

```ts tangle:export/readme-mulm.ts
import { tensor, mulM, print } from "@thi.ng/tensors";

// create 2x3 matrix
const m1 = tensor([[1, 2, 3], [4, 5, 6]]);

print(m1);
//    1.0000    2.0000    3.0000
//    4.0000    5.0000    6.0000

// create transposed view (view only, zero-copy)
const m2 = m1.transpose([1, 0]);

print(m2);
//    1.0000    4.0000
//    2.0000    5.0000
//    3.0000    6.0000

// matrix multiplication
// (here if 1st arg is null, a new tensor will be created)
print(mulM(null, m1, m2));
//   14.0000   32.0000
//   32.0000   77.0000
```

### Matrix-vector multiplication

```ts tangle:export/readme-mulv.ts
import { tensor, mulV, print } from "@thi.ng/tensors";

// create 2x3 transformation matrix (row-major)
const mat = tensor([[10, 0, 100], [0, 5, 200]]);

print(mat);
//   10.0000         0  100.0000
//         0    5.0000  200.0000

// create vector
const vec = tensor([1, 1, 1]);

// matrix-vector multiply
print(mulV(null, mat, vec));
//  110.0000  205.0000
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-tensors,
  title = "@thi.ng/tensors",
  author = "Karsten Schmidt",
  note = "https://thi.ng/tensors",
  year = 2018
}
```

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache License 2.0
