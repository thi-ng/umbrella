<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

<!-- include ../../assets/tpl/footer.md -->
