# Minimal Markdown parser

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/markdown-parser.jpg)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

This example is a test environment for the new & minimal
[Markdown](https://en.wikipedia.org/wiki/Markdown) parser & converter to
[hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
format from the
[@thi.ng/hiccup-markdown](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-markdown)
package.

The rest of this file is an excerpt of the relevant parts of that
package's `README.md`...

### Features

The parser itself is not aimed at supporting **all** of Markdown's
quirky syntax features, but will restrict itself to a sane subset of
features and already sports:

| Feature     | Comments                                                                                            |
|-------------|-----------------------------------------------------------------------------------------------------|
| Heading     | ATX only (`#` line prefix), levels 1-6, then downgrade to paragraph                                 |
| Paragraph   | no support for `\` line breaks                                                                      |
| Blockquote  | Respects newlines                                                                                   |
| Format      | **bold**, _emphasis_, `code`, ~~strikethrough~~ in paragraphs, headings, lists, blockquotes, tables |
| Link        | no support for inline formats in label                                                              |
| Image       | no image links                                                                                      |
| List        | only unordered (`- ` line prefix), no nesting, supports line breaks                                 |
| Table       | no support for column alignment                                                                     |
| Code block  | GFM only (triple backtick prefix), w/ optional language hint                                        |
| Horiz. Rule | only dash supported (e.g. `---`), min 3 chars required                                              |

**Note: Because of MD's line break handling and the fact the parser only
consumes single characters from an iterable without knowledge of further
values, the last heading, paragraph, blockquote, list or table requires
an additional newline.**

### Limitations

These MD features (and probably many more) are **not** supported:

- inline HTML
- nested inline formats (e.g. **bold** inside _italic_)
- inline formats within link labels
- image links
- footnotes
- link references
- nested / ordered / numbered / todo lists

Some of these are considered, though currently not high priority...

> "Weeks of coding can **save hours** of planning."
> -- Anonymous

### Other features

- **Functional:** parser entirely built using
  [transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
  (specifically those defined in
  [@thi.ng/fsm](https://github.com/thi-ng/umbrella/tree/develop/packages/fsm))
  & function composition. Use the parser in a transducer pipeline to
  easily apply post-processing of the emitted results
- **Declarative:** parsing rules defined declaratively with only minimal
  state/context handling needed
- **No regex:** consumes input character-wise and produces an iterator
  of hiccup-style tree nodes, ready to be used with
  [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom),
  [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
  or the serializer of this package for back conversion to MD
- **Customizable:** supports custom tag factory functions to override
  default behavior / representation of each parsed result element
- **Fast (enough):** parses this markdown file (5.9KB) in ~5ms on MBP2016 / Chrome 71
- **Small:** minified + gzipped ~2.5KB (parser sub-module incl. deps)

See [example source
code](https://github.com/thi-ng/umbrella/tree/develop/examples/markdown/src/)
for reference...

## Parsing & serializing to HTML

```ts
import { iterator } from "@thi.ng/transducers";
import { serialize } from "@thi.ng/hiccup";

import { parse } from "@thi.ng/hiccup-markdown";

const src = `
# Hello world

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/Hello world.png)

[This](http://example.com) is a _test_.

`;

// convert to hiccup tree
[...iterator(parse(), src)]
// [ [ 'h1', ' Hello world ' ],
//   [ 'p',
//     [ 'a', { href: 'http://example.com' }, 'This' ],
//     ' is a ',
//     [ 'em', 'test' ],
//     '. ' ] ]

// or serialize to HTML
serialize(iterator(parse(), src));

// <h1>Hello world</h1><p>
// <a href="http://example.com">This</a> is a <em>test</em>. </p>
```

## Customizing tags

The following interface defines factory functions for all supported
elements. User implementations / overrides can be given to the
`parseMD()` transducer to customize output.

```ts
interface TagFactories {
    blockquote(...children: any[]): any[];
    code(body: string): any[];
    codeblock(lang: string, body: string): any[];
    em(body: string): any[];
    heading(level, children: any[]): any[];
    hr(): any[];
    img(src: string, alt: string): any[];
    li(children: any[]): any[];
    link(href: string, body: string): any[];
    list(type: string, items: any[]): any[];
    paragraph(children: any[]): any[];
    strike(body: string): any[];
    strong(body: string): any[];
    table(rows: any[]): any[];
    td(i: number, children: any[]): any[];
    tr(i: number, cells: any[]): any[];
}
```

Example with custom link elements:

```ts
const tags = {
    link: (href, body) => ["a.link.blue", { href }, body]
};

serialize(iterator(parse(tags), src));

// <h1>Hello world</h1>
// <p><a href="http://example.com" class="link blue">This</a> is a <em>test</em>. </p>
```

## Building locally

Please refer to the [example build
instructions](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions)
on the wiki.

## Authors

- Karsten Schmidt

## License

© 2018 Karsten Schmidt // Apache Software License 2.0
