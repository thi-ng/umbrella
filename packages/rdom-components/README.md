<!-- This file is generated - DO NOT EDIT! -->

# ![rdom-components](https://media.thi.ng/umbrella/banners/thing-rdom-components.svg?e4257e0d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rdom-components.svg)](https://www.npmjs.com/package/@thi.ng/rdom-components)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rdom-components.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Collection of unstyled, customizable components for [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom).

Currently, this package provides:

- [Accordion](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-components/src/accordion.ts)
- [Dropdown](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-components/src/dropdown.ts)
- [Editor](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-components/src/editor.ts)
- [Icon button](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-components/src/icon-button.rs)
- [Tabs](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-components/src/tabs.ts)

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brdom-components%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/rdom-components
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/rdom-components?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/rdom-components/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 929 bytes / CJS: 1007 bytes / UMD: 1.09 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/hiccup-html](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html)
- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                           | Live demo                                              | Source                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/color-themes.png" width="240"/>     | Probabilistic color theme generator                   | [Demo](https://demo.thi.ng/umbrella/color-themes/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/color-themes)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/> | Parser grammar livecoding editor/playground & codegen | [Demo](https://demo.thi.ng/umbrella/parse-playground/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/rdom-components/)

TODO

## Authors

Karsten Schmidt

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

&copy; 2020 - 2021 Karsten Schmidt // Apache Software License 2.0
