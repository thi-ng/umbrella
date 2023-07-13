<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Similar to the [NetPBM format
support](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel-io-netpbm),
the Portable FloatMap image format is extremely simple, uncompressed and mainly
interesting for development purposes & interchange (e.g. for use with Intel's
[Open Image Denoise CLI tools](https://github.com/OpenImageDenoise/oidn)).

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

The package only provides 2 functions:

- [`asPFM(img: IntBuffer | FloatBuffer):
  Uint8Array`](https://docs.thi.ng/umbrella/pixel-io-pfm/functions/asPFM.html):
  Serializes an image to PFM and returns result as byte array
- [`readPFM(buf: Uint8Array):
  FloatBuffer`](https://docs.thi.ng/umbrella/pixel-io-pfm/functions/readPFM.html):
  Parses byte array as PFM image and returns it as
  [`FloatBuffer`](https://docs.thi.ng/umbrella/pixel/classes/FloatBuffer.html)

```ts tangle:export/readme.ts
import { intBuffer, RGB888 } from "@thi.ng/pixel";
import { asPFM }  from "@thi.ng/pixel-io-pfm";
import { writeFileSync } from "fs";

// create 2x2 image
const img = intBuffer(2, 2, RGB888);
// set pixel data (R,G,B,Y)
img.data.set([0xff0000, 0x00ff00, 0x0000ff, 0xffff00]);

// serialize image to PFM byte array and write to file
// (format conversion to FLOAT_RGB is done automatically & non-destructively)
writeFileSync("export/rgby.pfm", asPFM(img));
```

<!-- include ../../assets/tpl/footer.md -->
