<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

Note: This parser is intended to work with formed HTML and will likely fail for
any "quirky" (aka dodgy) markup...

### Basic usage

```ts tangle:export/readme.ts
import { parseHtml } from "@thi.ng/hiccup-html-parse";

const src = `<!doctype html>
<html lang="en">
<head>
	<script lang="javascript">
console.log("</"+"script>");
	</script>
	<style>
body { margin: 0; }
	</style>
</head>
<body>
	<div id="foo" bool data-xyz="123" empty=''>
	<a href="#bar">baz <b>bold</b></a><br/>
	</div>
</body>
</html>`;

const result = parseHtml(src);

console.log(result.type);
// "success"

console.log(result.result);

// [
//   ["html", { lang: "en" },
//     ["head", {},
//       ["script", { lang: "javascript" }, "console.log(\"</\"+\"script>\");" ],
//       ["style", {}, "body { margin: 0; }"] ],
//     ["body", {},
//       ["div", { id: "foo", bool: true, "data-xyz": "123" },
//         ["a", { href: "#bar" },
//           "baz ",
//           ["b", {}, "bold"]],
//         ["br", {}]]]]
// ]
```

### Parsing & transformation options

Parser behavior & results can be customized via supplied options and user
transformation functions:

| Option           | Description                          | Default |
|------------------|--------------------------------------|---------|
| `ignoreElements` | Array of element names to ignore     | []      |
| `ignoreAttribs`  | Array of attribute names to ignore   | []      |
| `comments`       | Keep `<!-- ... -->` comments         | false   |
| `doctype`        | Keep `<!doctype ...>` element        | false   |
| `whitespace`     | Keep whitespace-only text bodies     | false   |
| `dataAttribs`    | Keep data attribs                    | true    |
| `tx`             | Element transform/filter function    |         |
| `txBody`         | Plain text transform/filter function |         |

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

TODO

## Benchmarks

Results from the
[benchmark](https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup-html-parse/bench/index.ts)
parsing the HTML of the [thi.ng](https://thi.ng) website (MBA M1 2021, 16GB RAM,
Node.js v20.5.1):

```text
benchmarking: thi.ng html (87.97 KB)
        warmup... 1951.76ms (100 runs)
        total: 19375.49ms, runs: 1000 (@ 1 calls/iter)
        mean: 19.38ms, median: 19.26ms, range: [18.12..28.45]
        q1: 18.75ms, q3: 19.68ms
        sd: 4.66%
```

<!-- include ../../assets/tpl/footer.md -->
