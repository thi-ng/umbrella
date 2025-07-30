<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/colored-noise](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-colored-noise.svg?c5c90855)

[![npm version](https://img.shields.io/npm/v/@thi.ng/colored-noise.svg)](https://www.npmjs.com/package/@thi.ng/colored-noise)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/colored-noise.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Blue noise](#blue-noise)
  - [Green noise](#green-noise)
  - [Pink noise](#pink-noise)
  - [Red / brown noise](#red--brown-noise)
  - [Violet noise](#violet-noise)
  - [White noise](#white-noise)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Use as IGen in @thi.ng/dsp](#use-as-igen-in-thingdsp)
- [Authors](#authors)
- [License](#license)

## About

Customizable O(1) ES6 generators for colored noise.

[Colored noise](https://en.wikipedia.org/wiki/Colors_of_noise) is useful for a
wide variety of use cases where a more controlled approach to random number
generation is required, from DSP/synthesis to rendering, geometry generation,
animation etc.

The following noise colors are available and illustrated via their power
spectrums / histograms (averaged 1000 runs @ 256 samples each). Each noise gen
is configurable in terms of number of internal RNG states, value range (default:
`[-1..1)` interval, always centered around 0) and the actual backing PRNG
implementation (default: `Math.random`, see
[@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
for alternatives).

Code ported from Java, C & Clojure implementations and other
references/literature (see links in doc strings). Furthermore, all generators
have been refactored to be O(1).

In alphabetical order:

### Blue noise

High-pass filtered noise (opposite of [red](#red-noise)) -
[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/colored-noise/src/blue.ts)

```text
blue2
                               ▁▁▁▂▂▂▃▄▄▄▅▅▅▅▅▆▆▆▆▇▇▇▇▇▇▇█▇▇███▇
                  ▁▁▂▃▄▄▅▆▇▆████████████████████████████████████
            ▂▃▄▅▇███████████████████████████████████████████████
        ▃▆▇█████████████████████████████████████████████████████
    ▁▅▇█████████████████████████████████████████████████████████
  ▂▆████████████████████████████████████████████████████████████
▂▇██████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████

blue4
                                                 ▁▁▂▄▄▄▆▆▇█▇▆██▇
                                           ▁▃▄▇▇████████████████
                                       ▁▄▆██████████████████████
        ▁▄▅▆▇▇███████▇▇▆▄▃▁          ▄▇█████████████████████████
     ▃▅████████████████████▇▅      ▄████████████████████████████
   ▄██████████████████████████▄  ▁██████████████████████████████
 ▂██████████████████████████████▇███████████████████████████████
▃███████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████

blue16

                                                             ▃▅▇
                                                           ▂████
                                                          ▄█████
                                                   ▂▅▅▃  ▂██████
                                           ▂▅▄▁   ▆████▅▁███████
                    ▂      ▁▄▃    ▁▅▇▇▃   ▆████▂ ▅██████████████
  ▂▆█▆▂   ▂▆█▆▃   ▄███▅   ▆███▇  ▁█████▄ ▆██████▅███████████████
 ▃█████▄ ▃█████▄ ▅█████▆ ▇██████▁███████▇███████████████████████
 ███████▅███████▆███████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████

blue32

                                                               ▆
                                                              ██
                                                             ▅██
                                                          ▅▃ ███
                                                      ▃  ▆██████
                                              ▂   ▇▃ ▆██▃███████
                                  ▂   ▅  ▂▇▃ ▅█▆ ███▄███████████
  ▃   ▃   ▄   ▄   ▄  ▁▇▂ ▂█▃ ▄█▄ ▆█▇ ███▁███▄███▇███████████████
 ▇██ ▇██ ███ ███ ███▁███▂███▄███▅███▇███████████████████████████
 ███████▇███████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
```

### Green noise

Band-pass filtered noise (interleaved blue noise, opposite of
[violet](#violet-noise)) -
[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/colored-noise/src/green.ts)

```text
green4

                         ▂▃▅▆▇▇█▇▇▇▆▅▄▃▂
                      ▃▅█████████████████▆▃
                    ▄███████████████████████▄          ▁▁
    ▂▅▇█████▅▁    ▂███████████████████████████▁    ▂▅▇████▇▅▂
  ▁▆██████████▅  ▂█████████████████████████████▂  ▅██████████▆▁
 ▂██████████████▅███████████████████████████████▆██████████████▂
▁███████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
green16

                               ▅▆▅
                              ████▇
                             ▅█████▆
                          ▄▃ ███████ ▃▄
                      ▄▁ ▆██████████▇██▆ ▁▄
          ▁   ▃  ▁▇▄ ▇██▄███████████████▄██▇ ▃█▁  ▄   ▁
 ▂▇▃ ▃█▄ ▅█▆ ▇██ ███▅███████████████████████▅███▁███ ▅█▅ ▄█▄ ▄▇▂
 ███▃███▄███▆███████████████████████████████████████▆███▄███▃███
▅███████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
green32

                                ▆
                               ███
                               ███
                             ▅▆███▆▄
                           ▅ ███████ ▄
                       ▂ ▇▂███████████▂▆ ▁
                 ▁ ▄ ▇▁█▆███████████████▆█▂▇ ▄ ▂
 ▄ ▃ ▄ ▄ ▅ ▆ ▇▁█▃█▅█▇███████████████████████▇█▄█▃█▁▇ ▆ ▅ ▄ ▃ ▃ ▃
 █▅█▅█▅█▆█▇███████████████████████████████████████████▇█▇█▅█▅█▄█
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
```

### Pink noise

Exponential decay power curve (1/f) -
[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/colored-noise/src/pink.ts)

```text
pink4
 ▅▄▂
▇████▇▅▃▂
████████████▇▆▄▃▁▁▁▁▂
████████████████████████▇▆▅▄▃▂▂     ▁
████████████████████████████████▇████████████▇▆▅▄▄▄▄▂▃▁▁
█████████████████████████████████████████████████████████▇▆▅▄▁
██████████████████████████████████████████████████████████████▇▃
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████

pink16
█
█
██
███▆▁▁
██████▇▅▁▂▁
████████████▇▆▆▄▂▂▂▂▁▁
███████████████████████▇▇▆▅▅▄▃▂      ▁
████████████████████████████████▄███████████▇▆▅▄▃▃▄▃▂▂▁
████████████████████████████████████████████████████████▆▇▆▅▂▁
██████████████████████████████████████████████████████████████▆▁
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████

pink32
▄
█
█
█▄
██▄▁
████▅▄▂
████████▆▇▆▄▂▁
████████████████▅▇▆▆▆▅▄▃▂▁▂
██████████████████████████████▆▅ ▄▄▅▃▅▄▄▂▃▄▃▂▂
████████████████████████████████████████████████▇▇▇▇▇▇▆▅▂▂▂
████████████████████████████████████████████████████████████▅▄▁
███████████████████████████████████████████████████████████████▅
```

### Red / brown noise

Low-pass filtered noise (opposite of [blue](#blue-noise)) -
[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/colored-noise/src/red.ts)

```text
red4

 █▇▇▇▆▇▆▅▅▅▄▃▃▂▁
█████████████████▇▆▅▃▁
███████████████████████▆▃
███████████████████████████▄          ▁▃▄▆▇█████████▇▆▅▃▁
█████████████████████████████▄     ▁▄▇████████████████████▆▃
██████████████████████████████▇▁  ▄██████████████████████████▄
████████████████████████████████▇██████████████████████████████▁
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████

red16

 ▇▅▃
█████▃
██████▃
███████▂  ▂▅▅▂
████████ ▅████▅    ▄▄▂
███████████████▅ ▂████▆   ▃▇█▆▁    ▃▃▂      ▁
████████████████▅██████▇ ▄█████▁ ▁▇███▆   ▄███▄   ▃▇█▇▂   ▂▆█▆▂
████████████████████████▇███████▂██████▆ ▆█████▅ ▄█████▃ ▃█████▃
████████████████████████████████████████████████▆███████▅███████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████

red32

 ▅
██▇
███▅
████ ▃▅
████▇██▆ ▁▃
████████▂██▇ ▂▇▁  ▁
████████████▄███ ▆█▅ ▃▆▂  ▄   ▁
████████████████████▄███▁███ ▇█▅ ▄█▄ ▃▇▂ ▁▆▁ ▁▅   ▄   ▄   ▃   ▃
████████████████████████████▇███▄███▃███▁███ ███ ███ ███ ▇██ ▇█▇
████████████████████████████████████████████████▇███▇███▇███▇███
████████████████████████████████████████████████████████████████
```

### Violet noise

Band-stop filtered noise (interleaved red noise, opposite of
[green](#green-noise)) -
[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/colored-noise/src/violet.ts)

```text
violet2

 ██▇▇█▆▇▆▆▅▅▃▃▃▂▁                               ▁▂▃▄▄▅▆▆▇▆▆▇▇█▇█
███████████████████▇▅▄▂                  ▁▂▄▅▇▇█████████████████
█████████████████████████▅▃           ▃▅████████████████████████
████████████████████████████▄       ▄███████████████████████████
██████████████████████████████▄   ▄█████████████████████████████
████████████████████████████████▆███████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████

violet4

▂▇▇▇▆▄▂▂                                                 ▂▂▄▆▇▇▇
█████████▆▃                                           ▃▆████████
████████████▄                            ▁          ▄███████████
██████████████▁    ▂▅▇████▇▅▂       ▂▄▇████▇▅▁    ▁▇████████████
███████████████▂  ▅██████████▆▁   ▂▇██████████▅  ▁██████████████
████████████████▅██████████████▃ ▃██████████████▅███████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████

violet16

 ▅                                                             ▅
███                                                           ██
███▆                                                         ▅██
████ ▃▅                                                   ▅▃ ███
███████▆ ▁▅                                           ▃▂ ▆██████
████████▃██▇ ▄▇▂  ▄   ▂                   ▁   ▄  ▂█▄ ▇██▃███████
████████████▅███▁██▇ ▆█▅ ▄█▄ ▂▇▃ ▃█▂ ▄█▃ ▅█▆ ▇██ ███▅███████████
████████████████████▆███▅███▄███▃███▃███▄███▆███████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████

violet32

██                                                             █
██                                                             █
██▄▄                                                         ▄▆█
████ ▃                                                     ▃ ███
██████▂▆ ▁                                             ▂ ▆▂█████
████████▅█▂▇ ▄ ▂                                 ▂ ▄ ▇▁█▅███████
████████████▇█▅█▂█▁▇ ▇ ▅ ▄ ▃ ▃ ▃ ▃ ▃ ▄ ▄ ▅ ▆ ▇▁█▃█▄█▇███████████
██████████████████████▇█▇█▆█▆█▅█▅█▅█▅█▆█▆███████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
```

### White noise

Uniform distribution (unfiltered output from source PRNG) -
[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/colored-noise/src/white.ts)

```text
white

▁█████████▇█████████▇█████▇▇▇█▇██▇▇█▇████████▇█▇███▇▇█▇█████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████
```

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcolored-noise%5D+in%3Atitle)

## Related packages

- [@thi.ng/dsp](https://github.com/thi-ng/umbrella/tree/develop/packages/dsp) - Composable signal generators, oscillators, filters, FFT, spectrum, windowing & related DSP utils
- [@thi.ng/lowdisc](https://github.com/thi-ng/umbrella/tree/develop/packages/lowdisc) - n-dimensional low-discrepancy sequence generators/iterators
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random) - Pseudo-random number generators w/ unified API, distributions, weighted choices, ID generation

## Installation

```bash
yarn add @thi.ng/colored-noise
```

ESM import:

```ts
import * as cnoise from "@thi.ng/colored-noise";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/colored-noise"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const cnoise = await import("@thi.ng/colored-noise");
```

Package sizes (brotli'd, pre-treeshake): ESM: 494 bytes

## Dependencies

- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)

## Usage examples

Two projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                             | Description                                                           | Live demo                                             | Source                                                                             |
|:-----------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/simd-plot.png" width="240"/>       | Fitting, transforming & plotting 10k data points per frame using SIMD | [Demo](https://demo.thi.ng/umbrella/simd-plot/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/simd-plot)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-float-fbo.jpg" width="240"/> | Drawing to floating point offscreen / multi-pass shader pipeline      | [Demo](https://demo.thi.ng/umbrella/webgl-float-fbo/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-float-fbo) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/colored-noise/)

TODO

See
[/tools](https://github.com/thi-ng/umbrella/blob/develop/packages/colored-noise/tools/)
for usage examples...

```ts
import { red } from "@thi.ng/colored-noise";
import { take } from "@thi.ng/transducers";

// default config
[...take(20, red())]
// [0.03108920908982049, 0.5411110045940151, 0.26064470417452945, ...]

// custom config
import { XsAdd } from "@thi.ng/random";

[...take(20, red({ bins: 16, scale: 1, rnd: new XsAdd(0xdecafbad) }))]
// [ -0.17761799097704192, -0.10240132532836904, -0.1103387340810939, ...]
```

### Use as IGen in @thi.ng/dsp

```ts
import { green } from "@thi.ng/colored-noise";
import { adsr, iterable, product } from "@thi.ng/dsp";
import { wavByteArray } from "@thi.ng/dsp-io-wav";
import { writeFileSync } "node:fs";

const FS = 44100;

const signal = product(
    // wrap green noise as IGen
    iterable(green({ bins: 16 }), 0),
    // apply gain envelope
    adsr({ a: 0.005 * FS, d: 0.2 * FS, s: 0 })
);

// output as 16bit mono WAV file
writeFileSync(
    "export/hihat.wav",
    wavByteArray(
        { bits: 16, channels: 1, length: 0.25 * FS, sampleRate: FS },
        signal
    )
);
```

![Result waveform with spectrum](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/colored-noise/hihat-green.png)

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-colored-noise,
  title = "@thi.ng/colored-noise",
  author = "Karsten Schmidt",
  note = "https://thi.ng/colored-noise",
  year = 2015
}
```

## License

&copy; 2015 - 2025 Karsten Schmidt // Apache License 2.0
