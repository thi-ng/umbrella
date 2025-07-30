<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/hiccup-html](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-hiccup-html.svg?99483872)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-html.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-html)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-html.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Supported elements](#supported-elements)
    - [Block content](#block-content)
    - [Forms / inputs](#forms--inputs)
    - [Head / metadata](#head--metadata)
    - [Inline](#inline)
    - [Lists](#lists)
    - [Media](#media)
    - [Sections](#sections)
    - [Tables](#tables)
  - [Compatibility](#compatibility)
- [Status](#status)
- [Support packages](#support-packages)
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

The following type-checked factory functions are provided **so far** and in most
cases include specialized type definitions for element-specific attributes,
incl. enumerated attrib values (where applicable/useful) and 420+ CSS property
names (for use with the `style` attrib). See type definitions in
[api.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/api.ts)
and [`defElement()`](#defelement) below for more details.

### Supported elements

#### Block content

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/blocks.ts)

- `blockquote`
- `details`
- `dialog`
- `div`
- `figcaption`
- `figure`
- `hr`
- `iframe`
- `para`
- `pre`
- `slot`
- `summary`
- `template`

#### Forms / inputs

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/forms.ts)

- `button`
- `checkbox`
- `fieldset`
- `form`
- `inputColor`
- `inputFile`
- `inputNumber`
- `inputPass`
- `inputRange`
- `inputReset`
- `inputSearch`
- `inputSubmit`
- `inputText`
- `label`
- `legend`
- `meter`
- `optGroup`
- `option`
- `output`
- `progress`
- `radio`
- `select`
- `textArea`

#### Head / metadata

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/head.ts)

- `base`
- `head`
- `link`
- `linkCSS`
- `meta`
- `metaReferrer`
- `metaRefresh`
- `metaRobots`
- `metaUTF8`
- `metaViewport`
- `metaXUA`
- `script`
- `style`
- `title`

#### Inline

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/inline.ts)

- `abbr`
- `anchor`
- `br`
- `cite`
- `code`
- `data`
- `del`
- `dfn`
- `em`
- `i`
- `ins`
- `kbd`
- `mark`
- `quote`
- `small`
- `span`
- `strikethrough`
- `strong`
- `sub`
- `sup`
- `time`
- `variable`
- `wbr`

#### Lists

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/lists.ts)

- `datalist`
- `dd`
- `dl`
- `dt`
- `li`
- `menu`
- `ol`
- `ul`

#### Media

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/media.ts)

- `audio`
- `canvas`
- `img`
- `object`
- `picture`
- `source`
- `track`
- `video`

#### Sections

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/sections.ts)

- `address`
- `article`
- `aside`
- `body`
- `comment`
- `footer`
- `h1`
- `h2`
- `h3`
- `h4`
- `h5`
- `h6`
- `header`
- `hgroup`
- `html`
- `main`
- `nav`
- `noscript`
- `search`
- `section`

#### Tables

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html/src/table.ts)

- `caption`
- `col`
- `colgroup`
- `table`
- `tbody`
- `td`
- `tfoot`
- `th`
- `thead`
- `tr`

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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhiccup-html%5D+in%3Atitle)

The current aim is not necessarily to have wrappers for *each* possible
HTML5 element, but certainly to support the most commonly used ones. PRs
welcome!

## Support packages

- [@thi.ng/hiccup-html-parse](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-html-parse) - Well-formed HTML parsing and customizable transformation to nested JS arrays in [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) format

## Related packages

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) - Lightweight, reactive, VDOM-less UI/DOM components with async lifecycle and [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) compatible
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & related tooling

## Installation

```bash
yarn add @thi.ng/hiccup-html
```

ESM import:

```ts
import * as html from "@thi.ng/hiccup-html";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/hiccup-html"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

Package sizes (brotli'd, pre-treeshake): ESM: 1.63 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

33 projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                  | Description                                                                                             | Live demo                                                 | Source                                                                                 |
|:----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/big-font.png" width="240"/>             | Large ASCII font text generator using @thi.ng/rdom                                                      | [Demo](https://demo.thi.ng/umbrella/big-font/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/big-font)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/bitmap-font.gif" width="240"/>          | Figlet-style bitmap font creation with transducers                                                      | [Demo](https://demo.thi.ng/umbrella/bitmap-font/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/bitmap-font)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/blurhash.jpg" width="240"/>             | Interactive & reactive image blurhash generator                                                         | [Demo](https://demo.thi.ng/umbrella/blurhash/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/blurhash)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/canvas-recorder.png" width="240"/>      | Self-modifying, animated typographic grid with emergent complex patterns                                | [Demo](https://demo.thi.ng/umbrella/canvas-recorder/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/canvas-recorder)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/color-contrast.avif" width="240"/>      | Tool to interactively compute & visualize color contrasts against WCAG threshold                        | [Demo](https://demo.thi.ng/umbrella/color-contrast/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/color-contrast)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/color-themes.png" width="240"/>         | Probabilistic color theme generator                                                                     | [Demo](https://demo.thi.ng/umbrella/color-themes/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/color-themes)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/csp-bus.png" width="240"/>              | CSP channel-based event handling, async transducers & reactive UI components                            | [Demo](https://demo.thi.ng/umbrella/csp-bus/)             | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/csp-bus)             |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/>      | Color palette generation via dominant color extraction from uploaded images                             | [Demo](https://demo.thi.ng/umbrella/dominant-colors/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/layout-gridgen.png" width="240"/>       | Randomized space-filling, nested grid layout generator                                                  | [Demo](https://demo.thi.ng/umbrella/layout-gridgen/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/layout-gridgen)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/lispy-repl.png" width="240"/>           | Browser REPL for a Lispy S-expression based mini language                                               | [Demo](https://demo.thi.ng/umbrella/lispy-repl/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/lispy-repl)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mastodon-feed.jpg" width="240"/>        | Mastodon API feed reader with support for different media types, fullscreen media modal, HTML rewriting | [Demo](https://demo.thi.ng/umbrella/mastodon-feed/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mastodon-feed)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/meta-css-basics.png" width="240"/>      | Basic thi.ng/meta-css usage & testbed                                                                   | [Demo](https://demo.thi.ng/umbrella/meta-css-basics/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/meta-css-basics)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/parse-playground.png" width="240"/>     | Parser grammar livecoding editor/playground & codegen                                                   | [Demo](https://demo.thi.ng/umbrella/parse-playground/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/parse-playground)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-gradients.jpg" width="240"/>      | Randomized 4-point 2D color gradient image generator                                                    | [Demo](https://demo.thi.ng/umbrella/pixel-gradients/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-gradients)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-sorting.png" width="240"/>        | Interactive pixel sorting tool using thi.ng/color & thi.ng/pixel                                        | [Demo](https://demo.thi.ng/umbrella/pixel-sorting/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-sorting)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-waveform.jpg" width="240"/>       | RGB waveform image analysis                                                                             | [Demo](https://demo.thi.ng/umbrella/pixel-waveform/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-waveform)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/procedural-text.jpg" width="240"/>      | Procedural stochastic text generation via custom DSL, parse grammar & AST transformation                | [Demo](https://demo.thi.ng/umbrella/procedural-text/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/procedural-text)     |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-dnd.png" width="240"/>             | rdom drag & drop example                                                                                | [Demo](https://demo.thi.ng/umbrella/rdom-dnd/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-dnd)            |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-formgen.jpg" width="240"/>         | Basic usage of the declarative rdom-forms generator                                                     | [Demo](https://demo.thi.ng/umbrella/rdom-formgen/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-formgen)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-key-sequences.jpg" width="240"/>   | rstream & transducer-based FSM for converting key event sequences into high-level commands              | [Demo](https://demo.thi.ng/umbrella/rdom-key-sequences/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-key-sequences)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-lissajous.png" width="240"/>       | rdom & hiccup-canvas interop test                                                                       | [Demo](https://demo.thi.ng/umbrella/rdom-lissajous/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-lissajous)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-router.jpg" width="240"/>          | Basic thi.ng/router usage with thi.ng/rdom components                                                   | [Demo](https://demo.thi.ng/umbrella/rdom-router/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-router)         |
|                                                                                                                             | Full umbrella repo doc string search w/ paginated results                                               | [Demo](https://demo.thi.ng/umbrella/rdom-search-docs/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-search-docs)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-web-components.png" width="240"/>  | Defining & using basic Web Components (with shadow DOM) via @thi.ng/rdom & @thi.ng/meta-css             | [Demo](https://demo.thi.ng/umbrella/rdom-web-components/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-web-components) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/related-images.jpg" width="240"/>       | Responsive image gallery with tag-based Jaccard similarity ranking                                      | [Demo](https://demo.thi.ng/umbrella/related-images/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/related-images)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/render-audio.png" width="240"/>         | Generative audio synth offline renderer and WAV file export                                             | [Demo](https://demo.thi.ng/umbrella/render-audio/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/render-audio)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-system-bus.png" width="240"/>   | Declarative component-based system with central rstream-based pubsub event bus                          | [Demo](https://demo.thi.ng/umbrella/rstream-system-bus/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-system-bus)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/stacked-layout.png" width="240"/>       | Responsive & reactively computed stacked column layout                                                  | [Demo](https://demo.thi.ng/umbrella/stacked-layout/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/stacked-layout)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/svg-resample.png" width="240"/>         | SVG path parsing & dynamic resampling                                                                   | [Demo](https://demo.thi.ng/umbrella/svg-resample/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/svg-resample)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/thing-browser.avif" width="240"/>       | Tree-based UI to find & explore thi.ng projects via their associated keywords                           | [Demo](https://demo.thi.ng/umbrella/thing-browser/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/thing-browser)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/thing-packages-quiz.avif" width="240"/> | thi.ng/rdom & thi.ng/rstream based quiz to guess thi.ng package names                                   | [Demo](https://demo.thi.ng/umbrella/thing-packages-quiz/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/thing-packages-quiz) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/trace-bitmap.jpg" width="240"/>         | Multi-layer vectorization & dithering of bitmap images                                                  | [Demo](https://demo.thi.ng/umbrella/trace-bitmap/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/trace-bitmap)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-channel-mixer.jpg" width="240"/>  | rdom & WebGL-based image channel editor                                                                 | [Demo](https://demo.thi.ng/umbrella/webgl-channel-mixer/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-channel-mixer) |

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
signatures](https://docs.thi.ng/umbrella/hiccup-html/functions/defElement.html):

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
import { defElement } from "@thi.ng/hiccup-html";

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
import { defElement } from "@thi.ng/hiccup-html";

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

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2020 - 2025 Karsten Schmidt // Apache License 2.0
