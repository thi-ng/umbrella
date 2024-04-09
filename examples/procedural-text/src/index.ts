import { br, button, div, h1, main, para, textArea } from "@thi.ng/hiccup-html";
import { SYSTEM } from "@thi.ng/random";
import { $compile, $input, $inputTrigger, $replace } from "@thi.ng/rdom";
import { staticDropdownAlt } from "@thi.ng/rdom-components";
import { reactive, stream } from "@thi.ng/rstream";
import { filter, interpose } from "@thi.ng/transducers";
import { base64Decode, base64Encode } from "@thi.ng/transducers-binary";
import STORY1 from "./stories/alice-bob.txt";
import STORY2 from "./stories/modifiers.txt";
import STORY3 from "./stories/hidden-assignment.txt";
import STORY4 from "./stories/dynamic-lookups.txt";
import STORY5 from "./stories/ngrams-5.txt";
import { generateStory } from "./story.js";

const STORIES = {
	"Alice & Bob": STORY1,
	Modifiers: STORY2,
	"Hidden assignments": STORY3,
	"Dynamic lookups": STORY4,
	"N-grams": STORY5,
	Custom: "",
};

const initial =
	location.hash.length > 1
		? new TextDecoder().decode(base64Decode(location.hash.substring(1)))
		: "";

// reactive state values
// regeneration trigger
const regenerate = reactive(true);
// story source code (initially idle)
const storyInput = stream<string>();
// story template chooser with attached dynamic loader
const storyID = reactive<keyof typeof STORIES>(
	initial ? "Custom" : "Alice & Bob"
);

storyID.transform(filter((x) => x !== "Custom")).subscribe({
	next: async (id) => {
		// look up & load related preset URL
		const response = await fetch(STORIES[id]);
		// place result into stream (will also update editor)
		storyInput.next(await response.text());
		// trigger story regeneration
		regenerate.next(true);
		// force editor to show beginning of file
		const editor = <HTMLTextAreaElement>document.getElementById("editor")!;
		editor.selectionStart = editor.selectionEnd = 0;
	},
});

// story generation subscription
const generated = regenerate.map(() => {
	// check if we have any input, bail if not...
	const input = storyInput.deref();
	if (!input) return div();
	// parse input & generate story
	const result = generateStory(input, { vars: {}, rnd: SYSTEM });
	// possibly return error message
	if (result.err) {
		return div(".error", {}, result.err.message);
	} else {
		return div(
			".output",
			{},
			// post-process generated text to handle paragraphs & linebreaks
			...result.result
				.trim()
				.split(/\n{2,}/g)
				.map((x) => para(".mt0", {}, interpose(br(), x.split("\n"))))
		);
	}
});

// add another subscription to update the URL hash with an base64 encoded
// version of the input...
regenerate.subscribe({
	next() {
		location.hash = base64Encode(
			new TextEncoder().encode(storyInput.deref() || "")
		);
	},
});

// if the user supplied an initial text via the URL hash, we use it here to seed
// the editor and trigger story regeneration...
if (initial) {
	storyInput.next(initial);
	regenerate.next(true);
}

// build & mount reactive UI components
$compile(
	main(
		{},
		h1({}, "Procedural text gen"),
		// dropdown component with fixed options
		staticDropdownAlt(Object.keys(STORIES), storyID, {}),
		div(
			"#editor",
			{},
			// editor, subscribed & feeding back to storyInput
			textArea({
				value: storyInput,
				oninput: $input(storyInput),
			}),
			// regenerate button
			button({ onclick: $inputTrigger(regenerate) }, "(Re)generate")
		),
		// generated result (or error message). contents of that wrapper
		// component will be completely replaced with each value change
		div("#result", {}, $replace(generated))
	)
).mount(document.getElementById("app")!);
