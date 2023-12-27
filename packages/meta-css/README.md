<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/meta-css](https://media.thi.ng/umbrella/banners-20230807/thing-meta-css.svg?36f6c755)

[![npm version](https://img.shields.io/npm/v/@thi.ng/meta-css.svg)](https://www.npmjs.com/package/@thi.ng/meta-css)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/meta-css.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
- [Generating CSS frameworks](#generating-css-frameworks)
  - [Framework generation specs & syntax](#framework-generation-specs--syntax)
  - [Example generation spec](#example-generation-spec)
  - [Spec structure](#spec-structure)
    - [Variations](#variations)
    - [Parametric IDs](#parametric-ids)
    - [Values](#values)
    - [Properties](#properties)
    - [Key value generation](#key-value-generation)
  - [Media query definitions](#media-query-definitions)
- [Converting meta stylesheets to CSS](#converting-meta-stylesheets-to-css)
  - [Meta-stylesheets syntax](#meta-stylesheets-syntax)
    - [Class identifiers & media query prefixes](#class-identifiers--media-query-prefixes)
    - [Media query prefixes](#media-query-prefixes)
  - [Including custom CSS files](#including-custom-css-files)
  - [Force inclusion of unreferenced classes](#force-inclusion-of-unreferenced-classes)
- [Exporting a generated framework as CSS](#exporting-a-generated-framework-as-css)
  - [Media query variations](#media-query-variations)
- [Bundled CSS base framework](#bundled-css-base-framework)
  - [Classes by category](#classes-by-category)
  - [Media queries](#media-queries)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

## About

Data-driven CSS framework codegen, transpiler & bundler.

This toolchain and the overall workflow proposed by it is heavily building atop
the concept of _CSS utility classes_ (as known from Tachyons, Turret or the
newer Tailwind projects). How and where those CSS classes are applied is however
a defining point of difference to other existing approaches. Furthermore, using
JSON as data format for expressing generative rules and as intermediate format
for generated frameworks, removes the need for any complex CSS-related
dependencies and makes it trivial to build secondary tooling around (e.g. part
of this readme is an auto-generated report of the included base framework
specs).

This readme aims to provide a thorough overview of this toolchain and some
concrete usage examples...

Note: In all cases, final CSS generation itself is handled by
[thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup-css/).

**👷🏻 This is all WIP!** Also see included & linked examples for basic usage...

## Generating CSS frameworks

The `generate` command is used to generate custom frameworks with (likely)
hundreds of CSS utility classes from a number of extremely compact, parametric
JSON rule specs. This process generates all desired, combinatorial versions of
various rules/declarations and exports them to another JSON file used as
intermediary for the other commands provided by this toolchain. The
[syntax/format of the generator rules](#framework-generation-specs--syntax) is explained
further on. These rule specs can be split up into multiple files for better
handling, can define [arbitrary media query criteria]() (all later combinable),
shared lookup tables for colors, margins, sizes, timings etc.

The package includes generator specs for a basic, fully customizable,
[tachyons.io](https://tachyons.io)-derived [CSS
framework](#bundled-css-base-framework). These specs and resulting framework are
still being worked on and are used for some example projects in this repo, but
are mostly intended as basic starting points for creating other custom
frameworks (in the hope they'll be shared back similarly)...

```text
metacss generate --help

Usage: metacss generate [opts] input-dir

Flags:

-p, --pretty            Pretty print output
-v, --verbose           Display extra process information

Main:

-o STR, --out STR       Output file (or stdout)
--prec INT              Number of fractional digits (default: 3)
```

### Framework generation specs & syntax

This section gives an overview of the JSON format used to generate CSS
frameworks of dozens (usually hundreds) of utility classes, including many
possible variations (per spec).

Generation specs use a simple JSON structure as shown below. The specs can be
split over multiple files within a directory and will all be merged by the
`generate` command of the toolchain.

```json5
{
    // optional meta data (later used for comment injection in generated CSS)
    "info": {
        "name": "Framework name",
        "version": "0.0.0",
    },
    // optional media queries and their criteria, will be merged from multiple spec files
    "media": {
        "large": { "min-width": "60rem" },
        "dark": { "prefers-color-scheme": "dark" }
    },
    // optional shared values/LUTs (arrays or objects)
    // tables are always local to the current spec file only...
    "tables": {
        "margins": [0, 0.25, 0.5, 1, 2, 4]
    },
    // optional shared variations
    "vars": {
        "size": ["width", "height"]
    },
    // optional thi.ng/hiccup-css declarations which will be part of the framework
    // (e.g. for CSS reset purposes), will be merged from multiple spec files
    "decls": [
        ["html", { "box-sizing": "border-box" }]
    ],
    // array of actual generation specs
    "specs": [
        //...
    ]
}
```

### Example generation spec

The following generator document uses a single small generative rule spec to
create altogether 21 utility classes for various possible margins (where 21 = 3
margin sizes provided × 7 variations).

For each additional value added to the `margins` table, 7 more CSS classes will be
generated. The `name` (class) and `props` (CSS property name) are parametric and
will be explained in more detail further below.

```json tangle:export/readme-margins.json
{
    "tables": {
        "margins": [0, 0.5, 1]
    },
    "specs": [
        {
            "name": "m<vid><k>",
            "props": "margin<var>",
            "values": "margins",
            "unit": "rem",
            "var": ["a", "t", "r", "b", "l", "h", "v"]
        }
    ]
}
```

Assuming the above spec has been saved to a JSON file in the `myspecs`
directory...

```bash
# the `generate` cmd is directory based and will read all
# JSON files in the provided dir (recursively)...

# if no `--out` file is given, the result will go to stdout
metacss generate --pretty myspecs
```

...this command (with the above spec) will generate the following output (here
we're only interested in the entries under `classes`):

```json
{
    "info": {
        "name": "TODO",
        "version": "0.0.0"
    },
    "media": {},
    "classes": {
        "ma0": { "margin": "0rem" },
        "ma1": { "margin": ".5rem" },
        "ma2": { "margin": "1rem" },
        "mh0": { "margin-left": "0rem", "margin-right": "0rem" },
        "mh1": { "margin-left": ".5rem", "margin-right": ".5rem" },
        "mh2": { "margin-left": "1rem", "margin-right": "1rem" },
        "mv0": { "margin-top": "0rem", "margin-bottom": "0rem" },
        "mv1": { "margin-top": ".5rem", "margin-bottom": ".5rem" },
        "mv2": { "margin-top": "1rem", "margin-bottom": "1rem" },
        "mt0": { "margin-top": "0rem" },
        "mt1": { "margin-top": ".5rem" },
        "mt2": { "margin-top": "1rem" },
        "mr0": { "margin-right": "0rem" },
        "mr1": { "margin-right": ".5rem" },
        "mr2": { "margin-right": "1rem" },
        "mb0": { "margin-bottom": "0rem" },
        "mb1": { "margin-bottom": ".5rem" },
        "mb2": { "margin-bottom": "1rem" },
        "ml0": { "margin-left": "0rem" },
        "ml1": { "margin-left": ".5rem" },
        "ml2": { "margin-left": "1rem" }
    }
}
```

When later used in stylesheets, we can then refer to each of these classes by
their generated names, e.g. `ma0` to disable all margins or `mh2` to set both
left & right margins to `1rem` (in this case)...

### Spec structure

An individual generator spec JSON object can contain the following keys:

| **ID**   | **Type**                | **Description**                                              |
|----------|-------------------------|--------------------------------------------------------------|
| `name`   | string                  | Parametric name for the generated CSS class(es)              |
| `props`  | string or object        | CSS property name(s), possibly parametric                    |
| `values` | string, array or object | Values to be assigned to CSS properties, possibly parametric |
| `unit`   | string, optional        | CSS unit to use for values                                   |
| `key`    | string, optional        | Method for deriving keys from current value                  |
| `var`    | string[], optional      | Array of variation IDs (see section below)                   |
| `user`   | any, optional           | Custom user data, comments, metadata etc.                    |

The number of generated CSS classes per spec is the number of items in `values`
multiplied by the number of variations in `var` (if any).

Any `user` data will be stored (as is) with each generated CSS class, but
currently has no other direct use in the toolchain and is meant for additional
user-defined tooling.

#### Variations

Variations can be requested by providing an array of valid variation IDs. If
used, `<vid>` or `<var>` parameters must be used in the `name` or else naming
conflicts will occur.

| **ID**     | **Expanded values**   |
|------------|-----------------------|
| `""`       | `[""]`                |
| `"a"`      | `[""]`                |
| `"b"`      | `["-bottom"]`         |
| `"bottom"` | `["bottom"]`          |
| `"h"`      | `["-left", "-right"]` |
| `"l"`      | `["-left"]`           |
| `"left"`   | `["left"]`            |
| `"r"`      | `["-right"]`          |
| `"right"`  | `["right"]`           |
| `"t"`      | `["-top"]`            |
| `"top"`    | `["top"]`             |
| `"v"`      | `["-top", "-bottom"]` |
| `"x"`      | `["-x"]`              |
| `"y"`      | `["-y"]`              |

#### Parametric IDs

The following parameters can (and should) be used in a spec's `name` and `props`
to generate multiple pattern-based values (more examples below).

- `<vid>` is a value from the ID column of the above variations table. If no
  variations are requested, its value will be an empty string.
- `<var>` is one of the expanded values for the current variation (2nd column of
  variations table). If no variations are defined, this too will be an empty
  string.
- `<v>` is the currently processed value of a spec's `values`.
- `<k>` is the key (possibly derived) for the currently processed value of a
  spec's `values` and will depend on the type of `values` (see below)

#### Values

The `values` are used to populate the `props` (CSS properties). If `values` is a
string it will be used as table-name to look up in the current spec file's
`tables`, an object storing values which should be shared among specs (only in
the same file).

Other allowed types of `values`: string array, numeric array or object of
key-value pairs (where values are strings or numbers too). The following
examples will all produce the same outcome:

Using a named `tables` entry:

```json
{
    "tables": {
        "test": ["red", "green", "blue"]
    },
    "specs": [
        {
            "name": "test<v>",
            "props": "color",
            "values": "test"
        }
    ]
}
```

Using an array directly (here only showing the spec itself for brevity):

```json
{
    "name": "test<v>",
    "props": "color",
    "values": ["red", "green", "blue"]
}
```

Using an object (ignoring the keys, only using the values here):

```json
{
    "name": "test<v>",
    "props": "color",
    "values": { "r": "red", "g": "green", "b": "blue"}
}
```

All 3 versions will result in these utility classes:

```json
{
    "test-red": { "color": "red" },
    "test-green": { "color": "green" },
    "test-blue": { "color": "blue" }
}
```

#### Properties

The `props` field is used to define one or more CSS property names and
optionally their intended values (both can be parametric). If `props` is a
string, the values assigned to the property will be those given in `values`
(optionally with assigned `unit`, if provided)

```json
{
    "name": "bg<k>",
    "props": {
        "background-image": "url(<v>)",
        "background-size": "cover",
    },
    "values": ["abc.jpg", "def.jpg", "xyz.jpg"]
}
```

Will result in these definitions:

```json
{
    "bg0": { "background-image": "url(abc.jpg)", "background-size": "cover" },
    "bg1": { "background-image": "url(def.jpg)", "background-size": "cover" },
    "bg2": { "background-image": "url(xyz.jpg)", "background-size": "cover" }
}
```

#### Key value generation

The `key` field is only used when `values` is resolving to an array. In this
case this field determines how a "key" value (aka the `<k>` param for string
interpolation, see below) will be derived for each value in `values`:

| **`key`** | **`values`**    | **Description**         | **Examples** |
|-----------|-----------------|-------------------------|--------------|
| `v`       | `[10, 20, ...]` | Actual array item value | 10, 20, ...  |
| `i`       | `[10, 20, ...]` | Array item index        | 0, 1,...     |
| `i1`      | `[10, 20, ...]` | Array item index + 1    | 1, 2,...     |

If `values` resolves to an object, the `<k>` param will always be the key of the
currently processed value.

```json
{
    "name": "test-<k>",
    "props": "test-prop",
    "values": { "abc": 23, "xyz": 42 }
}
```

The above spec will generate the following (some parts omitted):

```json
{
    "test-abc": { "test-prop": 23 },
    "test-xyz": { "test-prop": 42 },
}
```

### Media query definitions

Media queries can be defined via the top-level `media` object in a spec file.
Each query has an ID and an object of one or more query criteria.

The key-value pairs of the conditional object are interpreted as follows and
ALWAYS combined using `and`:

| Key/Value pair                   | Result                         |
|----------------------------------|--------------------------------|
| `"min-width": "10rem"`           | `(min-width: 10rem)`           |
| `"prefers-color-scheme": "dark"` | `(prefers-color-scheme: dark)` |
| `print: true`                    | `print`                        |
| `print: false`                   | `not print`                    |
| `print: "only"`                  | `only print`                   |

See [media queries in the bundled base
specs](https://github.com/thi-ng/umbrella/blob/982fff7bfcc48f108b6ad88f854ef00be4078510/packages/meta-css/specs/_info.json#L6-L24)

## Converting meta stylesheets to CSS

The `convert` command is used to compile & bundle actual CSS from user-provided
MetaCSS stylesheets (`*.meta` files) and the JSON framework specs created by the
`generate` command. The meta-stylesheets support any CSS selectors, are nestable
and compose full CSS declarations from lists of the utility classes in the
generated framework.

Each item (aka utility class name) can be prefixed with an arbitrary number of
media query IDs (also custom defined in the framework): e.g. `dark:bg-black`
might refer to a CSS class to set a black ground, with the `dark:` prefix
referring to a defined media query which only applies this class when dark mode
is enabled...

Selectors, declarations and media query criteria will be deduplicated and merged
from multiple input files. **The resulting CSS will only contain referenced
rules** and can be generated in minified or pretty printed formats (it's also
possible to [force include CSS classes which are otherwise
unreferenced](#force-inclusion-of-unreferenced-classes)). Additionally, multiple
`.meta` stylesheets can be watched for changes (their definitions getting
merged), and existing CSS files can be included (prepended) in the bundled
output too.

```text
metacss convert --help

Usage: metacss convert [opts] input [...]

Flags:

-d, --no-decls          Don't emit framework decls
--no-header             Don't emit generated header comment
-p, --pretty            Pretty print output
-v, --verbose           Display extra process information
-w, --watch             Watch input files for changes

Main:

-e STR, --eval STR      eval meta stylesheet in given string (ignores other
                        inputs & includes)
-f STR, --force STR     [multiple] CSS classes to force include (wildcards are
                        supported, @-prefix will read from file)
-I STR, --include STR   [multiple] Include CSS files (prepend)
-o STR, --out STR       Output file (or stdout)
-s STR, --specs STR     [required] Path to generated JSON defs
```

### Meta-stylesheets syntax

As mentioned earlier, the `convert` command transpiles meta-stylesheets into
actual CSS. These stylesheets support any CSS selector, support selector
nesting and have the following basic syntax:

```text
// line comment
selector {
  class-id1 class-id2 ...
  {
    nested-selector {
      class-id3 ...
      {
        ...
      }
    }
  }
}
```

#### Class identifiers & media query prefixes

As indicated by the above file structure, `*.meta` stylesheets purely consist of
CSS selectors and the names of the generated framework-defined utility classes.
For example, using the [bundled framework specs](#bundled-css-base-framework),
this simple meta-stylesheet `body { ma0 monospace blue }` creates a CSS rule for
`body` with the definitions of the generated `ma0`, `monospace` and `blue`
classes inline-expanded:

```css
body {
    margin: 0rem;
    font-family: Monaco, Menlo, Consolas, 'Courier New', monospace;
    color: #357edd;
}
```

#### Media query prefixes

This toolchain doesn't pre-generate media-query-specific versions of any CSS
class, and any class ID/token can be prefixed with any number of media query IDs
(separated by `:`). These [media queries are defined as part of the framework
generation specs](#media-query-definitions) and when used as a prefix, multiple
query IDs can be combined freely. For example, the meta-stylesheet `a:hover {
dark:bg-blue dark:anim:bg-anim2 }` will auto-create two separate CSS
`@media`-query blocks for the query IDs `dark` and `(dark AND anim)`:

```css
@media (prefers-color-scheme: dark) {
    a:hover {
        background-color: #357edd;
    }
}

@media (prefers-color-scheme: dark) and (not (prefers-reduced-motion)) {
    a:hover {
        transition: 0.25s background-color ease-in-out;
    }
}
```

A more detailed example, split over two files (for merging & bundling):

readme.meta:

```text tangle:export/readme.meta
body {
    // no margins
    ma0
    // default colors
    bg-white black
    // colors for dark mode
    dark:bg-black dark:white
}

#app { ma3 }

.bt-group-v > a {
    db w-100 l:w-50 ph3 pv2 bwb1
    dark:bg-purple dark:white dark:b--black
    light:bg-light-blue light:black light:b--white

    // nested selectors
    {
        :hover { bg-gold black anim:bg-anim2 }
        :first-child { brt3 }
        :last-child { brb3 bwb0 }
    }
}
```

readme2.meta:

We will merge the definitions in this file with the ones above (i.e. adding &
overriding some of the declarations, here: a larger border radius):

```text tangle:export/readme2.meta
#app { pa2 }

.bt-group-v > a {
    {
        :first-child { brt4 }
        :last-child { brb4 }
    }
}
```

```bash
# if no --out dir is specified, writes result to stdout...
# use previously generated framework for resolving all identifiers & media queries
metacss convert --pretty --specs framework.json readme.meta readme2.meta
```

Resulting CSS bundle output:

```css
/*! MetaCSS base v0.0.1 - generated by thi.ng/meta-css @ 2023-12-18T12:22:36.548Z */
body {
    margin: 0rem;
    background-color: #fff;
    color: #000;
}

#app {
    margin: 1rem;
    padding: .5rem;
}

.bt-group-v > a {
    display: block;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    border-bottom-style: solid;
    border-bottom-width: .125rem;
}

.bt-group-v > a:hover {
    background-color: #ffb700;
    color: #000;
}

.bt-group-v > a:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}

.bt-group-v > a:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-bottom-style: solid;
    border-bottom-width: 0rem;
}

@media (prefers-color-scheme:dark) {

    body {
        background-color: #000;
        color: #fff;
    }

    .bt-group-v > a {
        background-color: #5e2ca5;
        color: #fff;
        border-color: #000;
    }

}

@media (min-width:60rem) {

    .bt-group-v > a {
        width: 50%;
    }

}

@media (prefers-color-scheme:light) {

    .bt-group-v > a {
        background-color: #96ccff;
        color: #000;
        border-color: #fff;
    }

}

@media not (prefers-reduced-motion) {

    .bt-group-v > a:hover {
        transition: 0.2s background-color ease-in-out;
    }

}
```

### Including custom CSS files

One or more existing CSS files can be included & prepended to the output via the
`--include`/`-I` arg (which can be given multiple times). These files are used
verbatim and will **not** be transformed or reformatted in any way.

### Force inclusion of unreferenced classes

Only the CSS classes (and their optionally associated media queries) referenced
in a `.meta` stylesheet will appear in the export CSS bundle. This ensures that
the resulting CSS will only contain what's actually used (same effect as
tree-shaking, only vastly more efficient). However, this also means any CSS
classes (and optionally, their media query qualifiers) which are otherwise
referenced (e.g. from JS/TS source code or HTML docs) **will not** be included
by default and they will need to be listed manually for forced inclusion.

This can be achieved via the `--force`/`-f` arg (also can be given multiple
times). This option also supports basic `*`-wildcard patterns, e.g. `bg-*` to
include all classes with prefix `bg-`. Furthermore, for larger projects it's
useful to store these names/patterns in a separate file. For that purpose, use
the `@` prefix (e.g. `-f @includes.txt`) to indicate reading from file (only
reading from a single file is supported at current)... See the [meta-css-basics
example
project](https://github.com/thi-ng/umbrella/blob/develop/examples/meta-css-basics)
for concrete usage...

## Exporting a generated framework as CSS

The `export` command is intended for those who're mainly interested in the CSS
framework generation aspects of this toolchain. This command merely takes an
existing generated framework JSON file and serializes it to a single CSS file,
e.g. to be then used with other CSS tooling (e.g. `postcss`).

### Media query variations

Users can choose to generate variations of all defined utility classes for any
of the framework-defined media query IDs. This will create additional suffixed
versions of all classes (with their appropriate media query wrappers) and cause
a potentially massive output (depending on the overall number/complexity of the
generated classes). Again, the idea is that the resulting CSS file will be
post-processed with 3rd party CSS tooling...

For example, if the framework contains a CSS class `w-50` (e.g. to set the width
to 50%) and media queries for different screen sizes (e.g. named `ns`, `l`),
then the export with said media queries will also generate classes `w-50-ns`
and `w-50-l` (incl. their corresponding `@media` wrappers).

As with the `convert` command, additional CSS files can also be included
(prepended) in the output file.

```text
metacss export --help

Usage: metacss export [opts] input

Flags:

-d, --no-decls          Don't emit framework decls
--no-header             Don't emit generated header comment
-p, --pretty            Pretty print output
-v, --verbose           Display extra process information

Main:

-I STR, --include STR   [multiple] Include CSS files (prepend)
-m ID, --media ID       [multiple] Media query IDs (use 'ALL' for all)
-o STR, --out STR       Output file (or stdout)
```

## Bundled CSS base framework

The package includes a large number of useful specs in [/specs](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css/specs/). These are provided as starting point to define your custom framework(s)...

Currently available CSS classes in MetaCSS base v0.0.1:

### Classes by category

#### Accessibility <!-- notoc -->

`screen-reader` / `screen-reader-focus`

#### Animations / transitions <!-- notoc -->

`bg-anim1` / `bg-anim2` / `bg-anim3`

#### Aspect ratios <!-- notoc -->

`aspect-ratio-16x9` / `aspect-ratio-1x1` / `aspect-ratio-3x4` / `aspect-ratio-4x3` / `aspect-ratio-4x6` / `aspect-ratio-6x4` / `aspect-ratio-9x16` / `aspect-ratio-object`

#### Background <!-- notoc -->

`bg-contain` / `bg-cover` / `bg-pos-center` / `bg-pos-e` / `bg-pos-n` / `bg-pos-ne` / `bg-pos-nw` / `bg-pos-s` / `bg-pos-se` / `bg-pos-sw` / `bg-pos-w`

#### Border radius <!-- notoc -->

`br-100` / `br-pill` / `br0` / `br1` / `br2` / `br3` / `br4` / `brb0` / `brb1` / `brb2` / `brb3` / `brb4` / `brl0` / `brl1` / `brl2` / `brl3` / `brl4` / `brr0` / `brr1` / `brr2` / `brr3` / `brr4` / `brt0` / `brt1` / `brt2` / `brt3` / `brt4`

#### Border width <!-- notoc -->

`bw-1px` / `bw0` / `bw1` / `bw2` / `bw3` / `bw4` / `bw5` / `bwb-1px` / `bwb0` / `bwb1` / `bwb2` / `bwb3` / `bwb4` / `bwb5` / `bwl-1px` / `bwl0` / `bwl1` / `bwl2` / `bwl3` / `bwl4` / `bwl5` / `bwr-1px` / `bwr0` / `bwr1` / `bwr2` / `bwr3` / `bwr4` / `bwr5` / `bwt-1px` / `bwt0` / `bwt1` / `bwt2` / `bwt3` / `bwt4` / `bwt5`

#### Colors <!-- notoc -->

`b--black` / `b--blue` / `b--dark-blue` / `b--dark-gray` / `b--dark-green` / `b--dark-pink` / `b--dark-red` / `b--gold` / `b--gray` / `b--green` / `b--hot-pink` / `b--light-blue` / `b--light-gray` / `b--light-green` / `b--light-pink` / `b--light-purple` / `b--light-red` / `b--light-silver` / `b--light-yellow` / `b--lightest-blue` / `b--mid-gray` / `b--moon-gray` / `b--navy` / `b--near-black` / `b--near-white` / `b--orange` / `b--pink` / `b--purple` / `b--red` / `b--silver` / `b--transparent` / `b--vcol1` / `b--vcol10` / `b--vcol11` / `b--vcol12` / `b--vcol13` / `b--vcol14` / `b--vcol15` / `b--vcol16` / `b--vcol2` / `b--vcol3` / `b--vcol4` / `b--vcol5` / `b--vcol6` / `b--vcol7` / `b--vcol8` / `b--vcol9` / `b--washed-blue` / `b--washed-green` / `b--washed-red` / `b--washed-yellow` / `b--white` / `b--yellow` / `bg-black` / `bg-blue` / `bg-dark-blue` / `bg-dark-gray` / `bg-dark-green` / `bg-dark-pink` / `bg-dark-red` / `bg-gold` / `bg-gray` / `bg-green` / `bg-hot-pink` / `bg-light-blue` / `bg-light-gray` / `bg-light-green` / `bg-light-pink` / `bg-light-purple` / `bg-light-red` / `bg-light-silver` / `bg-light-yellow` / `bg-lightest-blue` / `bg-mid-gray` / `bg-moon-gray` / `bg-navy` / `bg-near-black` / `bg-near-white` / `bg-orange` / `bg-pink` / `bg-purple` / `bg-red` / `bg-silver` / `bg-transparent` / `bg-vcol1` / `bg-vcol10` / `bg-vcol11` / `bg-vcol12` / `bg-vcol13` / `bg-vcol14` / `bg-vcol15` / `bg-vcol16` / `bg-vcol2` / `bg-vcol3` / `bg-vcol4` / `bg-vcol5` / `bg-vcol6` / `bg-vcol7` / `bg-vcol8` / `bg-vcol9` / `bg-washed-blue` / `bg-washed-green` / `bg-washed-red` / `bg-washed-yellow` / `bg-white` / `bg-yellow` / `black` / `blue` / `dark-blue` / `dark-gray` / `dark-green` / `dark-pink` / `dark-red` / `gold` / `gray` / `green` / `hot-pink` / `light-blue` / `light-gray` / `light-green` / `light-pink` / `light-purple` / `light-red` / `light-silver` / `light-yellow` / `lightest-blue` / `mid-gray` / `moon-gray` / `navy` / `near-black` / `near-white` / `o-0` / `o-10` / `o-100` / `o-20` / `o-30` / `o-40` / `o-50` / `o-60` / `o-70` / `o-80` / `o-90` / `orange` / `pink` / `purple` / `red` / `silver` / `transparent` / `vcol1` / `vcol10` / `vcol11` / `vcol12` / `vcol13` / `vcol14` / `vcol15` / `vcol16` / `vcol2` / `vcol3` / `vcol4` / `vcol5` / `vcol6` / `vcol7` / `vcol8` / `vcol9` / `washed-blue` / `washed-green` / `washed-red` / `washed-yellow` / `white` / `yellow`

#### Cursors <!-- notoc -->

`cursor-alias` / `cursor-auto` / `cursor-cell` / `cursor-col` / `cursor-context` / `cursor-copy` / `cursor-cross` / `cursor-default` / `cursor-e` / `cursor-ew` / `cursor-forbidden` / `cursor-grab` / `cursor-grabbing` / `cursor-help` / `cursor-in` / `cursor-move` / `cursor-n` / `cursor-ne` / `cursor-news` / `cursor-no-drop` / `cursor-none` / `cursor-ns` / `cursor-nw` / `cursor-nwse` / `cursor-out` / `cursor-pointer` / `cursor-progress` / `cursor-row` / `cursor-s` / `cursor-scroll` / `cursor-se` / `cursor-sw` / `cursor-text` / `cursor-vtext` / `cursor-w` / `cursor-wait`

#### Display mode <!-- notoc -->

`db` / `df` / `dg` / `di` / `dib` / `dif` / `dig` / `dn` / `dt` / `dtc` / `dtr`

#### Font families <!-- notoc -->

`monospace` / `sans-serif` / `serif` / `system` / `system-sans-serif` / `system-serif`

#### Font sizes <!-- notoc -->

`f-subtitle` / `f-title` / `f1` / `f2` / `f3` / `f4` / `f5` / `f6` / `f7`

#### Font style <!-- notoc -->

`italic`

#### Font variants <!-- notoc -->

`small-caps`

#### Font weights <!-- notoc -->

`b` / `fw100` / `fw200` / `fw300` / `fw400` / `fw500` / `fw600` / `fw700` / `fw800` / `fw900` / `normal`

#### Grid layout <!-- notoc -->

`align-items-center` / `align-items-end` / `align-items-start` / `align-items-stretch` / `align-self-center` / `align-self-end` / `align-self-start` / `align-self-stretch` / `gap-1px` / `gap-2px` / `gap-4px` / `gap-8px` / `gap0` / `gap1` / `gap2` / `gap3` / `gap4` / `gap5` / `grid-cols-1` / `grid-cols-10` / `grid-cols-2` / `grid-cols-3` / `grid-cols-4` / `grid-cols-5` / `grid-cols-6` / `grid-cols-7` / `grid-cols-8` / `grid-cols-9` / `grid-rows-1` / `grid-rows-10` / `grid-rows-2` / `grid-rows-3` / `grid-rows-4` / `grid-rows-5` / `grid-rows-6` / `grid-rows-7` / `grid-rows-8` / `grid-rows-9` / `justify-items-center` / `justify-items-end` / `justify-items-start` / `justify-items-stretch` / `justify-self-center` / `justify-self-end` / `justify-self-start` / `justify-self-stretch`

#### Height <!-- notoc -->

`h-10` / `h-100` / `h-16` / `h-17` / `h-20` / `h-25` / `h-30` / `h-33` / `h-34` / `h-40` / `h-50` / `h-60` / `h-66` / `h-67` / `h-70` / `h-75` / `h-80` / `h-83` / `h-84` / `h-90` / `h1` / `h2` / `h3` / `h4` / `h5`

#### Icons <!-- notoc -->

`icon-1` / `icon-2` / `icon-3` / `icon-4` / `icon-5` / `icon-6` / `icon-7` / `icon-subtitle` / `icon-title`

#### Letter spacing <!-- notoc -->

`ls--1` / `ls--2` / `ls-0` / `ls-1` / `ls-2` / `ls-3`

#### Line heights <!-- notoc -->

`lh-0` / `lh-copy` / `lh-double` / `lh-solid` / `lh-title`

#### Lists <!-- notoc -->

`list`

#### Margin <!-- notoc -->

`center` / `ma0` / `ma1` / `ma2` / `ma3` / `ma4` / `mb0` / `mb1` / `mb2` / `mb3` / `mb4` / `mh0` / `mh1` / `mh2` / `mh3` / `mh4` / `ml0` / `ml1` / `ml2` / `ml3` / `ml4` / `mr0` / `mr1` / `mr2` / `mr3` / `mr4` / `mt0` / `mt1` / `mt2` / `mt3` / `mt4` / `mv0` / `mv1` / `mv2` / `mv3` / `mv4`

#### Max. height <!-- notoc -->

`maxh-10` / `maxh-100` / `maxh-16` / `maxh-17` / `maxh-20` / `maxh-25` / `maxh-30` / `maxh-33` / `maxh-34` / `maxh-40` / `maxh-50` / `maxh-60` / `maxh-66` / `maxh-67` / `maxh-70` / `maxh-75` / `maxh-80` / `maxh-83` / `maxh-84` / `maxh-90` / `maxh1` / `maxh2` / `maxh3` / `maxh4` / `maxh5`

#### Max. width <!-- notoc -->

`maxw-10` / `maxw-100` / `maxw-16` / `maxw-17` / `maxw-20` / `maxw-25` / `maxw-30` / `maxw-33` / `maxw-34` / `maxw-40` / `maxw-50` / `maxw-60` / `maxw-66` / `maxw-67` / `maxw-70` / `maxw-75` / `maxw-80` / `maxw-83` / `maxw-84` / `maxw-90` / `maxw1` / `maxw2` / `maxw3` / `maxw4` / `maxw5`

#### Min. height <!-- notoc -->

`minh-10` / `minh-100` / `minh-16` / `minh-17` / `minh-20` / `minh-25` / `minh-30` / `minh-33` / `minh-34` / `minh-40` / `minh-50` / `minh-60` / `minh-66` / `minh-67` / `minh-70` / `minh-75` / `minh-80` / `minh-83` / `minh-84` / `minh-90` / `minh1` / `minh2` / `minh3` / `minh4` / `minh5`

#### Min. width <!-- notoc -->

`minw-10` / `minw-100` / `minw-16` / `minw-17` / `minw-20` / `minw-25` / `minw-30` / `minw-33` / `minw-34` / `minw-40` / `minw-50` / `minw-60` / `minw-66` / `minw-67` / `minw-70` / `minw-75` / `minw-80` / `minw-83` / `minw-84` / `minw-90` / `minw1` / `minw2` / `minw3` / `minw4` / `minw5`

#### Overflow <!-- notoc -->

`overflow-auto` / `overflow-hidden` / `overflow-scroll` / `overflow-visible` / `overflow-x-auto` / `overflow-x-hidden` / `overflow-x-scroll` / `overflow-x-visible` / `overflow-y-auto` / `overflow-y-hidden` / `overflow-y-scroll` / `overflow-y-visible`

#### Padding <!-- notoc -->

`pa0` / `pa1` / `pa2` / `pa3` / `pa4` / `pb0` / `pb1` / `pb2` / `pb3` / `pb4` / `ph0` / `ph1` / `ph2` / `ph3` / `ph4` / `pl0` / `pl1` / `pl2` / `pl3` / `pl4` / `pr0` / `pr1` / `pr2` / `pr3` / `pr4` / `pt0` / `pt1` / `pt2` / `pt3` / `pt4` / `pv0` / `pv1` / `pv2` / `pv3` / `pv4`

#### Positions <!-- notoc -->

`absolute` / `bottom--1` / `bottom--2` / `bottom-0` / `bottom-1` / `bottom-2` / `fixed` / `left--1` / `left--2` / `left-0` / `left-1` / `left-2` / `relative` / `right--1` / `right--2` / `right-0` / `right-1` / `right-2` / `static` / `sticky` / `top--1` / `top--2` / `top-0` / `top-1` / `top-2`

#### Selection <!-- notoc -->

`noselect`

#### Shadow <!-- notoc -->

`box-shadow-1` / `box-shadow-2` / `box-shadow-3` / `box-shadow-4` / `box-shadow-i-1` / `box-shadow-i-2` / `box-shadow-i-3` / `box-shadow-i-4` / `text-shadow-1` / `text-shadow-2` / `text-shadow-3` / `text-shadow-4` / `text-shadow-5` / `text-shadow-6` / `text-shadow-7` / `text-shadow-8` / `text-shadow-9`

#### Text align <!-- notoc -->

`tc` / `tj` / `tl` / `tr`

#### Text decorations <!-- notoc -->

`no-underline` / `strike` / `underline`

#### Text transforms <!-- notoc -->

`ttc` / `ttfsk` / `ttfw` / `tti` / `ttl` / `ttn` / `ttu`

#### Undefined <!-- notoc -->

`vh-100` / `vh-25` / `vh-50` / `vh-75` / `vw-100` / `vw-25` / `vw-50` / `vw-75`

#### Vertical align <!-- notoc -->

`v-base` / `v-btm` / `v-mid` / `v-top`

#### Visibility <!-- notoc -->

`hidden` / `visible`

#### Whitespace <!-- notoc -->

`ws-0` / `ws-1` / `ws-2`

#### Width <!-- notoc -->

`w-10` / `w-100` / `w-16` / `w-17` / `w-20` / `w-25` / `w-30` / `w-33` / `w-34` / `w-40` / `w-50` / `w-60` / `w-66` / `w-67` / `w-70` / `w-75` / `w-80` / `w-83` / `w-84` / `w-90` / `w1` / `w2` / `w3` / `w4` / `w5`

#### Z-indices <!-- notoc -->

`z-0` / `z-1` / `z-2` / `z-3` / `z-4` / `z-5` / `z-999` / `z-9999`

### Media queries

- **ns**: `{"min-width":"30rem"}`
- **m**: `{"min-width":"30rem","max-width":"60rem"}`
- **l**: `{"min-width":"60rem"}`
- **dark**: `{"prefers-color-scheme":"dark"}`
- **light**: `{"prefers-color-scheme":"light"}`
- **anim**: `{"prefers-reduced-motion":false}`
- **noanim**: `{"prefers-reduced-motion":true}`

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bmeta-css%5D+in%3Atitle)

## Related packages

- [@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-css) - CSS from nested JS data structures

## Installation

```bash
npx @thi.ng/meta-css --help
```

[Bun](https://bun.sh) is required instead of Node JS. The toolchain itself is
distributed as CLI bundle with **no runtime dependencies**. The following
dependencies are only shown for informational purposes and are (partially)
included in the bundle.

Package sizes (brotli'd, pre-treeshake): ESM: 11.38 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/args](https://github.com/thi-ng/umbrella/tree/develop/packages/args)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-css)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/text-format](https://github.com/thi-ng/umbrella/tree/develop/packages/text-format)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                             | Description                              | Live demo                                             | Source                                                                             |
|:-----------------------------------------------------------------------------------------------------------------------|:-----------------------------------------|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/meta-css-basics.png" width="240"/> | Basic thi.ng/meta-css usage & testbed    | [Demo](https://demo.thi.ng/umbrella/meta-css-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/meta-css-basics) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-lazy-load.png" width="240"/>  | Lazy loading components via @thi.ng/rdom | [Demo](https://demo.thi.ng/umbrella/rdom-lazy-load/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-lazy-load)  |

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-meta-css,
  title = "@thi.ng/meta-css",
  author = "Karsten Schmidt",
  note = "https://thi.ng/meta-css",
  year = 2023
}
```

## License

&copy; 2023 Karsten Schmidt // Apache License 2.0
