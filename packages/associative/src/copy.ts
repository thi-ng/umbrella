import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isIllegalKey } from "@thi.ng/checks/is-proto-path";

export const copy = (x: any, ctor: Function) =>
    implementsFunction(x, "copy")
        ? x.copy()
        : new (x[Symbol.species] || ctor)(x);

export const copyObj = (x: any) => {
    const res: any = {};
    for (let k in x) {
        !isIllegalKey(k) && (res[k] = x[k]);
    }
    return res;
};
