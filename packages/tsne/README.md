<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/tsne](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-tsne.svg?5059595e)

[![npm version](https://img.shields.io/npm/v/@thi.ng/tsne.svg)](https://www.npmjs.com/package/@thi.ng/tsne)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/tsne.svg)
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

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Btsne%5D)

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

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/math](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/math)
- [@thi.ng/random](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/random)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)
- [@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory is using this package:

| Screenshot                                                                                                                  | Description                             | Live demo                                         | Source                                                                          |
|:----------------------------------------------------------------------------------------------------------------------------|:----------------------------------------|:--------------------------------------------------|:--------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/tsne-colors.avif" width="240"/> | Animated t-SNE visualization of 4D data | [Demo](https://demo.thi.ng/umbrella/tsne-colors/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/tsne-colors) |

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

&copy; 2021 - 2026 Karsten Schmidt // Apache License 2.0
