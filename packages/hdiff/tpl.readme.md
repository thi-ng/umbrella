# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

![screenshot of example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdiff/hdiff.png)

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

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

${pkg.deps}

${examples}

## API

${docLink}

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

${authors}

## License

&copy; ${copyright} // ${license}
