<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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
import * as h from "@thi.ng/hex";

const cssColor = (x: number) => "#" + h.U24(x);

cssColor(10597059)
// "#a1b2c3"

h.U48(223928981472033);
// "cba987654321"

h.U48HL(0xcba9, 0x87654321)
// "cba987654321"

h.U64(0xaa * 0x010101010101)
// "0000aaaaaaaaaaaa"

h.U64HL(0x11223344, 0x89abcdef);
// "1122334489abcdef"

// format directly from byte arrays

const BUF = [1, 2, 3, 4, 0x10, 0x20, 0x30, 0x40];

// big-endian

h.U32BE(BUF, 0)
// "01020304"
h.U32BE(BUF, 4)
// "10203040"

// little-endian

h.U32LE(BUF, 0)
// "04030201"

h.U32LE(BUF, 4)
// "40302010"
```

### Creating hexdumps

The following functions are provided to create customizable hexdumps:

- [hexdump()](https://docs.thi.ng/umbrella/hex/functions/hexdump.html)
- [hexdumpLines()](https://docs.thi.ng/umbrella/hex/functions/hexdumpLines.html)
- [printHexdump()](https://docs.thi.ng/umbrella/hex/functions/printHexdump.html)

```ts tangle:export/readme-hexdump.ts
import { printHexdump } from "@thi.ng/hex";
import { readFileSync } from "node:fs";

const bytes = readFileSync("README.md");

// hexdump of the first 100 bytes
printHexdump(bytes, 0, 100);

// 00000000 21 5b 74 68 69 2e 6e 67 2f 75 6d 62 72 65 6c 6c ![thi.ng/umbrell
// 00000010 61 5d 28 68 74 74 70 73 3a 2f 2f 72 61 77 2e 67 a](https://raw.g
// 00000020 69 74 68 75 62 75 73 65 72 63 6f 6e 74 65 6e 74 ithubusercontent
// 00000030 2e 63 6f 6d 2f 74 68 69 2d 6e 67 2f 75 6d 62 72 .com/thi-ng/umbr
// 00000040 65 6c 6c 61 2f 64 65 76 65 6c 6f 70 2f 61 73 73 ella/develop/ass
// 00000050 65 74 73 2f 62 61 6e 6e 65 72 73 2f 74 68 69 6e ets/banners/thin
// 00000060 67 2d 75 6d                                     g-um
```

<!-- include ../../assets/tpl/footer.md -->
