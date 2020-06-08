import { isString } from "@thi.ng/checks";
import { preferredType } from "@thi.ng/mime";
import type { TypedArray } from "@thi.ng/api";

export interface DownloadOpts {
    /**
     * MIME type. If not given, attempts to derive MIME type from given
     * filename extension (e.g. `.svg`) and if that fails, falls back to
     * default value.
     *
     * @defaultValue application/octet-stream
     */
    mime: string;
    /**
     * If true, converts source string to UTF-8. Only used if input is a
     * string.
     *
     * @defaultValue false
     */
    utf8: boolean;
    /**
     * Expiry time for generated object URL. Use value < 0 to disable.
     *
     * @defaultValue 10000
     */
    expire: number;
}

/**
 * Triggers download of given `src` blob (or typed array or string) as
 * local file with filename `name`. MIME type, text encoding and URL
 * expiry can be defined via the optional `opts` config object. See
 * {@link DownloadOpts} for details & defaults.
 *
 * @remarks
 * If `src` is not a blob already, it will be wrapped as such
 * automatically. The `mime` option is only used for that wrapping
 * purpose. If no MIME type is given, attempts to derive it from the
 * given filename extension (e.g. `.svg`) and if that fails, falls back
 * to default value. The `utf8` option is only used if `src` is a string
 * and will trigger UTF-8 encoding of `src`.
 *
 * The function creates an object URL for download, which auto-expires
 * again after `expire` millseconds (default: 10000) to free up memory.
 * The URL won't be expired if `expire <= 0`.
 *
 * @param name
 * @param src
 * @param opts
 */
export const download = (
    name: string,
    src: string | TypedArray | ArrayBuffer | Blob,
    opts?: Partial<DownloadOpts>
) => {
    const _opts = {
        mime: undefined,
        expire: 1e4,
        utf8: false,
        ...opts,
    };
    if (_opts.mime === undefined) {
        const match = /\.(\w+)$/.exec(name);
        _opts.mime = preferredType(match ? match[1] : "bin");
    }
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
