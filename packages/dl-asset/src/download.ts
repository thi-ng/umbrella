import type { TypedArray } from "@thi.ng/api";
import { preferredType } from "@thi.ng/mime";
import type { DownloadOpts } from "./api.js";
import { downloadWithMime } from "./raw.js";

/**
 * Similar to (and wrapping) {@link downloadWithMime} with additional
 * automatic MIME type detection. If no MIME type is given, attempts to
 * derive it from the given filename's extension (e.g. `.svg`) and if
 * that fails, falls back to default value.
 *
 * @param name - 
 * @param src - 
 * @param opts - 
 */
export const download = (
    name: string,
    src: string | TypedArray | ArrayBuffer | Blob,
    opts: Partial<DownloadOpts> = {}
) => {
    if (opts.mime === undefined) {
        const match = /\.(\w+)$/.exec(name);
        opts.mime = preferredType(match ? match[1] : "bin");
    }
    return downloadWithMime(name, src, <any>opts);
};
