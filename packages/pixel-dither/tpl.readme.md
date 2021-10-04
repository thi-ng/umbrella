# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

The package provides the following dithering algorithm presets (but can also be
very easily extended via definition of custom kernels):

- Atkinson
- Bayes (ordered dithering w/ customizable sizes & levels)
- Burkes
- Diffusion (1D row/column, 2D)
- Floyd-Steinberg
- Jarvis-Judice-Ninke
- Sierra 2-row
- Stucki
- Threshold

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
import { packedBufferFromImage, GRAY8 } from "@thi.ng/pixel";
import { ditherWithKernel, ATKINSON } from "@thi.ng/pixel-dither";

const img = packedBufferFromImage("foo.jpg");

// apply dithering to all channels in given pixel buffer
ditherWithKernel(img, ATKINSON);

// first convert to 8-bit gray before dithering
ditherWithKernel(img.as(GRAY8), ATKINSON);

// apply dithering to select channels only
// use custom threshold & error spillage/bleed factor
ditherWithKernel(img, ATKINSON, { channels: [1, 2, 3], threshold: 0.66, bleed: 0.75 });
```

TODO

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
