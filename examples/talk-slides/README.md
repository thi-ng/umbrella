# talk-slides

![screenshot](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/examples/talk-slides.png)

[Live demo](http://demo.thi.ng/umbrella/talk-slides/) |

Minimal, skinnable presentation tool with keyboard navigation, using:

- [@thi.ng/hdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom)
- [@thi.ng/rstream](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/rstream)
- [@thi.ng/transducers-hdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers-hdom)

The contents of the
[slides](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/talk-slides/src/slides.ts)
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
instructions](https://codeberg.org/thi.ng/umbrella/wiki/Example-build-instructions)
on the wiki.

## Authors

- Karsten Schmidt

## License

&copy; 2018 - 2025 Karsten Schmidt // Apache Software License 2.0
