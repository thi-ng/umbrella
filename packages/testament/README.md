<!-- This file is generated - DO NOT EDIT! -->

# ![testament](https://media.thi.ng/umbrella/banners/thing-testament.svg?45130c5c)

[![npm version](https://img.shields.io/npm/v/@thi.ng/testament.svg)](https://www.npmjs.com/package/@thi.ng/testament)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/testament.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [CLI](#cli)
  - [Result exports](#result-exports)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Minimal, rational & TypeScript-friendly test runner, result export as CSV/JSON, watch mode.

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btestament%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/testament
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/testament"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const testament = await import("@thi.ng/testament");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.04 KB

## Dependencies

- [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/develop/packages/logger)
- [chokidar](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

## CLI

The library includes a CLI runner to execute tests in various files once, or
watch them for changes and then re-execute any changed files. Options and file
paths can be given in any order.

```bash
testament --help

# Usage: testament [opts] path1 [path2...]
#
# Options:
# --all, -a        Run all tests (don't stop at 1st failure)
# --csv            Export results as CSV
# --json           Export results as JSON
# -o               Output file path for exported results
# --timeout, -t    Set default timeout value (milliseconds)
# --watch, -w      Watch given files/dirs for changes
#
# --help, -h       Print this help and quit
```

**Note:** The CLI tool respects the [`NO_COLOR`](https://no-color.org/) convention.

### Result exports

Test results can be exported in CSV or JSON formats. To include failed tests, make sure you include the `--all`/`-a` CLI flag. If no output file (`-o`) is given, the results will be written to stdout

```bash
testament --all --csv -o results.csv test

testament --all --json -o results.json test
```

The following details are recorded per test case:

- **group**: Parent group ID/title
- **title**: Test title/descriptor
- **time**: Time taken (incl. retries) in milliseconds (rounded)
- **trials**: Number of trials taken
- **error**: Error message, failure reason

## API

[Generated API docs](https://docs.thi.ng/umbrella/testament/)

Groups of test cases can be specified via `group()`. The tests are NOT executed
immediately until `execute()` is being called (done automatically when using the
CLI wrapper). All tests within the group will share the (optionally) provided
configuration options (which themselves will be stubbed using `GLOBAL_OPTS`).

If a test is async, use the passed `TestCtx` handlers (esp. `done()` and
`setTimeout()`) to ensure timeouts and any errors or test failures are handled
properly.

If a test case function makes use of the provided `TestCtx` arg in any way, it
**MUST** call `done()`, since _testament_ assumes it is an async case.

Any uncaught errors thrown in the group's lifecycle handlers will not be caught
by the group wrapper either (In fact, they will be caught, but then
re-thrown...). Furthermore, if the `exit` option is true (default), any uncaught
error will cause the entire process to terminate (unless running a browser).

See docs for full options

```ts
import { group, execute } from "@thi.ng/testament";
import { assert } from "@thi.ng/errors";

// register group of test cases
group(
  "basics",
  {
    add: () => { assert(1 + 1 === 2); },
    sub: ({ done, setTimeout }) => {
      setTimeout(() => { assert(3 - 1 === 1); done(); }, 50);
    }
  },
  // shared options for all cases in the group
  {
    maxTries: 3,
    timeOut: 100,
    beforeEach: ({ logger }) => logger.info("before"),
    afterEach: ({ logger }) => logger.info("after"),
  }
);

// only needed if NOT using the CLI runner
const results = await execute();
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-testament,
  title = "@thi.ng/testament",
  author = "Karsten Schmidt",
  note = "https://thi.ng/testament",
  year = 2021
}
```

## License

&copy; 2021 - 2022 Karsten Schmidt // Apache Software License 2.0
