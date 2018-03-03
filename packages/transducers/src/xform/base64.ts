import { Transducer, Reducer } from "../api";
import { compR } from "../func/compr";
import { isReduced, reduced } from "../reduced";

const B64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const B64_SAFE = B64_CHARS.substr(0, 62) + "-_";

/**
 * Stateful transducer. Decodes base64 chars into bytes.
 * Supports URL safe & unsafe flavors.
 */
export function base64Decode(): Transducer<string, number> {
    return (rfn: Reducer<any, number>) => {
        const r = rfn[2];
        let bc = 0, bs = 0;
        return compR(rfn,
            (acc, x: string) => {
                switch (x) {
                    case "-":
                        x = "+";
                        break;
                    case "_":
                        x = "/";
                        break;
                    case "=":
                        return reduced(acc);
                    default:
                }
                let y = B64_CHARS.indexOf(x);
                bs = bc & 3 ? (bs << 6) + y : y;
                if (bc++ & 3) {
                    acc = r(acc, 255 & bs >> (-2 * bc & 6));
                }
                return acc;
            });
    };
}

/**
 * Stateful transducer. Encodes bytes into base64 chars.
 * Supports URL safe & unsafe flavors. Uses internal
 * buffer to store intermediate results and repeatedly
 * calls reducer to drain buffer whenever it's been filled.
 *
 * @param urlSafe
 * @param bufSize
 */
export function base64Encode(urlSafe = false, bufSize = 1024): Transducer<number, string> {
    return ([init, complete, reduce]: Reducer<any, string>) => {
        let a = 0, b;
        const chars = urlSafe ? B64_SAFE : B64_CHARS;
        const buf: string[] = [];
        return [
            init,
            (acc) => {
                switch (a) {
                    case 1:
                        buf.push(
                            chars[b >> 18 & 0x3f],
                            chars[b >> 12 & 0x3f],
                            "=",
                            "="
                        );
                        break;
                    case 2:
                        buf.push(
                            chars[b >> 18 & 0x3f],
                            chars[b >> 12 & 0x3f],
                            chars[b >> 6 & 0x3f],
                            "="
                        );
                        break;
                    default:
                }
                while (buf.length && !isReduced(acc)) {
                    acc = reduce(acc, buf.shift());
                }
                return complete(acc);
            },
            (acc, x) => {
                switch (a) {
                    case 0:
                        a = 1;
                        b = x << 16;
                        break;
                    case 1:
                        a = 2;
                        b += x << 8;
                        break;
                    default:
                        a = 0;
                        b += x;
                        buf.push(
                            chars[b >> 18 & 0x3f],
                            chars[b >> 12 & 0x3f],
                            chars[b >> 6 & 0x3f],
                            chars[b & 0x3f]
                        );
                        if (buf.length >= bufSize) {
                            for (let i = 0, n = buf.length; i < n; i++) {
                                acc = reduce(acc, buf[i]);
                                if (isReduced(acc)) {
                                    buf.length = 0;
                                    return acc;
                                }
                            }
                            buf.length = 0;
                        }
                }
                return acc;
            }
        ];
    };
}
