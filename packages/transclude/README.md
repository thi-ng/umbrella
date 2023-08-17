<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/transclude](https://media.thi.ng/umbrella/banners-20230807/thing-transclude.svg?f63d93c4)

[![npm version](https://img.shields.io/npm/v/@thi.ng/transclude.svg)](https://www.npmjs.com/package/@thi.ng/transclude)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/transclude.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Extensible functional template engine for text document generation, incl. various high-level Markdown features.

This package evolved from this monorepo's readme generator toolchain and
currently is mainly used to generate all ~350 readme & changelog files in this
repo, but otherwise is **not** bound to this project in any way.

Please see
[`/tools/src/readme.ts`](https://github.com/thi-ng/umbrella/blob/develop/tools/src/readme.ts)
for a concrete usage example...

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btransclude%5D+in%3Atitle)

## Related packages

- [@thi.ng/hiccup-markdown](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-markdown) - Markdown parser & serializer from/to Hiccup format
- [@thi.ng/markdown-table](https://github.com/thi-ng/umbrella/tree/develop/packages/markdown-table) - Markdown table formatter/generator with support for column alignments
- [@thi.ng/tangle](https://github.com/thi-ng/umbrella/tree/develop/packages/tangle) - Literate programming code block tangling / codegen utility, inspired by org-mode & noweb

## Installation

```bash
yarn add @thi.ng/transclude
```

For Node.js REPL:

```js
const transclude = await import("@thi.ng/transclude");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.86 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/file-io](https://github.com/thi-ng/umbrella/tree/develop/packages/file-io)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## API

[Generated API docs](https://docs.thi.ng/umbrella/transclude/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-transclude,
  title = "@thi.ng/transclude",
  author = "Karsten Schmidt",
  note = "https://thi.ng/transclude",
  year = 2022
}
```

## License

&copy; 2022 - 2023 Karsten Schmidt // Apache License 2.0
