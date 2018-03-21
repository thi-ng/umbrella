import { illegalArity } from "@thi.ng/api/error";

export function fnil(fn: (...args: any[]) => any, ...ctors: (() => any)[]) {
    let [cta, ctb, ctc] = ctors;
    switch (ctors.length) {
        case 1:
            return (...args: any[]) => {
                if (args[0] == null) {
                    args[0] = cta();
                }
                return fn.apply(null, args);
            };
        case 2:
            return (...args: any[]) => {
                if (args[0] == null) {
                    args[0] = cta();
                }
                if (args[1] == null) {
                    args[1] = ctb();
                }
                return fn.apply(null, args);
            };
        case 3:
            return (...args: any[]) => {
                if (args[0] == null) {
                    args[0] = cta();
                }
                if (args[1] == null) {
                    args[1] = ctb();
                }
                if (args[2] == null) {
                    args[2] = ctc();
                }
                return fn.apply(null, args);
            };
        default:
            illegalArity(ctors.length);
    }
}
