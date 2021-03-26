import type { IObjectOf } from "@thi.ng/api";
import { DB } from "./generated";

// https://www.iana.org/assignments/media-types/

export const MIME_TYPES = ((defs: any) => {
    const res: IObjectOf<string[]> = {};
    for (let groupID in defs) {
        const group = defs[groupID];
        for (let type in group) {
            const mime = groupID + "/" + type;
            for (let e of group[type].split(",")) {
                const isLowPri = e[0] === "*";
                const ext = isLowPri ? e.substr(1) : e;
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
 * @param ext
 * @param fallback
 */
export const preferredType = (ext: string, fallback = MIME_TYPES.bin[0]) => {
    const type = MIME_TYPES[ext[0] === "." ? ext.substr(1) : ext];
    return type ? type[0] : fallback;
};
