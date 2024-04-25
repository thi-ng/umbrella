<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/csp](https://media.thi.ng/umbrella/banners-20230807/thing-csp.svg?dd2a4b97)

[![npm version](https://img.shields.io/npm/v/@thi.ng/csp.svg)](https://www.npmjs.com/package/@thi.ng/csp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/csp.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 192 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [PubSub](#pubsub)
- [Authors](#authors)
- [License](#license)

## About

Primitives & operators for Communicating Sequential Processes based on async/await and async iterables.

This package was temporarily deprecated (throughout most of 2023), but meanwhile
has been reanimated in the form of a **complete rewrite**, using a new, more
simple and more modern approach afforded by contemporary ES language features
(and widespread support for them).

**This new/current implementation is in most cases NOT compatible with earlier
versions**.

Provided are:

- [CSP `Channel`
  primitive](https://docs.thi.ng/umbrella/csp/classes/Channel.html) supporting a
  choice of buffer behaviors (fifo, sliding, dropping, see
  [thi.ng/buffers](https://github.com/thi-ng/umbrella/blob/develop/packages/buffers)
  for options)
- Composable channel operators (see list below)
- [`Mult`](https://docs.thi.ng/umbrella/csp/classes/Mult.html) for channel
  multiplexing (one-to-many splitting) and dynamic add/removal of subscribers
- [`PubSub`](https://docs.thi.ng/umbrella/csp/classes/PubSub.html) for
  topic-based subscriptions, each topic implemented as `Mult`

## Status

**BETA** - possibly breaking changes forthcoming

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcsp%5D+in%3Atitle)

## Related packages

- [@thi.ng/fibers](https://github.com/thi-ng/umbrella/tree/develop/packages/fibers) - Process hierarchies & operators for cooperative multitasking
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream) - Reactive streams & subscription primitives for constructing dataflow graphs / pipelines
- [@thi.ng/transducers-async](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-async) - Async versions of various highly composable transducers, reducers and iterators

## Installation

```bash
yarn add @thi.ng/csp
```

ESM import:

```ts
import * as csp from "@thi.ng/csp";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/csp"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const csp = await import("@thi.ng/csp");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.77 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/buffers](https://github.com/thi-ng/umbrella/tree/develop/packages/buffers)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/csp/)

### PubSub

```ts tangle:export/readme-pubsub.ts
import { channel, consumeWith, pubsub } from "@thi.ng/csp";

// input channel (optional)
const src = channel<string>({ id: "users" });

// publisher with a topic function
// (topic here is the first character of each received string)
const pub = pubsub<string>(src, (x) => x[0]);

// create topic subscriptions (channel & debug consumer)
// under the hood each topic is a Mult (multiplexed channel)
// subscription channels are automatically named:
// `<src-id>-<topic>-tap<tapid>` (see below)
for (let i of "abc") {
    consumeWith(pub.subscribeTopic(i), (x, ch) => console.log(ch.id, x));
}

// start processing
for (let x of ["alice", "bert", "bella", "charlie", "arthur"]) {
    await src.write(x);
}
// users-a-tap0 alice
// users-b-tap1 bert
// users-b-tap1 bella
// users-c-tap2 charlie
// users-a-tap0 arthur

// pubsubs & mults are closed recursively once we close the input channel
src.close();
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-csp,
  title = "@thi.ng/csp",
  author = "Karsten Schmidt",
  note = "https://thi.ng/csp",
  year = 2016
}
```

## License

&copy; 2016 - 2024 Karsten Schmidt // Apache License 2.0
