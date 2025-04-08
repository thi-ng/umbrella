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
	/** Generic (nD) function type */
	typeGeneric?: string;
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
	/** Object of param descriptors for generic version */
	paramsGeneric?: IObjectOf<string>;
	/** Object of custom imports. Keys = pkg names, values = syms */
	imports?: IObjectOf<string>;
	/** Custom imports for generic versions, defaults to {@link FnSpec.imports} */
	importsGeneric?: IObjectOf<string>;
	pre?: string[];
	/** If true (default), op has a multi-method */
	multi?: boolean;
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
	typeGeneric = "Multi" + type,
	dispatch = 1,
	doc = [],
	params,
	paramsGeneric = params,
	imports = {},
	importsGeneric,
	sep = "",
	pre = [],
	multi = true,
	op,
}: FnSpec) => {
	const nakedType = type.replace(/<[a-z0-9, ]+>$/i, "");
	const nakedTypeGeneric = typeGeneric.replace(/<[a-z0-9, ]+>$/i, "");
	const typeImport = `import type { ${nakedType} } from "../src/api.js";`;
	const userImportsFixed = Object.entries(imports).map(
		([pkg, syms]) => `import { ${syms} } from "${pkg}";`
	);
	const userImportsGeneric = Object.entries(importsGeneric ?? imports).map(
		([pkg, syms]) => `import { ${syms} } from "${pkg}";`
	);
	const $imports = [...userImportsGeneric];
	if (multi) $imports.push(`import { vop } from "../src/vop.js";`);
	const $docs = doc.join("\n");
	const generic = multi
		? [
				...formatDocs(
					$docs +
						"\n\n@remarks\nMulti-method, auto-delegates to optimized versions where possible.",
					"n",
					paramsGeneric
				),
				`export const ${name}: ${typeGeneric} = vop(${dispatch});`,
				`${name}.default(${formatFunction(
					name,
					(<any>v)[name].impl().toString(),
					type,
					"",
					op
				)});`,
		  ]
		: [
				...formatDocs($docs, "n", paramsGeneric),
				`export const ${name}: ${typeGeneric} = ${formatFunction(
					name,
					(<any>v)[name].toString(),
					type,
					"",
					op
				)};`,
		  ];
	for (let d of [2, 3, 4]) {
		const id = name + sep + d;
		if (!(<any>v)[id]) continue;
		writeText(
			`${OUT_DIR}/${id}.ts`,
			[
				...userImportsFixed,
				typeImport,
				"",
				...pre,
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
		if (multi) {
			$imports.push(`import { ${id} } from "./${id}.js";`);
			generic.push(`${name}.add(${d}, ${id});`);
		}
	}
	writeText(
		`${OUT_DIR}/${name}.ts`,
		[
			`import type { ${nakedTypeGeneric} } from "../src/api.js";`,
			...$imports,
			"",
			...pre,
			...generic,
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

const PARAMS_N = { a: "vector", n: "scalar" };

const PARAMS_SVV = {
	out: "output vector",
	a: "input vector",
	b: "input vector",
	io: "index (default: 0)",
	ia: "index (default: 0)",
	ib: "index (default: 0)",
	so: "stride (default: 1)",
	sa: "stride (default: 1)",
	sb: "stride (default: 1)",
};

const PARAMS_SGVV = {
	out: "output vector",
	a: "input vector",
	b: "input vector",
	size: "vector size",
	io: "index (default: 0)",
	ia: "index (default: 0)",
	ib: "index (default: 0)",
	so: "stride (default: 1)",
	sa: "stride (default: 1)",
	sb: "stride (default: 1)",
};

const PARAMS_SVN = {
	out: "output vector",
	a: "input vector",
	n: "scalar",
	io: "index (default: 0)",
	ia: "index (default: 0)",
	so: "stride (default: 1)",
	sa: "stride (default: 1)",
};

const PARAMS_SGVN = {
	out: "output vector",
	a: "input vector",
	n: "scalar",
	size: "vector size",
	io: "index (default: 0)",
	ia: "index (default: 0)",
	so: "stride (default: 1)",
	sa: "stride (default: 1)",
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
		name: "addI",
		type: "VecOpVV",
		doc: ["Componentwise {0}D signed integer vector addition."],
		params: PARAMS_VV,
	},
	{
		name: "addNI",
		type: "VecOpVN",
		doc: [
			"Componentwise {0}D signed integer vector addition with uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "addNU",
		type: "VecOpVN",
		doc: [
			"Componentwise {0}D unsigned integer vector addition with uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "addU",
		type: "VecOpVV",
		doc: ["Componentwise {0}D unsigned integer vector addition."],
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
		name: "addNS",
		type: "VecOpSVN",
		typeGeneric: "VecOpSGVN",
		doc: [
			"Componentwise {0}D strided vector addition with uniform scalar.",
		],
		params: PARAMS_SVN,
		paramsGeneric: PARAMS_SGVN,
		multi: false,
	},
	{
		name: "addS",
		type: "VecOpSVV",
		typeGeneric: "VecOpSGVV",
		doc: ["Componentwise {0}D strided vector addition."],
		params: PARAMS_SVV,
		paramsGeneric: PARAMS_SGVV,
		multi: false,
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
		name: "degrees",
		type: "VecOpV",
		doc: [
			"Componentwise computes converts radians to degrees of given {0}D vector. Also see {@link radians}.",
		],
		params: PARAMS_V,
		imports: {
			"@thi.ng/math/angle": "deg as op",
		},
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
		name: "divNS",
		type: "VecOpSVN",
		typeGeneric: "VecOpSGVN",
		doc: [
			"Componentwise {0}D strided vector division with uniform scalar.",
		],
		params: PARAMS_SVN,
		paramsGeneric: PARAMS_SGVN,
		multi: false,
	},
	{
		name: "divS",
		type: "VecOpSVV",
		typeGeneric: "VecOpSGVV",
		doc: ["Componentwise {0}D strided vector division."],
		params: PARAMS_SVV,
		paramsGeneric: PARAMS_SGVV,
		multi: false,
	},
	{
		name: "dot",
		type: "VecOpRoVV<number>",
		doc: ["Computes dot product of given {0}D vectors."],
		dispatch: 0,
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
		dispatch: 0,
	},
	{
		name: "every",
		type: "BVecOpRoV<boolean>",
		doc: ["Returns true if all vector components are truthy."],
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
		name: "gt",
		type: "CompareOp",
		doc: [
			"Compnentwise checks if given {0}D vector `a` is greater than `b` and writes results to boolean output vector. If `out` is null, creates a new result vector.",
		],
	},
	{
		name: "gte",
		type: "CompareOp",
		doc: [
			"Compnentwise checks if given {0}D vector `a` is greater than or equal to `b` and writes results to boolean output vector. If `out` is null, creates a new result vector.",
		],
	},
	{
		name: "invert",
		type: "VecOpV",
		doc: [
			"Componentwise computes the reciprocal (1/x) of given {0}D vector.",
		],
		params: PARAMS_V,
	},
	{
		name: "invSqrt",
		type: "VecOpV",
		doc: [
			"Componentwise computes the inverse squareroot of given {0}D vector.",
		],
		params: PARAMS_V,
	},
	{
		name: "isInf",
		type: "ToBVecOpV",
		doc: [
			"Componentwise checks if given {0}D vector is infinite and writes results to boolean output vector. If `out` is null, creates a new result vector.",
		],
		params: PARAMS_V,
	},
	{
		name: "isNaN",
		type: "ToBVecOpV",
		doc: [
			"Componentwise checks if given {0}D vector is NaN and writes results to boolean output vector. If `out` is null, creates a new result vector.",
		],
		params: PARAMS_V,
		pre: ["const op = globalThis.isNaN;\n"],
	},
	{
		name: "log",
		type: "VecOpV",
		doc: ["Componentwise `Math.log` of given {0}D vector."],
		params: PARAMS_V,
	},
	// TODO fix original naming to: log2_2, log2_3, log2_4
	{
		name: "log_2",
		type: "VecOpV",
		doc: ["Componentwise `Math.log2` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "logicAnd",
		type: "BVecOpVV",
		doc: ["Componentwise logical AND of given {0}D boolean vectors."],
		params: PARAMS_VV,
	},
	{
		name: "logicNot",
		type: "BVecOpV",
		doc: ["Componentwise logical NOT of given {0}D boolean vector."],
		params: PARAMS_V,
	},
	{
		name: "logicOr",
		type: "BVecOpVV",
		doc: ["Componentwise logical OR of given {0}D boolean vectors."],
		params: PARAMS_VV,
	},
	{
		name: "lshiftI",
		type: "VecOpVV",
		doc: [
			"Componentwise binary left shift of given {0}D signed integer vector `a`. Vector `b` contains the shift amounts.",
		],
		params: PARAMS_VV,
	},
	{
		name: "lshiftNI",
		type: "VecOpVN",
		doc: [
			"Componentwise binary left shift of given {0}D signed integer vector by uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "lshiftNU",
		type: "VecOpVN",
		doc: [
			"Componentwise binary left shift of given {0}D unsigned integer vector by uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "lshiftU",
		type: "VecOpVV",
		doc: [
			"Componentwise binary left shift of given {0}D unsigned integer vector `a`. Vector `b` contains the shift amounts.",
		],
		params: PARAMS_VV,
	},
	{
		name: "lt",
		type: "CompareOp",
		doc: [
			"Compnentwise checks if given {0}D vector `a` is less than `b` and writes results to boolean output vector. If `out` is null, creates a new result vector.",
		],
	},
	{
		name: "lte",
		type: "CompareOp",
		doc: [
			"Compnentwise checks if given {0}D vector `a` is less than or equal to `b` and writes results to boolean output vector. If `out` is null, creates a new result vector.",
		],
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
		name: "magSq",
		type: "VecOpRoV<number>",
		doc: ["Computes the squared magnitude of given {0}D vector"],
		dispatch: 0,
	},
	{
		name: "max",
		type: "VecOpVV",
		doc: ["Componentwise `Math.max` of given {0}D vectors."],
		params: PARAMS_VV,
	},
	{
		name: "min",
		type: "VecOpVV",
		doc: ["Componentwise `Math.min` of given {0}D vectors."],
		params: PARAMS_VV,
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
		name: "mod",
		type: "VecOpVV",
		doc: [
			"Componentwise computes modulo of given {0}D vector. Similar to {@link fmod}, {@link remainder}. Returns `a - b * floor(a / b)` (same as GLSL `mod(a, b)`).",
		],
		params: PARAMS_V,
		imports: {
			"@thi.ng/math/prec": "mod as op",
		},
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
		name: "mulI",
		type: "VecOpVV",
		doc: ["Componentwise {0}D signed integer vector multiplication."],
		params: PARAMS_VV,
	},
	{
		name: "mulNI",
		type: "VecOpVN",
		doc: [
			"Componentwise {0}D signed integer vector multiplication with uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "mulNU",
		type: "VecOpVN",
		doc: [
			"Componentwise {0}D unsigned integer vector multiplication with uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "mulU",
		type: "VecOpVV",
		doc: ["Componentwise {0}D unsigned integer vector multiplication."],
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
		name: "mulNS",
		type: "VecOpSVN",
		typeGeneric: "VecOpSGVN",
		doc: [
			"Componentwise {0}D strided vector multiplication with uniform scalar.",
		],
		params: PARAMS_SVN,
		paramsGeneric: PARAMS_SGVN,
		multi: false,
	},
	{
		name: "mulS",
		type: "VecOpSVV",
		typeGeneric: "VecOpSGVV",
		doc: ["Componentwise {0}D strided vector multiplication."],
		params: PARAMS_SVV,
		paramsGeneric: PARAMS_SGVV,
		multi: false,
	},
	{
		name: "neq",
		type: "CompareOp",
		doc: [
			"Compnentwise checks if given {0}D vectors `a` and `b` are not equal (using `!==` for comparison) and writes results to boolean output vector. If `out` is null, creates a new result vector.",
		],
	},
	{
		name: "pow",
		type: "VecOpVV",
		doc: [
			"Componentwise `Math.pow` of given {0}D vector `a`. Vector `b` contains exponents.",
		],
		params: PARAMS_VV,
	},
	{
		name: "powN",
		type: "VecOpVN",
		doc: [
			"Componentwise `Math.pow` of given {0}D vector and uniform scalar exponent.",
		],
		params: PARAMS_VN,
	},
	{
		name: "radians",
		type: "VecOpV",
		doc: [
			"Componentwise computes converts degrees to radians of given {0}D vector. Also see {@link degrees}.",
		],
		params: PARAMS_V,
		imports: {
			"@thi.ng/math/angle": "rad as op",
		},
	},
	{
		name: "randMinMax",
		type: "VecOpVVO<IRandom>",
		doc: [],
		params: {
			a: "vector",
			b: "input vector (min. bounds)",
			c: "input vector (max. bounds)",
			rnd: "PRNG instance",
		},
		imports: {
			"@thi.ng/random": "type IRandom",
			"@thi.ng/random/system": "SYSTEM as op",
		},
	},
	{
		name: "random",
		type: "VecOpOOO<number, number, IRandom>",
		doc: [
			"Sets `a` to random vector, with each component in the semi-open interval `[b,c)`. If no `rnd` instance is given, uses [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html). Creates new vector if `a` is null.",
			"",
			"**IMPORTANT:** The non-fixed sized version of this function can ONLY be used if `a` is given and initialized to the desired size/length.",
		],
		params: {
			a: "vector",
			b: "scalar (min. bounds, default: -1)",
			c: "scalar (max. bounds, default: 1)",
			rnd: "PRNG instance",
		},
		imports: {
			"@thi.ng/random": "type IRandom",
			"@thi.ng/random/system": "SYSTEM as op",
		},
		dispatch: 0,
	},
	{
		name: "remainder",
		type: "VecOpVV",
		doc: [
			"Componentwise computes modulo of given {0}D vector. Uses the same logic as the standard C function `remainder()`, i.e. componentwise `a - b * round(a / b)`. Also see {@link mod}, {@link fmod}.",
		],
		params: PARAMS_VV,
		imports: {
			"@thi.ng/math/libc": "remainder as op",
		},
	},
	{
		name: "remainderN",
		type: "VecOpVN",
		doc: [
			"Same as {@link remainder}, but but second operand is a single scalar (uniform domain for all vector components).",
		],
		params: PARAMS_VN,
		imports: {
			"@thi.ng/math/libc": "remainder as op",
		},
	},
	{
		name: "round",
		type: "VecOpVV",
		doc: [
			"Componentwise rounds given {0}D vector `a` to multiples of components in vector `b`.",
		],
		params: PARAMS_VV,
		imports: {
			"@thi.ng/math/prec": "roundTo as op",
		},
	},
	{
		name: "roundN",
		type: "VecOpVO<number>",
		doc: [
			"Componentwise rounds given {0}D vector `a` to multiples of uniform scalar `n` (default: 1).",
		],
		params: PARAMS_VN,
		imports: {
			"@thi.ng/math/prec": "roundTo as op",
		},
	},
	{
		name: "rshiftI",
		type: "VecOpVV",
		doc: [
			"Componentwise binary right shift of given {0}D signed integer vector `a`. Vector `b` contains the shift amounts.",
		],
		params: PARAMS_VV,
	},
	{
		name: "rshiftNI",
		type: "VecOpVN",
		doc: [
			"Componentwise binary right shift of given {0}D signed integer vector by uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "rshiftNU",
		type: "VecOpVN",
		doc: [
			"Componentwise binary right shift of given {0}D unsigned integer vector by uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "rshiftU",
		type: "VecOpVV",
		doc: [
			"Componentwise binary right shift of given {0}D unsigned integer vector `a`. Vector `b` contains the shift amounts.",
		],
		params: PARAMS_VV,
	},
	{
		name: "safeDiv",
		type: "VecOpVV",
		doc: [
			"Componentwise divides given {0}D vector `a` by vector `b`. If a divisor component is zero, the result will be zero too.",
		],
		params: PARAMS_VV,
		imports: {
			"@thi.ng/math/safe-div": "safeDiv as op",
		},
	},
	{
		name: "set",
		type: "VecOpV",
		doc: [
			"Copies {0}D vector `a` to `o` (or if latter is null, creates a new vector).",
		],
		params: PARAMS_V,
	},
	{
		name: "setN",
		type: "VecOpN",
		doc: ["Sets all components of {0}D vector `a` to scalar value `n`."],
		params: PARAMS_N,
	},
	{
		name: "sign",
		type: "VecOpV",
		doc: ["Componentwise `Math.sign` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "sin",
		type: "VecOpV",
		doc: ["Componentwise `Math.sin` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "sinh",
		type: "VecOpV",
		doc: ["Componentwise `Math.sinh` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "smoothStep",
		type: "VecOpVVV",
		doc: [
			'Componentwise computes GLSL `smoothstep()` for given {0}D vector `c` and using "edge" vectors `a` and `b`.',
		],
		params: PARAMS_VVV,
		imports: {
			"@thi.ng/math/step": "smoothStep as op",
		},
	},
	{
		name: "some",
		type: "BVecOpRoV<boolean>",
		doc: ["Returns true if at least one vector component is truthy."],
	},
	{
		name: "sqrt",
		type: "VecOpV",
		doc: ["Componentwise `Math.sqrt` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "step",
		type: "VecOpVV",
		doc: [
			'Componentwise computes GLSL `step()` for given {0}D vector `b` and "edge" vectors `a`.',
		],
		params: PARAMS_VV,
		imports: {
			"@thi.ng/math/step": "step as op",
		},
	},
	{
		name: "sub",
		type: "VecOpVV",
		doc: ["Componentwise {0}D vector subtraction."],
		params: PARAMS_VV,
	},
	{
		name: "subI",
		type: "VecOpVV",
		doc: ["Componentwise {0}D signed integer vector subtraction."],
		params: PARAMS_VV,
	},
	{
		name: "subNI",
		type: "VecOpVN",
		doc: [
			"Componentwise {0}D signed integer vector subtraction with uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "subNU",
		type: "VecOpVN",
		doc: [
			"Componentwise {0}D unsigned integer vector subtraction with uniform scalar.",
		],
		params: PARAMS_VN,
	},
	{
		name: "subU",
		type: "VecOpVV",
		doc: ["Componentwise {0}D unsigned integer vector subtraction."],
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
	{
		name: "subNS",
		type: "VecOpSVN",
		typeGeneric: "VecOpSGVN",
		doc: [
			"Componentwise {0}D strided vector subtraction with uniform scalar.",
		],
		params: PARAMS_SVN,
		paramsGeneric: PARAMS_SGVN,
		multi: false,
	},
	{
		name: "subS",
		type: "VecOpSVV",
		typeGeneric: "VecOpSGVV",
		doc: ["Componentwise {0}D strided vector subtraction."],
		params: PARAMS_SVV,
		paramsGeneric: PARAMS_SGVV,
		multi: false,
	},
	{
		name: "tan",
		type: "VecOpV",
		doc: ["Componentwise `Math.tan` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "tanh",
		type: "VecOpV",
		doc: ["Componentwise `Math.tanh` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "trunc",
		type: "VecOpV",
		doc: ["Componentwise `Math.trunc` of given {0}D vector."],
		params: PARAMS_V,
	},
	{
		name: "wrap",
		type: "VecOpVVV",
		doc: [
			"Componentwise folds given {0}D vector `a` into the closed interval defined by vectors `b` and `c`.",
		],
		params: PARAMS_VVV,
		imports: {
			"@thi.ng/math/interval": "wrap as op",
		},
	},
];

for (let spec of SPECS) {
	emitFamily(spec);
}

LOGGER.info("num functions:", SPECS.length * 5);
