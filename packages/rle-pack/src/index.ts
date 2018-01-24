import { BitInputStream, BitOutputStream } from "@thi.ng/bitstream";

const RLE_SIZES = [3, 4, 8, 16];

export function encodeBytes(src: Uint8Array) {
    let stream = new BitOutputStream().write(src.length, 32),
        num = src.length - 1,
        val = src[0],
        tail = true,
        n = -1,
        x, i, t,
        write = () => {
            stream.write(n > 0 ? 1 : 0, 1);
            stream.write(val, 8);
            if (n > 0) {
                t = (n < 0x8) ? 0 : (n < 0x10) ? 1 : (n < 0x100) ? 2 : 3;
                stream.write(t, 2);
                stream.write(n, RLE_SIZES[t]);
            }
            n = 0;
        };
    for (i = 0; i <= num; i++) {
        x = src[i];
        if (x !== val) {
            write();
            val = x;
        } else {
            if (++n === 0x10000) {
                write();
                tail = (i < num);
            }
        }
    }
    if (tail) { write(); }
    return stream.bytes();
}

export function decodeBytes(src: Uint8Array) {
    let num = (src[0] << 24 | src[1] << 16 | src[2] << 8 | src[3]),
        input = new BitInputStream(src, 32),
        out = new Uint8Array(num),
        i = 0,
        x, j;
    while (i < num) {
        x = input.read(9);
        if (x & 0x100) {
            j = i + 1 + input.read(RLE_SIZES[input.read(2)]);
            out.fill(x & 0xff, i, j);
            i = j;
        } else {
            out[i++] = x & 0xff;
        }
    }
    return out;
}
