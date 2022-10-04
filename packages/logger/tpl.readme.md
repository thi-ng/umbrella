# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

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

Logging calls targetting lower levels than configured in the logger will be
ignored.

### Supplied implementations

The following logger implementations are provided:

- [`ConsoleLogger`](https://docs.thi.ng/umbrella/logger/classes/ConsoleLogger.html): writes output to `console`
- [`MemoryLogger`](https://docs.thi.ng/umbrella/logger/classes/MemoryLogger.html): writes output to in-memory journal
- [`NULL_LOGGER`](https://docs.thi.ng/umbrella/logger/modules.html#NULL_LOGGER): no-op logger, suppresses all output

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

TODO

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
