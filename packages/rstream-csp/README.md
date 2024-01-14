<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/rstream-csp](https://media.thi.ng/umbrella/banners-20230807/thing-rstream-csp.svg?bd7725fd)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream-csp.svg)](https://www.npmjs.com/package/@thi.ng/rstream-csp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-csp.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This is a standalone project, maintained as part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and
anti-framework.

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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brstream-csp%5D+in%3Atitle)

## Related packages

- [@thi.ng/csp](https://github.com/thi-ng/umbrella/tree/develop/packages/csp) - ES6 promise based CSP primitives & operations
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream) - Reactive streams & subscription primitives for constructing dataflow graphs / pipelines

## Installation

```bash
yarn add @thi.ng/rstream-csp
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/rstream-csp"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const rstreamCsp = await import("@thi.ng/rstream-csp");
```

Package sizes (brotli'd, pre-treeshake): ESM: 247 bytes

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

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-rstream-csp,
  title = "@thi.ng/rstream-csp",
  author = "Karsten Schmidt",
  note = "https://thi.ng/rstream-csp",
  year = 2018
}
```

## License

&copy; 2018 - 2024 Karsten Schmidt // Apache License 2.0
