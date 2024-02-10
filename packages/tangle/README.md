<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
> [!IMPORTANT]
> ‼️ Announcing the thi.ng user survey 2024 📋
>
> [Please participate in the survey here!](https://forms.gle/XacbSDEmQMPZg8197)\
> (open until end of February)
>
> **To achieve a better sample size, I'd highly appreciate if you could
> circulate the link to this survey in your own networks.**
>
> [Discussion](https://github.com/thi-ng/umbrella/discussions/447)

# ![@thi.ng/tangle](https://media.thi.ng/umbrella/banners-20230807/thing-tangle.svg?1436490f)

[![npm version](https://img.shields.io/npm/v/@thi.ng/tangle.svg)](https://www.npmjs.com/package/@thi.ng/tangle)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/tangle.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Document front matter](#document-front-matter)
    - [`tangle`](#tangle)
    - [`publish`](#publish)
  - [Code block metadata](#code-block-metadata)
    - [`id`](#id)
    - [`noweb`](#noweb)
    - [`publish`](#publish)
    - [`tangle`](#tangle)
- [Basic usage](#basic-usage)
    - [Generated Outputs](#generated-outputs)
- [Editor integrations](#editor-integrations)
  - [VSCode](#vscode)
  - [Other editors](#other-editors)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Literate programming code block tangling / codegen utility, inspired by org-mode & noweb.

[Literate Programming](https://en.wikipedia.org/wiki/Literate_programming) (LP)
is a form of programming focused on creating documents of interleaved prose,
code, and supporting diagrams/illustrations, pioneered by [Donald
Knuth](https://en.wikipedia.org/wiki/Donald_Knuth) for his TeX system. If you're
new to this approach, please first read the Wikipedia article for a basic
introduction. For all LP projects, a so-called "tangling" step is required to
produce workable, standard source code files from these documents. This package
provides just that:

Extract, expand, transclude, combine and assemble code blocks from Markdown or
[Org-mode](https://orgmode.org) files into actual/traditional source files. A
single LP source file can contain code for multiple languages. Each code block
can define its target file and include [noweb-style
references](https://orgmode.org/manual/Noweb-Reference-Syntax.html) to other
code blocks, either from the same or even from other files.

The package provides both a basic API and a CLI wrapper to perform the
"tangling" tasks (an expression borrowed from
[Org-mode](https://orgmode.org/manual/Extracting-Source-Code.html)).

(FWIW all early [thi.ng](https://thi.ng) libraries created between 2011-2016
were written in this format, e.g.
[thi.ng/fabric](https://github.com/thi-ng/fabric),
[thi.ng/geom](https://github.com/thi-ng/geom),
[thi.ng/luxor](https://github.com/thi-ng/luxor),
[thi.ng/morphogen](https://github.com/thi-ng/morphogen))

### Document front matter

LP source files can contain a front matter section, currently supporting the
following properties (all optional, also see example document further below):

#### `tangle`

Absolute or relative path to base output directory for tangled code blocks. This
is only used if a code block's `tangle` path is a relative path.

#### `publish`

Absolute or relative path to write a "published" version of the LP source file,
in which all code blocks have been transformed & code block references
resolved/expanded/transcluded. If this property is omitted, no such output will
be generated.

### Code block metadata

In addition to the optional document front matter configuration, each code block
can specify the following metadata `key:value` pairs:

#### `id`

Unique (within the current doc) code block identifier. Only required if the
contents of this code block are to be referenced/transcluded elsewhere.

#### `noweb`

If set to `noweb:no`, any code block references in this block will **not** be
expanded. See section below for more details about these reference.

#### `publish`

If set to `publish:no`, the code block will be omitted in the published version
of the current document.

#### `tangle`

Absolute or relative path of the target file where the expanded contents of this
code block should be written to. If a relative path, it'll be relative to the
path stated in the front matter. If omitted, the code block will **not** be
extracted to its own file. If multiple code blocks in the _same_ source file are
specifying the same target file, their contents will be concatenated (in order
of appearance).

## Basic usage

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

    This next code block will be tangled/extracted to the specified file and since
    its body entirely consists of a reference to another code block, it will be
    replaced with the contents of the code block with ID `imports` in the file
    `lib.md` (see further below)

    ```ts tangle:src/index.ts
    <<lib.md#imports>>
    ```

    Next we transclude the contents of the code block with ID `foo` and perform some
    other computation. This block (and the next one too) will be tangled to the same
    target file (concatenated):

    ```ts tangle:src/index.ts
    <<foo>>

    const bar = 42;

    console.log(foo + bar);
    ```

    Finally, here's a demonstration of how transcluded code blocks can also receive
    parameters (supplied via an options object as argument):

    ```ts tangle:src/index.ts
    <<lib.md#parametric { "hello": "world" }>>
    ```

    ## Misc

    The following block will be only transcluded in the first one, however has its
    `publish` flag disabled so that it will **not** be included in the published
    version of this file.

    ```ts id:foo publish:no
    const foo = 23;
    ```

lib.md (e.g. maybe a library of useful snippets for a larger project):

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

#### Generated Outputs

The generated/tangled source file: `out/src/index.ts`

```ts
// Tangled @ 2022-09-21T16:57:43+02:00 - DO NOT EDIT!
// Source: <...>/main.lit.md

// @ts-ignore
import type { Fn } from "@thi.ng/api";

const foo = 23;

const bar = 42;

console.log(foo + bar);

export const hello = "Hi, world!";
```

The published version of the input markdown file: `out/main.md`

    ---
    publish: out/main.md
    tangle: out
    ---
    # Tangle test

    This next code block will be tangled/extracted to the specified file and since
    its body entirely consists of a reference to another code block, it will be
    replaced with the contents of the code block with ID `imports` in the file
    `lib.md` (see further below)

    ```ts
    // @ts-ignore
    import type { Fn } from "@thi.ng/api";
    ```

    Next we transclude the contents of the code block with ID `foo` and perform some
    other computation. This block (and the next one too) will be tangled to the same
    target file (concatenated):

    ```ts
    const foo = 23;

    const bar = 42;

    console.log(foo + bar);
    ```

    Finally, here's a demonstration of how transcluded code blocks can also receive
    parameters (supplied via an options object as argument):

    ```ts
    export const hello = "Hi, world!";
    ```

    ## Misc

    The following block will be only transcluded in the first one, however has its
    `publish` flag disabled so that it will **not** be included in the published
    version of this file.

## Editor integrations

### VSCode

Using the [Run On Save
extension](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave),
tangling can be automatically performed on each save of an Literate Programming
source file. E.g. this configuration (add to your VSCode workspace
`settings.json`) runs the tangle command on each save of a `*.lit.md` file.

```json
"emeraldwalk.runonsave": {
    "commands": [
        {
            "match": "\\.lit\\.md$",
            "cmd": "${workspaceFolder}/node_modules/.bin/tangle ${file}"
        }
    ]
}
```

Note: This also assumes you have this package (@thi.ng/tangle) added to your
dependencies...

### Other editors

Accepting PRs with instructruction for other editors & IDEs.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btangle%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/tangle
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/tangle"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const tangle = await import("@thi.ng/tangle");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.83 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/args](https://github.com/thi-ng/umbrella/tree/develop/packages/args)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/date](https://github.com/thi-ng/umbrella/tree/develop/packages/date)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/tangle/)

In addition to the CLI wrapper, the package provides the
[`tangleFile()`](https://docs.thi.ng/umbrella/tangle/functions/tangleFile.html)
and
[`tangleString()`](https://docs.thi.ng/umbrella/tangle/functions/tangleString.html)
functions. See
[/test/index.ts](https://github.com/thi-ng/umbrella/blob/develop/packages/tangle/test/index.ts)
for usage examples.

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-tangle,
  title = "@thi.ng/tangle",
  author = "Karsten Schmidt",
  note = "https://thi.ng/tangle",
  year = 2022
}
```

## License

&copy; 2022 - 2024 Karsten Schmidt // Apache License 2.0
