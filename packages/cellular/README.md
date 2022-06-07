<!-- This file is generated - DO NOT EDIT! -->

# ![cellular](https://media.thi.ng/umbrella/banners/thing-cellular.svg?1a3e0e44)

[![npm version](https://img.shields.io/npm/v/@thi.ng/cellular.svg)](https://www.npmjs.com/package/@thi.ng/cellular)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/cellular.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

![Custom cellular automata w/ 7-neighborhood & 128 states](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/cellular/hero.png)

Highly customizable 1D cellular automata, shared env, multiple rules, arbitrary sized/shaped neighborhoods, short term memory, cell states etc..

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcellular%5D+in%3Atitle)

### Related packages

- [@thi.ng/lsys](https://github.com/thi-ng/umbrella/tree/develop/packages/lsys) - Functional, extensible L-System architecture w/ support for probabilistic rules
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel) - Typedarray integer & float pixel buffers w/ customizable formats, blitting, drawing, convolution

## Installation

```bash
yarn add @thi.ng/cellular
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/cellular"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const cellular = await import("@thi.ng/cellular");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.13 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/cellular/)

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

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-cellular,
  title = "@thi.ng/cellular",
  author = "Karsten Schmidt",
  note = "https://thi.ng/cellular",
  year = 2022
}
```

## License

&copy; 2022 Karsten Schmidt // Apache Software License 2.0
