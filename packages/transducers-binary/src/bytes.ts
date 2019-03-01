import { reduce, Reducer } from "@thi.ng/transducers";
import { BinStructItem, Type } from "./api";
import { utf8Encode } from "./utf8";

export const i8 = (x: number): BinStructItem => [Type.I8, x];
export const i8array = (x: ArrayLike<number>): BinStructItem => [
    Type.I8_ARRAY,
    x
];
export const u8 = (x: number): BinStructItem => [Type.U8, x];
export const u8array = (x: ArrayLike<number>): BinStructItem => [
    Type.U8_ARRAY,
    x
];
export const i16 = (x: number, le = false): BinStructItem => [Type.I16, x, le];
export const i16array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.I16_ARRAY,
    x,
    le
];
export const u16 = (x: number, le = false): BinStructItem => [Type.U16, x, le];
export const u16array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.U16_ARRAY,
    x,
    le
];
export const i32 = (x: number, le = false): BinStructItem => [Type.I32, x, le];
export const i32array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.I32_ARRAY,
    x,
    le
];
export const u32 = (x: number, le = false): BinStructItem => [Type.U32, x, le];
export const u32array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.U32_ARRAY,
    x,
    le
];
export const f32 = (x: number, le = false): BinStructItem => [Type.F32, x, le];
export const f32array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.F32_ARRAY,
    x,
    le
];
export const f64 = (x: number, le = false): BinStructItem => [Type.F64, x, le];
export const f64array = (x: ArrayLike<number>, le = false): BinStructItem => [
    Type.F64_ARRAY,
    x,
    le
];
export const str = (x: string): BinStructItem => [Type.STR, x];

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

    return src
        ? reduce(bytes(cap), src)
        : <Reducer<Uint8Array, BinStructItem>>[
              () => new Uint8Array(cap),
              (acc) => acc.slice(0, pos),
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
                      case Type.I16_ARRAY: {
                          x = <ArrayLike<number>>x;
                          const n = x.length;
                          acc = ensure(acc, 2 * n);
                          for (let i = 0; i < n; i++, pos += 2)
                              view.setInt16(pos, x[i], le);
                          break;
                      }
                      case Type.U16:
                          acc = ensure(acc, 4);
                          view.setUint16(pos, <number>x, le);
                          pos += 4;
                          break;
                      case Type.U16_ARRAY: {
                          x = <ArrayLike<number>>x;
                          const n = x.length;
                          acc = ensure(acc, 2 * n);
                          for (let i = 0; i < n; i++, pos += 2)
                              view.setUint16(pos, x[i], le);
                          break;
                      }
                      case Type.I32:
                          acc = ensure(acc, 4);
                          view.setInt32(pos, <number>x, le);
                          pos += 4;
                          break;
                      case Type.I32_ARRAY: {
                          x = <ArrayLike<number>>x;
                          const n = x.length;
                          acc = ensure(acc, 4 * n);
                          for (let i = 0; i < n; i++, pos += 4)
                              view.setInt32(pos, x[i], le);
                          break;
                      }
                      case Type.U32:
                          acc = ensure(acc, 4);
                          view.setUint32(pos, <number>x, le);
                          pos += 4;
                          break;
                      case Type.U32_ARRAY: {
                          x = <ArrayLike<number>>x;
                          const n = x.length;
                          acc = ensure(acc, 4 * n);
                          for (let i = 0; i < n; i++, pos += 4)
                              view.setUint32(pos, x[i], le);
                          break;
                      }
                      case Type.F32:
                          acc = ensure(acc, 4);
                          view.setFloat32(pos, <number>x, le);
                          pos += 4;
                          break;
                      case Type.F32_ARRAY: {
                          x = <ArrayLike<number>>x;
                          const n = x.length;
                          acc = ensure(acc, 4 * n);
                          for (let i = 0; i < n; i++, pos += 4)
                              view.setFloat32(pos, x[i], le);
                          break;
                      }
                      case Type.F64:
                          acc = ensure(acc, 8);
                          view.setFloat64(pos, <number>x, le);
                          pos += 8;
                          break;
                      case Type.F64_ARRAY: {
                          x = <ArrayLike<number>>x;
                          const n = x.length;
                          acc = ensure(acc, 8 * n);
                          for (let i = 0; i < n; i++, pos += 8)
                              view.setFloat64(pos, x[i], le);
                          break;
                      }
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
              }
          ];
}
