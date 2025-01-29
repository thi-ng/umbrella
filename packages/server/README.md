<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/server](https://media.thi.ng/umbrella/banners-20230807/thing-server.svg?ab80455e)

[![npm version](https://img.shields.io/npm/v/@thi.ng/server.svg)](https://www.npmjs.com/package/@thi.ng/server)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/server.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 201 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Main features](#main-features)
  - [Interceptors](#interceptors)
    - [Available interceptors](#available-interceptors)
    - [Custom interceptors](#custom-interceptors)
    - [Using interceptors](#using-interceptors)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Usage example](#usage-example)
- [Authors](#authors)
- [License](#license)

## About

Minimal HTTP server with declarative routing, static file serving and freely extensible via pre/post interceptors.

The [`Server`](https://docs.thi.ng/umbrella/server/classes/Server.html) provides
a thin veneer around the standard `node:http` / `node:https` default server
implementations.

### Main features

- Declarative & parametric routing (incl. validation and coercion of route
params)
- Multiple HTTP methods per route
- Composable & customizable interceptors (global for all routes and/or for
  indidual routes & HTTP methods)
- Asynchronous route handler processing
- Automatic parsing of cookies and URL query strings (incl. nested params)
- Configurable file serving (`ReadableStream`-based) with automatic MIME-type
detection and support for Etags, as well as Brotli, Gzip and Deflate compression
- Utilities for parsing form-encoded multipart request bodies

### Interceptors

Interceptors are additionally injected handlers (aka middleware) which are
pre/post-processed before/after a route's main handler and can be used for
validation, cancellation or other side effects. Each single interceptor can have
a `pre` and/or `post` phase function. Post-phase interceptors are processed in
reverse order. See
[`Interceptor`](https://docs.thi.ng/umbrella/server/interfaces/Interceptor.html)
for more details.

#### Available interceptors

- [`authenticateWith()`](https://docs.thi.ng/umbrella/server/functions/authenticateWith.html)
- [`cacheControl()`](https://docs.thi.ng/umbrella/server/functions/cacheControl.html)
- [`crossOriginOpenerPolicy()`](https://docs.thi.ng/umbrella/server/functions/crossOriginOpenerPolicy-1.html)
- [`crossOriginResourcePolicy()`](https://docs.thi.ng/umbrella/server/functions/crossOriginResourcePolicy-1.html)
- [`injectHeaders()`](https://docs.thi.ng/umbrella/server/functions/injectHeaders.html)
- [`logRequest()`](https://docs.thi.ng/umbrella/server/functions/logRequest.html)
- [`logResponse()`](https://docs.thi.ng/umbrella/server/functions/logResponse.html)
- [`referrerPolicy()`](https://docs.thi.ng/umbrella/server/functions/referrerPolicy-1.html)
- [`serverSession()`](https://docs.thi.ng/umbrella/server/functions/serverSession-1.html)
- [`strictTransportSecurity()`](https://docs.thi.ng/umbrella/server/functions/strictTransportSecurity.html)

#### Custom interceptors

An example interceptor to log request and response headers:

```ts
import type { Interceptor } from "@thi.ng/server";

export const log: Interceptor = {
    pre: (ctx) => ctx.logger.debug("request headers", ctx.req.headers),
    post: (ctx) => ctx.logger.debug("response headers", ctx.res.getHeaders()),
};
```

#### Using interceptors

An example route definition with route and HTTP-method specific interceptor(s):

```ts
import { cacheControl } from "@thi.ng/server";

{
    id: "hello",
    match: "/random",
    handlers: {
        get: {
            fn: (ctx) => ctx.res.writeHead(200).end(String(Math.random())),
            intercept: [
                cacheControl({ noCache: true }),
            ]
        }
    }
}
```

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bserver%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/server
```

ESM import:

```ts
import * as ser from "@thi.ng/server";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/server"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const ser = await import("@thi.ng/server");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.75 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/cache](https://github.com/thi-ng/umbrella/tree/develop/packages/cache)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/mime](https://github.com/thi-ng/umbrella/tree/develop/packages/mime)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
- [@thi.ng/router](https://github.com/thi-ng/umbrella/tree/develop/packages/router)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/uuid](https://github.com/thi-ng/umbrella/tree/develop/packages/uuid)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/server/)

### Usage example

```ts tangle:export/readme-hello.ts
import {
    server, staticFiles, cacheControl, etagFileHash, logRequest
} from "@thi.ng/server";

const app = server({
    routes: [
        // define a route for static files
        staticFiles({
            compress: true,
            etag: etagFileHash(),
            // route specific interceptors
            intercept: [
                cacheControl({ maxAge: 3600 })
            ]
        }),
        // parametric route
        {
            id: "hello",
            match: "/hello/?name",
            // optional validator(s)
            validate: {
                name: { check: (x) => /^[a-z]+$/i.test(x) },
            },
            // each route can specify handlers for various HTTP methods
            handlers: {
                get: async ({ match, res }) =>
                    res.writeHead(200, { "content-type": "text/plain"})
                       .end(`hello, ${match.params!.name.toLowerCase()}!`)
            },
        },
        // another route to demonstrate role/usage of route IDs
        // here we simply attempt to redirect to the above `hello` route
        {
            id: "alias",
            match: "/alias/?name",
            handlers: {
                get: ({ server, match, res }) =>
                    server.redirectToRoute(res, { id: "hello", params: match.params })
            }
        }
    ],
    // global interceptors (used for all routes)
    intercept: [
        logRequest(),
    ]
});

await app.start();
// [INFO] server: starting server: http://localhost:8080
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-server,
  title = "@thi.ng/server",
  author = "Karsten Schmidt",
  note = "https://thi.ng/server",
  year = 2024
}
```

## License

&copy; 2024 - 2025 Karsten Schmidt // Apache License 2.0
