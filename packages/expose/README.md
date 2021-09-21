<!-- This file is generated - DO NOT EDIT! -->

# ![expose](https://media.thi.ng/umbrella/banners/thing-expose.svg?3e1d3e1f)

[![npm version](https://img.shields.io/npm/v/@thi.ng/expose.svg)](https://www.npmjs.com/package/@thi.ng/expose)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/expose.svg)
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

Conditional global variable exposition.

This package provides a single function
[`exposeGlobal()`](https://docs.thi.ng/umbrella/expose/modules.html#exposeGlobal)
to expose a variable in the global scope (e.g. for development/debugging
purposes). It's behavior is controled by the `UMBRELLA_GLOBALS` or
`SNOWPACK_PUBLIC_UMBRELLA_GLOBALS` environment variables - if either is set (to
a non-empty string) the function will **always** be enabled. Otherwise (by
default), `exposeGlobal()` is **disabled for production builds**, i.e. if
`process.env.NODE_ENV === "production"`.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bexpose%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/expose
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/expose"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const expose = await import("@thi.ng/expose");
```

## Dependencies

None

## API

[Generated API docs](https://docs.thi.ng/umbrella/expose/)

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-expose,
  title = "@thi.ng/expose",
  author = "Karsten Schmidt",
  note = "https://thi.ng/expose",
  year = 2016
}
```

## License

&copy; 2016 - 2021 Karsten Schmidt // Apache Software License 2.0
