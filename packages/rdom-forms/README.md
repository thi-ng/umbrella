<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/rdom-forms](https://media.thi.ng/umbrella/banners-20230807/thing-rdom-forms.svg?f7dcbb55)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rdom-forms.svg)](https://www.npmjs.com/package/@thi.ng/rdom-forms)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rdom-forms.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

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

Data-driven declarative HTML form generation. This is a support package for [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom).

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brdom-forms%5D+in%3Atitle)

## Related packages

- [@thi.ng/rdom-components](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom-components) - Collection of unstyled, customizable components for [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom)

## Installation

```bash
yarn add @thi.ng/rdom-forms
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/rdom-forms"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const rdomForms = await import("@thi.ng/rdom-forms");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.03 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/hiccup-html](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html)
- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                          | Description                                         | Live demo                                          | Source                                                                          |
|:--------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------|:---------------------------------------------------|:--------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-formgen.jpg" width="240"/> | Basic usage of the declarative rdom-forms generator | [Demo](https://demo.thi.ng/umbrella/rdom-formgen/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-formgen) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/rdom-forms/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-rdom-forms,
  title = "@thi.ng/rdom-forms",
  author = "Karsten Schmidt",
  note = "https://thi.ng/rdom-forms",
  year = 2023
}
```

## License

&copy; 2023 Karsten Schmidt // Apache License 2.0
