<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/server](https://media.thi.ng/umbrella/banners-20230807/thing-server.svg?ab80455e)

[![npm version](https://img.shields.io/npm/v/@thi.ng/server.svg)](https://www.npmjs.com/package/@thi.ng/server)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/server.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 201 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Available interceptors](#available-interceptors)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Minimal HTTP server with declarative routing, extensible via pre/post interceptors.

TODO

Documentation forthcoming, please see [API
docs](https://docs.thi.ng/umbrella/server/) and
[tests](https://github.com/thi-ng/umbrella/blob/develop/packages/server/test/main.test.ts)
for now...

### Available interceptors

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bserver%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/server
```

ESM import:

```ts
import * as ser from "@thi.ng/server";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/server"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const ser = await import("@thi.ng/server");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.51 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/cache](https://github.com/thi-ng/umbrella/tree/develop/packages/cache)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/mime](https://github.com/thi-ng/umbrella/tree/develop/packages/mime)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
- [@thi.ng/router](https://github.com/thi-ng/umbrella/tree/develop/packages/router)
- [@thi.ng/uuid](https://github.com/thi-ng/umbrella/tree/develop/packages/uuid)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/server/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-server,
  title = "@thi.ng/server",
  author = "Karsten Schmidt",
  note = "https://thi.ng/server",
  year = 2024
}
```

## License

&copy; 2024 - 2025 Karsten Schmidt // Apache License 2.0
