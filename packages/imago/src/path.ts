import type { TypedArray } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks";
import {
	FMT_HH,
	FMT_HHmmss_ALT,
	FMT_MM,
	FMT_dd,
	FMT_mm,
	FMT_ss,
	FMT_ww,
	FMT_yyyy,
	FMT_yyyyMMdd_ALT,
} from "@thi.ng/date";
import { illegalArgs as unsupported } from "@thi.ng/errors";
import { createHash } from "node:crypto";
import { basename } from "node:path";
import type { ImgProcCtx, OutputSpec } from "./api.js";

/** @internal */
const _ = undefined;

/**
 * Expands/replaces all `{xyz}`-templated identifiers in given file path.
 *
 * @remarks
 * The following built-in IDs are supported and custom IDs will be looked up via
 * the {@link ImgProcOpts.pathParts} options provided to {@link processImage}.
 * Any others will remain as is. Custom IDs take precedence over built-in ones.
 *
 * - name: original base filename (w/o ext)
 * - sha1/224/256/384/512: truncated hash of output
 * - w: current width
 * - h: current height
 * - date: yyyyMMdd
 * - time: HHmmss
 * - year: 4-digit year
 * - month: 2-digit month
 * - week: 2-digit week
 * - day: 2-digit day in month
 * - hour: 2-digit hour (24h system)
 * - minute: 2-digit minute
 * - second: 2-digit second
 *
 * All date/time related values will be in UTC.
 *
 * @param path
 * @param ctx
 * @param spec
 * @param buf
 */
export const formatPath = (
	path: string,
	ctx: ImgProcCtx,
	spec: OutputSpec,
	buf: Buffer | TypedArray
) =>
	path.replace(/\{(\w+)\}/g, (match, id) => {
		const custom = ctx.opts.pathParts?.[id];
		if (custom != null) {
			return isFunction(custom) ? custom(ctx, spec, buf) : custom;
		}
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
				return FMT_yyyyMMdd_ALT(_, true);
			case "time":
				return FMT_HHmmss_ALT(_, true);
			case "year":
				return FMT_yyyy(_, true);
			case "month":
				return FMT_MM(_, true);
			case "week":
				return FMT_ww(_, true);
			case "day":
				return FMT_dd(_, true);
			case "hour":
				return FMT_HH(_, true);
			case "minute":
				return FMT_mm(_, true);
			case "second":
				return FMT_ss(_, true);
		}
		return match;
	});
