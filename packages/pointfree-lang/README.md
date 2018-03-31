# @thi.ng/pointfree-lang

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/pointfree-lang.svg)](https://www.npmjs.com/package/@thi.ng/pointfree-lang)

This project is part of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Usage examples](#usage-examples)
- [Language & Syntax](#language--syntax)
    - [Comments](#comments)
    - [Identifiers](#identifiers)
    - [Word definitions](#word-definitions)
    - [Boolean](#boolean)
    - [Numbers](#numbers)
    - [Strings](#strings)
    - [Quotations (Arrays)](#quotations-arrays)
    - [Literal quotes](#literal-quotes)
    - [Variables](#variables)
    - [Objects](#objects)
    - [Sets](#sets)
- [Ideas / Todos](#ideas--todos)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Experimental, small DSL with compact [Forth]() style syntax for
[@thi.ng/pointfree](https://github.com/thi-ng/umbrella/tree/master/packages/pointfree):

- [PegJS](https://pegjs.org/) based
  [grammar](https://github.com/thi-ng/umbrella/tree/master/packages/pointfree/src/grammar.pegjs)
  & parser
- untyped, interpreted, but with AOT compilation of user defined words
- support for custom / externally defined vocabularies (word sets)
- lexically scoped variables
- nested quotations (code as data)
- array & object literals (optionally w/ computed properties)
- all other features of @thi.ng/pointfree (combinators, array/vector ops etc.)

## Status

ALPHA

## Installation

```
yarn add @thi.ng/pointfree-lang
```

```typescript
import * as pf from "@thi.ng/pointfree-lang";
```

## Usage examples

```ts
import * as pf from "../src";

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

// or call precompiled word/function directly w/ given initial stack
pf.runWord("hairx", env, [100, 200, 640, 480]);
```

## Language & Syntax

As noted previously, the syntax is closely based on Forth (and other
concatenative languages), however since this implementation is targetted
to ES6 environments, the semantics and actual implementation differ
drastically. In @thi.ng/pointfree (and therefore also in this DSL layer):

- words and programs are implemented as functional compositions of
  vanilla JS functions, i.e. `1 2 +` => `add(push(1)(push(2)(ctx)))`
  - therefore no user controlled context switch between immediate &
    compile modes, as in Forth
  - parsing of word definitions and quotations triggers compile mode
    automatically
- both stacks (D & R stacks) can store any valid JS data type
- no linear memory as in Forth, instead variables and the dictionary of
  (custom / FFI or user defined) words is stored in a separate
  environment object, which is passed to each word/function
- the DSL has syntax sugar for variable value lookups & assignments
- the DSL allows nested quotations & object literals, optionally with
  lazily resolved computed properties and/or values
- all symbols are separated by whitespace (like in Clojure, commas are considered whitespace too)

### Comments

As in Forth, comments are enclosed in `( ... )`. If the comment body
includes the `--` string, it's marked as a [stack effect
comment](https://github.com/thi-ng/umbrella/tree/master/packages/pointfree#about-stack-effects)
in preparation for future tooling additions.

Comments can span multiple lines. There's no special syntax for single
line comments:

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
```

### Identifiers

Word identifiers can contain any alhpanumeric character and these additional ones: `*?$%&/|~<>=._+-`.
Digits are not allowed as first char.

All 100+ built-in words defined by
[@thi.ng/pointfree](https://github.com/thi-ng/umbrella/tree/master/packages/pointfree)
are available by default with the following additional aliases (which
aren't valid names in the ES6 context):

| Alias | Original name |
| --- | --- |
| ?drop | dropif |
| ?dup | dupif |
| -rot | invrot |
| >r | movdr |
| >r2 | movdr2 |
| r> | movrd |
| r2> | movrd2 |
| if | condq |
| switch | casesq |
| while | loopq |
| + | add |
| - | sub |
| * | mul |
| / | div |
| 1+ | inc |
| 1- | dec |
| v+ | vadd |
| v- | vsub |
| v* | vmul |
| v/ | vdiv |
| . | print |
| .s | printds |
| .r | printrs |

The ID resolution priority is:

1. current env
2. built-in aliases
3. built-ins

### Word definitions

As in Forth, new words can be defined using the `: name ... ;` form.

```
: square ( x -- x*x ) dup * ;
```

There're no formatting rules enforced (yet, but under consideration).
However, it's strongly encouraged to include [stack effect
comments](https://github.com/thi-ng/umbrella/tree/master/packages/pointfree#about-stack-effects)
as shown in the examples above.

**Word definitions MUST be terminated with `;`.**

### Boolean

The symbol `T` evaluates as `true` and `F` as `false`.

### Numbers

- `0b...` - binary numbers (max 32 bits), e.g. `0b11110100`
- `0x...` - hex numbers (max 32bits), e.g. `0xdecafbad`
- decimals (optionally signed and/or scientific notation, e.g. `-1.23e-4`)

### Strings

`"Hello world"` - no `\"` escape feature implemented yet

### Quotations (Arrays)

Arrays can be contain any valid data literal or symbol and can be arbitrarily nested. Commas optional.

`["result: " [2, 3, *] exec +]`

### Literal quotes

A single element quotation can be formed by prefixing a term with `'`. Nestable.

- `'+` => `[+]`
- `''+` => `[[+]]`
- `[1 2]` => `[[1,2]]`

### Variables

Variables can be looked up & resolved via the currently active
environment by prefixing their name with `@`. Attempting to resolve an
unknown var will result in an error.

```ts
pf.runU(`@a @b +`, {a: 10, b: 20});
// 30
```

Storing a stack value in a variable is done via the `!` suffix:

```ts
pf.runE(`1 2 + a!`)
// {a: 3}
```

TODO add info about scoping and resolution in words / quotations...

### Objects

Plain objects literals can be created similarly as in JS, i.e.

`{key1: value, key2: val2 ...}` (again commas are optional)

Keys can be given with or without doublequotes (string literals). Quotes
are only needed if:

- the key contains spaces, has `@` prefix or `!` suffix
- is binary/hex number
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

### Sets

TODO

## Ideas / Todos

- [ ] add tests
- [ ] tail recursion (help wanted, see #1)
- [ ] async words
- [ ] canvas drawing vocab
- [ ] @thi.ng/atom vocab & integration
- [ ] @thi.ng/rstream vocab & integration

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
