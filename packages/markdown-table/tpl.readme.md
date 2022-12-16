<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

See related packages below for alternative solutions / approaches...

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

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

<!-- include ../../assets/tpl/footer.md -->
