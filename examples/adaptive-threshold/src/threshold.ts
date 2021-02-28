import {
    convolveChannel,
    FloatBuffer,
    FLOAT_GRAY,
    GRAY8,
    PackedBuffer,
} from "@thi.ng/pixel";

/**
 * Adaptive threshold computation: uses `convolveChannel` with a custom pooling
 * kernel to compute mean brightness for each pixel's neighborhood, then applies
 * offset value and checks if pixel itself is above/below localized threshold.
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
    convolveChannel(FloatBuffer.fromPacked(src, FLOAT_GRAY), {
        kernel: {
            pool: (body, w, h) =>
                `(${body[(h >> 1) * w + (w >> 1)]} - (${body.join("+")})/${
                    w * h
                } + ${offset / 255}) < 0 ? 0 : 1`,
            size: windowSize,
        },
    }).as(GRAY8);
