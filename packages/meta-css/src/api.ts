// thing:no-export
import type { IObjectOf, NumOrString } from "@thi.ng/api";
import { flag, string, strings, type CommandCtx } from "@thi.ng/args";
import type { FormatPresets } from "@thi.ng/text-format";

export interface CommonOpts {
	verbose: boolean;
}

export interface AppCtx<T extends CommonOpts>
	extends CommandCtx<T, CommonOpts> {
	format: FormatPresets;
}

export interface CompiledSpecs {
	classes: IObjectOf<any>;
	decls: any[];
	media: IObjectOf<any>;
	info: SpecInfo;
}

export interface GeneratorConfig {
	info?: SpecInfo;
	media?: IObjectOf<string>;
	tables?: IObjectOf<IObjectOf<NumOrString> | string[] | number[]>;
	vars?: IObjectOf<string[]>;
	decls?: any[];
	specs: Spec[];
}

export interface SpecInfo {
	name: string;
	version: string;
}

export interface Spec {
	name: string;
	key?: "v" | "i" | "i+1";
	props: string | IObjectOf<NumOrString>;
	values: IObjectOf<NumOrString> | string[] | number[] | string;
	unit?: string;
	vars?: string[];
	user?: any;
}

export const ARG_SPECS = {
	specs: string({
		alias: "s",
		optional: false,
		desc: "Path to generated JSON defs",
	}),
};

export const ARG_INCLUDE = {
	include: strings({
		alias: "I",
		desc: "Include CSS files (prepend)",
	}),
};

export const ARG_EVAL = {
	eval: string({
		alias: "e",
		desc: "eval meta stylesheet in given string (ignores other inputs & includes)",
	}),
};

export const ARG_FORCE_INCLUDE = {
	force: strings({
		alias: "f",
		hint: "STR",
		desc: "CSS classes to force include (wildcards are supported, @-prefix will read from file)",
		delim: ",",
	}),
};

export const ARG_MEDIA_QUERIES = {
	media: strings({
		alias: "m",
		hint: "ID",
		desc: "Media query IDs (use 'ALL' for all)",
		delim: ",",
	}),
};

export const ARG_ONLY_DECLS = {
	onlyDecls: flag({ desc: "Only emit framework decls" }),
};

export const ARG_OUTPUT = {
	out: string({
		alias: "o",
		desc: "Output file (or stdout)",
	}),
};

export const ARG_PRETTY = {
	pretty: flag({ alias: "p", desc: "Pretty print output" }),
};

export const ARG_NO_DECLS = {
	noDecls: flag({ alias: "d", desc: "Don't emit framework decls" }),
};

export const ARG_NO_HEADER = {
	noHeader: flag({ desc: "Don't emit generated header comment" }),
};

export const ARG_WATCH = {
	watch: flag({
		alias: "w",
		desc: "Watch input files for changes",
	}),
};
