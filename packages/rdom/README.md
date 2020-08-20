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
component lifecycle and API are fairly stable by now (after ~70 commits
over several months), so far there's only sparing documentation and only
a handful of public examples. After some more user feedback, there's
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
- [@thi.ng/rdom-components](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-components) - Collection of unstyled, customizable components for [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom)

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

Package sizes (gzipped, pre-treeshake): ESM: 3.75 KB / CJS: 3.89 KB / UMD: 3.86 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
- [@thi.ng/prefixes](https://github.com/thi-ng/umbrella/tree/develop/packages/prefixes)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                               | Live demo                                              | Source                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/> | Parser grammar livecoding editor/playground & codegen     | [Demo](https://demo.thi.ng/umbrella/parse-playground/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground) |
|                                                                                                                         | Demonstates various rdom usage patterns                   | [Demo](https://demo.thi.ng/umbrella/rdom-basics/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-basics)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-dnd.png" width="240"/>         | rdom drag & drop example                                  | [Demo](https://demo.thi.ng/umbrella/rdom-dnd/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-dnd)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-lissajous.png" width="240"/>   | rdom & hiccup-canvas interop test                         | [Demo](https://demo.thi.ng/umbrella/rdom-lissajous/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-lissajous)   |
|                                                                                                                         | Full umbrella repo doc string search w/ paginated results | [Demo](https://demo.thi.ng/umbrella/rdom-search-docs/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-search-docs) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-svg-nodes.png" width="240"/>   | rdom powered SVG graph with draggable nodes               | [Demo](https://demo.thi.ng/umbrella/rdom-svg-nodes/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-svg-nodes)   |

## API

[Generated API docs](https://docs.thi.ng/umbrella/rdom/)

TODO

Currently, documentation only exists in the form of small examples and
various doc strings (incomplete). I'm working to alleviate this
situation ASAP... In that respect, PRs are welcome as well!

```ts
import { $compile } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { cycle, map } from "@thi.ng/transducers";

// reactive value
const bg = reactive("gray");

// color options (infinite iterable)
const colors = cycle(["magenta", "yellow", "cyan"]);

// event handler
const nextColor = () => bg.next(<string>colors.next().value);

// define component tree in hiccup syntax, compile & mount component.
// each time `bg` value changes, only subscribed bits will be updated
// i.e. title, the button's `style.background` and its label

// Note: instead of direct hiccup syntax, you could also use the
// element functions provided by https://thi.ng/hiccup-html
$compile([
    "div",
    {},
    // transformed color as title (aka derived view)
    ["h1", {}, bg.transform(map((col) => `Hello, ${col}!`))],
    [
        // tag with Emmet-style ID & classes
        "button#foo.w4.pa3.bn",
        {
            // reactive CSS background property
            style: { background: bg },
            onclick: nextColor,
        },
        // reactive button label
        bg,
    ],
]).mount(document.body);
```

## Authors

Karsten Schmidt

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
