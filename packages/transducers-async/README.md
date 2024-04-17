<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/transducers-async](https://media.thi.ng/umbrella/banners-20230807/thing-transducers-async.svg?79bab852)

[![npm version](https://img.shields.io/npm/v/@thi.ng/transducers-async.svg)](https://www.npmjs.com/package/@thi.ng/transducers-async)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/transducers-async.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 192 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Evaluators](#evaluators)
  - [Iterators](#iterators)
  - [Transducers](#transducers)
  - [Reducers](#reducers)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Async versions of various highly composable transducers, reducers and iterators. This is a support package for [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers).

### Evaluators

- [`iterator()`](https://docs.thi.ng/umbrella/transducers-async/functions/iterator.html)
- [`reduce()`](https://docs.thi.ng/umbrella/transducers-async/functions/reduce.html)
- [`run()`](https://docs.thi.ng/umbrella/transducers-async/functions/run.html)
- [`step()`](https://docs.thi.ng/umbrella/transducers-async/functions/step.html)
- [`transduce()`](https://docs.thi.ng/umbrella/transducers-async/functions/transduce.html)

### Iterators

- [`concat()`](https://docs.thi.ng/umbrella/transducers-async/functions/concat.html)
- [`events()`](https://docs.thi.ng/umbrella/transducers-async/functions/events.html)
- [`merge()`](https://docs.thi.ng/umbrella/transducers-async/functions/merge.html)
- [`raf()`](https://docs.thi.ng/umbrella/transducers-async/functions/raf.html)
- [`range()`](https://docs.thi.ng/umbrella/transducers-async/functions/range.html)
- [`repeatedly()`](https://docs.thi.ng/umbrella/transducers-async/functions/repeatedly.html)
- [`sidechain()`](https://docs.thi.ng/umbrella/transducers-async/functions/sidechain.html)
- [`sync()`](https://docs.thi.ng/umbrella/transducers-async/functions/sync.html)
- [`zip()`](https://docs.thi.ng/umbrella/transducers-async/functions/zip.html)

### Transducers

- [`comp()`](https://docs.thi.ng/umbrella/transducers-async/functions/comp.html)
- [`filter()`](https://docs.thi.ng/umbrella/transducers-async/functions/filter.html)
- [`map()`](https://docs.thi.ng/umbrella/transducers-async/functions/map.html)
- [`mapcat()`](https://docs.thi.ng/umbrella/transducers-async/functions/mapcat.html)
- [`multiplex()`](https://docs.thi.ng/umbrella/transducers-async/functions/multiplex.html)
- [`multiplexObj()`](https://docs.thi.ng/umbrella/transducers-async/functions/multiplexObj.html)
- [`take()`](https://docs.thi.ng/umbrella/transducers-async/functions/take.html)
- [`throttle()`](https://docs.thi.ng/umbrella/transducers-async/functions/throttle.html)
- [`throttleTime()`](https://docs.thi.ng/umbrella/transducers-async/functions/throttleTime.html)

### Reducers

- [`push()`](https://docs.thi.ng/umbrella/transducers-async/functions/push.html)

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btransducers-async%5D+in%3Atitle)

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

Package sizes (brotli'd, pre-treeshake): ESM: 2.82 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/transducers-async/)

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

&copy; 2018 - 2024 Karsten Schmidt // Apache License 2.0
