<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/block-fs](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-block-fs.svg?75cee12f)

[![npm version](https://img.shields.io/npm/v/@thi.ng/block-fs.svg)](https://www.npmjs.com/package/@thi.ng/block-fs)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/block-fs.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 212 standalone projects, maintained as part
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
  - [Command line app](#command-line-app)
    - [Convert file tree into single BlockFS blob](#convert-file-tree-into-single-blockfs-blob)
    - [List file tree of a BlockFS blob](#list-file-tree-of-a-blockfs-blob)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Basic usage](#basic-usage)
  - [Working with a converted file system blob](#working-with-a-converted-file-system-blob)
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

> [IMPORTANT]
> For browser-compatibility reasons, the `FileBlockStorage` is NOT exposed when
> using package-level imports. Use the following import to use this class:
>
> `import { FileBlockStorage } from "@thi.ng/block-fs/storage/file";

As the name indicates, block storage providers only support block-based
read/write/delete access to arbitrary binary data (all ops are async). For
file-based storage, blocks are created lazily/dynamically.

### Filesystem layer

The package also provides an hierarchical filesystem layer with pluggable
storage providers and other customizable aspects. The default implementation
supports:

- 8 - 32bit block IDs
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

Blocks can be reserved for custom purposes by calling
[`.allocateBlocks()`](https://docs.thi.ng/umbrella/block-fs/classes/BlockFS.html#allocateblocks).

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

![Memory layout diagram for a single directory entry](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/block-fs/direntry-01.png)

#### File blocks

Files are stored as linked lists of blocks, with the first few bytes of each
block reserved for linkage and number of data bytes in the block.

![Memory layout diagram for a single file block](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/block-fs/block-layout-01.png)

The number of bytes effectively available for data depends on the configured
block size and the max. number of blocks in the storage backend. For example, a
max. block count of 65536 and a block size of 256 bytes only requires a two
bytes for linkage and a third byte for storing the number of data bytes used in
the block. Hence, in this configuration 253 bytes per block are available for
data.

The following diagram shows a block which links to block ID 0x1234 and uses the
full 253 (0xfd in hex) bytes of data available:

![Memory layout diagram for a single file block](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/block-fs/block-layout-02.png)

The last block of a file uses a special sentinel marker to indicate that no
other blocks follow. This sentinel value again depends on the configured max.
block count, and in this example is 0xffff. This example block only stores 64
(0x40 in hex) bytes of data, with the remainder zeroed out.

![Memory layout diagram for a sentinel file block](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/block-fs/block-layout-03.png)

### Command line app

The package includes a mult-command CLI app with the following operations:

#### Convert file tree into single BlockFS blob

The `convert` command is used to bundle an entire file tree from the host system
into a single binary blob based on `BlockFS` with configured block size. The
file tree MUST fit into the RAM available to `bun` (or `node`).

Once bundled, the binary blob can then be used together with
[`MemoryBlockStorage`](https://docs.thi.ng/umbrella/block-fs/classes/MemoryBlockStorage.html)
and [`BlockFS`](https://docs.thi.ng/umbrella/block-fs/classes/BlockFS.html) for
other purposes (e.g. distributed with your web app to provide a virtual
filesystem). Also see [API example further
below](#working-with-a-converted-file-system-blob).

Example usage to bundle the source directory of this package:

```bash
npx @thi.ng/block-fs convert -o dummy.dat packages/block-fs/src/

# [INFO] blockfs: number of files: 11
# [INFO] blockfs: number of directories: 2
# [INFO] blockfs: total file size: 40341
# [INFO] blockfs: number of blocks: 56
# [INFO] blockfs: writing file: dummy.dat
```

General usage:

```text
npx @thi.ng/block-fs convert --help

 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ @thi.ng/block-fs 0.4.0
 █ █ █ █ █ █ █ █ █ │ Block-based storage & file system layer
                 █ │
               █ █ │

Usage: blockfs <cmd> [opts] input [...]
       blockfs <cmd> --help

Available commands:

convert         : Convert file tree into single BlockFS blob
list            : List file tree of a BlockFS blob

Flags:

-q, --quiet                     Disable logging
-v, --verbose                   Display extra logging information

Main:

-bs BYTES, --block-size BYTES   Block size (default: 1024)
-i EXT, --exclude EXT           [multiple] File exclusion regexp
-i EXT, --include EXT           [multiple] File inclusion regexp
-n INT, --num-blocks INT        Number of blocks (multiple of 8)
-o STR, --out STR               [required] Output file path
```

#### List file tree of a BlockFS blob

The `list` command is used to list the files & directories stored in a binary blob created via the `convert` command. Several output options (e.g. `tree`-like output) are supported.

```bash
npx @thi.ng/block-fs list dummy.dat
# /api.ts
# /cli.ts
# /directory.ts
# /entry.ts
# /fs.ts
# /index.ts
# /lock.ts
# /storage
# /storage/astorage.ts
# /storage/file.ts
# /storage/memory.ts
# /utils.ts

npx @thi.ng/block-fs list --tree dummy.dat
# ├── api.ts
# ├── cli.ts
# ├── directory.ts
# ├── entry.ts
# ├── fs.ts
# ├── index.ts
# ├── lock.ts
# ├── storage
# │   ├── astorage.ts
# │   ├── file.ts
# │   └── memory.ts
# └── utils.ts

# display file sizes & modification times
npx @thi.ng/block-fs list --tree --all dummy.dat
# ├── api.ts           2204   2025-04-02T10:22:55.573Z
# ├── cli.ts           6799   2025-04-02T18:07:58.895Z
# ├── directory.ts     3994   2025-04-02T13:47:00.108Z
# ├── entry.ts         4130   2025-04-02T10:22:55.574Z
# ├── fs.ts            16377  2025-04-02T13:46:36.608Z
# ├── index.ts         317    2025-04-01T21:38:08.232Z
# ├── lock.ts          1501   2025-04-01T21:38:08.232Z
# ├── storage                 2025-04-02T18:33:47.389Z
# │   ├── astorage.ts  1205   2025-04-02T10:22:55.574Z
# │   ├── file.ts      1780   2025-04-02T14:25:12.461Z
# │   └── memory.ts    1802   2025-04-02T14:26:02.163Z
# └── utils.ts         418    2025-04-02T10:22:55.574Z
```

General usage:

```text
npx @thi.ng/block-fs list --help

Usage: blockfs <cmd> [opts] input

Flags:

-a, --all                       Display all attribs
-t, --tree                      List files as tree
-v, --verbose                   Display extra process information
-m, --with-mtime                Display modified times
-s, --with-size                 Display file sizes

Main:

-bs BYTES, --block-size BYTES   Block size (default: 1024)
```

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

Package sizes (brotli'd, pre-treeshake): ESM: 4.33 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/args](https://github.com/thi-ng/umbrella/tree/develop/packages/args)
- [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary)
- [@thi.ng/bitfield](https://github.com/thi-ng/umbrella/tree/develop/packages/bitfield)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/mime](https://github.com/thi-ng/umbrella/tree/develop/packages/mime)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/block-fs/)

### Basic usage

```ts tangle:export/readme-1.ts
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
    // entry.path is absolute path
    // entry.size is always a bigint
    // entry.ctime/mtime is UNIX epoch
    console.log(entry.path, entry.size, new Date(entry.ctime));
}

// /hello 0n 2025-04-01T20:18:55.916Z
// /hello/world.txt 600n 2025-04-01T20:18:55.916Z
// /deeply 0n 2025-04-01T20:18:55.919Z
// /deeply/nested 0n 2025-04-01T20:18:55.919Z
// /deeply/nested/paths 0n 2025-04-01T20:18:55.919Z
// /deeply/nested/paths/are-ok 4n 2025-04-01T20:18:55.919Z
```

### Working with a converted file system blob

This example shows how to use a binary blob created via the [CLI `blockfs
convert` command](#convert-file-tree-into-single-blockfs-blob) as a virtual file
system...

```ts
import { BlockFS, MemoryBlockStorage } from "@thi.ng/block-fs";

// load binary blob
const response = await fetch("./blocks.dat");
const buffer = await response.arrayBuffer();

// wrap as block storage
const storage = new MemoryBlockStorage({
    buffer,
    blockSize: 1024,
    numBlocks: buffer.byteLength / 1024
});

// wrap as file system
const fs = new BlockFS(storage);

// list all entries (recursive)
for await(let f of fs.root.tree()) {
    console.log(f.path);
}

// list all entries in a directory
const dir = (await fs.entryForPath("/path/to/dir")).directory;
for await (let f of dir) {
    console.log(f.path);
}

// load an image as blob URL (MIME type is inferred automatically)
const img = new Image();
img.src = await fs.readAsObjectURL("/assets/test.jpg");
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
