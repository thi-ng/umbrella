// thing:no-export
import type { Fn3, IObjectOf } from "@thi.ng/api";
import { int, string, type Command } from "@thi.ng/args";
import { compare } from "@thi.ng/compare";
import { readJSON } from "@thi.ng/file-io";
import { memoizeO } from "@thi.ng/memoize";
import { capitalize } from "@thi.ng/strings";
import { groupByObj, mapcat, type Reducer } from "@thi.ng/transducers";
import { resolve } from "node:path";
import {
	ARG_OUTPUT,
	type AppCtx,
	type CommonOpts,
	type CompiledSpec,
	type CompiledSpecs,
	type SpecDoc,
} from "./api.js";
import { maybeWriteText } from "./utils.js";

interface DocOpts extends CommonOpts {
	out?: string;
	level: number;
	title?: string;
	// noDecls: boolean;
}

export const DOC: Command<DocOpts, CommonOpts, AppCtx<DocOpts>> = {
	desc: "Generate Markdown documentation for framework specs",
	opts: {
		// ...ARG_NO_DECLS,
		...ARG_OUTPUT,
		level: int({ alias: "l", desc: "Initial heading level", default: 1 }),
		title: string({
			alias: "t",
			desc: "Main title, set to 'none' to disable",
			default: "meta",
		}),
	},
	inputs: 1,
	fn: async (ctx) => {
		const { logger, opts, inputs } = ctx;
		const specs = readJSON<CompiledSpecs>(resolve(inputs[0]), logger);
		const doc = generateDocs(specs, opts);
		maybeWriteText(opts.out, doc, logger);
	},
};

export const generateDocs = (
	specs: CompiledSpecs,
	{ level, title }: DocOpts
) => {
	const num = Object.keys(specs.classes).length;
	const numTpl = Object.keys(specs.templates).length;

	const doc: string[] = [
		`Currently, there are ${
			num + numTpl
		} CSS utility classes (incl. ${numTpl} templates) defined in "${
			specs.info.name
		}" (v${specs.info.version}):`,
		"",
		`${__hd(level + 1)} Classes by category`,
		"",
		...__groupedTypes(specs.classes, __formatSpec, level + 2),
		`${__hd(level + 1)} Templates by category`,
		"",
		...__groupedTypes(specs.templates, __formatTemplate, level + 2),
		`${__hd(level + 1)} Media queries`,
		"",
		...Object.entries(specs.media).map(
			([id, def]) => `- **${id}**: \`${JSON.stringify(def)}\``
		),
		"",
	];

	if (title !== "none") {
		doc.unshift(
			`${__hd(level)} ${title === "meta" ? specs.info.name : title}\n`
		);
	}
	return doc;
};

/** @internal */
const __parseClass = (name: string) =>
	name.split(/(\d+)/).map((x) => {
		const y = parseInt(x);
		return isNaN(y) ? x : y;
	});

/** @internal */
const __compare = (a: string, b: string) => {
	if (/\d+/.test(a) && /\d+/.test(b)) {
		const aa = __parseClass(a);
		const bb = __parseClass(b);
		const n = aa.length;
		if (n === bb.length) {
			for (let i = 0; i < n; i++) {
				if (aa[i] !== bb[i]) return compare(aa[i], bb[i]);
			}
			return 0;
		}
		return aa.length - bb.length;
	}
	return compare(a, b);
};

/** @internal */
const __groupedTypes = (
	src: IObjectOf<CompiledSpec>,
	fmt: Fn3<string, SpecDoc | undefined, number, string>,
	level: number
) => {
	const grouped = groupByObj(
		{
			key: ([_, { __doc }]) => __doc?.group || "TODO",
			group: <Reducer<string[], [string, any]>>[
				() => [],
				(acc) => acc.sort(),
				(acc, x) => (acc.push(x[0]), acc),
			],
		},
		Object.entries(src)
	);
	return mapcat((groupID) => {
		const group = grouped[groupID]
			.sort(__compare)
			.map((x) => fmt(x, src[x].__doc, level + 1));
		const n = group.length;
		return [
			`${__hd(level)} ${capitalize(groupID)}`,
			n > 3 ? `\n<details><summary>${n} items:</summary>\n` : "",
			group.join("\n"),
			n > 3 ? "</details>\n" : "",
		];
	}, Object.keys(grouped).sort());
};

/** @internal */
const __formatSpec = (id: string, doc?: SpecDoc) => {
	if (!(doc && doc.desc)) return `- \`${id}\``;
	let desc = doc.desc;
	if (/^-[a-z]/.test(desc)) desc = desc.substring(1);
	// if (desc[0] === "#") desc = `$\\colorbox{${desc}}{\\${desc}}$`;
	// if (desc[0] === "#") desc = `$\\textcolor{\\${desc}}{\\textsf{\\${desc}}}$`;
	return `- \`${id}\` (${desc})`;
};

/** @internal */
const __formatTemplate = (
	id: string,
	doc: SpecDoc | undefined,
	level: number
) => {
	if (!(doc && doc.args)) return `${__hd(level)} ${id}(...)\n\nTODO`;
	const argList = doc.args.map((x) => /^\w+/.exec(x)![0]).join(", ");
	return [
		`${__hd(level)} \`${id}(${argList})\``,
		"",
		...doc.args.map(__formatArg),
		doc.desc ? `\n${doc.desc}\n` : "",
	].join("\n");
};

/** @internal */
const __formatArg = (arg: string) =>
	`- ${arg.replace(/^(\w+)/, (_, y) => `**${y}**`)}`;

/** @internal */
const __hd = memoizeO((level: number) => "#".repeat(level));
