<!-- This file is generated - DO NOT EDIT! -->

# ![rstream-csp](https://media.thi.ng/umbrella/banners/thing-rstream-csp.svg?3eb98532)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream-csp.svg)](https://www.npmjs.com/package/@thi.ng/rstream-csp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-csp.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Adapter bridge between async [CSP
channels](https://github.com/thi-ng/umbrella/tree/develop/packages/csp)
and synchronous stream subscriptions/transformations of
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream).

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=is%3Aissue+is%3Aopen+%5Brstream-csp%5D)

### Related packages

- [@thi.ng/csp](https://github.com/thi-ng/umbrella/tree/develop/packages/csp) - ES6 promise based CSP primitives & operations
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream) - Reactive streams & subscription primitives for constructing dataflow graphs / pipelines

## Installation

```bash
yarn add @thi.ng/rstream-csp
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/rstream-csp?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/rstream-csp/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 247 bytes / CJS: 302 bytes / UMD: 418 bytes

## Dependencies

- [@thi.ng/csp](https://github.com/thi-ng/umbrella/tree/develop/packages/csp)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

## API

[Generated API docs](https://docs.thi.ng/umbrella/rstream-csp/)

```ts
import * as rs from "@thi.ng/rstream";
import * as tx from "@thi.ng/transducers";
import { fromChannel } from "@thi.ng/rstream-csp";
import { Channel } from "@thi.ng/csp";

ch = new Channel();
stream = fromChannel(ch);

stream.subscribe(rs.trace("all"));
stream.subscribe(rs.trace("only evens"), tx.filter(tx.even));

ch.write(1);
// all 1

ch.write(2);
// all 2
// only evens 2

stream.subscribe(rs.trace("tentimes"), tx.map(x => x * 10));
// all 3
// tentimes 30
```

## Authors

Karsten Schmidt

## License

&copy; 2018 - 2020 Karsten Schmidt // Apache Software License 2.0
