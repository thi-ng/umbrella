import { br, button, div, h3, para, textArea } from "@thi.ng/hiccup-html";
import { SYSTEM } from "@thi.ng/random";
import { $compile, $input, $inputTrigger, $replace } from "@thi.ng/rdom";
import { staticDropdownAlt } from "@thi.ng/rdom-components";
import { reactive, stream } from "@thi.ng/rstream";
import { interpose } from "@thi.ng/transducers";
import STORY1 from "./stories/alice-bob.txt";
import STORY4 from "./stories/dynamic-lookups.txt";
import STORY3 from "./stories/hidden-assignment.txt";
import STORY2 from "./stories/modifiers.txt";
import { generateStory } from "./story.js";

const STORIES = {
	"Alice & Bob": STORY1,
	Modifiers: STORY2,
	"Hidden assignments": STORY3,
	"Dynamic lookups": STORY4,
};

// reactive state values
// regeneration trigger
const regenerate = reactive(true);
// story source code (initially idle)
const storyInput = stream<string>();
// story template chooser with attached dynamic loader
const storyID = reactive<keyof typeof STORIES>("Alice & Bob").subscribe({
	next: async (id) => {
		// look up & load related preset URL
		const response = await fetch(STORIES[id]);
		// place result into stream (will also update editor)
		storyInput.next(await response.text());
		// trigger story regeneration
		regenerate.next(true);
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
		return div(".bg-red.white.pa3.h-100", {}, result.err.message);
	} else {
		return div(
			".ph3",
			{},
			// post-process generated text to handle paragraphs & linebreaks
			...result.result
				.trim()
				.split(/\n{2,}/g)
				.map((x) => para(".mt0", {}, interpose(br(), x.split("\n"))))
		);
	}
});

// build & mount reactive UI components
$compile(
	div(
		{
			class: "pa2 vh-100",
			style: {
				display: "grid",
				"grid-template-columns": "1fr 1fr",
				"grid-template-rows": "2rem 1fr",
				gap: "1rem",
			},
		},
		h3(".mv1", {}, "Procedural text gen"),
		// dropdown component with fixed options
		staticDropdownAlt(Object.keys(STORIES), storyID, {
			attribs: { class: "db w-100" },
		}),
		div(
			{
				style: {
					display: "grid",
					"grid-template-rows": "1fr 4rem",
					gap: "0.5rem",
				},
			},
			// editor, subscribed & feeding back to storyInput
			textArea(".db.w-100.pa2.bg-lightest-blue.black.code.f6", {
				value: storyInput,
				oninput: $input(storyInput),
			}),
			// regenerate button
			button(
				".db.w-100.bg-blue.white.bn",
				{ onclick: $inputTrigger(regenerate) },
				"(Re)generate"
			)
		),
		// generated result (or error message). contents of that wrapper
		// component will be completely replaced with each value change
		div(".f3", {}, $replace(generated))
	)
).mount(document.getElementById("app")!);
