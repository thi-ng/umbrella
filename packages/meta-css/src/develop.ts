// thing:no-export
import { string, type Command } from "@thi.ng/args";
import {
	ARG_BUNDLE,
	ARG_EVAL,
	ARG_FORCE_INCLUDE,
	ARG_INCLUDE,
	ARG_NO_DECLS,
	ARG_NO_HEADER,
	ARG_PREC,
	ARG_PRETTY,
	ARG_WATCH,
	type AppCtx,
	type CommonOpts,
} from "./api.js";
import { convertCommand, type ConvertOpts } from "./convert.js";
import { generateCommand, type GenerateOpts } from "./generate.js";

interface DevelopOpts
	extends Omit<ConvertOpts, "noWrite" | "out" | "pretty" | "specs" | "watch">,
		Omit<GenerateOpts, "out" | "pretty" | "watch"> {
	outCss: string;
	outSpecs: string;
	pretty: boolean;
	watch: boolean;
}

export const DEVELOP: Command<DevelopOpts, CommonOpts, AppCtx<DevelopOpts>> = {
	desc: "Combination of the generate & convert commands",
	opts: {
		...ARG_BUNDLE,
		...ARG_EVAL,
		...ARG_FORCE_INCLUDE,
		...ARG_INCLUDE,
		...ARG_NO_DECLS,
		...ARG_NO_HEADER,
		...ARG_PREC,
		...ARG_PRETTY,
		...ARG_WATCH,
		outCss: string({
			desc: "Output file for CSS bundle",
			optional: false,
		}),
		outSpecs: string({
			desc: "Output file for framework",
			optional: false,
		}),
	},
	fn: async (ctx) => {
		const { opts, inputs } = ctx;
		const [specs, styles] = inputs.reduce(
			(acc, x) => (acc[x.endsWith(".json") ? 0 : 1].push(x), acc),
			<[string[], string[]]>[[], []]
		);
		const genCtx: AppCtx<GenerateOpts> = {
			inputs: specs,
			format: ctx.format,
			logger: ctx.logger,
			opts: {
				...opts,
				out: opts.outSpecs,
			},
		};
		const convCtx: AppCtx<ConvertOpts> = {
			inputs: styles,
			format: ctx.format,
			logger: ctx.logger,
			opts: {
				...opts,
				noWrite: false,
				out: opts.outCss,
				specs: opts.outSpecs,
			},
		};
		await generateCommand(genCtx);
		await convertCommand(convCtx);
	},
};
