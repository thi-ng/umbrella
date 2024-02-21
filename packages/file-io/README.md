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

# ![@thi.ng/file-io](https://media.thi.ng/umbrella/banners-20230807/thing-file-io.svg?86fa755f)

[![npm version](https://img.shields.io/npm/v/@thi.ng/file-io.svg)](https://www.npmjs.com/package/@thi.ng/file-io)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/file-io.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
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
- [Authors](#authors)
- [License](#license)

## About

Assorted file I/O utils (with logging support) for NodeJS.

Most functions in this package have optional support for the
[`ILogger`](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
logging interface.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bfile-io%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/file-io
```

For Node.js REPL:

```js
const fileIo = await import("@thi.ng/file-io");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.98 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/develop/packages/hex)
- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)

## API

[Generated API docs](https://docs.thi.ng/umbrella/file-io/)

TODO

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-file-io,
  title = "@thi.ng/file-io",
  author = "Karsten Schmidt",
  note = "https://thi.ng/file-io",
  year = 2022
}
```

## License

&copy; 2022 - 2024 Karsten Schmidt // Apache License 2.0
