# @thi.ng/compare

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/compare.svg)](https://www.npmjs.com/package/@thi.ng/compare)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

General purpose comparator with optional delegation for types
implementing the `@thi.ng/api/ICompare` interface.

This feature was previously part of the
[@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
package.

## Installation

```bash
yarn add @thi.ng/compare
```

## Dependencies

None

## Usage examples

```ts
import { ICompare } from "@thi.ng/api";
import { compare } from "@thi.ng/compare";

class Foo implements ICompare<Foo> {

    x: number;

    constructor(x: number) {
        this.x = x;
    }

    compare(o: Foo) {
        return compare(this.x, o.x);
    }
}

compare(new Foo(1), new Foo(2));
// -1
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
