<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package contains functionality which was previously part of and has been
extracted from the [@thi.ng/pixel](https://thi.ng/pixel) package.

- Convolution w/ arbitrary shaped/sized kernels, pooling, striding
- Convolution kernel & pooling kernels presets
  - Higher order kernel generators (Gaussian, Lanczos)
- Image pooling filters (min/max, mean, adaptive threshold, custom)
- Image pyramid generation (w/ customizable kernels)
- Customizable normal map generation (i.e. X/Y gradients plus static Z component)

### Strided convolution & pooling

Floating point buffers can be processed using arbitrary convolution kernels. The
following convolution kernel presets are provided for convenience:

| Kernel           | Size        |
|------------------|-------------|
| `BOX_BLUR3`      | 3x3         |
| `BOX_BLUR5`      | 5x5         |
| `GAUSSIAN_BLUR3` | 3x3         |
| `GAUSSIAN_BLUR5` | 5x5         |
| `GAUSSIAN(n)`    | 2n+1 x 2n+1 |
| `HIGHPASS3`      | 3x3         |
| `LANCZOS(a,s)`   | as+1 x as+1 |
| `SHARPEN3`       | 3x3         |
| `SOBEL_X`        | 3x3         |
| `SOBEL_Y`        | 3x3         |
| `UNSHARP_MASK5`  | 5x5         |

Custom kernels can be defined (and code generated) using an array of
coefficients and a given kernel size. See above presets and
[`defKernel()`](https://docs.thi.ng/umbrella/pixel/functions/defKernel.html) for
reference.

Furthermore, convolution supports striding (i.e. only processing & keeping every
nth pixel column/row, aka downscaling) and pixel pooling (e.g. for ML
applications). Available pooling kernel presets (kernel sizes must be configured
independently):

| Kernel                 | Description        |
|------------------------|--------------------|
| `POOL_MEAN`            | Moving average     |
| `POOL_MAX`             | Local maximum      |
| `POOL_MIN`             | Local minimum      |
| `POOL_NEAREST`         | Nearest neighbor   |
| `POOL_THRESHOLD(bias)` | Adaptive threshold |

Convolution can be applied to single, multiple or all channels of a
`FloatBuffer`. See
[`convolveChannel()`](https://docs.thi.ng/umbrella/pixel/functions/convolveChannel.html)
and
[`convolveImage()`](https://docs.thi.ng/umbrella/pixel/functions/convolveImage.html).

See
[ConvolveOpts](https://docs.thi.ng/umbrella/pixel/interfaces/ConvolveOpts.html)
for config options.

```js tangle:export/readme-convolve.ts
import { floatBufferFromImage, FLOAT_RGB, imageFromURL } from "@thi.ng/pixel";
import { convolveImage, SOBEL_X } from "@thi.ng/pixel-convolve";

// convolutions are only available for float buffers (for now)
const src = floatBufferFromImage(await imageFromURL("test.jpg"), FLOAT_RGB);

// apply horizontal Sobel kernel preset to all channels
// downscale image by factor 2 (must be integer)
// scale kernel result values by factor 4
const dest = convolveImage(src, { kernel: SOBEL_X, stride: 2, scale: 4 });
```

### Normal map generation

Normal maps can be created via `normalMap()`. This function uses an adjustable
convolution kernel size to control gradient smoothness & details. Result X/Y
gradients can also be scaled (uniform or anisotropic) and the Z component can be
customized to (default: 1.0). The resulting image is in `FLOAT_NORMAL` format,
using signed channel values. This channel format is auto-translating these into
unsigned values when the image is converted into an integer format.

| Step | Scale = 1                                                                                | Scale = 2                                                                                | Scale = 4                                                                                | Scale = 8                                                                                |
|------|------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| 0    | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-0-1.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-0-2.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-0-4.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-0-8.jpg) |
| 1    | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-1-1.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-1-2.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-1-4.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-1-8.jpg) |
| 2    | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-2-1.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-2-2.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-2-4.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-2-8.jpg) |
| 3    | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-3-1.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-3-2.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-3-4.jpg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/pixel/nmap-3-8.jpg) |

```ts tangle:export/readme-normalmap.ts
import { ARGB8888, FLOAT_GRAY, floatBufferFromImage, imageFromURL } from "@thi.ng/pixel";
import { normalMap } from "@thi.ng/pixel-convolve";

// read source image into a single channel floating point buffer
const src = floatBufferFromImage(await imageFromURL("noise.png"), FLOAT_GRAY);

// create normal map (w/ default options)
// this results in a new float pixel buffer with FLOAT_RGB format
const nmap = normalMap(src, { step: 0, scale: 1 });

// pixel lookup (vectors are stored _un_normalized)
nmap.getAt(10, 10);
// Float32Array(3) [ -0.019607841968536377, -0.04313725233078003, 1 ]

// convert to 32bit packed int format
const nmapARGB = nmap.as(ARGB8888);
```

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

<!-- include ../../assets/tpl/footer.md -->
