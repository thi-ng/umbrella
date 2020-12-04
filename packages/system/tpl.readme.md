# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Inspired by Stuart Sierra's
[component](https://github.com/stuartsierra/component) framework for
Clojure/ClojureScript.

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

### Example system

```ts
import { defSystem, ILifecycle } from "@thi.ng/system";

// Step 1: Define the structure / components of your system

interface FooSys {
    db: DB;
    cache: Cache;
    logger: Logger;
    dummy: ILifecycle;
}

// Step 2: Provide component implementations
// Components can be classes or any object implementing the
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
        factory: (deps) => new DB(deps.logger, deps.state),
        deps: ["logger", "state"],
    },
    logger: { factory: () => new Logger() },
    cache: {
        factory: ({ logger }) => new Cache(logger),
        deps: ["logger"],
    },

    dummy: {
        factory: ({ logger }) => ({
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
FOO.start();
// [info] start logger
// [info] start cache
// [info] start dummy
// [info] start db

// Step 5 (optional): Async shutdown all (in reverse order)
FOO.stop();
// [info] stop db
// [info] stop dummy
// [info] stop cache
// [info] stop logger

// Calls stop() & if successful followed by start()
FOO.reset();
```

### System visualization

In order for a `System` to initialize its components in the correct order, an internal [dependency graph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph) is constructed. This graph not required any further after system construction, however can be useful for debugging and documentation purposes.

For example, we can utilize the
[@thi.ng/dgraph-dot](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph-dot)
package to create [Graphviz](https://graphviz.org) source file to
visualize the dependencies between the system's components.

```ts
import { toDot } from "@thi.ng/dgraph-dot";

console.log(toDot(FOO.graph, { id: (node) => node }));
// digraph g {
// "db"[label="db"];
// "logger"[label="logger"];
// "state"[label="state"];
// "dummy"[label="dummy"];
// "db" -> "logger";
// "db" -> "state";
// "state" -> "logger";
// "dummy" -> "logger";
// }
```

Resulting visualization:

![graphviz output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/system/basic.png)

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
