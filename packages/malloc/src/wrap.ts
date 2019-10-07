import { Type, TYPEDARRAY_CTORS } from "@thi.ng/api";

export const wrap = (type: Type, buf: ArrayBuffer, addr: number, num: number) =>
    new TYPEDARRAY_CTORS[type](buf, addr, num);
