<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/errors](https://media.thi.ng/umbrella/banners-20230807/thing-errors.svg?d7513125)

[![npm version](https://img.shields.io/npm/v/@thi.ng/errors.svg)](https://www.npmjs.com/package/@thi.ng/errors)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/errors.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 201 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Berrors%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/errors
```

ESM import:

```ts
import * as err from "@thi.ng/errors";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/errors"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const err = await import("@thi.ng/errors");
```

Package sizes (brotli'd, pre-treeshake): ESM: 817 bytes

## Dependencies

None

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Description                                                                  | Live demo                                          | Source                                                                          |
|:-----------------------------------------------------------------------------|:---------------------------------------------------|:--------------------------------------------------------------------------------|
| GPU-based data reduction using thi.ng/shader-ast & WebGL multi-pass pipeline | [Demo](https://demo.thi.ng/umbrella/gpgpu-reduce/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/gpgpu-reduce) |

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

The `UMBRELLA_ASSERTS` or `VITE_UMBRELLA_ASSERTS` env variables are
used to control the behavior of the `assert()` function in production builds: If
either is set (to a non-empty string), the function will **always** be enabled.
Otherwise (by default), `assert()` will be **disabled for production builds**,
i.e. if `process.env.NODE_ENV === "production"`.

## Authors

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2018 - 2025 Karsten Schmidt // Apache License 2.0
