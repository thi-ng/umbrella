<!-- This file is generated - DO NOT EDIT! -->

# ![markdown-table](https://media.thi.ng/umbrella/banners/thing-markdown-table.svg?ec39d3df)

[![npm version](https://img.shields.io/npm/v/@thi.ng/markdown-table.svg)](https://www.npmjs.com/package/@thi.ng/markdown-table)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/markdown-table.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

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

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bmarkdown-table%5D+in%3Atitle)

### Related packages

- [@thi.ng/hiccup-markdown](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-markdown) - Markdown parser & serializer from/to Hiccup format
- [@thi.ng/text-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/text-canvas) - Text based canvas, drawing, tables with arbitrary formatting (incl. ANSI/HTML)

## Installation

```bash
yarn add @thi.ng/markdown-table
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/markdown-table"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const markdownTable = await import("@thi.ng/markdown-table");
```

Package sizes (gzipped, pre-treeshake): ESM: 645 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

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

Karsten Schmidt

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

&copy; 2021 - 2022 Karsten Schmidt // Apache Software License 2.0
