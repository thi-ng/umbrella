<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/adapt-dpi](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-adapt-dpi.svg?3c0ddd12)

[![npm version](https://img.shields.io/npm/v/@thi.ng/adapt-dpi.svg)](https://www.npmjs.com/package/@thi.ng/adapt-dpi)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/adapt-dpi.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!IMPORTANT]
> This package has been deprecated and merged into
> [@thi.ng/canvas](https://github.com/thi-ng/umbrella/blob/develop/packages/canvas/).

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

HDPI canvas adapter / styling utility.

Attempts to determine display pixel density via `window.devicePixelRatio`
(default 1.0) and resizes canvas accordingly. I.e. If DPR != 1.0, attaches
explicit `width` and `height` CSS properties to force canvas to given CSS pixel
size, and resizes canvas pixel buffer itself based on DPR (e.g. 2x size).

## Status

**DEPRECATED** - superseded by other package(s)

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Badapt-dpi%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/adapt-dpi
```

ESM import:

```ts
import * as ad from "@thi.ng/adapt-dpi";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/adapt-dpi"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

Package sizes (brotli'd, pre-treeshake): ESM: 135 bytes

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/adapt-dpi/)

```ts
import { adaptDPI, isHighDPI } from "@thi.ng/adapt-dpi";

const canvas = document.createElement("canvas");

adaptDPI(canvas, 640, 480);

if (isHighDPI()) {
    // ...
}
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-adapt-dpi,
  title = "@thi.ng/adapt-dpi",
  author = "Karsten Schmidt",
  note = "https://thi.ng/adapt-dpi",
  year = 2015
}
```

## License

&copy; 2015 - 2024 Karsten Schmidt // Apache License 2.0
