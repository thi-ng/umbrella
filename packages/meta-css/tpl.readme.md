<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This toolchain and the overall workflow proposed by it is heavily building atop
the concept of _CSS utility classes_ and how they're utilized (as you might know
from using Tachyons, Turret or the newer Tailwind projects). How and where those
CSS classes are applied is however a defining point of difference to other
existing approaches. This readme aims to provide a thorough overview and some
concrete usage examples...

Note: In all cases, final CSS generation itself is handled by
[thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup-css/)

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
	// optional media queries and their criteria
	"media": {
		"large": { "min-width": "60rem" },
		"dark": { "prefers-color-scheme": "dark" }
	},
	// optional shared values/LUTs (arrays or objects)
	"tables": {
		"margins": [0, 0.25, 0.5, 1, 2, 4]
	},
	// optional shared variations
	"vars": {
		"size": ["width", "height"]
	},
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

--no-header             Don't emit generated header comment
-p, --pretty            Pretty print output
-v, --verbose           Display extra process information
-w, --watch             Watch input files for changes

Main:

-e STR, --eval STR      eval meta stylesheet in given string (ignores other inputs & includes)
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

--no-header             Don't emit generated header comment
-p, --pretty            Pretty print output
-v, --verbose           Display extra process information

Main:

-I STR, --include STR   [multiple] Include CSS files (prepend)
-m STR, --media STR     Media query IDs (use 'ALL' for all)
-o STR, --out STR       Output file (or stdout)
```

<!-- include export/framework.md -->

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

```bash
npx @thi.ng/meta-css --help
```

[Bun](https://bun.sh) is required instead of Node JS. The toolchain itself is
distributed as CLI bundle with **no runtime dependencies**. The following
dependencies are only shown for informational purposes and are (partially)
included in the bundle.

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

<!-- include ../../assets/tpl/footer.md -->
