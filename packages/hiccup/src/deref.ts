import { implementsFunction } from "@thi.ng/checks/implements-function";

export const derefContext =
    (ctx: any) => {
        if (ctx == null) return ctx;
        const res = {};
        for (let k in ctx) {
            const v = ctx[k];
            res[k] = implementsFunction(v, "deref") ?
                v.deref() :
                v;
        }
        return res;
    };
