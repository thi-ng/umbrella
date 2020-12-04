# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Supports:

- JS primitives
- Arrays
- Plain objects
- ES6 Sets / Maps
- Date
- RegExp
- Types with
  [IEquiv](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/api/equiv.ts)
  implementation

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
import { equiv } from "@thi.ng/equiv";

equiv(
    { a: { b: [1, 2] } },
    { a: { b: [1, 2] } }
);
// true
```

### Implement IEquiv interface

This is useful & required for custom types to take part in `equiv`
checks, by default only plain objects & array are traversed deeply.

Furthermore, by implementing this interface we can better control which
internal values / criteria are required to establish equivalence. In
this example we exclude the `meta` property and only check for same type
& `children` equality.

```ts
import { IEquiv } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";

class Node implements IEquiv {

    meta: any;
    children: any[];

    constructor(children: any[], meta?: any) {
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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
