// thing:no-export
import type { IObjectOf } from "@thi.ng/api";
import type { CommandCtx } from "@thi.ng/args";
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
	info: SpecInfo;
	media: IObjectOf<string>;
	indexed: IObjectOf<any>;
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
	items: string | any[];
	index?: Index;
	unit?: string | null;
	comment?: string;
	var?: string | string[];
}

export type Index = "i" | "i1" | "v";
