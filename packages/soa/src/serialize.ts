import { assert } from "@thi.ng/api/assert";
import { utf8Decode, utf8Encode } from "@thi.ng/transducers-binary/utf8";
import type { Vec } from "@thi.ng/vectors";
import type {
    SerializedTuple,
    Serializer,
    SerializerPair,
    SerializerSpecs,
} from "./api";

/**
 * Identity serializer pair (no op).
 */
export const ident = <SerializerPair<Vec>>{
    decode: (x) => x,
    encode: (x) => x,
};

/**
 * Serializer pair for scalars.
 */
export const scalar = <SerializerPair<number>>{
    decode: (v) => v[0],
    encode: (x) => [x],
};

const toUTF8 = utf8Decode();

/**
 * Zero-terminated UTF-8 string serializer pair for given max length
 * (incl. final \0 char).
 *
 * {@link SerializerPair.encode} throws error if resulting byte sequence
 * is larger than configured `maxLen`.
 *
 * @param maxLen -
 */
export const utf8z = (maxLen: number) =>
    <SerializerPair<string>>{
        decode: (v) => {
            let acc = "";
            const xf = toUTF8([<any>null, <any>null, (_, x) => (acc += x)])[2];
            for (let i = 0, n = v.length; i < n; i++) {
                const c = v[i];
                if (c === 0) break;
                xf(acc, c);
            }
            return acc;
        },
        encode: (v: string) => {
            const bytes = [...utf8Encode(v), 0];
            assert(bytes.length <= maxLen, `string too large: "${v}"`);
            return bytes;
        },
    };

export const serializer = <T extends SerializerSpecs>(
    specs: T
): Serializer<T> => ({
    decode(tuple) {
        const res = <SerializedTuple<T>>{};
        for (let id in tuple) {
            res[id] = specs[id].decode(tuple[id]);
        }
        return res;
    },
    encode: (tuple) => {
        const res = <Partial<Record<keyof T, Vec>>>{};
        for (let id in tuple) {
            res[id] = specs[id].encode(tuple[id]);
        }
        return res;
    },
});
