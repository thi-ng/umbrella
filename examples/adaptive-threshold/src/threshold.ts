import { GRAY8, PackedBuffer } from "@thi.ng/pixel";
import {
    comp,
    convolve2d,
    fillN,
    map,
    mean,
    multiplex,
    range2d,
    repeat,
    transduce,
} from "@thi.ng/transducers";

/**
 * Adaptive threshold computation: uses `convolve2d` transducer to
 * compute mean brightness for each pixel's neighborhood, then applies
 * offset value and checks if pixel itself is above/below localized
 * threshold.
 *
 * @param src
 * @param windowSize
 * @param offset
 */
export const adaptiveThreshold = (
    src: PackedBuffer,
    windowSize: number,
    offset = 0
) =>
    new PackedBuffer(
        src.width,
        src.height,
        GRAY8,
        <Uint8Array>transduce(
            comp(
                multiplex(
                    map((xy) => xy),
                    convolve2d({
                        src: src.pixels,
                        width: src.width,
                        height: src.height,
                        weights: repeat(1),
                        kwidth: windowSize,
                        kheight: windowSize,
                        wrap: false,
                        border: 0,
                        reduce: mean,
                    })
                ),
                map(([[x, y], mean]) =>
                    src.getAt(x, y) - mean + offset < 0 ? 0 : 255
                )
            ),
            fillN(),
            new Uint8Array(src.width * src.height),
            range2d(src.width, src.height)
        )
    );
