<!-- This file is generated - DO NOT EDIT! -->

# ![wasm-api-timer](https://media.thi.ng/umbrella/banners-20220914/thing-wasm-api-timer.svg?672e1920)

[![npm version](https://img.shields.io/npm/v/@thi.ng/wasm-api-timer.svg)](https://www.npmjs.com/package/@thi.ng/wasm-api-timer)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/wasm-api-timer.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

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

Delayed & scheduled function execution (via setTimeout() etc.) for hybrid WASM apps. This is a support package for [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api).

The package provides a WASM bridge API and abstraction for:

- **once**: `setTimeout()` / `clearTimeout()`
- **interval**: `setInterval()` / `clearInterval()`
- **immediate**: `setImmediate()` / `clearImmediate()`

These different types of delayed execution are exposed via the single
`setTimeout()` function and the `TimerType` enum:

Zig example:

```zig
const timer = @import("timer");

// ...

// initialize API module
try timer.init(allocator);

// schedule a single/one-off callback 500ms in the future
const listenerID = try timer.setTimeout(
	&.{ .callback = onTimer, .ctx = self },
	500,
	.once
);

// or maybe cancel it again
timer.cancelTimeout(listenerID);
```

Also see
[zig-counter](https://github.com/thi-ng/umbrella/blob/develop/examples/zig-counter/)
example project for futher usage...

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwasm-api-timer%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/wasm-api-timer
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/wasm-api-timer"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const wasmApiTimer = await import("@thi.ng/wasm-api-timer");
```

Package sizes (gzipped, pre-treeshake): ESM: 442 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api)

## API

[Generated API docs](https://docs.thi.ng/umbrella/wasm-api-timer/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-wasm-api-timer,
  title = "@thi.ng/wasm-api-timer",
  author = "Karsten Schmidt",
  note = "https://thi.ng/wasm-api-timer",
  year = 2022
}
```

## License

&copy; 2022 Karsten Schmidt // Apache Software License 2.0
