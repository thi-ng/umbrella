# ${pkg.name}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

Comparators with support for types implementing the [@thi.ng/api `ICompare`](https://github.com/thi-ng/umbrella/tree/master/packages/api/src/api/compare.ts) interface.

${status}

${supportPackages}

${blogPosts}

## Installation

```bash
yarn add ${pkg.name}
```

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

${authors}

## License

&copy; ${copyright} // ${license}
