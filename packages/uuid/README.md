<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/uuid](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-uuid.svg?08610c5d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/uuid.svg)](https://www.npmjs.com/package/@thi.ng/uuid)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/uuid.svg)
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
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Fast binary & string-based UUID v4 generation.

This package contains functionality which was previously part of and has been
extracted from the [@thi.ng/random](https://thi.ng/random) package.

- [`uuidv4Bytes()`](https://docs.thi.ng/umbrella/uuid/functions/uuidv4Bytes.html)
- [`uuid()`](https://docs.thi.ng/umbrella/uuid/functions/uuid.html)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Buuid%5D)

## Installation

```bash
yarn add @thi.ng/uuid
```

ESM import:

```ts
import * as uuid from "@thi.ng/uuid";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/uuid"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const uuid = await import("@thi.ng/uuid");
```

Package sizes (brotli'd, pre-treeshake): ESM: 194 bytes

## Dependencies

- [@thi.ng/hex](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hex)
- [@thi.ng/random](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/random)

## API

[Generated API docs](https://docs.thi.ng/umbrella/uuid/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-uuid,
  title = "@thi.ng/uuid",
  author = "Karsten Schmidt",
  note = "https://thi.ng/uuid",
  year = 2020
}
```

## License

&copy; 2020 - 2026 Karsten Schmidt // Apache License 2.0
