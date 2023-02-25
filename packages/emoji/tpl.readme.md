<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

There're lots of other emoji packages available, most of them with various
additional functionality & dependencies. In contrast, this package merely
provides simple bi-directional mappings between emoji names & their actual
characters. Nothing more, nothing less.

### References

The
[index](https://github.com/thi-ng/umbrella/blob/develop/packages/emoji/src/emoji.ts)
is based on the one used by
[node-emoji](https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json)
(which itself is sourced from the [js-emoji](https://github.com/iamcal/js-emoji)
package).

For reasons of uniformity, all hyphens (`-`) in names have been replaced with
underscores (`_`).

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
import { EMOJI, NAMES } from "@thi.ng/emoji";

EMOJI["minibus"]
// "🚐"

NAMES["🚐"]
// "minibus"
```

<!-- include ../../assets/tpl/footer.md -->
