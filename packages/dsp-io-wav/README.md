<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/dsp-io-wav](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-dsp-io-wav.svg?533e9b06)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dsp-io-wav.svg)](https://www.npmjs.com/package/@thi.ng/dsp-io-wav)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dsp-io-wav.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

WAV file format generation. This is a support package for [@thi.ng/dsp](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/dsp).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bdsp-io-wav%5D)

## Installation

```bash
yarn add @thi.ng/dsp-io-wav
```

ESM import:

```ts
import * as wav from "@thi.ng/dsp-io-wav";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/dsp-io-wav"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const wav = await import("@thi.ng/dsp-io-wav");
```

Package sizes (brotli'd, pre-treeshake): ESM: 488 bytes

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/binary](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/binary)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)
- [@thi.ng/transducers-binary](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers-binary)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory is using this package:

| Screenshot                                                                                                                  | Description                                                 | Live demo                                          | Source                                                                           |
|:----------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------|:---------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/render-audio.png" width="240"/> | Generative audio synth offline renderer and WAV file export | [Demo](https://demo.thi.ng/umbrella/render-audio/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/render-audio) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/dsp-io-wav/)

TODO

```ts
import { osc, sin } from "@thi.ng/dsp";
import { wavByteArray } from "@thi.ng/dsp-io-wav";

const FS = 48000;

// write 1 second 24bit mono WAV file of 440Hz sine
fs.writeFileSync(
  "sine-440.wav",
  wavByteArray(
    { sampleRate: FS, channels: 1, length: FS, bits: 24 },
    osc(sin, 440 / FS)
  )
);
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-dsp-io-wav,
  title = "@thi.ng/dsp-io-wav",
  author = "Karsten Schmidt",
  note = "https://thi.ng/dsp-io-wav",
  year = 2020
}
```

## License

&copy; 2020 - 2026 Karsten Schmidt // Apache License 2.0
