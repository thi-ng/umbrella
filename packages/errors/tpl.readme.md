# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Additional error types can be defined using
[`defError()`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/deferror.ts).

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

```ts
import * as err from "@thi.ng/errors";

err.illegalArity(3)
// Error: illegal arity: 3

err.illegalArgs("expected foo");
// Error: illegal argument(s): expected foo

err.illegalState("oops");
// Error: illegal state: oops

err.unsupported("TODO not yet implemented")
// Error: unsupported operation: TODO not yet implemented

// define custom error
const MyError = err.defError(
    () => "Eeek... ",
    (x) => x + " is not allowed!"
);

try {
    throw new MyError(23);
} catch(e) {
    console.warn(e.message);
    console.log(e instanceof Error);
}
// Eeek... 23 is not allowed!
// true
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
