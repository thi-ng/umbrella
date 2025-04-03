import type { IObjectOf } from "@thi.ng/api";
import { writeText } from "@thi.ng/file-io";
import { ConsoleLogger } from "@thi.ng/logger";
import { interpolate, wordWrapLines } from "@thi.ng/strings";
import * as v from "@thi.ng/vectors";

const OUT_DIR = "src2";
const LOGGER = new ConsoleLogger("codegen");

interface FnSpec {
	name: string;
	type: string;
	dispatch?: number;
	doc?: string[];
	params?: IObjectOf<string>;
}
const formatFunction = (
	name: string,
	body: string,
	type: string,
	header = `export const ${name}: ${type} = `
) => {
	body = body
		.replace("function anonymous", header)
		.replace("\n) {", ") => {");
	return body;
};

const formatDocs = (
	docs: string,
	d: string | number,
	params: FnSpec["params"]
) => {
	const wrappedDocs = wordWrapLines(interpolate(docs, d), {
		width: 76,
	});
	const res = ["/**", " * " + wrappedDocs.join("\n * ")];
	if (params) {
		res.push(" *");
		for (let [id, desc] of Object.entries(params))
			res.push(` * @param ${id} - ${desc}`);
	}
	res.push(" */");
	return res;
};

const emitFamily = ({ name, type, dispatch = 1, doc = [], params }: FnSpec) => {
	const nakedType = type.replace(/<[a-z0-9,]+>$/i, "");
	const $import = `import type { ${nakedType} } from "../src/api.js";`;
	const imports = [`import { vop } from "../src/vop.js";`];
	const $docs = doc.join("");
	const adds = [
		...formatDocs(
			"Multi-method. " +
				$docs +
				" Auto-delegates to optimized versions where possible.",
			"n",
			params
		),
		`export const ${name}: Multi${type} = vop(${dispatch});`,
		`${name}.default(${formatFunction(
			name,
			(<any>v)[name].impl().toString(),
			type,
			""
		)});`,
	];
	for (let d of [2, 3, 4]) {
		const id = name + d;
		if (!(<any>v)[id]) continue;
		imports.push(`import { ${id} } from "./${id}.js";`);
		writeText(
			`${OUT_DIR}/${id}.ts`,
			[
				$import,
				"",
				...formatDocs($docs, d, params),
				formatFunction(id, (<any>v)[id].toString(), type) + ";",
			],
			LOGGER
		);
		adds.push(`${name}.add(${d}, ${id});`);
	}
	writeText(
		`${OUT_DIR}/${name}.ts`,
		[
			`import type { Multi${nakedType} } from "../src/api.js";`,
			...imports,
			"",
			...adds,
		],
		LOGGER
	);
};

const PARAMS_VV = { o: "output vector", a: "input vector", b: "input vector" };
const PARAMS_VN = { o: "output vector", a: "input vector", n: "scalar" };

const SPECS: FnSpec[] = [
	{
		name: "add",
		type: "VecOpVV",
		doc: ["Componentwise {0}D vector addition."],
		params: PARAMS_VV,
	},
	{
		name: "sub",
		type: "VecOpVV",
		doc: ["Componentwise {0}D vector subtraction."],
		params: PARAMS_VV,
	},
	{
		name: "mul",
		type: "VecOpVV",
		doc: ["Componentwise {0}D vector multiplication."],
		params: PARAMS_VV,
	},
	{
		name: "div",
		type: "VecOpVV",
		doc: ["Componentwise {0}D vector division."],
		params: PARAMS_VV,
	},
	{
		name: "addN",
		type: "VecOpVN",
		doc: ["Componentwise {0}D vector addition with a uniform scalar."],
		params: PARAMS_VN,
	},
	{
		name: "subN",
		type: "VecOpVN",
		doc: ["Componentwise {0}D vector subtraction with a uniform scalar."],
		params: PARAMS_VN,
	},
	{
		name: "mulN",
		type: "VecOpVN",
		doc: [
			"Componentwise {0}D vector multiplication with a uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "divN",
		type: "VecOpVN",
		doc: ["Componentwise {0}D vector division with a uniform scalar."],
		params: PARAMS_VN,
	},
	{ name: "distChebyshev", type: "VecOpRoVV<number>", dispatch: 0 },
];

for (let spec of SPECS) {
	emitFamily(spec);
}
