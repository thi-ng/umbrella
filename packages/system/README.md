<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/system](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-system.svg?5482c49a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/system.svg)](https://www.npmjs.com/package/@thi.ng/system)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/system.svg)
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
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Example system](#example-system)
  - [System visualization](#system-visualization)
- [Authors](#authors)
- [License](#license)

## About

Minimal and explicit dependency-injection & lifecycle container for stateful app components.

Inspired by Stuart Sierra's
[component](https://github.com/stuartsierra/component) framework for
Clojure/ClojureScript.

Uses a declarative approach to define system components with a simple [lifecycle
API](https://docs.thi.ng/umbrella/system/interfaces/ILifecycle.html).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bsystem%5D)

## Installation

```bash
yarn add @thi.ng/system
```

ESM import:

```ts
import * as sys from "@thi.ng/system";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/system"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const sys = await import("@thi.ng/system");
```

Package sizes (brotli'd, pre-treeshake): ESM: 579 bytes

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/dgraph](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/dgraph)
- [@thi.ng/logger](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/logger)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Two projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                        | Description                                                                    | Live demo                                                | Source                                                                                 |
|:----------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------|:---------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/csp-bus.png" width="240"/>            | CSP channel-based event handling, async transducers & reactive UI components   | [Demo](https://demo.thi.ng/umbrella/csp-bus/)            | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/csp-bus)            |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/rstream-system-bus.png" width="240"/> | Declarative component-based system with central rstream-based pubsub event bus | [Demo](https://demo.thi.ng/umbrella/rstream-system-bus/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rstream-system-bus) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/system/)

TODO

### Example system

```ts tangle:export/readme.ts
import { defSystem, ILifecycle } from "@thi.ng/system";

// Step 1: Define the structure / components of your system

interface FooSys {
    db: DB;
    cache: Cache;
    logger: Logger;
    dummy: ILifecycle;
}

// Step 2: Provide component implementations
// Components can be classes or any object implementing the (fully optional)
// `ILifecycle` interface...

class Logger implements ILifecycle {

    info(msg: string) {
        console.log(`[info] ${msg}`);
    }

    async start() {
        this.info("start logger");
        return true;
    }

    async stop() {
        this.info("stop logger");
        return true;
    }
}

// DB requires a logger & cache

class DB implements ILifecycle {

    constructor(protected logger: Logger, protected cache: Cache) {}

    async start() {
        this.logger.info("start db");
        return true;
    }

    async stop() {
        this.logger.info("stop db");
        return true;
    }
}

class Cache implements ILifecycle {

    constructor(protected logger: Logger) {}

    async start() {
        this.logger.info("start cache");
        return true;
    }

    async stop() {
        this.logger.info("stop cache");
        return true;
    }
}

// Step 3: Define system & component dependencies
// This will initialize all components in dependency order

// - All arg types and dependency IDs are inferred / type checked
// - `System` itself implements `ILifecycle`, so can be used to form
//   nested systems

const FOO = defSystem<FooSys>({
    db: {
        factory: async (deps) => new DB(deps.logger, deps.cache),
        deps: ["logger", "cache"],
    },
    logger: { factory: async () => new Logger() },
    cache: {
        factory: async ({ logger }) => new Cache(logger),
        deps: ["logger"],
    },
    dummy: {
        factory: async ({ logger }) => ({
            async start() {
                logger.info("start dummy");
                return true;
            },
            async stop() {
                logger.info("stop dummy");
                return true;
            },
        }),
        deps: ["logger"]
    }
});

// Step 4: Asynchronously start all components in dependency order
await FOO.start();
// [info] start logger
// [info] start cache
// [info] start dummy
// [info] start db

// Step 5 (optional): Async shutdown all (in reverse order)
await FOO.stop();
// [info] stop db
// [info] stop dummy
// [info] stop cache
// [info] stop logger

// Alternatively, calls stop() & if successful followed by start()
await FOO.reset();
```

### System visualization

For a `System` to initialize its components in the correct order, an internal
[dependency
graph](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/dgraph) is
constructed. This graph is not required any further after system initialization
(see
[System.init()](https://docs.thi.ng/umbrella/system/classes/System.html#init)),
though can be useful for debugging and documentation purposes.

For example, we can utilize the
[@thi.ng/dgraph-dot](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/dgraph-dot)
package to generate a [Graphviz](https://graphviz.org) source file to visualize
the dependencies between the system's components.

```ts tangle:export/readme.ts
import { toDot } from "@thi.ng/dgraph-dot";

console.log(toDot(FOO.graph, { id: (node) => node }));
// digraph g {
// "db"[label="db"];
// "logger"[label="logger"];
// "cache"[label="cache"];
// "dummy"[label="dummy"];
// "db" -> "logger";
// "db" -> "cache";
// "cache" -> "logger";
// "dummy" -> "logger";
// }
```

Resulting visualization:

![graphviz output](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/system/basic.png)

## Authors

- [Karsten Schmidt](https://thi.ng) (Main author)
- [Kevin Nolan](https://github.com/allforabit)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-system,
  title = "@thi.ng/system",
  author = "Karsten Schmidt and others",
  note = "https://thi.ng/system",
  year = 2020
}
```

## License

&copy; 2020 - 2026 Karsten Schmidt // Apache License 2.0
