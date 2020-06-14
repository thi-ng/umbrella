import { bytes16, bytes24, bytes32, bytesF32, bytesF64 } from "@thi.ng/binary";
import { unsupported } from "@thi.ng/errors";
import {
    iterator,
    mapcat,
    reduce,
    Reducer,
    Transducer,
} from "@thi.ng/transducers";
import { BinStructItem, Type } from "./api";
import { utf8Encode } from "./utf8";

export const i8 = (x: number): BinStructItem => [Type.I8, x];
export const i8array = (x: ArrayLike<number>): BinStructItem => [
    Type.I8_ARRAY,
    x,
];

export const u8 = (x: number): BinStructItem => [Type.U8, x];
export const u8array = (x: ArrayLike<number>): BinStructItem => [
    Type.U8_ARRAY,
    x,
];

export const i16 = (x: number, le = false): BinStructItem => [Type.I16, x, le];
export const i16array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.I16_ARRAY,
    x,
    le,
];

export const u16 = (x: number, le = false): BinStructItem => [Type.U16, x, le];
export const u16array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.U16_ARRAY,
    x,
    le,
];

export const i24 = (x: number, le = false): BinStructItem => [Type.I24, x, le];
export const i24array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.I24_ARRAY,
    x,
    le,
];

export const u24 = (x: number, le = false): BinStructItem => [Type.U24, x, le];
export const u24array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.U24_ARRAY,
    x,
    le,
];

export const i32 = (x: number, le = false): BinStructItem => [Type.I32, x, le];
export const i32array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.I32_ARRAY,
    x,
    le,
];

export const u32 = (x: number, le = false): BinStructItem => [Type.U32, x, le];
export const u32array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.U32_ARRAY,
    x,
    le,
];

export const f32 = (x: number, le = false): BinStructItem => [Type.F32, x, le];
export const f32array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.F32_ARRAY,
    x,
    le,
];

export const f64 = (x: number, le = false): BinStructItem => [Type.F64, x, le];
export const f64array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.F64_ARRAY,
    x,
    le,
];

export const str = (x: string): BinStructItem => [Type.STR, x];

/**
 * Transducer which converts {@link BinStructItem} inputs to bytes. If
 * `src` iterable is given, yields an iterator of unsigned bytes (e.g.
 * for streaming purposes).
 *
 * @example
 * ```ts
 * hexDumpString({}, asBytes([
 *   str("hello!"),
 *   u32(0xdecafbad),
 *   i16(-1),
 *   f32(Math.PI)
 * ]))
 * // 00000000 | 68 65 6c 6c 6f 21 de ca fb ad ff ff 40 49 0f db | hello!......@I..
 * ```
 */
export function asBytes(): Transducer<BinStructItem, number>;
export function asBytes(src: Iterable<BinStructItem>): IterableIterator<number>;
export function asBytes(src?: Iterable<BinStructItem>): any {
    return src
        ? iterator(asBytes(), src)
        : mapcat((x: BinStructItem) => {
              const val = <number>x[1];
              const le = x[2];
              switch (x[0]) {
                  case Type.I8:
                  case Type.U8:
                      return [val];
                  case Type.I8_ARRAY:
                  case Type.U8_ARRAY:
                      return <number[]>x[1];
                  case Type.I16:
                  case Type.U16:
                      return bytes16(val, le);
                  case Type.I16_ARRAY:
                  case Type.U16_ARRAY:
                      return mapcat((x) => bytes16(x, le), <number[]>x[1]);
                  case Type.I24:
                  case Type.U24:
                      return bytes24(val, le);
                  case Type.I24_ARRAY:
                  case Type.U24_ARRAY:
                      return mapcat((x) => bytes24(x, le), <number[]>x[1]);
                  case Type.I32:
                  case Type.U32:
                      return bytes32(val, le);
                  case Type.I32_ARRAY:
                  case Type.U32_ARRAY:
                      return mapcat((x) => bytes32(x, le), <number[]>x[1]);
                  case Type.F32:
                      return bytesF32(val, le);
                  case Type.F32_ARRAY:
                      return mapcat((x) => bytesF32(x, le), <number[]>x[1]);
                  case Type.F64:
                      return bytesF64(val, le);
                  case Type.F64_ARRAY:
                      return mapcat((x) => bytesF64(x, le), <number[]>x[1]);
                  case Type.STR:
                      return utf8Encode(<string>x[1]);
                  default:
                      unsupported(`invalid struct item: ${x[0]}`);
              }
          });
}

export function bytes(cap?: number): Reducer<Uint8Array, BinStructItem>;
export function bytes(cap: number, src: Iterable<BinStructItem>): Uint8Array;
export function bytes(cap = 1024, src?: Iterable<BinStructItem>) {
    let view: DataView;
    let pos = 0;

    const ensure = (acc: Uint8Array, size: number) => {
        if (pos + size <= cap) return acc;
        cap *= 2;
        const buf = new Uint8Array(cap);
        buf.set(acc);
        view = new DataView(buf.buffer);
        return buf;
    };

    const setArray = (
        fn: string,
        stride: number,
        acc: Uint8Array,
        x: any,
        le: boolean
    ) => {
        const n = x.length;
        acc = ensure(acc, stride * n);
        for (let i = 0; i < n; i++, pos += stride) {
            (<any>view)[fn](pos, x[i], le);
        }
        return acc;
    };

    return src
        ? reduce(bytes(cap), src)
        : <Reducer<Uint8Array, BinStructItem>>[
              () => new Uint8Array(cap),
              (acc) => acc.subarray(0, pos),
              (acc, [type, x, le = false]) => {
                  if (!view || view.buffer !== acc.buffer) {
                      cap = acc.byteLength;
                      view = new DataView(acc.buffer, acc.byteOffset);
                  }
                  switch (type) {
                      case Type.I8:
                          acc = ensure(acc, 1);
                          view.setInt8(pos, <number>x);
                          pos++;
                          break;
                      case Type.I8_ARRAY: {
                          const n = (<ArrayLike<number>>x).length;
                          acc = ensure(acc, n);
                          new Int8Array(acc.buffer, acc.byteOffset).set(
                              <ArrayLike<number>>x,
                              pos
                          );
                          pos += n;
                          break;
                      }
                      case Type.U8:
                          acc = ensure(acc, 1);
                          view.setUint8(pos, <number>x);
                          pos++;
                          break;
                      case Type.U8_ARRAY: {
                          const n = (<ArrayLike<number>>x).length;
                          acc = ensure(acc, n);
                          acc.set(<ArrayLike<number>>x, pos);
                          pos += n;
                          break;
                      }
                      case Type.I16:
                          acc = ensure(acc, 2);
                          view.setInt16(pos, <number>x, le);
                          pos += 2;
                          break;
                      case Type.I16_ARRAY:
                          acc = setArray("setInt16", 2, acc, x, le);
                          break;
                      case Type.U16:
                          acc = ensure(acc, 2);
                          view.setUint16(pos, <number>x, le);
                          pos += 2;
                          break;
                      case Type.U16_ARRAY:
                          acc = setArray("setUint16", 2, acc, x, le);
                          break;
                      case Type.I24:
                          acc = ensure(acc, 4);
                          view.setInt32(pos, <number>x, le);
                          pos += 3;
                          break;
                      case Type.I24_ARRAY:
                          acc = setArray("setInt32", 3, acc, x, le);
                          break;
                      case Type.U24:
                          acc = ensure(acc, 4);
                          view.setUint32(pos, <number>x, le);
                          pos += 3;
                          break;
                      case Type.U24_ARRAY:
                          acc = setArray("setUint32", 3, acc, x, le);
                          break;
                      case Type.I32:
                          acc = ensure(acc, 4);
                          view.setInt32(pos, <number>x, le);
                          pos += 4;
                          break;
                      case Type.I32_ARRAY:
                          acc = setArray("setInt32", 4, acc, x, le);
                          break;
                      case Type.U32:
                          acc = ensure(acc, 4);
                          view.setUint32(pos, <number>x, le);
                          pos += 4;
                          break;
                      case Type.U32_ARRAY:
                          acc = setArray("setUint32", 4, acc, x, le);
                          break;
                      case Type.F32:
                          acc = ensure(acc, 4);
                          view.setFloat32(pos, <number>x, le);
                          pos += 4;
                          break;
                      case Type.F32_ARRAY:
                          acc = setArray("setFloat32", 4, acc, x, le);
                          break;
                      case Type.F64:
                          acc = ensure(acc, 8);
                          view.setFloat64(pos, <number>x, le);
                          pos += 8;
                          break;
                      case Type.F64_ARRAY:
                          acc = setArray("setFloat64", 8, acc, x, le);
                          break;
                      case Type.STR: {
                          let utf = [...utf8Encode(<string>x)];
                          acc = ensure(acc, utf.length);
                          acc.set(utf, pos);
                          pos += utf.length;
                          break;
                      }
                      default:
                  }
                  return acc;
              },
          ];
}
