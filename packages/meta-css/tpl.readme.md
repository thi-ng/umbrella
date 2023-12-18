<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package provides a CLI multi-tool to:

### Generate

The `generate` command is used to generate custom CSS frameworks from a number
of JSON rule specs. This process creates all desired, combinatorial versions of
various rules/declarations and exports them to another JSON file used as
intermediatary for the other commands provided by this toolchain. The
syntax/format of the generator rules is explained further on. These rules can be
split up into multiple files, can incude arbitrary media query criteria (all
later combinable), shared lookup tables for colors, margins, sizes, timings etc.

The package provides generator specs for a basic, configurable,
[tachyons.io](https://tachyons.io)-derived CSS framework in the
[/specs](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css/specs/)
directory. These specs are used for some example projects in this repo, but are
intended to be used as basic starting point for other custom frameworks.


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

### Convert

The `convert` command is used to compile & bundle actual CSS from user-provided
MetaCSS stylesheets (`*.meta` files) and the JSON framework specs created by the
`generate` command. The meta-stylesheets support any CSS selectors, are nestable
and compose full CSS declarations from lists of the utility classes in the
generated framework. Each item (aka utility class name) can be prefixed with an
arbitrary number of media query IDs (also custom defined in the framework).
Selectors, declarations and media query criteria will be deduplicated and merged
from multiple input files.  The resulting CSS will only contain referenced rules
and can be generated in minified or pretty printed formats (it's also possible
to force include CSS classes which are otherwise unreferenced, using the
`--force` CLI arg). Additionally, multiple .meta files can be watched for
changes, their definitions will be merged, and existing CSS files can be
included (prepended) in the bundled outout too.

```text
metacss convert --help

Usage: metacss convert [opts] input [...]

Flags:

--no-header             Don't emit generated header comment
-p, --pretty            Pretty print output
-v, --verbose           Display extra process information
-w, --watch             Watch input files for changes

Main:

--force STR[,..]        [multiple] CSS classes to force include (wildcards are
                        supported, @-prefix will read from file)
-I STR, --include STR   [multiple] Include CSS files (prepend)
-o STR, --out STR       Output file (or stdout)
-s STR, --specs STR     [required] Path to generated JSON defs
```

#### Including custom CSS files

One or more existing CSS files can be included & prepended to the output via the
`--include`/`-I` arg (which can be given multiple times). These files are used
as-is and will **not** be transformed or reformatted in any way.

### Force inclusion of unreferenced classes

Only the CSS classes (and their optionally associated media queries) referenced
in a `.meta` stylesheet will appear in the export CSS bundle. This ensures that
the resulting CSS will only contain what's actually used. However, this also
means any CSS classes (and optionally, their media query qualifiers) which are
otherwise referenced (e.g. from JS/TS source code or HTML docs) **will not** be
included by default and they will need to be listed manually for forced inclusion.

This can be achieved via the `--force`/`-f` arg (also can be given multiple
times). This option also supports basic `*`-wildcard patterns, e.g. `bg-*` to
include all classes with prefix `bg-`. Furthermore, for larger projects it's
useful to store these names/patterns in a separate file. For that purpose, use
the `@` prefix (e.g. `-f @includes.txt`) to indicate reading from file (only
reading from a single file is supported at current)...

### Export

The `export` command is intended for those who're only interested in the CSS
framework generation aspect of this toolchain. This command merely takes an
existing generated framework JSON file and serializes it to a single CSS file,
e.g. to be then used with other CSS tooling (e.g. `postcss`).

#### Media queries

Users can choose to generate variations of all defined utility classes for any
of the framework-defined media query IDs. This will create suffixed versions of
all classes (with their appropriate media query wrappers) and cause a
potentially massive output (depending on the overall number/complexity of the
generated classes). Again, the idea is that the resulting CSS file will be
post-processed with 3rd party CSS tooling...

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

Note: In all cases, final CSS generation itself is handled by
[thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup-css/)

**👷🏻 This is all WIP!** See example below for basic example usage...

## Framework generation rules

TODO — for now please see bundled example specs in
[/specs](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css/specs/)...

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

## CLI

### Basic usage example

The `metacss` tool provides multiple commands. You can install & run it like so:

```text
npx @thi.ng/meta-css --help

 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ @thi.ng/meta-css 0.0.1
 █ █ █ █ █ █ █ █ █ │ Data-driven CSS component & framework codegen
                 █ │
               █ █ │

Usage: metacss <cmd> [opts] input [...]
       metacss <cmd> --help

Available commands:

convert         : Transpile & bundle meta stylesheets to CSS
export          : Export entire generated framework as CSS
generate        : Generate framework rules from specs

Flags:

-v, --verbose           Display extra process information

Main:

-o STR, --out STR       Output file (or stdout)
```

### Generating framework code from bundled base definitions

To create our first framework, we first need to generate CSS utility classes
from given JSON generator specs. For simplicity the generated framework
definitions will be stored as JSON too and then used as lookup tables for actual
CSS translation in the next step.

```bash
# write generated CSS classes (in JSON)
metacss generate --out framework.json node_modules/@thi.ng/meta-css/specs
```

### Generating CSS from `.meta` stylesheets

#### *.meta stylesheets

The naming convention used by the [default framework
specs](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css/specs/)
is loosely based on [tachyons.io](https://tachyons.io), with the important
difference of media query handling. Using MetaCSS we don't have to pre-generate
mediaquery-specific versions, and any class ID/token can be prefixed with an
_arbitrary_ number of media query IDs (separated by `:`). These media queries
are defined as part of the framework JSON specs and when used as a prefix,
multiple query IDs can be combined freely. E.g. the token `dark:anim:bg-anim2`
will auto-create a merged CSS `@media`-query block for the query IDs `dark` and
`anim` and only emit the definition of `bg-anim2` for this combination (see
generated CSS further below).

readme.meta:

```text tangle:export/readme.meta

body { ma0 dark:bg-black dark:white bg-white black }

#app { ma3 }

.bt-group-v > a {
	db w100 l:w50 ph3 pv2 bwb1
	dark:bg-purple dark:white dark:b--black
	light:bg-light-blue light:black light:b--white
	{
		:hover { bg-gold black anim:bg-anim2 }
		:first-child { brt3 }
		:last-child { brb3 bwb0 }
	}
}
```

readme2.meta:

We will merge the definitions in this file with the ones from the file above
(i.e. adding & overriding some of the declarations, here: border radius):

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
# if not out dir is specified writes result to stdout
# use previously generated specs for resolving all identifiers & media queries
metacss convert --pretty --specs framework.json readme.meta readme2.meta
```

#### Resulting CSS output

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

A simple HTML example using above MetaCSS styles:

#### index.html

```html tangle:export/index.html
<!doctype html>
<html>
	<head>
		<link rel="stylesheet" href="bundle.css"/>
	</head>
	<body>
		<div id="app" class="bt-group-v">
			<a href="#">One</a>
			<a href="#">Two</a>
			<a href="#">Three</a>
			<a href="#">Four</a>
		</div>
	</body>
</html>
```

<!-- include ../../assets/tpl/footer.md -->
