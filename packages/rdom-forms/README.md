<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
> [!IMPORTANT]
> ‼️ Announcing the thi.ng user survey 2024 📋
>
> [Please participate in the survey here!](https://forms.gle/XacbSDEmQMPZg8197)\
> (open until end of February)
>
> **To achieve a better sample size, I'd highly appreciate if you could
> circulate the link to this survey in your own networks.**
>
> [Discussion](https://github.com/thi-ng/umbrella/discussions/447)

# ![@thi.ng/rdom-forms](https://media.thi.ng/umbrella/banners-20230807/thing-rdom-forms.svg?f7dcbb55)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rdom-forms.svg)](https://www.npmjs.com/package/@thi.ng/rdom-forms)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rdom-forms.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

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

Data-driven declarative & extensible HTML form generation. This is a support package for [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom).

This package uses vanilla JS objects to define component specs for various types
of form elements (various factory functions are provided). These specs can then
be passed to the polymorphic & dynamically extensible
[`compileForm()`](https://docs.thi.ng/umbrella/rdom/functions/compileForm.html)
function to generate the actual form elements/components in hiccup format, which
can then be used with
[thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) or
for static (or SSR) HTML generation via
[thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup).

All generated form elements are unstyled by default, but can be fully customized (in various stages) via user-provided options.

Please see the example project linked further below, which demonstrates all currently provided elements...

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

Package sizes (brotli'd, pre-treeshake): ESM: 2.18 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/hiccup-html](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html)
- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                               | Description                                                                 | Live demo                                               | Source                                                                               |
|:-------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|:--------------------------------------------------------|:-------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/big-font.png" width="240"/>          | Large ASCII font text generator using @thi.ng/rdom                          | [Demo](https://demo.thi.ng/umbrella/big-font/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/big-font)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/blurhash.jpg" width="240"/>          | Interactive & reactive image blurhash generator                             | [Demo](https://demo.thi.ng/umbrella/blurhash/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/blurhash)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/>   | Color palette generation via dominant color extraction from uploaded images | [Demo](https://demo.thi.ng/umbrella/dominant-colors/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-colormatrix.jpg" width="240"/> | Matrix-based image color adjustments                                        | [Demo](https://demo.thi.ng/umbrella/pixel-colormatrix/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-colormatrix) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/>     | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel            | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-formgen.jpg" width="240"/>      | Basic usage of the declarative rdom-forms generator                         | [Demo](https://demo.thi.ng/umbrella/rdom-formgen/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-formgen)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-lissajous.png" width="240"/>    | rdom & hiccup-canvas interop test                                           | [Demo](https://demo.thi.ng/umbrella/rdom-lissajous/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-lissajous)    |

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

&copy; 2023 - 2024 Karsten Schmidt // Apache License 2.0
