import { timed } from "@thi.ng/bench";
import { lch, srgb } from "@thi.ng/color";
import {
    ABGR8888,
    dominantColors,
    floatBuffer,
    FLOAT_RGB,
    PackedBuffer,
} from "@thi.ng/pixel";
import { map, minMax, transduce } from "@thi.ng/transducers";
import { DominantColor, SortMode, SORT_MODES } from "./api";

/**
 * Converts image into pixel buffer, resizes it to max 256 pixels (longest side)
 * and applies k-means clustering to obtain dominant colors and their coverage.
 * Returns object of pixel buffer and result colors (in LCH space).
 *
 * @param img
 * @param num
 * @param minChroma
 */
export const processImage = (
    img: HTMLImageElement,
    num: number,
    minChroma: number
) =>
    timed(() => {
        let buf = PackedBuffer.fromImage(img, ABGR8888);
        buf = buf.scale(256 / Math.max(buf.width, buf.height), "nearest");
        const colors = dominantColors(floatBuffer(buf, FLOAT_RGB), num, {
            // use min chroma as pre-filter criteria
            filter: (p) => lch(srgb(p)).c >= minChroma,
        }).map((c) => <DominantColor>{ col: lch(srgb(c.color)), area: c.area });
        return { buf, colors };
    });

export const postProcess = (
    colors: DominantColor[],
    minArea: number,
    sortMode: SortMode
) => {
    minArea *= 0.01;
    // min area as post-filter, sort colors by selected mode
    colors = colors.filter((c) => c.area >= minArea).sort(SORT_MODES[sortMode]);
    // determine hue range
    const hues = transduce(
        map((c) => c.col.h),
        minMax(),
        colors
    );
    return { colors, hues };
};
