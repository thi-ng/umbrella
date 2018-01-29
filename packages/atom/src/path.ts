import { isArray } from "@thi.ng/checks/is-array";
import { isString } from "@thi.ng/checks/is-string";

function compS(k, f) {
    return (s, v) => ({ ...s, [k]: f((s || {})[k], v) });
}

function compG(k, f) {
    return (s) => s ? f(s[k]) : undefined;
}

export function getter(path: PropertyKey | PropertyKey[]) {
    const ks = isArray(path) ? path : isString(path) ? path.split(".") : [path],
        kl = ks.pop();
    let f = (s) => s ? s[kl] : undefined;
    for (let i = ks.length - 1; i >= 0; i--) {
        f = compG(ks[i], f);
    }
    return f;
}

export function setter(path: PropertyKey | PropertyKey[]) {
    const ks = isArray(path) ? path : isString(path) ? path.split(".") : [path],
        kl = ks.pop();
    let f = (s, v) => ({ ...(s || {}), [kl]: v });
    for (let i = ks.length - 1; i >= 0; i--) {
        f = compS(ks[i], f);
    }
    return f;
}
