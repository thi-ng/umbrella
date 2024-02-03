<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/system](https://media.thi.ng/umbrella/banners-20230807/thing-system.svg?9d062154)

[![npm version](https://img.shields.io/npm/v/@thi.ng/system.svg)](https://www.npmjs.com/package/@thi.ng/system)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/system.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

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

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bsystem%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/system
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/system"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const system = await import("@thi.ng/system");
```

Package sizes (brotli'd, pre-treeshake): ESM: 570 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                                | Description                                                                    | Live demo                                                | Source                                                                                |
|:--------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-system-bus.png" width="240"/> | Declarative component-based system with central rstream-based pubsub event bus | [Demo](https://demo.thi.ng/umbrella/rstream-system-bus/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-system-bus) |

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
graph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph) is
constructed. This graph is not required any further after system initialization
(see
[System.init()](https://docs.thi.ng/umbrella/system/classes/System.html#init)),
though can be useful for debugging and documentation purposes.

For example, we can utilize the
[@thi.ng/dgraph-dot](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph-dot)
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

![graphviz output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/system/basic.png)

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

&copy; 2020 - 2024 Karsten Schmidt // Apache License 2.0
