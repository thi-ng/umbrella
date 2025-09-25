<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/args](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-args.svg?781aa3c2)

[![npm version](https://img.shields.io/npm/v/@thi.ng/args.svg)](https://www.npmjs.com/package/@thi.ng/args)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/args.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Projects using this package](#projects-using-this-package)
- [API](#api)
- [Basic usage](#basic-usage)
  - [Generate & display help](#generate--display-help)
  - [Parsing, value coercions & side effects](#parsing-value-coercions--side-effects)
- [Declarative, multi-command CLI application wrapper](#declarative-multi-command-cli-application-wrapper)
- [Authors](#authors)
- [License](#license)

## About

Declarative, functional CLI argument/options parser, app framework, arg value coercions, multi/sub-commands, usage generation, error handling etc..

> [!NOTE]
> See here for [information about the included CLI app
> framework](#declarative-multi-command-cli-application-wrapper)

The parser includes built-in support for the following argument types (of course
custom arg types are supported too):

| **Argument type**    | **Multiple** | **Example**                | **Result**                        |
|----------------------|--------------|----------------------------|-----------------------------------|
| **Flag**             |              | `--force`, `-f`            | `force: true`                     |
| **String**           | ✅            | `--foo bar`                | `foo: "bar"`                      |
| **Float/int/hex**    | ✅            | `--bg ff997f`              | `bg: 16750975`                    |
| **Enum**             | ✅            | `--type png`               | `type: "png"`                     |
| **KV pairs**         | ✅            | `--define foo=bar`         | `define: { foo: "bar" }`          |
| **KV multi pairs**   | ✅            | `-D foo=bar -D foo=baz`    | `define: { foo: ["bar", "baz"] }` |
| **JSON**             |              | `--config '{"foo": [23]}'` | `config: { foo: [23] }`           |
| **Fixed size tuple** |              | `--size 640x480`           | `size: { value: [640, 480] }`     |

If multiple values/repetitions are allowed for an argument, the values will be
collected into an array (apart from KV pairs, which will yield an object).
Furthermore, for multi-args and tuples, an optional delimiter can be specified
to extract individual values, e.g. `-a 1,2,3` equals `-a 1 -a 2 -a 3`

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bargs%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/args
```

ESM import:

```ts
import * as args from "@thi.ng/args";
```

For Node.js REPL:

```js
const args = await import("@thi.ng/args");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.31 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/text-format](https://github.com/thi-ng/umbrella/tree/develop/packages/text-format)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Projects using this package

- [@thi.ng/block-fs](https://thi.ng/block-fs): Customizable block-based storage,
  adapters & file system layer
- [@thi.ng/meta-css](https://thi.ng/meta-css): Data-driven CSS framework
  codegen, transpiler & bundler
- [@thi.ng/pointfree-lang](https://thi.ng/pointfree-lang): Forth style syntax
  layer/compiler & CLI for the [@thi.ng/pointfree](https://thi.ng/pointfree) DSL
- [@thi.ng/tangle](https://thi.ng/tangle): Literate programming code block
  tangling / codegen utility, inspired by org-mode & noweb
- [@thi.ng/wasm-api-bindgen](https://thi.ng/wasm-api-bindgen): Polyglot bindings
  code generators (TS/JS, Zig, C11) for hybrid WebAssembly projects

## API

[Generated API docs](https://docs.thi.ng/umbrella/args/)

## Basic usage

```ts tangle:export/readme.ts
import {
    flag,
    hex,
    json,
    kvPairs,
    oneOf,
    parse,
    size,
    string,
    vec,
    type Args,
    type KVDict,
    type Tuple,
} from "@thi.ng/args";

type ImgType = "png" | "jpg" | "gif" | "tiff";

// CLI args will be validated against this interface
interface TestArgs {
    configPath?: string;
    force?: boolean;
    bg: number;
    type: ImgType;
    size?: Tuple<number>;
    pos?: Tuple<number>;
    xtra?: { a: number; b: string };
    define?: KVDict;
}

// arg specifications
const specs: Args<TestArgs> = {
    // string arg
    configPath: string({
        alias: "c",
        hint: "PATH",
        desc: "Config file path (CLI args always take precedence over those settings)",
    }),
    // boolean flag (default: false)
    force: flag({
        alias: "f",
        desc: "Force operation",
        // side effect & predicate
        // parsing only continues if fn returns true
        fn: (_) => (console.log("force mode enabled"), true),
    }),
    // hex int value
    bg: hex({
        desc: "Background color",
        // mandatory args require a `default` value and/or `optional: false`
        default: 0xffffff,
        defaultHint: "ffffff",
    }),
    // enum value (mandatory)
    type: oneOf(["png", "jpg", "gif", "tiff"], {
        alias: "t",
        desc: "Image type",
        // mandatory args require a `default` value and/or `optional: false`
        optional: false,
    }),
    // fixed size numeric tuple w/ `x` as delimiter
    // size: tuple(coerceInt, 2, { hint: "WxH", desc: "Target size" }, "x"),
    // syntax sugar for above:
    size: size(2, { hint: "WxH", desc: "Target size" }),
    // another version for tuples of floating point values
    // pos: tuple(coerceFloat, 2, { desc: "Lat/Lon" }, ","),
    pos: vec(2, { desc: "Lat/Lon coordinates" }),
    // JSON string arg
    xtra: json({
        alias: "x",
        desc: "Extra options",
        group: "extra",
    }),
    // key-value pairs parsed into an object
    define: kvPairs({
        alias: "D",
        desc: "Define dict entry",
        group: "extra"
    }),
};

try {
    // parse argv w/ above argument specs & default options
    // (by default usage is shown if error occurs)
    const args = parse(specs, process.argv, {
        usageOpts: {
            prefix: `
 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ @thi.ng/args demo app
 █ █ █ █ █ █ █ █ █ │ v1.0.0
                 █ │
               █ █ │\n\n`,
            showGroupNames: true,
            groups: ["flags", "main", "extra"],
            lineWidth: 72,
        },
    });
    console.log(args);
} catch (_) {}
```

Invoking this as CLI script without arguments will generate an error about a
missing `--type` arg and output the generated usage info (by default with ANSI
color highlights):

```text
illegal argument(s): missing arg: --type

 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ @thi.ng/args demo app
 █ █ █ █ █ █ █ █ █ │ v1.0.0
                 █ │
               █ █ │

Flags:

-f, --force                     Force operation

Main:

--bg HEX                        Background color (default: "ffffff")
-c PATH, --config-path PATH     Config file path (CLI args always take
                                precedence over those settings)
--pos N,N                       Lat/Lon coordinates
--size WxH                      Target size
-t ID, --type ID                [required] Image type: "png", "jpg",
                                "gif", "tiff"

Extra:

-D key=val, --define key=val    [multiple] Define dict entry
-x JSON, --xtra JSON            Extra options
```

### Generate & display help

Usage information can be generated via `usage()` and is automatically triggered
via the special `--help` option (configurable, see
[ParseOpts](https://docs.thi.ng/umbrella/args/interfaces/ParseOpts.html)).

Each arg can be associated with arbitrary group IDs, which are then used to
segment usage output. By default, `flag()` args are assigned to a `"flags"`
group, all others to `"main"`. The default output order too is `["flags",
"main"]`, but can be configured via a `group` option given an arg spec or
factory function.

By default, ANSI colors are used to format the result string of `usage()`, but
can be disabled (see
[`UsageOpts`](https://docs.thi.ng/umbrella/args/interfaces/UsageOpts.html)).

```text
bun index.ts --help

-f, --force                     Force operation

--bg HEX                        Background color
-c PATH, --config-path PATH     Config file path (CLI args always take
                                precedence over those settings)
-D key=val, --define key=val    [multiple] Define dict entry
--pos N,N                       Lat/Lon
--size WxH                      Target size
-t ID, --type ID                [required] Image type: 'png', 'jpg', 'gif',
                                'tiff'
-x JSON, --xtra JSON            Extra options
```

### Parsing, value coercions & side effects

The below invocation demonstrates how the various argument types are handled &
represented in the result. Parsing stops with the first non-argument value (here
`sourcefile.png`) and the remaining values are made available via `rest` in the
result object.

```bash
bun index.ts \
    -f -t png --bg ff00ff --size 640x480 \
    -D author=toxi -D date=2018-03-24 \
    --xtra '{"foo": [23]}' \
    sourcefile.png

# force mode enabled
# {
#   result: {
#     force: true,
#     type: 'png',
#     bg: 16711935,
#     size: Tuple { value: [640, 480] }
#     define: { author: 'toxi', date: '2018-03-24' },
#     xtra: { foo: [23] },
#   },
#   index: 15,
#   rest: [ 'sourcefile.png' ],
#   done: false
# }
```

## Declarative, multi-command CLI application wrapper

The package provides a simple framework to conveniently define single and
multi-command applications in a declarative and modular manner. Such apps are
defined via command specs and other configuration options. The framework then
handles all argument parsing, validation, usage display and delegation to
sub-commands.

The wrapper defines a user-customizable [command
context](https://docs.thi.ng/umbrella/args/interfaces/CommandCtx.html) with all
important information which is passed to the commands and also includes a logger
(writing to `stderr`). Other help/usage and error output also respects the
[`NO_COLOR` convention](https://no-color.org/).

For some _publicly available_ production uses, please see the following
projects:

- [thi.ng/block-fs](https://thi.ng/block-fs)
- [thi.ng/meta-css](https://thi.ng/meta-css)
- [thi.ng/pointfree-lang](https://thi.ng/pointfree-lang)
- [thi.ng/tangle](https://thi.ng/tangle)
- [thi.ng/wasm-api-bindgen](https://thi.ng/wasm-api-bindgen)

```ts tangle:export/readme-cliapp.ts
import {
    ARG_VERBOSE,
    cliApp,
    configureLogLevel,
    int,
    string,
    type Command,
    type CommandCtx,
} from "@thi.ng/args";
import { files } from "@thi.ng/file-io";

// common command opts
interface CommonOpts {
    verbose: boolean;
}

// custom command context
interface AppCtx<T extends CommonOpts> extends CommandCtx<T, CommonOpts> {
    // plus any custom additions here...
}

// command-specific options
interface HelloOpts extends CommonOpts {
    name: string;
}

// command definition
const HELLO: Command<HelloOpts, CommonOpts> = {
    // brief description (for `--help` usage)
    desc: "Print out a greeting",
    // command specific options (arguments)
    // (will be combined with common opts)
    opts: {
        name: string({
            alias: "n",
            desc: "Name for greeting",
            optional: false,
        }),
    },
    // this command does not accept any inputs
    inputs: 0,
    // command implementation
    fn: async (ctx) => {
        // log message only shown if `--verbose`/`-v` given
        ctx.logger.debug("opts", ctx.opts);
        console.log(`Hello, ${ctx.opts.name}!`);
    },
};

// command-specific options
interface ListFilesOpts extends CommonOpts {
    depth: number;
    filter?: string;
}

// command definition
const LIST_FILES: Command<ListFilesOpts, CommonOpts> = {
    // brief description (for `--help` usage)
    desc: "List files in given dir",
    // command specific options
    opts: {
        filter: string({
            alias: "f",
            desc: "Filter regexp",
        }),
        depth: int({
            alias: "d",
            desc: "Recursion depth (directory levels)",
            default: Infinity,
        }),
    },
    // this command requires exactly 1 input
    // (if supporting a range, use `[min, max]`)
    inputs: 1,
    // command implementation
    fn: async (ctx) => {
        for (let f of files(ctx.inputs[0], ctx.opts.filter, ctx.opts.depth)) {
            console.log(f);
        }
    },
};

// define & start CLI app
cliApp<CommonOpts, AppCtx<any>>({
    // app name
    name: "example",
    // process.argv index from which to start parsing from
    start: 2,
    // list common command opts here
    opts: {
        // re-use verbose flag arg spec preset
        ...ARG_VERBOSE,
    },
    // list of commands
    commands: {
        hello: HELLO,
        list: LIST_FILES,
    },
    // set to true if only a single command
    // in this case the command name would NOT be required/expected
    // single: true,

    // usage opts
    usage: {
        // prefix/header string
        prefix: `Example app
===================================
Usage: example [opts] [inputs]\n`,
        // configure column width for param usage info
        paramWidth: 24,
        lineWidth: 80,
    },

    // context initialization/augmentation
    // (called before arg parsing commences)
    ctx: async (ctx) => {
        configureLogLevel(ctx.logger, ctx.opts.verbose);
        return ctx;
    },
});
```

Example usage (here using `bun` to launch the above CLI app, though the usage
info is written to assume an `example` launcher/wrapper):

```bash
bun readme-cliapp.ts

# Example app
# ===================================
# Usage: example [opts] [inputs]
#
# Available commands:
#
# hello : Print out a greeting
# list  : List files in given dir
#
# -v, --verbose           Display extra information
```

```bash
# displaying help for a sub-command
bun readme-cliapp.ts hello --help

# Example app
# ===================================
# Usage: example [opts] [inputs]
#
# Current command:
#
# hello : Print out a greeting
#
# -v, --verbose           Display extra information
#
# -n STR, --name STR      [required] Name for greeting
```

```bash
# invoking `hello` sub-command (with verbose flag)
bun readme-cliapp.ts hello --name thi.ng -v
# [DEBUG] example: opts {"name":"thi.ng","verbose":true}
# Hello, thi.ng!
```

```bash
# invoking `list` sub-command
bun readme-cliapp.ts list -d 2 -f '.js' .
# ./dev/api.js
# ./dev/runtime.js
# ./dev/test/main.js
# ./index.js
```

```bash
# missing arg error
bun readme-cliapp.ts hello
# illegal argument(s): missing arg: --name
#
# (...additional usage output omitted for brevity)
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-args,
  title = "@thi.ng/args",
  author = "Karsten Schmidt",
  note = "https://thi.ng/args",
  year = 2018
}
```

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache License 2.0
