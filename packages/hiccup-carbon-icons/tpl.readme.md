<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

This package provides the full set of IBM's [Carbon
icons](https://github.com/IBM/carbon-icons) in hiccup format (i.e. as Javascript
encoded SVG), counting in at ~1100 and ready to be used within any
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
supporting scenario.

Each icon is defined in its own source file and can be imported individually.
The converted icons are based on the 32x32 pixel versions, but have NO explicit
size set (only `viewBox` attrib). Use the `withSize()` helper to inject a size,
e.g. `withSize(DOWNLOAD, "12px")`.

## Contact sheet

All icons can be previewed here: [contact
sheet](https://demo.thi.ng/umbrella/hiccup-carbon-icons/). ([Source
code](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-carbon-icons/tools/contact-sheet.ts))

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

```ts
import { renderOnce } from "@thi.ng/hdom";
import { CODE } from "@thi.ng/hiccup-carbon-icons";

// using tachyons css classes for brevity
const iconButton = (icon, onclick, label?) =>
    ["a", { onclick, href: "#" },
        ["span.dib.w1.h1.mr1", icon],
        label];

renderOnce(iconButton(CODE, () => alert("hi"), "show me the code"));
```

## Icon conversion process

(For contributors only...)

The icon conversion is largely automated via the supplied bash script (currently
with some additional minor manual cleanup needed) and requires `svgo` and a
checkout of both the original carbon and the umbrella mono repos.

```bash
# install pre-requisites
yarn global add svgo

git clone https://github.com/thi-ng/umbrella.git

# build entire umbrella repo
cd umbrella
yarn build

# build xml to hiccup converter CLI tool
cd examples/xml-converter
yarn build-cli

# switch to package root
cd ../../hiccup-carbon-icons

# clone carbon repo into local temp dir
git clone https://github.com/carbon-design-system/carbon.git tmp

# convert original SVG icons and write results to package src folder
yarn build:convert src tmp/packages/icons/src/svg/32

# update contact sheet (will be written to package root)
yarn build:sheet

# open in browser
open contact-sheet.html

# fixup any conversion issues (rinse & repeat...)
# e.g. in the latest version (2020/08), several icons use paths w/ opacity=0 which need to be removed

# rebuild package
yarn build
```

## Authors

{{pkg.allAuthorLinks}}

{{pkg.cite}}

## License

The copyright of the original icons is with IBM. The icons were published under
the same license as this package.

&copy; {{pkg.copyright}} // {{pkg.license}}
