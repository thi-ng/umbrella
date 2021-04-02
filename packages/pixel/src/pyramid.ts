import { assert } from "@thi.ng/api";
import type { KernelSpec } from "./api";
import { convolveImage, LANCZOS } from "./convolve";
import type { FloatBuffer } from "./float";

/**
 * Yields an iterator of progressively downsampled versions of `src` (using
 * `kernel` for filtering, default: {@link LANCZOS}(2)). Each image will be half
 * size of the previous result, stopping only once either width or height
 * becomes less than `minSize` (default: 1). If `includeOrig` is enabled
 * (default), the first emitted image will be the original `src`.
 *
 * @param src
 * @param kernel
 * @param minSize
 * @param includeOrig
 */
export function* imagePyramid(
    src: FloatBuffer,
    kernel: KernelSpec = LANCZOS(2),
    minSize = 1,
    includeOrig = true
) {
    assert(minSize > 0, `invalid min size`);
    minSize <<= 1;
    if (includeOrig) yield src;
    while (src.width >= minSize && src.height >= minSize) {
        src = convolveImage(src, { kernel, stride: 2 });
        yield src;
    }
}
