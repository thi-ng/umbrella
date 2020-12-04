# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

Adapter bridge between async [CSP
channels](https://github.com/thi-ng/umbrella/tree/develop/packages/csp)
and synchronous stream subscriptions/transformations of
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream).

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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
