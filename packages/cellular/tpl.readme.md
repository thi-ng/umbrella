# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

![Custom cellular automata w/ 7-neighborhood & 128 states](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/cellular/hero.png)

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
import { MultiCA1D } from "@thi.ng/cellular";
import { defIndexed, intBuffer } from "@thi.ng/pixel";
import { asPPM } from "@thi.ng/pixel-io-netpbm";
import { writeFileSync } from "fs";

const WIDTH = 512;
const HEIGHT = 512;

// define standard 1D Wolfram CA (3-neighborhood, 2 states)
const ca = new MultiCA1D(
    [
        {
            rule: BigInt(73),
            kernel: [
                [-1, 0],
                [0, 0],
                [1, 0],
            ],
            states: 2,
            reset: false,
        },
    ],
    WIDTH
);

// seed a single cell in center
ca.current[WIDTH/2] = 1;

// create image with indexed color model (2 cell states => 2 colors)
const img = intBuffer(WIDTH, HEIGHT, defIndexed([0xff000000, 0xffffffff]));

// compute the CA for entire image
ca.updateImage(img.data, HEIGHT);

// write as PPM file
writeFileSync("export/out.ppm", asPPM(img));
```

Result:

![1D Wolfram CA, rule 73](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/cellular/wolfram-73.png)

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
