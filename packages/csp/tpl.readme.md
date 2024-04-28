<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package was temporarily deprecated (throughout most of 2023), but meanwhile
has been **reanimated in the form of a complete rewrite**, using a new, more
simple and more modern approach afforded by contemporary ES language features
(and widespread support for them).

**This new/current implementation is in most cases NOT compatible with earlier
versions**.

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

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

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

<!-- include ../../assets/tpl/footer.md -->
