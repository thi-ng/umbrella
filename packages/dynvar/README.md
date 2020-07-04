<!-- This file is generated - DO NOT EDIT! -->

# ![dynvar](https://media.thi.ng/umbrella/banners/thing-dynvar.svg?d5856acc)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dynvar.svg)](https://www.npmjs.com/package/@thi.ng/dynvar)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dynvar.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Logging example](#logging-example)
- [Authors](#authors)
- [License](#license)

## About

Dynamically scoped variable bindings.

References:

- https://en.wikipedia.org/wiki/Scope_(computer_science)#Dynamic_scoping

### Status

**ALPHA** - bleeding edge / work-in-progress

## Installation

```bash
yarn add @thi.ng/dynvar
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/dynvar?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/dynvar/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 300 bytes / CJS: 354 bytes / UMD: 439 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## API

[Generated API docs](https://docs.thi.ng/umbrella/dynvar/)

TODO - See
[tests](https://github.com/thi-ng/umbrella/blob/develop/packages/dynvar/test/index.ts)
for usage...

### Logging example

```ts
import { dynvar } from "@thi.ng/dynvar";
import { appendFileSync } from "fs";

interface Logger {
    log(...args: any[]): void;
}

// create dynamically scoped variable
// set default/root binding
const logger = dynvar<Logger>(console);

// dummy function using `logger`
const foo = () => {
    // deref() returns var's current value
    logger.deref().log("begin foo...");
    for (let i = 0; i < 5; i++) {
        logger.deref().log(i);
    }
    logger.deref().log("foo done.");
};

foo();
// (output in console)
// begin foo...
// 0
// 1
// 2
// 3
// 4
// foo done.

// Alternative Logger impl
class FileLogger implements Logger {
    constructor(protected path: string) {}

    log(...args: any[]) {
        appendFileSync(this.path, args.join(", ") + "\n");
    }
}

// re-execute `foo` with temporary dynamic scope in which
// logger is bound to given new value (i.e. here file logger)
logger.withBinding(new FileLogger("./foo.txt"), foo);

// old scope again (back to using console)
logger.deref().log("good bye");
// "good bye"
```

Display log file contents:

```bash
cat foo.txt
# begin foo...
# 0
# 1
# 2
# 3
# 4
# foo done.
```

## Authors

Karsten Schmidt

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
