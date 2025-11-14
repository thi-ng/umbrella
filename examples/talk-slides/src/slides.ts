// SPDX-License-Identifier: Apache-2.0
import {
	bgImagePage,
	codeBlock,
	contentPage,
	imagePage,
	link,
	list,
	quotePage,
	titlePage,
	socialLink,
	ytVideo,
} from "./components.js";

// each item in this array is an hdom tree of a single slide

export const SLIDES: any[] = [
	[titlePage, "", "Talk Title", "Author Name", ["br"], [socialLink, "toxi"]],

	[
		titlePage,
		"bg-dark-red white",
		"Talk Title (alt)",
		"Author Name",
		["br"],
		[socialLink, "toxi"],
	],

	[
		contentPage,
		"Headline",
		["small", "A longer subtitle maybe..."],
		[list, "Item #1", "Item #2", "Item #3", "..."],
	],

	[imagePage, "bg-black", `./img/logo-1280.jpg`],

	[
		bgImagePage,
		"bg-black",
		`./img/gyroid-metal75.jpg`,
		[
			"div.f1.white",
			"Background image with text...",
			["p.f5", "Image credits: © 2013 Karsten Schmidt"],
		],
	],

	[
		contentPage,
		"Hello world!",
		[
			codeBlock,
			`export function greet(name: string) {\n    console.log("Hello, " + name);\n}`,
		],
		[list, "Comment #1", "Comment #2", "..."],
	],

	[titlePage, "bg-black white", "Next section"],

	[ytVideo, "gyflw4Er-Gg"],

	[
		quotePage,
		[
			`“I still believe in abstraction, but now I know that one ends with
    abstraction, not starts with it. I learned that one has to adapt
    abstractions to reality and not the other way around.”`,
		],
		" Alexander Stepanov",
	],

	[
		titlePage,
		"bg-white black",
		"Thanks :)",
		[link, "https://thi.ng", "thi.ng"],
		["br"],
		[socialLink, "toxi"],
	],
];
