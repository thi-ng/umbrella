<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

The types & implementations provided by this package are used in various places
throughout the thi.ng/umbrella ecosystem and can be swapped out on demand to
customize users' needs.

### Log levels

All loggers based on this basic framework provided by this package support the
following [`LogLevel`](https://docs.thi.ng/umbrella/logger/enums/LogLevel.html)s
(in order of importance):

- `FINE`
- `DEBUG`
- `INFO`
- `WARN`
- `SEVERE`

Logging calls targeting lower levels than configured in the logger will be
ignored.

### Logging hierarchies

Each [`ILogger`](https://docs.thi.ng/umbrella/logger/interfaces/ILogger.html)
instance (i.e. all supplied here) can have an associated parent logger to which
any non-filtered messages can be propagated. This allows for the easy creation
of logging hierarchies with each logger able to control its own log level.

To that end the package also provides a `ROOT` logger.

```ts
import { ConsoleLogger, ROOT } from "@thi.ng/logger";

// create a child logger
const myLogger = ROOT.childLogger("custom");

// use console output for root logger (and for all its children)
ROOT.set(new ConsoleLogger());

// forwards message to root and then writes to console
myLogger.debug("hello");

// [DEBUG] custom: hello
```

### Supplied implementations

The following logger implementations are provided:

- [`ConsoleLogger`](https://docs.thi.ng/umbrella/logger/classes/ConsoleLogger.html): writes output to `console`
- [`MemoryLogger`](https://docs.thi.ng/umbrella/logger/classes/MemoryLogger.html): writes output to in-memory journal
- [`ProxyLogger`](https://docs.thi.ng/umbrella/logger/classes/ProxyLogger.html): proxy impl for another logger
- [`StreamLogger`](https://docs.thi.ng/umbrella/logger/classes/StreamLogger.html): writes output to NodeJS stream
- [`NULL_LOGGER`](https://docs.thi.ng/umbrella/logger/variables/NULL_LOGGER.html): no-op logger, suppresses all output

### Lazy evaluation

Log messages can contain any number & types of arguments. No-arg functions can
be provided as message arg to avoid evaluation of potentially costly message
formatting for suppressed log levels. For example:

```ts
import { ConsoleLogger, LogLevel } from "@thi.ng/logger";

const logger = new ConsoleLogger("app", LogLevel.INFO);

const name = "thi.ng";

// eager (standard) arg evaluation
logger.info(`hello, ${name}`);
// [INFO] app: hello, thi.ng

// eager (standard) arg evaluation, but suppressed output
logger.debug("result is", 23 + 42);

// lazy arg evaluation
logger.info("result is", () => 23 + 42);
// [INFO] app: result is 65
```

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

TODO

<!-- include ../../assets/tpl/footer.md -->
