<!-- This file is generated - DO NOT EDIT! -->

# ![pointfree-lang](https://media.thi.ng/umbrella/banners/thing-pointfree-lang.svg?7bfa2e42)

[![npm version](https://img.shields.io/npm/v/@thi.ng/pointfree-lang.svg)](https://www.npmjs.com/package/@thi.ng/pointfree-lang)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/pointfree-lang.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Command line usage](#command-line-usage)
  - [Include files / libraries](#include-files--libraries)
  - [CLI example](#cli-example)
- [API](#api)
- [Language & Syntax](#language--syntax)
  - [Comments](#comments)
  - [Identifiers](#identifiers)
  - [Word definitions](#word-definitions)
    - [Word metadata](#word-metadata)
    - [Hyperstatic words](#hyperstatic-words)
    - [Dynamic word creation from quotations](#dynamic-word-creation-from-quotations)
    - [Local variables](#local-variables)
  - [Boolean](#boolean)
  - [Numbers](#numbers)
  - [Strings](#strings)
  - [Quotations (Arrays)](#quotations-arrays)
  - [Literal quotes](#literal-quotes)
  - [Variables](#variables)
    - [Dynamic scoping](#dynamic-scoping)
  - [Objects](#objects)
- [Ideas / Todos](#ideas--todos)
- [Authors](#authors)
- [License](#license)

## About

Experimental language layer with compact
[Forth](https://en.wikipedia.org/wiki/Forth_(programming_language))
style syntax for
[@thi.ng/pointfree](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree),
an ES6 embedded DSL for concatenative programming:

- [PegJS](https://pegjs.org/) based
  [grammar](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree-lang/src/grammar.pegjs)
  & parser
- untyped, interpreted, but with AOT compilation of user defined words
- hyperstatic word definitions
- support for custom / externally defined words (JS functions)
- dynamically scoped variables (stored in environment object)
    - syntax sugar for declaring & autobinding local vars w/ stack values
- nested quotations (code as data, vanilla JS arrays)
- dynamic word construction from quotations
- array & object literals (optionally w/ computed properties)
- all other features of @thi.ng/pointfree (combinators, array/vector ops etc.)
- CLI version w/ basic file I/O, library includes, JSON

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpointfree-lang%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/pointfree-lang
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/pointfree-lang"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const pointfreeLang = await import("@thi.ng/pointfree-lang");
```

Package sizes (gzipped, pre-treeshake): ESM: 4.97 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/args](https://github.com/thi-ng/umbrella/tree/develop/packages/args)
- [@thi.ng/bench](https://github.com/thi-ng/umbrella/tree/develop/packages/bench)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/pointfree](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                           | Description                      | Live demo | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:---------------------------------|:----------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pointfree-svg.png" width="240"/> | Generate SVG using pointfree DSL |           | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pointfree-svg) |

## Command line usage

The package includes a `pointfree` CLI command to evaluate strings or files:

```text
npx @thi.ng/pointfree-lang

Usage: pointfree [options] [file]

Options:
  -V, --version     output the version number
  -d, --debug       print debug info
  -e, --exec <src>  execute given string
  -h, --help        display help for command
```

For CLI usage, in addition to the other language features discussed further below, the following words are available too (more to be added):

| Word         | Stack comment        | Description                               | NodeJS equiv                |
|--------------|----------------------|-------------------------------------------|-----------------------------|
| `@args`      | `( -- arg[] )`       | Places CLI args on stack<sup>(1)</sup>    | `process.argv`              |
| `include`    | `( path -- )`        | Includes another pointfree-lang file      |                             |
| `read-dir`   | `( path -- file[] )` | Returns array of file names in given dir  | `readdirSync(path)`         |
| `read-file`  | `( path -- str )`    | Reads file and returns contents as string | `readFileSync(path)`        |
| `write-file` | `( body path -- )`   | Writes body to file at given path         | `writeFileSync(path, body)` |

- <sup>(1)</sup> - index 0 is the first user supplied arg (rather than 2 as with `process.argv`)

### Include files / libraries

As mentioned in the table above, other pointfree-lang source files can
be recursively included via `include`. The inclusion mechanism so far is
basic, but can break cyclical dependencies, though the behavior will
still be improved in the future. All imported words are added to the
same environment. Use namespacing if needed (e.g. `prefix.foo` vs
`foo`), word names can be more flexible than in JS.

File `lib.f`:

```forth
: lib.hello ( name -- greeting ) "hello, " swap "!" + + ;
```

```bash
# eval program string w/ arg
pointfree -e '"lib.f" include @args 0 at lib.hello .' asterix
# hello, asterix!
```

### CLI example

A small example tool to scan a package directory and display package
names w/ their current versions, with optional support to filter package
list via regexp:

Save the following file to `semver.f` (Btw. Use `.f` as file ext to
harness existing syntax coloring support for Forth...)

```forth
( builds path to package.json )
: pkg-path ( name base -- path ) swap "/" swap "/package.json" + + + ;

( takes package dir , returns parsed package.json )
: read-pkg ( name base -- json ) pkg-path read-file json> ;

( extracts semver package name from given package object )
: pkg-semver ( pkg -- name@version ) dup "name" at "@" rot "version" at + + ;

( package list filter )
: filter-pkg ( name pat -- name? ) over -rot match? not [ drop ] when ;

( store pattern and base dir in global var )
@args dup 1 at pattern! 0 at base!

( load packages dir )
@base read-dir

( filter package list if 2nd CLI arg given )
@args length 1 > [ [ @pattern filter-pkg ] mapll ] when

( try to process all packages, ignoring any errors )
[ [ @base read-pkg pkg-semver . ] [ drop ] try ] mapl
```

```bash
# list all
pointfree semver.f node_modules
# JSONStream@1.3.5
# abab@2.0.3
# abbrev@1.1.1
# acorn@6.4.0
# acorn-globals@4.3.4
# acorn-walk@6.2.0
# ... 100's more ...

# filtered w/ pattern (regex)
pointfree semver.f node_modules '^type'
# type-check@0.3.2
# type-fest@0.3.1
# typedarray@0.0.6
# typedarray-to-buffer@3.1.5
# typedoc@0.16.10
# typedoc-default-themes@0.7.2
# typescript@3.8.3
```

## API

[Generated API docs](https://docs.thi.ng/umbrella/pointfree-lang/)

(Code for the above example)

```ts
// DSL source code (syntax described further below)

const src = `
( helper words for forming 2D vectors )
: xy ( x y -- [x y] ) vec2 ;
: yx ( x y -- [y x] ) swap vec2 ;

( generate horizontal line coords )
: hline ( y width -- [0 y] [width y])
  over 0 yx -rot yx ;

( generate vertical line coords )
: vline ( x height -- [x 0] [x height])
  over 0 xy -rot xy ;

( draw haircross w/ FFI 'gfx.line' word )
: hairx ( x y w h -- [] )
  -rot [vline] [hline] bis2 [gfx.line] bia2;
`;

// custom word definition (will be used by `hairx` word above)
// stack effect:
// ( [x1 y1] [x2 y2] -- )

const drawLine = (ctx) => {
    const stack = ctx[0];
    // minimum stack depth guard
    pf.ensureStack(stack, 2);
    // pop top 2 values
    const [x2, y2] = stack.pop();
    const [x1, y1] = stack.pop();
    console.log(`draw line: ${x1},${y1} -> ${x2},${y2}`);

    // if we had a canvas drawing context stored in env...
    // const canvasCtx = ctx[2].canvasContext;
    // canvasCtx.beginPath();
    // canvasCtx.moveTo(x1, y1);
    // canvasCtx.lineTo(x2, y2);
    // canvasCtx.stroke();

    // or... alternatively generate SVG (and push result on stack (or store in env)
    // stack.push(`<line x1="${x1}" y1="${y1} x2="${x2} y2="${y2}"/>`);

    // ...same again, but in @thi.ng/hiccup format
    // stack.push(["line", {x1,y1,x2,y2}])

    return ctx;
};

// the DSL interpreter & compiler uses an environment object
// to lookup & store word definitions & variables
// here we create new environment and associate custom FFI word(s)
const env = pf.ffi({}, {
    "gfx.line": drawLine
});

// compile / execute source code w/ given env
// the compiled words will be stored in the env
pf.run(src, env);

// (optional, but that's how we do it here for example purposes)
// store some external state / config in env
// this could be modified via event handlers etc.
env.mouseX = 100;
env.mouseY = 200;
env.width = 640;
env.height = 480;

// now actually call the `hairx` word with args pulled from env
// words prefixed w/ `@` are variable lookups
pf.run(`@mouseX @mouseY @width @height hairx`, env);
// draw line: 100,0 -> 100,480
// draw line: 0,200 -> 640,200

// or call precompiled word/function directly w/ given initial stack
pf.runWord("hairx", env, [100, 200, 640, 480]);
// draw line: 100,0 -> 100,480
// draw line: 0,200 -> 640,200
```

## Language & Syntax

As noted previously, the syntax is closely based on Forth (and other
concatenative languages), however since this implementation is targetted
to ES6 environments, the semantics and actual implementation differ
drastically. In this DSL (and most aspects also in @thi.ng/pointfree):

- words and programs are implemented as functional compositions of
  vanilla JS functions, i.e. `1 2 +` => `add(push(2)(push(1)(ctx)))`
  - therefore no user controlled context switch between immediate &
    compile modes, as in Forth
  - parsing of word definitions triggers compile mode automatically
- variables and both stacks (D & R stacks) can store any valid JS data
  type
- no linear memory as in Forth, instead variables and the dictionary of
  (custom / FFI or user defined) words is stored in a separate
  environment object, which is passed to each word/function
- the DSL has syntax sugar for variable value lookups & assignments
- within word definitions the DSL supports binding stack values to local
  vars at the beginning of the word
- the DSL supports nested quotations (array) & object literals, incl.
  support for computed properties and/or values (lazily resolved within
  words)
- all symbols are separated by whitespace (like in Clojure, commas are
  considered whitespace too)

### Comments

As in Forth, comments are enclosed in `( ... )`. If the comment body
includes the `--` string, it's marked as a [stack effect
comment](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree#about-stack-effects).
The first stack comment of a word is added to the [word's metadata](#word-metadata) in
preparation for future tooling additions.

Comments current cannot contain `(` or `)`, but can span multiple lines.

Since v1.4.0 line comments are supported, use the standard JS `//`
prefix and extend until the next newline char.

```
( multiline:
              .__        __    _____
______   ____ |__| _____/  |__/ ____\______   ____   ____
\____ \ /  _ \|  |/    \   __\   __\\_  __ \_/ __ \_/ __ \
|  |_> >  <_> )  |   |  \  |  |  |   |  | \/\  ___/\  ___/
|   __/ \____/|__|___|  /__|  |__|   |__|    \___  >\___  >
|__|                  \/                         \/     \/

)

1 2 ( embedded single line ) 3

// single line comment
```

### Identifiers

Word identifiers can contain any alhpanumeric character and these
additional ones: `*?$%&/|~<>=._+-`. However, digits are not allowed as
first char.

All 100+ built-in words defined by
[@thi.ng/pointfree](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree)
are available by default with the following additional aliases (which
aren't valid names in the ES6 context):

| Alias    | Original name |
|----------|---------------|
| `?drop`  | `dropif`      |
| `?dup`   | `dupif`       |
| `-rot`   | `invrot`      |
| `>r`     | `movdr`       |
| `>r2`    | `movdr2`      |
| `r>`     | `movrd`       |
| `r2>`    | `movrd2`      |
| `if`     | `condq`       |
| `switch` | `casesq`      |
| `while`  | `loopq`       |
| `try`    | `$try`        |
| `+`      | `add`         |
| `-`      | `sub`         |
| `*`      | `mul`         |
| `/`      | `div`         |
| `v+`     | `vadd`        |
| `v-`     | `vsub`        |
| `v*`     | `vmul`        |
| `v/`     | `vdiv`        |
| `=`      | `eq`          |
| `not=`   | `neq`         |
| `<=`     | `lteq`        |
| `>=`     | `gteq`        |
| `<`      | `lt`          |
| `>`      | `gt`          |
| `pos?`   | `ispos`       |
| `neg?`   | `isneg`       |
| `nil?`   | `isnil`       |
| `zero?`  | `iszero`      |
| `match?` | `ismatch`     |
| `>json`  | `tojson`      |
| `json>`  | `fromjson`    |
| `>word`  | `word`        |
| `pi`     | `Math.PI`     |
| `tau`    | `2 * Math.PI` |
| `.`      | `print`       |
| `.s`     | `printds`     |
| `.r`     | `printrs`     |
| `.e`     | print env     |

The ID resolution priority is:

1. current env
2. built-in aliases
3. built-ins

### Word definitions

As in Forth, new words can be defined using the `: name ... ;` form.

```
: square ( x -- x*x ) dup * ;

10 square .
```

Will result in `100`.

There're no formatting rules enforced (yet, but under consideration).
However, it's strongly encouraged to include [stack effect
comments](https://github.com/thi-ng/umbrella/tree/develop/packages/pointfree#about-stack-effects)
as shown in the examples above.

Word definitions MUST be terminated with `;`.

#### Word metadata

The following details are stored in the `__meta` property of each
compiled word. This metadata is not yet used, but stored in preparation
for future tooling additions.

- `name` - word name
- `loc` - source location `[line, col]`
- `stack` - optional stack effect comment
- `arities` - optional input/output arities (numeric representation of
  stack comment)
- `doc` - optional docstring (currently unused)

Only the first stack comment in a word definition is kept. If either
side of the comment contains a `?`, the respective arity will be set to
-1 (i.e. unknown). For example:

- `( -- ? )` - no inputs, unknown output(s)
- `( -- x )` - no inputs, one output
- `( a ? -- )` - unknown/flexible number of inputs, no outputs
- `( a b -- a )` - 2 inputs, 1 output

```ts
const ctx = run(`: foo ( -- x ) 42;`);

ctx[2].__words.foo.__meta
// { name: 'foo', loc: [ 1, 1 ], doc: ' -- x', arities: [ 0, 1 ] }
```

#### Hyperstatic words

Unlike [variables](#variables), which are [dynamically
scoped](https://en.wikipedia.org/wiki/Scope_(computer_science)#Dynamic_scoping),
words are defined in a
[hyper-static](http://wiki.c2.com/?HyperStaticGlobalEnvironment)
environment, meaning new versions of existing words can be defined,
however any other word (incl. the new version of same word) which uses
the earlier version will continue to use that older version.
Consequently, this too means that attempting to use undefined words
inside a word definition will fail, even if they'd be defined later on.
In these cases, use of variables and/or quotations is encouraged to
implement dynamic programming techniques.

```ts
// hyperstaticness by example
pf.run(`
: foo "foo1" ;
: bar foo "bar" + ;

( redefine foo, incl. use of existing version )
: foo foo "foo2" + ;

( use words )
foo bar
`)[0];
// [ 'foo1foo2', 'foo1bar' ]
```

#### Dynamic word creation from quotations

Quotations are used to treat code as data, delay execution of words
and/or dynamically compose words. The latter can be achieved via the
`>word`, which takes a quotation and a word name as arguments.

```forth
( takes min/max values, produces range check quotation )
( uses local variables `a` and `b`, see section below  )

: range-check ( a b -- q ) ^{ a b } [dup @a >= [@b <=] [drop F] if] ;

( build range check for "0".."9" ASCII interval and define as word `digit?` )
0 9 range-check "digit?" >word

( now use... )
"5" digit? . ( true )
"a" digit? . ( false )
```

#### Local variables

A word definition can include an optional declaration of local
variables, which are automatically bound to stack values each time the
word is invoked. The declarations are given via the form:

```forth
: wordname ^{ name1 name2 ... } ... ;
```

If used, the declaration MUST be given as first element of the word,
even before the optional stack comment:

```ts
// word with 2 local vars binding: a & b
// when the word is used, first pops 2 values from stack
// and stores them in local vars (in right to left order)
pf.run(`
: add ^{ a b } ( a b -- a+b )
  "a=" @a + .
  "b=" @b + . ;

1 2 add
`);
// a=1
// b=2
```

See [section about variables](#variables) for further details...

### Boolean

The symbol `T` evaluates as `true` and `F` as `false`.

### Numbers

- `0b...` - binary numbers (max 32 bits), e.g. `0b11110100`
- `0x...` - hex numbers (max 32bits), e.g. `0xdecafbad`
- decimals (optionally signed and/or scientific notation, e.g. `-1.23e-4`)

### Strings

`"Hello world"` - no `\"` escape feature implemented yet

### Quotations (Arrays)

Arrays can be contain any valid data literal or symbol and can be
arbitrarily nested. Commas optional.

`["result: " [2, 3, *] exec +]`

### Literal quotes

A single element quotation can be formed by prefixing a term with `'`. Nestable.

- `'+` => `[+]`
- `''+` => `[[+]]`
- `[1 2]` => `[[1,2]]`

### Variables

Variables can be looked up & resolved via the currently active
environment and scope by prefixing their name with `@`. Attempting to
resolve an unknown var will result in an error.

```ts
pf.runU(`@a @b +`, {a: 10, b: 20});
// 30
```

Assigning a value to a variable (in the the current scope) is done via
the `!` suffix:

```ts
pf.runE(`1 2 + a!`)
// {a: 3}
```

Furthermore, readonly variables can be defined via words. In this case
no prefix must be used and these kind of variables are
[hyperstatic](#hyperstatic-words).

```ts
pf.run(`: pi 3.1415 ; "π=" pi + .`);
// π=3.1415
```

#### Dynamic scoping

Each variable is resolved via its own stack of binding scopes, and
therefore technically results in [dynamic
scoping](https://en.wikipedia.org/wiki/Scope_(computer_science)#Dynamic_scoping).
However, in this DSL a new scope is only introduced when a word defines
a local var with an already existing name, so in practice the effect is
more like lexical scoping.

Var assignment always only impacts the current scope of a var.

```ts
// predefined global scope (via env binding)
pf.runU(`@a`, {a: 1});
// 1

// dynamically created global var, then used in quotation
pf.runU(`1 a! [@a @a]`);
// [1, 1]

// var lookup inside word
pf.runU(`: foo @a ; foo`, {a: 1});
// 1

// global & word local vars
// local var (value obtained from stack) takes precendence inside word
pf.runU(`: foo ^{ a } @a ; 2 foo, 3 foo, @a vec3`, {a: 1});
// [2, 3, 1]

// nested local var scopes
// both `foo` & `bar` define a local var `a`
pf.run(`
: foo ^{ a }
  "foo a=" @a + .
  ( since 'a' is declared as local var  )
  ( assignment is only to local scope )
  100 a! ;

: bar ^{ a }
  "bar1 a=" @a + .
  @a inc foo         ( call 'foo' w/ new value )
  "bar2 a=" @a + . ; ( @a still has same value here )

1 bar
"global a=" @a + .   ( global @a never modified )
`, { a: 0 });
// bar1 a=1
// foo a=2
// bar2 a=1
// global a=0

// since `b` is NOT declared as local var inside `foo`
// assigning a value to `b` (even inside `foo`) will be treated as global
pf.runE(`: foo @a b! ; foo`, {a: 1})
// { a: 1, b: 1, __words: { foo: [Function] } }

// here `foo` doesn't declare any locals
// so assignment to `a` will impact parent scope:
// - when `foo` is called from `bar`, bar's `a` var is modified
// - when `foo` is called from root level, global var `a` is created/modified
pf.runE(`
: foo 10 a! ;

: bar ^{ a }
  "before foo a=" @a + .
  foo
  "after foo a=" @a + . ;

1 bar

foo`
);
// before foo a=1
// after foo a=10
{ a: 10 ... }
```

### Objects

Plain objects literals can be created similarly as in JS, i.e.

`{key1: value, key2: val2 ...}` (again commas are optional)

Keys can be given with or without doublequotes (string literals). Quotes
for keys are only needed if:

- the key contains spaces, has `@` prefix or `!` suffix
- is a binary / hex number
- a number in scientific notation

Furthermore, variables can be used both as keys and/or values:

`{@a: {@b: @c}}`

```ts
// dynamically resolved switch using `bingo` var
src = `{@bingo: ["yay: " @bingo +] default: ["nope"]} switch`;
pf.runU(src, {bingo: 42}, [42]);
// bingo: 42

pf.runU(src, {bingo: 42}, [43]);
// nope
```

## Ideas / Todos

- [ ] add tests
- [ ] tail recursion (help wanted, see #1)
- [ ] async words
- [ ] canvas drawing vocab
- [ ] @thi.ng/atom vocab & integration
- [ ] @thi.ng/rstream vocab & integration

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-pointfree-lang,
  title = "@thi.ng/pointfree-lang",
  author = "Karsten Schmidt",
  note = "https://thi.ng/pointfree-lang",
  year = 2018
}
```

## License

&copy; 2018 - 2021 Karsten Schmidt // Apache Software License 2.0
