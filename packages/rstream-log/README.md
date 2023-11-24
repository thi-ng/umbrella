<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/rstream-log](https://media.thi.ng/umbrella/banners-20230807/thing-rstream-log.svg?8a1c5872)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream-log.svg)](https://www.npmjs.com/package/@thi.ng/rstream-log)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-log.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

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

Structured, multilevel & hierarchical loggers based on [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream).

This package provides extensible, multi-level & multi-hierarchy logging
infrastructure, with logged values transformable via
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers).
Several built-in transformers are provided.

The `Logger` class provided by this package implements the
[@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
`ILogger` interface and uses `LogLevel` enums to configure levels /
filtering.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brstream-log%5D+in%3Atitle)

## Support packages

- [@thi.ng/rstream-log-file](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-log-file) - File output handler for structured, multilevel & hierarchical loggers based on [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

## Related packages

- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger) - Types & basis infrastructure for arbitrary logging (w/ default impls)

## Installation

```bash
yarn add @thi.ng/rstream-log
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/rstream-log"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const rstreamLog = await import("@thi.ng/rstream-log");
```

Package sizes (brotli'd, pre-treeshake): ESM: 856 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/rstream-log/)

```ts
import { LogLevel } from "@thi.ng/api";
import * as log from "@thi.ng/rstream-log";

const logger = new log.Logger("main");
// or with min level
const logger = new log.Logger("main", LogLevel.DEBUG);

// add console output w/ string formatter (a transducer)
logger.subscribe(log.writeConsole(), log.formatString());

logger.debug("hello world");
// [DEBUG] [main] 2018-01-20T09:04:05.198Z hello world

logger.warn("eek");
// [WARN] [main] 2018-01-20T09:04:16.913Z eek

// each logger instance is a rstream StreamMerge instance
// allowing to form logger hierarchies

const mod1 = new log.Logger("module-1", LogLevel.INFO);
// pipe mod1 into main logger
logger.add(mod1);

import { postWorker } from "@thi.ng/rstream";
// additionally send messages from this logger to worker
mod1.subscribe(postWorker("log-worker.js"));

mod1.info("hi from sub-module");

// only shown in console:
// [INFO] [module-1] 2018-01-20T09:05:21.198Z hi from sub-module
```

TODO

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

&copy; 2017 - 2023 Karsten Schmidt // Apache License 2.0
