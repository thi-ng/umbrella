<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/bidir-index](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-bidir-index.svg?8640f413)

[![npm version](https://img.shields.io/npm/v/@thi.ng/bidir-index.svg)](https://www.npmjs.com/package/@thi.ng/bidir-index)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/bidir-index.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 206 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Basic usage example](#basic-usage-example)
- [Authors](#authors)
- [License](#license)

## About

Bi-directional index mapping arbitrary keys to numeric IDs & vice versa.

This package contains functionality which was previously part of and has been
extracted from the [@thi.ng/associative](https://thi.ng/associative) package.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bbidir-index%5D+in%3Atitle)

## Related packages

- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative) - ES Map/Set-compatible implementations with customizable equality semantics & supporting operations

## Installation

```bash
yarn add @thi.ng/bidir-index
```

ESM import:

```ts
import * as bi from "@thi.ng/bidir-index";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/bidir-index"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const bi = await import("@thi.ng/bidir-index");
```

Package sizes (brotli'd, pre-treeshake): ESM: 785 bytes

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/bidir-index/)

TODO

## Basic usage example

```ts tangle:export/readme.ts
import { defBidirIndex, encodeObject, decodeObject } from "@thi.ng/bidir-index";

const index = defBidirIndex<string>();

// given object keys are auto-indexed, array initialized with given default
console.log(
  encodeObject(index, { r: 1, g: 2, b: 3, a: 4 }, 0)
);
// [1, 2, 3, 4]

// use custom default and without updating index
console.log(
  encodeObject(index, { b: 3, r: 1, g: 2 }, -1, false)
);
// [1, 2, 3, -1] (missing key `a` mapped to given default value)

// decode with defaults/fallback
console.log(
  decodeObject(index, [255, 128, 64], { a: 1 })
);
// { r: 255, g: 128, b: 64, a: 1 }

// add more keys to index (already known ones will be skipped)
// returns array of mapped IDs for given keys
index.addAll(["r", "g", "b", "a", "foo"]);
// [0, 1, 2, 3, 4]

// decoding will skip nullish values
console.log(
  decodeObject(index, [null, null, null, null, "bar"])
);
// { foo: "bar" }
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-bidir-index,
  title = "@thi.ng/bidir-index",
  author = "Karsten Schmidt",
  note = "https://thi.ng/bidir-index",
  year = 2022
}
```

## License

&copy; 2022 - 2025 Karsten Schmidt // Apache License 2.0
