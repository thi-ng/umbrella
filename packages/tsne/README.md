<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/tsne](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-tsne.svg?5059595e)

[![npm version](https://img.shields.io/npm/v/@thi.ng/tsne.svg)](https://www.npmjs.com/package/@thi.ng/tsne)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/tsne.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Highly configurable t-SNE implementation for arbitrary dimensions.

Current implementation (as of 07/2021) is based in principle on:

- https://github.com/karpathy/tsnejs

Most key functionality has been refactored/rewritten to use pre-existing
functionality provided by other thi.ng packages.

~~Furthermore, this implementation has been extended to use
https://thi.ng/geom-accel to optimize spatial lookups~~. (FIXME currently
disabled/removed again)

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btsne%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/tsne
```

ESM import:

```ts
import * as tsne from "@thi.ng/tsne";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/tsne"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const tsne = await import("@thi.ng/tsne");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.51 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                          | Description                             | Live demo                                         | Source                                                                         |
|:--------------------------------------------------------------------------------------------------------------------|:----------------------------------------|:--------------------------------------------------|:-------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/tsne-colors.avif" width="240"/> | Animated t-SNE visualization of 4D data | [Demo](https://demo.thi.ng/umbrella/tsne-colors/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/tsne-colors) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/tsne/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-tsne,
  title = "@thi.ng/tsne",
  author = "Karsten Schmidt",
  note = "https://thi.ng/tsne",
  year = 2021
}
```

## License

&copy; 2021 - 2025 Karsten Schmidt // Apache License 2.0
