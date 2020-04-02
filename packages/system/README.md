<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/system](https://media.thi.ng/umbrella/banners/thing-system.svg?1585848215)

[![npm version](https://img.shields.io/npm/v/@thi.ng/system.svg)](https://www.npmjs.com/package/@thi.ng/system)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/system.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Minimal DI / life cycle container for stateful app components.

Inspired by Stuart Sierra's
[component](https://github.com/stuartsierra/component) framework for
Clojure/ClojureScript.

### Status

**ALPHA** - bleeding edge / work-in-progress

## Installation

```bash
yarn add @thi.ng/system
```

Package sizes (gzipped): ESM: 377 bytes / CJS: 436 bytes / UMD: 532 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph)
- [tslib](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

## API

[Generated API docs](https://docs.thi.ng/umbrella/system/)

TODO

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
        console.log(msg);
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
// start logger
// start cache
// start dummy
// start db

// Step 5 (optional): Async shutdown all (in reverse order)
FOO.stop();
// stop db
// stop dummy
// stop cache
// stop logger

// Calls stop() & if successful followed by start()
FOO.reset();
```

## Authors

Karsten Schmidt

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
