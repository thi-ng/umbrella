<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/hiccup-markdown](https://media.thi.ng/umbrella/banners-20220914/thing-hiccup-markdown.svg?10b18e65)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-markdown.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-markdown)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-markdown.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Parser](#parser)
  - [Basic features](#basic-features)
  - [Additional syntax & parser features](#additional-syntax--parser-features)
    - [Custom blocks](#custom-blocks)
    - [Metadata](#metadata)
  - [Customizing tag transforms](#customizing-tag-transforms)
  - [Serializing to HTML](#serializing-to-html)
- [Serializer (Hiccup to Markdown)](#serializer-hiccup-to-markdown)
  - [Features](#features)
  - [Behaviors](#behaviors)
  - [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

## About

Markdown parser & serializer from/to Hiccup format. This is a support package for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup).

**⚠️ IMPORTANT: The parser implementation is undergoing a complete rewrite at
the moment (with lots of improvements) and the information shown here in this
readme _might_ be incomplete and/or out of date for the next few days. ⚠️**

This package provides both a customizable
[Markdown](https://en.wikipedia.org/wiki/Markdown)-to-[Hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
parser and an extensible Hiccup-to-Markdown converter.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhiccup-markdown%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/hiccup-markdown
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/hiccup-markdown"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const hiccupMarkdown = await import("@thi.ng/hiccup-markdown");
```

Package sizes (brotli'd, pre-treeshake): ESM: 4.05 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/develop/packages/compose)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/emoji](https://github.com/thi-ng/umbrella/tree/develop/packages/emoji)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/parse](https://github.com/thi-ng/umbrella/tree/develop/packages/parse)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/text-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/text-canvas)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                             | Description                                             | Live demo                                      | Source                                                                      |
|:-----------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|:-----------------------------------------------|:----------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/markdown-parser.jpg" width="240"/> | Minimal Markdown to Hiccup to HTML parser / transformer | [Demo](https://demo.thi.ng/umbrella/markdown/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/markdown) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/hiccup-markdown/)

## Parser

### Basic features

The parser itself is not aimed at supporting **all** of Markdown's
(CommonMark's) quirky syntax features, but restricts itself to a sane subset of
features and some useful [additional
features](#additional-syntax--parser-features) not part of the standard syntax.

| Feature       | Comments                                                                                                                    |
|---------------|-----------------------------------------------------------------------------------------------------------------------------|
| Code blocks   | GFM style only (triple backtick prefix), w/ optional language hint & extra header information                               |
| Formatting    | Nestable **bold**, _italic_, `code`, ~~strike~~, supported in paragraphs, headings, link labels, lists, blockquotes, tables |
| Footnotes     | Supported and stored separately in parse context                                                                            |
| Headings      | ATX-style only (`#` line prefix), any level                                                                                 |
| Horiz. Rulers | Only dash supported (e.g. `---`), min 2 chars required, length retained for downstream transformations                      |
| Images        | Alt text is required, image can be used in link labels                                                                      |
| Links         | Supports `[label](target)`, `[label][ref]`, `[[page id]]` or `[[page id|label]]` style links, inline formats in label       |
| Lists         | Ordered & unordered, nestable, inline formatting, line breaks, GFM task list items                                          |
| Paragraphs    | Support for forced line breaks (trailing `\`)                                                                               |
| Tables        | Support for column alignments, nestable inline formatting                                                                   |

### Additional syntax & parser features

#### Custom blocks

Since the parser does not directly transform Markdown into HTML, blocks of custom
freeform content can be used to define arbitrary data structures (e.g. UI
components, diagrams/visualizations etc.). Similarly to code blocks, custom
blocks are wrapped with `:::` and a type specifier:

```text
:::csv some=optional extra=data
city,lat,lon
berlin,52.5167,13.3833
new york,40.6943,-73.9249
tokyo,35.6897,139.6922
:::
```

How such a custom block is transformed is entirely down to the user provided tag
transformer. The default handler merely creates an element like this:

```js
[
  "custom",
  { type: "csv", __head: [ "some=optional", "extra=data" ] },
  "city,lat,lon\nberlin,52.5167,13.3833\nnew york,40.6943,-73.9249\ntokyo,35.6897,139.6922"
]
```

**Tip:** Use a
[`defmulti()`](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
polymorphic function as tag transformer to elegantly handle multiple types of
custom blocks (in an extensible manner).

#### Metadata

Arbitrary metadata can be assigned to _any_ block level element:

- code blocks
- custom blocks
- footnotes
- headings
- lists
- paragraphs
- tables

This metadata is given within a block element itself which must directly precede
the target element (no empty lines in between). A custom tag handler can be
defined to transform that metadata before it's being handed to the target's tag
handler.

```text
{{{ Hello metadata }}}
- item 1
- item 2
```

Using the default tag handlers, this snippet will translate to:

```js
[
  "ul",
  { __meta: "Hello metadata" },
  [ "li", {}, "item 1" ],
  [ "li", {}, "item 2" ]
]
```

Using structured data as body of these metadata blocks is more powerful and (as
mentioned above) can be dealt with using a custom tag handler, e.g. here we
interpret the body as JSON:

```text
{{{ {"task:status": "waiting-on", "task:due": "2023-02-28"} }}}
# Chapter 3
```

```js
parse(src, { tags: { meta: (_, body) => JSON.parse(body) }}).result
[
  [
    "h1",
    { id: "chapter-3", __meta: { "task:status": "waiting-on", "task:due": "2023-02-28" } },
    "Chapter 3"
  ]
]
```

### Customizing tag transforms

The
[`TagTransforms`](https://docs.thi.ng/umbrella/hiccup-markdown/interfaces/TagTransforms.html)
interface defines functions for all supported elements. User implementations /
overrides can be given to the `parse()` function to customize output.

Example with custom link elements:

```ts
const tags: Partial<TagTransforms> = {
    link: (ctx, href, body) => ["a.link.blue", { href }, ...body]
};

// using the same markdown `src` as earlier example
serialize(parse(src, { tags }).result);

// <h1 id="hello-world">Hello world</h1>
// <p><a href="http://example.com" class="link blue">This is a <em>test</em></a> 😄</p>
```

### Serializing to HTML

```ts
import { serialize } from "@thi.ng/hiccup";
import { parse } from "@thi.ng/hiccup-markdown";

const src = `# Hello world\n[This is a _test_](http://example.com) :smile:`;

// convert to hiccup tree
parse(src).result
// [
//   [ "h1", { id: "hello-world" }, "Hello world" ],
//   [
//     "p",
//     {},
//     [
//       "a",
//       { href: "http://example.com" },
//       "This is a ",
//       [ "em", {}, "test" ]
//     ],
//     " ",
//     "😄"
//   ]
// ]

// or serialize to HTML
serialize(parse(src).result);
// <h1 id="hello-world">Hello world</h1><p><a href="http://example.com">This is a <em>test</em></a> 😄</p>
```

## Serializer (Hiccup to Markdown)

For the reverse operation, the `serialize()` function can be used to
convert an hiccup component tree into Markdown. Currently supports most
standard (applicable) Markdown features:

### Features

- ATX-style headings (level 1-6)
- Paragraphs
- Forced line breaks
- Inline styles: strong, italic, code
- Images (w/ optional alt attrib)
- Links, image links
- Code blocks w/ language hint (GFM output)
- Tables
- Blockquotes
- Nested lists (ordered & unordered)
- Horizontal rule / separator
- Inline HTML

Not (yet) supported:

- Nested blockquotes
- Link refs
- Wordwrapped output

### Behaviors

- Unless needed for serialization, all other hiccup element attribs are
  ignored
- Code blocks are always output in GFM flavor w/ optional language hint
  (via `lang` attrib)
- Images use the optional `alt` attrib as label
- Forced line breaks are realized via `["br"]` elements in the hiccup
  tree
- Headings, blockquotes, list items and link labels can contain inline
  formatting

Also, other element types can be supported by adding a new tag specific
implementation to the exported `serializeElement`
[multi-method](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti).
See source code for reference.

### Usage examples

```ts
import { serialize } from "@thi.ng/hiccup-markdown";

// list component
// the 1st arg is the optional user context object
// passed to `serialize()` (ignored here)
// the 2nd arg is the list tag (ul/ol)
// rest args are converted to list items
const list = (_, type, ...xs) =>
    [type, ...xs.map((x) => Array.isArray(x) ? x : ["li", x])];

// code block component w/ lang hint
const codeblock = (_, lang, body) =>
    ["pre", { lang }, ["code", body]];

// link component for thi.ng URLs
const thingLink = (_, id, label) =>
    ["a", { href: `http://thi.ng/${id}` }, label];

// Note: the same hiccup tree can be serialized to HTML via @thi.ng/hiccup or
// used interactively in the browser w/ @thi.ng/hdom
serialize(
    ["div",
        ["h1", "Hello Markdown"],
        ["p",
            "This is a test: ",
            ["strong", "I am strong and ", ["em", "italic"]],
            "..."],
        // anon component fn to demo context lookup
        [(ctx) => ["p", `My magic number is: ${ctx.magic}`]],
        // codeblock w/ language hint
        [codeblock, "ts",
            `import { serialize } from "@thi.ng/hiccup-markdown";`],
        // nested lists
        [list, "ul",
            "foo",
            "bar",
            [list, "ol", "b1", "b2", "b3"],
            "baz"],
        ["blockquote",
            "So long and thanks for all the fish."],
        ["table",
            ["caption", ["em", "Table #1"]],
            ["thead",
                ["tr", ["th", "ID"], ["th", "Name"]]],
            ["tbody",
                ["tr", ["td", 1], ["td", "Alice B. Charles"]],
                ["tr", ["td", 2], ["td", "Bart Simpson"]]]],
        ["p",
            "More info ",
            [thingLink, "hiccup-markdown", "here"], "."]],
    // optional context object passed to all component functions
    { magic: 42 }
)
```

Resulting Markdown:

(Note: the GFM codeblock fences are only shown escaped here to avoid GH
layout breakage)

```md
# Hello Markdown

This is a test: **I am strong and _italic_**...

My magic number is: 42

\`\`\`ts
import { serialize } from "@thi.ng/hiccup-markdown";
\`\`\`

- foo
- bar
    1. b1
    2. b2
    3. b3
- baz

> So long and thanks for all the fish.

| **ID** | **Name**         |
|--------|------------------|
| 1      | Alice B. Charles |
| 2      | Bart Simpson     |

_Table #1_

More info [here](http://thi.ng/hiccup-markdown).
```

Realized result:

---

# Hello Markdown <!-- NOTOC -->

This is a test: **I am strong and _italic_**...

My magic number is: 42

```ts
import { serialize } from "@thi.ng/hiccup-markdown";
```

- foo
- bar
    1. b1
    2. b2
    3. b3
- baz

> So long and thanks for all the fish.

| **ID** | **Name**         |
|--------|------------------|
| 1      | Alice B. Charles |
| 2      | Bart Simpson     |

_Table #1_

More info [here](http://thi.ng/hiccup-markdown).

---

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hiccup-markdown,
  title = "@thi.ng/hiccup-markdown",
  author = "Karsten Schmidt",
  note = "https://thi.ng/hiccup-markdown",
  year = 2018
}
```

## License

&copy; 2018 - 2023 Karsten Schmidt // Apache License 2.0
