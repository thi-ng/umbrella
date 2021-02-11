import { assert, Predicate } from "@thi.ng/api";
import { unsupported } from "@thi.ng/errors";
import { GRAY16, GRAY8, packedBuffer, RGB888 } from "@thi.ng/pixel";

const isLinebreak = (c: number) => c === 0xa;

const isWS = (c: number) => c === 0x20 || (c >= 9 && c <= 13);

const readUntil = (
    src: Uint8Array,
    i: number,
    end: Predicate<number> = isLinebreak
): [string, number] => {
    let res = "";
    for (; i < src.length; i++) {
        let c = src[i];
        if (end(c)) {
            i++;
            break;
        }
        res += String.fromCharCode(c);
    }
    return [res, i];
};

const readComments = (src: Uint8Array, acc: string[], i: number) => {
    while (src[i] === 0x23) {
        // @ts-ignore
        const [comment, j] = readUntil(src, i);
        assert(j !== i, `EOF reached`);
        acc.push(comment.substr(1).trim());
        i = j;
    }
    return i;
};

/**
 * Parses header information from given NetPBM file byte buffer.
 *
 * @param src
 */
export const parseHeader = (src: Uint8Array) => {
    let type: string;
    let sw: string, sh: string;
    let norm: string;
    let max: number | undefined;
    const comments: string[] = [];
    let i = readComments(src, comments, 0);
    [type, i] = readUntil(src, i);
    i = readComments(src, comments, i);
    [sw, i] = readUntil(src, i, isWS);
    [sh, i] = readUntil(src, i, isWS);
    const width = parseInt(sw);
    const height = parseInt(sh);
    assert(width > 0 && height > 0, `invalid NetPBM header`);
    if (type === "P5" || type === "P6") {
        [norm, i] = readUntil(src, i);
        max = parseInt(norm);
    }
    return {
        type,
        width,
        height,
        max,
        start: i,
        comments,
    };
};

/**
 * Takes a PBM/PGM/PPM file as byte array and parses it into a
 * {@link @thi.ng/pixel#PackedBuffer} of corresponding format.
 *
 * @remarks
 * Depending on header information, the following rules apply:
 *
 * - only binary NetPBM formats are supported (P4,P5,P6 types)
 * - 1bit PBM (P4) => {@link readPBM}
 * - grayscale PGM (P5) => {@link readPGM8} or {@link readPGM16}
 * - 24bit RGB (P6) => {@link readPPM}
 *
 * Function will throw an error if image is of any other type or header is
 * corrupt otherwise. Any embedded comments will be discarded.
 *
 * @param src
 */
export const read = (src: Uint8Array) => {
    const { type, width, height, max, start } = parseHeader(src);
    switch (type) {
        case "P4":
            return readPBM(src, start, width, height);
        case "P5":
            return max! < 0x100
                ? readPGM8(src, start, width, height, max)
                : readPGM16(src, start, width, height, max);
        case "P6":
            return readPPM(src, start, width, height, max);
        default:
            unsupported(`PBM type: ${type}`);
    }
};

/**
 * Reads pixels from given 1bit PBM file byte buffer, starting at index `i` and
 * returns {@link @thi.ng/pixel#PackedBuffer} in `GRAY8` format (due to current
 * lack of true 1bit format).
 *
 * @param src
 * @param i
 * @param width
 * @param height
 */
export const readPBM = (
    src: Uint8Array,
    i: number,
    width: number,
    height: number
) => {
    const buf = packedBuffer(width, height, GRAY8);
    const pixels = buf.pixels;
    const w1 = width - 1;
    for (let y = 0, j = 0; y < height; y++) {
        for (let x = 0; x < width; x++, j++) {
            pixels[j] = (src[i] >> (7 - (x & 7))) & 1 ? 0 : 0xff;
            if ((x & 7) === 7 || x === w1) i++;
        }
    }
    return buf;
};

/**
 * Reads pixels from given 8bit PGM file byte buffer, starting at index `i` and
 * returns {@link @thi.ng/pixel#PackedBuffer} in `GRAY8` format. If needed,
 * pixel values are rescaled given `max` value defined in PGM header (MUST
 * be <= 0xff).
 *
 * @remarks
 * Reference: http://netpbm.sourceforge.net/doc/pbm.html
 *
 * @param src
 * @param i
 * @param width
 * @param height
 * @param max
 */
export const readPGM8 = (
    src: Uint8Array,
    i: number,
    width: number,
    height: number,
    max = 0xff
) => {
    const buf = packedBuffer(width, height, GRAY8);
    const pixels = buf.pixels;
    if (max === 0xff) {
        pixels.set(src.subarray(i));
    } else {
        max = 0xff / max;
        for (let j = 0, n = pixels.length; j < n; i++, j++) {
            pixels[j] = (src[i] * max) | 0;
        }
    }
    return buf;
};

/**
 * Reads pixels from given 16bit PGM file byte buffer, starting at index `i` and
 * returns {@link @thi.ng/pixel#PackedBuffer} in `GRAY16` format. Pixel values
 * are rescaled given `max` value defined in PGM header (MUST be <= 0xffff).
 *
 * @remarks
 * Reference: http://netpbm.sourceforge.net/doc/pgm.html
 *
 * @param src
 * @param i
 * @param width
 * @param height
 * @param max
 */
export const readPGM16 = (
    src: Uint8Array,
    i: number,
    width: number,
    height: number,
    max = 0xffff
) => {
    const buf = packedBuffer(width, height, GRAY16);
    const pixels = buf.pixels;
    max = 0xffff / max;
    for (let j = 0, n = pixels.length; j < n; i += 2, j++) {
        pixels[j] = (((src[i] << 8) | src[i + 1]) * max) | 0;
    }
    return buf;
};

/**
 * Reads pixels from given 24bit PPM file byte buffer, starting at index `i` and
 * returns {@link @thi.ng/pixel#PackedBuffer} in `RGB888` format. Color channel
 * values are rescaled given `max` value defined in PGM header (MUST be <=
 * 0xff).
 *
 * @remarks
 * Reference: http://netpbm.sourceforge.net/doc/pgm.html
 *
 * @param src
 * @param i
 * @param width
 * @param height
 * @param max
 */
export const readPPM = (
    src: Uint8Array,
    i: number,
    width: number,
    height: number,
    max = 0xff
) => {
    const buf = packedBuffer(width, height, RGB888);
    const pixels = buf.pixels;
    assert(max <= 0xff, `unsupported max value: ${max}`);
    if (max === 0xff) {
        for (let j = 0, n = pixels.length; j < n; i += 3, j++) {
            pixels[j] = (src[i] << 16) | (src[i + 1] << 8) | src[i + 2];
        }
    } else {
        max = 0xff / max;
        for (let j = 0, n = pixels.length; j < n; i += 3, j++) {
            pixels[j] =
                ((src[i] * max) << 16) |
                ((src[i + 1] * max) << 8) |
                (src[i + 2] * max);
        }
    }
    return buf;
};
