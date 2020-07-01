<!-- This file is generated - DO NOT EDIT! -->

# ![rdom](https://media.thi.ng/umbrella/banners/thing-rdom.svg?dccc5a4b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rdom.svg)](https://www.npmjs.com/package/@thi.ng/rdom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rdom.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
    - [HIC SUNT DRACONES](#hic-sunt-dracones)
    - [@thi.ng/atom integration](#thing-atom-integration)
  - [Support packages](#support-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Lightweight, reactive, VDOM-less UI/DOM components with async lifecycle and [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) compatible.

### Status

**ALPHA** - bleeding edge / work-in-progress

#### HIC SUNT DRACONES

This is still a young project. Even though most of the overall approach,
component lifecycle and API are fairly stable by now (after 65+ commits
over several months), once there'll be more user feedback, there's
likely going to be further refactoring required here and there, none of
which is _expected_ to cause breaking changes in this core package and
will likely come in the form of additions or alternatives to existing
control structures (unless they would be entirely subsuming current
features/approaches)...

#### @thi.ng/atom integration

For the sake of deduplication of functionality and to keep the number of
dependencies to a minimum, direct
[@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom)
integration has been removed in favor of using relevant
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
constructs, which can be used as lightweight adapters, i.e.:

- [`fromAtom()`](https://github.com/thi-ng/umbrella/blob/develop/packages/rstream/src/from/atom.ts)
- [`fromView()`](https://github.com/thi-ng/umbrella/blob/develop/packages/rstream/src/from/view.ts)

### Support packages

- [@thi.ng/rdom-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-canvas) - [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) component wrapper for [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-canvas) and declarative canvas drawing

## Installation

```bash
yarn add @thi.ng/rdom
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/rdom?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/rdom/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 3.41 KB / CJS: 3.54 KB / UMD: 3.53 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Description                                               | Live demo                                              | Source                                                                              |
| --------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| rdom test sandbox / POC                                   | [Demo](https://demo.thi.ng/umbrella/rdom-basics/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-basics)      |
| rdom drag & drop example                                  | [Demo](https://demo.thi.ng/umbrella/rdom-dnd/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-dnd)         |
| rdom & hiccup-canvas interop test                         | [Demo](https://demo.thi.ng/umbrella/rdom-lissajous/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-lissajous)   |
| Full umbrella repo doc string search w/ paginated results | [Demo](https://demo.thi.ng/umbrella/rdom-search-docs/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-search-docs) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/rdom/)

TODO

Currently, documentation only exists in the form of small examples and
various doc strings (incomplete). I'm working to alleviate this
situation ASAP... PRs welcome as well!

```ts
import { $compile } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { cycle, map } from "@thi.ng/transducers";

// reactive value
const bg = reactive("gray");

// color options (infinite iteratable)
const colors = cycle(["magenta", "yellow", "cyan"]);

// event handler
const nextColor = () => bg.next(<string>colors.next().value);

// define component tree in hiccup syntax, compile & mount component
// each time `bg` value changes, only the subscribed bits will be updated
// i.e. title and the button's `style.background` and label
$compile([
    "div",
    {},
    // transformed color as title
    ["h1", {}, bg.transform(map((col) => `Hello, ${col}!`))],
    [
        "button#foo.w4.pa3.bn",
        {
            style: { background: bg },
            onclick: nextColor,
        },
        bg,
    ],
]).mount(document.body);
```

## Authors

Karsten Schmidt

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
