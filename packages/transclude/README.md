<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/transclude](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-transclude.svg?652d2a29)

[![npm version](https://img.shields.io/npm/v/@thi.ng/transclude.svg)](https://www.npmjs.com/package/@thi.ng/transclude)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/transclude.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

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
[`/tools/src/readme.ts`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/tools/src/readme.ts)
for a concrete usage example...

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Btransclude%5D)

## Related packages

- [@thi.ng/hiccup-markdown](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hiccup-markdown) - Markdown parser & serializer from/to Hiccup format
- [@thi.ng/markdown-table](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/markdown-table) - Markdown table formatter/generator with support for column alignments
- [@thi.ng/proctext](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/proctext) - Extensible procedural text generation engine with dynamic, mutable state, indirection, randomizable & recursive variable expansions
- [@thi.ng/tangle](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/tangle) - Literate programming code block tangling / codegen utility, inspired by org-mode & noweb

## Installation

```bash
yarn add @thi.ng/transclude
```

ESM import:

```ts
import * as tra from "@thi.ng/transclude";
```

For Node.js REPL:

```js
const tra = await import("@thi.ng/transclude");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.96 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/file-io](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/file-io)
- [@thi.ng/logger](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/logger)
- [@thi.ng/strings](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/strings)
- [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/transducers)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

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

&copy; 2022 - 2026 Karsten Schmidt // Apache License 2.0
