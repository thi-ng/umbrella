<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/file-io](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-file-io.svg?5f261db9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/file-io.svg)](https://www.npmjs.com/package/@thi.ng/file-io)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/file-io.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 208 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Assorted file I/O utils (with logging support) for NodeJS/Bun.

Most functions in this package have optional support for the
[`ILogger`](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
logging interface.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bfile-io%5D+in%3Atitle)

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

Package sizes (brotli'd, pre-treeshake): ESM: 2.05 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/develop/packages/hex)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                           | Description                              | Live demo | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:-----------------------------------------|:----------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/package-stats.png" width="240"/> | CLI util to visualize umbrella pkg stats |           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/package-stats) |

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

&copy; 2022 - 2025 Karsten Schmidt // Apache License 2.0
