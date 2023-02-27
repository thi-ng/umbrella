<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/emoji](https://media.thi.ng/umbrella/banners-20220914/thing-emoji.svg?a5c239a9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/emoji.svg)](https://www.npmjs.com/package/@thi.ng/emoji)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/emoji.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [References](#references)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Bi-directional lookup tables mapping emoji names & their characters.

There're lots of other emoji packages available, most of them with various
additional functionality & dependencies. In contrast, this package merely
provides simple bi-directional mappings between emoji names & their actual
characters. Nothing more, nothing less.

### References

The
[index](https://github.com/thi-ng/umbrella/blob/develop/packages/emoji/src/emoji.ts)
is based on the one used by
[node-emoji](https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json)
(which itself is sourced from the [js-emoji](https://github.com/iamcal/js-emoji)
package).

For reasons of uniformity, all hyphens (`-`) in names have been replaced with
underscores (`_`).

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bemoji%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/emoji
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/emoji"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const emoji = await import("@thi.ng/emoji");
```

Package sizes (brotli'd, pre-treeshake): ESM: 11.75 KB

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/emoji/)

```ts
import { EMOJI, NAMES } from "@thi.ng/emoji";

EMOJI["minibus"]
// "🚐"

NAMES["🚐"]
// "minibus"
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-emoji,
  title = "@thi.ng/emoji",
  author = "Karsten Schmidt",
  note = "https://thi.ng/emoji",
  year = 2023
}
```

## License

&copy; 2023 Karsten Schmidt // Apache License 2.0
