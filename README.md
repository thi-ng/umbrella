# @thi.ng/umbrella

[![Travis status](https://api.travis-ci.org/thi-ng/umbrella.svg?branch=master)](https://travis-ci.org/thi-ng/umbrella)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org/)
[![Discord chat](https://img.shields.io/discord/445761008837984256.svg)](https://discord.gg/JhYcmBw)

Mono-repository for thi.ng TypeScript/ES6 projects, a collection of largely
data / transformation oriented packages and building blocks for reactive
applications, dataflow graphs, components (not just UI related).

Most packages:

- have detailed, individual README files w/ small usage examples
- versioned independently
- distributed as ES6 (CommonJS modules) with doc comments (incl. example
  code snippets), bundled TypeScript typings & changelogs
- highly modular with largely only a few closely related functions /
  single class per file to help w/ tree shaking
- provide re-exports of all their publics for full library imports
- have either none or only @thi.ng internal runtime dependencies
- declare public interfaces, enums & types in an `src/api.ts` file
  (larger packages only)
- auto-generated online documentation at [docs.thi.ng](http://docs.thi.ng)
- licensed under Apache Software License 2.0

There's a steadily growing number of standalone examples (different
difficulties, many combining functionality from several packages) in the
[examples](./examples) directory.

## Projects

| Projects                                                    | Version                                                                                                                           | Changelog                                              | Description                                   |
|-------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|-----------------------------------------------|
| [`@thi.ng/api`](./packages/api)                             | [![version](https://img.shields.io/npm/v/@thi.ng/api.svg)](https://www.npmjs.com/package/@thi.ng/api)                             | [changelog](./packages/api/CHANGELOG.md)               | Common types, decorators, mixins              |
| [`@thi.ng/associative`](./packages/associative)             | [![version](https://img.shields.io/npm/v/@thi.ng/associative.svg)](https://www.npmjs.com/package/@thi.ng/associative)             | [changelog](./packages/associative/CHANGELOG.md)       | Alt Set & Map implementations                 |
| [`@thi.ng/atom`](./packages/atom)                           | [![version](https://img.shields.io/npm/v/@thi.ng/atom.svg)](https://www.npmjs.com/package/@thi.ng/atom)                           | [changelog](./packages/atom/CHANGELOG.md)              | Immutable value wrappers, views, history      |
| [`@thi.ng/bench`](./packages/bench)                         | [![version](https://img.shields.io/npm/v/@thi.ng/bench.svg)](https://www.npmjs.com/package/@thi.ng/bench)                         | [changelog](./packages/bench/CHANGELOG.md)             | Basic benchmarking helpers                    |
| [`@thi.ng/bitstream`](./packages/bitstream)                 | [![version](https://img.shields.io/npm/v/@thi.ng/bitstream.svg)](https://www.npmjs.com/package/@thi.ng/bitstream)                 | [changelog](./packages/bitstream/CHANGELOG.md)         | Bitwise input / output streams                |
| [`@thi.ng/cache`](./packages/cache)                         | [![version](https://img.shields.io/npm/v/@thi.ng/cache.svg)](https://www.npmjs.com/package/@thi.ng/cache)                         | [changelog](./packages/cache/CHANGELOG.md)             | In-memory caches / strategies                 |
| [`@thi.ng/checks`](./packages/checks)                       | [![version](https://img.shields.io/npm/v/@thi.ng/checks.svg)](https://www.npmjs.com/package/@thi.ng/checks)                       | [changelog](./packages/checks/CHANGELOG.md)            | Type & value checks                           |
| [`@thi.ng/compare`](./packages/compare)                     | [![version](https://img.shields.io/npm/v/@thi.ng/compare.svg)](https://www.npmjs.com/package/@thi.ng/compare)                     | [changelog](./packages/compare/CHANGELOG.md)           | Comparator                                    |
| [`@thi.ng/csp`](./packages/csp)                             | [![version](https://img.shields.io/npm/v/@thi.ng/csp.svg)](https://www.npmjs.com/package/@thi.ng/csp)                             | [changelog](./packages/csp/CHANGELOG.md)               | Channel based async ops                       |
| [`@thi.ng/dcons`](./packages/dcons)                         | [![version](https://img.shields.io/npm/v/@thi.ng/dcons.svg)](https://www.npmjs.com/package/@thi.ng/dcons)                         | [changelog](./packages/dcons/CHANGELOG.md)             | Doubly-linked list                            |
| [`@thi.ng/defmulti`](./packages/defmulti)                   | [![version](https://img.shields.io/npm/v/@thi.ng/defmulti.svg)](https://www.npmjs.com/package/@thi.ng/defmulti)                   | [changelog](./packages/defmulti/CHANGELOG.md)          | Dynamic multiple dispatch                     |
| [`@thi.ng/dgraph`](./packages/dgraph)                       | [![version](https://img.shields.io/npm/v/@thi.ng/dgraph.svg)](https://www.npmjs.com/package/@thi.ng/dgraph)                       | [changelog](./packages/dgraph/CHANGELOG.md)            | Dependency graph                              |
| [`@thi.ng/diff`](./packages/diff)                           | [![version](https://img.shields.io/npm/v/@thi.ng/diff.svg)](https://www.npmjs.com/package/@thi.ng/diff)                           | [changelog](./packages/diff/CHANGELOG.md)              | Array & object diffing                        |
| [`@thi.ng/dot`](./packages/dot)                             | [![version](https://img.shields.io/npm/v/@thi.ng/dot.svg)](https://www.npmjs.com/package/@thi.ng/dot)                             | [changelog](./packages/dot/CHANGELOG.md)               | Graphviz DOM & export                         |
| [`@thi.ng/equiv`](./packages/equiv)                         | [![version](https://img.shields.io/npm/v/@thi.ng/equiv.svg)](https://www.npmjs.com/package/@thi.ng/equiv)                         | [changelog](./packages/equiv/CHANGELOG.md)             | Deep value equivalence checking               |
| [`@thi.ng/errors`](./packages/errors)                       | [![version](https://img.shields.io/npm/v/@thi.ng/errors.svg)](https://www.npmjs.com/package/@thi.ng/errors)                       | [changelog](./packages/errors/CHANGELOG.md)            | Custom error types                            |
| [`@thi.ng/hdom`](./packages/hdom)                           | [![version](https://img.shields.io/npm/v/@thi.ng/hdom.svg)](https://www.npmjs.com/package/@thi.ng/hdom)                           | [changelog](./packages/hdom/CHANGELOG.md)              | Hiccup based VDOM & diffing                   |
| [`@thi.ng/hdom-components`](./packages/hdom-components)     | [![version](https://img.shields.io/npm/v/@thi.ng/hdom-components.svg)](https://www.npmjs.com/package/@thi.ng/hdom-components)     | [changelog](./packages/hdom-components/CHANGELOG.md)   | hdom based UI components                      |
| [`@thi.ng/heaps`](./packages/heaps)                         | [![version](https://img.shields.io/npm/v/@thi.ng/heaps.svg)](https://www.npmjs.com/package/@thi.ng/heaps)                         | [changelog](./packages/heaps/CHANGELOG.md)             | Binary & d-ary heap impls                     |
| [`@thi.ng/hiccup`](./packages/hiccup)                       | [![version](https://img.shields.io/npm/v/@thi.ng/hiccup.svg)](https://www.npmjs.com/package/@thi.ng/hiccup)                       | [changelog](./packages/hiccup/CHANGELOG.md)            | S-expression based HTML/XML serialization     |
| [`@thi.ng/hiccup-css`](./packages/hiccup-css)               | [![version](https://img.shields.io/npm/v/@thi.ng/hiccup-css.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-css)               | [changelog](./packages/hiccup-css/CHANGELOG.md)        | CSS from nested JS data structures            |
| [`@thi.ng/hiccup-svg`](./packages/hiccup-svg)               | [![version](https://img.shields.io/npm/v/@thi.ng/hiccup-svg.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-svg)               | [changelog](./packages/hiccup-svg/CHANGELOG.md)        | hiccup based SVG vocab                        |
| [`@thi.ng/iges`](./packages/iges)                           | [![version](https://img.shields.io/npm/v/@thi.ng/iges.svg)](https://www.npmjs.com/package/@thi.ng/iges)                           | [changelog](./packages/iges/CHANGELOG.md)              | IGES format geometry serialization            |
| [`@thi.ng/interceptors`](./packages/interceptors)           | [![version](https://img.shields.io/npm/v/@thi.ng/interceptors.svg)](https://www.npmjs.com/package/@thi.ng/interceptors)           | [changelog](./packages/interceptors/CHANGELOG.md)      | Composable event handlers & processor         |
| [`@thi.ng/iterators`](./packages/iterators)                 | [![version](https://img.shields.io/npm/v/@thi.ng/iterators.svg)](https://www.npmjs.com/package/@thi.ng/iterators)                 | [changelog](./packages/iterators/CHANGELOG.md)         | ES6 generators / iterators                    |
| [`@thi.ng/paths`](./packages/paths)                         | [![version](https://img.shields.io/npm/v/@thi.ng/paths.svg)](https://www.npmjs.com/package/@thi.ng/paths)                         | [changelog](./packages/paths/CHANGELOG.md)             | Immutable nested object accessors             |
| [`@thi.ng/pointfree`](./packages/pointfree)                 | [![version](https://img.shields.io/npm/v/@thi.ng/pointfree.svg)](https://www.npmjs.com/package/@thi.ng/pointfree)                 | [changelog](./packages/pointfree/CHANGELOG.md)         | stack-based DSL & functional composition      |
| [`@thi.ng/pointfree-lang`](./packages/pointfree-lang)       | [![version](https://img.shields.io/npm/v/@thi.ng/pointfree-lang.svg)](https://www.npmjs.com/package/@thi.ng/pointfree-lang)       | [changelog](./packages/pointfree-lang/CHANGELOG.md)    | Forth-like syntax layer for @thi.ng/pointfree |
| [`@thi.ng/range-coder`](./packages/range-coder)             | [![version](https://img.shields.io/npm/v/@thi.ng/range-coder.svg)](https://www.npmjs.com/package/@thi.ng/range-coder)             | [changelog](./packages/range-coder/CHANGELOG.md)       | Binary data Range encoder / decoder           |
| [`@thi.ng/rle-pack`](./packages/rle-pack)                   | [![version](https://img.shields.io/npm/v/@thi.ng/rle-pack.svg)](https://www.npmjs.com/package/@thi.ng/rle-pack)                   | [changelog](./packages/rle-pack/CHANGELOG.md)          | Run-length encoding data compression          |
| [`@thi.ng/resolve-map`](./packages/resolve-map)             | [![version](https://img.shields.io/npm/v/@thi.ng/resolve-map.svg)](https://www.npmjs.com/package/@thi.ng/resolve-map)             | [changelog](./packages/resolve-map/CHANGELOG.md)       | DAG computations & value resolution           |
| [`@thi.ng/router`](./packages/router)                       | [![version](https://img.shields.io/npm/v/@thi.ng/router.svg)](https://www.npmjs.com/package/@thi.ng/router)                       | [changelog](./packages/router/CHANGELOG.md)            | Customizable browser & non-browser router     |
| [`@thi.ng/rstream`](./packages/rstream)                     | [![version](https://img.shields.io/npm/v/@thi.ng/rstream.svg)](https://www.npmjs.com/package/@thi.ng/rstream)                     | [changelog](./packages/rstream/CHANGELOG.md)           | Push-based, reactive event stream primitves   |
| [`@thi.ng/rstream-csp`](./packages/rstream-csp)             | [![version](https://img.shields.io/npm/v/@thi.ng/rstream-csp.svg)](https://www.npmjs.com/package/@thi.ng/rstream-csp)             | [changelog](./packages/rstream-csp/CHANGELOG.md)       | Adapter bridge CSP -> rstream                 |
| [`@thi.ng/rstream-dot`](./packages/rstream-dot)             | [![version](https://img.shields.io/npm/v/@thi.ng/rstream-dot.svg)](https://www.npmjs.com/package/@thi.ng/rstream-dot)             | [changelog](./packages/rstream-dot/CHANGELOG.md)       | Graphviz visualization of rstream topologies  |
| [`@thi.ng/rstream-gestures`](./packages/rstream-gestures)   | [![version](https://img.shields.io/npm/v/@thi.ng/rstream-gestures.svg)](https://www.npmjs.com/package/@thi.ng/rstream-gestures)   | [changelog](./packages/rstream-gestures/CHANGELOG.md)  | Mouse & touch event stream abstraction        |
| [`@thi.ng/rstream-graph`](./packages/rstream-graph)         | [![version](https://img.shields.io/npm/v/@thi.ng/rstream-graph.svg)](https://www.npmjs.com/package/@thi.ng/rstream-graph)         | [changelog](./packages/rstream-graph/CHANGELOG.md)     | Declarative dataflow graph construction       |
| [`@thi.ng/rstream-log`](./packages/rstream-log)             | [![version](https://img.shields.io/npm/v/@thi.ng/rstream-log.svg)](https://www.npmjs.com/package/@thi.ng/rstream-log)             | [changelog](./packages/rstream-log/CHANGELOG.md)       | Hierarchical structured data logging          |
| [`@thi.ng/rstream-query`](./packages/rstream-query)         | [![version](https://img.shields.io/npm/v/@thi.ng/rstream-query.svg)](https://www.npmjs.com/package/@thi.ng/rstream-query)         | [changelog](./packages/rstream-query/CHANGELOG.md)     | Triple store & query engine                   |
| [`@thi.ng/sax`](./packages/sax)                             | [![version](https://img.shields.io/npm/v/@thi.ng/sax.svg)](https://www.npmjs.com/package/@thi.ng/sax)                             | [changelog](./packages/sax/CHANGELOG.md)               | SAX-like XML parser / transducer              |
| [`@thi.ng/transducers`](./packages/transducers)             | [![version](https://img.shields.io/npm/v/@thi.ng/transducers.svg)](https://www.npmjs.com/package/@thi.ng/transducers)             | [changelog](./packages/transducers/CHANGELOG.md)       | Composable data transformations               |
| [`@thi.ng/transducers-fsm`](./packages/transducers-fsm)     | [![version](https://img.shields.io/npm/v/@thi.ng/transducers-fsm.svg)](https://www.npmjs.com/package/@thi.ng/transducers-fsm)     | [changelog](./packages/transducers-fsm/CHANGELOG.md)   | Finite State Machine                          |
| [`@thi.ng/transducers-stats`](./packages/transducers-stats) | [![version](https://img.shields.io/npm/v/@thi.ng/transducers-stats.svg)](https://www.npmjs.com/package/@thi.ng/transducers-stats) | [changelog](./packages/transducers-stats/CHANGELOG.md) | Technical / statistical analysis              |
| [`@thi.ng/unionstruct`](./packages/unionstruct)             | [![version](https://img.shields.io/npm/v/@thi.ng/unionstruct.svg)](https://www.npmjs.com/package/@thi.ng/unionstruct)             | [changelog](./packages/unionstruct/CHANGELOG.md)       | Wrapper for C-like structs / unions           |
| [`@thi.ng/vectors`](./packages/vectors)                     | [![version](https://img.shields.io/npm/v/@thi.ng/vectors.svg)](https://www.npmjs.com/package/@thi.ng/vectors)                     | [changelog](./packages/vectors/CHANGELOG.md)           | Memory-mapped vector & matrix operations      |

## Building

```bash
git clone https://github.com/thi-ng/umbrella.git
cd umbrella
yarn build
```

### Building example projects

```bash
# build all examples (from project root)
yarn examples

# in example dir
yarn dev
```

### Testing

(TODO most but not all packages have tests)

```bash
yarn test

# or individually
lerna run test --scope @thi.ng/rstream
```

### Coverage

The resulting reports will be saved under `/packages/*/coverage/lcov-report/`.

```bash
yarn cover
```

### Documentation

Autogenerated documentation (using
[TypeDoc](https://github.com/TypeStrong/typedoc)) will be saved under
`/packages/*/doc/` and is also available at [docs.thi.ng](http://docs.thi.ng).

```bash
yarn doc
```
