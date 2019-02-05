import { assert } from "@thi.ng/api";
import {
    isArrayLike,
    isBoolean,
    isNumber,
    isPlainObject,
    isString,
} from "@thi.ng/checks";
import { defmulti } from "@thi.ng/defmulti";
import { mapcat } from "@thi.ng/transducers";
import {
    BinStructItem,
    bytes,
    str,
    u8,
    u8array
} from "@thi.ng/transducers-binary";

const enum Type {
    INT,
    FLOAT,
    STR,
    BINARY,
    DICT,
    LIST
};

const FLOAT_RE = /^[0-9.-]+$/;

export const encode = (x: any, cap = 1024) =>
    bytes(cap, encodeBin(x));

const encodeBin = defmulti<any, BinStructItem[]>(
    (x: any): Type =>
        isNumber(x) ?
            Math.floor(x) !== x ?
                Type.FLOAT :
                Type.INT :
            isBoolean(x) ?
                Type.INT :
                isString(x) ?
                    Type.STR :
                    (x instanceof Uint8Array) ?
                        Type.BINARY :
                        isArrayLike(x) ?
                            Type.LIST :
                            isPlainObject(x) ?
                                Type.DICT :
                                undefined
);

encodeBin.addAll({
    [Type.INT]: (x: number) => [str(`i${Math.floor(x)}e`)],

    [Type.FLOAT]: (x: number) => {
        assert(FLOAT_RE.test(x.toString()), `exponential notation not allowed (${x})`);
        return [str(`f${x}e`)]
    },

    [Type.BINARY]: (buf: Uint8Array) =>
        [str(buf.length + ":"), u8array(buf)],

    [Type.STR]: (x: string) =>
        [str(x.length + ":" + x)],

    [Type.LIST]: (x: Iterable<any>) =>
        [u8(0x6c), ...mapcat(encodeBin, x), u8(0x65)],

    [Type.DICT]: (x: any) =>
        [
            u8(0x64),
            ...mapcat(
                (k: string) => encodeBin(k).concat(encodeBin(x[k])),
                Object.keys(x).sort()),
            u8(0x65)
        ]
});
