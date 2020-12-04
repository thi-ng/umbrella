# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

This package provides extensible, multi-level & multi-hierarchy logging
infrastructure, with logged values transformable via
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers).
Several built-in transformers are provided.

The `Logger` class provided by this package implements the
[@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
`ILogger` interface and uses `LogLevel` enums to configure levels /
filtering.

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
