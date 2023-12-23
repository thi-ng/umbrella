// thing:no-export
import type { Fn, Fn2, IObjectOf, NumOrString } from "@thi.ng/api";
import { int, type Command } from "@thi.ng/args";
import { isArray, isPlainObject, isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { files, readJSON } from "@thi.ng/file-io";
import {
	deg,
	em,
	ex,
	ms,
	percent,
	px,
	rad,
	rem,
	second,
	setPrecision,
	turn,
	url,
	vh,
	vmax,
	vmin,
	vw,
} from "@thi.ng/hiccup-css";
import type { ILogger } from "@thi.ng/logger";
import { permutations } from "@thi.ng/transducers";
import { statSync } from "fs";
import { resolve } from "path";
import {
	ARG_PRETTY,
	type AppCtx,
	type CommonOpts,
	type CompiledSpecs,
	type GeneratorConfig,
	type Spec,
} from "./api.js";
import { maybeWriteText } from "./utils.js";

interface GenerateOpts extends CommonOpts {
	prec: number;
	pretty: boolean;
}

export const UNITS: Record<string, Fn<any, any>> = {
	deg,
	em,
	ex,
	ms,
	percent,
	px,
	rad,
	rem,
	second,
	turn,
	url,
	vh,
	vmax,
	vmin,
	vw,
	"%": percent,
};

export const VARIATIONS: IObjectOf<string[]> = {
	"": [""],
	a: [""],
	h: ["-left", "-right"],
	v: ["-top", "-bottom"],
	t: ["-top"],
	top: ["top"],
	b: ["-bottom"],
	bottom: ["bottom"],
	r: ["-right"],
	right: ["right"],
	l: ["-left"],
	left: ["left"],
	x: ["-x"],
	y: ["-y"],
};

export const GENERATE: Command<
	GenerateOpts,
	CommonOpts,
	AppCtx<GenerateOpts>
> = {
	desc: "Generate framework rules from specs",
	opts: {
		...ARG_PRETTY,
		prec: int({ default: 3, desc: "Number of fractional digits" }),
	},
	inputs: 1,
	fn: async (ctx) => {
		const {
			logger,
			opts: { prec, out, pretty },
			inputs,
		} = ctx;
		const root = resolve(inputs[0]);
		if (!statSync(root).isDirectory())
			illegalArgs(`${root} is not a directory`);
		const result: CompiledSpecs = {
			info: { name: "TODO", version: "0.0.0" },
			media: {},
			classes: {},
			decls: [],
		};
		setPrecision(prec);
		for (let input of files(root, ".json")) {
			const config = readJSON<GeneratorConfig>(input, logger);
			Object.assign(result.info, config.info);
			Object.assign(result.media, config.media);
			if (config.decls) result.decls.push(...config.decls);
			for (let spec of config.specs) {
				expandSpec(config, spec, result.classes, logger);
			}
		}
		maybeWriteText(
			out,
			JSON.stringify(result, null, pretty ? 4 : 0),
			logger
		);
	},
};

/** @internal */
export const expandSpec = (
	config: Pick<GeneratorConfig, "tables" | "vars">,
	spec: Spec,
	defs: IObjectOf<any>,
	logger: ILogger
) => {
	const variationIDs = isArray(spec.var) ? spec.var : [""];
	const props = isString(spec.props) ? { [spec.props]: "<v>" } : spec.props!;
	const values = __items(spec, config);
	const ownNames = new Set<string>();
	for (let currVarID of variationIDs) {
		for (let [varValue, currKey] of permutations(
			config.vars?.[currVarID] || VARIATIONS[currVarID],
			Object.keys(values)
		)) {
			const name = __withVariations(
				spec.name,
				currVarID,
				varValue,
				currKey,
				values[currKey]
			);
			const unit = spec.unit
				? __withVariations(
						spec.unit,
						currVarID,
						varValue,
						currKey,
						values[currKey]
				  )
				: undefined;
			const currValue = __value(values[currKey], unit);
			if (!defs[name]) {
				defs[name] =
					spec.user != null
						? {
								__user: __withVariations(
									spec.user,
									currVarID,
									varValue,
									currKey,
									values[currKey]
								),
						  }
						: {};
			} else if (!ownNames.has(name))
				illegalArgs(`duplicate class ID: ${name}`);
			ownNames.add(name);
			for (let [k, v] of Object.entries(props)) {
				const prop = __withVariations(
					k,
					currVarID,
					varValue,
					currKey,
					values[currKey]
				);
				const val = __withVariations(
					!unit || isString(v) ? String(v) : UNITS[unit](v),
					currVarID,
					varValue,
					currKey,
					currValue
				);
				defs[name][prop] = val;
				logger.debug(name, prop, val);
			}
		}
	}
	return defs;
};

/** @internal */
const __items = (spec: Spec, config: Pick<GeneratorConfig, "tables">) => {
	const $values = isString(spec.values)
		? config.tables?.[spec.values] ||
		  illegalArgs(`invalid table ID: ${spec.values}`)
		: spec.values;
	if (isPlainObject($values)) return <IObjectOf<NumOrString>>$values;
	const keyFn: Fn2<any, number, string> =
		spec.key === "v"
			? (v) => String(v)
			: spec.key === "i1"
			? (_, i) => String(i + 1)
			: spec.key === undefined
			? (_, i) => String(i)
			: illegalArgs(`invalid key type: ${spec.key}`);
	return (<any[]>$values).reduce(
		(acc: IObjectOf<NumOrString>, x: any, i: number) => {
			acc[keyFn(x, i)] = x;
			return acc;
		},
		{}
	);
};

/** @internal */
const __value = (x: NumOrString, unitID?: string) => {
	if (!unitID || isString(x)) return x;
	const unit = UNITS[unitID];
	if (!unit) illegalArgs(`invalid unit: ${unitID}`);
	return unit(x);
};

/** @internal */
const __withVariations = (
	base: string,
	vid: string,
	$var: string,
	k: string,
	v: NumOrString
) =>
	base
		.replace("<vid>", vid)
		.replace("<var>", $var)
		.replace("<k>", k)
		.replace("<v>", String(v));
