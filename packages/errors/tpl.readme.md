# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

This package defines the following error types & helper functions to throw them:

- [`AssertionError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/assert.ts)
- [`IllegalArgumentError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/illegal-arguments.ts)
- [`IllegalArityError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/illegal-arity.ts)
- [`IllegalStateError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/illegal-statre.ts)
- [`OutOfBoundsError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/out-of-bounds.ts)
- [`UnsupportedOperationError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/unsupported.ts)

Custom error types can be easily defined using
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

### Environment variables

The `UMBRELLA_ASSERTS` or `VITE_UMBRELLA_ASSERTS` env variables are
used to control the behavior of the `assert()` function in production builds: If
either is set (to a non-empty string), the function will **always** be enabled.
Otherwise (by default), `assert()` will be **disabled for production builds**,
i.e. if `process.env.NODE_ENV === "production"`.

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
