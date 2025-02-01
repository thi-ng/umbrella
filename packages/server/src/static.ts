import type { Fn, MaybePromise, Predicate } from "@thi.ng/api";
import { fileHash as $fileHash, type HashAlgo } from "@thi.ng/file-io";
import { preferredTypeForPath } from "@thi.ng/mime";
import { existsSync, statSync } from "node:fs";
import type { OutgoingHttpHeaders } from "node:http";
import { join } from "node:path";
import type { Interceptor, RequestCtx, ServerRoute } from "./api.js";
import { isUnmodified } from "./utils/cache.js";

/**
 * Static file configuration options.
 */
export interface StaticOpts<CTX extends RequestCtx = RequestCtx> {
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
	intercept: Interceptor<CTX>[];
	/**
	 * Additional common headers (e.g. cache control) for all static files
	 */
	headers: OutgoingHttpHeaders;
	/**
	 * If true (default: false), files will be served with brotli, gzip or deflate
	 * compression (if the client supports it).
	 *
	 * @defaultValue false
	 */
	compress: boolean;
	/**
	 * User defined function to compute an Etag value for given file path. The
	 * file is guaranteed to exist when this function is called.
	 */
	etag: Fn<string, MaybePromise<string>>;
	/**
	 * If true, the route will have its `auth` flag enabled, e.g. for use with
	 * the {@link authenticateWith} interceptor.
	 *
	 * @defaultValue false
	 */
	auth: boolean;
}

/**
 * Defines a configurable {@link ServerRoute} and handler for serving static
 * files from a local directory (optionally with compression, see
 * {@link StaticOpts.compress} for details).
 *
 * @param opts
 */
export const staticFiles = <CTX extends RequestCtx = RequestCtx>({
	prefix = "static",
	rootDir = ".",
	intercept = [],
	filter = () => true,
	compress = false,
	auth = false,
	etag,
	headers,
}: Partial<StaticOpts<CTX>> = {}): ServerRoute<CTX> => ({
	id: "__static",
	match: [prefix, "+"],
	auth,
	handlers: {
		head: {
			fn: async (ctx) => {
				const path = join(rootDir, ...ctx.match.rest!);
				const $headers = await __fileHeaders(
					path,
					ctx,
					filter,
					etag,
					headers
				);
				if (!$headers) return;
				ctx.res.writeHead(200, {
					"content-type": preferredTypeForPath(path),
					...$headers,
				});
			},
			intercept,
		},
		get: {
			fn: async (ctx) => {
				const path = join(rootDir, ...ctx.match.rest!);
				const $headers = await __fileHeaders(
					path,
					ctx,
					filter,
					etag,
					headers
				);
				if (!$headers) return;
				return ctx.server.sendFile(ctx, path, $headers, compress);
			},
			intercept,
		},
	},
});

const __fileHeaders = async (
	path: string,
	ctx: RequestCtx,
	filter: StaticOpts["filter"],
	etag?: StaticOpts["etag"],
	headers?: OutgoingHttpHeaders
) => {
	if (!(existsSync(path) && filter(path))) {
		return ctx.res.missing();
	}
	if (etag) {
		const etagValue = await etag(path);
		return isUnmodified(etagValue, ctx.req.headers["if-none-match"])
			? ctx.res.unmodified()
			: { ...headers, etag: etagValue };
	}
	return { ...headers };
};

/**
 * Etag header value function for {@link StaticOpts.etag}. Computes Etag based
 * on file modified date.
 *
 * @remarks
 * Also see {@link etagFileHash}.
 *
 * @param path
 */
export const etagFileTimeModified = (path: string) =>
	String(statSync(path).mtimeMs);

/**
 * Higher-order Etag header value function for {@link StaticOpts.etag}. Computes
 * Etag value by computing the hash digest of a given file. Uses MD5 by default.
 *
 * @remarks
 * Also see {@link etagFileTimeModified}.
 *
 * @param algo
 */
export const etagFileHash =
	(algo: HashAlgo = "md5") =>
	(path: string) =>
		$fileHash(path, undefined, algo);
