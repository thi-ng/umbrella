<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Currently only supports the widely supported iTerm format as
output format. Sixel support considered. Accepts images in various file formats
(e.g. JPG, PNG etc.) or [thi.ng/pixel](https://thi.ng/pixel) pixel buffers.

Reference:

- https://iterm2.com/documentation-images.html
- https://github.com/BourgeoisBear/rasterm
- https://en.wikipedia.org/wiki/Sixel

(iTerm image strings are supported by at least: iterm2, mintty, mlterm, rio,
rlogin, wezterm...)

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

```ts tangle:export/readme.ts
import { iTermImageStringFromBinary } from "@thi.ng/text-format-image";
import { readFileSync } from "node:fs";

// read JPG as binary blob
const src = readFileSync("assets/examples/zig-cellular.jpg");

// convert to image string to show image at 200px width
// (example will only work in terminals supporting the iTerm image format)
console.log(iTermImageStringFromBinary(src, { width: "400px" }));
```

<!-- include ../../assets/tpl/footer.md -->
