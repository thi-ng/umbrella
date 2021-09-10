import { hash } from "@thi.ng/vectors/hash";

const BUF = new Array(1024);

/**
 * Encodes given string into array of its char codes. If `buf` is not
 * given, writes results into a shared, pre-defined array (use only for
 * ephemeral purposes).
 *
 * @param txt -
 * @param buf -
 */
export const encodeString = (txt: string, buf = BUF) => {
    const n = (buf.length = txt.length);
    for (let i = 0; i < n; i++) {
        buf[i] = txt.charCodeAt(i);
    }
    return buf;
};

/**
 * Returns Murmur3 hashcode for given string.
 *
 * @param txt -
 */
export const hashString = (txt: string) => hash(encodeString(txt));

/**
 * Mixes existing hash with that of given string.
 *
 * @param key -
 * @param txt -
 */
export const mixHash = (key: number, txt: string) => key ^ hashString(txt);

/**
 * Hash helper for labels. Mixes existing hash with given label and
 * GUI's disabled flag.
 *
 * @param key -
 * @param label -
 * @param disabled -
 */
export const labelHash = (key: number, label: string, disabled: boolean) =>
    mixHash(key + ~~disabled, label);

/**
 * Hash helper for numeric value labels. Mixes existing hash with given
 * value and GUI's disabled flag.
 *
 * @param key -
 * @param val -
 * @param disabled -
 */
export const valHash = (key: number, val: number, disabled: boolean) =>
    mixHash(key + ~~disabled, String(val));
