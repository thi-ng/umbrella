import type { SomeRequired } from "@thi.ng/api";
import { readText } from "@thi.ng/file-io/text";
import { ConsoleLogger } from "@thi.ng/logger";
import { resolve } from "node:path";
import type { TranscludeCtx } from "./api.js";

export type Mandatory = "src" | "templates" | "user";

const DEFAULT_LOGGER = new ConsoleLogger("transclude");

export const transclude = <T>(
	ctx: SomeRequired<TranscludeCtx<T>, Mandatory>,
	path: string
) => {
	const $ctx: TranscludeCtx<T> = {
		logger: DEFAULT_LOGGER,
		match: /\{\{([a-z0-9.]+)([^}]*)\}\}/gi,
		pre: [],
		post: [],
		eol: "\n",
		...ctx,
	};
	$ctx.pre.reduce((acc, fn) => ($ctx.src = fn($ctx, [acc], path)), $ctx.src);
	$ctx.src = $ctx.src.replace($ctx.match, (...xs) => {
		const [orig, id] = xs;
		const tpl = $ctx.templates[id];
		if (tpl !== undefined) {
			return typeof tpl === "function" ? tpl($ctx, xs, path) : tpl;
		} else {
			$ctx.logger.warn(`skipping unknown tpl ID: "${id}"`);
			return orig;
		}
	});
	$ctx.post.reduce((acc, fn) => ($ctx.src = fn($ctx, [acc], path)), $ctx.src);
	return $ctx;
};

export const transcludeFile = <T>(
	path: string,
	ctx: SomeRequired<TranscludeCtx<T>, Exclude<Mandatory, "src">>
) => {
	const $ctx = {
		logger: DEFAULT_LOGGER,
		src: "",
		...ctx,
	};
	path = resolve(path);
	$ctx.src = readText(path, $ctx.logger);
	return transclude($ctx, path);
};
