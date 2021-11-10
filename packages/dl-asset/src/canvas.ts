import { downloadWithMime } from "./raw.js";

/**
 * Triggers canvas-to-blob conversion for given file type (and opt. `quality`),
 * then triggers download via {@link downloadWithMime}. Default file type is
 * `png`. Default quality is 0.95 (only used for JPEG/WebP).
 *
 * @param canvas
 * @param baseName
 * @param type
 * @param quality
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
