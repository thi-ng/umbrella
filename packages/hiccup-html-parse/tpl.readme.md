<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

<!-- include ../../assets/tpl/footer.md -->
