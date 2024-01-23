import { button, div } from "@thi.ng/hiccup-html";
import { $attribs, $compile } from "@thi.ng/rdom";
import { cycle } from "@thi.ng/transducers";

// infinite iterator of colors
const COLORS = cycle(["#f60", "#08f", "#f0f", "#0aa", "#390", "#80c"]);

// compile & mount DOM (incl. custom elements)
$compile(
	div(
		{},
		// 1st custom element instance, using defaults only
		// the element name is pre-registered in /src/components/component.ts
		["my-component", {}],
		// in the next instance of the custom element
		// we use a custom color & highlight all used slots
		// also note the slot order given here is irrelevant
		[
			"my-component",
			{ color: "#390", highlight: "#cfc" },
			div({ slot: "post" }, "Custom footer"),
			div(
				{},
				// use custom icon web component from /src/components/icon.ts
				["my-icon", { type: "success", size: 2 }],
				"Slotted content with nested web component"
			),
			div({ slot: "pre" }, "With slot highlighting..."),
		],
		// in the next variation we demonstrate dynamic CSS updates via
		// attribute setters by interactively randomizing the custom element's
		// `color` attrib
		[
			// Emmet-style element tag with included ID
			"my-component#foo",
			// use color from iterator
			{ color: COLORS.next().value },
			div(
				{},
				button(
					{
						// update component color attrib with next value from iterator
						// (will trigger MyComponent.attributeChangedCallback)
						onclick: () =>
							$attribs(document.getElementById("foo")!, {
								color: COLORS.next().value,
							}),
					},
					"Randomize"
				)
			),
			div({ slot: "pre" }, "Click the button to pick a new color..."),
		]
	)
).mount(document.getElementById("app")!);
