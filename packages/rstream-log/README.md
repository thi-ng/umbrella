<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/rstream-log](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-rstream-log.svg?7f269fc9)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream-log.svg)](https://www.npmjs.com/package/@thi.ng/rstream-log)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-log.svg)
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
- [Support packages](#support-packages)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Structured, multilevel & hierarchical loggers based on [@thi.ng/rstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream).

This package provides extensible, multi-level & multi-hierarchy logging
infrastructure, with logged values transformable via
[@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers).
Several built-in transformers are provided.

The `Logger` class in this package implements the
[@thi.ng/logger](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/logger)
`ILogger` interface and uses `LogLevel` enums to configure levels /
filtering. See that package for more details.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Brstream-log%5D)

## Support packages

- [@thi.ng/rstream-log-file](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream-log-file) - File output handler for structured, multilevel & hierarchical loggers based on [@thi.ng/rstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream)

## Related packages

- [@thi.ng/logger](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/logger) - Basis types for arbitrary & hierarchical logging

## Installation

```bash
yarn add @thi.ng/rstream-log
```

ESM import:

```ts
import * as rslog from "@thi.ng/rstream-log";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/rstream-log"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const rslog = await import("@thi.ng/rstream-log");
```

Package sizes (brotli'd, pre-treeshake): ESM: 749 bytes

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/logger](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/logger)
- [@thi.ng/rstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream)
- [@thi.ng/strings](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/strings)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/rstream-log/)

```ts tangle:export/readme.ts
import { LogLevel } from "@thi.ng/logger";
import { Logger, formatString, writeConsole } from "@thi.ng/rstream-log";

const logger = new Logger("main");
// or with min level
const logger = new Logger("main", LogLevel.DEBUG);
// or min level given as string
const logger = new Logger("main", "DEBUG");

// add console output w/ string formatter (a transducer)
// each logger instance has a rstream Stream instance
// allowing for downstream processing
logger.stream.transform(formatString()).subscribe(writeConsole());

logger.debug("hello world");
// [DEBUG] main: 2024-02-16T20:38:11.143Z hello world

logger.warn("eek");
// [WARN] main: 2024-02-16T20:38:11.144Z eek

// loggers can form hierarchies by creating/attaching child loggers
const child = logger.childLogger("child", LogLevel.INFO);

import { postWorker } from "@thi.ng/rstream";
// additionally send messages from this logger to worker
child.stream.subscribe(postWorker("log-worker.js"));

child.info("hi from submodule");
// [INFO] child: 2024-02-16T20:38:11.145Z hi from submodule
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-rstream-log,
  title = "@thi.ng/rstream-log",
  author = "Karsten Schmidt",
  note = "https://thi.ng/rstream-log",
  year = 2017
}
```

## License

&copy; 2017 - 2026 Karsten Schmidt // Apache License 2.0
