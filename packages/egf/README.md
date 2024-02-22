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

# ![@thi.ng/egf](https://media.thi.ng/umbrella/banners-20230807/thing-egf.svg?4253a705)

[![npm version](https://img.shields.io/npm/v/@thi.ng/egf.svg)](https://www.npmjs.com/package/@thi.ng/egf)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/egf.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Built-in tag parsers](#built-in-tag-parsers)
- [Status](#status)
    - [Feature ideas](#feature-ideas)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Basic example](#basic-example)
- [Syntax](#syntax)
  - [Grammar](#grammar)
  - [Node references](#node-references)
  - [Prefixed IDs](#prefixed-ids)
  - [Includes](#includes)
  - [EGF generation / serialization](#egf-generation--serialization)
- [Authors](#authors)
- [License](#license)

## About

Extensible Graph Format.

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
- Configurable GraphViz DOT export

![example graph](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/egf/egf-readme2.png)

([Source for this example graph is further below](#basic-example))

### Built-in tag parsers

The following parsers for tagged property values are available by default.
Custom parsers can be provided via config options.

| Tag       | Description                                     | Result       |
|-----------|-------------------------------------------------|--------------|
| `#base64` | Base64 encoded binary data                      | `Uint8Array` |
| `#date`   | `Date.parse()` compatible string (e.g. ISO8601) | `Date`       |
| `#file`   | File path to read value from                    | `string`     |
| `#gpg`    | Calls `gpg` to decrypt given armored string     | `string`     |
| `#hex`    | hex 32bit int (no prefix)                       | `number`     |
| `#json`   | Arbitrary JSON value                            | `any`        |
| `#list`   | Whitespace separated list                       | `string[]`   |
| `#num`    | Floating point value (IEEE754)                  | `number`     |

**Note:** In this reference implementation, the `#file` and `#gpg` tag parsers
are only available in NodeJS.

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Begf%5D+in%3Atitle)

**You're strongly encouraged to update to at least v0.4.0 to avoid the potential
of arbitrary code execution in older versions when decrypting `#gpg`-tagged
property values.** A security advisory will be published ASAP. A fix has been
deployed already.

#### Feature ideas

(Non-exhaustive list)

- [x] [VSCode syntax highlighting](https://github.com/thi-ng/egf-language-support)
- [x] JSON -> EGF conversion
- [ ] Async tag parsing
- [ ] URL support for `#file` tag
- [ ] Tag declarations & tag parser import from URL (needs trust config opts)
- [ ] `#md` tag parser for markdown content
- [ ] `#gpg` fallback behavior options

## Installation

```bash
yarn add @thi.ng/egf
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/egf"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const egf = await import("@thi.ng/egf");
```

Package sizes (brotli'd, pre-treeshake): ESM: 2.63 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/dot](https://github.com/thi-ng/umbrella/tree/develop/packages/dot)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/prefixes](https://github.com/thi-ng/umbrella/tree/develop/packages/prefixes)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers-binary)

## API

[Generated API docs](https://docs.thi.ng/umbrella/egf/)

**TODO - Full docs forthcoming...**

- [api.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/egf/src/api.ts) - Data structures & options
- [dot.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/egf/src/dot.ts) - Graphviz export (via
  [@thi.ng/dot](https://github.com/thi-ng/umbrella/tree/develop/packages/egf/))
- [parser.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/egf/src/parser.ts) - Main parser
- [tags.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/egf/src/tags.ts) - Tagged value parsers

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
    part-of -> thi:umbrella
    status alpha
    description Extensible Graph Format
    url https://thi.ng/egf
    creator -> toxi
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
    creator -> toxi

toxi
    type person
    name Karsten Schmidt
    location London
    account -> toxi@twitter
    account -> postspectacular@gh

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

## Syntax

EGF is a UTF-8 plain text format and largely line based, though supports
multi-line values. An EGF file consists of node definitions, each with zero or
more properties and their (optionally tagged) values. EGF does not prescribe any
other schema or structure and it's entirely up to the user to e.g. allow
properties themselves to be defined as nodes with their own properties, thus
allowing the definition of LPG ([Labeled Property
Graph](https://en.wikipedia.org/wiki/Graph_database#Labeled-property_graph))
topologies as well.

```text
; Comment line

; First node definition
node1
    ; property with string value
    prop1 value
    ; property with reference to another node
    prop2 -> node2
    ; property with tagged value
    prop3 #tag value
    prop4 <<< long, potentially
multiline
value >>>
    prop5 #tag <<< tagged multi-line value >>>

node2
    ; property comment
    prop1 value
...
```

### Grammar

A full grammar definition is forthcoming. In the meantime, please see a somewhat
outdated older version and related comments in
[#234](https://github.com/thi-ng/umbrella/issues/234#issuecomment-662878452) for
more details.

### Node references

Properties with reference values to another node constitute edges in the graph.
References are encoded via `property -> nodeid`.

The following graph defines two nodes with circular references between them.
Each node has a literal (string, by default) property `name` and a reference
property `knows` to another node (via its ID). The order of references is
arbitrary and the parser will automatically produce forward declarations for
nodes not yet known.

```text
alice
    name Alice
    knows -> bob

bob
    name Robert
    knows -> alice
```

Using default parser options, this produces an object as follows. Note, the
references are encoded as objects with a `$ref` property and implement the
`IDeref` and `IEquiv` interfaces defined in the
[@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
package.

```js
{
  alice: {
    '$id': 'alice',
    name: 'Alice',
    knows: {
      '$ref': 'bob',
      deref: [Function: deref],
      equiv: [Function: equiv]
    }
  },
  bob: {
    '$id': 'bob',
    name: 'Robert',
    knows: {
      '$ref': 'alice',
      deref: [Function: deref],
      equiv: [Function: equiv]
    }
  }
}
```

```ts
// access bob's name via alice
graph.alice.knows.deref().name
// "Robert"
```

If node resolution is enabled (via the `resolve` option) in the parser, the
referenced nodes will be inlined directly and produce circular references in the
JS result object. In many cases this more desirable and fine, however will stop
the graph from being serializable to JSON (for example).

```text
{
  alice: <ref *1> {
    '$id': 'alice',
    name: 'Alice',
    knows: { '$id': 'bob', name: 'Robert', knows: [Circular *1] }
  },
  bob: <ref *2> {
    '$id': 'bob',
    name: 'Robert',
    knows: <ref *1> {
      '$id': 'alice',
      name: 'Alice',
      knows: [Circular *2]
    }
  }
}
```

### Prefixed IDs

To enable namespacing and simplify re-use of existing data vocabularies, we're
borrowing from existing Linked Data formats & tooling to allow node and property
IDs to be defined in a `prefix:name` format alongside `@prefix` declarations.
Such prefix IDs will be expanded during parsing and usually form complete URIs,
but could expand to any string. The various (50+) commonly used Linked Data
vocabulary prefixes bundled in
[@thi.ng/prefixes](https://github.com/thi-ng/umbrella/tree/develop/packages/prefixes)
are available by default, though can be overridden, of course...

```text
; prefix declaration
@prefix thi: http://thi.ng/

thi:toxi
    rdf:type -> foaf:person
```

Result:

```js
{
  'thi.ng/toxi': {
    '$id': 'thi.ng/toxi',
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': {
      '$id': 'http://xmlns.com/foaf/0.1/person'
    }
  },
  'http://xmlns.com/foaf/0.1/person': {
    '$id': 'http://xmlns.com/foaf/0.1/person'
  }
}
```

### Includes

Currently in NodeJS only, external graph definitions can be included in the main
graph via the `@include` directive. Any `@prefix` declarations in the included
file will only be available in that file, however will inherit any pre-existing
prefixes declared in the main file.

Relative file paths will be relative to the path of the currently processed
file:

```text
 |- include
 |  |- sub1.egf
 |  |- sub2.egf
 |- main.egf
```

(These examples make use of the [schema.org](https://schema.org) ontology)

```text
; main.egf
; declare an empty prefix
@prefix : http://thi.ng/

@include include/sub1.egf

; use empty prefix for this node
:toxi
    rdf:type -> schema:Person
```

```text
; sub1.egf
@include sub2.egf

:sub1.egf
    rdf:type -> schema:Dataset
    schema:dateCreated #date 2020-07-19
```

```text
; sub2.egf

:sub2.egf
    rdf:type -> schema:Dataset
    schema:creator -> :toxi
```

Parsing the `main.egf` file (with node resolution/inlining and pruning) produces:

```js
{
  'http://thi.ng/sub2.egf': {
    '$id': 'http://thi.ng/sub2.egf',
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': { '$id': 'http://schema.org/Dataset' },
    'http://schema.org/creator': {
      '$id': 'http://thi.ng/toxi',
      'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': { '$id': 'http://schema.org/Person' }
    }
  },
  'http://thi.ng/toxi': {
    '$id': 'http://thi.ng/toxi',
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': { '$id': 'http://schema.org/Person' }
  },
  'http://thi.ng/sub1.egf': {
    '$id': 'http://thi.ng/sub1.egf',
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': { '$id': 'http://schema.org/Dataset' },
    'http://schema.org/dateCreated': 2020-07-19T00:00:00.000Z
  }
}
```

### EGF generation / serialization

Complying JS objects can be converted to EGF using the `toEGF()` function. This
function takes an iterable of
[Node](https://docs.thi.ng/umbrella/egf/interfaces/Node.html)
objects, optional prefix mappings and an optional property serialization
function to deal with custom tagged values. The default property formatter
(`toEGFProp()`) handles various values for built-in tags and can be used in
combination with any additional user provided logic.

```js
import { rdf, schema } from "@thi.ng/prefixes";

const res = toEGF([
    {
      $id: "thi:egf",
      "rdf:type": { $ref: "schema:SoftwareSourceCode" },
      "schema:isPartOf": { $id: "http://thi.ng/umbrella" },
      "schema:dateCreated": new Date("2020-02-16")
    },
    {
      $id: "thi:umbrella",
      "rdf:type": { $ref: "schema:SoftwareSourceCode" },
      "schema:programmingLanguage": "TypeScript"
    }
  ],
  // prefix mappings (optional)
  {
    thi: "http://thi.ng/",
    schema,
    rdf
  }
  // property serializer (optional)
  toEGFProp
);
```

```text
@prefix thi: http://thi.ng/
@prefix schema: http://schema.org/
@prefix rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns#

thi:egf
    rdf:type -> schema:SoftwareSourceCode
    schema:isPartOf -> thi:umbrella
    schema:dateCreated #date 2020-02-16T00:00:00.000Z

thi:umbrella
    rdf:type -> schema:SoftwareSourceCode
    schema:programmingLanguage TypeScript
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-egf,
  title = "@thi.ng/egf",
  author = "Karsten Schmidt",
  note = "https://thi.ng/egf",
  year = 2020
}
```

## License

&copy; 2020 - 2024 Karsten Schmidt // Apache License 2.0
