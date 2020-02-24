import { isString } from "@thi.ng/checks";
import type { TypedArray } from "@thi.ng/api";

// https://www.iana.org/assignments/media-types/

export const MIME_3MF = "model/3mf";
export const MIME_BINARY = "application/octet-stream";
export const MIME_CSS = "text/css";
export const MIME_CSV = "text/csv";
export const MIME_HTML = "text/html";
export const MIME_GIF = "image/gif";
export const MIME_IGES = "model/iges";
export const MIME_JPEG = "image/jpeg";
export const MIME_JS = "application/javascript";
export const MIME_JSON = "application/json";
export const MIME_MD = "text/markdown";
export const MIME_OBJ = "model/obj";
export const MIME_PDF = "application/pdf";
export const MIME_PNG = "image/png";
export const MIME_STL = "model/stl";
export const MIME_SVG = "image/svg+xml";
export const MIME_TEXT = "text/plain";
export const MIME_WAV = "audio/wav";

export const MIME_TYPE_MAP = {
    ".3mf": MIME_3MF,
    ".css": MIME_CSS,
    ".csv": MIME_CSV,
    ".html": MIME_HTML,
    ".gif": MIME_GIF,
    ".iges":MIME_IGES,
    ".jpg": MIME_JPEG,
    ".js": MIME_JS,
    ".json": MIME_JSON,
    ".md": MIME_MD,
    ".obj": MIME_OBJ,
    ".pdf": MIME_PDF,
    ".png": MIME_PNG,
    ".stl": MIME_STL,
    ".svg": MIME_SVG,
    ".txt": MIME_TEXT,
    ".wav": MIME_WAV,
};

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
 * local file with filename `name`. Mime type, text encoding and URL
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
        ...opts
    };
    if (_opts.mime === undefined) {
        const match = /(\.\w+)$/.exec(name);
        _opts.mime = match
            ? MIME_TYPE_MAP.hasOwnProperty(match[0])
                ? (<any>MIME_TYPE_MAP)[match[0]]
                : MIME_BINARY
            : MIME_BINARY;
    }
    if (isString(src) && _opts.utf8) {
        src = new TextEncoder().encode(src);
        _opts.mime+=";charset=UTF-8";
    }
    const uri = URL.createObjectURL(
        !(src instanceof Blob)
            ? new Blob([src], { type: _opts.mime })
            : src
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
