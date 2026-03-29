<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/diff](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-diff.svg?e5b447c9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/diff.svg)](https://www.npmjs.com/package/@thi.ng/diff)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/diff.svg)
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

Customizable diff implementations for arrays (sequential) & objects (associative), with or without linear edit logs.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bdiff%5D)

## Installation

```bash
yarn add @thi.ng/diff
```

ESM import:

```ts
import * as diff from "@thi.ng/diff";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/diff"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const diff = await import("@thi.ng/diff");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.06 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/equiv](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/equiv)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/diff/)

```ts
import { diffArray } from "@thi.ng/diff";

// diff w/ default diff mode
diffArray([1, 2, 3], [1, 2, 4], "full");
// {
//     distance: 2,
//     adds: { 2: 4 },
//     dels: { 2: 3 },
//     const: { 0: 1, 1: 2 },
//     linear: [0, 0, 1,  0, 1, 2,  -1, 2, 3,  1, 2, 4]
// }
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-diff,
  title = "@thi.ng/diff",
  author = "Karsten Schmidt",
  note = "https://thi.ng/diff",
  year = 2016
}
```

## License

&copy; 2016 - 2026 Karsten Schmidt // Apache License 2.0
