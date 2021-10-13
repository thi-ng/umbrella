<!-- This file is generated - DO NOT EDIT! -->

# ![sax](https://media.thi.ng/umbrella/banners/thing-sax.svg?ef8cfa3b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/sax.svg)](https://www.npmjs.com/package/@thi.ng/sax)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/sax.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic usage](#basic-usage)
  - [Partial parsing & result post-processing](#partial-parsing--result-post-processing)
  - [DOM-style tree parsing using `defmulti`](#dom-style-tree-parsing-using-defmulti)
  - [Error handling](#error-handling)
- [Emitted result type IDs](#emitted-result-type-ids)
- [Parser options](#parser-options)
- [Authors](#authors)
- [License](#license)

## About

[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)-based,
[SAX](https://en.wikipedia.org/wiki/Simple_API_for_XML)-like,
non-validating, [configurable](#parser-options), speedy & tiny XML
parser (~1.8KB gzipped).

Unlike the classic event-driven approach of SAX, this parser is
implemented as a transducer function, transforming an XML input into a
stream of SAX-event-like objects. Being a transducer, the parser can be
used in novel ways as part of a larger processing pipeline and can be
composed with other pre or post-processing steps, e.g. to filter or
transform element / attribute values or only do partial parsing with
early termination based on some condition.

Additionally, since by default the parser emits any children as part of
"element end" events, it can be used like a tree-walking DOM parser as
well (see SVG parsing example further below). The choice is yours!

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bsax%5D+in%3Atitle)

### Related packages

- [@thi.ng/hiccup-svg](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-svg) - SVG element functions for [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup) & [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
- [@thi.ng/parse](https://github.com/thi-ng/umbrella/tree/develop/packages/parse) - Purely functional parser combinators & AST generation for generic inputs
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers) - Lightweight transducer implementations for ES6 / TypeScript
- [@thi.ng/transducers-fsm](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-fsm) - Transducer-based Finite State Machine transformer

## Installation

```bash
yarn add @thi.ng/sax
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/sax"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const sax = await import("@thi.ng/sax");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.92 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/transducers-fsm](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-fsm)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                           | Description                          | Live demo                                           | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:-------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/xml-converter.png" width="240"/> | XML/HTML/SVG to hiccup/JS conversion | [Demo](https://demo.thi.ng/umbrella/xml-converter/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/xml-converter) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/sax/)

### Basic usage

```ts
import * as sax from "@thi.ng/sax";
import * as tx from "@thi.ng/transducers";

src=`<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE foo bar>
<!-- comment -->
<a>
    <b1>
        <c x="23" y="42">ccc
            <d>dd</d>
        </c>
    </b1>
    <b2 foo="bar" />
</a>`

// sax.parse() returns a transducer
doc = [...tx.iterator(sax.parse(), src)]

// ...or returns iterator if input is given
doc = [...sax.parse(src)]

// (see description of `type` values and parse options further below)

// [ { type: 0,
//     tag: 'xml',
//     attribs: { version: '1.0', encoding: 'utf-8' } },
//   { type: 1, body: 'foo bar' },
//   { type: 2, body: ' comment ' },
//   { type: 4, tag: 'a', attribs: {} },
//   { type: 6, tag: 'a', body: '\n    ' },
//   { type: 4, tag: 'b1', attribs: {} },
//   { type: 6, tag: 'b1', body: '\n        ' },
//   { type: 4, tag: 'c', attribs: { x: '23', y: '42' } },
//   { type: 6, tag: 'c', body: 'ccc\n            ' },
//   { type: 4, tag: 'd', attribs: {} },
//   { type: 6, tag: 'd', body: 'dd' },
//   { type: 5, tag: 'd', attribs: {}, children: [], body: 'dd' },
//   { type: 5,
//     tag: 'c',
//     attribs: { x: '23', y: '42' },
//     children: [ [Object] ],
//     body: 'ccc\n            ' },
//   { type: 5,
//     tag: 'b1',
//     attribs: {},
//     children: [ [Object] ],
//     body: '\n        ' },
//   { type: 4, tag: 'b2', attribs: { foo: 'bar' } },
//   { type: 5, tag: 'b2', attribs: { foo: 'bar' } },
//   { type: 5,
//     tag: 'a',
//     attribs: {},
//     children: [ [Object], [Object] ],
//     body: '\n    ' } ]
```

### Partial parsing & result post-processing

As mentioned earlier, the transducer nature of this parser allows for
its easy integration into larger transformation pipelines. The next
example parses an SVG file, then extracts and selectively applies
transformations to only the `<circle>` elements in the first group
(`<g>`) element. Btw. The transformed elements can be serialized back
into SVG syntax using
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)...

Given the composed transducer below, parsing stops immediately after the
first `<g>` element is complete. This is because the `matchFirst()`
transducer will cause early termination once that element has been
processed.

```ts
svg=`
<?xml version="1.0"?>
<svg version="1.1" height="300" width="300" xmlns="http://www.w3.org/2000/svg">
    <g fill="yellow">
        <circle cx="50.00" cy="150.00" r="50.00" />
        <circle cx="250.00" cy="150.00" r="50.00" />
        <circle cx="150.00" cy="150.00" fill="rgba(0,255,255,0.25)" r="100.00" stroke="#ff0000" />
        <rect x="80" y="80" width="140" height="140" fill="none" stroke="black" />
    </g>
    <g fill="none" stroke="black">
        <circle cx="150.00" cy="150.00" r="50.00" />
        <circle cx="150.00" cy="150.00" r="25.00" />
    </g>
</svg>`;

[...tx.iterator(
    tx.comp(
        // transform into parse events (see parser options below)
        sax.parse({ children: true }),
        // match 1st group end
        tx.matchFirst((e) => e.type == sax.Type.ELEM_END && e.tag == "g"),
        // extract group's children
        tx.mapcat((e) => e.children),
        // select circles only
        tx.filter((e) => e.tag == "circle"),
        // transform attributes
        tx.map((e)=> [e.tag, {
            ...e.attribs,
            cx: parseFloat(e.attribs.cx),
            cy: parseFloat(e.attribs.cy),
            r:  parseFloat(e.attribs.r),
        }])
    ),
    svg
)]
// [ [ 'circle', { cx: 50, cy: 150, r: 50 } ],
//   [ 'circle', { cx: 250, cy: 150, r: 50 } ],
//   [ 'circle', { cx: 150, cy: 150, fill: 'rgba(0,255,255,0.25)', r: 100, stroke: '#ff0000' } ] ]
```

### DOM-style tree parsing using `defmulti`

This example shows how SVG can be parsed into
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
format.

```ts
import { defmulti, DEFAULT } from "@thi.ng/defmulti";

// coerces given attribute IDs into numeric values and
// keeps all other attribs
const numericAttribs = (e, ...ids: string[]) =>
    ids.reduce(
        (acc, id) => (acc[id] = parseFloat(e.attribs[id]), acc),
        { ...e.attribs }
    );

// returns iterator of parsed & filtered children of given element
// (iterator is used to avoid extraneous copying at call sites)
const parsedChildren = (e) =>
    tx.iterator(
        tx.comp(
            tx.map(parseElement),
            tx.filter((e)=> !!e),
        ),
        e.children
    );

// define multiple dispatch function, based on element tag name
const parseElement = defmulti((e) => e.tag);

// tag specific implementations
parseElement.add("circle", (e) =>
    [e.tag, numericAttribs(e, "cx", "cy", "r")]);

parseElement.add("rect", (e) =>
    [e.tag, numericAttribs(e, "x", "y", "width", "height")]);

parseElement.add("g", (e) =>
    [e.tag, e.attribs, ...parsedChildren(e)]);

parseElement.add("svg", (e) =>
    [e.tag, numericAttribs(e, "width", "height"), ...parsedChildren(e)]);

// implementation for unhandled elements
parseElement.add(DEFAULT, () => null);

// using the same SVG source as in previous example:
// the `last()` reducer just returns the ultimate value
// which in this case is the SVG root element's ELEM_END parse event
// this also contains all children (by default)
parseElement(tx.transduce(sax.parse(), tx.last(), svg));

// ["svg",
//     {
//         version: "1.1",
//         height: 300,
//         width: 300,
//         xmlns: "http://www.w3.org/2000/svg"
//     },
//     ["g",
//         { fill: "yellow" },
//         ["circle", { cx: 50, cy: 150, r: 50 }],
//         ["circle", { cx: 250, cy: 150, r: 50 }],
//         ["circle",
//             {
//                 cx: 150,
//                 cy: 150,
//                 fill: "rgba(0,255,255,0.25)",
//                 r: 100,
//                 stroke: "#ff0000"
//             }],
//         ["rect",
//             {
//                 x: 80,
//                 y: 80,
//                 width: 140,
//                 height: 140,
//                 fill: "none",
//                 stroke: "black"
//             }]],
//     ["g",
//         { fill: "none", stroke: "black" },
//         ["circle", { cx: 150, cy: 150, r: 50 }],
//         ["circle", { cx: 150, cy: 150, r: 25 }]]]
```

### Error handling

If the parser encounters a syntax error, an error event value incl. a
description and input position will be produced (but no JS error will be
thrown) and the entire transducer pipeline stopped.

```ts
[...tx.iterator(sax.parse(), `a`)]
// [ { type: 7, body: 'unexpected char: \'a\' @ pos 1' } ]

[...tx.iterator(sax.parse(), `<a><b></c></a>`)]
// [ { type: 4, tag: 'a', attribs: {} },
//   { type: 4, tag: 'b', attribs: {} },
//   { type: 7, body: 'unmatched tag: c @ pos 7' } ]
```

## Emitted result type IDs

The `type` key in each emitted result object is a TypeScript enum with the following values:

| ID | Enum              | Description                                   |
|----|-------------------|-----------------------------------------------|
| 0  | `Type.PROC`       | Processing instruction incl. attribs          |
| 1  | `Type.DOCTYPE`    | Doctype declaration  body                     |
| 2  | `Type.COMMENT`    | Comment body                                  |
| 3  | `Type.CDATA`      | CDATA content                                 |
| 4  | `Type.ELEM_START` | Element start incl. attributes                |
| 5  | `Type.ELEM_END`   | Element end incl. attributes, body & children |
| 6  | `Type.ELEM_BODY`  | Element text body                             |
| 7  | `Type.ERROR`      | Parse error description                       |

## Parser options

| Option     | Type      | Default | Description                                                                                                                                                  |
|------------|-----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `children` | `boolean` | `true`  | If `true`, recursively includes children elements in `ELEM_END` events. For very large documents, this should be disabled to save (or even fit into) memory. |
| `entities` | `boolean` | `false` | If `true`, unescape standard XML entities in body text and attrib values.                                                                                    |
| `trim`     | `boolean` | `false` | If `true`, trims element body, comments and CDATA content. If the remaining string is empty, no event will be generated for this value.                      |

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-sax,
  title = "@thi.ng/sax",
  author = "Karsten Schmidt",
  note = "https://thi.ng/sax",
  year = 2018
}
```

## License

&copy; 2018 - 2021 Karsten Schmidt // Apache Software License 2.0
