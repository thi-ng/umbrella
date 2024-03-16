// thing:no-export
import type { Fn, Fn2, IObjectOf, NumOrString } from "@thi.ng/api";
import type { Command } from "@thi.ng/args";
import { isArray, isPlainObject, isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { readText } from "@thi.ng/file-io";
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
import {
	ARG_OUTPUT,
	ARG_PREC,
	ARG_PRETTY,
	ARG_WATCH,
	type AppCtx,
	type CommonOpts,
	type CompiledSpec,
	type CompiledSpecs,
	type GeneratorConfig,
	type Spec,
	type TemplateSpec,
} from "./api.js";
import { watchInputs as $watch, maybeWriteText } from "./utils.js";

export interface GenerateOpts extends CommonOpts {
	out?: string;
	prec: number;
	pretty: boolean;
	watch: boolean;
}

export const UNITS: Record<string, Fn<any, string>> = {
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

export const TEMPLATE_UNITS: Record<string, Fn<any, string>> = {
	percent: (x) => `${x}%`,
	second: (x) => `${x}s`,
	url: (x) => `url(${x})`,
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
	in: [""],
	out: [""],
};

export const GENERATE: Command<
	GenerateOpts,
	CommonOpts,
	AppCtx<GenerateOpts>
> = {
	desc: "Generate framework rules from specs",
	opts: {
		...ARG_OUTPUT,
		...ARG_PREC,
		...ARG_PRETTY,
		...ARG_WATCH,
	},
	fn: generateCommand,
};

export async function generateCommand(ctx: AppCtx<GenerateOpts>) {
	if (ctx.opts.watch) {
		await watchInputs(ctx);
	} else {
		await generateFramework(
			ctx.inputs.map((path) => readText(path, ctx.logger)),
			ctx.opts,
			ctx.logger
		);
	}
}

/** @internal */
const watchInputs = async (ctx: AppCtx<GenerateOpts>) => {
	$watch(ctx.inputs, ctx.logger).subscribe({
		next(inputs) {
			try {
				generateFramework(
					// process in deterministic order (same as given in CLI)
					Object.keys(inputs)
						.sort()
						.map((k) => inputs[k]),
					ctx.opts,
					ctx.logger
				);
			} catch (e) {
				ctx.logger.warn((<Error>e).message);
			}
		},
	});
};

/** @internal */
const generateFramework = async (
	inputs: string[],
	opts: GenerateOpts,
	logger: ILogger
) => {
	const result: CompiledSpecs = {
		info: { name: "TODO", version: "0.0.0" },
		media: {},
		classes: {},
		templates: {},
		decls: [],
	};
	setPrecision(opts.prec);
	for (let input of inputs) {
		const config: GeneratorConfig = JSON.parse(input);
		Object.assign(result.info, config.info);
		Object.assign(result.media, config.media);
		if (config.decls) result.decls.push(...config.decls);
		if (config.specs) {
			for (let spec of config.specs) {
				try {
					expandSpec(config, spec, result.classes, logger);
				} catch (e) {
					logger.warn(
						`error processing spec: ${spec.name}`,
						e,
						", skipping..."
					);
				}
			}
		}
		if (config.templates) {
			for (let spec of config.templates) {
				expandTemplateSpec(config, spec, result.templates, logger);
			}
		}
	}
	maybeWriteText(
		opts.out,
		JSON.stringify(result, null, opts.pretty ? 4 : 0),
		logger
	);
	return result;
};

/** @internal */
export const expandSpec = (
	config: Pick<GeneratorConfig, "tables" | "vars">,
	spec: Spec,
	defs: IObjectOf<CompiledSpec>,
	logger: ILogger,
	isTemplate = false
) => {
	const variationIDs = isArray(spec.vars) ? spec.vars : [""];
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
			const currValue = isTemplate
				? __templateValue(unit)
				: __value(values[currKey], unit);
			if (!defs[name]) {
				defs[name] = {};
				if (spec.user != null) {
					defs[name].__user = spec.user;
				}
				if (spec.doc != null) {
					defs[name].__doc = {
						group: __withVariations(
							spec.doc.group ?? "TODO",
							currVarID,
							varValue,
							currKey,
							currValue
						),
						desc: spec.doc.desc
							? __withVariations(
									spec.doc.desc,
									currVarID,
									varValue,
									currKey,
									currValue
							  )
							: undefined,
						args: spec.doc.args,
					};
				}
			} else if (!ownNames.has(name)) {
				illegalArgs(`duplicate class ID: ${name}`);
			}
			ownNames.add(name);
			let maxArity = 0;
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
				if (isTemplate)
					maxArity = __maxArity(val, __maxArity(prop, maxArity));
			}
			if (isTemplate) defs[name].__arity = maxArity + 1;
		}
	}
	return defs;
};

/**
 * Same as {@link expandSpec}, but for {@link TemplateSpec}s.
 *
 * @param config
 * @param spec
 * @param defs
 * @param logger
 */
export const expandTemplateSpec = (
	config: Pick<GeneratorConfig, "tables" | "vars">,
	spec: TemplateSpec,
	defs: IObjectOf<any>,
	logger: ILogger
) => expandSpec(config, { ...spec, values: [""] }, defs, logger, true);

/** @internal */
const __maxArity = (x: string, max: number) => {
	const re = /\{(\d+)\}/g;
	let match: RegExpMatchArray | null;
	while ((match = re.exec(x))) {
		max = Math.max(max, +match[1]);
	}
	return max;
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
			: spec.key === "i+1"
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
const __templateValue = (unitID?: string) =>
	"{0}" + (unitID ? TEMPLATE_UNITS[unitID] || unitID : "");

/** @internal */
const __withVariations = (
	base: string,
	vid: string,
	$var: string,
	k: string,
	v: NumOrString
) =>
	base
		.replace(/<vid>/g, vid)
		.replace(/<var>/g, $var)
		.replace(/<k>/g, k)
		.replace(/<v>/g, String(v));
