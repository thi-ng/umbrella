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

# ![@thi.ng/equiv](https://media.thi.ng/umbrella/banners-20230807/thing-equiv.svg?36534ada)

[![npm version](https://img.shields.io/npm/v/@thi.ng/equiv.svg)](https://www.npmjs.com/package/@thi.ng/equiv)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/equiv.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
  - [Implement IEquiv interface](#implement-iequiv-interface)
- [Authors](#authors)
- [License](#license)

## About

Extensible deep value equivalence checking for any data types.

Supports:

- JS primitives
- Arrays
- Plain objects
- ES6 Sets / Maps
- Date
- RegExp
- Types with
  [IEquiv](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/api/equiv.ts)
  implementation

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bequiv%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/equiv
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/equiv"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const equiv = await import("@thi.ng/equiv");
```

Package sizes (brotli'd, pre-treeshake): ESM: 436 bytes

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/equiv/)

```ts
import { equiv } from "@thi.ng/equiv";

equiv(
    { a: { b: [1, 2] } },
    { a: { b: [1, 2] } }
);
// true
```

### Implement IEquiv interface

This is useful & required for custom types to take part in `equiv`
checks, by default only plain objects & array are traversed deeply.

Furthermore, by implementing this interface we can better control which
internal values / criteria are required to establish equivalence. In
this example we exclude the `meta` property and only check for same type
& `children` equality.

```ts
import { IEquiv } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";

class Node implements IEquiv {

    meta: any;
    children: any[];

    constructor(children: any[], meta?: any) {
        this.children = children;
        this.meta = meta;
    }

    equiv(o: any) {
        return o instanceof Node && equiv(this.children, o.children);
    }
}

equiv(new Node([1,2,3], "foo"), new Node([1,2,3], "bar"));
// true
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-equiv,
  title = "@thi.ng/equiv",
  author = "Karsten Schmidt",
  note = "https://thi.ng/equiv",
  year = 2016
}
```

## License

&copy; 2016 - 2024 Karsten Schmidt // Apache License 2.0
