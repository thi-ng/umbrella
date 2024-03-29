# Markdown parser demo

This example is showcasing some features of the Markdown parser of
[@thi.ng/hiccup-markdown][pkghome] package. Depending on device, the right or
bottom half is showing a realtime preview of the source document in the other
half.

![screenshot of markdown editor w/ preview](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/markdown-parser.jpg "screenshot")

[Live demo](https://demo.thi.ng/umbrella/markdown/) |
[Source code](https://github.com/thi-ng/umbrella/tree/develop/examples/markdown)

## Syntax features & extensions

### Blockquotes

Nested blockquotes are supported and can contain links, images and inline
formatting, but not other block elements (e.g. lists):

> Nesting is supported:
>> "To understand recursion, one must **first** understand recursion."
>> — Stephen Hawking
>
> Images in blockquotes are ok too:\
> ![foo](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/zcurve2d-small.gif)
>
> etc.

### Code block headers

Code blocks can have additional space-separated fields in the header which are
being passed to the tag handler (but which we ignore here in this example):

```ts tangle:yes export:no
// clever code here
```

### Custom blocks

This is a non-standard Markdown syntax extension for custom freeform content:

:::info Custom block example
In this example we're parsing the contents of these custom blocks
as _Markdown_ itself, but the overall idea is to enable all sorts
of additional "rich" content (UI components, visualizations, media
players etc.)
:::

:::warn Custom block example
Each block has its own `type` (the 1st word in the block header).
The example handler only supports `info` or `warn` types...
:::

### Emoji names

The familiar `:emoji_name:` syntax can be used to include emojis in body text.
We're using from [thi.ng/emoji](https://thi.ng/emoji) for look ups (source data
from [node-emoji](https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json)).
Kewl! :sunglasses:

### Footnotes

Footnotes are supported, but this statement might need some further
explanation[^1].

#### Formatting

To avoid ambiguity and simplify nesting, only the following formatting syntax is
supported for bold & italic:

- `**bold**`
- `_italic_`
- `code` (\`) and ~~strikethrough~~ (`~~`) as usual...
- `<kbd>` for keyboard shortcuts (e.g. <kbd>Control</kbd>)
- `<sub>` for <sub>subscript</sub>
- `<sup>` for <sup>superscript</sup>

### Headings {#custom-header-id}

Only ATX-style headings (aka lines prefixed with `#`) are supported (levels
1-6). The parser supports `{#custom-id}`-style line suffixes for headings, which
are passed as separate `anchorID` param to the element handlers. If not
specified in the Markdown source, the parser auto-generates this ID (with no
uniqueness guarantee) based on
[slugifying](https://docs.thi.ng/umbrella/strings/functions/slugifyGH.html) the
heading's body content (Github readme compatible).

For example, here is a [link to this section](#custom-header-id) (using ID
`#custom-header-id`).

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

### Blocklevel metadata

Arbitrary metadata can be assigned to any blocklevel element:

- blockquotes
- code blocks
- custom blocks
- headings
- horizontal rules
- lists
- paragraphs
- tables

See the package readme for more details. Here's an example of metadata assigned
to a headline:

{{{ some freeform metadata }}}
#### Amazing example headline title

...and another one with a custom block:

{{{
date=2023-02-25
status=done
}}}
:::foo Example block title
Just checkout that metadata...
:::

### Tables

|    Cells in...    | header are treated separately                                                                  |
|:-----------------:|------------------------------------------------------------------------------------------------|
| Column alignments | :white_check_mark: supported                                                                   |
|  Inline formats   | :white_check_mark: _supported and **nestable**_                                                |
|      Images       | ![C-SCAPE](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/cellular/hero.png) |
|       Links       | :white_check_mark: [supported](#links)                                                         |
|                   |                                                                                                |
|    Unsupported    | :x: linebreaks                                                                                 |
|                   | :x: lists                                                                                      |
|                   | :x: blockquotes                                                                                |

## Onwards!

Please see the [package
readme](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup-markdown/README.md)
& [API docs](https://docs.thi.ng/umbrella/hiccup-markdown/) for further details.
If you've got any questions, please use the [thi.ng/umbrella discussion
forum](https://github.com/thi-ng/umbrella/discussions) or [issue
tracker](https://github.com/thi-ng/umbrella/issues)...

---

[pkghome]: https://thi.ng/hiccup-markdown "package homepage"

[^1]: ...or does it really?! :wink:
