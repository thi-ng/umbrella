# Minimal Markdown parser

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

This example is a test environment for a new & minimal
[Markdown](https://en.wikipedia.org/wiki/Markdown) parser & converter to
[hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup)
format, using basic state handling and parsing primitives provided by
the (still unreleased)
[@thi.ng/fsm](https://github.com/thi-ng/umbrella/tree/feature/fsm/packages/fsm)
package, which itself is a potential replacement / major version update
for
[@thi.ng/transducers-fsm](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-fsm).

> "Weeks of coding can **save hours** of planning."
> -- Anonymous

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

Note: Currently, the last heading, paragraph, blockquote, list or table requires an additional newline.

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

### Other features

- **Functional:** parser entirely built using
  [transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
  & function composition. Use the parser in a transducer pipeline to
  easily apply post-processing of the emitted results
- **Declarative:** parsing rules defined declaratively with only minimal
  state/context handling needed
- **No regex:** consumes input character-wise and produces an iterator
  of hiccup-style tree nodes, ready to be used with
  [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom),
  [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup)
  or
  [@thi.ng/hiccup-markdown](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup-markdown)
  (for back conversion to MD)
- **Customizable:** supports custom tag factory functions to override
  default behavior / representation of each parsed result element
- **Fast (enough):** parses this markdown file (5.8KB) in ~5ms on MBP2016 / Chrome 71
- **Small:** minified + gzipped ~2.6KB

See [example source
code](https://github.com/thi-ng/umbrella/tree/feature/fsm/examples/markdown/src/)
for reference...

## Serializing to HTML

```ts
import { iterator } from "@thi.ng/transducers";
import { serialize } from "@thi.ng/hiccup";

import { parseMD } from "./parser";

const src = `
# Hello world

[This](http://example.com) is a _test_.

`;

serialize(iterator(parseMD(), src));

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
    img(src: string, alt: string): any[];
    link(href: string, body: string): any[];
    list(type: string, items: any[]): any[];
    li(children: any[]): any[];
    paragraph(children: any[]): any[];
    strong(body: string): any[];
    strike(body: string): any[];
    title(level, children: any[]): any[];
    table(rows: any[]): any[];
    tr(i: number, cells: any[]): any[];
    td(i: number, children: any[]): any[];
    hr(): any[];
}
```

Example with custom link elements:

```ts
const tags = {
    link: (href, body) => ["a.link.blue", { href }, body]
};

serialize(iterator(parseMD(tags), src));

// <h1>Hello world</h1>
// <p><a href="http://example.com" class="link blue">This</a> is a <em>test</em>. </p>
```

## Building locally

```bash
git clone https://github.com/thi-ng/umbrella.git
cd umbrella

# first build all packages in mono repo (takes about 1-2mins)
yarn install
yarn build

# then launch example
cd examples/markdown
yarn start
```

## Authors

- Karsten Schmidt

## License

© 2018 - 2019 Karsten Schmidt // Apache Software License 2.0

