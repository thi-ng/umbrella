<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/block-fs](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-block-fs.svg?75cee12f)

[![npm version](https://img.shields.io/npm/v/@thi.ng/block-fs.svg)](https://www.npmjs.com/package/@thi.ng/block-fs)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/block-fs.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 205 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Storage providers](#storage-providers)
  - [Filesystem layer](#filesystem-layer)
    - [Block allocation table](#block-allocation-table)
    - [Root directory](#root-directory)
    - [Directory entries](#directory-entries)
    - [File blocks](#file-blocks)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Customizable block-based storage, adapters & file system layer.

### Storage providers

All block types and block storage is fully interface-based. Blocks can have any
power-of-two size (up to limits defined by the runtime/host). The following
storage providers are included:

- [MemoryBlockStorage](https://docs.thi.ng/umbrella/block-fs/classes/MemoryBlockStorage.html):
  TypedArray-based memory blocks
- [FileBlockStorage](https://docs.thi.ng/umbrella/block-fs/classes/FileBlockStorage.html):
  Host-filesystem based blocks (one block per file)

As the name indicates, block storage providers only support block-based
read/write/delete access to arbitrary binary data (all ops are async). For
file-based storage, blocks are created lazily/dynamically.

### Filesystem layer

The package also provides an hierarchical filesystem layer with pluggable
storage providers and other customizable aspects. The default implementation
supports:

- arbitrarily nested directories
- filenames of max. 31 bytes (UTF-8) per directory level
- max. 32 owner IDs
- file locking
- creation/modification timestamps (64 bit)
- efficient append writes

The API provides functions to:

- read files as binary, text, JSON
- write/append binary/text files
- delete files
- recursively iterate directories

#### Block allocation table

The filesystem stores a [bitfield](https://thi.ng/bitfield) of block allocations
in the first N blocks. The number of blocks used depends on configured block
size and the max. number of blocks in the storage backend.

#### Root directory

The root directory starts in block N, directly after the block allocation table.
Directories grow dynamically and form a linked list of blocks once more entries
are added than can be stored in a single block. Block linkage is stored in the
first few bytes of each block.

#### Directory entries

The filesystem supports fully customizable formats to define directory
entries/sizes. The default [`Entry`
implementation](https://docs.thi.ng/umbrella/block-fs/classes/Entry.html)
requires 64 bytes.

TODO diagram

#### File blocks

Files are stored as linked lists of blocks, with the first few bytes of each
block reserved for linkage and number of data bytes in the block. The number of
bytes effectively available for data depends on the configured block size and
the max. number of blocks in the storage backend.

TODO diagram

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bblock-fs%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/block-fs
```

ESM import:

```ts
import * as bf from "@thi.ng/block-fs";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/block-fs"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const bf = await import("@thi.ng/block-fs");
```

Package sizes (brotli'd, pre-treeshake): ESM: 4.11 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/bitfield](https://github.com/thi-ng/umbrella/tree/develop/packages/bitfield)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/block-fs/)

```ts tangle:export/readme.ts
import { BlockFS, MemoryBlockStorage } from "@thi.ng/block-fs";

// create in-memory storage (64KB)
const storage = new MemoryBlockStorage({ numBlocks: 0x100, blockSize: 0x100 });

// create & initialize filesystem for given storage
const fs = new BlockFS(storage);
await fs.init();

// write a new text file (utf-8)
console.log(
    await fs.writeFile("/hello/world.txt", "Hello, world!\n".repeat(20))
);
// { start: 3, end: 4, size: 280 }

// append to file (or auto-create it if missing)
console.log(
    await fs.appendFile("/hello/world.txt", "Goodbye, world!\n".repeat(20))
);
// { start: 3, end: 5, size: 600 }

// read file as text
console.log(await fs.readText("/hello/world.txt"));
// Hello, world!
// Hello, world!
// Hello, world!
// ...
// Goodbye, world!
// Goodbye, world!
// Goodbye, world!
// ...

// write binary file, missing intermediate directories will be auto-created
console.log(
    await fs.writeFile(
        "/deeply/nested/paths/are-ok",
        new Uint8Array([1, 2, 3, 4])
    )
);
// { start: 9, end: 9, size: 4 }

// read back...
console.log(await fs.readFile("/deeply/nested/paths/are-ok"));
// Uint8Array(4) [ 1, 2, 3, 4 ]

// iterate all files & directory entries in root dir
for await (let entry of fs.root.tree()) {
    console.log(entry.type, entry.path, entry.size, new Date(entry.ctime));
}

// /hello 0n 2025-04-01T20:18:55.916Z
// /hello/world.txt 600n 2025-04-01T20:18:55.916Z
// /deeply 0n 2025-04-01T20:18:55.919Z
// /deeply/nested 0n 2025-04-01T20:18:55.919Z
// /deeply/nested/paths 0n 2025-04-01T20:18:55.919Z
// /deeply/nested/paths/are-ok 4n 2025-04-01T20:18:55.919Z
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-block-fs,
  title = "@thi.ng/block-fs",
  author = "Karsten Schmidt",
  note = "https://thi.ng/block-fs",
  year = 2024
}
```

## License

&copy; 2024 - 2025 Karsten Schmidt // Apache License 2.0
