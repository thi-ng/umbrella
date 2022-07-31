import type { TypedArray } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import type { DownloadOpts } from "./api.js";

/**
 * Triggers download of given `src` blob (or typed array or string) as
 * local file with filename `name`. MIME type option MUST be given.
 * UTF-8 text encoding and URL expiry can be defined via the optional
 * `opts` config object. See {@link DownloadOpts} for details &
 * defaults. Use {@link download} if auto-detection of MIME type is
 * required.
 *
 * @remarks
 * If `src` is not a blob already, it will be wrapped as such
 * automatically. The `mime` option is only used for that wrapping
 * purpose. The `utf8` option is only used if `src` is a string and will
 * trigger UTF-8 encoding of `src`.
 *
 * The function creates an object URL for download, which auto-expires
 * again after `expire` millseconds (default: 10000) to free up memory.
 * The URL won't be expired if `expire <= 0`.
 *
 * @param name -
 * @param src -
 * @param opts -
 */
export const downloadWithMime = (
	name: string,
	src: string | TypedArray | ArrayBuffer | Blob,
	opts: Partial<DownloadOpts> & { mime: string }
) => {
	const _opts = {
		expire: 1e4,
		utf8: false,
		...opts,
	};
	if (isString(src) && _opts.utf8) {
		src = new TextEncoder().encode(src);
		_opts.mime += ";charset=UTF-8";
	}
	const uri = URL.createObjectURL(
		!(src instanceof Blob) ? new Blob([src], { type: _opts.mime }) : src
	);
	const link = document.createElement("a");
	link.setAttribute("download", name);
	link.setAttribute("href", uri);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	if (_opts.expire > 0) {
		setTimeout(() => URL.revokeObjectURL(uri), _opts.expire);
	}
};
