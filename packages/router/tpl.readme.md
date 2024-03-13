<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

- Declarative route definitions, incl. wildcards for matching rest args
- Parametric routes, each param with optional value coercion & validation
- Route authentication handler to enable/disable routes based on other state
  factors
- Fallback route redirect
- Enforced initial route (optional)
- Route formatting (with params & rest args)
- Not bound to any environment, usable on both client & server side
- Optional HTML5 history & hash fragment support

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

<!-- include ../../assets/tpl/footer.md -->
