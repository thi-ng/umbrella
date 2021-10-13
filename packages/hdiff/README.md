<!-- This file is generated - DO NOT EDIT! -->

# ![hdiff](https://media.thi.ng/umbrella/banners/thing-hdiff.svg?421a59f3)

[![npm version](https://img.shields.io/npm/v/@thi.ng/hdiff.svg)](https://www.npmjs.com/package/@thi.ng/hdiff)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/hdiff.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
  - [CLI installation & usage](#cli-installation--usage)
- [Dependencies](#dependencies)
- [API](#api)
  - [computeDiff()](#computediff)
  - [generateHtml()](#generatehtml)
  - [compileTheme()](#compiletheme)
- [Authors](#authors)
- [License](#license)

## About

String diffing w/ hiccup output for further processing, e.g. with [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom), [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup). Includes CLI util to generate HTML, with theme support and code folding.

![screenshot of example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdiff/hdiff.png)

[Live example](https://demo.thi.ng/umbrella/hdiff/)

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bhdiff%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/hdiff
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/hdiff"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const hdiff = await import("@thi.ng/hdiff");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.57 KB

### CLI installation & usage

Current limitations:

- output always written to stdout only
- only single theme available for now (easy to add new ones, PRs welcome!)

```bash
npx @thi.ng/hdiff

# any text files
npx hdiff file-a.txt file-b.txt > diff.html

# git revisions for given file (in local repo)
# rev can be any commit-ish ID understood by git (sha1, tag, etc.)
npx hdiff rel-file-path rev1 rev2 > diff.html

# example
npx hdiff packages/webgl/src/shader.ts develop~500 HEAD > diff.html
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/diff](https://github.com/thi-ng/umbrella/tree/develop/packages/diff)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-css)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## API

[Generated API docs](https://docs.thi.ng/umbrella/hdiff/)

### computeDiff()

Signature: `computeDiff(a: string, b: string) => any[]`

Takes two strings and performs line-based diff, then formats result as
tree of HTML elements in
[@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
format.

The generated format only uses the following data attributes:

- `data-diff`: diff status for each `code` line (`"+"`, `"-"` or `" "`)
- `data-lnum`: formatted line number for each `code` line
- `data-fold`: indicates folded `pre`-block
- `data-fold-range`: line number range string

### generateHtml()

Signature: `generateHtml(header: any[], body: any[], theme: Theme) => string`

Takes two hiccup trees for header and body and an optional theme.
Compiles theme into CSS, serializes hiccup trees and returns complete
HTML document as string.

### compileTheme()

Signature: `compileTheme(theme: Theme) => string`

Compiles a theme config into a complete CSS stylesheet string (using
[@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-css)).

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-hdiff,
  title = "@thi.ng/hdiff",
  author = "Karsten Schmidt",
  note = "https://thi.ng/hdiff",
  year = 2018
}
```

## License

&copy; 2018 - 2021 Karsten Schmidt // Apache Software License 2.0
