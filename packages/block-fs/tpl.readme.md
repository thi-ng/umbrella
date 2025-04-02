<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

TODO diagram

#### File blocks

Files are stored as linked lists of blocks, with the first few bytes of each
block reserved for linkage and number of data bytes in the block. The number of
bytes effectively available for data depends on the configured block size and
the max. number of blocks in the storage backend.

TODO diagram

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
filesystem).

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

Usage: blockfs <cmd> [opts] input

Flags:

-v, --verbose                   Display extra process information

Main:

-bs BYTES, --block-size BYTES   Block size (default: 1024)
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

<!-- include ../../assets/tpl/footer.md -->
