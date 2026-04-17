// SPDX-License-Identifier: Apache-2.0
import { COPY, withSize } from "@thi.ng/hiccup-carbon-icons";
import type { ISubscriber } from "@thi.ng/rstream";
import { mapIndexed } from "@thi.ng/transducers";
import { handleTab } from "./utils.js";

// component styles:
// this object will be provided as hdom user context to all
// component functions
export const UI = {
	editor: {
		root: { class: "w-50-ns pa3" },
		title: { class: "ma0 mb2" },
		textarea: { class: "w-100.pa2.bn.f7.code.lh-copy" },
		stats: { class: "f7" },
	},
	input: {
		root: { class: "mb2" },
		label: { class: "dib w-100 w-25-l pv2" },
		input: { class: "w-100 w-75-l pa1 bg-silver white bn" },
	},
	button: {
		href: "#",
		class: "dib.link.white.pv1.ph2.w4.bn.hover-bg-blue.bg-animate",
	},
	copyButton: {
		style: {
			position: "relative",
			top: "-3rem",
			left: "0.5rem",
		},
	},
	main: {
		small: { class: "fw1 ml2 dn dib-l" },
		src: {
			class: "bg-washed-green",
			autofocus: true,
		},
		result: {
			success: {
				disabled: true,
				class: "bg-light-gray",
			},
			error: {
				disabled: true,
				class: "bg-washed-red",
			},
		},
	},
};

// hdom UI root component. this function will be used as stream
// transformer and receives a tuple of xml & formatted hiccup strings.
// defined as closure to avoid using global vars. the `ctx` is the above
// `UI.main` and `inputs` are defined in `index.ts`.
export const app =
	(ctx: any, inputs: any) =>
	({ src, hiccup }: any) => [
		"div.flex-ns",
		[
			editPane,
			["XML/HTML source", ["small", ctx.small, "(must be well formed!)"]],
			{
				...ctx.src,
				onkeydown: handleTab(inputs.xml),
				// emitting a new value to the stream will
				// re-trigger conversion & UI update
				oninput: (e: any) => inputs.xml.next(e.target.value),
			},
			src,
		],
		[
			editPane,
			["Transformed Hiccup / JSON"],
			hiccup.indexOf("error") < 0 ? ctx.result.success : ctx.result.error,
			hiccup,
			[
				copyButton,
				{
					class: hiccup.indexOf("error") < 0 ? "bg-green" : "bg-gray",
				},
				inputs.copyButton,
				hiccup,
			],
			[transformOpts, inputs],
		],
	];

// configurable editor panel UI component
// (uses Tachyons CSS classes for styling)
const editPane = (
	{ editor }: any,
	title: string,
	attribs: any,
	value: string,
	...extra: any[]
) => [
	"div",
	editor.root,
	["h3", editor.title, ...title],
	[`textarea.${editor.textarea.class}`, { rows: 16, value, ...attribs }],
	["div", editor.stats, `${value.length} chars`],
	...extra,
];

// configurable input UI component
const input = ({ input }: any, label: string, attribs: any) => [
	"div",
	input.root,
	["label", { ...input.label, for: attribs.id }, label],
	["input", { ...input.input, ...attribs }],
];

const iconButton = (
	{ button }: any,
	attribs: any,
	icon: any,
	label: string
) => [`a.${button.class}`, { ...button, ...attribs }, icon, label];

// button which, when clicked, copies given `text` to clipboard and
// emits true on `stream`. resets stream back to false after given
// `delay` time.
const copyButton = (
	{ copyButton }: any,
	attribs: any,
	stream: ISubscriber<boolean>,
	text: string,
	delay = 500
) => [
	iconButton,
	{
		...copyButton,
		...attribs,
		onclick: (e: any) => {
			e.preventDefault();
			e.target.blur();
			(<any>navigator).clipboard.writeText(text).then(
				() => {
					setTimeout(() => stream.next(false), delay);
					stream.next(true);
				},
				() => alert("Couldn't copy to clipboard")
			);
		},
	},
	withSize(COPY, "0.7rem", undefined, {
		class: "mr2",
		fill: "currentcolor",
	}),
	stream.deref() ? "Copied" : "Copy",
];

// combined transform options input components
const transformOpts = (_: any, inputs: any) => [
	"div",
	["h3", "Options"],
	mapIndexed(
		(i, [label, type, stream]) => {
			let v = type === "checkbox" ? "checked" : "value";
			return [
				input,
				label,
				{
					id: "opt" + i,
					type,
					[v]: stream.deref(),
					oninput: (e: any) => stream.next(e.target[v]),
				},
			];
		},
		[
			["Remove tags", "text", inputs.removeTags],
			["Remove attributes", "text", inputs.removeAttribs],
			["Pretty print", "checkbox", inputs.prettyPrint],
			["Double quotes", "checkbox", inputs.doubleQuote],
			["Trailing commas", "checkbox", inputs.trailingComma],
		]
	),
];
