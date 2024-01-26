<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

- https://blurha.sh/
- https://github.com/woltapp/blurhash
- https://github.com/woltapp/blurhash/blob/master/Algorithm.md

This implementation is principally based on the official TypeScript version of
the above repo, but in addition to API extensions, the algorithm has been
refactored & optimized in several fundamental ways, including:

- massive caching & reduction of repeated cosine calculations in both
  encoder/decoder
- reduction of internal allocations
- approximation of gamma conversion hotspot (the slightly lower precision is
  negligible for this use case)
- reading & writing of 32bit pixel data (i.e. using `Uint32Array` vs.
  `Uint8ClampedArray`)

On Firefox 122 (MBP M1 2021), these changes result in ~1.6x faster encoding and
~2.3x faster decoding performance...

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

```ts
import { encodeFromImage, decodeToCanvas } from "@thi.ng/blurhash";
import { imagePromise } from "@thi.ng/pixel";

// obtain image data in 32bit ABGR format
// (little endian byte order, same as canvas image data)
const pixels = new Uint32Array(...);

// compute hash
// default detail = 4 (must be in [1,9] range)
const hash = encode(pixels, imgW, imgH, 4, 4);
// "ChD9#TE7NFt6k]WCnhbc"

// in browser env you can encode directly from an
// HTML image or canvas element, see API docs for options
import { imagePromise } from "@thi.ng/pixel";
const hash = encodeFromImage(await imagePromise("test.jpg"));

const hash = encodeFromCanvas(canvas, 4, 4);

// decode to a raw 32bit ABGR pixel array (with optional contrast param)
const pixels = decode(hash, 32, 32, 1);

// decode hash to a new canvas element (optionally attach it to DOM)
const canvas = decodeToCanvas(hash, 32, 32, 1, document.body);

// use CSS to stretch
canvas.style.width = "320px";
canvas.style.height = "240px";
```

<!-- include ../../assets/tpl/footer.md -->
