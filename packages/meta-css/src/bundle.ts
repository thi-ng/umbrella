// thing:no-export
import { type Command } from "@thi.ng/args";
import { delayed } from "@thi.ng/compose";
import { readJSON, readText } from "@thi.ng/file-io";
import { Stream, reactive, sync } from "@thi.ng/rstream";
import { Z3 } from "@thi.ng/strings";
import { assocObj, map } from "@thi.ng/transducers";
import { watch } from "fs";
import { resolve } from "path";
import {
	ARG_EVAL,
	ARG_EXCLUDE_DECLS,
	ARG_FORCE_INCLUDE,
	ARG_INCLUDE,
	ARG_NO_HEADER,
	ARG_OUTPUT,
	ARG_PRETTY,
	ARG_SPECS,
	ARG_WATCH,
	type AppCtx,
	type CommonOpts,
	type CompiledSpecs,
} from "./api.js";
import { processForceIncludes, processInputs } from "./convert.js";

interface BundleOpts extends CommonOpts {
	out?: string;
	specs: string;
	include?: string[];
	eval?: string;
	force?: string[];
	pretty: boolean;
	noDecls: boolean;
	noHeader: boolean;
	watch: boolean;
}

export const BUNDLE: Command<BundleOpts, CommonOpts, AppCtx<BundleOpts>> = {
	desc: "Transpile & bundle meta stylesheets to CSS",
	opts: {
		...ARG_SPECS,
		...ARG_INCLUDE,
		...ARG_EVAL,
		...ARG_EXCLUDE_DECLS,
		...ARG_FORCE_INCLUDE,
		...ARG_OUTPUT,
		...ARG_PRETTY,
		...ARG_NO_HEADER,
		...ARG_WATCH,
	},
	fn: async (ctx) => {
		const specs = readJSON<CompiledSpecs>(
			resolve(ctx.opts.specs),
			ctx.logger
		);
		const forceRules = processForceIncludes(
			specs,
			ctx.opts.force || [],
			ctx.logger
		);
		if (ctx.opts.watch) {
			await watchInputs(ctx, specs, forceRules);
		} else {
			processInputs(
				ctx,
				specs,
				forceRules,
				ctx.opts.eval
					? [ctx.opts.eval]
					: ctx.inputs.map((file) =>
							readText(resolve(file), ctx.logger)
					  ),
				ctx.opts.out
			);
		}
	},
};

const watchInputs = async (
	ctx: AppCtx<BundleOpts>,
	specs: CompiledSpecs,
	forceRules: ReturnType<typeof processForceIncludes>
) => {
	let active = true;
	const close = () => {
		ctx.logger.info("closing watchers...");
		inputs.forEach((i) => i.watcher.close());
		active = false;
	};
	const inputs = ctx.inputs.map((file, i) => {
		file = resolve(file);
		const input = reactive(readText(file, ctx.logger), {
			id: `in${Z3(i)}`,
		});
		return {
			input,
			watcher: watch(file, {}, (event) => {
				if (event === "change") {
					try {
						input.next(readText(file, ctx.logger));
					} catch (e) {
						ctx.logger.warn((<Error>e).message);
						close();
					}
				} else {
					ctx.logger.warn(`input removed:`, file);
					close();
				}
			}),
		};
	});
	sync({
		src: assocObj<Stream<string>>(
			map(
				({ input }) => <[string, Stream<string>]>[input.id, input],
				inputs
			)
		),
	}).subscribe({
		next(ins) {
			try {
				processInputs(
					ctx,
					specs,
					forceRules,
					// process in deterministic order (same as given in CLI)
					Object.keys(ins)
						.sort()
						.map((k) => ins[k]),
					ctx.opts.out
				);
			} catch (e) {
				ctx.logger.warn((<Error>e).message);
			}
		},
	});
	// close watchers when ctrl-c is pressed
	process.on("SIGINT", close);
	while (active) {
		await delayed(null, 250);
	}
};
