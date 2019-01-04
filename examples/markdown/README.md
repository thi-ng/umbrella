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

- ATX headlines (level 1-6, then downgrade to paragraph)
- paragraphs
- blockquotes
- inline links
- images
- flat unordered lists
- inline formats (**bold**, _emphasis_, `code`, ~~strikethrough~~) in
  paragraphs, titles, lists, blockquotes
- GFM code blocks with language hint
- horizontal rules

---

Other features

- **Functional:** parser entirely built using [transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers) & function composition. Use the parser in a transducer pipeline to easily apply post-processing of the emitted results
- **Declarative:** parsing rules defined declaratively with only minimal state/context handling needed
- **No regex:** consumes input character-wise and produces an iterator of hiccup-style tree nodes, ready to be used with [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom), [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup) or [@thi.ng/hiccup-markdown](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup-markdown) (for back conversion to MD)
- **Customizable:** supports custom tag factory functions to override default behavior / representation of each parsed result element
- **Fast (enough):** parses this markdown file in ~3ms on MBP2016 / Chrome 71
- **Small:** minified + gzipped ~3.3KB

See [example source
code](https://github.com/thi-ng/umbrella/tree/feature/fsm/examples/markdown/src/)
for reference...

### Limitations

These MD features (and probably many more) are not supported:

- inline HTML
- nested inline formats (e.g. **bold** inside `code`)
- inline formats within link labels
- image links
- footnotes
- link references
- nested / ordered / numbered / todo lists
- tables

Some of these are considered, though currently not high priority...

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
    list(type: string): any[];
    li(...children: any[]): any[];
    paragraph(...children: any[]): any[];
    strong(body: string): any[];
    strike(body: string): any[];
    title(level, ...children: any[]): any[];
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

