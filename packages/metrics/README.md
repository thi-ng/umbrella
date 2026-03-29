<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/metrics](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-metrics.svg?97bb52ce)

[![npm version](https://img.shields.io/npm/v/@thi.ng/metrics.svg)](https://www.npmjs.com/package/@thi.ng/metrics)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/metrics.svg)
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
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Utilities for computing & aggregating value metrics (mean, median, min/max, sd), incl. support for circular domains.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bmetrics%5D)

## Installation

```bash
yarn add @thi.ng/metrics
```

ESM import:

```ts
import * as met from "@thi.ng/metrics";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/metrics"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const met = await import("@thi.ng/metrics");
```

Package sizes (brotli'd, pre-treeshake): ESM: 698 bytes

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/math](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/math)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/metrics/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-metrics,
  title = "@thi.ng/metrics",
  author = "Karsten Schmidt",
  note = "https://thi.ng/metrics",
  year = 2025
}
```

## License

&copy; 2025 - 2026 Karsten Schmidt // Apache License 2.0
