import { assert } from "@thi.ng/api";
import { unsupported } from "@thi.ng/errors";
import { GRAY8, packedBuffer, RGB888 } from "@thi.ng/pixel";

const readLine = (src: Uint8Array, i: number): [string, number] => {
    let res = "";
    for (; i < src.length; i++) {
        let c = src[i];
        if (c === 0xa) {
            i++;
            break;
        }
        res += String.fromCharCode(c);
    }
    return [res, i];
};

const skipComments = (src: Uint8Array, i: number) => {
    while (src[i] === 0x23) {
        // @ts-ignore
        const [_, j] = readLine(src, i);
        assert(j !== i, `EOF reached`);
        i = j;
    }
    return i;
};

export const read = (src: Uint8Array) => {
    let type: string;
    let size: string;
    let i = skipComments(src, 0);
    [type, i] = readLine(src, i);
    i = skipComments(src, i);
    [size, i] = readLine(src, i);
    const [width, height] = size.split(" ").map((x) => parseInt(x));
    switch (type) {
        case "P4":
            return readPBM(src, i, width, height);
        case "P5":
            return readPGM(src, readLine(src, i)[1], width, height);
        case "P6":
            return readPPM(src, readLine(src, i)[1], width, height);
        default:
            unsupported(`PBM type: ${type}`);
    }
};

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
            pixels[j] = src[i] >> (7 - (x & 7)) === 1 ? 0 : 0xff;
            if ((x & 7) === 7 || x === w1) i++;
        }
    }
    return buf;
};

export const readPGM = (
    src: Uint8Array,
    i: number,
    width: number,
    height: number
) => {
    const buf = packedBuffer(width, height, GRAY8);
    buf.pixels.set(src.subarray(i));
    return buf;
};

export const readPPM = (
    src: Uint8Array,
    i: number,
    width: number,
    height: number
) => {
    const buf = packedBuffer(width, height, RGB888);
    const pixels = buf.pixels;
    for (let j = 0, n = pixels.length; j < n; i += 3, j++) {
        pixels[j] = (src[i] << 16) | (src[i + 1] << 8) | src[i + 2];
    }
    return buf;
};
