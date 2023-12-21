import { readJSON, writeText } from "@thi.ng/file-io";
import { ConsoleLogger } from "@thi.ng/logger";
import { capitalize } from "@thi.ng/strings";
import { Reducer, groupByObj, mapcat, pairs } from "@thi.ng/transducers";
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
	inputs: ["specs"],
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

// console.log(grouped);

const doc: string[] = [
	"## Bundled CSS base framework",
	"",
	"The package includes a large number of useful specs in [/specs](https://github.com/thi-ng/umbrella/blob/develop/packages/meta-css/specs/). These are provided as starting point to define your custom framework(s)...",
	"",
	`Currently available CSS classes in ${specs.info.name} v${specs.info.version}:`,
	"",
	"### Classes by category",
	"",
	...mapcat(
		([group, ids]) => [
			`#### ${capitalize(group)}\n`,
			ids.map((x) => `\`${x}\``).join(" / "),
			"",
		],
		pairs(grouped)
	),
	"",
	"### Media queries",
	"",
	...Object.entries(specs.media).map(
		([id, def]) => `- **${id}**: \`${JSON.stringify(def)}\``
	),
	"",
];

writeText("export/framework.md", doc, logger);
