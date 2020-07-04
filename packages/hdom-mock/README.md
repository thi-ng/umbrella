<!-- This file is generated - DO NOT EDIT! -->

# ![hdom-mock](https://media.thi.ng/umbrella/banners/thing-hdom-mock.svg?b81d011a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hdom-mock.svg)](https://www.npmjs.com/package/@thi.ng/hdom-mock)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hdom-mock.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

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

### Status

**ALPHA** - bleeding edge / work-in-progress

## Installation

```bash
yarn add @thi.ng/hdom-mock
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/hdom-mock?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/hdom-mock/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 1.04 KB / CJS: 1.09 KB / UMD: 1.17 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)

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

Karsten Schmidt

## License

&copy; 2018 - 2020 Karsten Schmidt // Apache Software License 2.0
