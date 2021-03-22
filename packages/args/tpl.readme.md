# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Includes built-in support for the following argument types (of course custom arg types are supported too):

| **Argument type**    | **Multiple** | **Example**                | **Result**                    |
|----------------------|--------------|----------------------------|-------------------------------|
| **Flag**             |              | `--force`, `-f`            | `force: true`                 |
| **String**           | ✅            | `--foo bar`                | `foo: "bar"`                  |
| **Float/int/hex**    | ✅            | `--bg ff997f`              | `bg: 16750975`                |
| **Enum**             | ✅            | `--type png`               | `type: "png"`                 |
| **KV pairs**         | ✅            | `--define foo=bar`         | `define: { foo: "bar" }`      |
| **JSON**             |              | `--config '{"foo": [23]}'` | `config: { foo: [23] }`       |
| **Fixed size tuple** |              | `--size 640x480`           | `size: { value: [640, 480] }` |

If multiple values/repetitions are allowed for an argument, the values will be
collected into an array (apart from KV pairs, which will yield an object).
Furthermore, for multi-args, an optional delimiter can be specified to extract
individual values, e.g. `-a 1,2,3` equals `-a 1 -a 2 -a 3`

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

### Basic usage

```ts
type ImgType = "png" | "jpg" | "gif" | "tiff";

// CLI args will be validated against this interface
interface TestArgs {
    configPath?: string;
    force: boolean;
    bg: number;
    type: ImgType;
    size?: Tuple<number>;
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
    // JSON string arg
    xtra: json({
        alias: "x",
        desc: "Extra options",
    }),
    // key-value pairs parsed into an object
    define: kvPairs({ alias: "D", desc: "Define dict entry" }),
};

try {
    // parse argv w/ above argument specs & default options
    // (by default usage is shown if error occurs)
    const args = parse(specs, process.argv);
    console.log(args);
} catch (_) {}
```

#### Generate & display help

Usage information can be generated via `usage()` and is automatically triggered
via the special `--help` option (configurable, see
[ParseOpts](https://docs.thi.ng/umbrella/args/interfaces/parseopts.html)).

Each arg can be associated with arbitrary group IDs, which are then used to
segment usage output. By default, `flag()` args are assigned to a `"flags"`
group, all others to `"main"`. The default output order too is `["flags",
"main"]`, but can be configured via a `group` option given an arg spec or
factory function.

By default, ANSI colors are used to format the result string of `usage()`, but
can be disabled (see
[`UsageOpts`](https://docs.thi.ng/umbrella/args/interfaces/usageopts.html)).

```text
ts-node index.ts --help

-f, --force                     Force operation

--bg HEX                        Background color
-c PATH, --config-path PATH     Config file path (CLI args always take
                                precedence over those settings)
-D key=val, --define key=val    [multiple] Define dict entry
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

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
