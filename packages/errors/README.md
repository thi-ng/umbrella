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
- [Authors](#authors)
- [License](#license)

## About

Custom error types and error factory functions.

Additional error types can be defined using
[`defError()`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/deferror.ts).

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/errors
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/errors?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/errors/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 262 bytes / CJS: 338 bytes / UMD: 416 bytes

## Dependencies

- [tslib](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

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

## Authors

Karsten Schmidt

## License

&copy; 2018 - 2020 Karsten Schmidt // Apache Software License 2.0
