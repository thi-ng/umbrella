import type { CanvasRecorderOpts } from "./api.js";
import { downloadWithMime } from "./raw.js";

/**
 * Triggers canvas-to-blob conversion for given file type (and opt. `quality`),
 * then triggers download via {@link downloadWithMime}. Default file type is
 * `png`. Default quality is 0.95 (only used for JPEG/WebP).
 *
 * @param canvas - 
 * @param baseName - 
 * @param type - 
 * @param quality - 
 */
export const downloadCanvas = (
    canvas: HTMLCanvasElement,
    baseName: string,
    type: "png" | "jpeg" | "webp" = "png",
    quality = 0.95
) => {
    const mime = `image/${type}`;
    canvas.toBlob(
        (blob) =>
            blob
                ? downloadWithMime(`${baseName}.${type}`, blob, { mime })
                : console.warn("can't download canvas"),
        mime,
        quality
    );
};

/**
 * Constructs, initializes and returns a `MediaRecorder` instance for the given
 * canvas. The recording MUST be started & ended manually by the caller (via
 * `.start()` and `.stop()`). The downloading starts only once sufficient frames
 * were recorded, or latest when `.stop()` was called.
 *
 * @remarks
 * The default recording format is WebM (VP9 codec) @ 60 fps, using the browser
 * defined default bit rate.
 *
 * @param canvas - 
 * @param fileName - 
 * @param opts - 
 */
export const canvasRecorder = (
    canvas: HTMLCanvasElement,
    fileName: string,
    opts?: Partial<CanvasRecorderOpts>
) => {
    opts = { fps: 60, mimeType: "video/webm; codecs=vp9", ...opts };
    const stream = canvas.captureStream(opts.fps);
    const recorder = new MediaRecorder(stream, {
        mimeType: opts.mimeType,
    });
    let blobs: Blob[] = [];
    recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
            blobs.push(e.data);
            downloadWithMime(
                fileName,
                new Blob(blobs, { type: opts!.mimeType }),
                {
                    mime: opts!.mimeType!,
                }
            );
            blobs = [];
        }
    };
    return recorder;
};
