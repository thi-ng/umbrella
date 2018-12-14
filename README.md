# @thi.ng/umbrella

[![Travis status](https://api.travis-ci.org/thi-ng/umbrella.svg?branch=master)](https://travis-ci.org/thi-ng/umbrella)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org/)
[![Discord chat](https://img.shields.io/discord/445761008837984256.svg)](https://discord.gg/JhYcmBw)

Mono-repository for thi.ng TypeScript/ES6 projects, a collection of
largely data transformation oriented packages and building blocks for
functional programming, reactive applications, dataflow graphs /
pipelines, components (not just UI related), all with a keen eye on
simplicity & minimalism without sacrificing flexibility.

**This project is NOT a framework**, provides no one-size-fits-all
approach and instead encourages a mix & match philosophy for various key
aspects of (web) application design. Most customization points only
expect certain interfaces rather than concrete implementations.

All / most packages:

- have detailed, individual README files w/ small usage examples
- are versioned independently
- distributed in ES6 syntax (as CommonJS modules) with doc comments
  (incl. example code snippets), bundled TypeScript typings & changelogs
- highly modular with largely only a few closely related functions or
  single function / class per file to help w/ tree shaking
- provide re-exports of all their publics for full library imports
- have either none or only @thi.ng internal runtime dependencies
- have been used in production
- declare public interfaces, enums & types in an `src/api.ts` file
  (larger packages only)
- auto-generated online documentation at [docs.thi.ng](http://docs.thi.ng)
- licensed under Apache Software License 2.0

There's a steadily growing number (~40) of standalone examples
(different difficulties, many combining functionality from several
packages) in the [examples](./examples) directory.

## Projects

### Fundamentals

| Project                                   | Version                                                                                                         | Changelog                                     | Description                                  |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------|-----------------------------------------------|----------------------------------------------|
| [`@thi.ng/api`](./packages/api)           | [![version](https://img.shields.io/npm/v/@thi.ng/api.svg)](https://www.npmjs.com/package/@thi.ng/api)           | [changelog](./packages/api/CHANGELOG.md)      | Common types, decorators, mixins             |
| [`@thi.ng/bench`](./packages/bench)       | [![version](https://img.shields.io/npm/v/@thi.ng/bench.svg)](https://www.npmjs.com/package/@thi.ng/bench)       | [changelog](./packages/bench/CHANGELOG.md)    | Basic benchmarking helpers                   |
| [`@thi.ng/checks`](./packages/checks)     | [![version](https://img.shields.io/npm/v/@thi.ng/checks.svg)](https://www.npmjs.com/package/@thi.ng/checks)     | [changelog](./packages/checks/CHANGELOG.md)   | Type & value checks                          |
| [`@thi.ng/compare`](./packages/compare)   | [![version](https://img.shields.io/npm/v/@thi.ng/compare.svg)](https://www.npmjs.com/package/@thi.ng/compare)   | [changelog](./packages/compare/CHANGELOG.md)  | Comparator                                   |
| [`@thi.ng/defmulti`](./packages/defmulti) | [![version](https://img.shields.io/npm/v/@thi.ng/defmulti.svg)](https://www.npmjs.com/package/@thi.ng/defmulti) | [changelog](./packages/defmulti/CHANGELOG.md) | Dynamic multiple dispatch                    |
| [`@thi.ng/dsp`](./packages/dsp)           | [![version](https://img.shields.io/npm/v/@thi.ng/dsp.svg)](https://www.npmjs.com/package/@thi.ng/dsp)           | [changelog](./packages/dsp/CHANGELOG.md)      | DSP utils, oscillators                       |
| [`@thi.ng/equiv`](./packages/equiv)       | [![version](https://img.shields.io/npm/v/@thi.ng/equiv.svg)](https://www.npmjs.com/package/@thi.ng/equiv)       | [changelog](./packages/equiv/CHANGELOG.md)    | Deep value equivalence checking              |
| [`@thi.ng/errors`](./packages/errors)     | [![version](https://img.shields.io/npm/v/@thi.ng/errors.svg)](https://www.npmjs.com/package/@thi.ng/errors)     | [changelog](./packages/errors/CHANGELOG.md)   | Custom error types                           |
| [`@thi.ng/math`](./packages/math)         | [![version](https://img.shields.io/npm/v/@thi.ng/math.svg)](https://www.npmjs.com/package/@thi.ng/math)         | [changelog](./packages/math/CHANGELOG.md)     | Assorted common math functions & utilities   |
| [`@thi.ng/memoize`](./packages/memoize)   | [![version](https://img.shields.io/npm/v/@thi.ng/memoize.svg)](https://www.npmjs.com/package/@thi.ng/memoize)   | [changelog](./packages/memoize/CHANGELOG.md)  | Function memoization w/ customizable caching |
| [`@thi.ng/paths`](./packages/paths)       | [![version](https://img.shields.io/npm/v/@thi.ng/paths.svg)](https://www.npmjs.com/package/@thi.ng/paths)       | [changelog](./packages/paths/CHANGELOG.md)    | Immutable nested object accessors            |
| [`@thi.ng/random`](./packages/random)     | [![version](https://img.shields.io/npm/v/@thi.ng/random.svg)](https://www.npmjs.com/package/@thi.ng/random)     | [changelog](./packages/random/CHANGELOG.md)   | Seedable PRNG implementations w/ unified API |
| [`@thi.ng/strings`](./packages/strings)   | [![version](https://img.shields.io/npm/v/@thi.ng/strings.svg)](https://www.npmjs.com/package/@thi.ng/strings)   | [changelog](./packages/strings/CHANGELOG.md)  | Higher-order string formatting utils         |

### Iterator, stream & sequence processing

| Project                                                     | Version                                                                                                                           | Changelog                                              | Description                      |
|-------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|----------------------------------|
| [`@thi.ng/csp`](./packages/csp)                             | [![version](https://img.shields.io/npm/v/@thi.ng/csp.svg)](https://www.npmjs.com/package/@thi.ng/csp)                             | [changelog](./packages/csp/CHANGELOG.md)               | Channel based async ops          |
| [`@thi.ng/iterators`](./packages/iterators)                 | [![version](https://img.shields.io/npm/v/@thi.ng/iterators.svg)](https://www.npmjs.com/package/@thi.ng/iterators)                 | [changelog](./packages/iterators/CHANGELOG.md)         | ES6 generators / iterators       |
| [`@thi.ng/sax`](./packages/sax)                             | [![version](https://img.shields.io/npm/v/@thi.ng/sax.svg)](https://www.npmjs.com/package/@thi.ng/sax)                             | [changelog](./packages/sax/CHANGELOG.md)               | SAX-like XML parser / transducer |
| [`@thi.ng/transducers`](./packages/transducers)             | [![version](https://img.shields.io/npm/v/@thi.ng/transducers.svg)](https://www.npmjs.com/package/@thi.ng/transducers)             | [changelog](./packages/transducers/CHANGELOG.md)       | Composable data transformations  |
| [`@thi.ng/transducers-fsm`](./packages/transducers-fsm)     | [![version](https://img.shields.io/npm/v/@thi.ng/transducers-fsm.svg)](https://www.npmjs.com/package/@thi.ng/transducers-fsm)     | [changelog](./packages/transducers-fsm/CHANGELOG.md)   | Finite state transducer          |
| [`@thi.ng/transducers-hdom`](./packages/transducers-hdom)   | [![version](https://img.shields.io/npm/v/@thi.ng/transducers-hdom.svg)](https://www.npmjs.com/package/@thi.ng/transducers-hdom)   | [changelog](./packages/transducers-hdom/CHANGELOG.md)  | Transducer based hdom UI updates |
| [`@thi.ng/transducers-stats`](./packages/transducers-stats) | [![version](https://img.shields.io/npm/v/@thi.ng/transducers-stats.svg)](https://www.npmjs.com/package/@thi.ng/transducers-stats) | [changelog](./packages/transducers-stats/CHANGELOG.md) | Technical / statistical analysis |

### Reactive programming

| Project                                                   | Version                                                                                                                         | Changelog                                             | Description                                  |
|-----------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|----------------------------------------------|
| [`@thi.ng/rstream`](./packages/rstream)                   | [![version](https://img.shields.io/npm/v/@thi.ng/rstream.svg)](https://www.npmjs.com/package/@thi.ng/rstream)                   | [changelog](./packages/rstream/CHANGELOG.md)          | Push-based, reactive event stream primitves  |
| [`@thi.ng/rstream-csp`](./packages/rstream-csp)           | [![version](https://img.shields.io/npm/v/@thi.ng/rstream-csp.svg)](https://www.npmjs.com/package/@thi.ng/rstream-csp)           | [changelog](./packages/rstream-csp/CHANGELOG.md)      | Adapter bridge CSP -> rstream                |
| [`@thi.ng/rstream-dot`](./packages/rstream-dot)           | [![version](https://img.shields.io/npm/v/@thi.ng/rstream-dot.svg)](https://www.npmjs.com/package/@thi.ng/rstream-dot)           | [changelog](./packages/rstream-dot/CHANGELOG.md)      | Graphviz visualization of rstream topologies |
| [`@thi.ng/rstream-gestures`](./packages/rstream-gestures) | [![version](https://img.shields.io/npm/v/@thi.ng/rstream-gestures.svg)](https://www.npmjs.com/package/@thi.ng/rstream-gestures) | [changelog](./packages/rstream-gestures/CHANGELOG.md) | Mouse & touch event stream abstraction       |
| [`@thi.ng/rstream-graph`](./packages/rstream-graph)       | [![version](https://img.shields.io/npm/v/@thi.ng/rstream-graph.svg)](https://www.npmjs.com/package/@thi.ng/rstream-graph)       | [changelog](./packages/rstream-graph/CHANGELOG.md)    | Declarative dataflow graph construction      |
| [`@thi.ng/rstream-log`](./packages/rstream-log)           | [![version](https://img.shields.io/npm/v/@thi.ng/rstream-log.svg)](https://www.npmjs.com/package/@thi.ng/rstream-log)           | [changelog](./packages/rstream-log/CHANGELOG.md)      | Hierarchical structured data logging         |
| [`@thi.ng/rstream-query`](./packages/rstream-query)       | [![version](https://img.shields.io/npm/v/@thi.ng/rstream-query.svg)](https://www.npmjs.com/package/@thi.ng/rstream-query)       | [changelog](./packages/rstream-query/CHANGELOG.md)    | Triple store & query engine                  |

### Data structures

| Project                                         | Version                                                                                                               | Changelog                                        | Description                              |
|-------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|------------------------------------------|
| [`@thi.ng/associative`](./packages/associative) | [![version](https://img.shields.io/npm/v/@thi.ng/associative.svg)](https://www.npmjs.com/package/@thi.ng/associative) | [changelog](./packages/associative/CHANGELOG.md) | Alt Set & Map implementations            |
| [`@thi.ng/atom`](./packages/atom)               | [![version](https://img.shields.io/npm/v/@thi.ng/atom.svg)](https://www.npmjs.com/package/@thi.ng/atom)               | [changelog](./packages/atom/CHANGELOG.md)        | Immutable value wrappers, views, history |
| [`@thi.ng/cache`](./packages/cache)             | [![version](https://img.shields.io/npm/v/@thi.ng/cache.svg)](https://www.npmjs.com/package/@thi.ng/cache)             | [changelog](./packages/cache/CHANGELOG.md)       | In-memory caches / strategies            |
| [`@thi.ng/dcons`](./packages/dcons)             | [![version](https://img.shields.io/npm/v/@thi.ng/dcons.svg)](https://www.npmjs.com/package/@thi.ng/dcons)             | [changelog](./packages/dcons/CHANGELOG.md)       | Doubly-linked list                       |
| [`@thi.ng/diff`](./packages/diff)               | [![version](https://img.shields.io/npm/v/@thi.ng/diff.svg)](https://www.npmjs.com/package/@thi.ng/diff)               | [changelog](./packages/diff/CHANGELOG.md)        | Array & object diffing                   |
| [`@thi.ng/dgraph`](./packages/dgraph)           | [![version](https://img.shields.io/npm/v/@thi.ng/dgraph.svg)](https://www.npmjs.com/package/@thi.ng/dgraph)           | [changelog](./packages/dgraph/CHANGELOG.md)      | Dependency graph                         |
| [`@thi.ng/heaps`](./packages/heaps)             | [![version](https://img.shields.io/npm/v/@thi.ng/heaps.svg)](https://www.npmjs.com/package/@thi.ng/heaps)             | [changelog](./packages/heaps/CHANGELOG.md)       | Binary & d-ary heap impls                |
| [`@thi.ng/resolve-map`](./packages/resolve-map) | [![version](https://img.shields.io/npm/v/@thi.ng/resolve-map.svg)](https://www.npmjs.com/package/@thi.ng/resolve-map) | [changelog](./packages/resolve-map/CHANGELOG.md) | DAG computations & value resolution      |

### Frontend / UI

| Project                                                         | Version                                                                                                                               | Changelog                                                | Description                                      |
|-----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|--------------------------------------------------|
| [`@thi.ng/hdom`](./packages/hdom)                               | [![version](https://img.shields.io/npm/v/@thi.ng/hdom.svg)](https://www.npmjs.com/package/@thi.ng/hdom)                               | [changelog](./packages/hdom/CHANGELOG.md)                | Hiccup based VDOM & diffing                      |
| [`@thi.ng/hdom-canvas`](./packages/hdom-canvas)                 | [![version](https://img.shields.io/npm/v/@thi.ng/hdom-canvas.svg)](https://www.npmjs.com/package/@thi.ng/hdom-canvas)                 | [changelog](./packages/hdom-canvas/CHANGELOG.md)         | hdom based declarative canvas drawing            |
| [`@thi.ng/hdom-components`](./packages/hdom-components)         | [![version](https://img.shields.io/npm/v/@thi.ng/hdom-components.svg)](https://www.npmjs.com/package/@thi.ng/hdom-components)         | [changelog](./packages/hdom-components/CHANGELOG.md)     | hdom based UI components                         |
| [`@thi.ng/hdom-mock`](./packages/hdom-mock)                     | [![version](https://img.shields.io/npm/v/@thi.ng/hdom-mock.svg)](https://www.npmjs.com/package/@thi.ng/hdom-mock)                     | [changelog](./packages/hdom-mock/CHANGELOG.md)           | hdom mock implementation (testing / prototyping) |
| [`@thi.ng/hiccup`](./packages/hiccup)                           | [![version](https://img.shields.io/npm/v/@thi.ng/hiccup.svg)](https://www.npmjs.com/package/@thi.ng/hiccup)                           | [changelog](./packages/hiccup/CHANGELOG.md)              | S-expression based HTML/XML serialization        |
| [`@thi.ng/hiccup-carbon-icons`](./packages/hiccup-carbon-icons) | [![version](https://img.shields.io/npm/v/@thi.ng/hiccup-carbon-icons.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-carbon-icons) | [changelog](./packages/hiccup-carbon-icons/CHANGELOG.md) | IBM Carbon icons in hiccup format                |
| [`@thi.ng/hiccup-css`](./packages/hiccup-css)                   | [![version](https://img.shields.io/npm/v/@thi.ng/hiccup-css.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-css)                   | [changelog](./packages/hiccup-css/CHANGELOG.md)          | CSS from nested JS data structures               |
| [`@thi.ng/hiccup-svg`](./packages/hiccup-svg)                   | [![version](https://img.shields.io/npm/v/@thi.ng/hiccup-svg.svg)](https://www.npmjs.com/package/@thi.ng/hiccup-svg)                   | [changelog](./packages/hiccup-svg/CHANGELOG.md)          | hiccup based SVG vocab                           |
| [`@thi.ng/interceptors`](./packages/interceptors)               | [![version](https://img.shields.io/npm/v/@thi.ng/interceptors.svg)](https://www.npmjs.com/package/@thi.ng/interceptors)               | [changelog](./packages/interceptors/CHANGELOG.md)        | Composable event handlers & processor            |
| [`@thi.ng/router`](./packages/router)                           | [![version](https://img.shields.io/npm/v/@thi.ng/router.svg)](https://www.npmjs.com/package/@thi.ng/router)                           | [changelog](./packages/router/CHANGELOG.md)              | Customizable browser & non-browser router        |

### Geometry & visualization

| Project                                       | Version                                                                                                             | Changelog                                       | Description                              |
|-----------------------------------------------|---------------------------------------------------------------------------------------------------------------------|-------------------------------------------------|------------------------------------------|
| [`@thi.ng/dot`](./packages/dot)               | [![version](https://img.shields.io/npm/v/@thi.ng/dot.svg)](https://www.npmjs.com/package/@thi.ng/dot)               | [changelog](./packages/dot/CHANGELOG.md)        | Graphviz DOM & export                    |
| [`@thi.ng/geom`](./packages/geom)             | [![version](https://img.shields.io/npm/v/@thi.ng/geom.svg)](https://www.npmjs.com/package/@thi.ng/geom)             | [changelog](./packages/geom/CHANGELOG.md)       | 2D geometry types & operations           |
| [`@thi.ng/geom-accel`](./packages/geom-accel) | [![version](https://img.shields.io/npm/v/@thi.ng/geom-accel.svg)](https://www.npmjs.com/package/@thi.ng/geom-accel) | [changelog](./packages/geom-accel/CHANGELOG.md) | Spatial indexing data structures         |
| [`@thi.ng/iges`](./packages/iges)             | [![version](https://img.shields.io/npm/v/@thi.ng/iges.svg)](https://www.npmjs.com/package/@thi.ng/iges)             | [changelog](./packages/iges/CHANGELOG.md)       | IGES format geometry serialization       |
| [`@thi.ng/vectors`](./packages/vectors)       | [![version](https://img.shields.io/npm/v/@thi.ng/vectors.svg)](https://www.npmjs.com/package/@thi.ng/vectors)       | [changelog](./packages/vectors/CHANGELOG.md)    | Memory-mapped vector & matrix operations |

### Low-level, binary, memory management

| Project                                         | Version                                                                                                               | Changelog                                        | Description                               |
|-------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|-------------------------------------------|
| [`@thi.ng/binary`](./packages/binary)           | [![version](https://img.shields.io/npm/v/@thi.ng/binary.svg)](https://www.npmjs.com/package/@thi.ng/binary)           | [changelog](./packages/binary/CHANGELOG.md)      | Assorted binary / bitwise ops, utilities  |
| [`@thi.ng/bitstream`](./packages/bitstream)     | [![version](https://img.shields.io/npm/v/@thi.ng/bitstream.svg)](https://www.npmjs.com/package/@thi.ng/bitstream)     | [changelog](./packages/bitstream/CHANGELOG.md)   | Bitwise input / output streams            |
| [`@thi.ng/dlogic`](./packages/dlogic)           | [![version](https://img.shields.io/npm/v/@thi.ng/dlogic.svg)](https://www.npmjs.com/package/@thi.ng/dlogic)           | [changelog](./packages/dlogic/CHANGELOG.md)      | Digital logic ops / constructs            |
| [`@thi.ng/malloc`](./packages/malloc)           | [![version](https://img.shields.io/npm/v/@thi.ng/malloc.svg)](https://www.npmjs.com/package/@thi.ng/malloc)           | [changelog](./packages/malloc/CHANGELOG.md)      | Raw & typed array memory pool & allocator |
| [`@thi.ng/morton`](./packages/morton)           | [![version](https://img.shields.io/npm/v/@thi.ng/morton.svg)](https://www.npmjs.com/package/@thi.ng/morton)           | [changelog](./packages/morton/CHANGELOG.md)      | Z-order-curve / Morton coding             |
| [`@thi.ng/range-coder`](./packages/range-coder) | [![version](https://img.shields.io/npm/v/@thi.ng/range-coder.svg)](https://www.npmjs.com/package/@thi.ng/range-coder) | [changelog](./packages/range-coder/CHANGELOG.md) | Binary data Range encoder / decoder       |
| [`@thi.ng/rle-pack`](./packages/rle-pack)       | [![version](https://img.shields.io/npm/v/@thi.ng/rle-pack.svg)](https://www.npmjs.com/package/@thi.ng/rle-pack)       | [changelog](./packages/rle-pack/CHANGELOG.md)    | Run-length encoding data compression      |
| [`@thi.ng/unionstruct`](./packages/unionstruct) | [![version](https://img.shields.io/npm/v/@thi.ng/unionstruct.svg)](https://www.npmjs.com/package/@thi.ng/unionstruct) | [changelog](./packages/unionstruct/CHANGELOG.md) | Wrapper for C-like structs / unions       |

### DSLs

| Project                                               | Version                                                                                                                     | Changelog                                           | Description                                   |
|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|-----------------------------------------------|
| [`@thi.ng/pointfree`](./packages/pointfree)           | [![version](https://img.shields.io/npm/v/@thi.ng/pointfree.svg)](https://www.npmjs.com/package/@thi.ng/pointfree)           | [changelog](./packages/pointfree/CHANGELOG.md)      | Stack-based DSL & functional composition      |
| [`@thi.ng/pointfree-lang`](./packages/pointfree-lang) | [![version](https://img.shields.io/npm/v/@thi.ng/pointfree-lang.svg)](https://www.npmjs.com/package/@thi.ng/pointfree-lang) | [changelog](./packages/pointfree-lang/CHANGELOG.md) | Forth-like syntax layer for @thi.ng/pointfree |

### Experimental packages (WIP / unreleased)

- [@thi.ng/geom2](https://github.com/thi-ng/umbrella/tree/feature/vec-refactor/packages/geom2)
- [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/feature/vec-refactor/packages/matrices)
- [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/feature/vec-refactor/packages/vector-pools)
- [@thi.ng/vectors3](https://github.com/thi-ng/umbrella/tree/feature/vec-refactor/packages/vectors3)

## Building

```bash
git clone https://github.com/thi-ng/umbrella.git
cd umbrella
yarn build
```

### Building example projects

The below `yarn examples` command assumes you have the
[parcel](https://parceljs.org) bundler &
[terser](https://github.com/fabiosantoscode/terser) minifier globally
installed, if not then please first run:

```bash
yarn global add parcel-bundler terser
```

```bash
# build all examples (from project root)
yarn examples

# build a single example (production mode)
scripts/build-examples example-name

# in example dir
yarn build
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
