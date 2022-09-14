<!-- This file is generated - DO NOT EDIT! -->

# ![router](https://media.thi.ng/umbrella/banners-20220914/thing-router.svg?dab0894a)

[![npm version](https://img.shields.io/npm/v/@thi.ng/router.svg)](https://www.npmjs.com/package/@thi.ng/router)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/router.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Generic router for browser & non-browser based applications.

- Declarative route definitions
- Parametric routes, each param with optional value coercion &
  validation
- Route authentication handler to enable/disable routes based on other
  state factors
- Fallback route
- Enforced initial route (optional)
- Route formatting (with params)
- HTML5 history & hash fragment support

Partially based on the Clojure implementation in
[thi.ng/domus](https://github.com/thi-ng/domus/blob/develop/src/router.org).

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brouter%5D+in%3Atitle)

### Related packages

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) - Lightweight, reactive, VDOM-less UI/DOM components with async lifecycle and [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) compatible

## Installation

```bash
yarn add @thi.ng/router
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/router"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const router = await import("@thi.ng/router");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.54 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [tslib](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                           | Description                                             | Live demo                                           | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/router-basics.jpg" width="240"/> | Complete mini SPA app w/ router & async content loading | [Demo](https://demo.thi.ng/umbrella/router-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/router-basics) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/router/)

```ts
import { HTMLRouter, EVENT_ROUTE_CHANGED } from "@thi.ng/router";

// router configuration
const config = {

    // use hash fragment for routes
    useFragment: true,

    // fallback route (when no other matches)
    defaultRouteID: "home",

    // optional enforced route when router starts
    initialRouteID: "home",

    // Optional route path component separator. Default: `/`
    separator: "/",

    // Route prefix. Default: `/` (or `#/` if `useFragment` is enabled).
    // All routes to be parsed by `route()` are assumed to have this prefix.
    // All routes returned by `format()` will include this prefix.
    prefix: "#/",

    // actual route defs
    // these are checked in given order
    // IMPORTANT: rules with common prefixes MUST be specified in
    // order of highest precision / longest path
    routes: [
        {
            // each route MUST have an ID
            id: "home",
            // optional title for UI purposes (no internal function)
            title: "Home page",
            // this array defines the route path items
            match: ["home"]
        },
        {
            id: "user-profile",
            // this rule is parametric
            // variable items are prefixed with `?`
            match: ["users", "?id"],
            // coercion & validation handlers for "?id" param
            // coercion fn is applied BEFORE validator
            validate: {
                id: {
                    coerce: (x) => parseInt(x),
                    check: (x)=> x > 0 && x < 100
                }
            }
        },
        {
            id: "image",
            // this route has 2 params and matches (for example):
            // "/images/07a9d87b-c07a-42e3-82cf-baea2f94facc/xl"
            match: ["images", "?id", "?size"],
            validate: {
                id: {
                    check: (x)=> isUUID(x)
                },
                size: {
                    check: (x)=> /^(s|m|l|xl)$/.test(x)
                }
            },
            // enable auth for this route
            // (see info about authenticator functions below)
            auth: true
        },
        {
            id: "group-list",
            // matches only: "/users" or "/images"
            match: ["?type"],
            validate: {
                type: {
                    check: (x) => /^(users|images)$/.test(x)
                }
            },
            auth: true
        },
    ]
};

// `HTMLRouter` ONLY works in browser environments
// for non-browser use cases use `BasicRouter`
const router = new HTMLRouter(config);
router.addListener(EVENT_ROUTE_CHANGED, console.log);

router.start();
```

## Authors

Karsten Schmidt

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

&copy; 2014 - 2022 Karsten Schmidt // Apache Software License 2.0
