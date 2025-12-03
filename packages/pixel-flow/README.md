<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/pixel-flow](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-pixel-flow.svg?b1308a49)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pixel-flow.svg)](https://www.npmjs.com/package/@thi.ng/pixel-flow)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pixel-flow.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 211 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Alogrithm description](#alogrithm-description)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Naive, lightweight CPU-based dense optical flow implementation. This is a support package for [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel).

This package is a TypeScript port of an old 2008 Processing project,
implementing a homemade [Optical
Flow](https://en.wikipedia.org/wiki/Optical_flow) approach created for a
gestural user interface system for Nokia retail stores.

The algorithm is only single channel and not very scalable (in terms of image
resolutions), but provides good & stable results for its intended purposes, and
without requiring a massive 12MB dependency like OpenCV. YMMV... Using the
default config, a 320x240 frame takes ~10ms to process on a MBA M1 2021.

A short 40 second video demonstration (from 2008), first showing the low-res
flow field and averaged movement vector, then adding a 3D cube being rotated via
hand movments:

https://github.com/user-attachments/assets/7929dee1-b78e-4fd2-8756-129b5db14c58

### Alogrithm description

The algorithm requires a previous and current frame. The flow field is obtained
by sampling the current frame at a given step distance. For each of these
sample/grid positions a kernel window (of `2*windowSize+1` pixels) is being
swept/applied to compute the differences to the previous frame. To compute these
differences, the previous frame is offset multiple times in both X/Y directions
within the `[-displace, +displace)` interval. The kernel computes the summed
difference for each of these displaced window regions and selects the window
with the minimum or maximum change (depending on mode). The relative
(displacement) position of that selected window is then used as the flow vector
for that cell, which will then be linearly interpolated to apply temporal
smoothing of the field (configurable) and minimize jittering.

## Status

**BETA** - possibly breaking changes forthcoming

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpixel-flow%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/pixel-flow
```

ESM import:

```ts
import * as pf from "@thi.ng/pixel-flow";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/pixel-flow"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const pf = await import("@thi.ng/pixel-flow");
```

Package sizes (brotli'd, pre-treeshake): ESM: 851 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                           | Description                                      | Live demo                                          | Source                                                                          |
|:---------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------|:---------------------------------------------------|:--------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/optical-flow.avif" width="240"/> | Optical flow analysis of web cam or video inputs | [Demo](https://demo.thi.ng/umbrella/optical-flow/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/optical-flow) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/pixel-flow/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-pixel-flow,
  title = "@thi.ng/pixel-flow",
  author = "Karsten Schmidt",
  note = "https://thi.ng/pixel-flow",
  year = 2008
}
```

## License

&copy; 2008 - 2025 Karsten Schmidt // Apache License 2.0
