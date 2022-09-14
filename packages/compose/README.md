<!-- This file is generated - DO NOT EDIT! -->

# ![compose](https://media.thi.ng/umbrella/banners-20220914/thing-compose.svg?4cdb7e5d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/compose.svg)](https://www.npmjs.com/package/@thi.ng/compose)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/compose.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Optimized functional composition helpers.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcompose%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/compose
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/compose"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const compose = await import("@thi.ng/compose");
```

Package sizes (gzipped, pre-treeshake): ESM: 871 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/compose/)

- [comp()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/comp.ts)
- [compL()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/comp.ts#L52)
- [juxt()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/juxt.ts)
- [partial()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/partial.ts)
- [threadFirst()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/thread-first.ts)
- [threadLast()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/thread-last.ts)
- [trampoline()](https://github.com/thi-ng/umbrella/tree/develop/packages/compose/src/trampoline.ts)

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-compose,
  title = "@thi.ng/compose",
  author = "Karsten Schmidt",
  note = "https://thi.ng/compose",
  year = 2016
}
```

## License

&copy; 2016 - 2022 Karsten Schmidt // Apache Software License 2.0
