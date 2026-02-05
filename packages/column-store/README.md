<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/column-store](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-column-store.svg?ee7af11f)

[![npm version](https://img.shields.io/npm/v/@thi.ng/column-store.svg)](https://www.npmjs.com/package/@thi.ng/column-store)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/column-store.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Extensible in-memory column store database with extensible query engine, optional bitmap indexing for query acceleration, optimized column types.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcolumn-store%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/column-store
```

ESM import:

```ts
import * as cs from "@thi.ng/column-store";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/column-store"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const cs = await import("@thi.ng/column-store");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.34 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/bidir-index](https://github.com/thi-ng/umbrella/tree/develop/packages/bidir-index)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/column-store/)

```ts tangle:export/readme-1.ts
import {
    Table,
    FLAG_BITMAP,
    FLAG_INDEXED,
    FLAG_UNIQUE,
} from "@thi.ng/column-store";

const table = new Table({
    // ID column stores 8bit ints (typed array)
    id: { type: "u8" },
    // Type column stores indexed strings
    type: { type: "str", flags: FLAG_INDEXED },
    // Tags column stores array of strings (max. 10) with set-semantics
    // and bitmap optimized for query acceleration
    tags: {
        type: "str",
        // min/max number of values per row (default is: [1,1])
        cardinality: [0, 10],
        // flag to define column behavior (flags explained above)
        flags: FLAG_INDEXED | FLAG_UNIQUE | FLAG_BITMAP,
        // default value(s) assigned if missing when row is added
        default: ["unsorted"],
    },
});

// add data/rows
table.addRows([
    { id: 100, type: "img", tags: ["a", "a", "c", "b"] },
    { id: 101, type: "video", tags: ["a", "d", "b"] },
    { id: 102, type: "img" },
    { id: 103, type: "video" },
    { id: 104, type: "img", tags: ["b", "c", "d"] },
]);

// pre-define a query, here to select images which have an `unsorted` tag...
// the fluent API shown is merely syntax sugar for creating/appending query terms.
// queries can have an arbitrary number of terms (which are executed in series)
const unsortedImages = table.query().where("type", "img").and("tags", "unsorted");

// queries are iterables and only execute when the iterator is consumed
console.log([...unsortedImages]);
// [ { id: 102, type: "img", tags: [ "unsorted" ] } ]

// select items with `a` OR `b` tags, intersect with those which have `c` AND `d` tags
const complexTagQuery = table.query().or("tags", ["a", "b"]).and("tags", ["c", "d"]);
console.log([...complexTagQuery]);
// [ { id: 104, type: "img", tags: [ "b", "c", "d" ] } ]

// query using custom predicates
console.log([...table.query().matchColumn("id", (id) => id > 102)]);
// [
//    { id: 103, type: "img", tags: [ "unsorted" ] },
//    { id: 104, type: "img", tags: [ "b", "c", "d" ] }
// ]

// serialize table to JSON
console.log(JSON.stringify(table, null, "\t"));
```

Serialized table (can be loaded again via `Table.load()`):

```json
{
    "schema": {
        "id": { "cardinality": [1, 1], "flags": 0, "default": 0, "type": "u8" },
        "type": { "cardinality": [1, 1], "flags": 1, "default": "", "type": "str" },
        "tags": { "cardinality": [0, 10], "flags": 7, "default": ["unsorted"], "type": "str" }
    },
    "columns": {
        "id": {
            "values": [100, 101, 102, 103, 104]
        },
        "type": {
            "dict": {
                "index": ["img", "video"],
                "next": 2
            },
            "values": [0, 1, 0, 1, 0]
        },
        "tags": {
            "dict": {
                "index": ["a", "c", "b", "d", "unsorted"],
                "next": 5
            },
            "values": [[0, 1, 2], [0, 3, 2], [4], [4], [2, 1, 3]]
        }
    },
    "length": 5
}

```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-column-store,
  title = "@thi.ng/column-store",
  author = "Karsten Schmidt",
  note = "https://thi.ng/column-store",
  year = 2025
}
```

## License

&copy; 2025 - 2026 Karsten Schmidt // Apache License 2.0
