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

# ![@thi.ng/rstream-log-file](https://media.thi.ng/umbrella/banners-20230807/thing-rstream-log-file.svg?8bddef8d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/rstream-log-file.svg)](https://www.npmjs.com/package/@thi.ng/rstream-log-file)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-log-file.svg)
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

File output handler for structured, multilevel & hierarchical loggers based on [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream). This is a support package for [@thi.ng/rstream-log](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream-log).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brstream-log-file%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/rstream-log-file
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/rstream-log-file"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const rstreamLogFile = await import("@thi.ng/rstream-log-file");
```

Package sizes (brotli'd, pre-treeshake): ESM: 109 bytes

## Dependencies

- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)

## API

[Generated API docs](https://docs.thi.ng/umbrella/rstream-log-file/)

```ts
import * as log from "@thi.ng/rstream-log";
import { writeFile } from "@thi.ng/rstream-log-file";

const logger = new log.Logger("main");

// add file output w/ post-filtering (only WARN or ERROR levels)
// and formatted as JSON
const writer = logger
    .transform(log.minLevel(log.Level.WARN), log.formatJSON())
    .subscribe(writeFile("main.log"));

logger.warn("eek!");

// appended to file:
// {"level":"WARN","id":"main","time":"2018-01-23T09:05:55.647Z","body":["eek!"]}

// optionally, cancel file writer
writer.done();
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-rstream-log-file,
  title = "@thi.ng/rstream-log-file",
  author = "Karsten Schmidt",
  note = "https://thi.ng/rstream-log-file",
  year = 2017
}
```

## License

&copy; 2017 - 2024 Karsten Schmidt // Apache License 2.0
