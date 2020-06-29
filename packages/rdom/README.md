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

Pretty much **everything** here is still in a state of flux (without
warning!) and merely shared for those brave souls who'd like to be part
of the journey, even if just to provide early feedback and such... :)

### Support packages

- [@thi.ng/rdom-atom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-atom) - [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) component wrappers for [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom) state containers & derived views
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

Package sizes (gzipped, pre-treeshake): ESM: 3.34 KB / CJS: 3.47 KB / UMD: 3.47 KB

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

## Authors

Karsten Schmidt

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
