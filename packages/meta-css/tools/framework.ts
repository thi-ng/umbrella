import { Fn2, IObjectOf } from "@thi.ng/api";
import { compare } from "@thi.ng/compare";
import { files, readJSON, writeText } from "@thi.ng/file-io";
import { ConsoleLogger } from "@thi.ng/logger";
import { capitalize } from "@thi.ng/strings";
import { Reducer, groupByObj, mapcat } from "@thi.ng/transducers";
import { CompiledSpec, CompiledSpecs, SpecDoc } from "../src/api.js";
import { GENERATE } from "../src/generate.js";

const FRAMEWORK = "export/framework.json";

const logger = new ConsoleLogger("meta-css", "INFO");

await GENERATE.fn({
	logger,
	opts: {
		out: FRAMEWORK,
		prec: 3,
		pretty: true,
		verbose: false,
		watch: false,
	},
	format: <any>null,
	inputs: [...files("specs", ".json")],
});

const specs = readJSON<CompiledSpecs>(FRAMEWORK);

const num = Object.keys(specs.classes).length;
const numTpl = Object.keys(specs.templates).length;

const parseClass = (name: string) =>
	name.split(/(\d+)/).map((x) => {
		let y = parseInt(x);
		return isNaN(y) ? x : y;
	});

const $compare = (a: string, b: string) => {
	if (/\d+/.test(a) && /\d+/.test(b)) {
		const aa = parseClass(a);
		const bb = parseClass(b);
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

const groupedTypes = (
	src: IObjectOf<CompiledSpec>,
	fmt: Fn2<string, SpecDoc | undefined, string>
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
	return mapcat(
		(groupID) => [
			`#### ${capitalize(groupID)}\n`,
			grouped[groupID]
				.sort($compare)
				.map((x) => fmt(x, src[x].__doc))
				.join("\n"),
			"",
		],
		Object.keys(grouped).sort()
	);
};

const fmtSpec = (id: string, doc?: SpecDoc) => {
	if (!(doc && doc.desc)) return `- \`${id}\``;
	let desc = doc.desc;
	if (/^-[a-z]/.test(desc)) desc = desc.substring(1);
	if (desc[0] === "#") desc = `$\\colorbox{${desc}}{\\${desc}}$`;
	return `- \`${id}\` (${desc})`;
};

const formatTpl = (id: string, doc?: SpecDoc) => {
	if (!(doc && doc.args)) return `##### ${id}(...)\n\nTODO`;
	return [
		`##### \`${id}(${doc.args
			.map((x) => /^\w+/.exec(x)![0])
			.join(", ")})\``,
		"",
		...doc.args.map(
			(x) => `- ${x.replace(/^(\w+)/, (_, y) => `**${y}**`)}`
		),
		doc.desc ? `\n${doc.desc}\n` : "",
	].join("\n");
};

const doc: string[] = [
	`Currently, there are ${
		num + numTpl
	} CSS utility classes (incl. ${numTpl} templates) defined in "${
		specs.info.name
	}" (v${specs.info.version}):`,
	"",
	"### Classes by category",
	"",
	...groupedTypes(specs.classes, fmtSpec),
	"### Templates by category",
	"",
	...groupedTypes(specs.templates, formatTpl),
	"### Media queries",
	"",
	...Object.entries(specs.media).map(
		([id, def]) => `- **${id}**: \`${JSON.stringify(def)}\``
	),
	"",
];

writeText("export/framework.md", doc, logger);
