import type { IObjectOf } from "@thi.ng/api";
import { writeText } from "@thi.ng/file-io";
import { ConsoleLogger } from "@thi.ng/logger";
import { interpolate, wordWrapLines } from "@thi.ng/strings";
import * as v from "@thi.ng/vectors";

const OUT_DIR = "src2";
const LOGGER = new ConsoleLogger("codegen");

interface FnSpec {
	/** Function name */
	name: string;
	/** Function type */
	type: string;
	/** Higher order fn name (to replace `op` in original code) */
	op?: string;
	/** VOP dispatch argument index, default 1 */
	dispatch?: number;
	/** Doc strings (one line per item, will be word-wrapped) */
	doc?: string[];
	/** Separator char for fixed size suffixes (e.g. use `_` for `clamp01_2`), default "" */
	sep?: string;
	/** Object of param descriptors */
	params?: IObjectOf<string>;
	/** Object of custom imports. Keys = pkg names, values = syms */
	imports?: IObjectOf<string>;
	/** Custom imports for generic versions, defaults to {@link FnSpec.imports} */
	importsGeneric?: IObjectOf<string>;
}

const formatFunction = (
	name: string,
	body: string,
	type: string,
	header = `export const ${name}: ${type} = `,
	op?: string
) => {
	body = body.replace("function anonymous", "").replace("\n) {", ") => {");
	if (op) body = body.replaceAll("op(", op + "(");
	return header + body;
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

const emitFamily = ({
	name,
	type,
	dispatch = 1,
	doc = [],
	params,
	imports = {},
	importsGeneric,
	sep = "",
	op,
}: FnSpec) => {
	const nakedType = type.replace(/<[a-z0-9, ]+>$/i, "");
	const typeImport = `import type { ${nakedType} } from "../src/api.js";`;
	const userImportsFixed = Object.entries(imports).map(
		([pkg, syms]) => `import { ${syms} } from "${pkg}";`
	);
	const userImportsGeneric = Object.entries(importsGeneric ?? imports).map(
		([pkg, syms]) => `import { ${syms} } from "${pkg}";`
	);
	const $imports = [
		...userImportsGeneric,
		`import { vop } from "../src/vop.js";`,
	];
	const $docs = doc.join("\n");
	const adds = [
		...formatDocs(
			$docs +
				"\n\n@remarks\nMulti-method, auto-delegates to optimized versions where possible.",
			"n",
			params
		),
		`export const ${name}: Multi${type} = vop(${dispatch});`,
		`${name}.default(${formatFunction(
			name,
			(<any>v)[name].impl().toString(),
			type,
			"",
			op
		)});`,
	];
	for (let d of [2, 3, 4]) {
		const id = name + sep + d;
		if (!(<any>v)[id]) continue;
		$imports.push(`import { ${id} } from "./${id}.js";`);
		writeText(
			`${OUT_DIR}/${id}.ts`,
			[
				...userImportsFixed,
				typeImport,
				"",
				...formatDocs($docs, d, params),
				formatFunction(
					id,
					(<any>v)[id].toString(),
					type,
					undefined,
					op
				) + ";",
			],
			LOGGER
		);
		adds.push(`${name}.add(${d}, ${id});`);
	}
	writeText(
		`${OUT_DIR}/${name}.ts`,
		[
			`import type { Multi${nakedType} } from "../src/api.js";`,
			...$imports,
			"",
			...adds,
		],
		LOGGER
	);
};

const PARAMS_V = { o: "output vector", a: "input vector" };
const PARAMS_VV = { o: "output vector", a: "input vector", b: "input vector" };
const PARAMS_VVV = {
	o: "output vector",
	a: "input vector",
	b: "input vector",
	c: "input vector",
};
const PARAMS_VVVVV = {
	o: "output vector",
	a: "input vector",
	b: "input vector",
	c: "input vector",
	d: "input vector",
	e: "input vector",
};

const PARAMS_VN = { o: "output vector", a: "input vector", n: "scalar" };
const PARAMS_VNN = {
	o: "output vector",
	a: "input vector",
	b: "scalar",
	c: "scalar",
};
const PARAMS_VNV = {
	o: "output vector",
	a: "input vector",
	n: "scalar",
	b: "input vector",
};
const PARAMS_VVN = {
	o: "output vector",
	a: "input vector",
	b: "input vector",
	n: "scalar",
};

const SPECS: FnSpec[] = [
	{
		name: "abs",
		type: "VecOpV",
		doc: ["Componentwise absolute value of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "acos",
		type: "VecOpV",
		doc: ["Componentwise computes the arc cosine of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "add",
		type: "VecOpVV",
		doc: ["Componentwise {0}D vector addition."],
		params: PARAMS_VV,
	},
	{
		name: "addm",
		type: "VecOpVVV",
		doc: ["Componentwise {0}D vector add-multiply.", "`o = (a + b) * c`"],
		params: PARAMS_VVV,
	},
	{
		name: "addmN",
		type: "VecOpVVN",
		doc: ["Componentwise {0}D vector add-multiply.", "`o = (a + b) * n`"],
		params: PARAMS_VVN,
	},
	{
		name: "addN",
		type: "VecOpVN",
		doc: ["Componentwise {0}D vector addition with a uniform scalar."],
		params: PARAMS_VN,
	},
	{
		name: "asBVec",
		type: "ToBVecOpV",
		doc: ["Componentwise converts given {0}D vector to boolean."],
		params: PARAMS_V,
	},
	{
		name: "asIVec",
		type: "VecOpV",
		doc: ["Componentwise converts given {0}D vector to signed integer."],
		params: PARAMS_V,
	},
	{
		name: "asUVec",
		type: "VecOpV",
		doc: ["Componentwise converts given {0}D vector to unsigned integer."],
		params: PARAMS_V,
	},
	{
		name: "asin",
		type: "VecOpV",
		doc: ["Componentwise computes the arcsine of given {0}D vector."],
		params: PARAMS_V,
	},
	// TODO fix original naming to: atan_2 / atan_3 ...
	{
		name: "atan",
		type: "VecOpV",
		doc: ["Componentwise computes the arctangent of given {0}D vector."],
		params: PARAMS_V,
	},
	// TODO fix original naming to: atan2_2 / atan2_3 ...
	{
		name: "atan_2",
		type: "VecOpVV",
		doc: [
			"Componentwise computes `Math.atan2` of the two given {0}D vectors.",
		],
		params: PARAMS_VV,
	},
	{
		name: "bitAndI",
		type: "VecOpVV",
		doc: ["Componentwise binary AND of given {0}D signed integer vectors."],
		params: PARAMS_VV,
	},
	{
		name: "bitAndNI",
		type: "VecOpVN",
		doc: [
			"Componentwise binary AND of given {0}D signed integer vector and uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "bitAndNU",
		type: "VecOpVN",
		doc: [
			"Componentwise binary AND of given {0}D unsigned integer vector and uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "bitAndU",
		type: "VecOpVV",
		doc: [
			"Componentwise binary AND of given {0}D unsigned integer vectors.",
		],
		params: PARAMS_VV,
	},
	{
		name: "bitNotI",
		type: "VecOpV",
		doc: ["Componentwise binary NOT of given {0}D signed integer vector."],
		params: PARAMS_V,
	},
	{
		name: "bitNotU",
		type: "VecOpV",
		doc: [
			"Componentwise binary NOT of given {0}D unsigned integer vector.",
		],
		params: PARAMS_V,
	},
	{
		name: "bitOrI",
		type: "VecOpVV",
		doc: ["Componentwise binary OR of given {0}D signed integer vectors."],
		params: PARAMS_VV,
	},
	{
		name: "bitOrNI",
		type: "VecOpVN",
		doc: [
			"Componentwise binary OR of given {0}D signed integer vector and uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "bitOrNU",
		type: "VecOpVN",
		doc: [
			"Componentwise binary OR of given {0}D unsigned integer vector and uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "bitOrU",
		type: "VecOpVV",
		doc: [
			"Componentwise binary OR of given {0}D unsigned integer vectors.",
		],
		params: PARAMS_VV,
	},
	{
		name: "bitXorI",
		type: "VecOpVV",
		doc: ["Componentwise binary XOR of given {0}D signed integer vectors."],
		params: PARAMS_VV,
	},
	{
		name: "bitXorNI",
		type: "VecOpVN",
		doc: [
			"Componentwise binary XOR of given {0}D signed integer vector and uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "bitXorNU",
		type: "VecOpVN",
		doc: [
			"Componentwise binary XOR of given {0}D unsigned integer vector and uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "bitXorU",
		type: "VecOpVV",
		doc: [
			"Componentwise binary XOR of given {0}D unsigned integer vectors.",
		],
		params: PARAMS_VV,
	},
	{
		name: "ceil",
		type: "VecOpV",
		doc: ["Componentwise `Math.ceil` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "clamp",
		type: "VecOpVVV",
		doc: [
			"Componentwise constrains given {0}D vector `a` to the closed interval defined by vectors `b` and `c`.",
		],
		params: PARAMS_VVV,
		imports: {
			"@thi.ng/math/interval": "clamp as op",
		},
	},
	{
		name: "clamp01",
		type: "VecOpV",
		doc: [
			"Componentwise constrains given {0}D vector `a` to the closed [0,1] interval.",
		],
		params: PARAMS_V,
		sep: "_",
		imports: {
			"@thi.ng/math/interval": "clamp01 as op",
		},
	},
	{
		name: "clamp11",
		type: "VecOpV",
		doc: [
			"Componentwise constrains given {0}D vector `a` to the closed [-1,1] interval.",
		],
		params: PARAMS_V,
		sep: "_",
		imports: {
			"@thi.ng/math/interval": "clamp11 as op",
		},
	},
	{
		name: "clampN",
		type: "VecOpVNN",
		doc: [
			"Componentwise constrains value of given {0}D vector `a` to the closed interval defined by scalars `b` and `c`.",
		],
		params: PARAMS_VNN,
		imports: {
			"@thi.ng/math/interval": "clamp as op",
		},
	},
	{
		name: "cos",
		type: "VecOpV",
		doc: ["Componentwise `Math.cos` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "cosh",
		type: "VecOpV",
		doc: ["Componentwise `Math.cosh` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "distChebyshev",
		type: "VecOpRoVV<number>",
		dispatch: 0,
		doc: [
			"Computes the Chebyshev distance between given vectors.",
			"Reference: https://en.wikipedia.org/wiki/Chebyshev_distance",
		],
	},
	{
		name: "distManhattan",
		type: "VecOpRoVV<number>",
		dispatch: 0,
		doc: [
			"Computes the Manhattan (or Taxicab) distance between given vectors.",
			"Reference: https://en.wikipedia.org/wiki/Taxicab_geometry",
		],
	},
	{
		name: "distSq",
		type: "VecOpRoVV<number>",
		dispatch: 0,
		doc: ["Computes the squared Eucledian distance between given vectors."],
	},
	{
		name: "div",
		type: "VecOpVV",
		doc: ["Componentwise {0}D vector division."],
		params: PARAMS_VV,
	},
	{
		name: "divI",
		type: "VecOpVV",
		doc: ["Componentwise {0}D signed integer vector division."],
		params: PARAMS_VV,
	},
	{
		name: "divN",
		type: "VecOpVN",
		doc: ["Componentwise {0}D vector division with a uniform scalar."],
		params: PARAMS_VN,
	},
	{
		name: "divNI",
		type: "VecOpVN",
		doc: [
			"Componentwise {0}D signed integer vector division with a uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "divNU",
		type: "VecOpVN",
		doc: [
			"Componentwise {0}D unsigned integer vector division with a uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "divU",
		type: "VecOpVV",
		doc: ["Componentwise {0}D unsigned integer vector division."],
		params: PARAMS_VV,
	},
	{
		name: "dot",
		type: "VecOpRoVV<number>",
		doc: ["Computes dot product of given {0}D vectors."],
	},
	{
		name: "eq",
		type: "CompareOp",
		doc: [
			"Compnentwise checks if given {0}D vectors `a` and `b` are equal (using `===` for comparison) and writes results to boolean output vector. If `out` is null, creates a new result vector.",
		],
	},
	{
		name: "eqDelta",
		type: "VecOpRoVVO<boolean, number>",
		doc: [
			"Returns true if if given {0}D vectors `a` and `b` are componentwise equal with `eps` as tolerance.",
		],
		imports: {
			"@thi.ng/math/api": "EPS as _eps",
			"@thi.ng/math/eqdelta": "eqDelta as eq",
		},
		importsGeneric: {
			"@thi.ng/checks/implements-function": "implementsFunction",
			"@thi.ng/math/api": "EPS",
			"../src/eqdelta": "eqDeltaS",
		},
	},
	{
		name: "exp",
		type: "VecOpV",
		doc: ["Componentwise `Math.exp` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "exp_2",
		type: "VecOpV",
		doc: ["Componentwise computes `2^x` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "fit",
		type: "VecOpVVVVV",
		doc: [
			"Componentwise maps given {0}D vector `a` from the closed source interval defined by `[b,c]` to the target interval `[d,e]`. Writes result into `o` (or if null, back into `a`)",
		],
		params: PARAMS_VVVVV,
		imports: {
			"@thi.ng/math/fit": "fit as op",
		},
	},
	{
		name: "fit01",
		type: "VecOpVVV",
		doc: [
			"Componentwise maps given {0}D vector `a` from the closed `[0,1]` interval to the closed target defined by `[b,c]`. Writes result into `o` (or if null, back into `a`)",
		],
		params: PARAMS_VVV,
		sep: "_",
		imports: {
			"@thi.ng/math/fit": "fit01 as op",
		},
	},
	{
		name: "fit11",
		type: "VecOpVVV",
		doc: [
			"Componentwise maps given {0}D vector `a` from the closed `[-1,1]` interval to the closed target defined by `[b,c]`. Writes result into `o` (or if null, back into `a`)",
		],
		params: PARAMS_VVV,
		sep: "_",
		imports: {
			"@thi.ng/math/fit": "fit11 as op",
		},
	},
	{
		name: "floor",
		type: "VecOpV",
		doc: ["Componentwise `Math.floor` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "fmod",
		type: "VecOpVV",
		doc: [
			"Similar to {@link mod}, {@link remainder}. This version of modulo uses the same logic as the standard C function `fmod` and/or the JS `%` operator, yielding results with the same sign as `a`, i.e. computes `a-b*trunc(a/b)`.",
		],
		params: PARAMS_VV,
	},
	{
		name: "fmodN",
		type: "VecOpVN",
		doc: [
			"Same as {@link fmod}, but 2nd operand is a scalar (uniform domain for all vector components).",
		],
		params: PARAMS_VN,
	},
	{
		name: "fract",
		type: "VecOpV",
		doc: ["Componentwise computes fractional parts of given {0}D vector."],
		params: PARAMS_V,
		imports: {
			"@thi.ng/math/prec": "fract as op",
		},
	},
	{
		name: "fromBVec",
		type: "FromBVecOpV",
		doc: [
			"Componentwise converts given {0}D boolean vector to floating point (0 or 1).",
		],
		params: PARAMS_V,
	},
	{
		name: "madd",
		type: "VecOpVVV",
		doc: ["Componentwise {0}D vector multiply-add.", "`o = a * b + c`"],
		params: PARAMS_VVV,
	},
	{
		name: "maddN",
		type: "VecOpVNV",
		doc: [
			"Componentwise {0}D vector multiply-add with a uniform scalar factor.",
			"`o = a * n + b`",
		],
		params: PARAMS_VNV,
	},
	{
		name: "mix",
		type: "VecOpVVV",
		doc: [
			"Componentwise {0}D vector linear interpolation.",
			"`o = a + (b - a) * c`",
		],
		params: PARAMS_VVV,
	},
	{
		name: "mixN",
		type: "VecOpVVN",
		doc: [
			"Componentwise {0}D vector linear interpolation with a uniform scalar factor.",
			"`o = a + (b - a) * n`",
		],
		params: PARAMS_VVN,
	},
	{
		name: "msub",
		type: "VecOpVVV",
		doc: [
			"Componentwise {0}D vector multiply-subtract.",
			"`o = a * b - c`",
		],
		params: PARAMS_VVV,
	},
	{
		name: "msubN",
		type: "VecOpVNV",
		doc: [
			"Componentwise {0}D vector multiply-subtract with a uniform scalar factor.",
			"`o = a * n - b`",
		],
		params: PARAMS_VNV,
	},
	{
		name: "mul",
		type: "VecOpVV",
		doc: ["Componentwise {0}D vector multiplication."],
		params: PARAMS_VV,
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
		name: "sub",
		type: "VecOpVV",
		doc: ["Componentwise {0}D vector subtraction."],
		params: PARAMS_VV,
	},
	{
		name: "subm",
		type: "VecOpVVV",
		doc: [
			"Componentwise {0}D vector subtract-multiply.",
			"`o = (a - b) * c`",
		],
		params: PARAMS_VVV,
	},
	{
		name: "submN",
		type: "VecOpVVN",
		doc: [
			"Componentwise {0}D vector subtract-multiply with scalar factor.",
			"`o = (a - b) * n`",
		],
		params: PARAMS_VVN,
	},
	{
		name: "subN",
		type: "VecOpVN",
		doc: ["Componentwise {0}D vector subtraction with a uniform scalar."],
		params: PARAMS_VN,
	},
];

for (let spec of SPECS) {
	emitFamily(spec);
}

LOGGER.info("num functions:", SPECS.length * 5);
