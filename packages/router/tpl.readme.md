<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

<!-- include ../../assets/tpl/footer.md -->
