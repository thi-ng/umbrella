import { assert } from "@thi.ng/api";
import { MASKS } from "@thi.ng/binary";
import { fit, fit01, inRange } from "@thi.ng/math";
import {
    decode10,
    decode16,
    decode5,
    encode10,
    encode16,
    encode5,
} from "./raw";

const prescale = (x: number, min: number, max: number, bits: number) => {
    assert(inRange(x, min, max), `value ${x} not in range [${min}..${max}]`);
    return Math.round(fit(x, min, max, 0, MASKS[bits]));
};

export const encodeScaled5 = (x: number, min = 0, max = 1) =>
    encode5(prescale(x, min, max, 5));

export const encodeScaled10 = (x: number, min = 0, max = 1) =>
    encode10(prescale(x, min, max, 10));

export const encodeScaled16 = (x: number, min = 0, max = 1) =>
    encode16(prescale(x, min, max, 16));

export const decodeScaled5 = (x: number, min = 0, max = 1) =>
    fit01(decode5(x) / 0x1f, min, max);

export const decodeScaled10 = (x: number, min = 0, max = 1) =>
    fit01(decode10(x) / 0x3ff, min, max);

export const decodeScaled16 = (x: number, min = 0, max = 1) =>
    fit01(decode16(x) / 0xffff, min, max);
