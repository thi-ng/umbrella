<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
> [!IMPORTANT]
> ‼️ Announcing the thi.ng user survey 2024 📋
>
> [Please participate in the survey here!](https://forms.gle/XacbSDEmQMPZg8197)\
> (open until end of February)
>
> **To achieve a better sample size, I'd highly appreciate if you could
> circulate the link to this survey in your own networks.**
>
> [Discussion](https://github.com/thi-ng/umbrella/discussions/447)

# ![@thi.ng/rstream-log](https://media.thi.ng/umbrella/banners-20230807/thing-rstream-log.svg?8a1c5872)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream-log.svg)](https://www.npmjs.com/package/@thi.ng/rstream-log)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-log.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

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

The `Logger` class in this package implements the
[@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
`ILogger` interface and uses `LogLevel` enums to configure levels /
filtering. See that package for more details.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brstream-log%5D+in%3Atitle)

## Support packages

- [@thi.ng/rstream-log-file](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-log-file) - File output handler for structured, multilevel & hierarchical loggers based on [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

## Related packages

- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger) - Basis types for arbitrary & hierarchical logging

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

Package sizes (brotli'd, pre-treeshake): ESM: 768 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

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

&copy; 2017 - 2024 Karsten Schmidt // Apache License 2.0
