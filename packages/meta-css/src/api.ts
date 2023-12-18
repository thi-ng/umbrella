// thing:no-export
import type { IObjectOf } from "@thi.ng/api";
import { flag, string, strings, type CommandCtx } from "@thi.ng/args";
import type { FormatPresets } from "@thi.ng/text-format";

export interface CommonOpts {
	out?: string;
	verbose: boolean;
}

export interface AppCtx<T extends CommonOpts>
	extends CommandCtx<T, CommonOpts> {
	format: FormatPresets;
}

export interface CompiledSpecs {
	defs: IObjectOf<any>;
	media: IObjectOf<any>;
	info: SpecInfo;
}

export interface GeneratorConfig {
	info?: SpecInfo;
	media?: IObjectOf<string>;
	tables?: IObjectOf<any>;
	specs: Spec[];
}

export interface SpecInfo {
	name: string;
	version: string;
}

export interface Spec {
	prefix: string;
	prop: string | string[];
	def?: Record<string, string>;
	items: string | any[] | IObjectOf<any>;
	index?: Index;
	unit?: string | null;
	comment?: string;
	var?: string | string[];
}

export type Index = "i" | "i1" | "v";

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

export const ARG_PRETTY = {
	pretty: flag({ alias: "p", desc: "Pretty print output" }),
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
