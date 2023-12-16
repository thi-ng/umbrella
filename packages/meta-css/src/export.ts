// thing:no-export
import { string, type Command } from "@thi.ng/args";
import { readJSON, readText } from "@thi.ng/file-io";
import { COMPACT, PRETTY, at_media, css } from "@thi.ng/hiccup-css";
import { resolve } from "path";
import {
	ARG_INCLUDE,
	ARG_NO_HEADER,
	ARG_PRETTY,
	type AppCtx,
	type CommonOpts,
	type CompiledSpecs,
} from "./api.js";
import { generateHeader, maybeWriteText } from "./utils.js";
import type { ILogger } from "@thi.ng/logger";

interface ExportOpts extends CommonOpts {
	pretty: boolean;
	noHeader: boolean;
	include?: string[];
	media?: string;
}

export const EXPORT: Command<ExportOpts, CommonOpts, AppCtx<ExportOpts>> = {
	desc: "Export CSS framework",
	opts: {
		...ARG_INCLUDE,
		...ARG_PRETTY,
		...ARG_NO_HEADER,
		media: string({
			alias: "m",
			desc: "Media query IDs (use 'ALL' for all)",
		}),
	},
	inputs: 1,
	fn: async (ctx) => {
		const {
			logger,
			opts: { include, media, noHeader, pretty, out },
			inputs,
		} = ctx;
		const specs = readJSON<CompiledSpecs>(resolve(inputs[0]), logger);
		const bundle: string[] = include
			? include.map((x) => readText(resolve(x), logger).trim())
			: [];
		if (!noHeader) bundle.push(generateHeader(specs));
		bundle.push(serializeSpecs(specs, media, pretty, logger));
		maybeWriteText(out, bundle, logger);
	},
};

export const serializeSpecs = (
	specs: CompiledSpecs,
	media: string | undefined,
	pretty: boolean,
	logger: ILogger
) => {
	const rules: any[] = defSuffixed("", specs);
	if (media) {
		const mediaIDs =
			media === "ALL" ? Object.keys(specs.media) : media.split(",");
		for (let id of mediaIDs) {
			const query = specs.media[id];
			if (query) {
				rules.push(
					at_media(specs.media[id], defSuffixed("-" + id, specs))
				);
			} else {
				logger.warn(`invalid media query ID: ${id}, skipping...`);
			}
		}
	}
	return css(rules, { format: pretty ? PRETTY : COMPACT });
};

const defSuffixed = (suffix: string, specs: CompiledSpecs) =>
	Object.entries(specs.defs).map(([id, def]) => [`.${id}${suffix}`, def]);
