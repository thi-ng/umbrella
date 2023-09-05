<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Includes built-in support for the following argument types (of course custom arg types are supported too):

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
Furthermore, for multi-args, an optional delimiter can be specified to extract
individual values, e.g. `-a 1,2,3` equals `-a 1 -a 2 -a 3`

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

### Basic usage

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

#### Generate & display help

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
ts-node index.ts --help

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

#### Parsing, value coercions & side effects

The below invocation demonstrates how the various argument types are handled &
represented in the result. Parsing stops with the first non-argument value (here
`sourcefile.png`) and the remaining values are made available via `rest` in the
result object.

```bash
ts-node index.ts \
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

<!-- include ../../assets/tpl/footer.md -->
