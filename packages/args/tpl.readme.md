<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

### Built-in argument types

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

### Re-usable argument presets

The following commonly used arguments are available as predefined presets:

- [`ARG_DRY_RUN`](https://docs.thi.ng/umbrella/args/variables/ARG_DRY_RUN.html)
- [`ARG_QUIET`](https://docs.thi.ng/umbrella/args/variables/ARG_QUIET.html)
- [`ARG_VERBOSE`](https://docs.thi.ng/umbrella/args/variables/ARG_VERBOSE.html)

Higher order, configurable preset specs:

- [`ARG_OUT_DIR`](https://docs.thi.ng/umbrella/args/functions/ARG_OUT_DIR.html)
- [`ARG_OUT_FILE`](https://docs.thi.ng/umbrella/args/functions/ARG_OUT_FILE.html)

To use these presets, simply import and splice them into your own arg
definitions (see code examples below).

### CLI app framework

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

A [fully documented code example](#declarative-multi-command-cli-application) is
further below.

For some _publicly available_ production uses, please see the [related packages
section](#projects-using-this-package) in this readme.

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
- [thing-tools](https://codeberg.org/thi.ng/thing-tools)

## API

{{pkg.docs}}

## Basic usage

```ts tangle:export/readme.ts
import {
    ARG_VERBOSE,
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
    verbose: boolean;
}

// arg specifications
const specs: Args<TestArgs> = {
    // re-use predefined preset (see readme section above)
    ...ARG_VERBOSE,

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
-v, --verbose                   Display extra information

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
#     verbose: false,
#   },
#   index: 15,
#   rest: [ 'sourcefile.png' ],
#   done: false
# }
```

## Declarative, multi-command CLI application

The following example defines a CLI app with two sub-commands: `hello` and
`list`. Each command has its own options, in addition to common/shared ones.
Each command is defined in a modular manner (usually in its own source file).
All aspects like arg parsing, validation, and command selection/delegation is
handled by the `cliApp()` wrapper.

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

<!-- include ../../assets/tpl/footer.md -->
