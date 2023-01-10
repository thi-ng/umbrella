<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/vclock](https://media.thi.ng/umbrella/banners-20220914/thing-vclock.svg?e0e7fcc5)

[![npm version](https://img.shields.io/npm/v/@thi.ng/vclock.svg)](https://www.npmjs.com/package/@thi.ng/vclock)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/vclock.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Vector clock functions for synchronizing distributed states & processes.

[Vector clock algorithm](https://en.wikipedia.org/wiki/Vector_clock):

- Initially all clocks are zero.
- Each time a process experiences an internal event, it increments its own
  logical clock in the vector by one (`inc()`).
- Each time a process sends a message, it increments its own logical clock in
  the vector by one and then sends a copy of its own vector.
- Each time a process receives a message, it increments its own logical clock in
  the vector by one and updates each element in its vector by taking the maximum
  of the value in its own vector clock and the value in the vector in the
  received message (`merge()`).

The package provides the following **immutable** vector clock operations, where
vector clocks are plain JS objects:

- `inc(clock, id)` - increment (or create) clock component
- `remove(clock, id)` - remove clock component
- `merge(a, b)` - merge two vector clocks
- `signedSkew(a, b)` - max signed difference between vector clocks
- `absSkew(a, b)` - max unsigned difference between vector clocks
- `compare(a, b)` - comparator for logically ordering vector clocks
- `isBefore(a, b)` - true if a < b
- `isAfter(a, b)` - true if a > b
- `isConcurrent(a, b)` - if both clocks represent concurrent updates
- `equiv(a, b)` - equality predicate
- `orderAsc(a, b)` - alias for `compare()`
- `orderDesc(a, b)` - reverse order to `orderAsc()`

References:

- [Wikipedia](https://en.wikipedia.org/wiki/Vector_clock)
- [Princeton COS 418: Distributed Systems](https://www.cs.princeton.edu/courses/archive/fall18/cos418/schedule.html)
    - [Lecture 4](https://www.cs.princeton.edu/courses/archive/fall17/cos418/docs/L4-vc.pdf)
    - [Lecture 5](https://www.cs.princeton.edu/courses/archive/fall17/cos418/docs/L5-vc.pdf)
- [F. Mattern: Virtual Time and Global States of Distributed Systems](https://www.vs.inf.ethz.ch/publ/papers/VirtTimeGlobStates.pdf)
- [P. Krzyzanowski: Clock synchronization](http://soft.vub.ac.be/~tvcutsem/distsys/clocks.pdf)
- [L. Lamport](http://lamport.azurewebsites.net/pubs/time-clocks.pdf)
- [Akka docs](http://api.getakka.net/docs/stable/html/8D0C3FFF.htm)

## Status

**BETA** - possibly breaking changes forthcoming

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bvclock%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/vclock
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/vclock"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const vclock = await import("@thi.ng/vclock");
```

Package sizes (brotli'd, pre-treeshake): ESM: 432 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## API

[Generated API docs](https://docs.thi.ng/umbrella/vclock/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-vclock,
  title = "@thi.ng/vclock",
  author = "Karsten Schmidt",
  note = "https://thi.ng/vclock",
  year = 2018
}
```

## License

&copy; 2018 - 2023 Karsten Schmidt // Apache License 2.0
