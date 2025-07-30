<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/emoji](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-emoji.svg?2371a385)

[![npm version](https://img.shields.io/npm/v/@thi.ng/emoji.svg)](https://www.npmjs.com/package/@thi.ng/emoji)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/emoji.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

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
characters.

The function [`replaceNames()`]() can be used to replace all _known_
`:emoji_name:` occurrences in a given string with their corresponding emoji
character...

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

ESM import:

```ts
import * as emoji from "@thi.ng/emoji";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/emoji"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const emoji = await import("@thi.ng/emoji");
```

Package sizes (brotli'd, pre-treeshake): ESM: 11.84 KB

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/emoji/)

```ts tangle:export/readme.ts
import { EMOJI, NAMES, replaceNames } from "@thi.ng/emoji";

console.log(EMOJI["minibus"]);
// "🚐"

console.log(NAMES["🚐"]);
// "minibus"

console.log(replaceNames("Amazing :grin::heart_eyes::invalid:!"));
// "Amazing 😁😍:invalid:!"
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

&copy; 2023 - 2025 Karsten Schmidt // Apache License 2.0
