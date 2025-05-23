<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

- [abs](https://docs.thi.ng/umbrella/tensors/variables/abs.html): Componentwise `Math.abs`
- [add](https://docs.thi.ng/umbrella/tensors/variables/add.html): Tensor-tensor addition
- [addN](https://docs.thi.ng/umbrella/tensors/variables/addN.html): Tensor-scalar addition
- [argMax](https://docs.thi.ng/umbrella/tensors/variables/argMax.html): Maximum component index/value
- [argMin](https://docs.thi.ng/umbrella/tensors/variables/argMin.html): Minimum component index/value
- [clamp](https://docs.thi.ng/umbrella/tensors/variables/clamp.html): Tensor-tensor interval clamping
- [clampN](https://docs.thi.ng/umbrella/tensors/variables/clampN.html): Tensor-scalar interval clamping
- [convolve](https://docs.thi.ng/umbrella/tensors/variables/convolve.html): Tensor convolution (1D/2D/3D only)
- [cos](https://docs.thi.ng/umbrella/tensors/variables/cos.html): Componentwise `Math.cos`
- [diagonal](https://docs.thi.ng/umbrella/tensors/variables/diagonal.html): Diagonal extraction
- [div](https://docs.thi.ng/umbrella/tensors/variables/div.html): Tensor-tensor division
- [divN](https://docs.thi.ng/umbrella/tensors/variables/divN.html): Tensor-scalar division
- [dot](https://docs.thi.ng/umbrella/tensors/variables/dot.html): Dot product
- [exp](https://docs.thi.ng/umbrella/tensors/variables/exp.html): Componentwise `Math.exp`
- [exp2](https://docs.thi.ng/umbrella/tensors/variables/exp2.html): Componentwise `2^x`
- [log](https://docs.thi.ng/umbrella/tensors/variables/log.html): Componentwise `Math.log`
- [log2](https://docs.thi.ng/umbrella/tensors/variables/log2.html): Componentwise `Math.log2`
- [mag](https://docs.thi.ng/umbrella/tensors/variables/mag.html): Tensor magnitude
- [magSq](https://docs.thi.ng/umbrella/tensors/variables/magSq.html): Tensor squared magnitude
- [max](https://docs.thi.ng/umbrella/tensors/variables/max.html): Tensor-tensor maximum
- [maxN](https://docs.thi.ng/umbrella/tensors/variables/maxN.html): Tensor-scalar maximum
- [min](https://docs.thi.ng/umbrella/tensors/variables/min.html): Tensor-tensor minimum
- [minN](https://docs.thi.ng/umbrella/tensors/variables/minN.html): Tensor-scalar maximum
- [mul](https://docs.thi.ng/umbrella/tensors/variables/mul.html): Tensor-tensor multiplication
- [mulN](https://docs.thi.ng/umbrella/tensors/variables/mulN.html): Tensor-scalar multiplication
- [mulM](https://docs.thi.ng/umbrella/tensors/variables/mulM.html): Matrix-matrix product
- [mulV](https://docs.thi.ng/umbrella/tensors/variables/mulV.html): Matrix-vector product
- [normalize](https://docs.thi.ng/umbrella/tensors/variables/normalize.html): Tensor normalization (w/ optional length)
- [pow](https://docs.thi.ng/umbrella/tensors/variables/pow.html): Tensor-tensor `Math.pow`
- [powN](https://docs.thi.ng/umbrella/tensors/variables/powN.html): Tensor-scalar `Math.pow`
- [product](https://docs.thi.ng/umbrella/tensors/variables/product.html): Component product
- [randDistrib](https://docs.thi.ng/umbrella/tensors/variables/randDistrib.html): Fill with random data from distribution fn
- [range](https://docs.thi.ng/umbrella/tensors/variables/range.html): Create 1D tensor of monotonically increasing/decreasing values
- [relu](https://docs.thi.ng/umbrella/tensors/variables/relu.html): ReLU activation
- [reluN](https://docs.thi.ng/umbrella/tensors/variables/reluN.html): Leaky ReLU activation
- [select](https://docs.thi.ng/umbrella/tensors/variables/select.html): Generalization of argMin/Max
- [set](https://docs.thi.ng/umbrella/tensors/variables/set.html): Tensor setter
- [setN](https://docs.thi.ng/umbrella/tensors/variables/setN.html): Tensor setter w/ uniform scalar
- [sigmoid](https://docs.thi.ng/umbrella/tensors/variables/sigmoid.html): Sigmoid activation
- [sin](https://docs.thi.ng/umbrella/tensors/variables/sin.html): Componentwise `Math.sin`
- [softMax](https://docs.thi.ng/umbrella/tensors/variables/softMax.html): Soft Max activation
- [sqrt](https://docs.thi.ng/umbrella/tensors/variables/sqrt.html): Componentwise `Math.sqrt`
- [step](https://docs.thi.ng/umbrella/tensors/variables/step.html): Threshold function (as as GLSL `step()`)
- [sub](https://docs.thi.ng/umbrella/tensors/variables/sub.html): Tensor-tensor subtraction
- [subN](https://docs.thi.ng/umbrella/tensors/variables/subN.html): Tensor-scalar subtraction
- [sum](https://docs.thi.ng/umbrella/tensors/variables/sum.html): Component sum
- [svd](https://docs.thi.ng/umbrella/tensors/variables/sum.html): Singular value decomposition
- [tan](https://docs.thi.ng/umbrella/tensors/variables/tan.html): Componentwise `Math.tan`
- [tanh](https://docs.thi.ng/umbrella/tensors/variables/tanh.html): Componentwise `Math.tanh`
- [trace](https://docs.thi.ng/umbrella/tensors/variables/trace.html): Matrix trace (diagonal component sum)

### Broadcasting support

Most of the built-in functions taking two or more tensors as input are
supporting broadcasting, i.e. the shapes of the individual arguments only need
to be compatible, not identical. The operators attempt to adjust the tensor
shape & stride configurations to be compatible, applying the steps and rules
below:

- If the dimensions are unequal, the smaller tensor's dimensions will be
  increased as needed. The size of each added dimension will be set to 1 and its
  stride set to zero.
- The size of each dimension will be compared and only the following cases are
  accepted (otherwise will throw an error): sizes are equal or one side is 1
- Any of the tensors requiring shape adjustments will be shallow copied with
  new shape/stride config applied.

Some examples:

```ts tangle:export/readme-broadcast.ts
import { add, sub, print, tensor } from "@thi.ng/tensors";

// 2D + 1D
print(add(null, tensor([[1,2], [3,4]]), tensor([10, 20])));
//   11.0000   22.0000
//   13.0000   24.0000

// 2D + 1D (as column vector)
print(add(null, tensor([[1, 2], [3, 4]]), tensor([10, 20]).reshape([2,1])));
//   11.0000   12.0000
//   23.0000   24.0000

// 1D - 2D
print(sub(null, tensor([10, 20]), tensor([[1,2], [3,4]])));
//    9.0000   18.0000
//    7.0000   16.0000

// 1D + 3D
print(add(null, tensor([10, 20]), tensor([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])));
// --- 0: ---
//   11.0000   22.0000
//   13.0000   24.0000
// --- 1: ---
//   15.0000   26.0000
//   17.0000   28.0000

// 2D + 3D
print(add(null, tensor([[10, 20], [100, 200]]), tensor([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])));
// --- 0: ---
//   11.0000   22.0000
//  103.0000  204.0000
// --- 1: ---
//   15.0000   26.0000
//  107.0000  208.0000
```

### Convolution support

Tensor convolution is only possible if both the domain tensor and the kernel
tensor have same dimensionality. No broadcasting support.

The following kernel presets and factories are included:

- `BOX_BLUR2(radius)`: Box blur kernel factory
- `BOX_BLUR2_3`: 3x3 Box blur kernel
- `BOX_BLUR2_5`: 5x5 Box blur kernel
- `GAUSSION2(radius)`: Gaussian blur kernel factory
- `GAUSSION_BLUR2_3`: 3x3 Gaussian blur
- `GAUSSION_BLUR2_5`: 5x5 Gaussian blur
- `SOBEL1`: 1D Sobel kernel
- `SOBEL2`: 2D Sobel kernel
- `SOBEL3`: 3D Sobel kernel

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

TODO

### Basic usage

```ts tangle:export/readme-1.ts
import * as t from "@thi.ng/tensors";

// create 4x4x4 3D tensor and fill with values
const a = t.range(64).reshape([4, 4, 4]);

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
// [ 56, 57, 58, 59 ]

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

<!-- include ../../assets/tpl/footer.md -->
