import type { TypedArray } from "@thi.ng/api";
import { FMT_HHmmss_ALT, FMT_yyyyMMdd_ALT } from "@thi.ng/date";
import { illegalArgs as unsupported } from "@thi.ng/errors";
import { createHash } from "crypto";
import { basename } from "path";
import type { ImgProcCtx } from "./api.js";

/**
 * Expands/replaces all `{xyz}`-templated identifiers in given file path.
 *
 * @remarks
 * The following IDs are supported. Any others will remain as is.
 *
 * - date: yyyyMMdd
 * - time: HHmmss
 * - name: original base filename (w/o ext)
 * - sha1/224/256/384/512: truncated hash of output
 * - w: current width
 * - h: current height
 *
 * @param path
 * @param buf
 * @param ctx
 */
export const formatPath = (
	path: string,
	buf: Buffer | TypedArray,
	ctx: ImgProcCtx
) =>
	path.replace(/\{(\w+)\}/g, (match, id) => {
		switch (id) {
			case "name": {
				!path &&
					unsupported(
						"cannot format `{name}`, image has no file source"
					);
				const name = basename(ctx.path!);
				const idx = name.lastIndexOf(".");
				return idx > 0 ? name.substring(0, idx) : name;
			}
			case "sha1":
			case "sha224":
			case "sha256":
			case "sha384":
			case "sha512":
				return createHash(id).update(buf).digest("hex").substring(0, 8);
			case "w":
				return String(ctx.size[0]);
			case "h":
				return String(ctx.size[1]);
			case "date":
				return FMT_yyyyMMdd_ALT();
			case "time":
				return FMT_HHmmss_ALT();
		}
		return match;
	});
