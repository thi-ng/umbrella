<!-- This file is generated - DO NOT EDIT! -->

# ![hiccup-carbon-icons](https://media.thi.ng/umbrella/banners/thing-hiccup-carbon-icons.svg?ff8f7718)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-carbon-icons.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-carbon-icons)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-carbon-icons.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Contact sheet](#contact-sheet)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Icon conversion process](#icon-conversion-process)
- [Authors](#authors)
- [License](#license)

## About

This package provides the full set of IBM's [Carbon
icons](https://github.com/IBM/carbon-icons) in hiccup format (i.e. as
Javascript encoded SVG), ready to be used with
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
/
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup).

Each icon is defined in its own source file and can be imported
individually. The converted icons DO NOT have a fixed size and will
expand to the available size (see example below).

## Contact sheet

All icons can be previewed here: [contact
sheet](https://demo.thi.ng/umbrella/hiccup-carbon-icons/). ([Source
code](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-carbon-icons/test/contact-sheet.ts))

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/hiccup-carbon-icons
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/hiccup-carbon-icons?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/hiccup-carbon-icons/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 16.41 KB / CJS: 16.93 KB / UMD: 16.15 KB

## Dependencies

- [tslib](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                           | Live demo                                              | Source                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/> | Parser grammar livecoding editor/playground & codegen | [Demo](https://demo.thi.ng/umbrella/parse-playground/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground) |
|                                                                                                                         | rdom drag & drop example                              | [Demo](https://demo.thi.ng/umbrella/rdom-dnd/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-dnd)         |

## API

[Generated API docs](https://docs.thi.ng/umbrella/hiccup-carbon-icons/)

```ts
import { renderOnce } from "@thi.ng/hdom";
import { CODE } from "@thi.ng/hiccup-carbon-icons";

// using tachyons css classes for brevity
const iconButton = (icon, onclick, label?) =>
    ["a", { onclick, href: "#" },
        ["span.dib.w1.h1.mr1", icon],
        label];

renderOnce(iconButton(CODE, () => alert("hi"), "show me the code"));
```

## Icon conversion process

The icon conversion is largely automated via the supplied bash script
(currently with some additional minor manual cleanup needed) and
requires `svgo` and a checkout of both the original carbon-icons repo
and the umbrella mono repo.

```bash
# install pre-requisites
yarn global add svgo

git clone https://github.com/IBM/carbon-icons.git
git clone https://github.com/thi-ng/umbrella.git

# build xml to hiccup converter CLI tool
cd umbrella/examples/xml-converter
yarn install
yarn build-cli

# switch to package root
cd ../../hiccup-carbon-icons
# convert icons and write results to package src folder
./convert-icons src ../../carbon-icons/src/svg/*.svg

# update contact sheet (will be written to package root)
yarn test

# open in browser
open contact-sheet.html

# rebuild package
yarn build
```

## Authors

Karsten Schmidt

## License

&copy; 2018 - 2020 Karsten Schmidt // Apache Software License 2.0
