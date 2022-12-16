<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

<!-- include ../../assets/tpl/footer.md -->
