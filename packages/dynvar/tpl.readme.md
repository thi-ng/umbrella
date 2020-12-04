# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

References:

- https://en.wikipedia.org/wiki/Scope_(computer_science)#Dynamic_scoping

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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
