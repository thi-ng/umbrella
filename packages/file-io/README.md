<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/file-io](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-file-io.svg?5f261db9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/file-io.svg)](https://www.npmjs.com/package/@thi.ng/file-io)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/file-io.svg)
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
- [Available functions](#available-functions)
  - [Files](#files)
  - [Directories](#directories)
  - [Logging](#logging)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Assorted file I/O utils (w/ logging support) for NodeJS/Bun.

Most functions in this package have optional support for the
[`ILogger`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/logger)
logging interface.

## Available functions

### Files

- [bufferHash](https://docs.thi.ng/umbrella/file-io/functions/bufferHash.html)
- [copyFile](https://docs.thi.ng/umbrella/file-io/functions/copyFile.html)
- [copyFileAsync](https://docs.thi.ng/umbrella/file-io/functions/copyFileAsync.html)
- [createTempFile](https://docs.thi.ng/umbrella/file-io/functions/createTempFile.html)
- [deleteFile](https://docs.thi.ng/umbrella/file-io/functions/deleteFile.html)
- [deleteFileAsync](https://docs.thi.ng/umbrella/file-io/functions/deleteFileAsync.html)
- [deleteFiles](https://docs.thi.ng/umbrella/file-io/functions/deleteFiles.html)
- [deleteFilesAsync](https://docs.thi.ng/umbrella/file-io/functions/deleteFilesAsync.html)
- [files](https://docs.thi.ng/umbrella/file-io/functions/files.html)
- [fileChunks](https://docs.thi.ng/umbrella/file-io/functions/fileChunks.html)
- [fileExt](https://docs.thi.ng/umbrella/file-io/functions/fileExt.html)
- [fileHash](https://docs.thi.ng/umbrella/file-io/functions/fileHash.html)
- [fileWatcher](https://docs.thi.ng/umbrella/file-io/functions/fileWatcher.html)
- [readBinary](https://docs.thi.ng/umbrella/file-io/functions/readBinary.html)
- [readBinaryAsync](https://docs.thi.ng/umbrella/file-io/functions/readBinaryAsync.html)
- [readJSON](https://docs.thi.ng/umbrella/file-io/functions/readJSON.html)
- [readJSONAsync](https://docs.thi.ng/umbrella/file-io/functions/readJSONAsync.html)
- [readText](https://docs.thi.ng/umbrella/file-io/functions/readText.html)
- [readTextAsync](https://docs.thi.ng/umbrella/file-io/functions/readTextAsync.html)
- [streamHash](https://docs.thi.ng/umbrella/file-io/functions/streamHash.html)
- [tempFilePath](https://docs.thi.ng/umbrella/file-io/functions/tempFilePath.html)
- [writeFile](https://docs.thi.ng/umbrella/file-io/functions/writeFile.html)
- [writeFileAsync](https://docs.thi.ng/umbrella/file-io/functions/writeFileAsync.html)
- [writeJSON](https://docs.thi.ng/umbrella/file-io/functions/writeJSON.html)
- [writeJSONAsync](https://docs.thi.ng/umbrella/file-io/functions/writeJSONAsync.html)
- [writeText](https://docs.thi.ng/umbrella/file-io/functions/writeText.html)
- [writeTextAsync](https://docs.thi.ng/umbrella/file-io/functions/writeTextAsync.html)

### Directories

- [deleteDir](https://docs.thi.ng/umbrella/file-io/functions/deleteDir.html)
- [dirs](https://docs.thi.ng/umbrella/file-io/functions/dirs.html)
- [ensureDir](https://docs.thi.ng/umbrella/file-io/functions/ensureDir.html)
- [ensureDirForFile](https://docs.thi.ng/umbrella/file-io/functions/ensureDirForFile.html)
- [isDirectory](https://docs.thi.ng/umbrella/file-io/functions/isDirectory.html)

### Logging

- [maskedPath](https://docs.thi.ng/umbrella/file-io/functions/maskedPath.html)
- [addPathMask](https://docs.thi.ng/umbrella/file-io/functions/addPathMask.html)
- [setPathMasks](https://docs.thi.ng/umbrella/file-io/functions/setPathMasks.html)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bfile-io%5D)

## Installation

```bash
yarn add @thi.ng/file-io
```

ESM import:

```ts
import * as fio from "@thi.ng/file-io";
```

For Node.js REPL:

```js
const fio = await import("@thi.ng/file-io");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.44 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/hex](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hex)
- [@thi.ng/logger](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/logger)
- [@thi.ng/random](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/random)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory is using this package:

| Screenshot                                                                                                           | Description                              | Live demo | Source                                                                                   |
|:---------------------------------------------------------------------------------------------------------------------|:-----------------------------------------|:----------|:-----------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/package-stats.png" width="240"/> | CLI util to visualize umbrella pkg stats |           | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/package-stats) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/file-io/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-file-io,
  title = "@thi.ng/file-io",
  author = "Karsten Schmidt",
  note = "https://thi.ng/file-io",
  year = 2022
}
```

## License

&copy; 2022 - 2026 Karsten Schmidt // Apache License 2.0
