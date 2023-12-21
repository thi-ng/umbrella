// thing:no-export
import type { IObjectOf } from "@thi.ng/api";
import { strings, type Command } from "@thi.ng/args";
import { readJSON, readText } from "@thi.ng/file-io";
import { COMPACT, PRETTY, at_media, css } from "@thi.ng/hiccup-css";
import type { ILogger } from "@thi.ng/logger";
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

interface ExportOpts extends CommonOpts {
	pretty: boolean;
	noHeader: boolean;
	include?: string[];
	media?: string[];
}

export const EXPORT: Command<ExportOpts, CommonOpts, AppCtx<ExportOpts>> = {
	desc: "Export entire generated framework as CSS",
	opts: {
		...ARG_INCLUDE,
		...ARG_PRETTY,
		...ARG_NO_HEADER,
		media: strings({
			alias: "m",
			desc: "Media query IDs (use 'ALL' for all)",
			delim: ",",
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
	media: string[] | undefined,
	pretty: boolean,
	logger: ILogger
) => {
	const rules: any[] = __suffixed("", specs);
	if (media) {
		const mediaIDs = media[0] === "ALL" ? Object.keys(specs.media) : media;
		for (let id of mediaIDs) {
			const query = specs.media[id];
			if (query) {
				rules.push(
					at_media(specs.media[id], __suffixed("-" + id, specs))
				);
			} else {
				logger.warn(`invalid media query ID: ${id}, skipping...`);
			}
		}
	}
	return css(rules, { format: pretty ? PRETTY : COMPACT });
};

/** @internal */
const __suffixed = (suffix: string, specs: CompiledSpecs) =>
	Object.entries(specs.classes).map(([id, props]) => [
		`.${id}${suffix}`,
		__withoutUser(props),
	]);

/** @internal */
const __withoutUser = (props: IObjectOf<any>) => {
	if ("__user" in props) {
		props = { ...props };
		delete props.__user;
	}
	return props;
};
