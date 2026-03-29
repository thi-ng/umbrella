<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/rdom-components](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-rdom-components.svg?23b341f1)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rdom-components.svg)](https://www.npmjs.com/package/@thi.ng/rdom-components)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rdom-components.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Collection of unstyled, customizable components for [@thi.ng/rdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rdom).

Currently, this package provides:

- [Accordion](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rdom-components/src/accordion.ts)
- [Dropdown](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rdom-components/src/dropdown.ts)
- [Editor](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rdom-components/src/editor.ts)
- [Icon button](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rdom-components/src/icon-button.rs)
- [Tabs](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rdom-components/src/tabs.ts)

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Brdom-components%5D)

## Related packages

- [@thi.ng/rdom-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rdom-canvas) - [@thi.ng/rdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rdom) component wrapper for [@thi.ng/hiccup-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup-canvas) and declarative canvas drawing

## Installation

```bash
yarn add @thi.ng/rdom-components
```

ESM import:

```ts
import * as rc from "@thi.ng/rdom-components";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/rdom-components"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

Package sizes (brotli'd, pre-treeshake): ESM: 1.43 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/hiccup-html](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup-html)
- [@thi.ng/object-utils](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/object-utils)
- [@thi.ng/rdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rdom)
- [@thi.ng/rstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream)
- [@thi.ng/strings](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/strings)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Six projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                         | Description                                                                              | Live demo                                                 | Source                                                                                         |
|:-----------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------|:----------------------------------------------------------|:-----------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/bitmap-font.gif" width="240"/>         | Figlet-style bitmap font creation with transducers                                       | [Demo](https://demo.thi.ng/umbrella/bitmap-font/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/bitmap-font)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/color-themes.png" width="240"/>        | Probabilistic color theme generator                                                      | [Demo](https://demo.thi.ng/umbrella/color-themes/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/color-themes)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/parse-playground.png" width="240"/>    | Parser grammar livecoding editor/playground & codegen                                    | [Demo](https://demo.thi.ng/umbrella/parse-playground/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/parse-playground)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/procedural-text.jpg" width="240"/>     | Procedural stochastic text generation via custom DSL, parse grammar & AST transformation | [Demo](https://demo.thi.ng/umbrella/procedural-text/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/procedural-text)     |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/trace-bitmap.jpg" width="240"/>        | Multi-layer vectorization & dithering of bitmap images                                   | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/trace-bitmap)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/webgl-channel-mixer.jpg" width="240"/> | rdom & WebGL-based image channel editor                                                  | [Demo](https://demo.thi.ng/umbrella/webgl-channel-mixer/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-channel-mixer) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/rdom-components/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-rdom-components,
  title = "@thi.ng/rdom-components",
  author = "Karsten Schmidt",
  note = "https://thi.ng/rdom-components",
  year = 2020
}
```

## License

&copy; 2020 - 2026 Karsten Schmidt // Apache License 2.0
