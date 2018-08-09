import { BitInputStream, BitOutputStream } from "@thi.ng/bitstream";

const RLE_SIZES = [3, 4, 8, 16];

/**
 * Compresses input using dynamically sized RLE compression and returns
 * result as `Uint8Array`.
 *
 * @param src
 * @param num number of input words
 * @param wordSize in bits, MUST be <= 8
 */
export function encodeBytes(src: Iterable<number>, num: number, wordSize = 8) {
    const stream = new BitOutputStream(num * wordSize / 8).write(num, 32);
    const n1 = num - 1;
    let val;
    let tail = true;
    let n = -1;
    let i = 0, t;
    const write = () => {
        stream.write(n > 0 ? 1 : 0, 1);
        stream.write(val, wordSize);
        if (n > 0) {
            t = (n < 0x8) ? 0 : (n < 0x10) ? 1 : (n < 0x100) ? 2 : 3;
            stream.write(t, 2);
            stream.write(n, RLE_SIZES[t]);
        }
        n = 0;
    };
    for (let x of src) {
        if (val === undefined) {
            val = x;
        } else if (x !== val) {
            write();
            val = x;
        } else {
            if (++n === 0x10000) {
                write();
                tail = (i < n1);
            }
        }
        i++;
    }
    if (tail) {
        write();
    }
    return stream.bytes();
}

export function decodeBytes(src: Uint8Array, wordSize = 8) {
    const input = new BitInputStream(src);
    const ws1 = wordSize + 1;
    const num = input.read(32);
    const out = new Uint8Array(num);
    const flag = 1 << wordSize;
    const mask = flag - 1;
    let x, j;
    for (let i = 0; i < num;) {
        x = input.read(ws1);
        if (x & flag) {
            j = i + 1 + input.read(RLE_SIZES[input.read(2)]);
            out.fill(x & mask, i, j);
            i = j;
        } else {
            out[i++] = x & mask;
        }
    }
    return out;
}
