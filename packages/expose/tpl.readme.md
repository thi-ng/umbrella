<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package provides a single function
[`exposeGlobal()`](https://docs.thi.ng/umbrella/expose/modules.html#exposeGlobal)
to expose a variable in the global scope (e.g. for development/debugging
purposes). It's behavior is controled by the `UMBRELLA_GLOBALS` or
`VITE_UMBRELLA_GLOBALS` environment variables - if either is set (to a non-empty
string) the function will **always** be enabled. Otherwise (by default),
`exposeGlobal()` is **disabled for production builds**, i.e. if
`process.env.NODE_ENV === "production"`.

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


<!-- include ../../assets/tpl/footer.md -->
