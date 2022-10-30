# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

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

TODO

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
