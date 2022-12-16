<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package provides a mock implementation of the
[`HDOMImplementation`](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom/src/api.ts)
interface for testing and prototyping purposes of potential basis of
custom target implementations.

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

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

<!-- include ../../assets/tpl/footer.md -->
