# @thi.ng/rstream-log-file

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/rstream-log-file.svg)](https://www.npmjs.com/package/@thi.ng/rstream-log-file)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/rstream-log-file.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

File output handler for
[@thi.ng/rstream-log](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-log),
providing structured, multilevel & hierarchical loggers based on
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream).
Node only package.

This feature was previously part of
[@thi.ng/rstream-log](https://github.com/thi-ng/umbrella/tree/master/packages/rstream-log),
but has been extracted to avoid build issues with bundlers. See that
package for further usage info.

## Installation

```bash
yarn add @thi.ng/rstream-log @thi.ng/rstream-log-file
```

## Dependencies

- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream)

## Usage examples

```ts
import * as log from "@thi.ng/rstream-log";
import { writeFile } from "@thi.ng/rstream-log-file";

const logger = new log.Logger("main");

// add file output w/ post-filtering (only WARN or ERROR levels)
// and formatted as JSON
const writer = logger.transform(log.minLevel(log.Level.WARN), log.formatJSON()).subscribe(writeFile("main.log"));

logger.warn("eek!");

// appended to file:
// {"level":"WARN","id":"main","time":"2018-01-23T09:05:55.647Z","body":["eek!"]}

// optionally, cancel file writer
writer.done();
```

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
