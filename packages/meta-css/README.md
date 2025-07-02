<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/meta-css](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-meta-css.svg?98a02099)

[![npm version](https://img.shields.io/npm/v/@thi.ng/meta-css.svg)](https://www.npmjs.com/package/@thi.ng/meta-css)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/meta-css.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 209 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Generating CSS frameworks](#generating-css-frameworks)
  - [Framework generation specs & syntax](#framework-generation-specs--syntax)
  - [Example generation spec](#example-generation-spec)
  - [Generator spec structure](#generator-spec-structure)
    - [Variations](#variations)
    - [Parametric IDs](#parametric-ids)
    - [Values](#values)
    - [Properties](#properties)
    - [Key value generation](#key-value-generation)
  - [Templated class definitions](#templated-class-definitions)
    - [Template arguments](#template-arguments)
  - [Media query definitions](#media-query-definitions)
  - [Custom declarations](#custom-declarations)
- [Converting meta stylesheets to CSS](#converting-meta-stylesheets-to-css)
  - [Meta-stylesheets syntax](#meta-stylesheets-syntax)
    - [Class identifiers & media query prefixes](#class-identifiers--media-query-prefixes)
    - [Media query prefixes](#media-query-prefixes)
  - [Verbatim property definitions](#verbatim-property-definitions)
  - [Including custom CSS files](#including-custom-css-files)
  - [Force inclusion of unreferenced classes](#force-inclusion-of-unreferenced-classes)
- [Exporting a generated framework as CSS](#exporting-a-generated-framework-as-css)
  - [Media query variations](#media-query-variations)
- [Development mode](#development-mode)
- [Documenting a generated framework](#documenting-a-generated-framework)
  - [Documentation metadata](#documentation-metadata)
- [Bundled CSS base framework](#bundled-css-base-framework)
  - [Classes by category](#classes-by-category)
    - [Accessibility](#accessibility)
    - [Animation / transition](#animation--transition)
    - [Aspect ratios](#aspect-ratios)
    - [Background](#background)
    - [Background color](#background-color)
    - [Border color](#border-color)
    - [Border radius](#border-radius)
    - [Border style](#border-style)
    - [Border width](#border-width)
    - [Box sizing](#box-sizing)
    - [Color scheme](#color-scheme)
    - [Content](#content)
    - [Cursors](#cursors)
    - [Display mode](#display-mode)
    - [Flex layout](#flex-layout)
    - [Font families](#font-families)
    - [Font sizes](#font-sizes)
    - [Font style](#font-style)
    - [Font variants](#font-variants)
    - [Font weights](#font-weights)
    - [Grid layout](#grid-layout)
    - [Height](#height)
    - [Icons](#icons)
    - [Letter spacing](#letter-spacing)
    - [Line heights](#line-heights)
    - [Lists](#lists)
    - [Margin](#margin)
    - [Mask](#mask)
    - [Max. height](#max-height)
    - [Max. width](#max-width)
    - [Min. height](#min-height)
    - [Min. width](#min-width)
    - [Opacity](#opacity)
    - [Overflow](#overflow)
    - [Padding](#padding)
    - [Positions](#positions)
    - [Print](#print)
    - [Scrolling](#scrolling)
    - [Selection](#selection)
    - [Shadow](#shadow)
    - [Svg](#svg)
    - [Text align](#text-align)
    - [Text color](#text-color)
    - [Text decorations](#text-decorations)
    - [Text transforms](#text-transforms)
    - [Transform](#transform)
    - [Vertical align](#vertical-align)
    - [Visibility](#visibility)
    - [Whitespace](#whitespace)
    - [Width](#width)
    - [Z-indices](#z-indices)
  - [Templates by category](#templates-by-category)
    - [Animation / transition](#animation--transition)
    - [Appearance](#appearance)
    - [Aspect ratios](#aspect-ratios)
    - [Background](#background)
    - [Background color](#background-color)
    - [Border color](#border-color)
    - [Color adjustment](#color-adjustment)
    - [Color scheme](#color-scheme)
    - [Font families](#font-families)
    - [Fx](#fx)
    - [Grid layout](#grid-layout)
    - [Layout](#layout)
    - [Margin](#margin)
    - [Padding](#padding)
    - [Positions](#positions)
    - [Svg](#svg)
    - [Text color](#text-color)
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

This toolkit (started as experiment in 2016) and the overall design approach and
workflows proposed by it are heavily building atop the concept of _CSS utility
classes_ (as known from [Tachyons](https://tachyons.io/),
[Turret](https://turretcss.com/) or the newer
[Tailwind](https://tailwindcss.com/) projects). How and where those CSS classes
are defined and later applied is however a major defining point of difference to
these other existing approaches and will be explained in this document. To
remove the need for any complex & bloated CSS-related dependencies (parsers
etc.) and to simplify building secondary tooling (e.g. part of this readme is an
[auto-generated report of the included base framework
specs](#bundled-css-base-framework)), we're using JSON — rather than CSS — as
data format to:

1. express the _generative_ rules to define all the CSS classes, class templates,
declarations, and media query criteria, all of which are forming a framework
2. as intermediate data format for generated CSS frameworks themselves

**The entire toolkit (incl. all bundled dependencies) is currently only 39KB (14KB brotli)!**

This readme aims to provide a thorough overview of this toolchain, its
possibilities and some concrete usage examples...

Note: In all cases, final CSS generation itself is handled by
[thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup-css/).
Please see its readme for further useful information.

**👷🏻 This is all WIP!** See included & [linked examples](#usage-examples) for
concrete usage...

## Generating CSS frameworks

The `generate` command is used to generate custom CSS frameworks with (likely)
hundreds of utility classes, all derived from a number of extremely compact,
parametric JSON rule specs. This process generates all desired, combinatorial
versions of various rules/declarations and exports them to a framework JSON file
used as intermediary stage for the other commands provided by this toolchain.
The [syntax/format of the generator rules](#framework-generation-specs--syntax)
is explained further on. These framework specs can be split up into multiple
files for better handling and organization, can define [CSS base
declarations](#custom-declarations) (e.g. for normalization purposes),
[arbitrary media query criteria](#media-query-definitions) (all later
combinable), shared lookup tables for colors, margins, sizes, timings etc.

The package includes dozens of generator specs for a basic, fully customizable,
Tachyons-derived [CSS framework](#bundled-css-base-framework). These specs and
resulting framework are still being worked on and are used for some example
projects in this repo, but are mostly intended as basic starting points for
creating other custom frameworks (_in the hope some useful specs will be shared back
similarly_)...

```text
metacss generate --help

Usage: metacss generate [opts] inputs...

Flags:

-p, --pretty            Pretty print output
-v, --verbose           Display extra process information

Main:

-o STR, --out STR       Output file (or stdout)
--prec INT              Number of fractional digits (default: 3)
```

### Framework generation specs & syntax

This section gives an overview of the JSON format used to generate CSS
frameworks of dozens (usually hundreds or thousands) of utility classes,
including many possible variations (per spec).

Generation specs use a simple JSON structure as shown below. The specs can be
split over multiple files and will all be merged by the `generate` command of
the toolchain.

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
        "dark": { "prefers-color-scheme": "dark" },
        "anim": { "prefers-reduced-motion": false }
    },
    // optional shared values/LUTs (arrays or objects)
    // (local to the current file only)
    "tables": {
        "margins": [0, 0.25, 0.5, 1, 2, 4]
    },
    // optional shared variations (local to current file only)
    "vars": {
        "size": ["width", "height"]
    },
    // optional thi.ng/hiccup-css declarations which will be part of the framework
    // (e.g. for CSS reset purposes), will be merged from multiple spec files
    "decls": [
        ["html", { "box-sizing": "border-box" }]
    ],
    // array of class generation specs
    "specs": [
        //...
    ],
    // array of templated class generation specs
    "tpls": [
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

```json tangle:export/readme-margins.mcss.json
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
            "vars": ["a", "t", "r", "b", "l", "h", "v"]
        }
    ]
}
```

Assuming the above spec has been saved to file `margins.mcss.json`...

```bash
# the generate cmd can merge specs from multiple input files
# if no `--out` file is given, the result will go to stdout
metacss generate --pretty margins.mcss.json
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

### Generator spec structure

An individual generator spec JSON object can contain the following keys:

| **ID**   | **Type**                | **Description**                                              |
|----------|-------------------------|--------------------------------------------------------------|
| `doc`    | object, optional        | Documentation metadata, see [section](#documentation)        |
| `key`    | string, optional        | Method for deriving keys from current value                  |
| `name`   | string                  | Parametric name for the generated CSS class(es)              |
| `props`  | string or object        | CSS property name(s), possibly parametric                    |
| `unit`   | string, optional        | CSS unit to use for values                                   |
| `user`   | any, optional           | Custom, arbitrary user data etc.                             |
| `values` | string, array or object | Values to be assigned to CSS properties, possibly parametric |
| `vars`   | string[], optional      | Array of variation IDs (see section below)                   |

The number of generated CSS classes per spec is the number of items in `values`
multiplied by the number of variations in `var` (if any).

Any `user` data will be stored (as is) with each generated CSS class, but
currently has no direct use in the toolchain and is purely intended for
additional user-defined custom tooling.

#### Variations

Variations can be requested by providing an array of valid variation IDs. If
used, `<vid>` or `<var>` parameters **must** be used in the `name` or else
naming conflicts will occur.

The following variation presets are available:

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

Custom, file-local variations can also be used (parameters in `name` and `props`
will be explained next), e.g.:

```json tangle:export/readme-custom-vars.mcss.json
{
    "vars": {
        "svg": ["fill", "stroke"]
    },
    "specs": [
        {
            "name": "<var>-<k>",
            "props": { "<var>": "<v>" },
            "values": { "black": "#000", "white": "#fff", "current": "currentColor" },
            "vars": ["svg"]
        }
    ]
}
```

This spec will generate the following classes:

```json
{
    "fill-black": { "fill": "#000" },
    "fill-white": { "fill": "#fff" },
    "fill-current": { "fill": "currentColor" },
    "stroke-black": { "stroke": "#000" },
    "stroke-white": { "stroke": "#fff" },
    "stroke-current": { "stroke": "currentColor" }
}
```

#### Parametric IDs

The following parameters can (and should) be used in a spec's `name` and `props`
to generate multiple pattern-based values (more examples below).

- `<vid>` is the ID of the currently processed variation (e.g. a value from the
  ID column in the above table). If no variations are requested, this value will
  be an empty string.
- `<var>` is one of the expanded values for the current variation (e.g. 2nd
  column of variations table). If no variations are defined, this too will be an
  empty string.
- `<v>` is the currently processed value of a spec's `values`.
- `<k>` is the (possibly derived) key for the currently processed value of a
  spec's `values` collection and will depend on the type of `values` (see [key
  value generation](#key-value-generation))

#### Values

The `values` are used to populate the `props` (CSS properties). If `values` is a
string it will be used as table-name to look up in the current spec file's
`tables`, an object storing value collections which should be shared among specs
(only in the same file).

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
            "name": "test-<v>",
            "props": "color",
            "values": "test"
        }
    ]
}
```

Using an array directly (here only showing the spec itself for brevity):

```json
{
    "name": "test-<v>",
    "props": "color",
    "values": ["red", "green", "blue"]
}
```

Using an object (ignoring the keys, only using the values here):

```json
{
    "name": "test-<v>",
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
interpolation) will be derived for each value in `values`:

| **`key`** | **`values`**    | **Description**         | **Examples** |
|-----------|-----------------|-------------------------|--------------|
| `v`       | `[10, 20, ...]` | Actual array item value | 10, 20, ...  |
| `i`       | `[10, 20, ...]` | Array item index        | 0, 1,...     |
| `i+1`     | `[10, 20, ...]` | Array item index + 1    | 1, 2,...     |

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

### Templated class definitions

As a special case of "normal" generator specs described above, the toolchain
also supports the generation of so-called templated classes, which are very much
like callable functions and will later accept zero or more arguments when used
in a MetaCSS stylesheet.

These template specs are almost identical to the normal spec format, with the
exception of **not** using the `key` and `values` fields, since values will only
be provided by the user at a later stage, via template arguments.

A simple generator spec for a templated animation, including keyframe
definitions and documentation metadata:

```json tangle:export/readme-templated-anim.mcss.json
{
    "decls": [
        ["@keyframes" ,"shrink", { "height": "var(--shrink-size)" }, { "height": 0 }]
    ],
    "tpls": [
        {
            "name": "shrink",
            "props": {
                "--shrink-size": "{0}",
                "animation": "shrink {1}s ease-out forward"
            },
            "doc": {
                "group": "animation",
                "desc": "Animation which shrinks the height from given value down to zero",
                "args": [
                    "height: initial height (incl. units)",
                    "duration: in seconds"
                ]
            }
        }
    ]
}
```

In a MetaCSS stylesheet, the template can then be used like a function call, like so:

`shrink(4rem, 1)`

Here, two arguments are supplied as comma-separated list between the `(`..`)`
parens. In the template definition the `{0}`/`{1}` patterns are indicating where
these numbered args will be inserted. Templates support any number of
params/arguments and each one can be used multiple times in multiple locations,
incl. property names, values, and in documentation (`group`, `desc` and `args` fields).

#### Template arguments

When templates are compiled, the number of expected args is computed
automatically and later checked against the actually given args when the
template is used. An error will be thrown if the given number of args differs.

Any commas inside an argument **must** be escaped using `\,`, e.g.

```text
// wrong (the comma inside `repeat()` MUST be escaped...)
#test { grid grid-cols(repeat(3, 1fr), 16rem) }

// correct
#test { grid grid-cols(repeat(3\, 1fr), 16rem) }
```

If a template's `props` is a string, the optional `unit` field can be used to
auto-assign a CSS unit to provided args. If `props` is an object, the `unit`
option will be ignored.

Using the example template defined above, the MetaCSS stylesheet
`#test { shrink(4rem, 0.5) }` will then be expanded to:

```css
#test {
    --shrink-size: 4rem;
    animation: shrink 0.5s ease-out forward;
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
specs](https://github.com/thi-ng/umbrella/blob/10a1633519e744335853d3c64d9d23d06d63cda4/packages/meta-css/specs/_info.mcss.json#L6-L27)

### Custom declarations

Each of the JSON spec files can provide fixed CSS declarations via the `decls`
key. These declarations are to be given in
[thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup-css/)
format and are passed as is to the CSS serializer used by the `convert` and
`export` commands. Please see
[`/specs/normalize.mcss.json`](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css/specs/normalize.mcss.json)
for examples and the [thi.ng/hiccup-css
readme](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup-css/README.md)
for detailed reference.

```json
{
    "decls": [
        [":root", { "font-size": "16px" }],
        ["*", { "margin": 0 }]
    ]
}
```

## Converting meta stylesheets to CSS

The `convert` command is used to compile & bundle actual CSS from user-provided
MetaCSS stylesheets (`.mcss` files) and the JSON framework specs created by the
`generate` command. The meta-stylesheets support any CSS selectors, are nestable
and compose full CSS declarations from lists of the utility classes in the
generated framework.

Each item (aka utility class name) can be prefixed with an arbitrary number of
media query IDs (also custom defined in the framework): e.g. `dark:bg-color-black`
might refer to a CSS class to set a black ground, with the `dark:` prefix
referring to a defined media query which only applies this class when dark mode
is enabled...

Selectors, declarations and media query criteria will be deduplicated and merged
from multiple input files. **The resulting CSS will only contain referenced
rules** and can be generated in minified or pretty printed formats (it's also
possible to [force include CSS classes which are otherwise
unreferenced](#force-inclusion-of-unreferenced-classes)). Additionally, multiple
`.mcss` stylesheets can be watched for changes (their definitions getting
merged), and existing CSS files can be included (prepended) in the output(s) too.

```text
metacss convert --help

Usage: metacss convert [opts] input [...]

Flags:

-b, --bundle            Bundle inputs (see `out` option)
-d, --no-decls          Don't emit framework decls
--no-header             Don't emit generated header comment
--no-write              Don't write files, use stdout only
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
--scope STR             Suffix for CSS class names
-s STR, --specs STR     [required] Path to generated JSON defs
```

Notes:

- The `--no-write` flag is only used if `--bundle` is **disabled**
- The `--out` file arg is only used if `--bundle` is **enabled**
- The `--scope` option can be used to specify a suffix for all CSS classes.

If bundling is disabled (default), each input `.mcss` file is converted
individually and results are written to the same directory, but using `.css` as
file extension (and unless `--no-write` is enabled). This behavior is intended
for local style definitions of web components.

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

As indicated by the above file structure, `.mcss` stylesheets purely consist of
CSS selectors and the names of the utility classes defined in a generated framework.
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
class, and any utility class ID/token can be prefixed with any number of media
query IDs (separated by `:`). These [media queries are defined as part of the
framework generation specs](#media-query-definitions) and when used as a prefix,
multiple query IDs can be combined freely. For example, the meta-stylesheet
`a:hover { dark:bg-color-blue dark:anim:bg-anim2 }` will auto-create two separate CSS
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

readme.mcss:

```text tangle:export/readme.mcss
body {
    // no margins
    ma0
    // default colors
    bg-color-white color-black
    // colors for dark mode
    dark:bg-color-black dark:color-white
}

#app { ma3 }

.bt-group-v > a {
    db w-100 l:w-50 ph3 pv2 bwb1
    dark:bg-color-purple dark:color-white dark:b--color-black
    light:bg-color-light-blue light:color-black light:b--color-white

    // nested selectors
    {
        :hover { bg-color-gold color-black anim:bg-anim2 }
        :first-child { brt3 }
        :last-child { brb3 bwb0 }
    }
}
```

readme2.mcss:

We will merge the definitions in this file with the ones above (i.e. adding &
overriding some of the declarations, here: a larger border radius):

```text tangle:export/readme2.mcss
#app { pa2 }

.bt-group-v > a {
    {
        // override border radii
        :first-child { brt4 }
        :last-child { brb4 }
    }
}
```

```bash
# if no --out dir is specified, writes result to stdout...
# use previously generated framework for resolving all identifiers & media queries
metacss convert --pretty --specs framework.json readme.mcss readme2.mcss
```

Resulting merged CSS bundle output:

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

### Verbatim property definitions

The `prop-name-[value]` syntax can be used to define CSS properties and their
values directly. This syntax can be used alongside the other pre-defined classes
and [templates](#templated-class-definitions) and be combined with [media query
prefixes](#media-query-prefixes).

```text tangle:export/readme-verbatim.mcss
body {
    background-image-[url(bg.png)]
    dark:background-image-[url(bg-alt.png)]
    ma0 pa3 sans-serif
}
```

Resulting CSS:

```css
body {
    background-image: url(bg.png);
    margin: 0rem;
    padding: 1rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

@media (prefers-color-scheme:dark) {
    body {
        background-image: url(bg-alt.png);
    }
}
```

### Including custom CSS files

One or more existing CSS files can be included & prepended to the output via the
`--include`/`-I` arg (which can be given multiple times). These files are used
verbatim and will **not** be transformed or reformatted in any way.

### Force inclusion of unreferenced classes

Only the CSS classes (and their optionally associated media queries) referenced
in a `.mcss` stylesheet will appear in the export CSS bundle. This ensures that
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

As with the `convert` command, additional CSS files can also be included
(prepended) in the output file.

If the `--only-decls` option is used, **only** the [framework
declarations](#custom-declarations) but none of the generated utility classes
will be exported.

The `--scope` option can be used to specify a suffix for all CSS classes.

```text
metacss export --help

Usage: metacss export [opts] input

Flags:

-d, --no-decls          Don't emit framework decls
--no-header             Don't emit generated header comment
--only-decls            Only emit framework decls
-p, --pretty            Pretty print output
-v, --verbose           Display extra process information

Main:

-I STR, --include STR   [multiple] Include CSS files (prepend)
-m ID, --media ID       [multiple] Media query IDs (use 'ALL' for all)
-o STR, --out STR       Output file (or stdout)
--scope STR             Suffix for CSS class names
```

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

## Development mode

The `develop` command is a combination of the `generate` and `convert` commands.
It creates file watchers for all input files (both for generator specs **and**
MCSS stylesheets) and then auto-generates/compiles/updates results. Together
with [Vite](https://vitejs.dev/) this command enables a seamless hot-reloading
workflow. Using a multi-process runner like
[mprocs](https://github.com/pvolok/mprocs) further simplifies this.

For example, using one of the bundled example projects in this repo ([more
examples](#usage-examples)):

```bash
cd examples/meta-css-basics

# launch both metacss in dev mode and vite's dev server
mprocs 'yarn css:watch' 'yarn start:only'
```

See that example's
[package.json](https://github.com/thi-ng/umbrella/blob/develop/examples/meta-css-basics/package.json)
for concrete usage/reference.

```text
metacss develop --help

Usage: metacss develop [opts] input [...]

Flags:

-b, --bundle            Bundle inputs (see `out` option)
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
--out-css STR           [required] Output file for CSS bundle
--out-specs STR         [required] Output file for framework
--prec INT              Number of fractional digits (default: 3)
--scope STR             Suffix for CSS class names
```

## Documenting a generated framework

Generator specs and templates can include documentation metadata, which can then
be utilized to produce Markdown documentation via the `metacss doc` command:

```text
metacss doc --help

Usage: metacss doc [opts] input [...]

Flags:

-v, --verbose           Display extra process information

Main:

-l INT, --level INT     Initial heading level (default: 1)
-o STR, --out STR       Output file (or stdout)
-t STR, --title STR     Main title, set to 'none' to disable (default: "meta")
```

The command allows for customization of the initial heading level and title.

### Documentation metadata

All [generator specs](#generator-spec-structure) and
[templates](#templated-class-definitions) can include a `doc` object with this
structure:

```json
"doc": {
    "group": "Section name for the group this spec belongs to",
    "desc": "Description of this spec/class/template",
    "args": [
        "argName1: description",
        "argName2: description...",
    ]
}
```

**Note:** The `args` field is **only** used for documenting
[templates](#templated-class-definitions).

All values in this `doc` object can contain [parameters](#parametric-ids) which
will be interpolated when the framework specs are expanded (via the [`generate`
command](#generating-css-frameworks)). For example, the following spec:

```json
{
    "doc": { "group": "box sizing", "desc": "<v>" },
    "name": "<v>",
    "props": "box-sizing",
    "values": ["border-box", "content-box"]
}
```

...will be expanded to produce these CSS classes:

```json
{
    "border-box": {
        "__doc": { "group": "box sizing", "desc": "border-box" },
        "box-sizing": "border-box"
    },
    "content-box": {
        "__doc": { "group": "box sizing", "desc": "content-box" },
        "box-sizing": "content-box"
    }
}
```

The command is also used to produce the following documentation of the included
base framework specs.

## Bundled CSS base framework

The package includes a large number of useful generator specs in
[/specs](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css/specs/).
These are readily usable (and used by a growing number of example projects in
this repo), but also are provided as starting point to define your own custom
framework(s)...

> [!IMPORTANT]
> Previous versions of the bundled framework included [template
> definitions](#templated-class-definitions) which purely served as workaround
> for the lack of [verbatim property syntax](#verbatim-property-definitions),
> which has only been added in v0.16.0.
>
> Since v0.17.0 these templates have been removed, since obsolete now...

Currently, there are 968 CSS utility classes (incl. 58 templates) defined in "MetaCSS base" (v0.19.0):

### Classes by category

#### Accessibility

- `screen-reader`
- `screen-reader-focus`

#### Animation / transition

<details><summary>22 items:</summary>

- `anim-alternate` (direction)
- `anim-alternate-reverse` (direction)
- `anim-ease` (timing function)
- `anim-ease-in` (timing function)
- `anim-ease-in-out` (timing function)
- `anim-ease-out` (timing function)
- `anim-linear` (timing function)
- `anim-normal` (direction)
- `anim-pause`
- `anim-play`
- `anim-reverse` (direction)
- `transition-all` (all)
- `transition-bg` (background-color)
- `transition-color` (color)
- `transition-ease` (timing function)
- `transition-ease-in` (timing function)
- `transition-ease-in-out` (timing function)
- `transition-ease-out` (timing function)
- `transition-height` (height)
- `transition-linear` (timing function)
- `transition-none` (none)
- `transition-width` (width)
</details>

#### Aspect ratios

- `bg-aspect-ratio-object` (To be used on the element forming the background of a `bg-aspect-ratio()` parent/wrapper)

#### Background

<details><summary>17 items:</summary>

- `bg-contain`
- `bg-cover`
- `bg-pos-center` (center)
- `bg-pos-e` (right)
- `bg-pos-n` (top)
- `bg-pos-ne` (top right)
- `bg-pos-nw` (top left)
- `bg-pos-s` (bottom)
- `bg-pos-se` (bottom right)
- `bg-pos-sw` (bottom left)
- `bg-pos-w` (left)
- `bg-repeat` (repeat)
- `bg-repeat-none` (no-repeat)
- `bg-repeat-round` (round)
- `bg-repeat-space` (space)
- `bg-repeat-x` (repeat-x)
- `bg-repeat-y` (repeat-y)
</details>

#### Background color

<details><summary>38 items:</summary>

- `bg-color-black` (#000)
- `bg-color-blue` (#357edd)
- `bg-color-current` (currentcolor)
- `bg-color-dark-blue` (#00449e)
- `bg-color-dark-gray` (#333)
- `bg-color-dark-green` (#137752)
- `bg-color-dark-pink` (#d5008f)
- `bg-color-dark-red` (#e7040f)
- `bg-color-gold` (#ffb700)
- `bg-color-gray` (#777)
- `bg-color-green` (#19a974)
- `bg-color-hot-pink` (#ff41b4)
- `bg-color-light-blue` (#96ccff)
- `bg-color-light-gray` (#eee)
- `bg-color-light-green` (#9eebcf)
- `bg-color-light-pink` (#ffa3d7)
- `bg-color-light-purple` (#a463f2)
- `bg-color-light-red` (#ff725c)
- `bg-color-light-silver` (#aaa)
- `bg-color-light-yellow` (#fbf1a9)
- `bg-color-lightest-blue` (#cdecff)
- `bg-color-mid-gray` (#555)
- `bg-color-moon-gray` (#ccc)
- `bg-color-navy` (#001b44)
- `bg-color-near-black` (#111)
- `bg-color-near-white` (#f4f4f4)
- `bg-color-orange` (#ff6300)
- `bg-color-pink` (#ff80cc)
- `bg-color-purple` (#5e2ca5)
- `bg-color-red` (#ff4136)
- `bg-color-silver` (#999)
- `bg-color-transparent` (transparent)
- `bg-color-washed-blue` (#f6fffe)
- `bg-color-washed-green` (#e8fdf5)
- `bg-color-washed-red` (#ffdfdf)
- `bg-color-washed-yellow` (#fffceb)
- `bg-color-white` (#fff)
- `bg-color-yellow` (#ffd700)
</details>

#### Border color

<details><summary>38 items:</summary>

- `border-color-black` (#000)
- `border-color-blue` (#357edd)
- `border-color-current` (currentcolor)
- `border-color-dark-blue` (#00449e)
- `border-color-dark-gray` (#333)
- `border-color-dark-green` (#137752)
- `border-color-dark-pink` (#d5008f)
- `border-color-dark-red` (#e7040f)
- `border-color-gold` (#ffb700)
- `border-color-gray` (#777)
- `border-color-green` (#19a974)
- `border-color-hot-pink` (#ff41b4)
- `border-color-light-blue` (#96ccff)
- `border-color-light-gray` (#eee)
- `border-color-light-green` (#9eebcf)
- `border-color-light-pink` (#ffa3d7)
- `border-color-light-purple` (#a463f2)
- `border-color-light-red` (#ff725c)
- `border-color-light-silver` (#aaa)
- `border-color-light-yellow` (#fbf1a9)
- `border-color-lightest-blue` (#cdecff)
- `border-color-mid-gray` (#555)
- `border-color-moon-gray` (#ccc)
- `border-color-navy` (#001b44)
- `border-color-near-black` (#111)
- `border-color-near-white` (#f4f4f4)
- `border-color-orange` (#ff6300)
- `border-color-pink` (#ff80cc)
- `border-color-purple` (#5e2ca5)
- `border-color-red` (#ff4136)
- `border-color-silver` (#999)
- `border-color-transparent` (transparent)
- `border-color-washed-blue` (#f6fffe)
- `border-color-washed-green` (#e8fdf5)
- `border-color-washed-red` (#ffdfdf)
- `border-color-washed-yellow` (#fffceb)
- `border-color-white` (#fff)
- `border-color-yellow` (#ffd700)
</details>

#### Border radius

<details><summary>31 items:</summary>

- `br-100` (100%)
- `br-pill` (9999px)
- `br-pill-b` (bottom 50%)
- `br-pill-l` (left 50%)
- `br-pill-r` (right 50%)
- `br-pill-t` (top 50%)
- `br0` (0rem)
- `br1` (.125rem)
- `br2` (.25rem)
- `br3` (.5rem)
- `br4` (1rem)
- `brb0` (bottom 0rem)
- `brb1` (bottom .125rem)
- `brb2` (bottom .25rem)
- `brb3` (bottom .5rem)
- `brb4` (bottom 1rem)
- `brl0` (left 0rem)
- `brl1` (left .125rem)
- `brl2` (left .25rem)
- `brl3` (left .5rem)
- `brl4` (left 1rem)
- `brr0` (right 0rem)
- `brr1` (right .125rem)
- `brr2` (right .25rem)
- `brr3` (right .5rem)
- `brr4` (right 1rem)
- `brt0` (top 0rem)
- `brt1` (top .125rem)
- `brt2` (top .25rem)
- `brt3` (top .5rem)
- `brt4` (top 1rem)
</details>

#### Border style

<details><summary>9 items:</summary>

- `bs-dashed`
- `bs-dotted`
- `bs-double`
- `bs-groove`
- `bs-inset`
- `bs-none`
- `bs-outset`
- `bs-ridge`
- `bs-solid`
</details>

#### Border width

<details><summary>45 items:</summary>

- `bw0` ( 0rem)
- `bw1` ( .125rem)
- `bw2` ( .25rem)
- `bw3` ( .5rem)
- `bw4` ( 1rem)
- `bw5` ( 2rem)
- `bw-1px` ( 1px)
- `bw-2px` ( 2px)
- `bw-4px` ( 4px)
- `bwb0` (bottom 0rem)
- `bwb1` (bottom .125rem)
- `bwb2` (bottom .25rem)
- `bwb3` (bottom .5rem)
- `bwb4` (bottom 1rem)
- `bwb5` (bottom 2rem)
- `bwb-1px` (bottom 1px)
- `bwb-2px` (bottom 2px)
- `bwb-4px` (bottom 4px)
- `bwl0` (left 0rem)
- `bwl1` (left .125rem)
- `bwl2` (left .25rem)
- `bwl3` (left .5rem)
- `bwl4` (left 1rem)
- `bwl5` (left 2rem)
- `bwl-1px` (left 1px)
- `bwl-2px` (left 2px)
- `bwl-4px` (left 4px)
- `bwr0` (right 0rem)
- `bwr1` (right .125rem)
- `bwr2` (right .25rem)
- `bwr3` (right .5rem)
- `bwr4` (right 1rem)
- `bwr5` (right 2rem)
- `bwr-1px` (right 1px)
- `bwr-2px` (right 2px)
- `bwr-4px` (right 4px)
- `bwt0` (top 0rem)
- `bwt1` (top .125rem)
- `bwt2` (top .25rem)
- `bwt3` (top .5rem)
- `bwt4` (top 1rem)
- `bwt5` (top 2rem)
- `bwt-1px` (top 1px)
- `bwt-2px` (top 2px)
- `bwt-4px` (top 4px)
</details>

#### Box sizing

- `border-box` (border-box)
- `content-box` (content-box)

#### Color scheme

- `color-scheme-dark` (dark)
- `color-scheme-light` (light)
- `color-scheme-light-dark` (light dark)

#### Content

<details><summary>6 items:</summary>

- `content-data-lang` (data-lang attrib)
- `content-href` (href attrib)
- `content-id` (id attrib)
- `content-name` (name attrib)
- `content-slot` (slot attrib)
- `content-title` (title attrib)
</details>

#### Cursors

<details><summary>36 items:</summary>

- `cursor-alias`
- `cursor-auto`
- `cursor-cell`
- `cursor-col`
- `cursor-context`
- `cursor-copy`
- `cursor-cross`
- `cursor-default`
- `cursor-e`
- `cursor-ew`
- `cursor-forbidden`
- `cursor-grab`
- `cursor-grabbing`
- `cursor-help`
- `cursor-in`
- `cursor-move`
- `cursor-n`
- `cursor-ne`
- `cursor-news`
- `cursor-no-drop`
- `cursor-none`
- `cursor-ns`
- `cursor-nw`
- `cursor-nwse`
- `cursor-out`
- `cursor-pointer`
- `cursor-progress`
- `cursor-row`
- `cursor-s`
- `cursor-scroll`
- `cursor-se`
- `cursor-sw`
- `cursor-text`
- `cursor-vtext`
- `cursor-w`
- `cursor-wait`
</details>

#### Display mode

<details><summary>11 items:</summary>

- `db` (block)
- `di` (inline)
- `dib` (inline-block)
- `dif` (inline-flex)
- `dig` (inline-grid)
- `dn` (none)
- `dt` (table)
- `dtc` (table-cell)
- `dtr` (table-row)
- `flex` (flex)
- `grid` (grid)
</details>

#### Flex layout

<details><summary>25 items:</summary>

- `align-content-center`
- `align-content-end`
- `align-content-space-around`
- `align-content-space-between`
- `align-content-space-evenly`
- `align-content-start`
- `align-content-stretch`
- `flex-column`
- `flex-column-reverse`
- `flex-grow0`
- `flex-grow1`
- `flex-nowrap`
- `flex-row`
- `flex-row-reverse`
- `flex-shrink0`
- `flex-shrink1`
- `flex-wrap`
- `flex-wrap-reverse`
- `justify-content-center`
- `justify-content-end`
- `justify-content-space-around`
- `justify-content-space-between`
- `justify-content-space-evenly`
- `justify-content-start`
- `justify-content-stretch`
</details>

#### Font families

<details><summary>6 items:</summary>

- `monospace`
- `sans-serif`
- `serif`
- `system`
- `system-sans-serif`
- `system-serif`
</details>

#### Font sizes

<details><summary>9 items:</summary>

- `f-subtitle` (5rem)
- `f-title` (6rem)
- `f1` (3rem)
- `f2` (2.25rem)
- `f3` (1.5rem)
- `f4` (1.25rem)
- `f5` (1rem)
- `f6` (.875rem)
- `f7` (.75rem)
</details>

#### Font style

- `italic`

#### Font variants

- `small-caps`

#### Font weights

<details><summary>11 items:</summary>

- `b` (700)
- `fw100`
- `fw200`
- `fw300`
- `fw400`
- `fw500`
- `fw600`
- `fw700`
- `fw800`
- `fw900`
- `normal` (400)
</details>

#### Grid layout

<details><summary>46 items:</summary>

- `align-items-center`
- `align-items-end`
- `align-items-start`
- `align-items-stretch`
- `align-self-center`
- `align-self-end`
- `align-self-start`
- `align-self-stretch`
- `gap0` (0rem)
- `gap1` (.125rem)
- `gap2` (.25rem)
- `gap3` (.5rem)
- `gap4` (1rem)
- `gap5` (2rem)
- `gap-1px`
- `gap-2px`
- `gap-4px`
- `gap-8px`
- `grid-cols-1` (1fr)
- `grid-cols-2` (1fr 1fr)
- `grid-cols-3` (1fr 1fr 1fr)
- `grid-cols-4` (repeat(4,1fr))
- `grid-cols-5` (repeat(5,1fr))
- `grid-cols-6` (repeat(6,1fr))
- `grid-cols-7` (repeat(7,1fr))
- `grid-cols-8` (repeat(8,1fr))
- `grid-cols-9` (repeat(9,1fr))
- `grid-cols-10` (repeat(10,1fr))
- `grid-rows-1` (1fr)
- `grid-rows-2` (1fr 1fr)
- `grid-rows-3` (1fr 1fr 1fr)
- `grid-rows-4` (repeat(4,1fr))
- `grid-rows-5` (repeat(5,1fr))
- `grid-rows-6` (repeat(6,1fr))
- `grid-rows-7` (repeat(7,1fr))
- `grid-rows-8` (repeat(8,1fr))
- `grid-rows-9` (repeat(9,1fr))
- `grid-rows-10` (repeat(10,1fr))
- `justify-items-center`
- `justify-items-end`
- `justify-items-start`
- `justify-items-stretch`
- `justify-self-center`
- `justify-self-end`
- `justify-self-start`
- `justify-self-stretch`
</details>

#### Height

<details><summary>30 items:</summary>

- `h0` (0rem)
- `h1` (1rem)
- `h2` (2rem)
- `h3` (4rem)
- `h4` (8rem)
- `h5` (16rem)
- `h-10` (%)
- `h-16` (%)
- `h-17` (%)
- `h-20` (%)
- `h-25` (%)
- `h-30` (%)
- `h-33` (%)
- `h-34` (%)
- `h-40` (%)
- `h-50` (%)
- `h-60` (%)
- `h-66` (%)
- `h-67` (%)
- `h-70` (%)
- `h-75` (%)
- `h-80` (%)
- `h-83` (%)
- `h-84` (%)
- `h-90` (%)
- `h-100` (%)
- `vh-25`
- `vh-50`
- `vh-75`
- `vh-100`
</details>

#### Icons

<details><summary>9 items:</summary>

- `icon-1` (3rem)
- `icon-2` (2.25rem)
- `icon-3` (1.5rem)
- `icon-4` (1.25rem)
- `icon-5` (1rem)
- `icon-6` (.875rem)
- `icon-7` (.75rem)
- `icon-subtitle` (5rem)
- `icon-title` (6rem)
</details>

#### Letter spacing

<details><summary>6 items:</summary>

- `ls-0` (0em)
- `ls-1` (.05em)
- `ls-2` (.1em)
- `ls-3` (.2em)
- `ls--1` (-.025em)
- `ls--2` (-.05em)
</details>

#### Line heights

<details><summary>5 items:</summary>

- `lh-0` (0)
- `lh-copy` (1.5)
- `lh-double` (2)
- `lh-solid` (1)
- `lh-title` (1.25)
</details>

#### Lists

- `list`

#### Margin

<details><summary>55 items:</summary>

- `center`
- `ma0` ( 0rem)
- `ma1` ( .25rem)
- `ma2` ( .5rem)
- `ma3` ( 1rem)
- `ma4` ( 2rem)
- `ma5` ( 4rem)
- `mb0` (bottom 0rem)
- `mb1` (bottom .25rem)
- `mb2` (bottom .5rem)
- `mb3` (bottom 1rem)
- `mb4` (bottom 2rem)
- `mb5` (bottom 4rem)
- `mbe-0` (block end 0rem)
- `mbe-1` (block end .25rem)
- `mbe-2` (block end .5rem)
- `mbe-3` (block end 1rem)
- `mbe-4` (block end 2rem)
- `mbe-5` (block end 4rem)
- `mbs-0` (block start 0rem)
- `mbs-1` (block start .25rem)
- `mbs-2` (block start .5rem)
- `mbs-3` (block start 1rem)
- `mbs-4` (block start 2rem)
- `mbs-5` (block start 4rem)
- `mh0` (left 0rem)
- `mh1` (left .25rem)
- `mh2` (left .5rem)
- `mh3` (left 1rem)
- `mh4` (left 2rem)
- `mh5` (left 4rem)
- `ml0` (left 0rem)
- `ml1` (left .25rem)
- `ml2` (left .5rem)
- `ml3` (left 1rem)
- `ml4` (left 2rem)
- `ml5` (left 4rem)
- `mr0` (right 0rem)
- `mr1` (right .25rem)
- `mr2` (right .5rem)
- `mr3` (right 1rem)
- `mr4` (right 2rem)
- `mr5` (right 4rem)
- `mt0` (top 0rem)
- `mt1` (top .25rem)
- `mt2` (top .5rem)
- `mt3` (top 1rem)
- `mt4` (top 2rem)
- `mt5` (top 4rem)
- `mv0` (top 0rem)
- `mv1` (top .25rem)
- `mv2` (top .5rem)
- `mv3` (top 1rem)
- `mv4` (top 2rem)
- `mv5` (top 4rem)
</details>

#### Mask

<details><summary>13 items:</summary>

- `mask-clip-border` (border-box)
- `mask-clip-content` (content-box)
- `mask-clip-fill` (fill-box)
- `mask-clip-none` (no-clip)
- `mask-clip-padding` (padding-box)
- `mask-clip-stroke` (stroke-box)
- `mask-clip-view` (view-box)
- `mask-mode-alpha` (alpha)
- `mask-mode-luminance` (luminance)
- `mask-mode-match-source` (match-source)
- `mask-type-alpha` (alpha)
- `mask-type-luminance` (luminance)
- `mask-type-match-source` (match-source)
</details>

#### Max. height

<details><summary>25 items:</summary>

- `maxh1` (1rem)
- `maxh2` (2rem)
- `maxh3` (4rem)
- `maxh4` (8rem)
- `maxh5` (16rem)
- `maxh-10` (%)
- `maxh-16` (%)
- `maxh-17` (%)
- `maxh-20` (%)
- `maxh-25` (%)
- `maxh-30` (%)
- `maxh-33` (%)
- `maxh-34` (%)
- `maxh-40` (%)
- `maxh-50` (%)
- `maxh-60` (%)
- `maxh-66` (%)
- `maxh-67` (%)
- `maxh-70` (%)
- `maxh-75` (%)
- `maxh-80` (%)
- `maxh-83` (%)
- `maxh-84` (%)
- `maxh-90` (%)
- `maxh-100` (%)
</details>

#### Max. width

<details><summary>25 items:</summary>

- `maxw1` (1rem)
- `maxw2` (2rem)
- `maxw3` (4rem)
- `maxw4` (8rem)
- `maxw5` (16rem)
- `maxw-10` (%)
- `maxw-16` (%)
- `maxw-17` (%)
- `maxw-20` (%)
- `maxw-25` (%)
- `maxw-30` (%)
- `maxw-33` (%)
- `maxw-34` (%)
- `maxw-40` (%)
- `maxw-50` (%)
- `maxw-60` (%)
- `maxw-66` (%)
- `maxw-67` (%)
- `maxw-70` (%)
- `maxw-75` (%)
- `maxw-80` (%)
- `maxw-83` (%)
- `maxw-84` (%)
- `maxw-90` (%)
- `maxw-100` (%)
</details>

#### Min. height

<details><summary>25 items:</summary>

- `minh1` (1rem)
- `minh2` (2rem)
- `minh3` (4rem)
- `minh4` (8rem)
- `minh5` (16rem)
- `minh-10` (%)
- `minh-16` (%)
- `minh-17` (%)
- `minh-20` (%)
- `minh-25` (%)
- `minh-30` (%)
- `minh-33` (%)
- `minh-34` (%)
- `minh-40` (%)
- `minh-50` (%)
- `minh-60` (%)
- `minh-66` (%)
- `minh-67` (%)
- `minh-70` (%)
- `minh-75` (%)
- `minh-80` (%)
- `minh-83` (%)
- `minh-84` (%)
- `minh-90` (%)
- `minh-100` (%)
</details>

#### Min. width

<details><summary>25 items:</summary>

- `minw1` (1rem)
- `minw2` (2rem)
- `minw3` (4rem)
- `minw4` (8rem)
- `minw5` (16rem)
- `minw-10` (%)
- `minw-16` (%)
- `minw-17` (%)
- `minw-20` (%)
- `minw-25` (%)
- `minw-30` (%)
- `minw-33` (%)
- `minw-34` (%)
- `minw-40` (%)
- `minw-50` (%)
- `minw-60` (%)
- `minw-66` (%)
- `minw-67` (%)
- `minw-70` (%)
- `minw-75` (%)
- `minw-80` (%)
- `minw-83` (%)
- `minw-84` (%)
- `minw-90` (%)
- `minw-100` (%)
</details>

#### Opacity

<details><summary>11 items:</summary>

- `o-0` (0)
- `o-10` (0.1)
- `o-20` (0.2)
- `o-30` (0.3)
- `o-40` (0.4)
- `o-50` (0.5)
- `o-60` (0.6)
- `o-70` (0.7)
- `o-80` (0.8)
- `o-90` (0.9)
- `o-100` (1)
</details>

#### Overflow

<details><summary>12 items:</summary>

- `overflow-auto`
- `overflow-hidden`
- `overflow-scroll`
- `overflow-visible`
- `overflow-x-auto`
- `overflow-x-hidden`
- `overflow-x-scroll`
- `overflow-x-visible`
- `overflow-y-auto`
- `overflow-y-hidden`
- `overflow-y-scroll`
- `overflow-y-visible`
</details>

#### Padding

<details><summary>54 items:</summary>

- `pa0` ( 0rem)
- `pa1` ( .25rem)
- `pa2` ( .5rem)
- `pa3` ( 1rem)
- `pa4` ( 2rem)
- `pa5` ( 4rem)
- `pb0` (bottom 0rem)
- `pb1` (bottom .25rem)
- `pb2` (bottom .5rem)
- `pb3` (bottom 1rem)
- `pb4` (bottom 2rem)
- `pb5` (bottom 4rem)
- `pbe-0` (block end 0rem)
- `pbe-1` (block end .25rem)
- `pbe-2` (block end .5rem)
- `pbe-3` (block end 1rem)
- `pbe-4` (block end 2rem)
- `pbe-5` (block end 4rem)
- `pbs-0` (block start 0rem)
- `pbs-1` (block start .25rem)
- `pbs-2` (block start .5rem)
- `pbs-3` (block start 1rem)
- `pbs-4` (block start 2rem)
- `pbs-5` (block start 4rem)
- `ph0` (left 0rem)
- `ph1` (left .25rem)
- `ph2` (left .5rem)
- `ph3` (left 1rem)
- `ph4` (left 2rem)
- `ph5` (left 4rem)
- `pl0` (left 0rem)
- `pl1` (left .25rem)
- `pl2` (left .5rem)
- `pl3` (left 1rem)
- `pl4` (left 2rem)
- `pl5` (left 4rem)
- `pr0` (right 0rem)
- `pr1` (right .25rem)
- `pr2` (right .5rem)
- `pr3` (right 1rem)
- `pr4` (right 2rem)
- `pr5` (right 4rem)
- `pt0` (top 0rem)
- `pt1` (top .25rem)
- `pt2` (top .5rem)
- `pt3` (top 1rem)
- `pt4` (top 2rem)
- `pt5` (top 4rem)
- `pv0` (top 0rem)
- `pv1` (top .25rem)
- `pv2` (top .5rem)
- `pv3` (top 1rem)
- `pv4` (top 2rem)
- `pv5` (top 4rem)
</details>

#### Positions

<details><summary>25 items:</summary>

- `absolute`
- `bottom-0` (0rem)
- `bottom-1` (1rem)
- `bottom-2` (2rem)
- `bottom--1` (-1rem)
- `bottom--2` (-2rem)
- `fixed`
- `left-0` (0rem)
- `left-1` (1rem)
- `left-2` (2rem)
- `left--1` (-1rem)
- `left--2` (-2rem)
- `relative`
- `right-0` (0rem)
- `right-1` (1rem)
- `right-2` (2rem)
- `right--1` (-1rem)
- `right--2` (-2rem)
- `static`
- `sticky`
- `top-0` (0rem)
- `top-1` (1rem)
- `top-2` (2rem)
- `top--1` (-1rem)
- `top--2` (-2rem)
</details>

#### Print

<details><summary>18 items:</summary>

- `break-after-avoid`
- `break-after-avoid-column`
- `break-after-avoid-page`
- `break-after-column`
- `break-after-left`
- `break-after-page`
- `break-after-recto`
- `break-after-right`
- `break-after-verso`
- `break-before-avoid`
- `break-before-avoid-column`
- `break-before-avoid-page`
- `break-before-column`
- `break-before-left`
- `break-before-page`
- `break-before-recto`
- `break-before-right`
- `break-before-verso`
</details>

#### Scrolling

<details><summary>8 items:</summary>

- `ss-always` (snap stop)
- `ss-both` (snap type)
- `ss-center` (snap align)
- `ss-end` (snap align)
- `ss-normal` (snap stop)
- `ss-start` (snap align)
- `ss-x` (snap type)
- `ss-y` (snap type)
</details>

#### Selection

- `noselect`

#### Shadow

<details><summary>17 items:</summary>

- `box-shadow-1` (0 0 2px 0px #0003)
- `box-shadow-2` (0 0 4px #0003)
- `box-shadow-3` (0 0 4px 1px #0003)
- `box-shadow-4` (0 0 8px 2px #0003)
- `box-shadow-i-1` (0 0 2px 0px #0003)
- `box-shadow-i-2` (0 0 4px #0003)
- `box-shadow-i-3` (0 0 4px 1px #0003)
- `box-shadow-i-4` (0 0 8px 2px #0003)
- `text-shadow-1` (1px 1px 2px #0003)
- `text-shadow-2` (1px 1px 4px #0003)
- `text-shadow-3` (1px 1px 8px #0003)
- `text-shadow-4` (2px 2px 2px #0003)
- `text-shadow-5` (2px 2px 4px #0003)
- `text-shadow-6` (2px 2px 8px #0003)
- `text-shadow-7` (3px 3px 2px #0003)
- `text-shadow-8` (3px 3px 4px #0003)
- `text-shadow-9` (3px 3px 8px #0003)
</details>

#### Svg

<details><summary>76 items:</summary>

- `fill-black` (#000)
- `fill-blue` (#357edd)
- `fill-current` (currentcolor)
- `fill-dark-blue` (#00449e)
- `fill-dark-gray` (#333)
- `fill-dark-green` (#137752)
- `fill-dark-pink` (#d5008f)
- `fill-dark-red` (#e7040f)
- `fill-gold` (#ffb700)
- `fill-gray` (#777)
- `fill-green` (#19a974)
- `fill-hot-pink` (#ff41b4)
- `fill-light-blue` (#96ccff)
- `fill-light-gray` (#eee)
- `fill-light-green` (#9eebcf)
- `fill-light-pink` (#ffa3d7)
- `fill-light-purple` (#a463f2)
- `fill-light-red` (#ff725c)
- `fill-light-silver` (#aaa)
- `fill-light-yellow` (#fbf1a9)
- `fill-lightest-blue` (#cdecff)
- `fill-mid-gray` (#555)
- `fill-moon-gray` (#ccc)
- `fill-navy` (#001b44)
- `fill-near-black` (#111)
- `fill-near-white` (#f4f4f4)
- `fill-orange` (#ff6300)
- `fill-pink` (#ff80cc)
- `fill-purple` (#5e2ca5)
- `fill-red` (#ff4136)
- `fill-silver` (#999)
- `fill-transparent` (transparent)
- `fill-washed-blue` (#f6fffe)
- `fill-washed-green` (#e8fdf5)
- `fill-washed-red` (#ffdfdf)
- `fill-washed-yellow` (#fffceb)
- `fill-white` (#fff)
- `fill-yellow` (#ffd700)
- `stroke-black` (#000)
- `stroke-blue` (#357edd)
- `stroke-current` (currentcolor)
- `stroke-dark-blue` (#00449e)
- `stroke-dark-gray` (#333)
- `stroke-dark-green` (#137752)
- `stroke-dark-pink` (#d5008f)
- `stroke-dark-red` (#e7040f)
- `stroke-gold` (#ffb700)
- `stroke-gray` (#777)
- `stroke-green` (#19a974)
- `stroke-hot-pink` (#ff41b4)
- `stroke-light-blue` (#96ccff)
- `stroke-light-gray` (#eee)
- `stroke-light-green` (#9eebcf)
- `stroke-light-pink` (#ffa3d7)
- `stroke-light-purple` (#a463f2)
- `stroke-light-red` (#ff725c)
- `stroke-light-silver` (#aaa)
- `stroke-light-yellow` (#fbf1a9)
- `stroke-lightest-blue` (#cdecff)
- `stroke-mid-gray` (#555)
- `stroke-moon-gray` (#ccc)
- `stroke-navy` (#001b44)
- `stroke-near-black` (#111)
- `stroke-near-white` (#f4f4f4)
- `stroke-orange` (#ff6300)
- `stroke-pink` (#ff80cc)
- `stroke-purple` (#5e2ca5)
- `stroke-red` (#ff4136)
- `stroke-silver` (#999)
- `stroke-transparent` (transparent)
- `stroke-washed-blue` (#f6fffe)
- `stroke-washed-green` (#e8fdf5)
- `stroke-washed-red` (#ffdfdf)
- `stroke-washed-yellow` (#fffceb)
- `stroke-white` (#fff)
- `stroke-yellow` (#ffd700)
</details>

#### Text align

<details><summary>4 items:</summary>

- `tc` (center)
- `tj` (justify)
- `tl` (left)
- `tr` (right)
</details>

#### Text color

<details><summary>38 items:</summary>

- `color-black` (#000)
- `color-blue` (#357edd)
- `color-current` (currentcolor)
- `color-dark-blue` (#00449e)
- `color-dark-gray` (#333)
- `color-dark-green` (#137752)
- `color-dark-pink` (#d5008f)
- `color-dark-red` (#e7040f)
- `color-gold` (#ffb700)
- `color-gray` (#777)
- `color-green` (#19a974)
- `color-hot-pink` (#ff41b4)
- `color-light-blue` (#96ccff)
- `color-light-gray` (#eee)
- `color-light-green` (#9eebcf)
- `color-light-pink` (#ffa3d7)
- `color-light-purple` (#a463f2)
- `color-light-red` (#ff725c)
- `color-light-silver` (#aaa)
- `color-light-yellow` (#fbf1a9)
- `color-lightest-blue` (#cdecff)
- `color-mid-gray` (#555)
- `color-moon-gray` (#ccc)
- `color-navy` (#001b44)
- `color-near-black` (#111)
- `color-near-white` (#f4f4f4)
- `color-orange` (#ff6300)
- `color-pink` (#ff80cc)
- `color-purple` (#5e2ca5)
- `color-red` (#ff4136)
- `color-silver` (#999)
- `color-transparent` (transparent)
- `color-washed-blue` (#f6fffe)
- `color-washed-green` (#e8fdf5)
- `color-washed-red` (#ffdfdf)
- `color-washed-yellow` (#fffceb)
- `color-white` (#fff)
- `color-yellow` (#ffd700)
</details>

#### Text decorations

- `no-underline`
- `strike`
- `underline`

#### Text transforms

<details><summary>7 items:</summary>

- `ttc` (capitalize)
- `ttfsk` (full-size-kana)
- `ttfw` (full-width)
- `tti` (initial)
- `ttl` (lowercase)
- `ttn` (none)
- `ttu` (uppercase)
</details>

#### Transform

<details><summary>9 items:</summary>

- `tx-origin-b`
- `tx-origin-bl`
- `tx-origin-br`
- `tx-origin-c`
- `tx-origin-l`
- `tx-origin-r`
- `tx-origin-t`
- `tx-origin-tl`
- `tx-origin-tr`
</details>

#### Vertical align

<details><summary>4 items:</summary>

- `v-base` (baseline)
- `v-btm` (bottom)
- `v-mid` (middle)
- `v-top` (top)
</details>

#### Visibility

- `collapse`
- `hidden`
- `visible`

#### Whitespace

- `ws-normal`
- `ws-nowrap`
- `ws-pre`

#### Width

<details><summary>30 items:</summary>

- `vw-25`
- `vw-50`
- `vw-75`
- `vw-100`
- `w0` (0rem)
- `w1` (1rem)
- `w2` (2rem)
- `w3` (4rem)
- `w4` (8rem)
- `w5` (16rem)
- `w-10` (%)
- `w-16` (%)
- `w-17` (%)
- `w-20` (%)
- `w-25` (%)
- `w-30` (%)
- `w-33` (%)
- `w-34` (%)
- `w-40` (%)
- `w-50` (%)
- `w-60` (%)
- `w-66` (%)
- `w-67` (%)
- `w-70` (%)
- `w-75` (%)
- `w-80` (%)
- `w-83` (%)
- `w-84` (%)
- `w-90` (%)
- `w-100` (%)
</details>

#### Z-indices

<details><summary>8 items:</summary>

- `z-0`
- `z-1`
- `z-2`
- `z-3`
- `z-4`
- `z-5`
- `z-999`
- `z-9999`
</details>

### Templates by category

#### Animation / transition

<details><summary>13 items:</summary>

##### `anim-delay(delay)`

- **delay**: time (in seconds)

##### `anim-duration(duration)`

- **duration**: time (in seconds)

##### `anim-iter(iter)`

- **iter**: number of iterations

##### `anim-steps(num)`

- **num**: number of steps

Sets animation-timing-function to `steps(num)`

##### `bg-anim(duration)`

- **duration**: in seconds

Transition to tween background color

##### `fade-in(duration)`

- **duration**: in seconds

Animation to change opacity

##### `fade-out(duration)`

- **duration**: in seconds

Animation to change opacity

##### `shrink(duration, height)`

- **duration**: in seconds
- **height**: initial height (incl. units)

Animation which shrinks the height from given initial value to zero. Target element must NOT have padding (use a wrapper if necessary).

##### `spin(duration)`

- **duration**: in seconds

Animation which rotates element a full turn, looping indefinitely

##### `transition-delay(delay)`

- **delay**: time (in seconds)

##### `transition-duration(duration)`

- **duration**: time (in seconds)

##### `transition-steps(num)`

- **num**: number of steps

Sets transition-timing-function to `steps(num)`

##### `tween-colors(duration)`

- **duration**: in seconds

Transition tweening color, background-color, border-color

</details>

#### Appearance

##### `appearance(mode)`

- **mode**: CSS value

Sets appearance (incl. `-webkit` prefixed version) to given value

#### Aspect ratios

##### `aspect-ratio(width, height)`

- **width**: aspect width
- **height**: aspect height

Sets `aspect-ratio` CSS property

##### `bg-aspect-ratio(width, height)`

- **width**: aspect width
- **height**: aspect height

Sets aspect ratio of background. Use with `bg-aspect-ratio-object` on child element.

#### Background

##### `bg-image(url)`

- **url**: image URL

##### `bg-pos(body)`

- **body**: CSS value/definition

##### `bg-size(body)`

- **body**: CSS value/definition

#### Background color

##### `bg-color(name)`

- **name**: variable name (without `--` prefix)

#### Border color

##### `border-color(name)`

- **name**: variable name (without `--` prefix)

#### Color adjustment

<details><summary>5 items:</summary>

##### `adjust-color(name, base, l, c, h, a)`

- **name**: new var name (without `--` prefix)
- **base**: color var (without `--` prefix)
- **l**: luminance offset
- **c**: chroma offset
- **h**: hue offset
- **a**: alpha offset

Assigns an adjusted version of `base` color to new variable `name`.

##### `lighten-color(name, base, l)`

- **name**: new var name (without `--` prefix)
- **base**: color var (without `--` prefix)
- **l**: luminance offset

Assigns an luminance-adjusted version of `base` color to new variable `name`.

##### `rotate-color(name, base, h)`

- **name**: new var name (without `--` prefix)
- **base**: color var (without `--` prefix)
- **h**: hue offset

Assigns an hue-rotated version of `base` color to new variable `name`.

##### `saturate-color(name, base, l)`

- **name**: new var name (without `--` prefix)
- **base**: color var (without `--` prefix)
- **l**: chroma offset

Assigns an chroma-adjusted version of `base` color to new variable `name`.

##### `with-alpha(name, base, a)`

- **name**: new var name (without `--` prefix)
- **base**: color var (without `--` prefix)
- **a**: alpha offset

</details>

#### Color scheme

<details><summary>5 items:</summary>

##### `bg-light-dark(light, dark)`

- **light**: variable name (without `--` prefix)
- **dark**: variable name (without `--` prefix)

Sets `background-color` using CSS light-dark() function

##### `border-light-dark(light, dark)`

- **light**: variable name (without `--` prefix)
- **dark**: variable name (without `--` prefix)

Sets `border-color` using CSS light-dark() function

##### `fill-light-dark(light, dark)`

- **light**: variable name (without `--` prefix)
- **dark**: variable name (without `--` prefix)

Sets `fill` color using CSS light-dark() function

##### `light-dark(light, dark)`

- **light**: variable name (without `--` prefix)
- **dark**: variable name (without `--` prefix)

Sets `color` using CSS light-dark() function

##### `stroke-light-dark(light, dark)`

- **light**: variable name (without `--` prefix)
- **dark**: variable name (without `--` prefix)

Sets `stroke` color using CSS light-dark() function

</details>

#### Font families

##### `font-family(name)`

- **name**: variable name (without `--` prefix)

Variable-based font-family

#### Fx

##### `bg-blur(radius)`

- **radius**: incl. units

##### `blur(radius)`

- **radius**: incl. units

#### Grid layout

##### `grid-cols(cols)`

- **cols**: CSS cols definitions

##### `grid-rows(rows)`

- **rows**: CSS rows definitions

#### Layout

##### `columns(num)`

- **num**: column count

#### Margin

<details><summary>7 items:</summary>

##### `ma(size)`

- **size**: incl. units

Sets margin to custom size

##### `mb(size)`

- **size**: incl. units

Sets margin to custom size

##### `mh(size)`

- **size**: incl. units

Sets margin to custom size

##### `ml(size)`

- **size**: incl. units

Sets margin to custom size

##### `mr(size)`

- **size**: incl. units

Sets margin to custom size

##### `mt(size)`

- **size**: incl. units

Sets margin to custom size

##### `mv(size)`

- **size**: incl. units

Sets margin to custom size

</details>

#### Padding

<details><summary>7 items:</summary>

##### `pa(size)`

- **size**: incl. units

Sets padding to custom size

##### `pb(size)`

- **size**: incl. units

Sets padding to custom size

##### `ph(size)`

- **size**: incl. units

Sets padding to custom size

##### `pl(size)`

- **size**: incl. units

Sets padding to custom size

##### `pr(size)`

- **size**: incl. units

Sets padding to custom size

##### `pt(size)`

- **size**: incl. units

Sets padding to custom size

##### `pv(size)`

- **size**: incl. units

Sets padding to custom size

</details>

#### Positions

<details><summary>4 items:</summary>

##### `bottom(coordinate)`

- **coordinate** (incl. units)

##### `left(coordinate)`

- **coordinate** (incl. units)

##### `right(coordinate)`

- **coordinate** (incl. units)

##### `top(coordinate)`

- **coordinate** (incl. units)

</details>

#### Svg

##### `fill(name)`

- **name**: variable name (without `--` prefix)

##### `stroke(name)`

- **name**: variable name (without `--` prefix)

#### Text color

##### `color(name)`

- **name**: variable name (without `--` prefix)

### Media queries

- **ns**: `{"min-width":"640px"}`
- **m**: `{"min-width":"768px"}`
- **l**: `{"min-width":"1024px"}`
- **xl**: `{"min-width":"1280px"}`
- **2xl**: `{"min-width":"1536px"}`
- **dark**: `{"prefers-color-scheme":"dark"}`
- **light**: `{"prefers-color-scheme":"light"}`
- **anim**: `{"prefers-reduced-motion":false}`
- **noanim**: `{"prefers-reduced-motion":true}`
- **contrast**: `{"forced-colors":true}`

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bmeta-css%5D+in%3Atitle)

## Related packages

- [@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-css) - CSS from nested JS data structures

## Installation

```bash
npx @thi.ng/meta-css --help
```

If [Bun](https://bun.sh) is installed, MetaCSS will use it instead of Node JS.
The toolchain itself is distributed as CLI bundle with **no runtime
dependencies**. The following dependencies are only shown for informational
purposes and are (partially) included in the bundle.

Package sizes (brotli'd, pre-treeshake): ESM: 14.03 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/args](https://github.com/thi-ng/umbrella/tree/develop/packages/args)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compare](https://github.com/thi-ng/umbrella/tree/develop/packages/compare)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-css)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/memoize](https://github.com/thi-ng/umbrella/tree/develop/packages/memoize)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/text-format](https://github.com/thi-ng/umbrella/tree/develop/packages/text-format)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

15 projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                 | Description                                                                                 | Live demo                                                 | Source                                                                                 |
|:---------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/blurhash.jpg" width="240"/>            | Interactive & reactive image blurhash generator                                             | [Demo](https://demo.thi.ng/umbrella/blurhash/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/blurhash)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/layout-gridgen.png" width="240"/>      | Randomized space-filling, nested grid layout generator                                      | [Demo](https://demo.thi.ng/umbrella/layout-gridgen/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/layout-gridgen)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/meta-css-basics.png" width="240"/>     | Basic thi.ng/meta-css usage & testbed                                                       | [Demo](https://demo.thi.ng/umbrella/meta-css-basics/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/meta-css-basics)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/procedural-text.jpg" width="240"/>     | Procedural stochastic text generation via custom DSL, parse grammar & AST transformation    | [Demo](https://demo.thi.ng/umbrella/procedural-text/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/procedural-text)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ramp-scroll-anim.png" width="240"/>    | Scroll-based, reactive, multi-param CSS animation basics                                    | [Demo](https://demo.thi.ng/umbrella/ramp-scroll-anim/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/ramp-scroll-anim)    |
|                                                                                                                            | Demonstates various rdom usage patterns                                                     | [Demo](https://demo.thi.ng/umbrella/rdom-basics/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-basics)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-delayed-update.jpg" width="240"/> | Dynamically loaded images w/ preloader state                                                | [Demo](https://demo.thi.ng/umbrella/rdom-delayed-update/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-delayed-update) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-dnd.png" width="240"/>            | rdom drag & drop example                                                                    | [Demo](https://demo.thi.ng/umbrella/rdom-dnd/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-dnd)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-formgen.jpg" width="240"/>        | Basic usage of the declarative rdom-forms generator                                         | [Demo](https://demo.thi.ng/umbrella/rdom-formgen/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-formgen)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-lazy-load.png" width="240"/>      | Lazy loading components via @thi.ng/rdom                                                    | [Demo](https://demo.thi.ng/umbrella/rdom-lazy-load/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-lazy-load)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-web-components.png" width="240"/> | Defining & using basic Web Components (with shadow DOM) via @thi.ng/rdom & @thi.ng/meta-css | [Demo](https://demo.thi.ng/umbrella/rdom-web-components/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-web-components) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-system-bus.png" width="240"/>  | Declarative component-based system with central rstream-based pubsub event bus              | [Demo](https://demo.thi.ng/umbrella/rstream-system-bus/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-system-bus)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/text-canvas.png" width="240"/>         | 3D wireframe textmode demo                                                                  | [Demo](https://demo.thi.ng/umbrella/text-canvas/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/text-canvas)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>        | Multi-layer vectorization & dithering of bitmap images                                      | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-texture-paint.jpg" width="240"/> | Interactively drawing to & reading from a WebGL offscreen render texture                    | [Demo](https://demo.thi.ng/umbrella/webgl-texture-paint/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-texture-paint) |

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

&copy; 2023 - 2025 Karsten Schmidt // Apache License 2.0
