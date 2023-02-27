import type { IObjectOf } from "@thi.ng/api";
import { timedResult } from "@thi.ng/bench";
import { parse, TagTransforms } from "@thi.ng/hiccup-markdown";
import { reactive, Stream } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import readme from "../README.md?url";

const CUSTOM_TYPES: IObjectOf<{ class: string; icon: string }> = {
	default: { class: "bg-light-gray dark-gray", icon: "❓" },
	info: { class: "bg-light-blue dark-blue", icon: "👍" },
	warn: { class: "bg-washed-red dark-red", icon: "✋" },
};

// custom tag transformers (passed to parser)
// uses Tachyons CSS classes for styling
const CUSTOM_TAGS: Partial<TagTransforms> = {
	blockquote: (ctx, xs) => ["blockquote.ml3.pl2.bl.bw2.i.f4.gray", ...xs],
	code: (ctx, body) => ["code.bg-light-gray.ph1", body],
	codeblock: (ctx, lang, head, body) => [
		"pre.bg-washed-yellow.pa3.f7.overflow-x-scroll",
		{ lang: lang || "code" },
		["code", body],
	],
	custom: (ctx, type, head, body, meta) => {
		if (!Object.keys(CUSTOM_TYPES).includes(type)) type = "default";
		return [
			"div.custom.pa3.mb3",
			{ class: CUSTOM_TYPES[type].class },
			["h4.ma0", {}, CUSTOM_TYPES[type].icon, " ", head.join(" ")],
			...parse(body).result,
			meta ? ["p.mb0.f7.gray", {}, meta] : null,
		];
	},
	footnoteWrapper: (_, notes) => [
		"ul.gray.f7",
		{},
		...Object.keys(notes)
			.sort()
			.map((id) => notes[id]),
	],
	heading: (ctx, level, id, body, meta) => {
		const hd = [`h${level}`, { id, class: meta ? "mb0" : null }, ...body];
		return meta ? ["div", {}, hd, ["div.f7.gray", {}, meta]] : hd;
	},
	link: (ctx, href, title, body) => [
		"a.link.dark-blue.hover-white.hover-bg-dark-blue.b",
		{ href, title },
		...body,
	],
	linkRef: (ctx, refID, body) => [
		"a.link.dark-blue.hover-white.hover-bg-dark-blue.b",
		{
			href: () => ctx.linkRefs[refID]?.[0],
			title: () => ctx.linkRefs[refID]?.[1],
		},
		...body,
	],
	strike: (ctx, body) => ["del.bg-washed-red", ...body],
	table: (ctx, align, head, rows) => [
		"table.w-100.collapse.ba.b--black-10",
		["thead", {}, head],
		["tbody", {}, ...rows],
	],
	tableRow: (ctx, id, cells) => [
		`tr.striped--near-white.ba.b--black-10`,
		...cells,
	],
	tableCell: (ctx, body) => ["td.pa2", {}, ...body],
	tableHead: (ctx, body) => ["th.pa2.bg-black.white.tl", {}, ...body],
};

// UI root component
const app =
	(input: Stream<string>) =>
	({ src, parsed: [hiccup, time] }: any) =>
		[
			"div.flex.vh-100.sans-serif.flex-column.flex-row-l",
			[
				"div.w-100.h-50.w-50-l.h-100-l",
				[
					"textarea.w-100.vh-50.vh-100-l.bg-washed-blue.navy.pa3.f7.code.lh-copy",
					{
						value: src,
						oninput: (e: Event) =>
							input.next((<HTMLTextAreaElement>e.target).value),
					},
				],
			],
			[
				"div.w-100.h-50.w-50-l.vh-100-l.overflow-y-scroll.pa3.lh-copy",
				[
					"div.pa2.bg-yellow.purple.f7",
					`Parsed ${src.length} chars in ${time | 0}ms`,
				],
				...hiccup,
			],
		];

// markdown input stream
// seed w/ temp input
const src = reactive("# Loading readme...");

// stream transformer & UI update
src.transform(
	map((src) => ({
		src,
		parsed: timedResult(() => {
			try {
				const { complete, result, state } = parse(src, {
					tags: CUSTOM_TAGS,
				});
				return complete
					? result
					: [
							...result,
							[
								"div.bg-gold.red.pa2",
								{},
								`Incomplete parse, stopped at line ${state.l}`,
							],
					  ];
			} catch (e) {
				return ["div.bg-dark-red.white", {}, (<Error>e).message];
			}
		}),
	})),
	map(app(src)),
	updateDOM()
);

// load markdown & seed input
fetch(readme)
	.then((res) => res.text())
	.then((txt) => src.next(txt))
	.catch((e) => src.next(`# Error loading file: ${e}`));
