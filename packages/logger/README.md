<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/logger](https://media.thi.ng/umbrella/banners-20230807/thing-logger.svg?fe782804)

[![npm version](https://img.shields.io/npm/v/@thi.ng/logger.svg)](https://www.npmjs.com/package/@thi.ng/logger)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/logger.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Log levels](#log-levels)
  - [Supplied implementations](#supplied-implementations)
  - [Lazy evaluation](#lazy-evaluation)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Types & basis infrastructure for arbitrary logging (w/ default impls).

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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Blogger%5D+in%3Atitle)

## Related packages

- [@thi.ng/rstream-log](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-log) - Structured, multilevel & hierarchical loggers based on [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

## Installation

```bash
yarn add @thi.ng/logger
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/logger"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const logger = await import("@thi.ng/logger");
```

Package sizes (brotli'd, pre-treeshake): ESM: 695 bytes

## Dependencies

None

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                                | Description                                                                    | Live demo                                                | Source                                                                                |
|:--------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-system-bus.png" width="240"/> | Declarative component-based system with central rstream-based pubsub event bus | [Demo](https://demo.thi.ng/umbrella/rstream-system-bus/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-system-bus) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/logger/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-logger,
  title = "@thi.ng/logger",
  author = "Karsten Schmidt",
  note = "https://thi.ng/logger",
  year = 2016
}
```

## License

&copy; 2016 - 2024 Karsten Schmidt // Apache License 2.0
