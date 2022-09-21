<!-- This file is generated - DO NOT EDIT! -->

# ![dsp-io-wav](https://media.thi.ng/umbrella/banners-20220914/thing-dsp-io-wav.svg?31c45f02)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dsp-io-wav.svg)](https://www.npmjs.com/package/@thi.ng/dsp-io-wav)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dsp-io-wav.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

WAV file format generation. This is a support package for [@thi.ng/dsp](https://github.com/thi-ng/umbrella/tree/develop/packages/dsp).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdsp-io-wav%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/dsp-io-wav
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/dsp-io-wav"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const dspIoWav = await import("@thi.ng/dsp-io-wav");
```

Package sizes (gzipped, pre-treeshake): ESM: 534 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary)

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

Karsten Schmidt

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

&copy; 2020 - 2022 Karsten Schmidt // Apache Software License 2.0
