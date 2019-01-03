# minimal markdown parser

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
[@transducers-fsm](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-fsm).

### Features

The parser itself is currently not aimed to support **all** of Markdown's quirky
syntax features, but already supports so far:

- headlines (level 1-6)
- paragraphs
- inline links
- images
- flat unordered lists
- inline formats (**bold**, _emphasis_, `code`) in paragraphs & lists
- GFM code blocks with language hint

Other features

- **Functional:** parser entirely built using [transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers) & function composition. Use the parser in a transducer pipeline to easily apply post-processing of the emitted results
- **Declarative:** parsing rules defined declaratively with only minimal state/context handling needed
- **No regex:** consumes input character-wise and produces an iterator of hiccup-style tree nodes, ready to be used with [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom), [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup) or [@thi.ng/hiccup-markdown](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup-markdown) (for back conversion to MD)
- **Fast (enough):** parses this markdown file in 2-3ms on MBP2016 / Chrome 71
- **Small:** minified+gzipped ~3KB

See [example source
code](https://github.com/thi-ng/umbrella/tree/feature/fsm/examples/markdown/src/)
for reference...

### Limitations

These MD features (and probably more) are not supported:

- inline HTML
- image links
- footnotes
- link references
- inline formats within link labels
- ordered / numbered / todo lists
- block quotes
- tables

Some of these are considered, though currently not high priority...

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

