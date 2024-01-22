import { files, readJSON, writeText } from "@thi.ng/file-io";
import { compare } from "@thi.ng/compare";
import { ConsoleLogger } from "@thi.ng/logger";
import { capitalize } from "@thi.ng/strings";
import { Reducer, groupByObj, mapcat } from "@thi.ng/transducers";
import { CompiledSpecs } from "../src/api.js";
import { GENERATE } from "../src/generate.js";

const FRAMEWORK = "export/framework.json";

const logger = new ConsoleLogger("meta-css", "INFO");

await GENERATE.fn({
	logger,
	opts: {
		prec: 3,
		pretty: true,
		verbose: false,
		out: FRAMEWORK,
	},
	format: <any>null,
	inputs: [...files("specs", ".json")],
});

const specs = readJSON<CompiledSpecs>(FRAMEWORK);

const grouped = groupByObj(
	{
		key: ([_, { __user }]) => __user,
		group: <Reducer<string[], [string, any]>>[
			() => [],
			(acc) => acc.sort(),
			(acc, x) => (acc.push(x[0]), acc),
		],
	},
	Object.entries(specs.classes)
);

const num = Object.keys(specs.classes).length;

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
// console.log(grouped);

const doc: string[] = [
	"## Bundled CSS base framework",
	"",
	"The package includes a large number of useful specs in [/specs](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css/specs/). These are readily usable, but also are provided as starting point to define your own custom framework(s)...",
	"",
	`Currently, there are ${num} CSS utility classes defined in ${specs.info.name} v${specs.info.version}:`,
	"",
	"### Classes by category",
	"",
	...mapcat(
		(groupID) => [
			`#### ${capitalize(groupID)} <!-- notoc -->\n`,
			grouped[groupID]
				.sort($compare)
				.map((x) => `\`${x}\``)
				.join(" / "),
			"",
		],
		Object.keys(grouped).sort()
	),
	"### Media queries",
	"",
	...Object.entries(specs.media).map(
		([id, def]) => `- **${id}**: \`${JSON.stringify(def)}\``
	),
	"",
];

writeText("export/framework.md", doc, logger);
