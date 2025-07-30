<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/router](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-router.svg?995fe7f7)

[![npm version](https://img.shields.io/npm/v/@thi.ng/router.svg)](https://www.npmjs.com/package/@thi.ng/router)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/router.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
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
- [Usage examples](#usage-examples)
- [API](#api)
- [Benchmarks](#benchmarks)
- [Authors](#authors)
- [License](#license)

## About

Generic trie-based router with support for wildcards, route param validation/coercion, auth.

- **Not bound to any environment**, usable on both client & server side
- Declarative route definitions, incl. [wildcards for matching rest
  args](https://docs.thi.ng/umbrella/router/classes/Trie.html)
- Parametric routes, each param with optional value coercion & validation
- Route authentication handler to enable/disable routes based on other state
  factors
- Fallback route redirect
- Enforced initial route (optional)
- Route formatting (with params & rest args)
- Optional HTML5 history & hash fragment support

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brouter%5D+in%3Atitle)

## Related packages

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) - Lightweight, reactive, VDOM-less UI/DOM components with async lifecycle and [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) compatible

## Installation

```bash
yarn add @thi.ng/router
```

ESM import:

```ts
import * as rou from "@thi.ng/router";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/router"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

Package sizes (brotli'd, pre-treeshake): ESM: 1.94 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Two projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                           | Description                                             | Live demo                                           | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-router.jpg" width="240"/>   | Basic thi.ng/router usage with thi.ng/rdom components   | [Demo](https://demo.thi.ng/umbrella/rdom-router/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-router)   |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/router-basics.jpg" width="240"/> | Complete mini SPA app w/ router & async content loading | [Demo](https://demo.thi.ng/umbrella/router-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/router-basics) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/router/)

```ts tangle:export/readme.ts
import {
    HTMLRouter, HTMLRouterOpts, EVENT_ROUTE_CHANGED,
} from "@thi.ng/router";
import { isUUID } from "@thi.ng/checks";

// router configuration
const config: HTMLRouterOpts = {
    // use hash fragment for routes
    useFragment: true,

    // fallback route (when no other matches)
    default: "home",

    // optional enforced route when router starts
    initial: "home",

    // Optional route path component separator. Default: `/`
    separator: "/",

    // Route prefix. Default: `/` (or `#/` if `useFragment` is enabled).
    // All routes to be parsed by `route()` are assumed to have this prefix.
    // All routes returned by `format()` will include this prefix.
    prefix: "#/",

    // actual route defs
    // An array of route specs which route input strings will be matched against.
    // Given routes will be pre-processed and stored in a Trie for fast matching.
    // Additional routes can be dynamically added at a later time via .addRoutes()
    routes: [
        {
            // each route MUST have an ID
            id: "home",
            // this array defines the route path items
            match: "/home",
        },
        {
            id: "user-profile",
            // this rule is parametric
            // variable items are prefixed with `?`
            match: "/users/?id",
            // coercion & validation handlers for "?id" param
            // coercion fn is applied BEFORE validator
            validate: {
                id: {
                    coerce: (x) => parseInt(x),
                    check: (x) => x > 0 && x < 100,
                },
            },
        },
        {
            id: "image",
            // this route has 2 params and matches (for example):
            // "/images/07a9d87b-c07a-42e3-82cf-baea2f94facc/xl"
            match: "/images/?id/?size",
            validate: {
                id: {
                    check: (x) => isUUID(x),
                },
                size: {
                    check: (x) => /^(s|m|l|xl)$/.test(x),
                },
            },
        },
        {
            id: "group-list",
            // matches only: "/users" or "/images"
            match: "/?type",
            validate: {
                type: {
                    check: (x) => /^(users|images)$/.test(x),
                },
            },
        },
    ],
};

// `HTMLRouter` ONLY works in browser environments
// for non-browser use cases use `Router`
const router = new HTMLRouter(config);
router.addListener(EVENT_ROUTE_CHANGED, console.log);

router.start();
```

## Benchmarks

The below benchmarks are ported from
[router-benchmark](https://github.com/delvedor/router-benchmark), showing
**highly competitive** results for this package. The
[benchmark](https://github.com/thi-ng/umbrella/blob/develop/packages/router/bench/index.ts)
itself can be run from the repo root like so:

```bash
bun packages/router/bench/index.ts
```

```text
benchmarking: short static
        warmup... 133.48ms (0.1 runs)
        total: 113.79ms, runs: 1 (@ 1 calls/iter)
        freq: 8788202.11 ops/sec

benchmarking: static with same radix
        warmup... 166.98ms (0.1 runs)
        total: 161.89ms, runs: 1 (@ 1 calls/iter)
        freq: 6176873.20 ops/sec

benchmarking: dynamic route
        warmup... 378.30ms (0.1 runs)
        total: 374.80ms, runs: 1 (@ 1 calls/iter)
        freq: 2668082.83 ops/sec

benchmarking: mixed static dynamic
        warmup... 344.19ms (0.1 runs)
        total: 340.33ms, runs: 1 (@ 1 calls/iter)
        freq: 2938310.18 ops/sec

benchmarking: long static
        warmup... 326.61ms (0.1 runs)
        total: 327.84ms, runs: 1 (@ 1 calls/iter)
        freq: 3050259.51 ops/sec

benchmarking: wildcard
        warmup... 207.84ms (0.1 runs)
        total: 207.49ms, runs: 1 (@ 1 calls/iter)
        freq: 4819484.22 ops/sec

benchmarking: all together
        warmup... 1525.05ms (0.1 runs)
        total: 1532.24ms, runs: 1 (@ 1 calls/iter)
        freq: 652640.66 ops/sec
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-router,
  title = "@thi.ng/router",
  author = "Karsten Schmidt",
  note = "https://thi.ng/router",
  year = 2014
}
```

## License

&copy; 2014 - 2025 Karsten Schmidt // Apache License 2.0
