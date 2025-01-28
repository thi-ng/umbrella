import type { Predicate } from "@thi.ng/api";
import { preferredType } from "@thi.ng/mime";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import type { Interceptor, ServerRoute } from "./api.js";

/**
 * Static file configuration options.
 */
export interface StaticOpts {
	/**
	 * Path to local root directory for static assets. Also see
	 * {@link StaticOpts.prefix}
	 *
	 * @defaultValue `.` (current cwd)
	 */
	rootDir: string;
	/**
	 * Filter predicate to exclude files from being served. Called with the
	 * absolute local file path. If the function returns false, the server
	 * produces a 404 response. By default all files (within
	 * {@link StaticOpts.rootDir}) will be allowed.
	 */
	filter: Predicate<string>;
	/**
	 * Base URL prefix for static assets.  Also see {@link StaticOpts.rootDir}
	 *
	 * @defaultValue "static"
	 */
	prefix: string;
	/**
	 * Additional route specific interceptors.
	 */
	intercept: Interceptor[];
	/**
	 * Additional common headers (e.g. cache control) for all static files
	 */
	headers: Record<string, string | string[]>;
	/**
	 * If true (default), files will be served with brotli or gzip compression
	 * (if the client supports it).
	 *
	 * @defaultValue true
	 */
	compress: boolean;
}

/**
 * Defines a configurable {@link ServerRoute} and handler for serving static
 * files from a local directory. Unless disabled (via given options) and if the
 * client supports it, files will be served with gzip encoding.
 *
 * @param opts
 */
export const staticFiles = ({
	prefix = "static",
	rootDir = ".",
	intercept = [],
	filter = () => true,
	compress = true,
	headers,
}: Partial<StaticOpts>): ServerRoute => ({
	id: "__static",
	match: [prefix, "+"],
	handlers: {
		head: {
			fn: async ({ server, match, res }) => {
				const path = join(rootDir, ...match.rest!);
				if (!(existsSync(path) && filter(path)))
					return server.missing(res);
				res.writeHead(200, {
					"content-type": preferredType(
						path.substring(path.lastIndexOf("."))
					),
					"content-length": String(statSync(path).size),
					...headers,
				});
			},
			intercept,
		},
		get: {
			fn: (ctx) => {
				const path = join(rootDir, ...ctx.match.rest!);
				if (!(existsSync(path) && filter(path)))
					return ctx.server.missing(ctx.res);
				return ctx.server.sendFile(ctx, path, headers, compress);
			},
			intercept,
		},
	},
});
