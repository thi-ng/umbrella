<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/hdom-mock](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-hdom-mock.svg?0da86a85)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hdom-mock.svg)](https://www.npmjs.com/package/@thi.ng/hdom-mock)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hdom-mock.svg)
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
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Mock base implementation for [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) API.

This package provides a mock implementation of the
[`HDOMImplementation`](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom/src/api.ts)
interface for testing and prototyping purposes of potential basis of
custom target implementations.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhdom-mock%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/hdom-mock
```

ESM import:

```ts
import * as hm from "@thi.ng/hdom-mock";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/hdom-mock"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const hm = await import("@thi.ng/hdom-mock");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.07 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/hdom-mock/)

```ts
import { HDOMNode, MockHDOM } from "@thi.ng/hdom-mock";

const title = (ctx, body) => ["h1", ctx.ui.title, body];

const ctx = { ui: { title: { class: "f1 lh-headline" } } };
const opts = { ctx };

// target implementation
const impl = new MockHDOM(new HDOMNode("root", { id: "app" }));

// some trees
const tree1 = impl.normalizeTree(opts, ["div#foo.bar", [title, "hello world"]]);
const tree2 = impl.normalizeTree(opts, ["div", [title, "hi hdom"], ["p.red", "Lorem ipsum"]]);

// render hdom tree w/ mock implementation
impl.createTree(opts, impl.root, tree1));

// convert result DOM back to hiccup (for better clarity)
impl.root.toHiccup();
// [ 'root',
//   { id: 'app' },
//   [ 'div',
//     { id: 'foo', class: 'bar', key: '0' },
//     [ 'h1',
//       { class: 'f1 lh-headline', key: '0-0' },
//       [ 'span', { key: '0-0-0' }, 'hello world' ] ] ] ]

// apply diff from tree1 -> tree2
impl.diffTree(opts, impl.root, tree1, tree2);

impl.root.children[0].toHiccup();
// [ 'root',
//   { id: 'app' },
//   [ 'div',
//     { key: '0' },
//     [ 'h1',
//       { class: 'f1 lh-headline', key: '0-0' },
//       [ 'span', { key: '0-0-0' }, 'hi hdom' ] ],
//     [ 'p',
//       { class: 'red', key: '0-1' },
//       [ 'span', { key: '0-1-0' }, 'Lorem ipsum' ] ] ] ]
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hdom-mock,
  title = "@thi.ng/hdom-mock",
  author = "Karsten Schmidt",
  note = "https://thi.ng/hdom-mock",
  year = 2018
}
```

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache License 2.0
