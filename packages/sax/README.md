# @thi.ng/sax

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/sax.svg)](https://www.npmjs.com/package/@thi.ng/sax)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)-based,
[SAX](https://en.wikipedia.org/wiki/Simple_API_for_XML)-like,
non-validating, speedy & tiny XML parser (1.4KB gzipped).

Unlike the classic event-driven approach of SAX, this parser is
implemented as a transducer function transforming an XML input into a
stream of SAX-event-like objects. Being a transducer, the parser can be
used in novel ways as part of a larger processing pipeline and can be
composed with other pre or post-processing steps, e.g. to filter or
transform element / attribute values.

## Installation

```
yarn add @thi.ng/sax
```

## Dependencies

- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)
- [@thi.ng/transducers-fsm](https://github.com/thi-ng/umbrella/tree/master/packages/transducers-fsm)

## Usage examples

```ts
import * as sax from "@thi.ng/sax";
import * as tx from "@thi.ng/transducers";

src=`<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE foo bar>
<a>
    <b1>
        <c x="23" y="42">ccc
            <d>dd</d>
        </c>
    </b1>
    <b2 foo="bar" />
</a>`

doc = [...tx.iterator(sax.parse(), src)]

// [ { type: 0,
//     tag: 'xml',
//     attribs: { version: '1.0', encoding: 'utf-8' } },
//   { type: 1, body: 'foo bar' },
//   { type: 3, tag: 'a', attribs: {} },
//   { type: 5, tag: 'a', body: '\n    ' },
//   { type: 3, tag: 'b1', attribs: {} },
//   { type: 5, tag: 'b1', body: '\n        ' },
//   { type: 3, tag: 'c', attribs: { x: '23', y: '42' } },
//   { type: 5, tag: 'c', body: 'ccc\n            ' },
//   { type: 3, tag: 'd', attribs: {} },
//   { type: 5, tag: 'd', body: 'dd' },
//   { type: 4, tag: 'd', attribs: {}, children: [], body: 'dd' },
//   { type: 4,
//     tag: 'c',
//     attribs: { x: '23', y: '42' },
//     children: [ { tag: 'd', attribs: {}, children: [], body: 'dd' } ],
//     body: 'ccc\n            ' },
//   { type: 4,
//     tag: 'b1',
//     attribs: {},
//     children: [ [Object] ],
//     body: '\n        ' },
//   { type: 4, tag: 'b2', attribs: { foo: 'bar' } },
//   { type: 4,
//     tag: 'a',
//     attribs: {},
//     children: [ [Object], [Object] ],
//     body: '\n    ' } ]
```

### Result post-processing

As mentioned earlier, the transducer nature of this parser allows for
its easy integration into larger transformation pipelines. The next
example parses an SVG file, then extracts and selectively applies
transformations to only the `<circle>` elements in the first group
(`<g>`) element.

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
        // transform into parse events
        sax.parse(),
        // match 1st group end
        tx.matchFirst((e) => e.type == sax.Type.ELEM_END && e.tag == "g"),
        // extract group's children
        tx.mapcat((e) => e.children),
        // select circles only
        tx.filter((e) => e.tag == "circle"),
        // transform attributes
        tx.map((e)=> [e.tag, {
            ...e.attribs,
            cx: parseFloat(e.attribs.cy),
            cy: parseFloat(e.attribs.cy),
            r: parseFloat(e.attribs.r),
        }])
    ),
    svg
)]
// [ [ 'circle', { cx: 150, cy: 150, r: 50 } ],
//   [ 'circle', { cx: 150, cy: 150, r: 50 } ],
//   [ 'circle', { cx: 150, cy: 150, fill: 'rgba(0,255,255,0.25)', r: 100, stroke: '#ff0000' } ] ]
```

## Emitted result type IDs

The `type` key in each emitted result object is a TypeScript enum with the following values:

| ID | Enum              | Description                                   |
|----|-------------------|-----------------------------------------------|
| 0  | `Type.PROC`       | Processing instruction incl. attribs          |
| 1  | `Type.DOCTYPE`    | Doctype declaration  body                     |
| 2  | `Type.COMMENT`    | Comment body                                  |
| 3  | `Type.ELEM_START` | Element start incl. attributes                |
| 4  | `Type.ELEM_END`   | Element end incl. attributes, body & children |
| 5  | `Type.ELEM_BODY`  | Element text body                             |
| 6  | `Type.ERROR`      | Parse error description                       |

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
