import {
	anchor,
	div,
	h5,
	li,
	para,
	pre,
	section,
	ul,
	type Attribs,
} from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";
import { map, range } from "@thi.ng/transducers";

type Link = { href: string; title: string };

const LINKS: Link[] = [
	{ href: "https://thi.ng/", title: "thi.ng website" },
	{ href: "https://mastodon.thi.ng", title: "Mastodon" },
	{ href: "https://github.com/thi-ng/", title: "GitHub" },
	{
		href: "https://github.com/sponsors/postspectacular/",
		title: "Sponsors",
	},
];

// prettier-ignore
const COLORS = [
	"dark-red", "red", "light-red", "orange", "gold",
	"yellow", "light-yellow", "purple", "light-purple", "dark-pink",
	"hot-pink", "pink", "light-pink", "dark-green", "green",
	"light-green", "navy", "dark-blue", "blue", "light-blue",
	"lightest-blue", "washed-blue", "washed-green", "washed-yellow", "washed-red",
];

const swatches = (colors: string[]) =>
	div(
		".swatches",
		{},
		...map((id) => {
			const color = /^(navy|purple|dark-)/.test(id) ? "white" : "black";
			return div(`.bg-${id}.${color}`, {}, id);
		}, colors)
	);

const headline = (level: number) => [
	"h" + level,
	null,
	"Build your own CSS framework",
	para(null, "…with just this one simple trick"),
];

const typeSection = (level: number) =>
	section(
		null,
		headline(level),
		para(
			null,
			"Esse ex eiusmod ipsum et. Qui culpa enim esse cillum excepteur do occaecat eu. Sunt sit nulla consequat fugiat anim dolor pariatur ad velit sit pariatur aliquip ut. Officia sit tempor nisi laboris labore elit quis non eiusmod ut enim cillum eu."
		)
	);

// a simple div of links
const linkGroup = (attribs: Partial<Attribs>, items: Link[]) =>
	div(attribs, ...items.map(({ href, title }) => anchor({ href }, title)));

$compile(
	div(
		{},
		swatches(COLORS),
		linkGroup({ class: "group-v" }, LINKS),
		linkGroup({ class: "group-h", data: { items: LINKS.length } }, LINKS),
		...map(typeSection, range(1, 5)),
		section(
			null,
			h5(null, "Everyone loves lists"),
			ul(
				null,
				...LINKS.map(({ href, title }) =>
					li(null, anchor({ href }, title))
				)
			)
		),
		section(
			null,
			h5(null, "Getting started"),
			para(
				null,
				"Head over to ",
				anchor({ href: "https://thi.ng/meta-css" }, "@thi.ng/meta-css"),
				" to learn more how to make this all work for you... Please also first install ",
				anchor({ href: "https://bun.sh" }, "Bun"),
				", which is required for this toolchain."
			)
		),
		pre(
			{ data: { lang: "bash" } },
			div(".lang", {}, "Bash"),
			`$ npx @thi.ng/meta-css --help

 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ @thi.ng/meta-css 0.0.1
 █ █ █ █ █ █ █ █ █ │ Data-driven CSS component & framework codegen
                 █ │
               █ █ │

Usage: metacss <cmd> [opts] input [...]
       metacss <cmd> --help

Available commands:

convert         : Convert & bundle meta stylesheets to CSS
export          : Export entire generated framework as CSS
generate        : Generate framework rules from specs

Flags:

-v, --verbose           Display extra process information

Main:

-o STR, --out STR       Output file (or stdout)`
		)
	)
).mount(document.getElementById("app")!);
