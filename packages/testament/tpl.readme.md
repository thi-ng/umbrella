# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

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

${docLink}

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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
