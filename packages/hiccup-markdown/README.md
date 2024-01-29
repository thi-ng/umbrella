<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/hiccup-markdown](https://media.thi.ng/umbrella/banners-20230807/thing-hiccup-markdown.svg?10b18e65)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hiccup-markdown.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-markdown)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hiccup-markdown.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Parser](#parser)
  - [Basic features](#basic-features)
  - [Additional syntax & parser features/restrictions](#additional-syntax--parser-featuresrestrictions)
    - [Code blocks](#code-blocks)
    - [Custom blocks](#custom-blocks)
    - [Escaping control characters](#escaping-control-characters)
    - [Formatting](#formatting)
    - [Headings with anchor IDs](#headings-with-anchor-ids)
- [Heading with anchor {#custom-id-123}](#heading-with-anchor-custom-id-123)
  - [Images](#images)
  - [Link formats](#link-formats)
  - [Lists](#lists)
    - [Metadata](#metadata)
  - [Customizing tag transforms](#customizing-tag-transforms)
  - [Serializing to HTML](#serializing-to-html)
- [Serializer (Hiccup to Markdown)](#serializer-hiccup-to-markdown)
  - [Features](#features)
  - [Behaviors](#behaviors)
  - [Usage examples](#usage-examples)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Markdown parser & serializer from/to Hiccup format. This is a support package for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup).

**⚠️ IMPORTANT: With v3.0.0 the parser implementation underwent a complete
rewrite (with breaking changes, but lots of improvements). ⚠️**

This package provides both a customizable
[Markdown](https://en.wikipedia.org/wiki/Markdown)-to-[Hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
parser and an extensible Hiccup-to-Markdown converter.

## Parser

Sadly, none of the available Markdown flavors have ever been designed with much
consistency and/or ease-of-implementation/parsing aspects in mind. The result is
a proliferation of Markdown-ish flavors, even though there've been attempts to
standardize the syntax.

### Basic features

The parser provided here is _not_ aimed at supporting **all** of Markdown's (or
CommonMark's) quirky syntax features, but restricts itself to a large _sane
subset_ of features and some useful [additional
features](#additional-syntax--parser-featuresrestrictions) not part of the
standard/common syntax.

| Feature       | Comments                                                                                                                |
|---------------|-------------------------------------------------------------------------------------------------------------------------|
| Blockquotes   | Nestable, support for inline formatting and forced line breaks (trailing backslash)                                     |
| Code blocks   | GFM style only (triple backtick prefix), w/ mandatory language hint & optional extra headers information                |
| Escaping      | Uniformly escape MD control characters via backslash, e.g. `\*`                                                         |
| Formatting    | Nestable inline formats supported in paragraphs, headings, link labels, lists, blockquotes, tables:                     |
|               | **bold**, _italic_, `code`, ~~strike~~                                                                                  |
|               | <kbd>Key</kbd>, <sub>subscript</sub> and <sup>super</sup>                                                               |
| Footnotes     | Supported and stored separately in parse context for further processing                                                 |
| Headings      | ATX-style only (`#` line prefix), optional anchor ID (via `{#custom-id}` suffix), levels 1-6 then fallback to paragraph |
| Horiz. Rulers | Only dash supported (e.g. `---`), min 3 chars required, length retained for downstream transformations                  |
| HTML elements | Only `<kbd>`, `<sub>` `<sup>`                                                                                           |
| Images        | Alt text is required, image can be used in link labels, optional title suffix                                           |
| Links         | Supports `[label](target)`, `[label][ref]`, `[[page id]]` or `[[page id\|label]]` style links, inline formats in label  |
| Lists         | Ordered & unordered, nestable, inline formatting, line breaks, GFM todo list items                                      |
| Paragraphs    | Support for forced line breaks (trailing backslash)                                                                     |
| Tables        | Support for column alignments, nestable inline formatting (no nested block elements)                                    |

**Please visit the [interactive Markdown parser/editor
playground](https://demo.thi.ng/umbrella/markdown/) for further
details/examples...**

### Additional syntax & parser features/restrictions

#### Code blocks

In addition to the **mandatory language hint**, code blocks support optional
user defined headers/metadata. Items will be separated by spaces (e.g. see
[@thi.ng/tangle](https://github.com/thi-ng/umbrella/tree/develop/packages/tangle)
for concrete use cases).

(Note: the GFM codeblock fences are only shown escaped here to avoid GH
layout breakage)

```text
\`\`\`language extra=data even=more
// code...
\`\`\`
```

#### Custom blocks

Since the parser does not directly transform Markdown into HTML, blocks of
custom freeform content can be used to define arbitrary data structures (e.g. UI
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
custom blocks (in an easily extensible manner).

#### Escaping control characters

Unlike the weird & hard-to-memorize escape rules in "standard" Markdown, here
we're taking a more uniform approach of exclusively using backslash escapes
(e.g. `\*`) to ensure various Markdown control characters are used verbatim.
Only the following minor exceptions apply:

1. In inline code sections only backticks (`\``) need to be escaped and
   backslashes _can_ be escaped. All others chars are used as is.
2. In fenced code blocks only backticks can be escaped (e.g. if escaping the
   triple-backtick block fence itself). Backslashes and others chars are used as is.
3. In custom blocks only colons (`:`) can be escaped (e.g. if escaping the
   triple-colon block fence itself). All other chars are used as is.
4. In metadata blocks only `}` can be escaped. All other chars are used as is.

#### Formatting

To avoid ambiguity and simplify nesting, only the following formatting syntax is
supported for bold & italic:

- `**bold**`
- `_italic_`
- `code` (\`) and ~~strikethrough~~ (`~~`) as usual...
- `<kbd>` for keyboard shortcuts (e.g. <kbd>Control</kbd>)
- `<sub>` for <sub>subscript</sub>
- `<sup>` for <sup>superscript</sup>

#### Headings with anchor IDs

The parser supports `{#custom-id}`-style line suffixes for headings, which are
passed as separate `anchorID` param to the element handlers. If not specified in
the Markdown source, the parser auto-generates this ID (with no uniqueness
guarantee) based on
[slugifying](https://docs.thi.ng/umbrella/strings/functions/slugifyGH.html) the
heading's body content (Github readme compatible):

```text
# The **beautiful `code`**

## Heading with anchor {#custom-id-123}
```

Results in:

```js
// [
//   [
//     "h1",
//     { id: "the-beautiful-code" },
//     "The ",
//     [ "strong", {}, "beautiful ", [ "code", {}, "code" ] ]
//   ],
//   [ "h2", { id: "custom-id-123" }, "Heading with anchor" ]
// ]
```

### Images

**Alt text for images is required**. Optional `title` attribute (e.g. for hover
tooltip or caption) can be given in quotes after the image URL. For example:

```markdown
![alt text](url "title text")
```

### Link formats

The following link formats are supported:

1. `[label](target)`
2. `[label](target "title")`
3. `[label][ref-id]` - the reference ID will have to provided somewhere else in
   the document or pre-defined via options given to the parser
4. `[[page name]]` - Wiki-style page reference, non-standard Markdown
5. `[[page name|label]]` - like 4., but with added link label

### Lists

- Ordered and unordered lists are supported
  - Fully nestable
- Ordered lists start with a `1.` (digit or letter followed by a dot) prefix
- Unordered lists **must** use a `-` line prefix
- [ ] TODO list items
  - [x] ...are supported as well

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
{{{
    {
        "task:status": "waiting-on",
        "task:due": "2023-02-28"
    }
}}}
# Chapter 3
```

```js
parse(src, { tags: { meta: (_, body) => JSON.parse(body) }}).result
// [
//   [
//     "h1",
//     { id: "chapter-3", __meta: { "task:status": "waiting-on", "task:due": "2023-02-28" } },
//     "Chapter 3"
//   ]
// ]
```

### Customizing tag transforms

The
[`TagTransforms`](https://docs.thi.ng/umbrella/hiccup-markdown/interfaces/TagTransforms.html)
interface defines transformation functions for all supported elements and can be
used to completely customize the parser's result data. User implementations can
be given to the `parse()` function to selectively customize/override
defaults/outputs.

Example with custom link elements:

```ts
const tags: Partial<TagTransforms> = {
    link: (ctx, href, body) => ["a.link.blue", { href }, ...body]
};

// parse with custom tag transform overrides
parse("[label](url)", { tags }).result;
// [
//   ["p", {}, ["a.link.blue", { href: "url" }, "label"]]
// ]
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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhiccup-markdown%5D+in%3Atitle)

## Related packages

- [@thi.ng/markdown-table](https://github.com/thi-ng/umbrella/tree/develop/packages/markdown-table) - Markdown table formatter/generator with support for column alignments

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

Package sizes (brotli'd, pre-treeshake): ESM: 4.62 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/emoji](https://github.com/thi-ng/umbrella/tree/develop/packages/emoji)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/parse](https://github.com/thi-ng/umbrella/tree/develop/packages/parse)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/text-canvas](https://github.com/thi-ng/umbrella/tree/develop/packages/text-canvas)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                             | Description                                                        | Live demo                                            | Source                                                                            |
|:-----------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------|:-----------------------------------------------------|:----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/markdown-parser.jpg" width="240"/> | Markdown to Hiccup to HTML parser / transformer                    | [Demo](https://demo.thi.ng/umbrella/markdown/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/markdown)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/related-images.jpg" width="240"/>  | Responsive image gallery with tag-based Jaccard similarity ranking | [Demo](https://demo.thi.ng/umbrella/related-images/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/related-images) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/hiccup-markdown/)

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

&copy; 2018 - 2024 Karsten Schmidt // Apache License 2.0
