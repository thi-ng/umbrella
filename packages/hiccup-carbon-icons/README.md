<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/hiccup-carbon-icons](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-hiccup-carbon-icons.svg?a35f8171)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-carbon-icons.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-carbon-icons)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-carbon-icons.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 211 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

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
icons](https://github.com/IBM/carbon-icons) in hiccup format (i.e. as Javascript
encoded SVG), counting in at ~1100 and ready to be used within any
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
supporting scenario.

Each icon is defined in its own source file and can be imported individually.
The converted icons are based on the 32x32 pixel versions, but have NO explicit
size set (only `viewBox` attrib). Use the `withSize()` helper to inject a size,
e.g. `withSize(DOWNLOAD, "12px")`.

## Contact sheet

All icons can be previewed here: [contact
sheet](https://demo.thi.ng/umbrella/hiccup-carbon-icons/). ([Source
code](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-carbon-icons/tools/contact-sheet.ts))

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhiccup-carbon-icons%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/hiccup-carbon-icons
```

ESM import:

```ts
import * as icons from "@thi.ng/hiccup-carbon-icons";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/hiccup-carbon-icons"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const icons = await import("@thi.ng/hiccup-carbon-icons");
```

Package sizes (brotli'd, pre-treeshake): ESM: 77.19 KB

## Dependencies

None

## Usage examples

Six projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                 | Description                                                                                 | Live demo                                                 | Source                                                                                 |
|:---------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png" width="240"/>              | Canvas based Immediate Mode GUI components                                                  | [Demo](https://demo.thi.ng/umbrella/imgui/)               | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)               |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/>    | Parser grammar livecoding editor/playground & codegen                                       | [Demo](https://demo.thi.ng/umbrella/parse-playground/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-dnd.png" width="240"/>            | rdom drag & drop example                                                                    | [Demo](https://demo.thi.ng/umbrella/rdom-dnd/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-dnd)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-web-components.png" width="240"/> | Defining & using basic Web Components (with shadow DOM) via @thi.ng/rdom & @thi.ng/meta-css | [Demo](https://demo.thi.ng/umbrella/rdom-web-components/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-web-components) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-system-bus.png" width="240"/>  | Declarative component-based system with central rstream-based pubsub event bus              | [Demo](https://demo.thi.ng/umbrella/rstream-system-bus/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-system-bus)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/thing-browser.avif" width="240"/>      | Tree-based UI to find & explore thi.ng projects via their associated keywords               | [Demo](https://demo.thi.ng/umbrella/thing-browser/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/thing-browser)       |

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

(For contributors only...)

The icon conversion is largely automated via the supplied bash script (currently
with some additional minor manual cleanup needed) and requires `svgo` and a
checkout of both the original carbon and the umbrella mono repos.

```bash
# install pre-requisites
yarn global add svgo

git clone https://github.com/thi-ng/umbrella.git

# build entire umbrella repo
cd umbrella
yarn build

# build xml to hiccup converter CLI tool
cd examples/xml-converter
yarn build-cli

# switch to package root
cd ../../hiccup-carbon-icons

# clone carbon repo into local temp dir
git clone https://github.com/carbon-design-system/carbon.git tmp

# convert original SVG icons and write results to package src folder
yarn build:convert src tmp/packages/icons/src/svg/32

# update contact sheet (will be written to package root)
yarn build:sheet

# open in browser
open contact-sheet.html

# fixup any conversion issues (rinse & repeat...)
# e.g. in the latest version (2020/08), several icons use paths w/ opacity=0 which need to be removed

# rebuild package
yarn build
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hiccup-carbon-icons,
  title = "@thi.ng/hiccup-carbon-icons",
  author = "Karsten Schmidt",
  note = "https://thi.ng/hiccup-carbon-icons",
  year = 2018
}
```

## License

The copyright of the original icons is with IBM. The icons were published under
the same license as this package.

&copy; 2018 - 2025 // Apache License 2.0
