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

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdynvar%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/dynvar
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/dynvar"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const dynvar = await import("@thi.ng/dynvar");
```

Package sizes (gzipped, pre-treeshake): ESM: 300 bytes

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

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-dynvar,
  title = "@thi.ng/dynvar",
  author = "Karsten Schmidt",
  note = "https://thi.ng/dynvar",
  year = 2016
}
```

## License

&copy; 2016 - 2021 Karsten Schmidt // Apache Software License 2.0
