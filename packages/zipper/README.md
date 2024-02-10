<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
> [!IMPORTANT]
> ‼️ Announcing the thi.ng user survey 2024 📋
>
> [Please participate in the survey here!](https://forms.gle/XacbSDEmQMPZg8197)\
> (open until end of February)
>
> **To achieve a better sample size, I'd highly appreciate if you could
> circulate the link to this survey in your own networks.**
>
> [Discussion](https://github.com/thi-ng/umbrella/discussions/447)

# ![@thi.ng/zipper](https://media.thi.ng/umbrella/banners-20230807/thing-zipper.svg?5836a2eb)

[![npm version](https://img.shields.io/npm/v/@thi.ng/zipper.svg)](https://www.npmjs.com/package/@thi.ng/zipper)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/zipper.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
  - [Blog posts](#blog-posts)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Benchmark](#benchmark)
- [Authors](#authors)
- [License](#license)

## About

Functional tree editing, manipulation & navigation.

Immutable, semi-functional, structural tree editing, manipulation &
navigation, based on my fork and optimizations to
[fast-zip](https://github.com/postspectacular/fast-zip), which in turn
is based on
[clojure.zip](https://clojure.github.io/clojure/clojure.zip-api.html)
and which itself is based on the original data structure invented by
Gérard Huet in 1997.

Reference: https://en.wikipedia.org/wiki/Zipper_(data_structure)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bzipper%5D+in%3Atitle)

## Related packages

- [@thi.ng/gp](https://github.com/thi-ng/umbrella/tree/develop/packages/gp) - Genetic programming helpers & strategies (tree based & multi-expression programming)

### Blog posts

- [Evolutionary failures (Part 1)](https://medium.com/@thi.ng/evolutionary-failures-part-1-54522c69be37)

## Installation

```bash
yarn add @thi.ng/zipper
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/zipper"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const zipper = await import("@thi.ng/zipper");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.02 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/zipper/)

```ts
import { arrayZipper } from "@thi.ng/zipper";

const x = [1, [5, 4, 3, 2], 6];

// create zipper for given array
const a = arrayZipper(x);

// .next navigates to logically next location (depth-first)
// .node retrieves a location's value
a.next.node
// 1

a.next.next.node
// [5, 4, 3, 2]

// all navigation verbs:
// prev, left, right, up, down, leftmost, rightmost
a.next.next.down.rightmost.node
// 2

// navigate to value `3`, remove it
// then append `7` at top level
// and apply changes by requesting root value
// (the latter is the actual zip operation)
a.next.next.down.rightmost.left.remove().up.up.appendChild(7).root
// [ 1, [ 5, 4, 2 ], 6, 7 ]

// the same edits in different order
a.appendChild(7).next.next.down.rightmost.left.remove().root
// [ 1, [ 5, 4, 2 ], 6, 7 ]

// insert child at the front
a.next.next.insertChild(10).root
// [ 1, [ 10, 5, 4, 3, 2 ], 6 ]

// replace the nested array
a.next.next.replace(10).root
// [1, 10, 6]

// all editing is immutable, original is untouched...
x
// [ 1, [ 5, 4, 3, 2 ], 6 ]
```

## Benchmark

For better comparison, the included benchmarks are also ported from the
[fast-zip](https://github.com/postspectacular/fast-zip) package and
measure traversal & editing of a tree of 10 x 10 x 10 values.

Measurements for MBP 2015 2.8GHz, 16GB, node v12.10.0:

```text
$ node bench/index.js

walk:
warmup... 2562ms
warmup... 2469ms
warmup... 2460ms
total: 2476ms, mean: 0.2476ms, runs: 10000

edit:
warmup... 4660ms
warmup... 4573ms
warmup... 4566ms
total: 4616ms, mean: 0.4616ms, runs: 10000
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-zipper,
  title = "@thi.ng/zipper",
  author = "Karsten Schmidt",
  note = "https://thi.ng/zipper",
  year = 2015
}
```

## License

&copy; 2015 - 2024 Karsten Schmidt // Apache License 2.0
