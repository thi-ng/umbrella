<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/expose](https://media.thi.ng/umbrella/banners-20230807/thing-expose.svg?b1e990a3)

[![npm version](https://img.shields.io/npm/v/@thi.ng/expose.svg)](https://www.npmjs.com/package/@thi.ng/expose)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/expose.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This is a standalone project, maintained as part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and
anti-framework.

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

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bexpose%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/expose
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/expose"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const expose = await import("@thi.ng/expose");
```

Package sizes (brotli'd, pre-treeshake): ESM: 205 bytes

## Dependencies

None

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                 | Description                                                            | Live demo                                                 | Source                                                                                 |
|:---------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-grid.jpg" width="240"/>        | Interactive grid generator, SVG generation & export, undo/redo support | [Demo](https://demo.thi.ng/umbrella/rstream-grid/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-grid)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-spreadsheet.png" width="240"/> | rstream based spreadsheet w/ S-expression formula DSL                  | [Demo](https://demo.thi.ng/umbrella/rstream-spreadsheet/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-spreadsheet) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/shader-graph.jpg" width="240"/>        | Minimal shader graph developed during livestream #2                    | [Demo](https://demo.thi.ng/umbrella/shader-graph/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/shader-graph)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/triple-query.png" width="240"/>        | Triple store query results & sortable table                            | [Demo](https://demo.thi.ng/umbrella/triple-query/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/triple-query)        |

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

&copy; 2016 - 2024 Karsten Schmidt // Apache License 2.0
