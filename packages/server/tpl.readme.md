<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

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

<!-- include ../../assets/tpl/footer.md -->
