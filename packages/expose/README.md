<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/expose](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-expose.svg?fd64a80b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/expose.svg)](https://www.npmjs.com/package/@thi.ng/expose)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/expose.svg)
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
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Conditional global variable exposition.

This package provides a single function
[`exposeGlobal()`](https://docs.thi.ng/umbrella/expose/functions/exposeGlobal.html)
to expose a variable in the global scope (e.g. for development/debugging
purposes). It's behavior is controled by the `UMBRELLA_GLOBALS` or
`VITE_UMBRELLA_GLOBALS` environment variables - if either is set (to a non-empty
string) the function will **always** be enabled. Otherwise (by default),
`exposeGlobal()` is **disabled for production builds**, i.e. if
`process.env.NODE_ENV === "production"`.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bexpose%5D)

## Installation

```bash
yarn add @thi.ng/expose
```

ESM import:

```ts
import * as exp from "@thi.ng/expose";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/expose"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const exp = await import("@thi.ng/expose");
```

Package sizes (brotli'd, pre-treeshake): ESM: 205 bytes

## Dependencies

None

## Usage examples

Four projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                 | Description                                                            | Live demo                                                 | Source                                                                                         |
|:---------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------|:----------------------------------------------------------|:-----------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/rstream-grid.jpg" width="240"/>        | Interactive grid generator, SVG generation & export, undo/redo support | [Demo](https://demo.thi.ng/umbrella/rstream-grid/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rstream-grid)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/rstream-spreadsheet.png" width="240"/> | rstream based spreadsheet w/ S-expression formula DSL                  | [Demo](https://demo.thi.ng/umbrella/rstream-spreadsheet/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rstream-spreadsheet) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/shader-graph.jpg" width="240"/>        | Minimal shader graph developed during livestream #2                    | [Demo](https://demo.thi.ng/umbrella/shader-graph/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/shader-graph)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/triple-query.png" width="240"/>        | Triple store query results & sortable table                            | [Demo](https://demo.thi.ng/umbrella/triple-query/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/triple-query)        |

## API

[Generated API docs](https://docs.thi.ng/umbrella/expose/)

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-expose,
  title = "@thi.ng/expose",
  author = "Karsten Schmidt",
  note = "https://thi.ng/expose",
  year = 2016
}
```

## License

&copy; 2016 - 2026 Karsten Schmidt // Apache License 2.0
