import { timed } from "@thi.ng/bench/timed";
import { lch } from "@thi.ng/color/lch/lch";
import { srgb } from "@thi.ng/color/srgb/srgb";
import { dominantColors } from "@thi.ng/pixel/dominant-colors";
import { floatBuffer } from "@thi.ng/pixel/float";
import { FLOAT_RGB } from "@thi.ng/pixel/format/float-rgb";
import { intBufferFromImage } from "@thi.ng/pixel/int";
import { map } from "@thi.ng/transducers/map";
import { minMax } from "@thi.ng/transducers/min-max";
import { transduce } from "@thi.ng/transducers/transduce";
import { type DominantColor, type SortMode, SORT_MODES } from "./api";

/**
 * Converts image into pixel buffer, resizes it to max 256 pixels (longest side)
 * and applies k-means clustering to obtain dominant colors and their coverage.
 * Returns object of pixel buffer and result colors (in LCH space).
 *
 * @param img - 
 * @param num - 
 * @param minChroma - 
 */
export const processImage = (
    img: HTMLImageElement,
    num: number,
    minChroma: number
) =>
    timed(() => {
        let buf = intBufferFromImage(img);
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
