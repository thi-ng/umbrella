import type { Fn, IObjectOf, Nullable } from "@thi.ng/api";
import { int, type Command, flag } from "@thi.ng/args";
import { isArray, isNumber, isPlainObject, isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { readJSON } from "@thi.ng/file-io";
import { PRECISION, percent, px, rem, setPrecision } from "@thi.ng/hiccup-css";
import { getIn, mutIn } from "@thi.ng/paths";
import { camel } from "@thi.ng/strings";
import { permutations } from "@thi.ng/transducers";
import type { AppCtx, CommonOpts } from "./api.js";
import { maybeWriteText } from "./utils.js";

interface GenerateOpts extends CommonOpts {
	prec: number;
	ts: boolean;
}

interface Specs {
	media: IObjectOf<string>;
	indexed: IObjectOf<any>;
	specs: Spec[];
}

interface Spec {
	prefix: string;
	prop: string | string[];
	def?: Record<string, string>;
	items: string | any[];
	file: string;
	index?: string;
	unit?: string | null;
	comment?: string;
	var?: string | string[];
}

interface Output {
	src: string[];
	meta: string[];
}

export const GENERATE: Command<
	GenerateOpts,
	CommonOpts,
	AppCtx<GenerateOpts>
> = {
	desc: "Generate MetaCSS specs",
	opts: {
		prec: int({ default: 3, desc: "Number of fractional digits" }),
		ts: flag({ desc: "Emit as TypeScript" }),
	},
	inputs: 1,
	fn: async ({ logger, opts: { out, prec, ts }, inputs }) => {
		const allSpecs: Specs = readJSON(inputs[0], logger);
		const outputs = generateRules(allSpecs, prec);
		for (let [file, { src }] of Object.entries(outputs)) {
			maybeWriteText(out, `/${ensureExt(file, ts)}`, src, logger);
		}

		const declModules = [...Object.keys(outputs)]
			.sort()
			.map((x) => `export * from "./${ensureExt(x, false)}";`);

		const body = [
			...declModules,
			"",
			`export const __MEDIA_QUERIES__ = ${JSON.stringify(
				allSpecs.media,
				null,
				4
			)};`,
		];
		maybeWriteText(out, ensureExt("/index.ts", ts), body, logger);
	},
};

const UNITS: Record<string, Fn<any, any>> = {
	px,
	rem,
	"%": percent,
	norm: (x) => parseFloat((x * 0.01).toFixed(PRECISION)),
};

const VARIATIONS = {
	"": [""],
	a: [""],
	h: ["-left", "-right"],
	v: ["-top", "-bottom"],
	t: ["-top"],
	b: ["-bottom"],
	r: ["-right"],
	l: ["-left"],
};

const VAR_IDS = {
	all: ["a", "h", "v", "t", "r", "b", "l"],
	trbl: ["t", "r", "b", "l"],
	atrbl: ["a", "t", "r", "b", "l"],
	h: ["l", "r"],
	v: ["t", "b"],
};

export const generateRules = (allSpecs: Specs, prec: number) => {
	setPrecision(prec);
	const outputs: Record<string, Output> = {};
	for (let $spec of allSpecs.specs) {
		const spec = <Spec>$spec;
		let out = getIn(outputs, [spec.file]);
		if (!out) mutIn(outputs, [spec.file], (out = { src: [], meta: [] }));
		const vars = resolveVariations(spec.var);
		if (spec.comment) out.src.push(`// ${spec.comment}`);
		if (spec.def) {
			for (let vid of vars) {
				genVariationDef(out, allSpecs, spec, vid);
			}
		} else {
			const baseProps = isString(spec.prop) ? [spec.prop] : spec.prop;
			for (let vid of vars) {
				const props = [
					...permutations(baseProps, (<any>VARIATIONS)[vid]),
				].map((x) => x.join(""));
				genVariation(
					out,
					allSpecs,
					{
						...spec,
						prefix: spec.prefix + vid,
						prop: props,
					},
					vid
				);
			}
		}
	}
	return outputs;
};

const resolveValue = (x: any, unit?: Fn<any, string>) => {
	let val = unit ? unit(x) : x;
	return isNumber(val) ? val : `"${val}"`;
};

const resolveUnit = (specs: Specs, id: Nullable<string>) => {
	if (id === undefined) return rem;
	if (id === null) return (x: any) => String(x);
	if (UNITS[id]) return UNITS[id];
	return specs.indexed[id!]
		? (x: any) => specs.indexed[id!][x]
		: illegalArgs(`invalid unit: ${id}`);
};

const resolveItems = (specs: Specs, $items: any) => {
	let items = $items;
	if (isString(items)) items = specs.indexed[items];
	if (isPlainObject(items)) return Object.keys(items);
	return isArray(items) ? items : illegalArgs($items);
};

const resolveProps = (props: string | string[], varID: string) => {
	props = isString(props) ? [props] : props;
	return props.map((x) => {
		x = x.replace("*", varID);
		return x.indexOf("-") > 0 ? `"${x}"` : x;
	});
};

const resolveVariations = (vars?: string | string[]) => {
	if (!vars) return [""];
	if (isString(vars)) {
		return (
			(<any>VAR_IDS)[vars] || illegalArgs(`invalid variation: ${vars}`)
		);
	}
	return vars;
};

const genVariation = (
	out: Output,
	specs: Specs,
	spec: Pick<Spec, "prefix" | "prop" | "unit" | "items" | "index">,
	varID: string
) => {
	const id = spec.prefix.replace("*", varID);
	const props = resolveProps(spec.prop, varID);
	const unit = resolveUnit(specs, spec.unit);
	const items = resolveItems(specs, spec.items);
	items.forEach((x, i) => {
		const idx =
			spec.index === "i"
				? i
				: spec.index === "i1"
				? i + 1
				: spec.index === "v"
				? x
				: "";
		const val = resolveValue(x, unit);
		const name = camel(id + idx);
		out.src.push(
			`export const ${name} = { ${props
				.map((p) => `${p}: ${val}`)
				.join(", ")} };`
		);
	});
	out.src.push("");
};

const genVariationDef = (
	out: Output,
	specs: Specs,
	spec: Pick<Spec, "prefix" | "index" | "items" | "def" | "unit">,
	varID: string
) => {
	const id = spec.prefix.replace("*", varID);
	const unit = resolveUnit(specs, spec.unit);
	const items = resolveItems(specs, spec.items);
	const $var = (<any>VARIATIONS)[varID];
	items.forEach((x, i) => {
		const idx =
			spec.index === "i"
				? i
				: spec.index === "i1"
				? i + 1
				: spec.index === "v"
				? x
				: "";
		const val = unit ? unit(x) : x;
		const props = Object.entries(spec.def!)
			.map(
				([p, v]) =>
					`"${p.replace("*", $var)}": "${v.replace("*", val)}"`
			)
			.join(", ");
		const name = camel(id + idx);
		out.src.push(`export const ${name} = { ${props} };`);
	});
	out.src.push("");
};

const ensureExt = (file: string, isTS: boolean) =>
	file.replace(/\.m?[jt]s$/, isTS ? ".mts" : ".mjs");
