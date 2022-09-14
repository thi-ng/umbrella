<!-- This file is generated - DO NOT EDIT! -->

# ![prefixes](https://media.thi.ng/umbrella/banners-20220914/thing-prefixes.svg?4f0b49d5)

[![npm version](https://img.shields.io/npm/v/@thi.ng/prefixes.svg)](https://www.npmjs.com/package/@thi.ng/prefixes)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/prefixes.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Usage with @thi.ng/hiccup](#usage-with-thinghiccup)
- [Authors](#authors)
- [License](#license)

## About

50+ Linked Data vocabulary prefixes and their namespace URLs.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bprefixes%5D+in%3Atitle)

### Related packages

- [@thi.ng/egf](https://github.com/thi-ng/umbrella/tree/develop/packages/egf) - Extensible Graph Format
- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) - HTML/SVG/XML serialization of nested data structures, iterables & closures
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
- [@thi.ng/rdom](https://github.com/thi-ng/umbrella/tree/develop/packages/rdom) - Lightweight, reactive, VDOM-less UI/DOM components with async lifecycle and [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) compatible

## Installation

```bash
yarn add @thi.ng/prefixes
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/prefixes"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const prefixes = await import("@thi.ng/prefixes");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.12 KB

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/prefixes/)

This package only contains constants, no actual code. Please see [source
code for full list
provided](https://github.com/thi-ng/umbrella/tree/develop/packages/prefixes/src/).

**Note:** some namespace URIs exist in two flavors - for RDF vocab and
as XML namespace. The latter versions are always prefixed with `XML_`,
e.g.:

```ts
import { xsd, XML_XSD } from "@thi.ng/prefixes";

xsd     // http://www.w3.org/2001/XMLSchema#
XML_XSD // http://www.w3.org/2001/XMLSchema
```

### Usage with @thi.ng/hiccup

All current
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
consumers/processors support [RDFa](https://www.w3.org/TR/rdfa-core/)
attributes and specifically allow the `prefix` attrib value to be given
as object of prefixes. This allows for very compact prefix definitions
like so:

```ts
import { serialize } from "@thi.ng/hiccup";
import { article, body, div, h1, html } from "@thi.ng/hiccup-html";
import { dc, schema } from "@thi.ng/prefixes";

serialize(
    html({ lang: "en" },
        body({ prefix: { dc, schema } },
            article({ resource: "/posts/hello-world", typeof: "schema:BlogPosting"},
                h1({ property: "dc:title" }, "Hello World"),
                div({ property: "schema:articleBody" }, "...")
            )
        )
    )
);
```

Serialized HTML/RDFa result:

```html
<html lang="en">
    <body prefix="dc: http://purl.org/dc/elements/1.1/ schema: http://schema.org/">
        <article resource="/posts/hello-world" typeof="schema:BlogPosting">
            <h1 property="dc:title">Hello World</h1>
            <div property="schema:articleBody">...</div>
        </article>
    </body>
</html>
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-prefixes,
  title = "@thi.ng/prefixes",
  author = "Karsten Schmidt",
  note = "https://thi.ng/prefixes",
  year = 2020
}
```

## License

&copy; 2020 - 2022 Karsten Schmidt // Apache Software License 2.0
