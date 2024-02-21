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

# ![@thi.ng/compose](https://media.thi.ng/umbrella/banners-20230807/thing-compose.svg?0e8a3fa1)

[![npm version](https://img.shields.io/npm/v/@thi.ng/compose.svg)](https://www.npmjs.com/package/@thi.ng/compose)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/compose.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
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

Optimized functional composition helpers.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcompose%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/compose
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/compose"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const compose = await import("@thi.ng/compose");
```

Package sizes (brotli'd, pre-treeshake): ESM: 858 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                | Description                                              | Live demo                                                | Source                                                                                |
|:--------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-subdiv.jpg" width="240"/>        | Animated, iterative polygon subdivisions & visualization | [Demo](https://demo.thi.ng/umbrella/poly-subdiv/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-subdiv)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-canvas-basics.jpg" width="240"/> | Minimal rdom-canvas animation                            | [Demo](https://demo.thi.ng/umbrella/rdom-canvas-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-canvas-basics) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/compose/)

- [comp()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/comp.ts)
- [compL()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/comp.ts#L52)
- [juxt()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/juxt.ts)
- [partial()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/partial.ts)
- [threadFirst()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/thread-first.ts)
- [threadLast()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/thread-last.ts)
- [trampoline()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/trampoline.ts)

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

&copy; 2016 - 2024 Karsten Schmidt // Apache License 2.0
