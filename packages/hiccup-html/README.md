<!-- This file is generated - DO NOT EDIT! -->

# ![hiccup-html](https://media.thi.ng/umbrella/banners-20220914/thing-hiccup-html.svg?b1a76bbf)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-html.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-html)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-html.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Supported elements](#supported-elements)
    - [Head / metadata](#head--metadata)
    - [Sections](#sections)
    - [Text content](#text-content)
    - [Lists](#lists)
    - [Tables](#tables)
    - [Inline](#inline)
    - [Forms / inputs](#forms--inputs)
    - [Media](#media)
  - [Compatibility](#compatibility)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [defElement](#defelement)
    - [Element creation](#element-creation)
- [Authors](#authors)
- [License](#license)

## About

100+ type-checked HTML5 element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) related infrastructure.

The following type-checked factory functions are provided **so far** and
in most cases include specialized type definitions for element-specific
attributes, incl. enumerated attrib values (where applicable/useful) and
all 420+ CSS property names (for use with the `style` attrib). See type
definitions in
[api.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/api.ts)
and [`defElement()`](#defelement) below for more details.

### Supported elements

#### Head / metadata

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/head.ts)

`base`, `head`, `link`, `linkCSS`, `meta`, `metaReferrer`,
`metaRefresh`, `metaRobots`, `metaUTF8`, `metaViewport`, `metaXUA`,
`script`, `style`, `title`

#### Sections

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/sections.ts)

`address`, `article`, `aside`, `body`, `footer`, `h1`..`h6`, `header`,
`hgroup`, `html`, `main`, `nav`, `noscript`, `section`

#### Text content

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/blocks.ts)

`blockquote`, `div`, `figure`, `figcaption`, `hr`, `iframe`, `para`,
`pre`

#### Lists

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/lists.ts)

`datalist`, `dd`, `dl`, `dt`, `li`, `ol`, `ul`

#### Tables

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/table.ts)

`caption`, `col`, `colgroup`, `table`, `tbody`, `td`, `tfoot`, `th`,
`thead`, `tr`

#### Inline

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/inline.ts)

`abbr`, `anchor`, `br`, `cite`, `code`, `data`, `del`, `em`, `i`, `ins`,
`kbd`, `mark`, `quote`, `small`, `span`, `strong`, `sub`, `sup`, `time`

#### Forms / inputs

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/forms.ts)

`button`, `checkbox`, `fieldset`, `form`, `inputColor`, `inputFile`,
`inputNumber`, `inputPass`, `inputRange`, `inputSearch`, `inputText`,
`label`, `legend`, `meter`, `option`, `optGroup`, `progress`, `radio`,
`select`, `textArea`

#### Media

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/media.ts)

`audio`, `canvas`, `img`, `picture`, `source`, `video`

### Compatibility

The hiccup syntax is (by design) merely a convention and specific
feature support and interpretation is down to the actual tooling used.

Whilst not a direct aspect or feature of this package, the type
definitions for element attributes defined here allow certain constructs
which are only supported by some hiccup consumers. OTOH not all of
the constructs are meaningful in the different usage contexts and for
most there're compatible alternative ways of expressing the same data.

The table below provides an overview of the _current_ syntax feature
support by the relevant packages consuming hiccup:

- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom)

| Feature                    | Example and HTML equivalent/result                   | hiccup | hdom | rdom |
|----------------------------|------------------------------------------------------|--------|------|------|
| Emmet style tags           | `["div#id.foo", {}]`                                 | ✅      | ✅    | ✅    |
|                            | `<div id="id" class="foo">`                          |        |      |      |
| `class` attrib as object   | `["a.bar.baz", { class: { foo: true, bar: false }}]` | ✅      | ✅    | ✅    |
|                            | `<a class="baz foo">`                                |        |      |      |
| `style` attrib as object   | `["div", { style: { color: "red" }}]`                | ✅      | ✅    | ✅    |
|                            | `<div style="color:red;">`                           |        |      |      |
| Attrib array values        | `["img", { srcset: ["1.jpg", "2.jpg"] }]`            | ✅      | ❌    | ✅    |
|                            | `<img srcset="1.jpg, 2.jpg">`                        |        |      |      |
| Data attribs as object     | `["a", { data: { foo: 42 }}]`                        | ✅      | ❌    | ✅    |
|                            | `<a data-foo="42">`                                  |        |      |      |
| Function attrib values (1) | `["a", { id: () => "epoch-" + Date.now() }]`         | ✅      | ✅    | ✅    |
|                            | `<a id="epoch-1593024083666">`                       |        |      |      |
| `IDeref` attrib values (2) | `["div", { id: { deref() { return "foo"; }}}]`       | ✅      | ❌    | ✅    |
|                            | `<div id="foo">`                                     |        |      |      |

All other features not explicitly mentioned are supported by all three
packages.

(1) Excluding event listener attribs, these are always function values
of course, but will NOT be evaluated to obtain final attrib value

(2) The
[`IDeref`](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/deref.ts)
interface is implemented by various data structures in the
thi.ng/umbrella eco system (most relevant:
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream),
[@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom)).

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhiccup-html%5D+in%3Atitle)

The current aim is not necessarily to have wrappers for *each* possible
HTML5 element, but certainly to support the most commonly used ones. PRs
welcome!

### Related packages

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) - Lightweight, reactive, VDOM-less UI/DOM components with async lifecycle and [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) compatible
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)

## Installation

```bash
yarn add @thi.ng/hiccup-html
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/hiccup-html"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const hiccupHtml = await import("@thi.ng/hiccup-html");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.68 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                 | Description                                                                 | Live demo                                                 | Source                                                                                 |
|:---------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/big-font.png" width="240"/>            | Large ASCII font text generator using @thi.ng/rdom                          | [Demo](https://demo.thi.ng/umbrella/big-font/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/big-font)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/color-themes.png" width="240"/>        | Probabilistic color theme generator                                         | [Demo](https://demo.thi.ng/umbrella/color-themes/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/color-themes)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/>     | Color palette generation via dominant color extraction from uploaded images | [Demo](https://demo.thi.ng/umbrella/dominant-colors/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/>    | Parser grammar livecoding editor/playground & codegen                       | [Demo](https://demo.thi.ng/umbrella/parse-playground/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/>       | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel            | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-dnd.png" width="240"/>            | rdom drag & drop example                                                    | [Demo](https://demo.thi.ng/umbrella/rdom-dnd/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-dnd)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-lissajous.png" width="240"/>      | rdom & hiccup-canvas interop test                                           | [Demo](https://demo.thi.ng/umbrella/rdom-lissajous/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-lissajous)      |
|                                                                                                                            | Full umbrella repo doc string search w/ paginated results                   | [Demo](https://demo.thi.ng/umbrella/rdom-search-docs/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-search-docs)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-resample.png" width="240"/>        | SVG path parsing & dynamic resampling                                       | [Demo](https://demo.thi.ng/umbrella/svg-resample/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-resample)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-channel-mixer.jpg" width="240"/> | rdom & WebGL-based image channel editor                                     | [Demo](https://demo.thi.ng/umbrella/webgl-channel-mixer/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-channel-mixer) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/hiccup-html/)

```ts
import { div, label, option, select } from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";

const choices = [
    ["#f00", "Red"],
    ["#ff0", "Yellow"],
    ["#0f0", "Green"],
    ["#0ff", "Cyan"],
    ["#00f", "Blue"],
    ["#f0f", "Magenta"],
];

$compile(
    div(
        null,
        label({ for: "colors" }, "Fave color: "),
        select(
            {
                id: "colors",
                onchange: (e) => alert((<HTMLSelectElement>e.target).value),
            },
            option(null, "Please choose..."),
            ...choices.map((x) => option({ value: x[0] }, x[1]))
        )
    )
).mount(document.body);
```

### defElement

All element functions are created via the higher-order function `defElement`
which produces the typed, variadic factories. `defElement` takes an element name
and optional set of default attributes. It also uses generics to enforce types
for the element's attributes (default:
[`Attribs`](https://docs.thi.ng/umbrella/hiccup-html/interfaces/Attribs.html)
and/or children/body (default: `any`).

Define element with defaults:

```ts
import { defElement } from "@thi.ng/hiccup-html";

const el = defElement("tag")
```

Define with custom attribs & no children allowed:

```ts
import { Attribs, AttribVal, defElement } from "@thi.ng/hiccup-html";

// extend global HTML default attribs
interface MyAttribs extends Attribs {
    class: AttribVal<string>;
    width: AttribVal<number>;
    height: AttribVal<number>;
}

// provide type constraints and default attribs
const el = defElement<Partial<MyAttribs>, never>(
    "tag",
    { width: 100, height: 100 }
);

// or create new versions of existing elements with more limited
// user customization options...
const div = defElement<Partial<Pick<Attribs, "class" | "style">>>("div");
```

The `Attribs` interface provides a common, fully typed base definition
of HTML attributes (incl. event listeners and enumerated attrib options)
and can be found in
[api.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/api.ts#L126).

The `AttribVal` type wrapper is used to allow for reactive attribute
values (in
[@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom))
and [`IDeref`
instances](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/deref.ts)
when later providing attribute values to an element.

#### Element creation

The function returned by `defElement` has the [following
signatures](https://docs.thi.ng/umbrella/hiccup-html/modules.html#defElement):

```ts
(attribs?: Nullable<T>, ...body: B[]) => [string, Nullable<T>, ...B[]];

(emmet: string, attribs?: Nullable<T>, ...body: B[]) => [string, Nullable<T>, ...B[]];
```

The result of either form is a simple tuple, defining an HTML element in
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
syntax.

If the second call signature is used, the initial `emmet`-style string
will be appended to the tag name and merely acts as syntax sugar for
providing an element ID and/or CSS classes.

```ts
const el = defElement<any>("a");
```

| Call                              | Result                           |
|-----------------------------------|----------------------------------|
| `el()`                            | `["a", null]`                    |
| `el(null)`                        | `["a", null]`                    |
| `el(null, "body")`                | `["a", null, "body"]`            |
| `el({ c: 2 })`                    | `["a", { c: 2 }]`                |
| `el({ c: 2 }, "body")`            | `["a", { c: 2 }, "body"]`        |
| `el("#id.foo")`                   | `["a#id.foo", null]`             |
| `el("#id.foo", { c: 2 })`         | `["a#id.foo", { c: 2 }]`         |
| `el("#id.foo", { c: 2 }, "body")` | `["a#id.foo", { c: 2 }, "body"]` |
| `el("#id.foo", null, "body")`     | `["a#id.foo", null, "body"]`     |

```ts
// with default attribs
const el = defElement<any>("a", { b: 1 });
```

| Call                              | Result                                 |
|-----------------------------------|----------------------------------------|
| `el()`                            | `["a", { b: 1 }]`                      |
| `el(null)`                        | `["a", { b: 1 }]`                      |
| `el(null, "body")`                | `["a", { b: 1 }, "body"]`              |
| `el({ c: 2 })`                    | `["a", { b: 1, c: 2 }]`                |
| `el({ c: 2 }, "body")`            | `["a", { b: 1, c: 2 }, "body"]`        |
| `el("#id.foo")`                   | `["a#id.foo", { b: 1 }]`               |
| `el("#id.foo", { c: 2 })`         | `["a#id.foo", { b: 1, c: 2 }]`         |
| `el("#id.foo", { c: 2 }, "body")` | `["a#id.foo", { b: 1, c: 2 }, "body"]` |
| `el("#id.foo", null, "body")`     | `["a#id.foo", { b: 1 }, "body"]`       |

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hiccup-html,
  title = "@thi.ng/hiccup-html",
  author = "Karsten Schmidt",
  note = "https://thi.ng/hiccup-html",
  year = 2020
}
```

## License

&copy; 2020 - 2022 Karsten Schmidt // Apache Software License 2.0
