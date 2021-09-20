import type { Reducer, Transducer } from "@thi.ng/transducers";
import { compR } from "@thi.ng/transducers/compr";
import { iterator, iterator1 } from "@thi.ng/transducers/iterator";
import { isReduced } from "@thi.ng/transducers/reduced";

/**
 * Transducer which decodes a byte input sequence into UTF-8 characters.
 * Also see {@link (utf8Encode:1)} for reverse transformation.
 */
export function utf8Decode(): Transducer<number, string>;
export function utf8Decode(src: Iterable<number>): string;
export function utf8Decode(src?: Iterable<number>): any {
    return src
        ? [...iterator1(utf8Decode(), src)].join("")
        : (rfn: Reducer<any, string>) => {
              const r = rfn[2];
              let state = 0;
              let u0: number;
              let u1: number;
              let u2: number;
              let u3: number;
              let u4: number;
              return compR(rfn, (acc, x: number) => {
                  switch (state) {
                      case 0:
                      default:
                          if (x < 0x80) {
                              return r(acc, String.fromCharCode(x));
                          }
                          u0 = x;
                          state = 1;
                          break;
                      case 1:
                          u1 = x & 0x3f;
                          if ((u0 & 0xe0) === 0xc0) {
                              state = 0;
                              return r(
                                  acc,
                                  String.fromCharCode(((u0 & 0x1f) << 6) | u1)
                              );
                          }
                          state = 2;
                          break;
                      case 2:
                          u2 = x & 0x3f;
                          if ((u0 & 0xf0) === 0xe0) {
                              state = 0;
                              return r(
                                  acc,
                                  String.fromCharCode(
                                      ((u0 & 0x0f) << 12) | (u1 << 6) | u2
                                  )
                              );
                          }
                          state = 3;
                          break;
                      case 3:
                          u3 = x & 0x3f;
                          if ((u0 & 0xf8) === 0xf0) {
                              state = 0;
                              return r(
                                  acc,
                                  codePoint(
                                      ((u0 & 7) << 18) |
                                          (u1 << 12) |
                                          (u2 << 6) |
                                          u3
                                  )
                              );
                          }
                          state = 4;
                          break;
                      case 4:
                          u4 = x & 0x3f;
                          if ((u0 & 0xfc) === 0xf8) {
                              state = 0;
                              return r(
                                  acc,
                                  codePoint(
                                      ((u0 & 3) << 24) |
                                          (u1 << 18) |
                                          (u2 << 12) |
                                          (u3 << 6) |
                                          u4
                                  )
                              );
                          }
                          state = 5;
                          break;
                      case 5:
                          state = 0;
                          return r(
                              acc,
                              codePoint(
                                  ((u0 & 1) << 30) |
                                      (u1 << 24) |
                                      (u2 << 18) |
                                      (u3 << 12) |
                                      (u4 << 6) |
                                      (x & 0x3f)
                              )
                          );
                  }
                  return acc;
              });
          };
}

/**
 * Transducer which encodes UTF-8 characters into a byte sequence.
 *
 * Also see {@link (utf8Decode:1)} for reverse transformation.
 *
 * @example
 * ```ts
 * transduce(
 *   comp(utf8Encode(), hexDump()),
 *   str("\n"),
 *   "¡Hola niña! 😀"
 * )
 * // 00000000 | c2 a1 48 6f 6c 61 20 6e | ..Hola n
 * // 00000008 | 69 c3 b1 61 21 20 f0 9f | i..a! ..
 * // 00000010 | 98 80 00 00 00 00 00 00 | ........
 * ```
 */
export function utf8Encode(): Transducer<string, number>;
export function utf8Encode(src: string): IterableIterator<number>;
export function utf8Encode(src?: string): any {
    return src != null
        ? iterator(utf8Encode(), src)
        : (rfn: Reducer<any, number>) => {
              const r = rfn[2];
              return compR(rfn, (acc, x: string) => {
                  let u = x.charCodeAt(0),
                      buf;
                  if (u >= 0xd800 && u <= 0xdfff) {
                      u =
                          (0x10000 + ((u & 0x3ff) << 10)) |
                          (x.charCodeAt(1) & 0x3ff);
                  }
                  if (u < 0x80) {
                      return r(acc, u);
                  } else if (u < 0x800) {
                      buf = [0xc0 | (u >> 6), 0x80 | (u & 0x3f)];
                  } else if (u < 0x10000) {
                      buf = [
                          0xe0 | (u >> 12),
                          0x80 | ((u >> 6) & 0x3f),
                          0x80 | (u & 0x3f),
                      ];
                  } else if (u < 0x200000) {
                      buf = [
                          0xf0 | (u >> 18),
                          0x80 | ((u >> 12) & 0x3f),
                          0x80 | ((u >> 6) & 0x3f),
                          0x80 | (u & 0x3f),
                      ];
                  } else if (u < 0x4000000) {
                      buf = [
                          0xf8 | (u >> 24),
                          0x80 | ((u >> 18) & 0x3f),
                          0x80 | ((u >> 12) & 0x3f),
                          0x80 | ((u >> 6) & 0x3f),
                          0x80 | (u & 0x3f),
                      ];
                  } else {
                      buf = [
                          0xfc | (u >> 30),
                          0x80 | ((u >> 24) & 0x3f),
                          0x80 | ((u >> 18) & 0x3f),
                          0x80 | ((u >> 12) & 0x3f),
                          0x80 | ((u >> 6) & 0x3f),
                          0x80 | (u & 0x3f),
                      ];
                  }
                  for (let i = 0, n = buf.length; i < n; i++) {
                      acc = r(acc, buf[i]);
                      if (isReduced(acc)) {
                          break;
                      }
                  }
                  return acc;
              });
          };
}

const codePoint = (x: number) =>
    x < 0x10000
        ? String.fromCharCode(x)
        : ((x -= 0x10000),
          String.fromCharCode(0xd800 | (x >> 10), 0xdc00 | (x & 0x3ff)));

export const utf8Length = (str: string) => {
    const n = str.length;
    let len = 0;
    for (let i = 0; i < n; ++i) {
        let u = str.charCodeAt(i);
        if (u >= 0xd800 && u <= 0xdfff) {
            u = (0x10000 + ((u & 0x3ff) << 10)) | (str.charCodeAt(++i) & 0x3ff);
        }
        len +=
            u <= 0x7f
                ? 1
                : u <= 0x7ff
                ? 2
                : u <= 0xffff
                ? 3
                : u <= 0x1fffff
                ? 4
                : u <= 0x3ffffff
                ? 5
                : 6;
    }
    return len;
};
