<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/compare

[![npm version](https://img.shields.io/npm/v/@thi.ng/compare.svg)](https://www.npmjs.com/package/@thi.ng/compare)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/compare.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Comparators with support for types implementing the [@thi.ng/api `ICompare`](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/api/compare.ts) interface.

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/compare
```

Package sizes (gzipped): ESM: 0.2KB / CJS: 0.2KB / UMD: 0.3KB

## Dependencies

None

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### triple-query <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/triple-query/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/triple-query)

## API

[Generated API docs](https://docs.thi.ng/umbrella/compare/)

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

Karsten Schmidt

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
