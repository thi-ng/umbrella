import { identity } from "@thi.ng/api";
import { div, h3 } from "@thi.ng/hiccup-html";
import { $compile, $switch } from "@thi.ng/rdom";
import { APP_STATE, APP_STATES } from "./state.js";

// main app UI component is a simple switch which delagates to other components
// based on current app state (see /src/state.ts)
$compile(
	div(
		".ma3.f6",
		{},
		h3(".ma0", {}, "Jaccard similarity"),
		// https://docs.thi.ng/umbrella/rdom/functions/_switch.html
		$switch(APP_STATE, identity, APP_STATES)
	)
).mount(document.getElementById("app")!);
