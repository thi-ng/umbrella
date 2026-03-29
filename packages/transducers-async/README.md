<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/transducers-async](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-transducers-async.svg?1156f965)

[![npm version](https://img.shields.io/npm/v/@thi.ng/transducers-async.svg)](https://www.npmjs.com/package/@thi.ng/transducers-async)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/transducers-async.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
  - [Evaluators](#evaluators)
  - [Generators & iterators](#generators--iterators)
  - [Combinators](#combinators)
  - [Transducers](#transducers)
  - [Reducers](#reducers)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Async versions of various highly composable transducers, reducers and iterators. This is a support package for [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers).

### Evaluators

- [`iterator()`](https://docs.thi.ng/umbrella/transducers-async/functions/iterator.html)
- [`reduce()`](https://docs.thi.ng/umbrella/transducers-async/functions/reduce.html)
- [`run()`](https://docs.thi.ng/umbrella/transducers-async/functions/run.html)
- [`step()`](https://docs.thi.ng/umbrella/transducers-async/functions/step.html)
- [`transduce()`](https://docs.thi.ng/umbrella/transducers-async/functions/transduce.html)

### Generators & iterators

- [`asAsyncIterable()`](https://docs.thi.ng/umbrella/transducers-async/functions/asAsyncIterable.html)
- [`concat()`](https://docs.thi.ng/umbrella/transducers-async/functions/concat.html)
- [`events()`](https://docs.thi.ng/umbrella/transducers-async/functions/events.html)
- [`raf()`](https://docs.thi.ng/umbrella/transducers-async/functions/raf.html)
- [`range()`](https://docs.thi.ng/umbrella/transducers-async/functions/range.html)
- [`repeatedly()`](https://docs.thi.ng/umbrella/transducers-async/functions/repeatedly.html)
- [`sidechain()`](https://docs.thi.ng/umbrella/transducers-async/functions/sidechain.html)
- [`source()`](https://docs.thi.ng/umbrella/transducers-async/functions/source.html)
- [`zip()`](https://docs.thi.ng/umbrella/transducers-async/functions/zip.html)

### Combinators

- [`merge()`](https://docs.thi.ng/umbrella/transducers-async/functions/merge.html)
- [`mult()`](https://docs.thi.ng/umbrella/transducers-async/functions/mult.html)
- [`pubsub()`](https://docs.thi.ng/umbrella/transducers-async/functions/pubsub.html)
- [`sync()`](https://docs.thi.ng/umbrella/transducers-async/functions/sync.html)
- [`syncRAF()`](https://docs.thi.ng/umbrella/transducers-async/functions/syncRAF.html)

### Transducers

- [`comp()`](https://docs.thi.ng/umbrella/transducers-async/functions/comp.html)
- [`filter()`](https://docs.thi.ng/umbrella/transducers-async/functions/filter.html)
- [`map()`](https://docs.thi.ng/umbrella/transducers-async/functions/map.html)
- [`mapcat()`](https://docs.thi.ng/umbrella/transducers-async/functions/mapcat.html)
- [`multiplex()`](https://docs.thi.ng/umbrella/transducers-async/functions/multiplex.html)
- [`multiplexObj()`](https://docs.thi.ng/umbrella/transducers-async/functions/multiplexObj.html)
- [`partition()`](https://docs.thi.ng/umbrella/transducers-async/functions/partition.html)
- [`take()`](https://docs.thi.ng/umbrella/transducers-async/functions/take.html)
- [`throttle()`](https://docs.thi.ng/umbrella/transducers-async/functions/throttle.html)
- [`throttleTime()`](https://docs.thi.ng/umbrella/transducers-async/functions/throttleTime.html)

### Reducers

- [`push()`](https://docs.thi.ng/umbrella/transducers-async/functions/push.html)

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Btransducers-async%5D)

## Related packages

- [@thi.ng/csp](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/csp) - Primitives & operators for Communicating Sequential Processes based on async/await and async iterables
- [@thi.ng/fibers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/fibers) - Process hierarchies & operators for cooperative multitasking
- [@thi.ng/rstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream) - Reactive streams & subscription primitives for constructing dataflow graphs / pipelines

## Installation

```bash
yarn add @thi.ng/transducers-async
```

ESM import:

```ts
import * as txa from "@thi.ng/transducers-async";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/transducers-async"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const txa = await import("@thi.ng/transducers-async");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.25 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/buffers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/buffers)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/compose](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/compose)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/timestamp](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/timestamp)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Two projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                             | Description                                                                  | Live demo                                        | Source                                                                                |
|:-----------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------|:-------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/csp-bus.png" width="240"/> | CSP channel-based event handling, async transducers & reactive UI components | [Demo](https://demo.thi.ng/umbrella/csp-bus/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/csp-bus)    |
|                                                                                                                        | Basic & barebones usage of async iterables in thi.ng/rdom                    | [Demo](https://demo.thi.ng/umbrella/rdom-async/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rdom-async) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/transducers-async/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-transducers-async,
  title = "@thi.ng/transducers-async",
  author = "Karsten Schmidt",
  note = "https://thi.ng/transducers-async",
  year = 2018
}
```

## License

&copy; 2018 - 2026 Karsten Schmidt // Apache License 2.0
