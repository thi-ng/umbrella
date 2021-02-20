# talk-slides

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/talk-slides.png)

[Live demo](http://media.thi.ng/2018/talks/clojurex/index.html) |
[Exported PDF](http://media.thi.ng/2018/talks/clojurex/slides.pdf)

Minimal, skinnable presentation tool with keyboard navigation, using:

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)
- [@thi.ng/transducers-hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-hdom)

The contents of the
[slides](https://github.com/thi-ng/umbrella/tree/develop/examples/talk-slides/src/slides.ts)
are from my talk at the [ClojureX 2018
conference](https://skillsmatter.com/skillscasts/12269-keynote-the-spirit-of-clojure),
however for file size reasons all media assets have been **excluded**
from this repo / example. So when running this example locally on your
machine, expect broken images / blank pages in various places. On the
other hand you might find the slide definitions useful as starting point
for your own content.

For those of you coming from Clojure-land, you should feel very
familiar! :) Give it a spin!

If you want to add you own assets, first create a new directory
(relative to this example): `mkdir -p dist/assets` and copy images in
there.

As usual, all theming is done via [Tachyons CSS](http://tachyons.io),
also see this useful site for quick reference: [Tachyons
TL;DR](https://tachyons-tldr.now.sh/).

Please refer to the [example build
instructions](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions)
on the wiki.

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
