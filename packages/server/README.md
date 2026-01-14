<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/server](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-server.svg?ab80455e)

[![npm version](https://img.shields.io/npm/v/@thi.ng/server.svg)](https://www.npmjs.com/package/@thi.ng/server)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/server.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 213 standalone projects, maintained as part
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
  - [Static file serving](#static-file-serving)
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
    - Uses [@thi.ng/router](https://github.com/thi-ng/umbrella/tree/develop/packages/router) as implementation
- Multiple HTTP methods per route
    - Built-in HTTP OPTIONS handler for listing available route methods
    - Fallback HTTP HEAD to GET method (if available)
- Asynchronous route handler processing
    - Composable & customizable interceptor chains
    - Global interceptors for all routes and/or local for individual routes & HTTP methods
- Automatic parsing of cookies and URL query strings (incl. nested params)
- In-memory session storage & route interceptor
- Configurable [static file serving](#static-file-serving)
  (`ReadableStream`-based) with automatic MIME-type detection and support for
  Etags, as well as Brotli, Gzip and Deflate compression
- Utilities for parsing form-encoded multipart request bodies

### Interceptors

Interceptors are additionally injected route handlers (aka middleware) which are
pre/post-processed before/after a route's main handler and can be used for
validation, cancellation or other side effects. Each single interceptor can have
a `pre` and/or `post` phase function. Each route handler can define its own
interceptor chains, which will be appended to the globally defined interceptors
(applied to all routes). Post-phase interceptors are processed in reverse order.
See
[`Interceptor`](https://docs.thi.ng/umbrella/server/interfaces/Interceptor.html)
for more details.

![Diagram illustrating interceptor processing order](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/server/server-interceptors.png)

#### Available interceptors

- [`authenticateWith()`](https://docs.thi.ng/umbrella/server/functions/authenticateWith.html): Predicate function based authentication
- [`cacheControl()`](https://docs.thi.ng/umbrella/server/functions/cacheControl.html): Cache control header injection
- [`crossOriginOpenerPolicy()`](https://docs.thi.ng/umbrella/server/functions/crossOriginOpenerPolicy-1.html): Policy header injection
- [`crossOriginResourcePolicy()`](https://docs.thi.ng/umbrella/server/functions/crossOriginResourcePolicy-1.html): Policy header injection
- [`injectHeaders()`](https://docs.thi.ng/umbrella/server/functions/injectHeaders.html): Arbitrary header injection
- [`measure()`](https://docs.thi.ng/umbrella/server/functions/measure.html): Request process timing info
- [`logRequest()`](https://docs.thi.ng/umbrella/server/functions/logRequest.html): Request detail logging
- [`logResponse()`](https://docs.thi.ng/umbrella/server/functions/logResponse.html): Response logging
- [`rateLimiter()`](https://docs.thi.ng/umbrella/server/functions/rateLimiter-1.html): Configurable rate limiting
- [`referrerPolicy()`](https://docs.thi.ng/umbrella/server/functions/referrerPolicy-1.html): Policy header injection
- [`rejectUserAgents()`](https://docs.thi.ng/umbrella/server/functions/rejectUserAgents.html): Configurable UA blocking
- [`sessionInterceptor()`](https://docs.thi.ng/umbrella/server/functions/sessionInterceptor-1.html): User defined in-memory sessions with TTL
- [`strictTransportSecurity()`](https://docs.thi.ng/umbrella/server/functions/strictTransportSecurity.html): Policy header injection

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

### Static file serving

The
[`staticFiles()`](https://docs.thi.ng/umbrella/server/functions/staticFiles.html)
route provider can be used to serve files from a given local root directory.
Multiple such routes can be defined. The handler is highly configurable in terms
of path validation/filtering, global and/or per-file headers, Etag generation,
compression. It also supports its own set of [interceptors](#interceptors).

See
[`StaticOpts`](https://docs.thi.ng/umbrella/server/interfaces/StaticOpts.html)
and example below for more details.

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

Package sizes (brotli'd, pre-treeshake): ESM: 6.34 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/cache](https://github.com/thi-ng/umbrella/tree/develop/packages/cache)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/leaky-bucket](https://github.com/thi-ng/umbrella/tree/develop/packages/leaky-bucket)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/mime](https://github.com/thi-ng/umbrella/tree/develop/packages/mime)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
- [@thi.ng/router](https://github.com/thi-ng/umbrella/tree/develop/packages/router)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/timestamp](https://github.com/thi-ng/umbrella/tree/develop/packages/timestamp)
- [@thi.ng/uuid](https://github.com/thi-ng/umbrella/tree/develop/packages/uuid)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/server/)

### Usage example

```ts tangle:export/readme-hello.ts
import * as srv from "@thi.ng/server";

// all route handlers & interceptors receive a request context object
// here we define an extended/customized version
interface AppCtx extends srv.RequestCtx {
    session?: AppSession;
}

// customized version of the default server session type
interface AppSession extends srv.ServerSession {
    user?: string;
    locale?: string;
}

// interceptor for injecting/managing sessions
// by default uses in-memory storage/cache
const session = srv.sessionInterceptor<AppCtx, AppSession>({
    factory: srv.createSession
});

// create server with given config
const app = srv.server<AppCtx>({
    // global interceptors (used for all routes)
    intercept: [
        // log all requests (using server's configured logger)
        srv.logRequest(),
        // block known AI bots
        srv.rejectUserAgents(srv.USER_AGENT_AI_BOTS),
        // lookup/create sessions (using above interceptor)
        session,
        // ensure routes with `auth` flag have a logged-in user
        srv.authenticateWith<AppCtx>((ctx) => !!ctx.session?.user),
    ],
    // route definitions (more can be added dynamically later)
    routes: [
        // define a route for serving static assets
        srv.staticFiles({
            // ensure only logged-in users can access
            auth: true,
            // use compression (if client supports it)
            compress: true,
            // route prefix
            prefix: "/assets",
            // map to current CWD
            rootDir: ".",
            // strategy for computing etags (optional)
            etag: srv.etagFileHash(),
            // route specific interceptors
            intercept: [srv.cacheControl({ maxAge: 3600 })],
        }),
        // define a dummy login route
        {
            id: "login",
            match: "/login",
            handlers: {
                // each route can specify handlers for various HTTP methods
                post: async (ctx) => {
                    const { user, pass } = await srv.parseRequestFormData(ctx.req);
                    ctx.logger.info("login details", user, pass);
                    if (user === "thi.ng" && pass === "1234") {
                        // create new session for security reasons (session fixation)
                        const newSession = await session.replaceSession(ctx)!;
                        newSession!.user = user;
                        ctx.res.writeHead(200).end("logged in as " + user);
                    } else {
                        ctx.res.unauthorized({}, "login failed");
                    }
                },
            },
        },
        // dummy logout route
        {
            id: "logout",
            match: "/logout",
            // use auth flag here to ensure route is only accessible if valid session
            auth: true,
            handlers: {
                get: async (ctx) => {
                    // remove session & force expire session cookie
                    await session.deleteSession(ctx, ctx.session!.id);
                    ctx.res.writeHead(200).end("logged out");
                },
            },
        },
        // parametric route (w/ optional validator)
        {
            id: "hello",
            match: "/hello/?name",
            validate: {
                name: { check: (x) => /^[a-z]+$/i.test(x) },
            },
            handlers: {
                get: async ({ match, res }) => {
                    res.writeHead(200, { "content-type": "text/plain" })
                       .end(`hello, ${match.params!.name}!`);
                },
            },
        },
        // another route to demonstrate role/usage of route IDs
        // here we simply attempt to redirect to the above `hello` route
        {
            id: "alias",
            match: "/alias/?name",
            handlers: {
                get: ({ server, match, res }) =>
                    server.redirectToRoute(res, {
                        id: "hello",
                        params: match.params,
                    }),
            },
        },
    ],
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

&copy; 2024 - 2026 Karsten Schmidt // Apache License 2.0
