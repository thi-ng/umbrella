<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

<!-- include ../../assets/tpl/footer.md -->
