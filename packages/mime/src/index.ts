import { DB } from "./generated.js";

// https://www.iana.org/assignments/media-types/

export const MIME_TYPES = ((defs: any) => {
	const res: Record<string, string[]> = {};
	for (let groupID in defs) {
		const group = defs[groupID];
		for (let type in group) {
			const mime = groupID + "/" + type;
			for (let e of group[type].split(",")) {
				const isLowPri = e[0] === "*";
				const ext = isLowPri ? e.substring(1) : e;
				let coll = res[ext];
				!coll && (coll = res[ext] = []);
				isLowPri ? coll.push(mime) : coll.unshift(mime);
			}
		}
	}
	return res;
})(DB);

/**
 * Returns preferred MIME type for given file extension or, if no match is
 * available, the `fallback` MIME type (default: `application/octet-stream`).
 *
 * @remarks
 * Since v0.2.0 the extension can be given as either `".ext"` or `"ext"`.
 * Previously, only the latter was supported.
 *
 * Also see {@link preferredExtension} for reverse operation.
 *
 * @param ext -
 * @param fallback -
 */
export const preferredType = (ext: string, fallback = MIME_TYPES.bin[0]) => {
	const type = MIME_TYPES[ext[0] === "." ? ext.substring(1) : ext];
	return type ? type[0] : fallback;
};

/**
 * Reverse lookup to {@link preferredType}. Takes MIME type string and returns
 * preferred file extension (or failing that) returns `fallback` (default:
 * "bin").
 *
 * @param mime -
 * @param fallback -
 */
export const preferredExtension = (mime: string, fallback = "bin") => {
	const [prefix, suffix] = mime.split("/");
	const group = DB[prefix];
	const ext = group ? group[suffix].split(",") : undefined;
	return ext
		? ext.find((x) => x[0] !== "*") || ext[0].substring(1)
		: fallback;
};
