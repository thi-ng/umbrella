<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/meta-css](https://media.thi.ng/umbrella/banners-20230807/thing-meta-css.svg?36f6c755)

[![npm version](https://img.shields.io/npm/v/@thi.ng/meta-css.svg)](https://www.npmjs.com/package/@thi.ng/meta-css)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/meta-css.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [CLI](#cli)
  - [Basic usage example](#basic-usage-example)
  - [Generate framework code for bundled base definitions](#generate-framework-code-for-bundled-base-definitions)
  - [Generate CSS from meta specs](#generate-css-from-meta-specs)
    - [index.html](#indexhtml)
    - [readme.meta](#readmemeta)
    - [Resulting CSS output](#resulting-css-output)
- [Authors](#authors)
- [License](#license)

## About

Data-driven CSS component & framework codegen.

This package provides CLI multi-tool to:

1. Generate entire CSS frameworks from a number of JSON specs. This incudes
   arbitrary media queries (all combinable), arbitrary look-up tables for
   colors, margins, sizes, timings etc., and generation of all combinatorial
   versions of various rules/declarations. Generated definitions are exported as
   JS/TS source files which are then used for phase 2:
2. Compile actual CSS from MetaCSS stylesheets. These specs support selector
   nesting and compose full CSS rules from lists of the utility classes
   generated in step 1. Each class can be prefixed with an arbitrary number of
   media query IDs. The resulting CSS will only contain referenced rules and can
   be generated in minified or pretty printed formats.

Final CSS generation itself is handled by
[thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/blob/a0fa6d715f1b9e3edb405cfb42c03daefec340b4/packages/hiccup-css/)

The generator specs for a basic, configurable framework are in
[base-specs.json](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css/specs/base-specs.json)...

**👷🏻 This is all WIP!** See example below for general usage...

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bmeta-css%5D+in%3Atitle)

## Related packages

- [@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-css) - CSS from nested JS data structures

## Installation

```bash
yarn add @thi.ng/meta-css
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/meta-css"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const metaCss = await import("@thi.ng/meta-css");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.44 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/args](https://github.com/thi-ng/umbrella/tree/develop/packages/args)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-css)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/develop/packages/paths)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/text-format](https://github.com/thi-ng/umbrella/tree/develop/packages/text-format)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## CLI

[Generated API docs](https://docs.thi.ng/umbrella/meta-css/)

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
Usage: metacss <cmd> --help

Available commands:

convert         : Convert meta declarations to CSS
generate        : Generate MetaCSS lookup tables from JSON

Flags:

-v, --verbose           Display extra process information

Main:

-o STR, --out STR       Output dir (or stdout) (default: "")
```

### Generate framework code for bundled base definitions

First we need to generate a number of JS (or TS) source files from given
generator specs (in JSON format). These will be used as lookup tables for later
CSS translation.

```bash
# write generated JS sources to ./src/generated
metacss generate --out src/generated node_modules/@thi.ng/meta-css/specs/base-specs.json
```

### Generate CSS from meta specs

Simple HTML example using custom MetaCSS styles (generated below):

#### index.html

```html tangle:export/index.html
<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="readme.css"/>
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

#### readme.meta

The naming convention used by the [default
specs](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css/specs/base-specs.json)
so far is loosely/partially based on [tachyons.io](https://tachyons.io), with
the important difference of media query handling. Here, any class token can be
prefixed with an _arbitrary_ number of media query IDs (separated by `:`). These
media queries are defined as part of the initial JSON specs and when used as a
prefix, multiple query IDs can be combined freely. E.g. the token
`dark:anim:bg-anim2` will auto-create a merged CSS `@media`-query block for the
query IDs `dark` and `anim` and only emit the definition of `bg-anim2` for this
combination (see generated CSS further below).

```text tangle:export/readme.meta
body { ma0 dark:bg-black dark:white bg-white black }

#app { ma3 }

.bt-group-v > a {
    db w100 l:w50 ph3 pv2 bwb1
    dark:bg-dark-red dark:white dark:border-dark-gray
    light:bg-washed-red light:dark-red light:border-moon-gray
    {
        :hover { bg-gold black anim:bg-anim2 }
        :first-child { brt3 }
        :last-child { brb3 bwb0 }
    }
}
```

```bash
# if not out dir is specified writes result to stdout
# use previously generated specs for resolving
metacss convert --pretty --specs src/generated/index.mjs readme.meta
```

#### Resulting CSS output

```css
/*! generated by thi.ng/meta-css from readme.meta @ 2023-12-14T20:44:35.307Z */
body {
    margin: 0rem;
    background-color: #fff;
    color: #000;
}

#app {
    margin: 1rem;
}

.bt-group-v > a:hover {
    background-color: #ffb700;
    color: #000;
}

.bt-group-v > a:first-child {
    border-top-left-radius: 0.500rem;
    border-top-right-radius: 0.500rem;
}

.bt-group-v > a:last-child {
    border-bottom-left-radius: 0.500rem;
    border-bottom-right-radius: 0.500rem;
    border-bottom-style: solid;
    border-bottom-width: 0rem;
}

.bt-group-v > a {
    display: block;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.500rem;
    padding-bottom: 0.500rem;
    border-bottom-style: solid;
    border-bottom-width: 0.125rem;
}

@media (prefers-color-scheme:dark) {

    body {
        background-color: #000;
        color: #fff;
    }

    .bt-group-v > a {
        background-color: #e7040f;
        color: #fff;
        border-color: #333;
    }

}

@media (min-width:60rem) {

    .bt-group-v > a {
        width: 50%;
    }

}

@media (prefers-color-scheme:light) {

    .bt-group-v > a {
        background-color: #ffdfdf;
        color: #e7040f;
        border-color: #ccc;
    }

}

@media not (prefers-reduced-motion) {

    .bt-group-v > a:hover {
        transition: 0.2s background-color ease-in-out;
    }

}
```

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
