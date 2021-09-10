import type { Reducer, Transducer } from "@thi.ng/transducers";
import { compR } from "@thi.ng/transducers/func/compr";
import { $iter, iterator, iterator1 } from "@thi.ng/transducers/iterator";
import { isReduced, reduced } from "@thi.ng/transducers/reduced";

const B64_CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const B64_SAFE = B64_CHARS.substr(0, 62) + "-_";

/**
 * Stateful transducer. Decodes base64 chars into bytes.
 * Supports URL safe & unsafe flavors.
 */
export function base64Decode(): Transducer<string, number>;
export function base64Decode(src: string): IterableIterator<number>;
export function base64Decode(src?: string): any {
    return src
        ? iterator1(base64Decode(), src)
        : (rfn: Reducer<any, number>) => {
              const r = rfn[2];
              let bc = 0,
                  bs = 0;
              return compR(rfn, (acc, x: string) => {
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
                      acc = r(acc, 255 & (bs >> ((-2 * bc) & 6)));
                  }
                  return acc;
              });
          };
}

export interface Base64EncodeOpts {
    safe: boolean;
    buffer: number;
}

/**
 * Stateful transducer. Encodes bytes into base64 chars. Supports URL
 * safe & unsafe flavors, configurable via provided options. Uses
 * internal buffer (size also configurable, default = 1024) to store
 * intermediate results. Then repeatedly calls reducer to drain buffer
 * whenever it's been filled.
 *
 * @param urlSafe -
 * @param bufSize -
 */
export function base64Encode(): Transducer<number, string>;
export function base64Encode(
    opts: Partial<Base64EncodeOpts>
): Transducer<number, string>;
export function base64Encode(src: Iterable<number>): string;
export function base64Encode(
    opts: Partial<Base64EncodeOpts>,
    src: Iterable<number>
): string;
export function base64Encode(...args: any[]): any {
    const iter = $iter(base64Encode, args, iterator);
    if (iter) {
        return [...iter].join("");
    }
    return ([init, complete, reduce]: Reducer<any, string>) => {
        let state = 0;
        let b: number;
        const opts = { safe: false, buffer: 1024, ...args[0] };
        const chars = opts.safe ? B64_SAFE : B64_CHARS;
        const buf: string[] = [];
        return <Reducer<any, number>>[
            init,
            (acc) => {
                switch (state) {
                    case 1:
                        buf.push(
                            chars[(b >> 18) & 0x3f],
                            chars[(b >> 12) & 0x3f],
                            "=",
                            "="
                        );
                        break;
                    case 2:
                        buf.push(
                            chars[(b >> 18) & 0x3f],
                            chars[(b >> 12) & 0x3f],
                            chars[(b >> 6) & 0x3f],
                            "="
                        );
                        break;
                    default:
                }
                while (buf.length && !isReduced(acc)) {
                    acc = reduce(acc, buf.shift()!);
                }
                return complete(acc);
            },
            (acc, x) => {
                switch (state) {
                    case 0:
                        state = 1;
                        b = x << 16;
                        break;
                    case 1:
                        state = 2;
                        b += x << 8;
                        break;
                    default:
                        state = 0;
                        b += x;
                        buf.push(
                            chars[(b >> 18) & 0x3f],
                            chars[(b >> 12) & 0x3f],
                            chars[(b >> 6) & 0x3f],
                            chars[b & 0x3f]
                        );
                        if (buf.length >= opts.buffer) {
                            for (
                                let i = 0, n = buf.length;
                                i < n && !isReduced(acc);
                                i++
                            ) {
                                acc = reduce(acc, buf[i]);
                            }
                            buf.length = 0;
                        }
                }
                return acc;
            },
        ];
    };
}
