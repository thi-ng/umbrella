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

// [ { id: 'proc', value: { tag: 'xml', attribs: { version: '1.0', encoding: 'utf-8' } } },
//   { id: 'doctype', value: 'foo bar' },
//   { id: 'elem', value: { tag: 'a', attribs: {} } },
//   { id: 'body', value: { tag: 'a', body: '\n    ' } },
//   { id: 'elem', value: { tag: 'b1', attribs: {} } },
//   { id: 'body', value: { tag: 'b1', body: '\n        ' } },
//   { id: 'elem', value: { tag: 'c', attribs: { x: '23', y: '42' } } },
//   { id: 'body', value: { tag: 'c', body: 'ccc\n            ' } },
//   { id: 'elem', value: { tag: 'd', attribs: {} } },
//   { id: 'body', value: { tag: 'd', body: 'dd' } },
//   { id: 'end',
//     value: { tag: 'd', attribs: {}, children: [], body: 'dd' } },
//   { id: 'end',
//     value:
//      { tag: 'c',
//        attribs: { x: '23', y: '42' },
//        children: [ { tag: 'd', attribs: {}, children: [], body: 'dd' } ],
//        body: 'ccc\n            ' } },
//   { id: 'end',
//     value:
//      { tag: 'b1', attribs: {}, children: [Array], body: '\n        ' } },
//   { id: 'elem', value: { tag: 'b2', attribs: [Object] } },
//   { id: 'end',
//     value: { tag: 'a', attribs: {}, children: [Array], body: '\n    ' } } ]
```

## Emitted result type IDs

| ID        | Description                                   |
|-----------|-----------------------------------------------|
| `body`    | Element text body                             |
| `doctype` | Doctype declaration                           |
| `elem`    | Element start incl. attributes                |
| `end`     | Element end incl. attributes, body & children |
| `proc`    | Processing instruction incl. attribs          |
| `error`   | Parse error incl. description                 |

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
