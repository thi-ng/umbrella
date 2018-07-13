# @thi.ng/equiv

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/equiv.svg)](https://www.npmjs.com/package/@thi.ng/equiv)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Extensible deep equivalence checking for any data types. Supports:

- JS primitives
- arrays
- plain objects
- ES6 Sets / Maps
- Date
- RegExp
- types with `.equiv()` implementations

This feature was previously part of the
[@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
package.

## Installation

```bash
yarn add @thi.ng/equiv
```

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)

## Usage examples

```ts
import { equiv } from "@thi.ng/equiv";

equiv({a: {b: [1, 2]}}, {a: {b: [1, 2]}});
// true
```

### Implement IEquiv interface

This is useful & required for custom types to take part in `equiv`
checks, by default only plain objects & array are traversed deeply.

Furthemore by implementing this interface we can better control which
internal values / criteria are required to establish equivalence. In
this example we exclude the `meta` property and only check for same type
& `children` equality.

```ts
import { IEquiv } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";

class Node implements IEquiv {

    meta: any;
    children: any[];

    constructor(children: any[], meta?) {
        this.children = children;
        this.meta = meta;
    }

    equiv(o: any) {
        return o instanceof Node && equiv(this.children, o.children);
    }
}

equiv(new Node([1,2,3], "foo"), new Node([1,2,3], "bar"));
// true
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
