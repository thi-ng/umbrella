import { equiv } from "@thi.ng/equiv";

export const __equivMap = (a: Map<any, any>, b: any) => {
    if (a === b) {
        return true;
    }
    if (!(b instanceof Map) || a.size !== b.size) {
        return false;
    }
    for (let p of a.entries()) {
        if (!equiv(b.get(p[0]), p[1])) {
            return false;
        }
    }
    return true;
};

export const __equivSet = (a: Set<any>, b: any) => {
    if (a === b) {
        return true;
    }
    if (!(b instanceof Set) || a.size !== b.size) {
        return false;
    }
    for (let k of a.keys()) {
        if (!b.has(k)) {
            return false;
        }
    }
    return true;
};
