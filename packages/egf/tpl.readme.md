# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Striving to be both easily readable & writable for humans and machines, this
line based, plain text data format and package supports:

- Definition of different types of graph based data (e.g. RDF-style or Labeled
  Property Graph topologies)
- Full support for cyclic references, arbitrary order (automatic forward
  declarations)
- Choice of inlining referenced nodes for direct access or via special node ref
  values
- Arbitrary property values (extensible via tagged literals and custom tag
  parsers a la [EDN](https://github.com/edn-format/edn))
- Optionally prefixed node and property IDs with (also optional) auto-expansion
  via declared prefixes (for [Linked
  Data](https://en.wikipedia.org/wiki/Linked_data) use cases)
- Inclusion of sub-graphs from external files
- Loading of individual property values from referenced file paths
- Optionally GPG encrypted property values (where needed)
- Multi-line values
- Line comments
- Configurable parser behavior & syntax feature flags
- Hand-optimized parser, largely regexp free
- GraphViz DOT conversion

![example graph](https://raw.githubusercontent.com/thi-ng/umbrella/feature/egf/assets/egf/egf-readme.png)

([Source for this example graph is further below](#basic-example))

### Built-in tag parsers

The following parsers for tagged property values are available by default.
Custom parsers can be registered via `registerTag()`.

| Tag       | Description                                 | Result             |
|-----------|---------------------------------------------|--------------------|
| `#base64` | Base64 encoded binary data                  | `Uint8Array`       |
| `#date`   | `Date.parse()` compatible string            | `Date`             |
| `#file`   | File path to read value from                | `string`           |
| `#gpg`    | Calls `gpg` to decrypt given armored string | `string`           |
| `#hex`    | hex 32bit int (no prefix)                   | `number`           |
| `#json`   | Arbitrary JSON value                        | `any`              |
| `#list`   | Whitespace separated list                   | `string[]`         |
| `#num`    | Floating point value                        | `number`           |
| `#ref`    | Inlines node for given ID                   | `{ $ref: string }` |

**Note:** In this reference implementation, the `#file` and `#gpg` tag parsers
are only available in NodeJS.

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

TODO - Full docs forthcoming...

- [api.ts](https://github.com/thi-ng/umbrella/tree/feature/egf/packages/egf/src/api.ts) - Data structures & options
- [dot.ts](https://github.com/thi-ng/umbrella/tree/feature/egf/packages/egf/src/api.ts) - Graphviz export
- [parser.ts](https://github.com/thi-ng/umbrella/tree/feature/egf/packages/egf/src/api.ts) - Parser
- [tags.ts](https://github.com/thi-ng/umbrella/tree/feature/egf/packages/egf/src/api.ts) - Tagged value parsers

### Basic example

```text
; file: readme.egf

; prefix declaration (optional feature)
@prefix thi: thi.ng/

; a single node/subject definition
; properties are indented
; `thi:` prefix will be expanded
thi:egf
    type project
    ; tagged value property (here: node ref)
    part-of #ref thi:umbrella
    status alpha
    description Extensible Graph Format
    url https://thi.ng/egf
    creator #ref toxi
    ; multi-line value
    ; read as whitespace separated list/array (via #list)
    tag #list >>>
graph
extensible
format
linked-data
<<<

thi:umbrella
    type project
    url https://thi.ng/umbrella
    creator #ref toxi

toxi
    type person
    name Karsten Schmidt
    location London
    account #ref toxi@twitter
    account #ref postspectacular@gh

toxi@twitter
    type account
    name @toxi
    url http://twitter.com/toxi

postspectacular@gh
    type account
    name @postspectacular
    url http://github.com/postspectacular
```

```ts
import { parseFile } from "@thi.ng/egf";

// enable prefix expansion in parser
const graph = parseFile("readme.egf", { opts: { prefixes: true } }).nodes;

console.log(Object.keys(graph));
// [
//  'thi.ng/egf',
//  'thi.ng/umbrella',
//  'toxi',
//  'toxi@twitter',
//  'postspectacular@gh'
// ]

console.log(graph.toxi);
// {
//   '$id': 'toxi',
//   type: 'person',
//   name: 'Karsten Schmidt',
//   location: 'London',
//   account: [
//     {
//       '$ref': 'toxi@twitter',
//       deref: [Function: deref],
//       equiv: [Function: equiv]
//     },
//     {
//       '$ref': 'postspectacular@gh',
//       deref: [Function: deref],
//       equiv: [Function: equiv]
//     }
//   ]
// }

// in this example inlining of referenced nodes is disabled (default)
// therefore refs are encoded as objects implementing the `IDeref` interface
// to obtain the referenced node
console.log(graph.toxi.account[0].deref());
// {
//   '$id': 'toxi@twitter',
//   type: 'account',
//   name: '@toxi',
//   url: 'http://twitter.com/toxi'
// }
```

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
