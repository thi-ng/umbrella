<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/compose](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-compose.svg?45e719bc)

[![npm version](https://img.shields.io/npm/v/@thi.ng/compose.svg)](https://www.npmjs.com/package/@thi.ng/compose)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/compose.svg)
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
- [Composition helpers](#composition-helpers)
  - [Async functions](#async-functions)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Optimized functional composition helpers.

## Composition helpers

- [comp()](https://docs.thi.ng/umbrella/compose/functions/comp.html)
- [compLeft()](https://docs.thi.ng/umbrella/compose/functions/compLeft.html)
- [complement()](https://docs.thi.ng/umbrella/compose/functions/complement.html)
- [constantly()](https://docs.thi.ng/umbrella/compose/functions/constantly.html)
- [juxt()](https://docs.thi.ng/umbrella/compose/functions/juxt.html)
- [partial()](https://docs.thi.ng/umbrella/compose/functions/partial.html)
- [threadFirst()](https://docs.thi.ng/umbrella/compose/functions/threadFirst.html)
- [threadLast()](https://docs.thi.ng/umbrella/compose/functions/threadLast.html)
- [trampoline()](https://docs.thi.ng/umbrella/compose/functions/trampoline.html)

### Async functions

- [compAsync()](https://docs.thi.ng/umbrella/compose/functions/compAsync.html)
- [delayed()](https://docs.thi.ng/umbrella/compose/functions/delayed.html)
- [juxtAsync()](https://docs.thi.ng/umbrella/compose/functions/juxtAsync.html)
- [promisify()](https://docs.thi.ng/umbrella/compose/functions/promisify.html)
- [threadFirstAsync()](https://docs.thi.ng/umbrella/compose/functions/threadFirstAsync.html)
- [threadLastAsync()](https://docs.thi.ng/umbrella/compose/functions/threadLastAsync.html)
- [trampolineAsync()](https://docs.thi.ng/umbrella/compose/functions/trampolineAsync.html)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bcompose%5D)

## Installation

```bash
yarn add @thi.ng/compose
```

ESM import:

```ts
import * as comp from "@thi.ng/compose";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/compose"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const comp = await import("@thi.ng/compose");
```

Package sizes (brotli'd, pre-treeshake): ESM: 813 bytes

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Two projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                        | Description                                              | Live demo                                                | Source                                                                                        |
|:----------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------|:---------------------------------------------------------|:----------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/poly-subdiv.jpg" width="240"/>        | Animated, iterative polygon subdivisions & visualization | [Demo](https://demo.thi.ng/umbrella/poly-subdiv/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/poly-subdiv)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/rdom-canvas-basics.jpg" width="240"/> | Minimal rdom-canvas animation                            | [Demo](https://demo.thi.ng/umbrella/rdom-canvas-basics/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rdom-canvas-basics) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/compose/)

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-compose,
  title = "@thi.ng/compose",
  author = "Karsten Schmidt",
  note = "https://thi.ng/compose",
  year = 2016
}
```

## License

&copy; 2016 - 2026 Karsten Schmidt // Apache License 2.0
