<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/object-utils](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-object-utils.svg?ede54c24)

[![npm version](https://img.shields.io/npm/v/@thi.ng/object-utils.svg)](https://www.npmjs.com/package/@thi.ng/object-utils)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/object-utils.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 209 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Features](#features)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Utilities for manipulating plain JS objects & maps.

This package contains functionality which was previously part of and has been
extracted from the [@thi.ng/associative](https://thi.ng/associative) package.

### Features

- Key-value pair inversion for maps and vanilla objects, i.e. swaps `K => V` to `V => K`
- Single or multi-property index generation for maps and objects
- Key selection, renaming, segmenting, splitting, transformations for maps and
  objects
- Deep-merging (destructively & non-destructively) of objects/maps

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bobject-utils%5D+in%3Atitle)

## Related packages

- [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/develop/packages/associative) - ES Map/Set-compatible implementations with customizable equality semantics & supporting operations

## Installation

```bash
yarn add @thi.ng/object-utils
```

ESM import:

```ts
import * as ou from "@thi.ng/object-utils";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/object-utils"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const ou = await import("@thi.ng/object-utils");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.20 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## API

[Generated API docs](https://docs.thi.ng/umbrella/object-utils/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-object-utils,
  title = "@thi.ng/object-utils",
  author = "Karsten Schmidt",
  note = "https://thi.ng/object-utils",
  year = 2017
}
```

## License

&copy; 2017 - 2025 Karsten Schmidt // Apache License 2.0
