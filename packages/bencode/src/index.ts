import { peek } from "@thi.ng/arrays/peek";
import { isArray } from "@thi.ng/checks/is-array";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isBoolean } from "@thi.ng/checks/is-boolean";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { assert } from "@thi.ng/errors/assert";
import { illegalState } from "@thi.ng/errors/illegal-state";
import { unsupported } from "@thi.ng/errors/unsupported";
import type { BinStructItem } from "@thi.ng/transducers-binary";
import { bytes, str, u8, u8array } from "@thi.ng/transducers-binary/bytes";
import { utf8Decode, utf8Length } from "@thi.ng/transducers-binary/utf8";
import { mapcat } from "@thi.ng/transducers/mapcat";

const enum Type {
    INT,
    FLOAT,
    STR,
    BINARY,
    DICT,
    LIST,
}

const enum Lit {
    MINUS = 0x2d,
    DOT = 0x2e,
    ZERO = 0x30,
    NINE = 0x39,
    COLON = 0x3a,
    DICT = 0x64,
    END = 0x65,
    FLOAT = 0x66,
    INT = 0x69,
    LIST = 0x6c,
}

const FLOAT_RE = /^[0-9.-]+$/;

export const encode = (x: any, cap = 1024) => bytes(cap, encodeBin(x));

const encodeBin = defmulti<any, BinStructItem[]>(
    (x: any): Type =>
        isNumber(x)
            ? Math.floor(x) !== x
                ? Type.FLOAT
                : Type.INT
            : isBoolean(x)
            ? Type.INT
            : isString(x)
            ? Type.STR
            : x instanceof Uint8Array
            ? Type.BINARY
            : isArrayLike(x)
            ? Type.LIST
            : isPlainObject(x)
            ? Type.DICT
            : unsupported(`unsupported data type: ${x}`)
);

encodeBin.addAll({
    [Type.INT]: (x: number) => [str(`i${Math.floor(x)}e`)],

    [Type.FLOAT]: (x: number) => {
        assert(
            FLOAT_RE.test(x.toString()),
            `exponential notation not allowed (${x})`
        );
        return [str(`f${x}e`)];
    },

    [Type.BINARY]: (buf: Uint8Array) => [str(buf.length + ":"), u8array(buf)],

    [Type.STR]: (x: string) => [str(utf8Length(x) + ":" + x)],

    [Type.LIST]: (x: Iterable<any>) => [
        u8(0x6c),
        ...mapcat(encodeBin, x),
        u8(0x65),
    ],

    [Type.DICT]: (x: any) => [
        u8(0x64),
        ...mapcat(
            (k: string) => encodeBin(k).concat(encodeBin(x[k])),
            Object.keys(x).sort()
        ),
        u8(0x65),
    ],
});

export const decode = (buf: Iterable<number>, utf8 = true) => {
    const iter = buf[Symbol.iterator]();
    const stack = [];
    let i: IteratorResult<number>;
    let x: any;
    while (!(i = iter.next()).done) {
        x = i.value;
        switch (x) {
            case Lit.DICT:
                ensureNotKey(stack, "dict");
                stack.push({ type: Type.DICT, val: {} });
                break;
            case Lit.LIST:
                ensureNotKey(stack, "list");
                stack.push({ type: Type.LIST, val: [] });
                break;
            case Lit.INT:
                x = collect(stack, readInt(iter, 0));
                if (x !== undefined) {
                    return x;
                }
                break;
            case Lit.FLOAT:
                x = collect(stack, readFloat(iter));
                if (x !== undefined) {
                    return x;
                }
                break;
            case Lit.END:
                x = stack.pop();
                if (x) {
                    const parent = peek(stack);
                    if (parent) {
                        if (parent.type === Type.LIST) {
                            (<any[]>parent.val).push(x.val);
                        } else if (parent.type === Type.DICT) {
                            (<any>parent.val)[(<any>parent).key] = x.val;
                            (<any>parent).key = null;
                        }
                    } else {
                        return x.val;
                    }
                } else {
                    illegalState("unmatched end literal");
                }
                break;
            default:
                if (x >= Lit.ZERO && x <= Lit.NINE) {
                    x = readBytes(
                        iter,
                        readInt(iter, x - Lit.ZERO, Lit.COLON)!
                    );
                    x = collect(stack, x, utf8);
                    if (x !== undefined) {
                        return x;
                    }
                } else {
                    illegalState(
                        `unexpected value type: 0x${i.value.toString(16)}`
                    );
                }
        }
    }
    return peek(stack).val;
};

const ensureNotKey = (stack: any[], type: string) => {
    const x = peek(stack);
    assert(
        !x || x.type !== Type.DICT || x.key,
        type + " not supported as dict key"
    );
};

const collect = (stack: any[], x: any, utf8 = false) => {
    const parent = peek(stack);
    if (!parent) return x;
    if (parent.type === Type.LIST) {
        parent.val.push(utf8 && isArray(x) ? utf8Decode(x) : x);
    } else {
        if (!parent.key) {
            parent.key = isArray(x) ? utf8Decode(x) : x;
        } else {
            parent.val[parent.key] = utf8 ? utf8Decode(x) : x;
            parent.key = null;
        }
    }
};

const readInt = (iter: Iterator<number>, acc: number, end = Lit.END) => {
    let i: IteratorResult<number>;
    let x: number;
    while (!(i = iter.next()).done) {
        x = i.value;
        if (x >= Lit.ZERO && x <= Lit.NINE) {
            acc = acc * 10 + x - Lit.ZERO;
        } else if (x === end) {
            return acc;
        } else {
            illegalState(`expected digit, got 0x${x.toString(16)}`);
        }
    }
    illegalState(`incomplete int`);
};

const readFloat = (iter: Iterator<number>) => {
    let i: IteratorResult<number>;
    let x: number;
    let acc = "";
    while (!(i = iter.next()).done) {
        x = i.value;
        if (
            (x >= Lit.ZERO && x <= Lit.NINE) ||
            x === Lit.DOT ||
            x === Lit.MINUS
        ) {
            acc += String.fromCharCode(x);
        } else if (x === Lit.END) {
            return parseFloat(acc);
        } else {
            illegalState(`expected digit or dot, got 0x${x.toString(16)}`);
        }
    }
    illegalState(`incomplete float`);
};

const readBytes = (iter: Iterator<number>, len: number) => {
    let i: IteratorResult<number>;
    let buf: number[] = [];
    while (--len >= 0 && !(i = iter.next()).done) {
        buf.push(i.value);
    }
    return len < 0 ? buf : illegalState(`expected string, reached EOF`);
};
