<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

```ts tangle:exports/readme-1.ts
import { sanitize } from "@thi.ng/hiccup-sanitize";

// hiccup source document
const doc = [
	"div",
	{ id: "foo", class: "a", onerror: "alert(1)" },
	["span", {}, "b"],
	["p", {}, "c", ["br", {}], "d"],
];

// sanitze document
const cleaned = sanitize(
	doc,
	{
		// remove ID and event attributes
		removeAttribs: ["id", /^on\w+/],
		// remove <span> & <br> elements
		removeElements: ["span", "br"],
	}
);

console.log(cleaned);
// ["div", { class: "a" }, ["p", {}, "c", "d"]]
```

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
