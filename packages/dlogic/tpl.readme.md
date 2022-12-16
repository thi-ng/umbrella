<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

Assorted digital logic gates and ops for boolean values to compose
complex logic in a more functional manner, e.g. for DSL or simulation
purposes. Truth tables and references are provided in the doc strings of
each function.

Also see
[@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/develop/packages/binary/src/logic.ts)
for binary versions of most of the ops provided by this package.

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
import { nand } from "@thi.ng/dlogic";

// XOR construction only using NAND gates
const xor = (a: boolean, b: boolean) => {
    const ab = nand(a,b);
    return nand(nand(a, ab), nand(b, ab));
};

xor(false, false)
// false
xor(false, true)
// true
xor(true, false)
// true
xor(true, true)
// false
```

<!-- include ../../assets/tpl/footer.md -->
