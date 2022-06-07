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

The generic implementation provided by this package enables many novel and
unusual CA setups as well as coevolution of multiple CAs within a shared
environment.

### Neighborhoods

Cell neighborhoods are defined via an arbitrary number of 2D offset vectors `[x,
y]`, where `x` coordinates are horizontal offsets and positive `y` coordinates
are used to refer to previous generations (e.g. 0 = current gen, 1 = T-1, 2 =
T-2 etc.) and thereby providing a form of short term memory for that specific
automata. Negative `y` coords will lead to cells being ignored.

### Rule encoding

Automata rules are encoded as JS `BigInt` values and are considered anisotropic
by default. If isotropy is to used, it has to be explicitly pre-encoded [out of
scope of this library]. There's also built-in optional support for position
independent neighborhood encoding, only considering the number/count of non-zero
cells. An encoded rule ID and its overall magnitude is directly related and
dependent on the size and shape of its kernel config, e.g.:

```ts
kernel = [[-2, 1], [-1, 0], [0, 0], [1, 0], [2, 1]]
```

This example kernel defines a 5-cell neighborhood with a max. short term memory
of one additional previous generation (i.e. the [-2,1] and [2,1] offsets)

The related rule has a 32 bit address space (4 billion possibilities), due to
2^5 = 32 and each kernel offset being assigned a distinct bit value by default,
i.e. first kernel offset = 2^0, second kernel offset = 2^1, third = 2^2, fourth
= 2^3, etc. Via the `positional` config option, this behavior can be overridden
per kernel (to achieve position-independent kernels).

Given the following example cell matrix with the center cell highlighted with
caret (`^`):

```text
T-1: 2 0 1 2 1
T-0: 0 1 0 3 0
         ^
```

The above example kernel will select the following values and assign bit
positions (for all non-zero cell states) to compute a summed ID:

| k index | offset    | cell value | encoded |
|--------:|-----------|-----------:|--------:|
| 0       | `[-2, 1]` | 2          | 1       |
| 1       | `[-1, 0]` | 1          | 2       |
| 2       | `[0, 0]`  | 0          | 0       |
| 3       | `[1, 0]`  | 3          | 8       |
| 4       | `[2, 1]`  | 1          | 16      |

Final encoded neighborhood sum: 1 + 2 + 8 + 16 = 27

To determine if a the current cell should be active or not in the next
generation, we now use that encoded sum as bit position to test a single bit of
the automata's rule ID, i.e. here we're testing bit 27. If that corresponding
bit is set in the rule ID, the cell's state will be increased by 1.

### Cell states

Each automata config can define a max. number of possible cell states (aka age).
Once a cell reaches the configured `numStates`, it automatically resets to zero.
This is by default, but can be overridden via the `reset` option. Conversely, if
the corresponding bit is _not_ set in the rule ID, the cell state will be zeroed
too.

### Wraparound

By default the environment is configured to be toroidal, i.e. both left/right
sides of the env are connected. The behavior can be controlled via a ctor arg
and/or at runtime via the `wrap` property.

### Masks

The `mask` array can be used to select different CA configurations for each cell
in the environment. Because this mask array is initialized to zero, only the
first CA configuration will be used for all cells in the environment by default.
It's the user's responsibility to manage the mask and select/enable other (if
any) CA configs for individual cells (usually cell ranges). The values stored in
this array correspond to the indices of the CA configurations given at
construction.

### Limits

Due to using `Uint8Arrays` for storage, only up to 256 cell states are
supported. The same limit applies to the number of CA configs given.

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
