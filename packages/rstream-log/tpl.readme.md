<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package provides extensible, multi-level & multi-hierarchy logging
infrastructure, with logged values transformable via
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers).
Several built-in transformers are provided.

The `Logger` class in this package implements the
[@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
`ILogger` interface and uses `LogLevel` enums to configure levels /
filtering. See that package for more details.

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

<!-- include ../../assets/tpl/footer.md -->
