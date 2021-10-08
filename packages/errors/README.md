<!-- This file is generated - DO NOT EDIT! -->

# ![errors](https://media.thi.ng/umbrella/banners/thing-errors.svg?f2f20b9e)

[![npm version](https://img.shields.io/npm/v/@thi.ng/errors.svg)](https://www.npmjs.com/package/@thi.ng/errors)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/errors.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Environment variables](#environment-variables)
- [Authors](#authors)
- [License](#license)

## About

Custom error types and error factory functions.

This package defines the following error types & helper functions to throw them:

- [`AssertionError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/assert.ts)
- [`IllegalArgumentError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/illegal-arguments.ts)
- [`IllegalArityError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/illegal-arity.ts)
- [`IllegalStateError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/illegal-statre.ts)
- [`OutOfBoundsError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/out-of-bounds.ts)
- [`UnsupportedOperationError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/unsupported.ts)

Custom error types can be easily defined using
[`defError()`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/deferror.ts).

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Berrors%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/errors
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/errors"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const errors = await import("@thi.ng/errors");
```

Package sizes (gzipped, pre-treeshake): ESM: 538 bytes

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/errors/)

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

The `UMBRELLA_ASSERTS` or `SNOWPACK_PUBLIC_UMBRELLA_ASSERTS` env variables are
used to control the behavior of the `assert()` function in production builds: If
either is set (to a non-empty string), the function will **always** be enabled.
Otherwise (by default), `assert()` will be **disabled for production builds**,
i.e. if `process.env.NODE_ENV === "production"`.

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-errors,
  title = "@thi.ng/errors",
  author = "Karsten Schmidt",
  note = "https://thi.ng/errors",
  year = 2018
}
```

## License

&copy; 2018 - 2021 Karsten Schmidt // Apache Software License 2.0
