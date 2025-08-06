<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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
-w, --watch             Watch input files for changes

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
-v, --verbose           Display extra information
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
-v, --verbose           Display extra information

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
-v, --verbose           Display extra information
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

-v, --verbose           Display extra information

Main:

-l INT, --level INT     Initial heading level (default: 1)
-o STR, --out STR       Output file (or stdout)
-t STR, --title STR     Custom main title, set to NONE to disable
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

<!-- include export/framework.md -->

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

```bash
npx @thi.ng/meta-css --help
```

If [Bun](https://bun.sh) is installed, MetaCSS will use it instead of Node JS.
The toolchain itself is distributed as CLI bundle with **no runtime
dependencies**. The following dependencies are only shown for informational
purposes and are (partially) included in the bundle.

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

<!-- include ../../assets/tpl/footer.md -->
