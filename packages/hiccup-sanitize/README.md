<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/hiccup-sanitize](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-hiccup-sanitize.svg?eb874c28)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-sanitize.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-sanitize)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-sanitize.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]

> This is one of 218 standalone projects. LLM-free, human-made and
> cared for software, maintained as part of the
> [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem and
> anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Helper package to remove user defined attributes and elements from a [@thi.ng/hiccup](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup) tree.

```ts tangle:exports/readme-1.ts

const cleaned = sanitize(
    [
        "div",
        { id: "foo", class: "a", onerror: "alert(1)" },
        ["span", {}, "b"],
        ["p", {}, "c", ["br", {}], "d"],
    ],
    {
        // remove ID and event attributes
        removeAttribs: ["id", /^on\w+/],
        // remove <span> & <br> elements
        removeElements: ["span", "br"],
    }
);

```

## Status

**BETA** - possibly breaking changes forthcoming

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bhiccup-sanitize%5D)

## Installation

```bash
yarn add @thi.ng/hiccup-sanitize
```

ESM import:

```ts
import * as hs from "@thi.ng/hiccup-sanitize";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/hiccup-sanitize"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const hs = await import("@thi.ng/hiccup-sanitize");
```

Package sizes (brotli'd, pre-treeshake): ESM: 384 bytes

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/zipper](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/zipper)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/hiccup-sanitize/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hiccup-sanitize,
  title = "@thi.ng/hiccup-sanitize",
  author = "Karsten Schmidt",
  note = "https://thi.ng/hiccup-sanitize",
  year = 2026
}
```

## License

&copy; 2026 Karsten Schmidt // Apache License 2.0
