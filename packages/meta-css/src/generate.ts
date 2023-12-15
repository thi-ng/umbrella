// thing:no-export
import type { Fn, IObjectOf, Nullable } from "@thi.ng/api";
import { int, type Command } from "@thi.ng/args";
import { isArray, isPlainObject, isString } from "@thi.ng/checks";
import { assert, illegalArgs } from "@thi.ng/errors";
import { readJSON } from "@thi.ng/file-io";
import { PRECISION, percent, px, rem, setPrecision } from "@thi.ng/hiccup-css";
import { permutations } from "@thi.ng/transducers";
import type {
	AppCtx,
	CommonOpts,
	CompiledSpecs,
	GeneratorConfig,
	Index,
	Spec,
} from "./api.js";
import { maybeWriteText } from "./utils.js";

interface GenerateOpts extends CommonOpts {
	prec: number;
}

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

export const GENERATE: Command<
	GenerateOpts,
	CommonOpts,
	AppCtx<GenerateOpts>
> = {
	desc: "Generate MetaCSS specs",
	opts: {
		prec: int({ default: 3, desc: "Number of fractional digits" }),
	},
	inputs: 1,
	fn: async (ctx) => {
		const {
			logger,
			opts: { prec, out },
			inputs,
		} = ctx;
		const config: GeneratorConfig = readJSON(inputs[0], logger);
		const result: CompiledSpecs = {
			info: config.info!,
			media: config.media || {},
			defs: generateAll(config, prec),
		};

		maybeWriteText(out, JSON.stringify(result), logger);
	},
};

const generateAll = (config: GeneratorConfig, prec: number) => {
	setPrecision(prec);
	const defs: IObjectOf<any> = {};
	for (let spec of config.specs) {
		const vars = resolveVariations(spec.var);
		if (spec.def) {
			for (let vid of vars) {
				genVariationDef(defs, config, spec, vid);
			}
		} else {
			const baseProps = isString(spec.prop) ? [spec.prop] : spec.prop;
			for (let vid of vars) {
				const props = [
					...permutations(baseProps, (<any>VARIATIONS)[vid]),
				].map((x) => x.join(""));
				genVariation(
					defs,
					config,
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
	return defs;
};

const genVariation = (
	defs: IObjectOf<any>,
	config: GeneratorConfig,
	spec: Spec,
	varID: string
) => {
	const prefix = spec.prefix.replace("*", varID);
	const props = __props(spec.prop, varID);
	const unit = __unit(config, spec.unit);
	const items = __items(config, spec.items);
	items.forEach((x, i) => {
		const id = __name(prefix, spec.index, x, i);
		assert(!defs[id], `duplicate rule ID: ${id}`);
		const val = __value(x, unit);
		defs[id] = props.reduce((acc, p) => ((acc[p] = val), acc), <any>{});
	});
};

const genVariationDef = (
	defs: IObjectOf<any>,
	config: GeneratorConfig,
	spec: Pick<Spec, "prefix" | "index" | "items" | "def" | "unit">,
	varID: string
) => {
	const prefix = spec.prefix.replace("*", varID);
	const unit = __unit(config, spec.unit);
	const items = __items(config, spec.items);
	const $var = (<any>VARIATIONS)[varID];
	items.forEach((x, i) => {
		const id = __name(prefix, spec.index, x, i);
		assert(!defs[id], `duplicate rule ID: ${id}`);
		const val = __value(x, unit);
		const props = Object.entries(spec.def!).reduce(
			(acc, [p, v]) => (
				(acc[p.replace("*", $var)] = v.replace("*", val)), acc
			),
			<any>{}
		);
		defs[id] = props;
	});
};

const __name = (prefix: string, index: Index | undefined, x: any, i: number) =>
	prefix + __index(index, x, i);

const __index = (index: Index | undefined, x: any, i: number) => {
	if (index === undefined) return "";
	switch (index) {
		case "i":
			return i;
		case "i1":
			return i + 1;
		case "v":
			return x;
		default:
			illegalArgs(`invalid index type: ${index}`);
	}
};

const __value = (x: any, unit?: Fn<any, string>) => (unit ? unit(x) : x);

const __unit = (specs: GeneratorConfig, id: Nullable<string>) => {
	if (id === undefined) return rem;
	if (id === null) return (x: any) => String(x);
	if (UNITS[id]) return UNITS[id];
	return specs.indexed[id!]
		? (x: any) => specs.indexed[id!][x]
		: illegalArgs(`invalid unit: ${id}`);
};

const __items = (specs: GeneratorConfig, $items: any) => {
	let items = $items;
	if (isString(items)) items = specs.indexed[items];
	if (isPlainObject(items)) return Object.keys(items);
	return isArray(items) ? items : illegalArgs($items);
};

const __props = (props: string | string[], varID: string) =>
	(isString(props) ? [props] : props).map((x) => x.replace("*", varID));

const resolveVariations = (vars?: string | string[]) => {
	if (!vars) return [""];
	if (isString(vars)) {
		return (
			(<any>VAR_IDS)[vars] || illegalArgs(`invalid variation: ${vars}`)
		);
	}
	return vars;
};
