<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
> [!IMPORTANT]
> ‼️ Announcing the thi.ng user survey 2024 📋
>
> [Please participate in the survey here!](https://forms.gle/XacbSDEmQMPZg8197)\
> (open until end of February)
>
> **To achieve a better sample size, I'd highly appreciate if you could
> circulate the link to this survey in your own networks.**
>
> [Discussion](https://github.com/thi-ng/umbrella/discussions/447)

# ![@thi.ng/prefixes](https://media.thi.ng/umbrella/banners-20230807/thing-prefixes.svg?a84513ae)

[![npm version](https://img.shields.io/npm/v/@thi.ng/prefixes.svg)](https://www.npmjs.com/package/@thi.ng/prefixes)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/prefixes.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

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

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bprefixes%5D+in%3Atitle)

## Related packages

- [@thi.ng/egf](https://github.com/thi-ng/umbrella/tree/develop/packages/egf) - Extensible Graph Format
- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) - HTML/SVG/XML serialization of nested data structures, iterables & closures
- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & related tooling
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

```js
const prefixes = await import("@thi.ng/prefixes");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.10 KB

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

- [Karsten Schmidt](https://thi.ng)

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

&copy; 2020 - 2024 Karsten Schmidt // Apache License 2.0
