<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/proctext](https://media.thi.ng/umbrella/banners-20230807/thing-proctext.svg?de076745)

[![npm version](https://img.shields.io/npm/v/@thi.ng/proctext.svg)](https://www.npmjs.com/package/@thi.ng/proctext)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/proctext.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Extensible procedural text generation engine with dynamic, mutable state, indirection, randomizable & recursive variable expansions.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bproctext%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/proctext
```

ESM import:

```ts
import * as pro from "@thi.ng/proctext";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/proctext"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const pro = await import("@thi.ng/proctext");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.14 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/parse](https://github.com/thi-ng/umbrella/tree/develop/packages/parse)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                             | Description                                                                              | Live demo                                             | Source                                                                             |
|:-----------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/procedural-text.jpg" width="240"/> | Procedural stochastic text generation via custom DSL, parse grammar & AST transformation | [Demo](https://demo.thi.ng/umbrella/procedural-text/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/procedural-text) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/proctext/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-proctext,
  title = "@thi.ng/proctext",
  author = "Karsten Schmidt",
  note = "https://thi.ng/proctext",
  year = 2023
}
```

## License

&copy; 2023 - 2024 Karsten Schmidt // Apache License 2.0
