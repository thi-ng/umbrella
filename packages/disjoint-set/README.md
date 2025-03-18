<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/disjoint-set](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-disjoint-set.svg?58be4092)

[![npm version](https://img.shields.io/npm/v/@thi.ng/disjoint-set.svg)](https://www.npmjs.com/package/@thi.ng/disjoint-set)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/disjoint-set.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 204 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
  - [Blog posts](#blog-posts)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

TypedArray-based disjoint set implementation with quick union & path compression.

This package contains functionality which was previously part of and has been
extracted from the [@thi.ng/adjacency](https://thi.ng/adjacency) package.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdisjoint-set%5D+in%3Atitle)

## Related packages

- [@thi.ng/adjacency](https://github.com/thi-ng/umbrella/tree/develop/packages/adjacency) - Sparse & bitwise adjacency matrices, lists and selected traversal algorithms for directed & undirected graphs

### Blog posts

- [Of umbrellas, transducers, reactive streams & mushrooms (Pt. 4)](https://github.com/thi-ng/blog/blob/main/2019/20190314-of-umbrellas-transducers-reactive-streams-pt4.md)

## Installation

```bash
yarn add @thi.ng/disjoint-set
```

ESM import:

```ts
import * as ds from "@thi.ng/disjoint-set";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/disjoint-set"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const ds = await import("@thi.ng/disjoint-set");
```

Package sizes (brotli'd, pre-treeshake): ESM: 420 bytes

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/disjoint-set/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-disjoint-set,
  title = "@thi.ng/disjoint-set",
  author = "Karsten Schmidt",
  note = "https://thi.ng/disjoint-set",
  year = 2019
}
```

## License

&copy; 2019 - 2025 Karsten Schmidt // Apache License 2.0
