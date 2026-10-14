<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

```ts tangle:exports/readme-1.ts

const cleaned = sanitize(
	[
		"div",
		{ id: "foo", class: "a", onerror: "alert(1)" },
		["span", {}, "b"],
		["p", {}, "c", ["br", {}], "d"],
	],
	{
		// remove ID and event attributes
		removeAttribs: ["id", /^on\w+/],
		// remove <span> & <br> elements
		removeElements: ["span", "br"],
	}
);

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
