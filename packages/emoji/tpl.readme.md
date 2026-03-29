<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

There're lots of other emoji packages available, most of them with various
additional functionality & dependencies. In contrast, this package merely
provides simple bi-directional mappings between emoji names & their actual
characters.

The function [`replaceNames()`]() can be used to replace all _known_
`:emoji_name:` occurrences in a given string with their corresponding emoji
character...

### References

The
[index](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/emoji/src/emoji.ts)
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

```ts tangle:export/readme.ts
import { EMOJI, NAMES, replaceNames } from "@thi.ng/emoji";

console.log(EMOJI["minibus"]);
// "🚐"

console.log(NAMES["🚐"]);
// "minibus"

console.log(replaceNames("Amazing :grin::heart_eyes::invalid:!"));
// "Amazing 😁😍:invalid:!"
```

<!-- include ../../assets/tpl/footer.md -->
