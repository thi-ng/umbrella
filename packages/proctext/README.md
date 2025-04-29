<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/proctext](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-proctext.svg?de076745)

[![npm version](https://img.shields.io/npm/v/@thi.ng/proctext.svg)](https://www.npmjs.com/package/@thi.ng/proctext)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/proctext.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 206 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Features](#features)
  - [Line comments](#line-comments)
  - [Multi-value variables](#multi-value-variables)
  - [Recursive variable expansion](#recursive-variable-expansion)
  - [Variable assignments](#variable-assignments)
  - [Hidden assignments](#hidden-assignments)
  - [Dynamic, indirect variable references](#dynamic-indirect-variable-references)
  - [Modifiers](#modifiers)
  - [Controlled randomness](#controlled-randomness)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Extensible procedural text generation engine with dynamic, mutable state, indirection, randomizable & recursive variable expansions.

## Features

The generator works with a simple plain text format, supporting the following
features:

### Line comments

Lines starting with `#` are comments and completely ignored, and invisible in
the output. No block comments are available.

### Multi-value variables

Text generation and expansion relies on variables, which are defined inline
(inside the text given to the generator). New variables can be defined as
follows and each variable can define one or more possible values (one value per
line!):

```text
[name]
alice
bob
ciara
```

If more than a single value is given, a [semi-random
choice](#controlled-randomness) will be made for each instance/occurrence of the
var...

Variables are case-sensitive (i.e. `NAME` is a different var than `name`) and
can also be re-defined overridden in different parts of the document.

Variables are referenced via: `<name>`. By default, an error will be thrown if a
variable cannot be resolved. Via the `missing` option given to `generate()` a
default fallback value can be defined, which when given will **not** trigger an
error in these cases.

> [!NOTE]
> The special variable reference `<empty>` can be used to produce an empty
> string (or used as single value placeholder option inside another variable
> definition). This variable can not be redefined.

```ts tangle:export/readme-intro.ts
import { generate } from "@thi.ng/proctext";

const { result } = await generate(`
[name]
alice
bob

[action]
walked
cycled
ran
swam

[place]
office
shop
cafe
lake

[time]
this morning
last night
a week ago

# The actual generated text...
<time> <name> <action> to the <place>.
`);

console.log(result);

// last night alice cycled to the cafe.
```

### Recursive variable expansion

Variable values can contain cyclic references and/or references to other
variables.

> [!IMPORTANT]
> In the case of cyclic refs, you MUST provide at least one non-cyclic option
> to avoid infinite recursion!

```ts tangle:export/readme-var-recursion.ts
import { generate } from "@thi.ng/proctext";

const { result } = await generate(`
[activity]
walking and <activity_alt>
hiking and <activity_alt>
# the next option is cyclic...
cycling, <activity>

[activity_alt]
sleeping
coding

I enjoy <activity>.
`);

console.log(result);

// I enjoy cycling, walking and coding.
```

### Variable assignments

New variables can be declared & initialized via `<varname=existing>`. This will
create a new variable `varname` with a choice value of variable `existing`
(which must already be defined).

```ts tangle:export/readme-var-assign.ts
import { generate } from "@thi.ng/proctext";

const { result } = await generate(`
[name]
Alice
Bob
Charlie
Dora

Let's pick some random names: <hero1=name> and <hero2=name>.

But now we can use them as constants:
<hero1>, <hero1>, <hero1> & <hero2>, <hero2>, <hero2>
`);

console.log(result);

// Let's pick some random names: Dora and Bob.
//
// But now we can use them as constants:
// Dora, Dora, Dora & Bob, Bob, Bob
```

### Hidden assignments

Normally, variable assignments are also causing the chosen value to be emitted
as part of the generated text. Sometimes it's useful to _not_ do so and
suppress/hide output by using the prefix `!` as part of the assignment, like so:

```ts tangle:export/readme-hidden-var.ts
import { generate } from "@thi.ng/proctext";

const { result } = await generate(`
[name]
Asterix
Obelix

# hidden assignment
<!hero=name>
My name is <hero>.`);

console.log(result);

// My name is Asterix.
```

### Dynamic, indirect variable references

Given a variable assignment like `<hero=name>`, we can use dots in the name to
lookup derived variables with their name based on current value(s).

For the following example:

- assume the assignment of `<hero=name>` picked value `a`
- now the var lookup `<hero.job>` will look for a var called `a.job`
- there's only one option for `a.job`, i.e. `astronaut`
- the lookup `hero.job.desc` will then look for `astronaut.desc`

```ts tangle:export/readme-indirect.ts
import { generate } from "@thi.ng/proctext";

const { result } = await generate(`
[name]
A
B

[A.job]
astronaut

[B.job]
baker

[astronaut.desc]
shooting for the stars
flying to the moon

[baker.desc]
baking bread

<hero=name> is a <hero.job>, <hero.job.desc>.`);

console.log(result);

// B is a baker, baking bread.
```

### Modifiers

Variable references can be optionally processed via one or more modifiers via
`<varname;mod>` or `<varname;mod1;mod2...>`. Each modifier is a simple async
function receiving a string and transforming it into another string. These
functions are async to allow modifiers consulting external data
sources/processes...

The following modifiers are provided by default:

- `uc`: uppercase
- `lc`: lowercase
- `cap`: capitalize

Custom modifiers can be provided via options given to `generate()`:

```ts tangle:export/readme-modifiers.ts
import { generate } from "@thi.ng/proctext";

const DIRECTIONS = {
    e: "east",
    w: "west",
    n: "north",
    s: "south",
    d: "down",
    u: "up",
};

const ROOMS = {
    house: {
        desc: "very homely",
        exits: { e: "garden", u: "rafters" },
    },
    rafters: {
        desc: "pretty dark",
        exits: { d: "house" },
    },
    garden: {
        desc: "super lush",
        exits: { w: "house" },
    },
};

// partially data-driven template
const { result } = await generate(`
[room]
${Object.keys(ROOMS).join("\n")}

You're in the <here=room> (exits: <here;exits;uc>)...
It feels <here;desc> here.
`, {
    // custom modifiers (will be added to existing defaults)
    mods: {
        // produce a list of exits for given room ID
        exits: async (id) => Object.keys(ROOMS[id].exits).map((dir) => DIRECTIONS[dir]).join(", "),
        // return a room's description
        desc: async (id) => ROOMS[id].desc
    }
});

console.log(result);

// You're in the house (exits: EAST, UP)...
// It feels very homely here.
```

### Controlled randomness

The selection of variable choices is determined by the configured [PRNG
instance](https://thi.ng/random), the number of recent values selected/memorized
and the number of attempts made to pick a new unique choice. All of these can be
configured via options given to `generate()`:

```ts
import { generate } from "@thi.ng/proctext";
import { SYSTEM } from "@thi.ng/random";

// here we show default options used
generate(`...`, {
    rnd: SYSTEM,
    maxHist: 1,
    maxTrials: 10
});
```

The `maxHist = 1` means that for each variable only the last value picked will
be memorized. If more than 1 value options exists for a variable, successive var
expansions will not result in duplicates, e.g.

```text
[name]
a
b

<name> <name> <name>
```

...will only ever result in one of these two sequences: `a b a` or `b a b`.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bproctext%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/proctext
```

ESM import:

```ts
import * as pro from "@thi.ng/proctext";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/proctext"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const pro = await import("@thi.ng/proctext");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.34 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/object-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/object-utils)
- [@thi.ng/parse](https://github.com/thi-ng/umbrella/tree/develop/packages/parse)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                             | Description                                                                              | Live demo                                             | Source                                                                             |
|:-----------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/procedural-text.jpg" width="240"/> | Procedural stochastic text generation via custom DSL, parse grammar & AST transformation | [Demo](https://demo.thi.ng/umbrella/procedural-text/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/procedural-text) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/proctext/)

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-proctext,
  title = "@thi.ng/proctext",
  author = "Karsten Schmidt",
  note = "https://thi.ng/proctext",
  year = 2023
}
```

## License

&copy; 2023 - 2025 Karsten Schmidt // Apache License 2.0
