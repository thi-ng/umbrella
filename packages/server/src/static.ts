// SPDX-License-Identifier: Apache-2.0
import type { Fn, MaybePromise, Predicate } from "@thi.ng/api";
import { isFunction, isString } from "@thi.ng/checks";
import { fileHash as $fileHash, type HashAlgo } from "@thi.ng/file-io";
import { preferredTypeForPath } from "@thi.ng/mime";
import { existsSync, statSync } from "node:fs";
import type { OutgoingHttpHeaders } from "node:http";
import { join, resolve } from "node:path";
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
	 * Filter predicates to validate & exclude file paths from being served.
	 * Executed in given order and each one called with the absolute local file
	 * path. If any of the predicates returns false, the server produces a 404
	 * response. By default only uses {@link pathFilterASCII}.
	 */
	filters: Predicate<string>[];
	/**
	 * URL path prefix for defining the static assets route. Also see
	 * {@link StaticOpts.rootDir}.
	 *
	 * @remarks
	 * If given as array, each item is a path component, i.e. `["public",
	 * "img"]` is the same as `"/public/img"`.
	 *
	 * @defaultValue "static"
	 */
	prefix: string | string[];
	/**
	 * Additional route specific interceptors.
	 */
	intercept: Interceptor<CTX>[];
	/**
	 * Additional common headers (e.g. cache control) for a file. If given as
	 * function, it will be called with the absolute path (the function will
	 * only be called if the path exists and already has passed validation).
	 */
	headers: OutgoingHttpHeaders | Fn<string, OutgoingHttpHeaders>;
	/**
	 * If true (default: false), files will be served with brotli, gzip or deflate
	 * compression (if the client supports it).
	 *
	 * @remarks
	 * Note: Whilst compression can
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
	filters = [pathFilterASCII],
	compress = false,
	auth = false,
	etag,
	headers,
}: Partial<StaticOpts<CTX>> = {}): ServerRoute<CTX> => {
	rootDir = resolve(rootDir);
	const filter: Predicate<string> = (path) => filters.every((f) => f(path));
	return {
		id: "__static",
		match: isString(prefix) ? prefix + "/+" : [...prefix, "+"],
		auth,
		handlers: {
			get: {
				fn: async (ctx) => {
					const path = resolve(join(rootDir, ...ctx.match.rest!));
					const $headers = await __fileHeaders(
						rootDir,
						path,
						ctx,
						filter,
						etag,
						headers
					);
					if (!$headers) return;
					if (ctx.origMethod === "head") {
						ctx.res.writeHead(200, {
							"content-type": preferredTypeForPath(path),
							...$headers,
						});
						return;
					}
					return ctx.server.sendFile(ctx, path, $headers, compress);
				},
				intercept,
			},
		},
	};
};

/**
 * First checks absolute `path` against `rootDir`, for existence and `filter`
 * predicate. If successful, returns an object of HTTP headers, incl. computed
 * `etag` (if Etag handler is provided). If path validation failed, triggers a
 * 404 response and returns `undefined`.
 *
 * @remarks
 * Also rejects a `path` if its length is shorter than that of the `rootDir` (both
 * assumed to be absolute).
 *
 * @internal
 */
const __fileHeaders = async (
	rootDir: string,
	path: string,
	ctx: RequestCtx,
	filter: Predicate<string>,
	etag?: StaticOpts["etag"],
	headers?: StaticOpts["headers"]
) => {
	if (!(path.length > rootDir.length && filter(path) && existsSync(path))) {
		return ctx.res.missing();
	}
	const $headers = isFunction(headers) ? headers(path) : headers;
	if (etag) {
		const etagValue = await etag(path);
		return isUnmodified(etagValue, ctx.req.headers["if-none-match"])
			? ctx.res.unmodified()
			: { ...$headers, etag: etagValue };
	}
	return { ...$headers };
};

/**
 * Etag header value function for {@link StaticOpts.etag}. Computes Etag based
 * on base36-encoded file modified timestamp.
 *
 * @remarks
 * Also see {@link etagFileHash}.
 *
 * @param path
 */
export const etagFileTimeModified = (path: string) =>
	statSync(path).mtimeMs.toString(36);

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

/**
 * Default path filter predicate for {@link StaticOpts.filter}. Rejects a file
 * path which contains non-printable ASCII chars (i.e. outside the
 * `[0x20,0x7fe]` range).
 *
 * @param path
 */
export const pathFilterASCII = (path: string) => !/[^\x20-\x7e]/.test(path);

/**
 * Higher order path filter predicate for {@link StaticOpts.filter}. The
 * returned predicate rejects an absolute file path if its length exceeds given
 * `limit`.
 *
 * @param limit
 */
export const pathMaxLength =
	(limit: number): Predicate<string> =>
	(path) =>
		path.length < limit;
