<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package defines the following error types & helper functions to throw them:

- [`AssertionError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/assert.ts)
- [`IllegalArgumentError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/illegal-arguments.ts)
- [`IllegalArityError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/illegal-arity.ts)
- [`IllegalStateError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/illegal-statre.ts)
- [`OutOfBoundsError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/out-of-bounds.ts)
- [`UnsupportedOperationError`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/unsupported.ts)

Custom error types can be easily defined using
[`defError()`](https://github.com/thi-ng/umbrella/tree/develop/packages/errors/src/deferror.ts).

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

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

<!-- include ../../assets/tpl/footer.md -->
