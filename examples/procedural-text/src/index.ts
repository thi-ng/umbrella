import { replaceNames } from "@thi.ng/emoji";
import { br, button, div, h1, main, para, textArea } from "@thi.ng/hiccup-html";
import { generate } from "@thi.ng/proctext";
import { SYSTEM } from "@thi.ng/random";
import { $compile, $input, $inputTrigger, $replace } from "@thi.ng/rdom";
import { staticDropdownAlt } from "@thi.ng/rdom-components";
import { reactive, resolve, stream } from "@thi.ng/rstream";
import { filter, interpose } from "@thi.ng/transducers";
import { base64Decode, base64Encode } from "@thi.ng/transducers-binary";
import ALICE_BOB from "./stories/alice-bob.txt";
import CREATURE from "./stories/creature-gen.txt";
import DYN_LOOKUP from "./stories/dynamic-lookups.txt";
import HIDDEN from "./stories/hidden-assignment.txt";
import MODIFIERS from "./stories/modifiers.txt";
import NGRAMS from "./stories/ngrams-5.txt";

const STORIES = {
	"Alice & Bob": ALICE_BOB,
	Modifiers: MODIFIERS,
	"Hidden assignments": HIDDEN,
	"Dynamic lookups": DYN_LOOKUP,
	"Creature generator": CREATURE,
	"N-grams": NGRAMS,
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
const generated = regenerate
	.map(async () => {
		// check if we have any input, bail if not...
		const input = storyInput.deref();
		if (!input) return div();
		// parse input & generate story
		const result = await generate(input, {
			vars: {},
			rnd: SYSTEM,
			// missing: (id) => `<MISSING: ${id}>`,
		});
		// possibly return error message
		if (result.err) {
			return div(".error", {}, result.err.message);
		} else {
			return div(
				".output",
				{},
				// post-process generated text to handle emoji names, paragraphs & linebreaks
				...replaceNames(result.result.trim())
					.split(/\n{2,}/g)
					.map((x) =>
						para(".mt0", {}, interpose(br(), x.split("\n")))
					)
			);
		}
	})
	// since the above function is async, we attach another subscription which
	// will wait for each promise to resolve before passing the result(s) downstream
	.subscribe(resolve());

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
