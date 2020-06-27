import { deref } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks";

export const css = (rules: any) => {
    let css = "";
    let v: any;
    for (let r in rules) {
        v = deref(rules[r]);
        isFunction(v) && (v = v(rules));
        v != null && (css += `${r}:${v};`);
    }
    return css;
};
