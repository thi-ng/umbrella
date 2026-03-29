<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/markdown-table](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-markdown-table.svg?8f8e1f64)

[![npm version](https://img.shields.io/npm/v/@thi.ng/markdown-table.svg)](https://www.npmjs.com/package/@thi.ng/markdown-table)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/markdown-table.svg)
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
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Markdown table formatter/generator with support for column alignments.

See related packages below for alternative solutions / approaches...

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bmarkdown-table%5D)

## Related packages

- [@thi.ng/hiccup-markdown](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup-markdown) - Markdown parser & serializer from/to Hiccup format
- [@thi.ng/text-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/text-canvas) - Text based canvas, drawing, plotting, tables with arbitrary formatting (incl. ANSI/HTML)

## Installation

```bash
yarn add @thi.ng/markdown-table
```

ESM import:

```ts
import * as mt from "@thi.ng/markdown-table";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/markdown-table"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const mt = await import("@thi.ng/markdown-table");
```

Package sizes (brotli'd, pre-treeshake): ESM: 617 bytes

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/compose](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/compose)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/strings](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/strings)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/markdown-table/)

```ts
import { table, tableKeys } from "@thi.ng/markdown-table";

table(
  ["ID", "Actor", "Comment"],
  [
    [1, "Alice"],
    [201, "Bob", "(foe)"],
    [3003, "Charlie", null],
    [44, "Dora", "(recipient)"],
  ],
  { align: ["r", "c", "l"] }
);

// | **ID** | **Actor** | **Comment** |
// |-------:|:---------:|:------------|
// |      1 |   Alice   |             |
// |    201 |    Bob    | (foe)       |
// |   3003 |  Charlie  |             |
// |     44 |   Dora    | (recipient) |

// ...alternatively, this produces the same:

tableKeys(
    // column headers
    ["ID", "Actor", "Comment"],
    // lookup keys
    ["id", "name", "hint"],
    // rows as objects
    [
        { id: 1, name: "Alice" },
        { id: 201, name: "Bob", hint: "(foe)" },
        { id: 3003, name: "Charlie" },
        { id: 44, name: "Dora", hint: "(recipient)" },
    ],
    // table options
    { bold: true, align: ["r", "c", "l"] }
)
```

Result as Markdown:

| **ID** | **Actor** | **Comment** |
|-------:|:---------:|:------------|
|      1 |   Alice   |             |
|    201 |    Bob    | (foe)       |
|   3003 |  Charlie  |             |
|     44 |   Dora    | (recipient) |

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-markdown-table,
  title = "@thi.ng/markdown-table",
  author = "Karsten Schmidt",
  note = "https://thi.ng/markdown-table",
  year = 2021
}
```

## License

&copy; 2021 - 2026 Karsten Schmidt // Apache License 2.0
