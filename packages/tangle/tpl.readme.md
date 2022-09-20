# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Early [thi.ng](https://thi.ng) libraries (between 2011-2016, for Clojure) were
written in a [literate
programming](https://en.wikipedia.org/wiki/Literate_programming) style
(pioneered by [Donald Knuth](https://en.wikipedia.org/wiki/Donald_Knuth)), a
form of programming which focused on documents of interleaved prose & code. To
produce workable, standard source code files from these documents, a so called
"tangling" step is required. This package provides just that.

Extract, expand, transclude, combine and assemble code blocks from Markdown or
[Org-mode](https://orgmode.org) files into actual source files. Each code block
can define its target source file and include (a subset of) [noweb
references](https://orgmode.org/manual/Noweb-Reference-Syntax.html) to other
code blocks (even those from other files).

The package provides both a basic API and a CLI wrapper to perform the
"tangling" tasks (another expression borrowed from [Org-mode's babel
plug-in](https://orgmode.org/manual/Extracting-Source-Code.html)).

### Basic example usage

The following Markdown example acts as a source file (presumably for Literate
Programming purposes) from which various interlinked code blocks will be
extracted (into any number of new files). Additionally, this file itself is also
being transformed for "publishing", meaning all code block references &
transclusions are getting resolved/replaced in the published version of this
file.

main.md:

    ---
    publish: out/main.md
    tangle: out
    ---
    # Tangle test

    This code block will be tangled/extracted to the specified file:

    ```ts tangle:src/index.ts
    // this next line will be replaced with contents of the code block
    // with ID `imports` in the file `lib.md` (see below)
    <<lib.md#imports>>

    // here we transclude the contents of code block `foo` from this same file
    // (see below)
    <<foo>>

    const bar = 42;

    // transcluded code blocks can also receive parameters like shown here
    <<lib.md#parametric { "hello": "world" }>>

    console.log(foo + bar);
    ```

    ## Misc

    The following code block will be transcluded in the one above, however has its
    `publish` flag disabled so that it will **not** be included as is in the
    published version of this file.

    ```ts id:foo publish:no
    const foo = 23;
    ```

lib.md (e.g. a library of re-usable snippets for a larger project)

    # Library of snippets

    ```ts id:imports
    // @ts-ignore
    import type { Fn } from "@thi.ng/api";
    ```

    ```ts id:parametric
    export const hello = "Hi, {{hello}}!";
    ```

Calling the `tangle` CLI util, we can process these example files and produce
the following two outputs:

```bash
npx @thi.ng/tangle --help

#  █ █   █           │
# ██ █               │
#  █ █ █ █   █ █ █ █ │ @thi.ng/tangle 0.1.0
#  █ █ █ █ █ █ █ █ █ │ Literate programming code block tangling
#                  █ │
#                █ █ │
#
# usage: tangle [OPTS] SOURCE-FILES(S) ...
#        tangle --help
#
# Flags:
#
# -d, --debug         enable debug output
# --dry-run           enable dry run (don't overwrite files)
# --no-comments       don't generate comments
```

```bash
npx @thi.ng/tangle main.md
# [INFO] tangle: writing file: <...>/out/src/index.ts
# [INFO] tangle: writing file: <...>/out/main.md
```

The generated/tangled source file: `out/src/index.ts`

```ts
// Tangled @ 2022-09-15T18:09:36Z - DO NOT EDIT!
// Source: <...>/main.md

// this next line will be replaced with contents of the code block
// with ID `imports` in the file `lib.md` (see below)
// @ts-ignore
import type { Fn } from "@thi.ng/api";

// here we transclude the contents of code block `foo` from this same file
// (see below)
const foo = 23;

const bar = 42;

// transcluded code blocks can also receive parameters like shown here
export const hello = "Hi, world!";

console.log(foo + bar);
```

In addition to generating/extracing code blocks into source files, the markdown
(or org-mode) source file can be "published" with all code block references
resolved. This output is optional and only generated when the front matter
specifies a `publish` file path...

`out/main.md`

    ---
    publish: out/main.md
    tangle: out
    ---
    # Tangle test

    This code block will be tangled/extracted to the specified file:

    ```ts
    // this next line will be replaced with contents of the code block
    // with ID `imports` in the file `lib.md` (see below)
    // @ts-ignore
    import type { Fn } from "@thi.ng/api";

    // here we transclude the contents of code block `foo` from this same file
    // (see below)
    const foo = 23;

    const bar = 42;

    // transcluded code blocks can also receive parameters like shown here
    export const hello = "Hi, world!";

    console.log(foo + bar);
    ```

    ## Misc

    The following code block will be transcluded in the one above, however has its
    `publish` flag disabled so that it will **not** be included as is in the
    published version of this file.


${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

TODO

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
