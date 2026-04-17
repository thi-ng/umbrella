<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

This package provides a filtered set of 2222 of IBM's [Carbon
icons](https://github.com/carbon-design-system/carbon) in hiccup format (i.e. as
Javascript encoded SVG), counting in at ~2200 and ready to be used within any
[@thi.ng/hiccup](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup)
supporting scenario.

Each icon is defined in its own source file and can be imported individually.
The converted icons are based on the 32x32 pixel versions, but have NO explicit
size set (only `viewBox` attrib). Use the
[`withSize()`](https://docs.thi.ng/umbrella/hiccup-carbon-icons/functions/withSize.html)
helper to inject a size, e.g. `withSize(DOWNLOAD, "12px")`.

## Contact sheet

All icons can be previewed here: [contact
sheet](https://demo.thi.ng/umbrella/hiccup-carbon-icons/). ([Source
code](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup-carbon-icons/tools/contact-sheet.ts))

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

### Static HTML/SVG generation

```js tangle:export/readme-serialize.js
import { WARNING_FILLED, withSize } from "@thi.ng/hiccup-carbon-icons";
import { DOCTYPE_HTML, serialize } from "@thi.ng/hiccup";

// component function
const iconButton = (icon, href, label) =>
    ["a", { href },
        ["span.icon", {}, withSize(icon, "1rem")],
        label];

const doc = [
	DOCTYPE_HTML,
	["html",
		["body", iconButton(WARNING_FILLED, "/warning", "Do not click!")]
	]
];

const html = serialize(doc);

console.log(html);
```

Resulting output (reformatted for clarity):

```html
<!DOCTYPE html>
<html>
	<body>
		<a href="/warning">
			<span class="icon">
				<svg viewBox="0 0 32 32" width="1rem" height="1rem">
					<path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2m-1.1 6h2.2v11h-2.2zM16 25c-.8 0-1.5-.7-1.5-1.5S15.2 22 16 22s1.5.7 1.5 1.5S16.8 25 16 25"/>
				</svg>
			</span>
			Do not click!
		</a>
	</body>
</html>
```

### Usage with thi.ng/rdom

```js tangle:export/readme-rdom.js
import { CODE, withSize } from "@thi.ng/hiccup-carbon-icons";
import { $compile } from "@thi.ng/rdom";

// component function
const iconButton = (icon, onclick, label) =>
    ["a", { onclick, href: "#" },
        ["span.icon", {}, withSize(icon, "1rem")],
        label];

// compile & mount in DOM
$compile(
	iconButton(CODE, () => alert("hi"), "show me the code")
).mount(document.body);
```

## Icon conversion process

(For contributors only...)

The icon conversion is largely automated via the supplied bash script (currently
with some additional minor manual cleanup needed) and requires `svgo` and a
checkout of both the original carbon and the umbrella mono repos.

```bash
# install pre-requisites
yarn global add svgo

git clone https://codeberg.org/thi.ng/umbrella.git

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
