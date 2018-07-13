# @thi.ng/rstream-log

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream-log.svg)](https://www.npmjs.com/package/@thi.ng/rstream-log)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Extensible, multi-level & multi-hierarchy logging based on
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream)s,
transformable via
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers).

## Installation

```bash
yarn add @thi.ng/rstream-log
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Usage examples

```ts
import * as log from "@thi.ng/rstream-log";

const logger = new log.Logger("main");
// or with min level
const logger = new log.Logger("main", log.Level.DEBUG);

// add console output w/ string formatter (a transducer)
logger.subscribe(log.writeConsole(), log.formatString());

// add file output w/ post-filtering (only WARN or ERROR levels)
// and formatted as JSON
logger
    .transform(log.minLevel(log.Level.WARN), log.formatJSON())
    .subscribe(log.writeFile("main.log"))

logger.debug("hello world");

// only shown in console:
// [DEBUG] [main] 2018-01-20T09:04:05.198Z hello world

logger.warn("eek"); // shown in console & appended to file

// console:
// [WARN] [main] 2018-01-20T09:04:16.913Z eek

// file:
// {"level":"WARN","id":"main","time":"2018-01-23T09:05:55.647Z","body":["eek"]}

// each logger instance is a rstream StreamMerge instance
// allowing to form logger hierarchies

const mod1 = new log.Logger("module-1", log.Level.INFO);
// pipe mod1 into main logger
logger.add(mod1);

import { postWorker } from "@thi.ng/rstream";
// additionally send messages from this logger to worker
mod1.subscribe(postWorker("log-worker.js"));

mod1.info("hi from sub-module");

// only shown in console:
// [INFO] [module-1] 2018-01-20T09:05:21.198Z hi from sub-module
```

## Authors

- Karsten Schmidt

## License

&copy; 2017 - 2018 Karsten Schmidt // Apache Software License 2.0
