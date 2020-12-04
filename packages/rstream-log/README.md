<!-- This file is generated - DO NOT EDIT! -->

# ![rstream-log](https://media.thi.ng/umbrella/banners/thing-rstream-log.svg?8716f5ff)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream-log.svg)](https://www.npmjs.com/package/@thi.ng/rstream-log)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-log.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Support packages](#support-packages)
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

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brstream-log%5D+in%3Atitle)

### Support packages

- [@thi.ng/rstream-log-file](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-log-file) - File output handler for structured, multilevel & hierarchical loggers based on [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

## Installation

```bash
yarn add @thi.ng/rstream-log
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/rstream-log?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/rstream-log/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 742 bytes / CJS: 868 bytes / UMD: 939 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
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

Karsten Schmidt

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

&copy; 2017 - 2020 Karsten Schmidt // Apache Software License 2.0
