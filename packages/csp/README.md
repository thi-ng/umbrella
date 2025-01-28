<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/csp](https://media.thi.ng/umbrella/banners-20230807/thing-csp.svg?83a7775a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/csp.svg)](https://www.npmjs.com/package/@thi.ng/csp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/csp.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 201 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [What is CSP?](#what-is-csp)
  - [Buffering behaviors](#buffering-behaviors)
  - [Channels](#channels)
  - [Other channel types](#other-channel-types)
  - [Channel operators](#channel-operators)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Ping pong](#ping-pong)
  - [PubSub](#pubsub)
- [Authors](#authors)
- [License](#license)

## About

Primitives & operators for Communicating Sequential Processes based on async/await and async iterables.

> [!IMPORTANT]
> This package was temporarily deprecated (throughout most of 2023), but
> meanwhile has been **reanimated in the form of a complete rewrite**, using a
> new, more simple and more modern approach afforded by contemporary ES language
> features (and widespread support for them).
>
> **This new/current implementation is in most cases NOT compatible with earlier
> versions**.

### What is CSP?

References:

- [Wikipedia](https://en.wikipedia.org/wiki/Communicating_sequential_processes)
- [Communicating Sequential Processes, C.A.R.
Hoare](https://dl.acm.org/doi/pdf/10.1145/359576.359585)

The key construct of this package is a read/write channel primitive which can be
customized with different buffer implementations to control blocking behaviors
and backpressure handling (aka attempting to write faster to a channel than
values are being read, essentially a memory management issue). Unbuffered CSP
channels are blocking on both the reader and writer side.

### Buffering behaviors

The following channel buffer types/behaviors are included (from the
[thi.ng/buffers](https://github.com/thi-ng/umbrella/tree/develop/packages/buffers)
package), all accepting a max. capacity and all implementing the
[IReadWriteBuffer](https://docs.thi.ng/umbrella/buffers/interfaces/IReadWriteBuffer.html)
interface required by the channel:

- [`fifo`](https://docs.thi.ng/umbrella/buffers/functions/fifo.html): First in,
  first out ring buffer. Writes to the channel will start blocking once the
  buffer's capacity is reached, otherwise complete immediately. Likewise,
  channel reads are non-blocking whilst there're more buffered values available.
  Reads will only block if the buffer is empty.
- [`lifo`](https://docs.thi.ng/umbrella/buffers/functions/lifo.html): Last in,
  first out. Write behavior is the same as with `fifo`, reads are in reverse
  order (as the name indicates), i.e. the last value written will be the first
  value read (i.e. stack behavior).
- [`sliding`](https://docs.thi.ng/umbrella/buffers/functions/sliding.html):
  Sliding window ring buffer. Writes to the channel are **never** blocking!
  Whilst the buffer is at full capacity, new writes will first expunge the
  oldest buffered value (similar to [LRU
  cache](https://github.com/thi-ng/umbrella/blob/develop/packages/cache/README.md#lru)
  behavior). Read behavior is the same as for `fifo`.
- [`dropping`](https://docs.thi.ng/umbrella/buffers/functions/dropping.html):
  Dropping value ring buffer. Writes to the channel are **never** blocking!
  Whilst the buffer is at full capacity, new writes will be silently ignored.
  Read behavior is the same as for `fifo`.

### Channels

As mentioned previously,
[channels](https://docs.thi.ng/umbrella/csp/functions/channel.html) and their
[read](https://docs.thi.ng/umbrella/csp/classes/Channel.html#read),
[write](https://docs.thi.ng/umbrella/csp/classes/Channel.html#write) and
[close](https://docs.thi.ng/umbrella/csp/classes/Channel.html#close) operations
are the key building blocks for CSP.

### Other channel types

- [`Mult`](https://docs.thi.ng/umbrella/csp/classes/Mult.html) for channel
  multiplexing (aka one-to-many splitting) and dynamic add/removal of
  subscribers
- [`PubSub`](https://docs.thi.ng/umbrella/csp/classes/PubSub.html) for
  topic-based subscriptions, each topic implemented as a `Mult`

### Channel operators

- [`broadcast()`](https://docs.thi.ng/umbrella/csp/functions/broadcast.html)
- [`channel()`](https://docs.thi.ng/umbrella/csp/functions/channel.html)
- [`concat()`](https://docs.thi.ng/umbrella/csp/functions/concat.html)
- [`consume()`](https://docs.thi.ng/umbrella/csp/functions/consume.html)
- [`consumeWith()`](https://docs.thi.ng/umbrella/csp/functions/consumeWith.html)
- [`drain()`](https://docs.thi.ng/umbrella/csp/functions/drain.html)
- [`fromAsyncIterable()`](https://docs.thi.ng/umbrella/csp/functions/fromAsyncIterable.html)
- [`into()`](https://docs.thi.ng/umbrella/csp/functions/into.html)
- [`merge()`](https://docs.thi.ng/umbrella/csp/functions/merge.html)
- [`mult()`](https://docs.thi.ng/umbrella/csp/functions/mult.html)
- [`pipe()`](https://docs.thi.ng/umbrella/csp/functions/pipe.html)
- [`pubsub()`](https://docs.thi.ng/umbrella/csp/functions/pubsub.html)
- [`select()`](https://docs.thi.ng/umbrella/csp/functions/select.html)
- [`timeout()`](https://docs.thi.ng/umbrella/csp/functions/timeout.html)

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

Package sizes (brotli'd, pre-treeshake): ESM: 1.78 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/buffers](https://github.com/thi-ng/umbrella/tree/develop/packages/buffers)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                     | Description                                                                  | Live demo                                     | Source                                                                     |
|:---------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------|:----------------------------------------------|:---------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/csp-bus.png" width="240"/> | CSP channel-based event handling, async transducers & reactive UI components | [Demo](https://demo.thi.ng/umbrella/csp-bus/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/csp-bus) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/csp/)

### Ping pong

```ts tangle:export/readme-pingpong.ts
import { channel } from "@thi.ng/csp";

// create CSP channel for bi-directional communication
const chan = channel<number>();

// create first async process (ping)
(async () => {
    while (true) {
        // this op will block until a value becomes available in the channel
        const x = await chan.read();
        // if the channel was closed meanwhile, read() will deliver `undefined`
        if (x === undefined || x > 5) {
            console.log("stopping...");
            // calling close() is idempotent
            // any in-flight writes will still be readable
            chan.close();
            break;
        }
        console.log("ping", x);
        // this op will also block until the other side is reading the value
        await chan.write(x + 1);
    }
    console.log("ping done");
})();

// create second async process (pong, almost identical to ping)
(async () => {
    while (true) {
        // wait until value can be read (or channel closed)
        const x = await chan.read();
        // exit loop if channel closed
        if (x === undefined) break;
        console.log("pong", x);
        // write next value & wait until other side read it
        await chan.write(x + 1);
    }
    console.log("pong done");
})();

// kickoff
chan.write(0);

// ping 0
// pong 1
// ping 2
// pong 3
// ping 4
// pong 5
// stopping...
// ping done
// pong done
```

### PubSub

```ts tangle:export/readme-pubsub.ts
import { channel, consumeWith, into, pubsub } from "@thi.ng/csp";

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

// start processing by feeding an iterable of names
await into(src, ["alice", "bert", "bella", "charlie", "arthur"]);

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

&copy; 2016 - 2025 Karsten Schmidt // Apache License 2.0
