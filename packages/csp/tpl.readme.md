# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

- `Channel` with/without buffering and/or
  [transducers](https://github.com/thi-ng/umbrella/blob/develop/packages/transducers)
  - optional channel IDs
  - choice of buffer behaviors (fixed, sliding, dropping)
  - channel selection
  - channel merging (many-to-one, serial or parallel)
  - channel piping (w/ transducers)
  - timeouts / sleeping / throttling / delaying
  - prepopulated channel ctors (iterators, ranges, promise, constants etc.)
- `Mult` for channel multiplexing (one-to-many splitting)
  - individual transducers per tap
  - dynamic add/removal of taps
- `PubSub` for topic subscriptions
  - each topic implemented as `Mult`
  - wildcard topic for processing fallthrough messages

${status}

This package might possibly become deprecated soon. See
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
for a similar, but alternative (and actively maintained) approach.

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

### File loading & word frequency analysis

```ts
import { Channel } from "@thi.ng/csp";
import * as tx from "@thi.ng/transducers";

// compose transducer to split source file into words
// and filter out short strings
const proc: tx.Transducer<string, string> = tx.comp(
    tx.mapcat((src: string) => src.toLowerCase().split(/[^\w]+/g)),
    tx.filter((w: string) => w.length > 1)
);

// define a channel which receives file paths
// and resolves them with their contents
const paths = new Channel<any>(
    tx.map((path: string) =>
        new Promise<string>(
            resolve => fs.readFile(path, (_, data) => resolve(data.toString()))
        )
    )
);

// define multiplexed output channel
// items in this channel will have this form: `[word, count]`
const results = new Mult("results");

// tap result channel and sum word counts
const counter = results
    .tap(tx.map(x => x[1]))
    .reduce(tx.add());

// 2nd output channel with streaming sort transducer
// (using a sliding window size of 500 items) and dropping
// words with < 20 occurrences
const sorted = results.tap(
    tx.comp(
        tx.streamSort(500, x => x[1]),
        tx.dropWhile(x => x[1] < 20)
    )
);

// define workflow:
// pipe source files into a new channel and
// reduce this channel using `frequencies` reducer
// finally stream the result map (word frequencies)
// into the `sorted` channel
// (`freqs` is a JS Map and is iterable)
paths.pipe(proc)
    .reduce(tx.frequencies())
    .then(freqs => results.channel().into(freqs));

// start tracing sorted outputs and
// wait for all to finish
Promise
    .all([sorted.consume(), counter])
    .then(([_, num]) => console.log("total words:", num));

// no real work has been executed thus far (only scheduled via promises)
// now kick off entire process by writing file paths into the 1st channel
paths.into(["src/channel.ts", "src/mult.ts", "src/pubsub.ts"]);

// results-tap1 : [ 'let', 20 ]
// results-tap1 : [ 'topic', 20 ]
// results-tap1 : [ 'chan', 20 ]
// results-tap1 : [ 'number', 22 ]
// results-tap1 : [ 'buf', 23 ]
// results-tap1 : [ 'length', 23 ]
// results-tap1 : [ 'tx', 25 ]
// results-tap1 : [ 'state', 25 ]
// results-tap1 : [ 'from', 27 ]
// results-tap1 : [ 'close', 28 ]
// results-tap1 : [ 'new', 33 ]
// results-tap1 : [ 'args', 34 ]
// results-tap1 : [ 'id', 36 ]
// results-tap1 : [ 'any', 36 ]
// results-tap1 : [ 'src', 38 ]
// results-tap1 : [ 'if', 40 ]
// results-tap1 : [ 'return', 47 ]
// results-tap1 : [ 'channel', 57 ]
// results-tap1 : [ 'this', 120 ]
// results-tap1 done
// total words: 1607
```

### Channel merging

```ts
Channel.merge([
    Channel.range(0, 3),
    Channel.range(10, 15),
    Channel.range(100, 110)
]).reduce(tx.push()).then(console.log);

// [ 0, 100, 101, 102, 103, 1, 2, 104, 105, 10, 11, 12, 13, 106, 14, 107, 108, 109 ]

// emit tuples of values read from all inputs
// preserves ordering of all inputs, but
// throughput controlled by slowest input
// by default stops & closes when any of the inputs closes
Channel.mergeTuples([
    Channel.from([1, 2, 3]),
    Channel.from([10, 20, 30, 40]),
    Channel.from([100, 200, 300, 400, 500])
], null, false).consume();

// chan-3 : [ 1, 10, 100 ]
// chan-3 : [ 2, 20, 200 ]
// chan-3 : [ 3, 30, 300 ]
// chan-3 done

// same as above, however continues until all inputs are closed
Channel.mergeTuples([
    Channel.from([1, 2, 3]),
    Channel.from([10, 20, 30, 40]),
    Channel.from([100, 200, 300, 400, 500])
], null, false).consume();

// chan-3 : [ 1, 10, 100 ]
// chan-3 : [ 2, 20, 200 ]
// chan-3 : [ 3, 30, 300 ]
// chan-3 : [ undefined, 40, 400 ]
// chan-3 : [ undefined, undefined, 500 ]
// chan-3 done
```

### PubSub

```ts
// define a channel publisher with transducer and topic function applied to each item
// the input channel receives names and transforms them into indexable objects
const pub = new PubSub(
    new Channel<any>("users", tx.map((x: string) => ({ type: x.charAt(0), val: x }))),
    (x) => x.type
);

// create subscriptions (channel + debug consumer)
// under the hood each topic is a Mult (multiplexed channel)
// sub channels are automatically named:
// `<src-id>-<topic>-tap<tapid>` (see below)
for (let i of "abc") {
    pub.sub(i).consume();
}

// start processing, then close everything down
// (pubsubs & mults are closed recursively once the input channel is closed)
pub.channel().into(["alice", "bert", "bella", "charlie", "arthur"]);

// users-a-tap0 : { type: 'a', val: 'alice' }
// users-b-tap0 : { type: 'b', val: 'bert' }
// users-b-tap0 : { type: 'b', val: 'bella' }
// users-c-tap0 : { type: 'c', val: 'charlie' }
// users-a-tap0 : { type: 'a', val: 'arthur' }
// users-b-tap0 done
// users-c-tap0 done
// users-a-tap0 done
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
