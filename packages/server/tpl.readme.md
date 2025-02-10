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
	- Uses [@thi.ng/router](https://github.com/thi-ng/umbrella/tree/develop/packages/router) as implementation
- Multiple HTTP methods per route
	- Built-in HTTP OPTIONS handler for listing available route methods
	- Fallback HTTP HEAD to GET method (if available)
- Asynchronous route handler processing
	- Composable & customizable interceptor chains
	- Global interceptors for all routes and/or local for individual routes & HTTP methods
- Automatic parsing of cookies and URL query strings (incl. nested params)
- In-memory session storage & route interceptor
- Configurable file serving (`ReadableStream`-based) with automatic MIME-type
  detection and support for Etags, as well as Brotli, Gzip and Deflate
  compression
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
- [`serverSession()`](https://docs.thi.ng/umbrella/server/functions/serverSession-1.html): User defined in-memory sessions with TTL
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
const session = srv.serverSession<AppCtx, AppSession>();

// create server with given config
const app = srv.server<AppCtx>({
	// global interceptors (used for all routes)
	intercept: [
		// log all requests (using server's configured logger)
		srv.logRequest(),
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
			prefix: "assets",
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

<!-- include ../../assets/tpl/footer.md -->
