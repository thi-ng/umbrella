<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

> [!NOTE]
> The functions in this package have been extracted from
> [@thi.ng/bench](https://thi.ng/bench).

This package provides the following functions:

- [`now()`](https://docs.thi.ng/umbrella/timestamp/functions/now.html) attempts
to use high-res ES
[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
timestamps (in Node via
[`process.hrtime.bigint()`](https://nodejs.org/dist/latest-v12.x/docs/api/process.html#process_process_hrtime_bigint)),
or falls back to `performance.now()`, or lacking that, uses `Date.now()`. In all
cases, returns a (possibly rounded) nanosec-scale timestamp, either as `bigint`
or `number`.
- [`timeDiff()`](https://docs.thi.ng/umbrella/timestamp/functions/timeDiff.html)
function can be used to compute the difference between two such timestamp and
return it as milliseconds.
- [`asMillis()`](https://docs.thi.ng/umbrella/timestamp/functions/asMillis.html)
  takes a duration (either a number or bigint) in nanosec-scale and converts it
  to a JS number in milliseconds

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

TODO

<!-- include ../../assets/tpl/footer.md -->
